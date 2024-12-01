import { Box } from "@mui/material";
import { sizing } from "../style.helper";
import { getPalettes } from "../palette";
import { Card } from "../../models/card";

export function TexturedBackground({ card }: { card: Card }) {
  const { typeline } = card;
  const [color1, color2, multicolor] = getPalettes(card);
  const color = color2 ? multicolor : color1;

  const base = typeline.includes("Land") ? "#a0876f" : color.mid;

  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: base,
        borderRadius: "8px 8px 80px 80px",
        ...sizing(93, 88, 3.5, 2.5),
      }}
    />
  );
}
