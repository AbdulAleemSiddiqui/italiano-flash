import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, LogOut, BookOpen, RefreshCw, Flame, Trophy } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { VOCABULARY, computeUserLevel } from "@/lib/vocabulary";
import { getStats, getStreak } from "@/lib/storage";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setStats(getStats(VOCABULARY));
    setStreak(getStreak());
  }, []);

  const initials = (user?.full_name || user?.email || "?").trim().slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col">
      {/* Top bar */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-stone-200 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-stone-600" />
        </button>
        <h1 className="text-lg font-bold text-stone-900">Profile</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-6">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg border border-stone-100 p-7 text-center mb-4"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-600/20">
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
          <h2 className="text-2xl font-bold text-stone-900">
            {user?.full_name || "Italian Learner"}
          </h2>
          <p className="text-stone-500 mt-1">{user?.email}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center">
            <BookOpen className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-stone-900">{stats?.totalLearned ?? 0}</p>
            <p className="text-xs text-stone-500">Words Learned</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center">
            <RefreshCw className="w-5 h-5 text-amber-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-stone-900">{stats?.dueReview ?? 0}</p>
            <p className="text-xs text-stone-500">To Review</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center">
            <Flame className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-stone-900">{streak}</p>
            <p className="text-xs text-stone-500">Day Streak</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 text-center">
            <Trophy className="w-5 h-5 text-violet-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-stone-900">
              {stats ? computeUserLevel(stats.totalLearned, stats.totalWords) : 1}
            </p>
            <p className="text-xs text-stone-500">Your Level</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="px-6 pb-10">
        <button
          onClick={() => logout()}
          className="w-full bg-white text-red-600 font-semibold py-4 rounded-2xl border border-red-200 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}