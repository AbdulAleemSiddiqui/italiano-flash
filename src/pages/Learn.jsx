import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { VOCABULARY } from "@/lib/vocabulary";
import { getUnlearnedWords, markWordLearned } from "@/lib/storage";

const SESSION_SIZE = 5;

export default function Learn() {
  const navigate = useNavigate();
  const [sessionWords, setSessionWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const unlearned = getUnlearnedWords(VOCABULARY);
    const session = unlearned.slice(0, SESSION_SIZE);
    setSessionWords(session);
  }, []);

  const currentWord = sessionWords[currentIndex];

  const handleNext = () => {
    if (currentWord) {
      markWordLearned(currentWord.id);
    }
    if (currentIndex < sessionWords.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setDone(true);
    }
  };

  // No words to learn
  if (sessionWords.length === 0 && !done) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">All caught up!</h2>
        <p className="text-stone-500 text-center mb-8">
          You've learned all {VOCABULARY.length} words. Time to review!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Session complete
  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-stone-100 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="w-20 h-20 text-emerald-600 mb-4" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-stone-900 mb-2"
        >
          Session Complete!
        </motion.h2>
        <p className="text-stone-500 text-center mb-1">
          You learned {sessionWords.length} new {sessionWords.length === 1 ? "word" : "words"}.
        </p>
        <p className="text-stone-400 text-sm mb-8">Review them soon to remember them!</p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => navigate("/review")}
            className="bg-emerald-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20"
          >
            Review Now
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-stone-700 font-semibold px-6 py-3.5 rounded-xl border border-stone-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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
        <span className="text-sm font-semibold text-stone-500">
          {currentIndex + 1} / {sessionWords.length}
        </span>
        <div className="w-10" />
      </div>

      {/* Progress dots */}
      <div className="px-6 mb-4 flex gap-1.5">
        {sessionWords.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentIndex ? "bg-emerald-500" : i === currentIndex ? "bg-emerald-400" : "bg-stone-200"
            }`}
          />
        ))}
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden"
          >
            {/* Emoji illustration */}
            <div className="h-44 bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                className="text-7xl"
              >
                {currentWord.emoji}
              </motion.span>
            </div>

            {/* Word content */}
            <div className="p-7 text-center">
              <h2 className="text-3xl font-bold text-stone-900 mb-1">{currentWord.italian}</h2>
              <p className="text-lg text-emerald-600 font-medium mb-4">{currentWord.english}</p>
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-100">
                <p className="text-stone-600 italic text-sm">"{currentWord.example}"</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next button */}
      <div className="px-6 pb-10 pt-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleNext}
          className="w-full bg-stone-900 text-white font-semibold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2"
        >
          {currentIndex < sessionWords.length - 1 ? "Next Word" : "Finish"}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}