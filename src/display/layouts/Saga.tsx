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
import { PowerToughness } from '../parts/PowerToughness';

type Props = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card) => void;
}

export function SagaLayout({ card, hideFlavorText, onClick }: Props) {
  const sagaPart = { ...card, flavorText: "" };
  const creaturePart = { ...card, text: "" };

  const isCreature = card.typeline.includes("Creature");

  return (
    <BaseBackground
      texture={<TexturedBackground card={card} />}
    >
      <Nameplate card={card} onClick={onClick} />
      
      <GradientBackground card={card} sx={{ flex: 1, ...sizing(87.5, 0)}}>
        <Box sx={{ flex: 1 }}>
          <Textbox card={sagaPart} hideFlavorText={hideFlavorText} onClick={onClick} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Art card={card} onClick={onClick} />
        </Box>
      </GradientBackground>

      <Typeplate card={card} onClick={onClick} />

      {isCreature && (
        <>
          <GradientBackground showBottom card={card} sx={{ ...sizing(87.5, 12)}}>
            <Textbox card={creaturePart} hideFlavorText={hideFlavorText} onClick={onClick} />
          </GradientBackground>

          <PowerToughness card={card} onClick={onClick} />
        </>
      )}

      <BottomInfo card={card} onClick={onClick} />
    </BaseBackground>
  );
}
