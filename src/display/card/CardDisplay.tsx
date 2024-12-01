import { Box } from '@mui/material';
import { Nameplate } from './Nameplate';
import { Art } from './Art';
import { Textbox } from './Textbox';
import { Typeplate } from './Typeplate';
import { PowerToughness } from './PowerToughness';
import { BottomInfo } from './BottomInfo';
import { TexturedBackground } from './TexturedBackground';
import { sizing } from '../style.helper';
import { Card } from '../../models/card';
import { getGradient, getPalettes } from '../palette';

export function CardDisplay({ card }: { card: Card }) {
  const [color1, color2] = getPalettes(card);
  const background = getGradient(color1.dark, color2?.dark);

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "black",
        fontFamily: "Matrix, Garamond, serif",
        borderRadius: 4,
        width: 500,
        height: 700,
        color: "black"
      }}
    >
      <TexturedBackground card={card} />

      <Box
        sx={{
          position: "absolute",
          background: background,
          borderRadius: "2% 2% 0 0",
          padding: "0 0.8% 0.8% 0.8%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-5px 4px 2px rgba(0, 0, 0, 0.5)",
          ...sizing(88, 88, 6, 4),
        }}
      >
        <Nameplate card={card} />
        <Art card={card} />
        <Typeplate card={card} />
        <Textbox card={card} />

        {card.power !== undefined && (
          <PowerToughness card={card} />
        )}
      </Box>

      <BottomInfo card={card} />
    </Box>
  );
}
