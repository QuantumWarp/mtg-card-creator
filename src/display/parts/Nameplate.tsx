import { Box, SxProps } from "@mui/material";
import { Card } from "../../models/card";
import { ManaCost } from "../helpers/symbols/ManaCost";
import { LegendaryHeader } from "./specifics/LegendaryHeader";
import { clickHandler } from "../helpers/general";
import { FlipIcon } from "./specifics/FlipIcon";
import { BannerBackground } from "./backgrounds/BannerBackground";


type NameplateProps = {
  card: Card;
  hideFlip?: boolean;
  dark?: boolean
  sx?: SxProps;
  onClick?: (part: keyof Card) => void;
}

export function Nameplate({ card, hideFlip, dark, sx, onClick }: NameplateProps) {
  const { name, manaCost, typeline, cardFaces } = card;
  const showFlip = !hideFlip && cardFaces && cardFaces.length > 1;
  const isPlaneswalker = typeline.includes("Planeswalker");
  const legendaryHeader = typeline.includes("Legendary") && !isPlaneswalker;

  return (
    <BannerBackground
      dark={dark}
      removeOuterBorder={legendaryHeader}
      card={card}
      onClick={(e) => clickHandler(e, onClick, "name")}
      sx={{
        mt: isPlaneswalker ? "3.4%" : "5.5%", 
        ...(isPlaneswalker && { borderEndStartRadius: 5, borderEndEndRadius: 5 }),
        ...sx
      }}
    >
      {legendaryHeader && <LegendaryHeader card={card} />}

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
    </BannerBackground>
  );
}
