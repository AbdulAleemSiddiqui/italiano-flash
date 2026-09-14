import React from "react";
import { VOCABULARY } from "@/lib/vocabulary";
import { getDueReviewWords, getAllLearnedWords, getDifficultWords } from "@/lib/storage";
import { shuffle } from "@/lib/quiz";
import VocabQuiz from "@/components/VocabQuiz";

export default function Review() {
  // Recap: difficult words first, then a random mix of words due for review —
  // a fresh selection each session instead of always the same words.
  const difficult = getDifficultWords(VOCABULARY);
  const due = shuffle(getDueReviewWords(VOCABULARY).filter((w) => !difficult.includes(w)));
  let words = [...difficult, ...due].slice(0, 20);
  if (words.length === 0) words = shuffle(getAllLearnedWords(VOCABULARY)).slice(0, 20);
  return <VocabQuiz words={words} />;
}