import { Box } from "@mui/material";
import { Card } from "../../../models/card";
import { clickHandler } from "../../helpers/general";
import { center, sizing } from "../../helpers/styles";

type Props = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function Loyalty({ card, onClick }: Props) {
  if (!card.loyalty) return;

  return (
    <Box
      sx={{
        position: "absolute",
        height: "6.5%",
        display: "flex",
        width: "18%",
        fontSize: "64%",
        fontWeight: "bold",
        bottom: "5%",
        right: "3.5%"
      }}
      onClick={(e) => clickHandler(e, onClick, "loyalty")}
    >
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "white",
          boxSizing: "border-box",
          ...center(),
          ...sizing(100, 100, -5),
          boxShadow: "inset 0.12em -0.12em 0.12em rgba(0, 0, 0, 0.6), inset -0.12em 0.12em 0.12em rgba(255, 255, 255, 0.5)"
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            p: 0.5,
            px: 1.2,
            boxSizing: "border-box",
            ...center(),
            ...sizing(90, 85, -5),
            boxShadow: "inset 0.12em -0.12em 0.12em rgba(255, 255, 255, 0.3), inset -0.12em 0.12em 0.12em rgba(0, 0, 0, 0.5)"
          }}
        >
          {card.loyalty}
        </Box>
      </Box>
    </Box>
  );
}
