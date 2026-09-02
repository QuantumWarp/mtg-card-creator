import { Box } from "@mui/material";
import { Card } from "../../../models/card";
import { clickHandler } from "../../helpers/general";
import { DisplayData } from "../../display-data";

type Props = {
  card: Card;
  displayData: DisplayData;
}

export function FlipIcon({ card, displayData }: Props) {
  const canFlip = card.doubleFaceType !== undefined;
  if (!canFlip) return null;

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
      onClick={(e) => clickHandler(e, displayData, "doubleFaceType", undefined)}
    >
      <Box
        sx={{
          background: "black",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)" + (displayData.isFront ? "" : " rotate(180deg)"),
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

