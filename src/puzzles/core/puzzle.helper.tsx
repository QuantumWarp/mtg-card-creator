import { Button } from "@mui/material";
import { Puzzle } from "./puzzle";

export const complexityColorMap: Record<number, string> = {
  1: "green",
  2: "green",
  3: "goldenrod",
  4: "red",
  5: "red",
};

export function getPuzzleCards(puzzle: Puzzle, includeAnswer: boolean): string[] {
  const cards = puzzle.setup.flatMap(line => {
    return [...line.matchAll(/\[([^\]]+)\]/g)];
  }).map(match => match[1]);

  if (includeAnswer) {
    const answerCards = puzzle.explanation.flatMap(line => {
      return [...line.matchAll(/\[([^\]]+)\]/g)];
    }).map(match => match[1]);
    cards.push(...answerCards);
  }

  return cards.filter((value, index, self) => self.indexOf(value) === index);
}

export function renderPuzzleLine(
  line: string,
  onCardClick: (cardName: string) => void,
  larger = false
) {
  const parts = line.split(/(\[[^\]]+\](?:\([^)]+\))?)/g).filter(x => !!x);

  return parts.map((part, index) => {
    const partIsCard = part.startsWith("[");
    if (partIsCard) {
      const matches = part.match(/\[([^\]]+)\](\(([^)]+)\))?/);
      const cardName = matches ? (matches[3] || matches[1]) : part;
      const text = matches ? matches[1] : part;
      return (
        <Button
          key={index}
          variant="text"
          onClick={() => onCardClick(cardName)}
          sx={{
            textTransform: "none",
            minWidth: 0,
            padding: 0,
            marginTop: larger ? "-5px" : "0",
            fontSize: larger ? "1em" : undefined,
            fontWeight: larger ? "bold" : undefined,
          }}
        >
          {text}
        </Button>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
}
