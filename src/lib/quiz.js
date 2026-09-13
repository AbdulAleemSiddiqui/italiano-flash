// Shared quiz helpers: shuffling and multiple-choice question generation.
import { VOCABULARY } from "@/lib/vocabulary";

export function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// One multiple-choice question per word, alternating IT→EN and EN→IT directions.
export function buildQuestions(words) {
  return words.map((word, idx) => {
    const askItalian = idx % 2 === 0;
    const correctAnswer = askItalian ? word.english : word.italian;
    const prompt = askItalian ? word.italian : word.english;
    const promptEmoji = askItalian ? word.emoji : null;

    // 3 distractors from the full vocabulary (same answer language)
    const distractorAnswers = VOCABULARY.filter((w) => w.id !== word.id).map((w) =>
      askItalian ? w.english : w.italian
    );
    const uniqueDistractors = [...new Set(distractorAnswers)].filter((a) => a !== correctAnswer);
    const wrongOptions = shuffle(uniqueDistractors).slice(0, 3);

    return {
      wordId: word.id,
      askItalian,
      prompt,
      promptEmoji,
      correctAnswer,
      options: shuffle([correctAnswer, ...wrongOptions]),
    };
  });
}