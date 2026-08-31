import { Button } from "@mui/material";
import { Puzzle, PuzzleCard } from "./puzzle";

export const complexityColorMap: Record<number, string> = {
  1: "green",
  2: "green",
  3: "goldenrod",
  4: "red",
  5: "red",
};

export function renderPuzzleLine(
  line: string,
  puzzle: Puzzle,
  onCardClick: ({ name, setCode }: PuzzleCard) => void,
  larger = false
) {
  const parts = line.split(/(\[[^\]]+\](?:\([^)]+\))?)/g).filter(x => !!x);

  return parts.map((part, index) => {
    const partIsCard = part.startsWith("[");
    if (partIsCard) {
      const partString = part.replace("[", "").replace("]", "");
      const card = puzzle.cards.find((x) => x.name.includes(partString));
      
      return (
        <Button
          key={index}
          variant="text"
          onClick={() => card && onCardClick(card)}
          sx={{
            textTransform: "none",
            minWidth: 0,
            padding: 0,
            marginTop: larger ? "-5px" : "0",
            fontSize: larger ? "1em" : undefined,
            fontWeight: larger ? "bold" : undefined,
            color: card ? undefined : "red"
          }}
        >
          {partString}
        </Button>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
}
