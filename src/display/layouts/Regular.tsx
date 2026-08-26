import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { PowerToughness } from '../parts/PowerToughness';
import { BottomInfo } from '../parts/BottomInfo';
import { TexturedBackground } from '../parts/backgrounds/TexturedBackground';
import { Card } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';

type RegularLayoutProps = {
  card: Card;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card) => void;
}

export function RegularLayout({
  card, hideFlavorText, onClick
}: RegularLayoutProps) {
  return (
    <BaseBackground
      texture={<TexturedBackground card={card} />}
    >
      <Nameplate card={card} onClick={onClick} />
      <Art card={card} onClick={onClick} />
      <Typeplate card={card} onClick={onClick} />
      <Textbox card={card} hideFlavorText={hideFlavorText} onClick={onClick} />
      <PowerToughness card={card} onClick={onClick} />

      <BottomInfo card={card} onClick={onClick} />
    </BaseBackground>
  );
}
