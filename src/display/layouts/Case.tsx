import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { BottomInfo } from '../parts/BottomInfo';
import { TexturedBackground } from '../parts/backgrounds/TexturedBackground';
import { Card } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';
import { Box } from '@mui/material';
import { sizing } from '../helpers/styles';
import { GradientBackground } from '../parts/backgrounds/GradientBackground';

type Props = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card) => void;
}

export function CaseLayout({ card, hideFlavorText, onClick }: Props) {
  return (
    <BaseBackground
      texture={<TexturedBackground card={card} />}
    >
      <Nameplate card={card} onClick={onClick} />
      
      <GradientBackground card={card} sx={{ flex: 1, ...sizing(87.5, 0)}}>
        <Box sx={{ flex: 1 }}>
          <Art card={card} onClick={onClick} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Textbox card={card} hideFlavorText={hideFlavorText} onClick={onClick} />
        </Box>
      </GradientBackground>

      <Typeplate card={card} onClick={onClick} />

      <BottomInfo card={card} onClick={onClick} />
    </BaseBackground>
  );
}
