import { Box } from "@mui/material";
import { CardPart } from "../../../models/card";
import { clickHandler } from "../../helpers/general";
import { center, sizing } from "../../helpers/styles";
import { DisplayData } from "../../display-data";

type Props = {
  cardPart: CardPart;
  displayData: DisplayData
}

const starShape = "polygon(\
50% 0%, 62% 12%, 100% 0%, 88% 38%, 100% 50%, 88% 62%, 100% 100%, 62% 88%,\
50% 100%, 38% 88%, 0% 100%, 12% 62%, 0% 50%, 12% 38%, 0% 0%, 38% 12%)";

export function Defense({ cardPart, displayData }: Props) {
  if (!cardPart.defense) return;

  return (
    <Box
      sx={{
        position: "absolute",
        height: "1.4em",
        width: "1.4em",
        bottom: "-1.4%",
        right: "2.2%",
        filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 1))",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          fontSize: "0.75em",
          fontWeight: "bold",
          clipPath: starShape,
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
            boxSizing: "border-box",
            ...center(),
            ...sizing(82, 82, -5),
            clipPath: starShape,
          }}
        >
          {cardPart.defense}
        </Box>
      </Box>
    </Box>
  );
}
