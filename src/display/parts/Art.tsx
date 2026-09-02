import { Box, SxProps } from "@mui/material";
import { CardPart } from "../../models/card";
import { sizing } from "../helpers/styles";
import { clickHandler } from "../helpers/general";
import { DisplayData } from "../display-data";

type Props = {
  cardPart: CardPart;
  displayData: DisplayData;
  objectPosition?: string;
  sx?: SxProps;
}

export function Art({ cardPart, displayData, objectPosition, sx }: Props) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        border: "0.06em solid black",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch",
        overflow: "hidden",
        ...sizing(100, 100),
        ...sx,
      }}
      onClick={(e) => clickHandler(e, displayData, "artUri", cardPart)}
    >
      {cardPart.artUri && (
        <img
          src={cardPart.artUri}
          style={{ objectFit: "cover", objectPosition: objectPosition || "top", width: "100%", height: "100%" }}
        />
      )}
    </Box>
  );
}
