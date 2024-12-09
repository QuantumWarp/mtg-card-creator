import { Box } from "@mui/material";
import { Card } from "../../models/card";

type ArtProps = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function Art({ card, onClick }: ArtProps) {
  return (
    <Box
      sx={{
        flex: 38,
        height: 0,
        boxSizing: "border-box",
        border: "0.06em solid black",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch"
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
