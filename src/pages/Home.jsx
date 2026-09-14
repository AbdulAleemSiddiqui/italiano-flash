import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, RefreshCw, ChevronRight, Sparkles, Zap, Flame, Brain } from "lucide-react";
import { VOCABULARY, computeUserLevel, wordsToNextLevel } from "@/lib/vocabulary";
import { getStats, getUnlearnedWords, getStreak, ensureSynced, isReturningVisit } from "@/lib/storage";
import { useAuth } from "@/lib/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ learnedToday: 0, dueReview: 0, totalLearned: 0, totalWords: VOCABULARY.length });
  const [canLearn, setCanLearn] = useState(true);
  const [syncing, setSyncing] = useState(true);
  const [welcomeBack, setWelcomeBack] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await ensureSynced(user?.id);
      } catch (e) {
        console.warn("Could not sync progress:", e);
      }
      if (!mounted) return;
      setSyncing(false);
      setStats(getStats(VOCABULARY));
      setCanLearn(getUnlearnedWords(VOCABULARY).length > 0);
      setWelcomeBack(isReturningVisit());
      setStreak(getStreak());
    })();
    return () => {
      mounted = false;
    };
  }, [user?.id]);

  if (syncing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  const progress = Math.round((stats.totalLearned / stats.totalWords) * 100);
  const firstName = (user?.full_name || user?.email || "there").split(" ")[0].split("@")[0];
  const initials = (user?.full_name || user?.email || "?").trim().slice(0, 2).toUpperCase();
  const userLevel = computeUserLevel(stats.totalLearned, stats.totalWords);
  const toNext = wordsToNextLevel(stats.totalLearned, stats.totalWords);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 flex items-start justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-1"
          >
            <span className="text-3xl">🇮🇹</span>
            <span className="text-xs font-semibold tracking-widest text-stone-400 uppercase">
              Spaced Repetition · Listen · Speak
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-bold text-stone-900 tracking-tight"
          >
            Italian Vocabulary
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 mt-1"
          >
            Ciao {firstName}! A few minutes a day builds fluency
          </motion.p>

          {/* Streak & level badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 mt-3"
          >
            <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full">
              <Flame className="w-3.5 h-3.5" />
              {streak} day{streak === 1 ? "" : "s"}
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
              <Brain className="w-3.5 h-3.5" />
              Level {userLevel}
            </span>
          </motion.div>
        </div>
        <Link
          to="/profile"
          className="shrink-0 w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20"
        >
          {initials}
        </Link>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-stone-600">
            {userLevel >= 10 ? "Max level reached 🏆" : `Journey to Level ${userLevel + 1}`}
          </span>
          <span className="text-sm font-bold text-stone-800">
            {stats.totalLearned} / {stats.totalWords} words
          </span>
        </div>
        <div className="h-2.5 bg-stone-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
          />
        </div>
        <p className="text-xs text-stone-400 mt-1.5">
          {userLevel >= 10
            ? "Keep reviewing to stay sharp!"
            : `${toNext} more words to unlock Level ${userLevel + 1} 🔓`}
        </p>
      </div>

      {/* Stat cards */}
      <div className="px-6 mb-6 grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-stone-500">New Today</span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{stats.learnedToday}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100"
        >
          <div className="flex items-center gap-2 mb-1">
            <RefreshCw className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-stone-500">To Review</span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{stats.dueReview}</p>
        </motion.div>
      </div>

      {/* Welcome back — quick quiz on memorized words */}
      {welcomeBack && stats.totalLearned > 0 && (
        <div className="px-6 mb-6">
          <Link to="/quick-quiz">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-violet-600/20 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Welcome back! 👋</p>
                  <p className="text-violet-100 text-sm">Quick quiz on your memorized words</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.div>
          </Link>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-6 space-y-3 flex-1">
        <Link to="/learn">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Learn New Words</p>
                <p className="text-emerald-100 text-sm">
                  {canLearn ? "5 new words ready for you" : "All words learned! 🎉"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.div>
        </Link>

        <Link to="/review">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-2xl p-5 flex items-center justify-between shadow-lg cursor-pointer transition-colors ${
              stats.dueReview > 0
                ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20"
                : "bg-white border border-stone-200 shadow-stone-200/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stats.dueReview > 0 ? "bg-white/20" : "bg-amber-50"
                }`}
              >
                <RefreshCw
                  className={`w-6 h-6 ${stats.dueReview > 0 ? "text-white" : "text-amber-600"}`}
                />
              </div>
              <div>
                <p
                  className={`font-bold text-lg ${
                    stats.dueReview > 0 ? "text-white" : "text-stone-900"
                  }`}
                >
                  Review
                </p>
                <p
                  className={`text-sm ${
                    stats.dueReview > 0 ? "text-amber-50" : "text-stone-500"
                  }`}
                >
                  {stats.dueReview > 0
                    ? `${stats.dueReview} words due now`
                    : stats.totalLearned > 0
                    ? "No words due — come back later!"
                    : "Learn some words first"}
                </p>
              </div>
            </div>
            <ChevronRight
              className={`w-6 h-6 ${stats.dueReview > 0 ? "text-white" : "text-stone-400"}`}
            />
          </motion.div>
        </Link>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 text-center">
        <p className="text-xs text-stone-400">Little by little, every day 💪</p>
      </div>
    </div>
  );
}