import { Box } from "@mui/material";
import { center, roundedBorder, sizing } from "../helpers/styles";
import { Card } from "../../models/card";
import { getGradient, getPalettes } from "../helpers/palette";
import { ManaCost } from "../helpers/symbols/ManaCost";
import { LegendaryHeader } from "./specifics/LegendaryHeader";
import { clickHandler } from "../helpers/general";


type NameplateProps = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function Nameplate({ card, onClick }: NameplateProps) {
  const { name, manaCost, typeline } = card;
  
  const [color1, color2, multicolor] = getPalettes(card);
  const background = getGradient(color1.dark, color2?.dark);
  const color = color2 ? multicolor : color1;
  const isPlaneswalker = typeline.includes("Planeswalker")
  const legendaryHeader = typeline.includes("Legendary") && !isPlaneswalker;

  return (
    <Box
      sx={{
        position: "relative",
        fontSize: "64%",
        fontWeight: "bold",
        mt: isPlaneswalker ? "3.4%" : "5.5%",
        ...sizing(92, 7.5),
      }}
      onClick={(e) => clickHandler(e, onClick, "name")}
    >
      {legendaryHeader && <LegendaryHeader card={card} />}

      <Box
        sx={{
          p: "1%",
          position: "relative",
          zIndex: 1,
          height: "100%",
          background: legendaryHeader ? undefined : background,
          boxShadow: legendaryHeader ? undefined :"-0.10em 0 0.08em rgba(0, 0, 0, 0.4)",
          ...roundedBorder(15, 30),
          ...(isPlaneswalker && {
            borderEndStartRadius: 5,
            borderEndEndRadius: 5,
          })
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
            ...(isPlaneswalker && {
              borderEndStartRadius: 5,
              borderEndEndRadius: 5,
            }),
            ...center({ justifyContent: "space-between" }),
            boxShadow: "inset 0.12em -0.12em 0.12em rgba(0, 0, 0, 0.5), inset -0.12em 0.12em 0.12em rgba(255, 255, 255, 0.5)"
          }}
        >
          <Box>{name}</Box>

          <Box
            sx={{ minWidth: "15%", display: "flex", justifyContent: "flex-end" }}
            onClick={(e) => clickHandler(e, onClick, "manaCost")}
          >
            <ManaCost manaCost={manaCost} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
