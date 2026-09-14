import React from "react";
import { VOCABULARY } from "@/lib/vocabulary";
import { getDueReviewWords, getAllLearnedWords, getDifficultWords } from "@/lib/storage";
import VocabQuiz from "@/components/VocabQuiz";

export default function Review() {
  // Recap: difficult words first, then words due for review.
  const difficult = getDifficultWords(VOCABULARY);
  const due = getDueReviewWords(VOCABULARY).filter((w) => !difficult.includes(w));
  let words = [...difficult, ...due].slice(0, 20);
  if (words.length === 0) words = getAllLearnedWords(VOCABULARY).slice(0, 20);
  return <VocabQuiz words={words} />;
}