import { Box } from "@mui/material";
import { Card } from "../../models/card";
import { roundedBorder, sizing } from "../helpers/styles";
import { clickHandler } from "../helpers/general";

type Props = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function Art({ card, onClick }: Props) {
  const { typeline } = card;
  const isPlaneswalker = typeline.includes("Planeswalker")

  return (
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
  );
}
