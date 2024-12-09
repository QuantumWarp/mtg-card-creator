import { Box } from "@mui/material";
import { center, roundedBorder, sizing } from "../style.helper";
import { Card } from "../../models/card";
import { getGradient, getPalettes } from "../palette";
import { ManaCost } from "../symbols/ManaCost";

type NameplateProps = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function Nameplate({ card, onClick }: NameplateProps) {
  const { name, manaCost } = card;
  
  const [color1, color2, multicolor] = getPalettes(card);
  const background = getGradient(color1.dark, color2?.dark);
  const color = color2 ? multicolor : color1;

  return (
    <Box
      sx={{
        position: "relative",
        height: "8%",
        fontSize: "64%",
        fontWeight: "bold"
      }}
      onClick={(e) => {
        if (!onClick) return;
        onClick("name");
        e.stopPropagation();
      }}
    >
      <Box
        sx={{
          position: "absolute",
          background: background,
          p: "1%",
          boxSizing: "border-box",
          boxShadow: "-0.10em 0 0.08em rgba(0, 0, 0, 0.4)",
          ...sizing(106, 100, -3),
          ...roundedBorder(15, 30),
        }}
      >
        <Box
          sx={{
            backgroundColor: color.mid,
            p: "0.4% 2.4% 1% 2.4%",
            boxSizing: "border-box",
            border: "0.05em solid black",
            ...sizing(100, 100),
            ...roundedBorder(10, 20),
            ...center({ justifyContent: "space-between" }),
            boxShadow: "inset 0.12em -0.12em 0.12em rgba(0, 0, 0, 0.5), inset -0.12em 0.12em 0.12em rgba(255, 255, 255, 0.5)"
          }}
        >
          <Box>{name}</Box>
          <Box
            minWidth="15%"
            display="flex"
            justifyContent="flex-end"
            onClick={(e) => {
              if (!onClick) return;
              onClick("manaCost");
              e.stopPropagation();
            }}
          >
            <ManaCost manaCost={manaCost} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
