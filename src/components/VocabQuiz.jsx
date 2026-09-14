import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Volume2 } from "lucide-react";
import { recordReview } from "@/lib/storage";
import { shuffle, buildQuestions } from "@/lib/quiz";
import { speakItalian } from "@/lib/speech";
import { playCorrect, playWrong, playRoundComplete } from "@/lib/sounds";

export default function VocabQuiz({ words, emptyEmoji = "📚", emptyTitle = "Nothing to review yet", emptyMessage = "Learn some words first, then come back!" }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [missed, setMissed] = useState([]);
  const timerRef = useRef(null);

  // Clear any pending auto-advance when leaving the quiz.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    setQuestions(shuffle(buildQuestions(words)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const question = questions[currentQ];

  const handleAnswer = (option) => {
    if (selected !== null) return; // already answered
    setSelected(option);
    const correct = option === question.correctAnswer;
    if (correct) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      setMissed((m) => [...m, question.wordId]);
      playWrong();
    }
    recordReview(question.wordId, correct);
    // Auto-advance: a brief pause on a correct answer, a few seconds on a
    // wrong one so the user can study the highlighted right answer.
    timerRef.current = setTimeout(handleNext, correct ? 1000 : 3000);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((i) => i + 1);
      setSelected(null);
    } else {
      playRoundComplete();
      setFinished(true);
    }
  };

  // Recap: re-quiz the words the user got wrong this round.
  const retryMissed = () => {
    clearTimeout(timerRef.current);
    const missedWords = words.filter((w) => missed.includes(w.id));
    setQuestions(shuffle(buildQuestions(missedWords)));
    setMissed([]);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  // No words to quiz
  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-4">{emptyEmoji}</div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">{emptyTitle}</h2>
        <p className="text-stone-500 text-center mb-8">{emptyMessage}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/20"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Quiz finished
  if (finished) {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}
        </motion.div>
        <h2 className="text-2xl font-bold text-stone-900 mb-1">Quiz Complete!</h2>
        <p className="text-stone-500 mb-6">
          You scored {score} out of {total}
        </p>

        <div className="w-full max-w-xs mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-stone-600 font-medium">Score</span>
            <span className="font-bold text-stone-900">{pct}%</span>
          </div>
          <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6 }}
              className={`h-full rounded-full ${
                pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {words.filter((w) => missed.includes(w.id)).length > 0 && (
            <button
              onClick={retryMissed}
              className="bg-violet-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-violet-600/20"
            >
              Retry Difficult Words ({words.filter((w) => missed.includes(w.id)).length})
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="bg-emerald-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Loading
  if (!question) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  const isCorrect = selected === question.correctAnswer;

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
          {currentQ + 1} / {questions.length}
        </span>
        <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-2 rounded-xl">
          <span className="text-xs font-bold text-emerald-700">✓ {score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-6">
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            animate={{ width: `${((currentQ + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-stone-400 font-medium mb-3">
              {question.askItalian ? "What does this Italian word mean?" : "Which Italian word means…"}
            </p>

            <div className="w-full bg-white rounded-3xl shadow-lg border border-stone-100 p-8 text-center mb-6">
              {question.promptEmoji && (
                <span className="text-5xl mb-3 block">{question.promptEmoji}</span>
              )}
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl font-bold text-stone-900">{question.prompt}</h2>
                {question.askItalian && (
                  <button
                    onClick={() => speakItalian(question.prompt)}
                    className="w-9 h-9 rounded-full bg-stone-100 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                    aria-label="Listen to word"
                  >
                    <Volume2 className="w-5 h-5 text-emerald-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="w-full space-y-3">
              {question.options.map((option) => {
                const isSelected = selected === option;
                const showCorrect = selected !== null && option === question.correctAnswer;
                const showWrong = isSelected && option !== question.correctAnswer;

                return (
                  <motion.button
                    key={option}
                    whileTap={{ scale: selected === null ? 0.97 : 1 }}
                    onClick={() => handleAnswer(option)}
                    disabled={selected !== null}
                    className={`w-full text-left px-5 py-4 rounded-2xl font-medium border-2 transition-all flex items-center justify-between ${
                      showCorrect
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                        : showWrong
                        ? "bg-red-50 border-red-500 text-red-900"
                        : selected !== null
                        ? "bg-white border-stone-100 text-stone-400"
                        : "bg-white border-stone-200 text-stone-800 hover:border-emerald-300 hover:bg-emerald-50/30"
                    }`}
                  >
                    <span>{option}</span>
                    {showCorrect && <Check className="w-5 h-5 text-emerald-600" />}
                    {showWrong && <X className="w-5 h-5 text-red-500" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback + Next */}
      <div className="px-6 pb-10 pt-4 min-h-[100px]">
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <p className={`font-bold text-lg ${isCorrect ? "text-emerald-600" : "text-red-500"}`}>
                {isCorrect ? "Correct! 🎉" : "Not quite — the right answer is highlighted."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}