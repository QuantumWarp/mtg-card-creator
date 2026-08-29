import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { PowerToughness } from '../parts/PowerToughness';
import { BottomInfo } from '../parts/BottomInfo';
import { TexturedBackground } from '../parts/backgrounds/TexturedBackground';
import { Card, CardFace } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';
import { GradientBackground } from '../parts/backgrounds/GradientBackground';
import { sizing } from '../helpers/styles';
import { Loyalty } from '../parts/specifics/Loyalty';
import { DisplayData } from '../display-data';

type Props = {
  card: Card;
  cardFace: CardFace;
  displayData: DisplayData;
}

export function RegularLayout({ card, cardFace, displayData }: Props) {
  const cardPart = cardFace.parts[0];

  return (
    <BaseBackground
      texture={<TexturedBackground cardPart={cardPart} />}
    >
      <Nameplate showFlip={!!card.doubleFaceType} card={card} cardPart={cardPart} displayData={displayData} />
      
      <GradientBackground cardPart={cardPart} sx={sizing(87.5, 43)}>
        <Art cardPart={cardPart} displayData={displayData} />
      </GradientBackground>
      
      <Typeplate card={card} cardPart={cardPart} displayData={displayData} />

      <GradientBackground showBottom cardPart={cardPart} sx={{ flex: 1, ...sizing(87.5, 0) }}>
        <Textbox cardPart={cardPart} displayData={displayData} />
      </GradientBackground>

      <PowerToughness cardPart={cardPart} displayData={displayData} />
      <Loyalty cardPart={cardPart} displayData={displayData} />

      <BottomInfo card={card} cardPart={cardPart} displayData={displayData} />
    </BaseBackground>
  );
}
