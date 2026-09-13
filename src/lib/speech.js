// Browser text-to-speech for Italian vocabulary and example sentences.
export function speakItalian(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "it-IT";
  utterance.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const itVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("it"));
  if (itVoice) utterance.voice = itVoice;
  window.speechSynthesis.speak(utterance);
}