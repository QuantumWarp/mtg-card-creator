import { Box } from "@mui/material";
import { Card, CardPart } from "../../models/card";
import { clickHandler } from "../helpers/general";
import { DisplayData } from "../display-data";

type BottomInfoProps = {
  card: Card;
  cardPart: CardPart;
  displayData: DisplayData;
}

export function BottomInfo({ card, cardPart, displayData }: BottomInfoProps) {
  const rarity = card.rarity;
  const rarityLetter = rarity?.toUpperCase()[0];
  const showPowerToughness = cardPart.power !== undefined || cardPart.toughness !== undefined || cardPart.typeline?.toLowerCase().includes("creature");

  const cardCount = card.set.total?.toString();
  let collectorNumber = card.collectorNumber?.toString();
  collectorNumber = collectorNumber?.padStart(cardCount?.length || 0, '0');

  const setCode = card.set.code?.toUpperCase();
  const artist = cardPart.artist;

  return (
    <Box
      sx={{
        mt: "1%",
        mb: "2.5%",
        px: "6.4%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        color: 'white',
        fontSize: "32%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <Box onClick={(e) => clickHandler(e, displayData, "collectorNumber")}>
          <span>{collectorNumber}</span>
          /
          <span onClick={(e) => clickHandler(e, displayData, "set")}>{cardCount}</span>
          {" "}
          <span onClick={(e) => clickHandler(e, displayData, "rarity")}>{rarityLetter}</span>
        </Box>

        <Box>
          <span onClick={(e) => clickHandler(e, displayData, "set")}>{setCode}</span>
          <span style={{ visibility: (setCode || artist) ? "visible" : "hidden"}}> - </span>
          <span onClick={(e) => clickHandler(e, displayData, "artist")}>{artist}</span>
        </Box>
      </Box>

      <Box sx={{ mt: showPowerToughness || cardPart.loyalty ? "4.2%" : 0 }}>
        {card.real ? "© Wizards of the Coast" : "Custom Card"}
      </Box>
    </Box>
  );
}
