import React from "react";
import { VOCABULARY } from "@/lib/vocabulary";
import { getAllLearnedWords, getDifficultWords } from "@/lib/storage";
import { shuffle } from "@/lib/quiz";
import VocabQuiz from "@/components/VocabQuiz";

export default function QuickQuiz() {
  // Recap of memorized words for returning users — difficult ones first.
  const learned = getAllLearnedWords(VOCABULARY);
  const difficult = getDifficultWords(learned);
  const rest = shuffle(learned.filter((w) => !difficult.includes(w)));
  const words = [...difficult, ...rest].slice(0, 10);
  return (
    <VocabQuiz
      words={words}
      emptyEmoji="🧠"
      emptyTitle="No memorized words yet"
      emptyMessage="Learn some words first — your quick quiz will be waiting!"
    />
  );
}