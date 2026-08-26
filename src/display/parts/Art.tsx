import { Box } from "@mui/material";
import { Card } from "../../models/card";
import { roundedBorder } from "../helpers/styles";

type ArtProps = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function Art({ card, onClick }: ArtProps) {
  const { typeline } = card;
  const isPlaneswalker = typeline.includes("Planeswalker")

  return (
    <Box
      sx={{
        flex: 38,
        height: 0,
        boxSizing: "border-box",
        border: "0.06em solid black",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch",
        overflow: "hidden",
        ...(isPlaneswalker && roundedBorder(10, 130)),
      }}
      onClick={(e) => {
        if (!onClick) return;
        onClick("artUri");
        e.stopPropagation();
      }}
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
