import { Box } from "@mui/material";
import { Card } from "../../models/card";

export function Art({ card }: { card: Card }) {
  return (
    <Box
      sx={{
        flex: 38,
        height: 0,
        boxSizing: "border-box",
        border: "2px solid black",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "stretch"
      }}
    >
      <img src={card.artUri} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
    </Box>
  );
}
