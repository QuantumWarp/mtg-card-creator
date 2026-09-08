import { Box, SxProps } from "@mui/material";
import { CardPart } from "../../models/card";
import { getGradient, getPalettes } from "../helpers/palette";
import { TextParser } from "../helpers/symbols/TextParser";
import { clickHandler } from "../helpers/general";
import { sizing } from "../helpers/styles";
import { DisplayData } from "../display-data";

type TextboxProps = {
  cardPart: CardPart;
  displayData: DisplayData;
  sx?: SxProps;
  noFlavor?: boolean;
  noText?: boolean;
}

export function Textbox({ cardPart, displayData, sx, noFlavor, noText }: TextboxProps) {
  const { text, flavorText } = cardPart;
  const [color1, color2] = getPalettes(cardPart);
  const background = getGradient(color1.light, color2?.light);

  return (
    <Box
      sx={{
        background: background,
        p: "0.3em",
        boxSizing: "border-box",
        border: "0.05em solid black",
        display: "flex",
        lineHeight: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "start",
        fontSize: (68 * (Number(cardPart.textScaling) || 1)) + "%",
        boxShadow: "inset 0.04em 0.04em 0.16em 0.12em rgba(0,0,0,0.3)",
        overflow: "auto",
        whiteSpace: "pre-line",
        ...sizing(100, 100),
        ...sx
      }}
      onClick={(e) => clickHandler(e, displayData, "text", cardPart)}
    >
      {text && !noText && <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
        <TextParser text={text} />
      </Box>}

      {flavorText && !noFlavor && !displayData.hideFlavorText && (
        <Box sx={{ width: "100%" }}>
          {text && !noText && (<Box
            sx={{
              height: '0.1em',
              background: 'linear-gradient(to right, transparent, #A9A9A9 50%, transparent)',
              borderRadius: '100%',
              width: '100%',
              my: "0.4em"
            }}
          />)}

          <Box
            sx={{ my: "0.2em", fontSize: "90%" }}
            onClick={(e) => clickHandler(e, displayData, "flavorText", cardPart)}
          >
            <em>
              <TextParser text={flavorText} />
            </em>
          </Box>
        </Box>
      )}
    </Box>
  );
}
