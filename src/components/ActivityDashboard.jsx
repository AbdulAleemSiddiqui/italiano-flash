import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { BookOpen, Brain, TrendingUp } from "lucide-react";

// Visual dashboard for the profile page: total vocabulary, current level,
// and a chart of recently learned words per day.
export default function ActivityDashboard({ totalLearned, totalWords, level, activity }) {
  const vocabPct = totalWords ? Math.round((totalLearned / totalWords) * 100) : 0;

  return (
    <div className="space-y-3 mb-4">
      {/* Total vocabulary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-stone-600">Total Vocabulary</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            {vocabPct}%
          </span>
        </div>
        <p className="text-3xl font-bold text-stone-900">
          {totalLearned}
          <span className="text-base font-medium text-stone-400"> / {totalWords} words</span>
        </p>
        <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden mt-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${vocabPct}%` }}
            transition={{ duration: 0.6 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
          />
        </div>
      </motion.div>

      {/* Current difficulty level */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100"
      >
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-semibold text-stone-600">Current Difficulty Level</span>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-bold text-stone-900">{level}</p>
          <span className="text-sm font-medium text-stone-400 mb-1">of 10</span>
        </div>
        <div className="flex gap-1 mt-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-2.5 flex-1 rounded-full ${i < level ? "bg-violet-500" : "bg-stone-100"}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Recent activity chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-stone-600">Recent Activity</span>
        </div>
        <div className="h-44 -ml-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activity} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0efec" vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#a8a29e" }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={24}
                tick={{ fontSize: 11, fill: "#a8a29e" }}
              />
              <Tooltip
                labelFormatter={(label, payload) => payload?.[0]?.payload?.date || label}
                formatter={(value) => [`${value} word${value === 1 ? "" : "s"} learned`, null]}
              />
              <Bar dataKey="words" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-stone-400 text-center mt-2">
          Words learned per day · last 7 days
        </p>
      </motion.div>
    </div>
  );
}