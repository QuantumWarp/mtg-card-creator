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
import { roundedBorder, sizing } from '../helpers/styles';

type Props = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card) => void;
}

export function RegularLayout({ card, hideFlavorText, onClick }: Props) {
  const { typeline } = card;
  const isPlaneswalker = typeline.includes("Planeswalker");
  const showFlip = card.cardFaces && card.cardFaces.length > 1;

  return (
    <BaseBackground
      texture={<TexturedBackground card={card} />}
    >
      <Nameplate card={card} onClick={onClick} showFlip={showFlip} />
      
      <GradientBackground card={card} sx={{
        ...sizing(87.5, 41), 
        ...(isPlaneswalker && roundedBorder(10, 130)) 
      }}>
        <Art card={card} onClick={onClick} />
      </GradientBackground>
      
      <Typeplate card={card} onClick={onClick} />

      <GradientBackground showBottom card={card} sx={{ flex: 1, ...sizing(87.5, 0) }}>
        <Textbox card={card} hideFlavorText={hideFlavorText} onClick={onClick} />
      </GradientBackground>

      <PowerToughness card={card} onClick={onClick} />

      <BottomInfo card={card} onClick={onClick} />
    </BaseBackground>
  );
}
