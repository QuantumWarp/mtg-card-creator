import { Box } from "@mui/material";
import { Card } from "../../models/card";
import { clickHandler } from "../helpers/general";

type BottomInfoProps = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function BottomInfo({ card, onClick }: BottomInfoProps) {
  const rarity = card.rarity;
  const rarityLetter = rarity?.toUpperCase()[0];
  const showPowerToughness = card.power !== undefined || card.toughness !== undefined || card.typeline.toLowerCase().includes("creature");

  const cardCount = card.set.cardCount.toString();
  let collectorNumber = card.collectorNumber.toString();
  collectorNumber = collectorNumber.padStart(cardCount?.length || 0, '0');

  const setCode = card.set.code.toUpperCase();
  const artist = card.artist;

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
        <Box onClick={(e) => clickHandler(e, onClick, "collectorNumber")}>
          <span>{collectorNumber}</span>
          /
          <span onClick={(e) => clickHandler(e, onClick, "set")}>{cardCount}</span>
          {" "}
          <span onClick={(e) => clickHandler(e, onClick, "rarity")}>{rarityLetter}</span>
        </Box>

        <Box>
          <span onClick={(e) => clickHandler(e, onClick, "set")}>{setCode}</span>
          <span style={{ visibility: (setCode || artist) ? "visible" : "hidden"}}> - </span>
          <span onClick={(e) => clickHandler(e, onClick, "artist")}>{artist}</span>
        </Box>
      </Box>

      <Box sx={{ mt: showPowerToughness ? "4.2%" : 0 }}>
        {card.real ? "© Wizards of the Coast" : "Custom Card"}
      </Box>
    </Box>
  );
}
