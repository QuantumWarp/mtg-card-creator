import { Box } from "@mui/material";
import { CardPart } from "../../../models/card";
import { clickHandler } from "../../helpers/general";
import { center, sizing } from "../../helpers/styles";
import { DisplayData } from "../../display-data";

type Props = {
  cardPart: CardPart;
  displayData: DisplayData
}

export function Defense({ cardPart, displayData }: Props) {
  if (!cardPart.defense) return;

  return (
    <Box
      sx={{
        position: "absolute",
        height: "12%",
        display: "flex",
        width: "15%",
        fontSize: "64%",
        fontWeight: "bold",
        bottom: "3%",
        right: "3%"
      }}
      onClick={(e) => clickHandler(e, displayData, "defense", cardPart)}
    >
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "white",
          boxSizing: "border-box",
          ...center(),
          ...sizing(100, 100, -5),
          boxShadow: "inset 0.12em -0.12em 0.12em rgba(0, 0, 0, 0.6), inset -0.12em 0.12em 0.12em rgba(255, 255, 255, 0.5)"
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            p: 0.5,
            px: 1.2,
            boxSizing: "border-box",
            ...center(),
            ...sizing(90, 85, -5),
            boxShadow: "inset 0.12em -0.12em 0.12em rgba(255, 255, 255, 0.3), inset -0.12em 0.12em 0.12em rgba(0, 0, 0, 0.5)"
          }}
        >
          {cardPart.defense}
        </Box>
      </Box>
    </Box>
  );
}
