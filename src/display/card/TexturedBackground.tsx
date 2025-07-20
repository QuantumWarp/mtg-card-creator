import { Box } from "@mui/material";
import { sizing } from "../style.helper";
import { getPalettes, palettes } from "../palette";
import { Card } from "../../models/card";

export function TexturedBackground({ card }: { card: Card }) {
  const { typeline } = card;
  const [color1, color2, multicolor] = getPalettes(card);
  const color = color2 ? multicolor : color1;
  
  const isLegendary = typeline.includes("Legendary");
  const isLand = typeline.includes("Land");
  const isArtifact = typeline.includes("Artifact");

  const base = isLand ? "#a0876f" : (isArtifact ? palettes.Colorless.mid : color.mid);
  const offset = isLegendary ? 2 : 0;

  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: base,
        borderRadius: "1.4% 1.4% 15% 15%",
        ...sizing(93, 88 - offset, 3.5, 2.5 + offset),
      }}
    />
  );
}
