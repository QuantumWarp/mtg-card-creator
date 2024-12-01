import { Box } from "@mui/material";
import { center, roundedBorder, sizing } from "../style.helper";
import { Card } from "../../models/card";
import { getGradient, getPalettes } from "../palette";
import { ManaCost } from "../symbols/ManaCost";

export function Nameplate({ card }: { card: Card }) {
  const { name, manaCost } = card;
  
  const [color1, color2, multicolor] = getPalettes(card);
  const background = getGradient(color1.dark, color2?.dark);
  const color = color2 ? multicolor : color1;

  return (
    <Box
      sx={{
        position: "relative",
        height: "8%",
        fontSize: "24px",
        fontWeight: "bold"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          background: background,
          p: "1%",
          boxSizing: "border-box",
          boxShadow: "-3px 0 2px rgba(0, 0, 0, 0.4)",
          ...sizing(106, 100, -3),
          ...roundedBorder(15, 30),
        }}
      >
        <Box
          sx={{
            backgroundColor: color.mid,
            p: "0.4% 2.4% 1% 2.4%",
            boxSizing: "border-box",
            border: "1px solid black",
            ...sizing(100, 100),
            ...roundedBorder(10, 20),
            ...center({ justifyContent: "space-between" }),
            boxShadow: "inset  3px -3px 3px rgba(0, 0, 0, 0.5), inset -3px 3px 3px rgba(255, 255, 255, 0.5)"
          }}
        >
          <Box>{name}</Box>
          <ManaCost manaCost={manaCost} />
        </Box>
      </Box>
    </Box>
  );
}
