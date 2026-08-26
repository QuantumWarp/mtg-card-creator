import { Box } from "@mui/material";
import { Card } from "../../models/card";
import { getGradient, getPalettes } from "../helpers/palette";
import { TextParser } from "../helpers/symbols/TextParser";
import { sizing } from "../helpers/styles";
import { clickHandler } from "../helpers/general";

type TextboxProps = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part: keyof Card) => void;
}

export function Textbox({ card, hideFlavorText, onClick }: TextboxProps) {
  const { text, flavorText } = card;
  const [color1, color2] = getPalettes(card);
  const background = getGradient(color1.light, color2?.light);

  return (
    <Box
      sx={{
        ...sizing(87.5, 0),
        marginTop: "-0.05%",
        flex: 1,
        background: getGradient(color1.dark, color2?.dark),
        boxSizing: "border-box",
        padding: "0 0.8% 0.8% 0.8%",
        boxShadow: "-0.14em 0 0.05em rgba(0, 0, 0, 0.4)",
      }}
    >
      <Box
        sx={{
          background: background,
          p: "1.8%",
          height: "100%",
          boxSizing: "border-box",
          border: "0.05em solid black",
          display: "flex",
          lineHeight: 1,
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "start",
          fontSize: (68 * (Number(card.textScaling) || 1)) + "%",
          boxShadow: "inset 0.04em 0.04em 0.16em 0.12em rgba(0,0,0,0.3)",
          overflow: "auto",
          whiteSpace: "pre-line"
        }}
        onClick={(e) => clickHandler(e, onClick, "text")}
      >
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <TextParser text={text} />
        </Box>

        {flavorText && !hideFlavorText && (
          <Box>
            <Box
              sx={{
                height: '0.1em',
                background: 'linear-gradient(to right, transparent, #A9A9A9 50%, transparent)',
                borderRadius: '100%',
                width: '100%',
                my: "0.4em"
              }}
            />

            <Box
              sx={{ my: "0.2em", fontSize: "90%" }}
              onClick={(e) => clickHandler(e, onClick, "flavorText")}
            >
              <em>
                <TextParser text={flavorText} />
              </em>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
