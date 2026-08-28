import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { PowerToughness } from '../parts/PowerToughness';
import { BottomInfo } from '../parts/BottomInfo';
import { TexturedBackground } from '../parts/backgrounds/TexturedBackground';
import { Card } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';
import { GradientBackground } from '../parts/backgrounds/GradientBackground';
import { sizing } from '../helpers/styles';
import { Box } from '@mui/material';
import { spliceFace } from '../helpers/general';

type Props = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card) => void;
}

export function AdventureLayout({ card, hideFlavorText, onClick }: Props) {
  return (
    <BaseBackground
      texture={<TexturedBackground card={card} />}
    >
      <Nameplate card={card} onClick={onClick} hideFlip />
      
      <GradientBackground card={card} sx={sizing(87.5, 41)}>
        <Art card={card} onClick={onClick} />
      </GradientBackground>
      
      <Typeplate card={card} onClick={onClick} />

      <GradientBackground showBottom card={card} sx={{ flex: 1, ...sizing(87.5, 0) }}>
        <MiniCard card={card} />

        <Box sx={{ flex: 1 }}>
          <Textbox card={card} hideFlavorText={hideFlavorText} onClick={onClick} />
        </Box>
      </GradientBackground>

      <PowerToughness card={card} onClick={onClick} />

      <BottomInfo card={card} onClick={onClick} />
    </BaseBackground>
  );
}


function MiniCard({ card }: { card: Card }) {
  const subFace = card.cardFaces && card.cardFaces[1];
  if (!subFace) return;

  const cardWithFace = spliceFace(card, 1);
  const sameColor = card.colors?.length === 1
    && card.colors?.length === cardWithFace.colors?.length
    && card.colors?.[0] === subFace.colors?.[0];

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Nameplate
        hideFlip
        card={cardWithFace}
        sx={{
          ...sizing(107, 18),
          ml: "-7%",
          mt: 0,
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
        }}
      />

      <Typeplate
        hideRarity
        card={cardWithFace}
        sx={{
          ...sizing(107, 18),
          ml: "-7%",
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
        }}
      />

      <GradientBackground
        showBottom={!sameColor}
        card={cardWithFace}
        sx={{ flex: 1, height: 0, boxShadow: "none" }}
      >
        <Textbox card={cardWithFace} />
      </GradientBackground>
    </Box>
  );
}