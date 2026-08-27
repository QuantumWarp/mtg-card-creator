import { Box, SxProps } from "@mui/material";
import { center, roundedBorder, sizing } from "../helpers/styles";
import { Card } from "../../models/card";
import { getGradient, getPalettes } from "../helpers/palette";
import { ManaCost } from "../helpers/symbols/ManaCost";
import { LegendaryHeader } from "./specifics/LegendaryHeader";
import { clickHandler } from "../helpers/general";
import { FlipIcon } from "./specifics/FlipIcon";


type NameplateProps = {
  card: Card;
  showFlip?: boolean;
  sx?: SxProps;
  onClick?: (part: keyof Card) => void;
}

export function Nameplate({ card, showFlip, sx, onClick }: NameplateProps) {
  const { name, manaCost, typeline } = card;
  
  const [color1, color2, multicolor] = getPalettes(card);
  const background = getGradient(color1.dark, color2?.dark);
  const color = color2 ? multicolor : color1;
  const isPlaneswalker = typeline.includes("Planeswalker");
  const legendaryHeader = typeline.includes("Legendary") && !isPlaneswalker;
  
  const blunting = {
    ...((sx as any)?.borderEndStartRadius === 0 && { borderEndStartRadius: 0 }),
    ...((sx as any)?.borderEndEndRadius === 0 && { borderEndEndRadius: 0 }),
    ...((sx as any)?.borderStartEndRadius === 0 && { borderStartEndRadius: 0 }),
    ...((sx as any)?.borderStartStartRadius === 0 && { borderStartStartRadius: 0 }),
  };

  return (
    <Box
      sx={{
        position: "relative",
        fontSize: "64%",
        fontWeight: "bold",
        mt: isPlaneswalker ? "3.4%" : "5.5%",
        ...sizing(92, 7.5),
        ...sx,
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
          ...(isPlaneswalker && { borderEndStartRadius: 5, borderEndEndRadius: 5 }),
          ...blunting,
        }}
      >
        <Box
          sx={{
            backgroundColor: color.mid,
            p: "0.4% 2.4% 1% 2.4%",
            boxSizing: "border-box",
            border: "0.05em solid black",
            boxShadow: "inset 0.12em -0.12em 0.12em rgba(0, 0, 0, 0.5), inset -0.12em 0.12em 0.12em rgba(255, 255, 255, 0.5)",
            ...sizing(100, 100),
            ...center({ justifyContent: "space-between" }),
            ...roundedBorder(10, 20),
            ...(isPlaneswalker && { borderEndStartRadius: 5, borderEndEndRadius: 5 }),
            ...blunting,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {showFlip && <FlipIcon card={card} onClick={onClick} />}

            <Box>{name}</Box>
          </Box>

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
