import { Box, SxProps } from "@mui/material";
import { Card, CardPart } from "../../models/card";
import { Rarity } from "../../models/rarity";
import { clickHandler } from "../helpers/general";
import { BannerBackground } from "./backgrounds/BannerBackground";
import { ColorIndicator } from "./specifics/ColorIndicator";
import { DisplayData } from "../display-data";

type Props = {
  card: Card;
  cardPart: CardPart;
  displayData: DisplayData;
  hideRarity?: boolean;
  sx?: SxProps;
}

export function Typeplate({ card, cardPart, displayData, hideRarity, sx }: Props) {
  const { set, rarity } = card;
  const { typeline } = cardPart;
  const { iconUri } = set;

  const rarityMap: Record<Rarity, string> = {
    common: "",
    uncommon: "invert(0.5) sepia(1) saturate(1) hue-rotate(175deg)",
    rare: "invert(0.5) sepia(1) saturate(5) hue-rotate(18deg)",
    mythic: "invert(0.5) sepia(1) saturate(5) hue-rotate(-35deg)",
  };

  const isPlaneswalker = typeline?.includes("Planeswalker");
  const dark = !displayData.isFront;

  return (
    <BannerBackground
      dark={dark}
      cardPart={cardPart}
      onClick={(e) => clickHandler(e, displayData, "name")}
      sx={{
        fontSize: "56%",
        ...(isPlaneswalker && { borderEndStartRadius: 5, borderEndEndRadius: 5 }),
        ...sx
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <ColorIndicator cardPart={cardPart} />
        <Box>{typeline}</Box>
      </Box>

      {!hideRarity && <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
        onClick={(e) => clickHandler(e, displayData, "rarity")}
      >
        <img
          src={iconUri || "./custom-set.svg"}
          style={{ position: "absolute", width: "1.56em", height: "1.55em" }}
        />
        <img
          src={iconUri || "./custom-set.svg"}
          style={{ position: "absolute", width: "1.44em", height: "1.45em" }}
        />
        <img
          src={iconUri || "./custom-set.svg"}
          style={{
            filter: rarityMap[rarity],
            width: "1.5em",
            height: "1.5em"
          }}
        />
      </Box>}
    </BannerBackground>
  );
}
