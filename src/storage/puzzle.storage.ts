
const puzzlePrefix = "mtg-card-creator-puzzles-completed";

export const getCompletedPuzzles = (): string[] => {
  const result = localStorage.getItem(puzzlePrefix);
  return result ? JSON.parse(result) : [];
}

export const markPuzzleCompleted = (puzzleId: string) => {
  const completedPuzzles = getCompletedPuzzles();
  if (!completedPuzzles.includes(puzzleId)) {
    completedPuzzles.push(puzzleId);
    localStorage.setItem(puzzlePrefix, JSON.stringify(completedPuzzles));
  }
}

export const clearCompletedPuzzles = () => {
  localStorage.removeItem(puzzlePrefix);
}
