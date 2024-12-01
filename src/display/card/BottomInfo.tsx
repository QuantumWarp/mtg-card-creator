import { Box } from "@mui/material";
import { Card } from "../../models/card";

export function BottomInfo({ card }: { card: Card }) {
  const rarity = card.rarity;
  const rarityLetter = rarity?.toUpperCase()[0];

  const cardCount = card.set.cardCount.toString();
  let collectorNumber = card.collectorNumber.toString();
  collectorNumber = collectorNumber.padStart(cardCount?.length || 0, '0');

  const setCode = card.set.code.toUpperCase();
  const artist = card.artist;

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "2.5%",
        px: 4,
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        color: 'white',
        fontSize: "12px"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <Box>{collectorNumber}/{cardCount} {rarityLetter}</Box>
        <Box>{setCode} - {artist}</Box>
      </Box>

      <Box mt={card.power !== undefined ? 1.8 : 0}>
        {card.real ? "© Wizards of the Coast" : "Custom Card"}
      </Box>
    </Box>
  );
}
