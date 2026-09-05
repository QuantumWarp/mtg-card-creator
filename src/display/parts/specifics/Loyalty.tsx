import { Box } from "@mui/material";
import { CardPart } from "../../../models/card";
import { clickHandler } from "../../helpers/general";
import { center, sizing } from "../../helpers/styles";
import { DisplayData } from "../../display-data";

type Props = {
  cardPart: CardPart;
  displayData: DisplayData
}

const loyaltyShape = "polygon(\
65% 0%, 100% 20%, 93% 50%, 90% 80%, 50% 100%,\
10% 80%, 7% 50%, 0% 20%, 35% 0%,\
40% 10%, 50% 15%, 60% 10%)";

export function Loyalty({ cardPart, displayData }: Props) {
  if (!cardPart.loyalty) return;

  return (
    <Box
      sx={{
        position: "absolute",
        height: "1.2em",
        width: "2em",
        bottom: "5.5%",
        right: "3%",
        filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 1))",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          fontSize: "0.7em",
          fontWeight: "bold",
          clipPath: loyaltyShape,
          backgroundColor: "white",
          boxSizing: "border-box",
          ...center(),
        }}
        onClick={(e) => clickHandler(e, displayData, "defense", cardPart)}
      >
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            p: 0.5,
            pt: 1,
            boxSizing: "border-box",
            ...center(),
            ...sizing(85, 85),
            clipPath: loyaltyShape,
          }}
        >
          {cardPart.loyalty}
        </Box>
      </Box>
    </Box>
  );
}
