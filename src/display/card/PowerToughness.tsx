import { Box } from "@mui/material";
import { center, roundedBorder, sizing } from "../style.helper";
import { Card } from "../../models/card";
import { getPalettes } from "../palette";

export function PowerToughness({ card }: { card: Card }) {
  const [color1, color2, multicolor] = getPalettes(card);
  const color = color2 ? multicolor : color1;

  return (
    <Box
      sx={{
        position: "absolute",
        height: "6.5%",
        display: "flex",
        width: "18%",
        fontSize: "24px",
        fontWeight: "bold",
        bottom: "-12px",
        right: "-14px"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          backgroundColor: color.mid,
          boxSizing: "border-box",
          ...center(),
          ...sizing(100, 100, -5),
          ...roundedBorder(10, 20),
          boxShadow: "inset 3px -3px 3px rgba(0, 0, 0, 0.6), inset -3px 3px 3px rgba(255, 255, 255, 0.5)"
        }}
      >
        <Box
          sx={{
            backgroundColor: color.mid,
            p: 0.5,
            px: 1.2,
            boxSizing: "border-box",
            ...center(),
            ...sizing(90, 85, -5),
            ...roundedBorder(10, 20),
            boxShadow: "inset 3px -3px 3px rgba(255, 255, 255, 0.3), inset -3px 3px 3px rgba(0, 0, 0, 0.5)"
          }}
        >
          {card.power}/{card.toughness}
        </Box>
      </Box>
    </Box>
  );
}
