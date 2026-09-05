import { Box, SxProps } from "@mui/material";
import { Card, CardPart } from "../../models/card";
import { ManaCost } from "../helpers/symbols/ManaCost";
import { LegendaryHeader } from "./specifics/LegendaryHeader";
import { clickHandler } from "../helpers/general";
import { FlipIcon } from "./specifics/FlipIcon";
import { BannerBackground } from "./backgrounds/BannerBackground";
import { DisplayData } from "../display-data";


type NameplateProps = {
  card: Card;
  cardPart: CardPart;
  displayData: DisplayData;
  showFlip?: boolean;
  sx?: SxProps;
}

export function Nameplate({ card, cardPart, displayData, showFlip, sx }: NameplateProps) {
  const { name, manaCost, typeline } = cardPart;
  const isPlaneswalker = typeline?.includes("Planeswalker");
  const legendaryHeader = typeline?.includes("Legendary") && !isPlaneswalker;
  const dark = !displayData.isFront;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const smallHeight = Boolean((sx as any)?.height);

  return (
    <BannerBackground
      allowTint
      dark={dark}
      removeOuterBorder={legendaryHeader}
      cardPart={cardPart}
      onClick={(e) => clickHandler(e, displayData, "name", cardPart)}
      sx={{
        mt: isPlaneswalker ? "3.4%" : "5.5%",
        ...(card.doubleFaceType && !displayData.isFront && { color: "white" }),
        ...(isPlaneswalker && { borderEndEndRadius: 5 }),
        ...(isPlaneswalker && !showFlip && { borderEndStartRadius: 5 }),
        ...sx
      }}
    >
      {legendaryHeader && <LegendaryHeader cardPart={cardPart} />}

      <Box sx={{ display: "flex", gap: 1, whiteSpace: "nowrap", fontSize: smallHeight ? "0.9em" : undefined }}>
        {showFlip && <FlipIcon card={card} displayData={displayData} />}

        <Box>{name}</Box>
      </Box>

      <Box
        sx={{
          minWidth: "15%", display: "flex", justifyContent: "flex-end",
          fontSize: smallHeight ? "0.8em" : undefined
        }}
        onClick={(e) => clickHandler(e, displayData, "manaCost", cardPart)}
      >
        <ManaCost manaCost={manaCost} />
      </Box>
    </BannerBackground>
  );
}
