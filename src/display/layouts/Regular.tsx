import { Box } from '@mui/material';
import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { PowerToughness } from '../parts/PowerToughness';
import { BottomInfo } from '../parts/BottomInfo';
import { TexturedBackground } from '../parts/TexturedBackground';
import { sizing } from '../helpers/styles';
import { Card } from '../../models/card';
import { getGradient, getPalettes } from '../helpers/palette';

type RegularLayoutProps = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card) => void;
}

export function RegularLayout({
  card, hideFlavorText, onClick
}: RegularLayoutProps) {
  const [color1, color2] = getPalettes(card);
  const background = getGradient(color1.dark, color2?.dark);
  const showPowerToughness = card.power !== undefined || card.toughness !== undefined || card.typeline.toLowerCase().includes("creature");
  const isPlaneswalker = card.typeline.includes("Planeswalker");

  return (
    <Box>
      <TexturedBackground card={card} />

      <Box
        sx={{
          position: "absolute",
          background: background,
          padding: "0 0.8% 0.8% 0.8%",
          borderRadius: "2% 2% 0 0",
          boxShadow: "-0.14em 0.11em 0.05em rgba(0, 0, 0, 0.5)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          ...sizing(88, isPlaneswalker ? 89.6 : 88, 6, isPlaneswalker ? 2.4 : 4),
        }}
      >
        <Nameplate card={card} onClick={onClick} />
        <Art card={card} onClick={onClick} />
        <Typeplate card={card} onClick={onClick} />
        <Textbox card={card} hideFlavorText={hideFlavorText} onClick={onClick} />

        {showPowerToughness && (
          <PowerToughness card={card} onClick={onClick} />
        )}
      </Box>

      <BottomInfo card={card} onClick={onClick} />
    </Box>
  );
}
