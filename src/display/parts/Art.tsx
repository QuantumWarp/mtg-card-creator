import { Box } from "@mui/material";
import { Card } from "../../models/card";
import { leftShadow, roundedBorder, sizing } from "../helpers/styles";
import { getGradient, getPalettes } from '../helpers/palette';
import { clickHandler } from "../helpers/general";

type ArtProps = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function Art({ card, onClick }: ArtProps) {
  const { typeline } = card;
  const [color1, color2] = getPalettes(card);
  const isPlaneswalker = typeline.includes("Planeswalker")

  return (
    <Box
      sx={{
        background: getGradient(color1.dark, color2?.dark),
        padding: "0 0.8%",
        ...sizing(87.5, 41),
        ...leftShadow(),
        ...(isPlaneswalker && roundedBorder(10, 130)),
      }}
    >
      <Box
        sx={{
          boxSizing: "border-box",
          border: "0.06em solid black",
          display: "flex",
          justifyContent: "stretch",
          alignItems: "stretch",
          ...sizing(100, 100),
          ...(isPlaneswalker && roundedBorder(10, 130)),
          overflow: "hidden",
        }}
        onClick={(e) => clickHandler(e, onClick, "artUri")}
      >
        {card.artUri && (
          <img
            src={card.artUri}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        )}
      </Box>
    </Box>
  );
}
