import { Box } from "@mui/material";
import { Card, CardPart } from "../../../models/card";
import { clickHandler } from "../../helpers/general";
import { DisplayData } from "../../display-data";
import { getPalettes } from "../../helpers/palette";
import { DoubleFaceType } from "../../../models/layout";
import { sizing } from "../../helpers/styles";
import { ReactNode } from "react";

type Props = {
  card: Card;
  cardPart: CardPart;
  displayData: DisplayData;
}

export function FlipIcon({ card, cardPart, displayData }: Props) {
  const canFlip = card.doubleFaceType !== undefined;
  if (!canFlip) return null;

  return (
    <Box onClick={(e) => clickHandler(e, displayData, "doubleFaceType", undefined)}>
      {card.doubleFaceType === DoubleFaceType.Modal && (
        <ShadedCircle cardPart={cardPart} displayData={displayData}>
          {displayData.isFront && <Box sx={{ ...sizing(65, 65), ml: "auto", mr: "auto", mt: !displayData.isFront ? "-0.1em" : "-0.03em" }}>
            <Triangle color="black" />
          </Box>}
          {!displayData.isFront && <Box sx={{ ...sizing(90, 90), ml: "auto", mr: "auto", position: "relative" }}>
            <Box sx={{ position: "absolute", ...sizing(50, 50, 5, -10) }}><Triangle /></Box>
            <Box sx={{ position: "absolute", ...sizing(50, 50, 40, -7) }}><Triangle flip /></Box>
          </Box>}
        </ShadedCircle>
      )}
      
      {card.doubleFaceType !== DoubleFaceType.Modal && (
        <BlackAndWhiteCircle>
          <Box sx={{ ...sizing(65, 65), ml: "auto", mr: "auto", mt: !displayData.isFront ? "-0.1em" : "-0.03em" }}>
            <Triangle flip={!displayData.isFront} />
          </Box>
        </BlackAndWhiteCircle>
      )}
    </Box>
  );
}

function ShadedCircle({ children, cardPart, displayData }: { children: ReactNode, cardPart: CardPart, displayData: DisplayData }) {
  const [color1,, multicolor] = getPalettes(cardPart);
  const color = multicolor || color1;

  return (
    <Box
      sx={{
        background: "white",
        border: "1px solid black",
        boxSizing: "border-box",
        height: "1.6em",
        width: "1.6em",
        borderRadius: "50%",
        ml: "-0.35em",
        position: "relative",
      }}
    >
      <Box
        sx={{
          background: displayData.isFront ? color.mid : color.dark,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "90%",
          width: "90%",
          borderRadius: "50%",
          boxShadow: "inset 0em 0em 0.2em rgba(0, 0, 0, 0.6)"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function BlackAndWhiteCircle({ children }: { children: ReactNode }) {
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
    >
      <Box
        sx={{
          background: "black",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "92%",
          width: "92%",
          borderRadius: "50%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function Triangle({ color = "white", flip = false }: { color?: string, flip?: boolean }) {
  return (
    <Box sx={{ transform: flip ? "rotate(180deg)" : undefined }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <polygon
          points="50,15 90,85 10,85" 
          fill={color}
          stroke={color}
          strokeWidth="12"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
}
