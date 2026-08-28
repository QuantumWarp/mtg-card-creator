import { Box, SxProps } from "@mui/material";
import { Card } from "../../models/card";
import { sizing } from "../helpers/styles";
import { clickHandler } from "../helpers/general";

type Props = {
  card: Card;
  objectPosition?: string;
  sx?: SxProps;
  onClick?: (part: keyof Card) => void;
}

export function Art({ card, objectPosition, sx, onClick }: Props) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        border: "0.06em solid black",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch",
        overflow: "hidden",
        ...sizing(100, 100),
        ...sx,
      }}
      onClick={(e) => clickHandler(e, onClick, "artUri")}
    >
      {card.artUri && (
        <img
          src={card.artUri}
          style={{ objectFit: "cover", objectPosition: objectPosition || "top", width: "100%", height: "100%" }}
        />
      )}
    </Box>
  );
}
