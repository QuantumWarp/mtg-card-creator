import { Box } from "@mui/material";
import { center, roundedBorder, sizing } from "../helpers/styles";
import { CardPart } from "../../models/card";
import { getPalettes } from "../helpers/palette";
import { clickHandler } from "../helpers/general";
import { DisplayData } from "../display-data";

type PowerToughnessProps = {
  cardPart: CardPart;
  displayData: DisplayData;
}

export function PowerToughness({ cardPart, displayData }: PowerToughnessProps) {
  const showPowerToughness = cardPart.power !== undefined
    || cardPart.toughness !== undefined
    || cardPart.typeline?.toLowerCase().includes("creature");
  if (!showPowerToughness) return null;

  const [color1, color2, multicolor] = getPalettes(cardPart);
  const color = color2 ? multicolor : color1;

  return (
    <Box
      sx={{
        position: "absolute",
        height: "6.5%",
        display: "flex",
        width: "18%",
        fontSize: "64%",
        fontWeight: "bold",
        bottom: "5%",
        right: "3.5%"
      }}
      onClick={(e) => clickHandler(e, displayData, "power")}
    >
      <Box
        sx={{
          position: "absolute",
          backgroundColor: color.mid,
          boxSizing: "border-box",
          ...center(),
          ...sizing(100, 100, -5),
          ...roundedBorder(10, 20),
          boxShadow: "inset 0.12em -0.12em 0.12em rgba(0, 0, 0, 0.6), inset -0.12em 0.12em 0.12em rgba(255, 255, 255, 0.5)"
        }}
      >
        <Box
          sx={{
            backgroundColor: color.mid,
            p: 0.5,
            px: 1.2,
            boxSizing: "border-box",
            ...center(),
            ...sizing(90, 85, -5),
            ...roundedBorder(10, 20),
            boxShadow: "inset 0.12em -0.12em 0.12em rgba(255, 255, 255, 0.3), inset -0.12em 0.12em 0.12em rgba(0, 0, 0, 0.5)"
          }}
        >
          <span>{cardPart.power || "?"}</span>
          /
          <span onClick={(e) => clickHandler(e, displayData, "toughness")}>
            {cardPart.toughness || "?"}
          </span>
        </Box>
      </Box>
    </Box>
  );
}
