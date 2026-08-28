import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { BottomInfo } from '../parts/BottomInfo';
import { Card } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';
import { GradientBackground } from '../parts/backgrounds/GradientBackground';
import { sizing } from '../helpers/styles';
import { RotatedContent } from '../parts/backgrounds/RotatedContent';
import { Box } from '@mui/material';
import { spliceFace } from '../helpers/general';
import { TexturedBackground } from '../parts/backgrounds/TexturedBackground';

type Props = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card) => void;
}

export function SplitLayout({ card, onClick }: Props) {
  return (
    <BaseBackground>
      <RotatedContent sx={{ flexDirection: "row", ...sizing(128, 72, 0, 13) }}>
        <MiniCard card={card} index={0} />
        <MiniCard card={card} index={1} />
      </RotatedContent>

      <BottomInfo card={card} onClick={onClick} />
    </BaseBackground>
  );
}

function MiniCard({ card, index }: { card: Card, index: number }) {
  const subFace = card.cardFaces && card.cardFaces[index];
  if (!subFace) return;

  const cardWithFace = spliceFace(card, index, true);

  return (
    <Box sx={{ flex: 1, height: "100%", position: "relative" }}>
      <TexturedBackground card={cardWithFace} />

      <Box sx={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
        <Nameplate hideFlip card={cardWithFace} sx={{ height: "10%" }} />

        <GradientBackground card={cardWithFace} sx={{ ...sizing(87.5, 43) }}>
          <Art card={card} objectPosition={index === 0 ? "left" : "right"} />
        </GradientBackground>

        <Typeplate hideRarity card={cardWithFace} sx={{ height: "8%" }}/>

        <GradientBackground
            showBottom
            card={cardWithFace}
            sx={{ ...sizing(87.5, 0), flex: 1, height: 0 }}
        >
            <Textbox card={cardWithFace} />
        </GradientBackground>
      </Box>
    </Box>
  );
}