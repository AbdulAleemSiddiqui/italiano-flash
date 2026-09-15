import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, CheckCircle2, Volume2 } from "lucide-react";
import { VOCABULARY } from "@/lib/vocabulary";
import { getUnlearnedWords, markWordLearned } from "@/lib/storage";
import { speakItalian } from "@/lib/speech";
import { playRoundComplete } from "@/lib/sounds";

const SESSION_SIZE = 5;

export default function Learn() {
  const navigate = useNavigate();
  const [sessionWords, setSessionWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

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
      setShowTranslation(false);
    } else {
      playRoundComplete();
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
              <div className="flex items-center justify-center gap-2 mb-1">
                <h2 className="text-3xl font-bold text-stone-900">{currentWord.italian}</h2>
                <button
                  onClick={() => speakItalian(currentWord.italian)}
                  className="w-9 h-9 rounded-full bg-stone-100 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                  aria-label="Listen to word"
                >
                  <Volume2 className="w-5 h-5 text-emerald-600" />
                </button>
              </div>
              <p className="text-lg text-emerald-600 font-medium mb-4">{currentWord.english}</p>
              <div
                className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 cursor-pointer text-left"
                onClick={() => setShowTranslation((v) => !v)}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakItalian(currentWord.example);
                    }}
                    className="shrink-0 w-8 h-8 rounded-full bg-white border border-amber-200 flex items-center justify-center hover:bg-amber-100 transition-colors"
                    aria-label="Listen to sentence"
                  >
                    <Volume2 className="w-4 h-4 text-amber-600" />
                  </button>
                  <p className="text-amber-900 font-medium text-sm flex-1">"{currentWord.example}"</p>
                </div>
                {showTranslation ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {currentWord.exampleWords.map(([it, en], i) => (
                        <span
                          key={i}
                          className="bg-white rounded-lg px-2 py-1 border border-amber-200 text-center"
                        >
                          <span className="block text-sm font-semibold text-stone-800 leading-tight">{it}</span>
                          <span className="block text-[11px] text-amber-700 leading-tight">{en}</span>
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-stone-500 mt-2 italic">"{currentWord.exampleEn}"</p>
                  </motion.div>
                ) : (
                  <p className="text-[11px] text-amber-600 text-center mt-2">
                    Tap for word-by-word translation
                  </p>
                )}
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