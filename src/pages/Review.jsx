import React from "react";
import { VOCABULARY } from "@/lib/vocabulary";
import { getNextReviewBatch } from "@/lib/storage";
import VocabQuiz from "@/components/VocabQuiz";

export default function Review() {
  // Each visit serves the next 20 memorized words, cycling through everything
  // the user has learned, with a running "revised so far" progress line.
  const { words, revised, total } = getNextReviewBatch(VOCABULARY, 20);

  return (
    <div>
      {total > 0 && (
        <div className="max-w-xl mx-auto px-4 pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Revision progress:{" "}
            <span className="font-semibold text-foreground">
              {revised} of {total}
            </span>{" "}
            memorized words revised this round
          </p>
        </div>
      )}
      <VocabQuiz words={words} />
    </div>
  );
}