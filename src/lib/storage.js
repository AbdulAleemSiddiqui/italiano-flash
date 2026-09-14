// Progress storage: localStorage (fast, offline) + per-user sync to the WordProgress entity.
import { base44 } from "@/api/base44Client";

const LEGACY_KEY = "italian_a2_progress"; // pre-login data on this device
const LAST_ACTIVE_KEY = "italian_a2_last_active";

// Spaced repetition intervals (in days) by level.
// Wrong answers reset to level 0 (review sooner); correct answers push reviews further out.
const LEVEL_INTERVALS = [1, 1, 2, 3, 5, 7, 14];

let storageKey = LEGACY_KEY;
let streakKey = "italian_a2_streak";
let reviewCursorKey = "italian_a2_review_cursor";

// Scope progress to the logged-in user so accounts don't mix on shared devices.
export function setUserScope(userId) {
  storageKey = userId ? `italian_a2_progress_${userId}` : LEGACY_KEY;
  streakKey = userId ? `italian_a2_streak_${userId}` : "italian_a2_streak";
  reviewCursorKey = userId ? `italian_a2_review_cursor_${userId}` : "italian_a2_review_cursor";
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

// --- Learn ---

export function getUnlearnedWords(allWords) {
  const records = loadProgress();
  // Easiest words first — learn in difficulty order.
  return allWords
    .filter((w) => !records[w.id])
    .sort((a, b) => (a.level || 1) - (b.level || 1) || a.id - b.id);
}

export function markWordLearned(wordId) {
  const data = loadProgress();
  if (data[wordId]) return; // already learned
  data[wordId] = {
    learnedDate: Date.now(),
    level: 0,
    nextReview: Date.now(), // available for review immediately
    correctCount: 0,
    wrongCount: 0,
    lastReviewed: null,
    };
    saveProgress(data);
    markStreakActivity();
    schedulePush(wordId);
}

// --- Review ---

export function getDueReviewWords(allWords) {
  const records = loadProgress();
  const now = Date.now();
  return allWords.filter((w) => {
    const r = records[w.id];
    return r && r.nextReview <= now;
  });
}

export function getAllLearnedWords(allWords) {
  const records = loadProgress();
  return allWords.filter((w) => records[w.id]);
}

export function recordReview(wordId, correct) {
  const data = loadProgress();
  const r = data[wordId];
  if (!r) return;

  if (correct) {
    r.level = Math.min(r.level + 1, LEVEL_INTERVALS.length - 1);
    r.correctCount += 1;
  } else {
    r.level = 0; // reset — review sooner
    r.wrongCount += 1;
  }

  const intervalDays = LEVEL_INTERVALS[r.level];
  r.nextReview = Date.now() + intervalDays * 24 * 60 * 60 * 1000;
  r.lastReviewed = Date.now();

  data[wordId] = r;
  saveProgress(data);
  markStreakActivity();
  schedulePush(wordId);
}

// --- Stats for Home screen ---

export function getStats(allWords) {
  const records = loadProgress();
  const now = Date.now();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  let learnedToday = 0;
  let dueReview = 0;
  let totalLearned = 0;

  for (const w of allWords) {
    const r = records[w.id];
    if (!r) continue;
    totalLearned += 1;
    if (r.learnedDate >= todayStart.getTime()) learnedToday += 1;
    if (r.nextReview <= now) dueReview += 1;
  }

  return {
    learnedToday,
    dueReview,
    totalLearned,
    totalWords: allWords.length,
  };
}

// --- Daily streak ---

function dayString(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Called whenever the user learns or reviews a word — keeps the streak alive.
function markStreakActivity() {
  try {
    const raw = JSON.parse(localStorage.getItem(streakKey) || "null");
    const today = dayString(new Date());
    const yesterday = dayString(new Date(Date.now() - 86400000));
    let count = 1;
    if (raw && raw.lastDay === today) count = raw.count;
    else if (raw && raw.lastDay === yesterday) count = (raw.count || 0) + 1;
    localStorage.setItem(streakKey, JSON.stringify({ count, lastDay: today }));
  } catch {
    // streak is best-effort
  }
}

export function getStreak() {
  try {
    const raw = JSON.parse(localStorage.getItem(streakKey) || "null");
    return raw && raw.count ? raw.count : 0;
  } catch {
    return 0;
  }
}

// --- Sequential review batches ---

// Each review session serves the NEXT 20 memorized words (wrapping around
// after a full pass), so users revise fresh words instead of the same set.
export function getNextReviewBatch(allWords, batchSize = 20) {
  const learned = getAllLearnedWords(allWords);
  if (!learned.length) return { words: [], revised: 0, total: 0 };

  let cursor = parseInt(localStorage.getItem(reviewCursorKey) || "0", 10) || 0;
  if (cursor >= learned.length) cursor = 0;

  const words = learned.slice(cursor, cursor + batchSize);
  const completedPass = cursor + words.length >= learned.length;
  localStorage.setItem(reviewCursorKey, String(completedPass ? 0 : cursor + words.length));

  return {
    words,
    revised: completedPass ? learned.length : cursor + words.length,
    total: learned.length,
  };
}

// --- Difficult words (for recap) ---

// Words the user keeps getting wrong — prioritized in review and quick quiz.
export function getDifficultWords(allWords) {
  const records = loadProgress();
  return allWords
    .filter((w) => {
      const r = records[w.id];
      return r && r.wrongCount > 0 && r.wrongCount >= r.correctCount;
    })
    .sort((a, b) => (records[b.id]?.wrongCount || 0) - (records[a.id]?.wrongCount || 0));
}

// --- Returning-visit detection (drives the quick-quiz prompt) ---

export function isReturningVisit() {
  const learned = Object.keys(loadProgress()).length;
  const last = localStorage.getItem(LAST_ACTIVE_KEY);
  const today = new Date().toDateString();
  localStorage.setItem(LAST_ACTIVE_KEY, today);
  return learned > 0 && last !== null && last !== today;
}

// --- Server sync (per-user, survives device changes) ---

let entityIdMap = null; // word_id -> WordProgress record id

function toServerPayload(wordId, rec) {
  return {
    word_id: wordId,
    level: rec.level || 0,
    correct_count: rec.correctCount || 0,
    wrong_count: rec.wrongCount || 0,
    learned_date: rec.learnedDate || Date.now(),
    next_review: rec.nextReview || Date.now(),
    last_reviewed: rec.lastReviewed || 0,
  };
}

// Load server progress, merge with this device's data, migrate pre-login
// (legacy) memorized words, and push anything the server doesn't have yet.
export async function ensureSynced(userId) {
  setUserScope(userId);
  entityIdMap = {};

  const merged = loadProgress();

  // Migrate pre-login progress from this device — keeps the words the user
  // already memorized before logging in.
  const legacyRaw = localStorage.getItem(LEGACY_KEY);
  if (legacyRaw) {
    try {
      const legacy = JSON.parse(legacyRaw);
      for (const [id, rec] of Object.entries(legacy)) {
        if (!merged[id] || (rec.lastReviewed || 0) > (merged[id].lastReviewed || 0)) {
          merged[id] = rec;
        }
      }
    } catch {
      // ignore malformed legacy data
    }
  }

  // Merge in server records (server wins when more recent).
  const serverRecords = await base44.entities.WordProgress.list("-updated_date", 500);
  for (const r of serverRecords) {
    entityIdMap[r.word_id] = r.id;
    const local = merged[r.word_id];
    const serverStamp = r.last_reviewed || r.learned_date || 0;
    const localStamp = local ? local.lastReviewed || local.learnedDate || 0 : 0;
    if (!local || serverStamp > localStamp) {
      merged[r.word_id] = {
        learnedDate: r.learned_date || 0,
        level: r.level || 0,
        nextReview: r.next_review || 0,
        correctCount: r.correct_count || 0,
        wrongCount: r.wrong_count || 0,
        lastReviewed: r.last_reviewed || null,
      };
    }
  }

  // Push any local/legacy records the server doesn't have yet.
  const missing = Object.keys(merged)
    .map(Number)
    .filter((id) => !entityIdMap[id]);
  if (missing.length) {
    const payloads = missing.map((id) => toServerPayload(id, merged[id]));
    const created = await base44.entities.WordProgress.bulkCreate(payloads);
    created.forEach((rec, i) => {
      entityIdMap[payloads[i].word_id] = rec.id;
    });
  }

  saveProgress(merged);
  if (legacyRaw) localStorage.removeItem(LEGACY_KEY); // migrated — don't hand it to another account
}

// Debounced push of local mutations to the server.
let pendingIds = new Set();
let flushTimer = null;

export function schedulePush(wordId) {
  pendingIds.add(wordId);
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flushPending, 1500);
}

async function flushPending() {
  const ids = [...pendingIds];
  pendingIds = new Set();
  flushTimer = null;
  const local = loadProgress();
  for (const id of ids) {
    const rec = local[id];
    if (!rec) continue;
    try {
      if (entityIdMap && entityIdMap[id]) {
        await base44.entities.WordProgress.update(entityIdMap[id], toServerPayload(id, rec));
      } else {
        const existing = await base44.entities.WordProgress.filter({ word_id: id });
        if (existing.length) {
          entityIdMap = entityIdMap || {};
          entityIdMap[id] = existing[0].id;
          await base44.entities.WordProgress.update(existing[0].id, toServerPayload(id, rec));
        } else {
          const created = await base44.entities.WordProgress.create(toServerPayload(id, rec));
          entityIdMap = entityIdMap || {};
          entityIdMap[id] = created.id;
        }
      }
    } catch (e) {
      console.warn("Progress sync failed — will retry on next visit:", e);
    }
  }
}