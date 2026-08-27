import { Box } from "@mui/material";
import { Card } from "../../../models/card";
import { clickHandler } from "../../helpers/general";

type Props = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function FlipIcon({ card, onClick }: Props) {
  const canFlip = card.cardFaces && card.cardFaces.length > 0;
  if (!canFlip) return null;

  const isFirstFace = card.cardFaces?.[0].name === card.name;

  return (
    <Box
      sx={{
        background: "white",
        border: "1px solid black",
        boxSizing: "border-box",
        height: "1.5em",
        width: "1.5em",
        borderRadius: "50%",
        ml: "-0.35em",
        position: "relative",
      }}
      onClick={(e) => clickHandler(e, onClick, "cardFaces")}
    >
      <Box
        sx={{
          background: "black",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)" + (isFirstFace ? "" : " rotate(180deg)"),
          height: "92%",
          width: "92%",
          borderRadius: "50%",
        }}
      >
        <svg width="65%" height="65%" viewBox="0 0 100 100" style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
          <polygon
            points="50,15 90,85 10,85" 
            fill="white" 
            stroke="white"
            strokeWidth="12" 
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </Box>
  );
}

