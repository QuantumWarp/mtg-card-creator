import { Box } from "@mui/material";
import { center, roundedBorder, sizing } from "../style.helper";
import { Card } from "../../models/card";
import { getGradient, getPalettes } from "../palette";

export function Typeplate({ card }: { card: Card }) {
  const { typeline, set, rarity } = card;
  const { iconUri } = set;

  const rarityMap: Record<string, string> = {
    common: "",
    uncommon: "invert(0.5) sepia(1) saturate(1) hue-rotate(175deg)",
    rare: "invert(0.5) sepia(1) saturate(5) hue-rotate(18deg)",
    mythic: "invert(0.5) sepia(1) saturate(5) hue-rotate(-35deg)",
  };
  
  const [color1, color2, multicolor] = getPalettes(card);
  const background = getGradient(color1.dark, color2?.dark);
  const color = color2 ? multicolor : color1;

  return (
    <Box
      sx={{
        position: "relative",
        height: "8%",
        fontSize: "21px",
        fontWeight: "bold"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          background: background,
          p: "0.8%",
          boxSizing: "border-box",
          boxShadow: "-3px 0 2px rgba(0, 0, 0, 0.4)",
          clipPath: "inset(0px -5px 0px -5px)",
          ...sizing(106, 100, -3),
          ...roundedBorder(15, 30),
        }}
      >
        <Box
          sx={{
            backgroundColor: color.mid,
            p: "0.4% 2.4% 1% 2.4%",
            border: "1px solid black",
            boxSizing: "border-box",
            ...sizing(100, 100),
            ...roundedBorder(10, 20),
            ...center({ justifyContent: "space-between" }),
            boxShadow: "inset 3px -3px 3px rgba(0, 0, 0, 0.5), inset -3px 3px 3px rgba(255, 255, 255, 0.5)"
          }}
        >
          <Box>{typeline}</Box>

          <Box mt={1}>
            <img
              style={{ filter: rarityMap[rarity] }}
              src={iconUri}
              width={28}
              height={28} 
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
