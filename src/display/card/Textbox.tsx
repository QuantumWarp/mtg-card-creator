import { Box } from "@mui/material";
import { Card } from "../../models/card";
import { getGradient, getPalettes } from "../palette";
import { TextParser } from "../symbols/TextParser";

export function Textbox({ card }: { card: Card }) {
  const { text } = card;
  const [color1, color2] = getPalettes(card);
  const background = getGradient(color1.light, color2?.light);

  return (
    <Box
      sx={{
        background: background,
        p: 1,
        flex: 28,
        boxSizing: "border-box",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        textAlign: "start",
        fontSize: "24px",
        boxShadow: "inset 1px 1px 4px 3px rgba(0,0,0,0.3)",
        overflow: "auto",
        whiteSpace: "pre-line"
      }}
    >
      <TextParser text={text} />
    </Box>
  );
}
