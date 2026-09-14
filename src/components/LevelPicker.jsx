import React from "react";
import { motion } from "framer-motion";
import { setStartLevel } from "@/lib/storage";

// First-time question: the learner's self-reported Italian level.
// Sets the difficulty level new words are served from.
const OPTIONS = [
  { level: 1, emoji: "🌱", title: "Complete beginner", desc: "Starting from ciao and grazie" },
  { level: 3, emoji: "📗", title: "Basic", desc: "I know everyday words and phrases" },
  { level: 5, emoji: "📘", title: "Intermediate", desc: "I can hold simple conversations" },
  { level: 8, emoji: "📕", title: "Advanced", desc: "Comfortable with complex language" },
];

export default function LevelPicker({ onChoose }) {
  const choose = (level) => {
    setStartLevel(level);
    onChoose(level);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center mb-8"
      >
        <span className="text-5xl block mb-3">🇮🇹</span>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">What's your Italian level?</h2>
        <p className="text-stone-500 text-sm">
          We'll start your new words at the right difficulty for you.
        </p>
      </motion.div>
      <div className="w-full max-w-sm space-y-3">
        {OPTIONS.map((o, i) => (
          <motion.button
            key={o.level}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
            whileTap={{ scale: 0.98 }}
            onClick={() => choose(o.level)}
            className="w-full bg-white rounded-2xl p-4 border-2 border-stone-200 hover:border-emerald-400 shadow-sm flex items-center gap-4 text-left"
          >
            <span className="text-3xl">{o.emoji}</span>
            <span>
              <span className="block font-bold text-stone-900">{o.title}</span>
              <span className="block text-sm text-stone-500">{o.desc}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}