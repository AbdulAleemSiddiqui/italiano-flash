import React from "react";
import { VOCABULARY } from "@/lib/vocabulary";
import { getAllLearnedWords } from "@/lib/storage";
import { shuffle } from "@/lib/quiz";
import VocabQuiz from "@/components/VocabQuiz";

export default function QuickQuiz() {
  // A fast check of up to 10 memorized words for returning users.
  const learned = shuffle(getAllLearnedWords(VOCABULARY)).slice(0, 10);
  return (
    <VocabQuiz
      words={learned}
      emptyEmoji="🧠"
      emptyTitle="No memorized words yet"
      emptyMessage="Learn some words first — your quick quiz will be waiting!"
    />
  );
}