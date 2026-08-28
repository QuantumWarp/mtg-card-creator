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
import { Loyalty } from '../parts/specifics/Loyalty';

type Props = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card) => void;
}

export function RegularLayout({ card, hideFlavorText, onClick }: Props) {
  const { name, typeline, cardFaces } = card;
  const isPlaneswalker = typeline.includes("Planeswalker");
  const rounded = isPlaneswalker ? roundedBorder(16, 140) : {};
  const isBackFace = cardFaces && cardFaces[0] && name !== cardFaces[0].name;

  return (
    <BaseBackground
      texture={<TexturedBackground card={card} />}
    >
      <Nameplate card={card} onClick={onClick} dark={isBackFace} />
      
      <GradientBackground card={card} sx={{
        ...sizing(isPlaneswalker ? 89 : 87.5, isPlaneswalker ? 44.5 : 43), 
        ...rounded,
      }}>
        <Art card={card} onClick={onClick} sx={rounded} />
      </GradientBackground>
      
      <Typeplate card={card} onClick={onClick} dark={isBackFace} />

      <GradientBackground showBottom card={card} sx={{ flex: 1, ...sizing(87.5, 0) }}>
        <Textbox card={card} hideFlavorText={hideFlavorText} onClick={onClick} />
      </GradientBackground>

      <PowerToughness card={card} onClick={onClick} />
      <Loyalty card={card} onClick={onClick} />

      <BottomInfo card={card} onClick={onClick} />
    </BaseBackground>
  );
}
