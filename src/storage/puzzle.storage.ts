
const puzzlePrefix = "mtg-card-creator-puzzles-completed";

export const getCompletedPuzzles = (): string[] => {
  const result = localStorage.getItem(puzzlePrefix);
  return result ? JSON.parse(result) : [];
}

export const markPuzzleCompleted = (puzzleTitle: string) => {
  const completedPuzzles = getCompletedPuzzles();
  if (!completedPuzzles.includes(puzzleTitle)) {
    completedPuzzles.push(puzzleTitle);
    localStorage.setItem(puzzlePrefix, JSON.stringify(completedPuzzles));
  }
}

export const clearCompletedPuzzles = () => {
  localStorage.removeItem(puzzlePrefix);
}
