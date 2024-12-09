import { Box } from "@mui/material";
import { Card } from "../../models/card";
import { getGradient, getPalettes } from "../palette";
import { TextParser } from "../symbols/TextParser";

type TextboxProps = {
  card: Card;
  onClick?: (part: keyof Card) => void;
}

export function Textbox({ card, onClick }: TextboxProps) {
  const { text, flavorText } = card;
  const [color1, color2] = getPalettes(card);
  const background = getGradient(color1.light, color2?.light);

  return (
    <Box
      sx={{
        background: background,
        p: "1.8%",
        flex: 28,
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
      onClick={(e) => {
        if (!onClick) return;
        onClick("text");
        e.stopPropagation();
      }}
    >
      <Box flex={1} display="flex" alignItems="center">
        <TextParser text={text} />
      </Box>

      {flavorText && (
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
            my="0.2em"
            fontSize="90%" 
            onClick={(e) => {
              if (!onClick) return;
              onClick("flavorText");
              e.stopPropagation();
            }}
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
