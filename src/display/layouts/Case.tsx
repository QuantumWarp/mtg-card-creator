import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { BottomInfo } from '../parts/BottomInfo';
import { TexturedBackground } from '../parts/backgrounds/TexturedBackground';
import { Card, CardFace } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';
import { Box } from '@mui/material';
import { sizing } from '../helpers/styles';
import { GradientBackground } from '../parts/backgrounds/GradientBackground';
import { DisplayData } from '../display-data';

type Props = {
  card: Card;
  cardFace: CardFace;
  displayData: DisplayData;
}

export function CaseLayout({ card, cardFace, displayData }: Props) {
  const cardPart = cardFace.parts[0];

  return (
    <BaseBackground
      texture={<TexturedBackground cardPart={cardPart} sx={{
        height: "89%",
        borderEndEndRadius: "2.2em 1.5em",
        borderEndStartRadius: "2.2em 1.5em",
      }} />}
    >
      <Nameplate showFlip={!!card.doubleFaceType} card={card} cardPart={cardPart} displayData={displayData} />
      
      <GradientBackground cardPart={cardPart} sx={{ flex: 1, ...sizing(87.5, 0)}}>
        <Box sx={{ flex: 1 }}>
          <Art cardPart={cardPart} displayData={displayData} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Textbox cardPart={cardPart} displayData={displayData}  />
        </Box>
      </GradientBackground>

      <Typeplate card={card} cardPart={cardPart} displayData={displayData} sx={{ mb: "2.8%" }} />

      <BottomInfo card={card} cardPart={cardPart} displayData={displayData} />
    </BaseBackground>
  );
}
