import { Box } from "@mui/material";
import { Card } from "../../models/card";

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

  const clickHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    part: keyof Card
  ) => {
    if (!onClick) return;
    onClick(part);
    e.stopPropagation();
  }

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "2.5%",
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
        <Box onClick={(e) => clickHandler(e, "collectorNumber")}>
          <span>{collectorNumber}</span>
          /
          <span onClick={(e) => clickHandler(e, "set")}>{cardCount}</span>
          {" "}
          <span onClick={(e) => clickHandler(e, "rarity")}>{rarityLetter}</span>
        </Box>

        <Box>
          <span onClick={(e) => clickHandler(e, "set")}>{setCode}</span>
          <span style={{ visibility: (setCode || artist) ? "visible" : "hidden"}}> - </span>
          <span onClick={(e) => clickHandler(e, "artist")}>{artist}</span>
        </Box>
      </Box>

      <Box mt={showPowerToughness ? "2.8%" : 0}>
        {card.real ? "© Wizards of the Coast" : "Custom Card"}
      </Box>
    </Box>
  );
}
