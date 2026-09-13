import React from "react";
import { VOCABULARY } from "@/lib/vocabulary";
import { getDueReviewWords, getAllLearnedWords } from "@/lib/storage";
import VocabQuiz from "@/components/VocabQuiz";

export default function Review() {
  // Prefer words due for review; fall back to all learned words for practice.
  let words = getDueReviewWords(VOCABULARY);
  if (words.length === 0) words = getAllLearnedWords(VOCABULARY);
  return <VocabQuiz words={words} />;
}