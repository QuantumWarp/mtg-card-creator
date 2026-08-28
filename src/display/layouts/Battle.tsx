import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { BottomInfo } from '../parts/BottomInfo';
import { Card } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';
import { GradientBackground } from '../parts/backgrounds/GradientBackground';
import { roundedBorder, sizing } from '../helpers/styles';
import { RotatedContent } from '../parts/backgrounds/RotatedContent';
import { Box } from '@mui/material';

type Props = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card) => void;
}

export function BattleLayout({ card, hideFlavorText, onClick }: Props) {
  return (
    <BaseBackground>
      <RotatedContent sx={{ ml: "-2%" }}>
        <Nameplate card={card} onClick={onClick} sx={{ mt: 0, height:"12%" }} />

        <Box sx={{ ...sizing(96, 41), position: "relative" }}>
          <Art card={card} onClick={onClick}
            sx={{
              position: "absolute",
              zIndex: -1,
              ...sizing(100, 120, 0, -10),
              ...roundedBorder(16, 140),
            }}
          />
        </Box>
        
        <Typeplate card={card} onClick={onClick} sx={{ height:"12%" }}  />

        <GradientBackground showBottom card={card} sx={{ flex: 1, ...sizing(87.5, 0) }}>
          <Textbox card={card} hideFlavorText={hideFlavorText} onClick={onClick} />
        </GradientBackground>
      </RotatedContent>

      <BottomInfo card={card} onClick={onClick} />
    </BaseBackground>
  );
}
