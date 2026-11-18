export const PROMPTS = [
  "Paint one color that feels like today.",
  "Play three notes that sound like the weather.",
  "A photo of something green you walked past.",
  "Draw the snack you wish you had.",
  "Ten seconds of a song stuck in your head.",
  "The messiest beautiful thing in the room.",
  "A chord for the best part of the day.",
  "Paint what the sky is doing right now.",
];

export function promptFor(date: Date) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const day = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86_400_000,
  );
  return PROMPTS[Math.abs(day) % PROMPTS.length] ?? PROMPTS[0];
}
