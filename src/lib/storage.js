// Local storage + simple spaced repetition for the Italian A2 vocabulary trainer.

const STORAGE_KEY = "italian_a2_progress";

// Spaced repetition intervals (in days) by level.
// Wrong answers reset to level 0 (review next day).
// Correct answers increase the level, pushing the next review further out.
const LEVEL_INTERVALS = [1, 1, 2, 3, 5, 7, 14];

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// records: { [wordId]: { learnedDate, level, nextReview, correctCount, wrongCount, lastReviewed } }
function getRecords() {
  return loadProgress();
}

// --- Learn ---

export function getUnlearnedWords(allWords) {
  const records = getRecords();
  return allWords.filter((w) => !records[w.id]);
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
}

// --- Review ---

export function getDueReviewWords(allWords) {
  const records = getRecords();
  const now = Date.now();
  return allWords.filter((w) => {
    const r = records[w.id];
    return r && r.nextReview <= now;
  });
}

export function getAllLearnedWords(allWords) {
  const records = getRecords();
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
}

// --- Stats for Home screen ---

export function getStats(allWords) {
  const records = getRecords();
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