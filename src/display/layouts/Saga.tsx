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
import { PowerToughness } from '../parts/PowerToughness';
import { DisplayData } from '../display-data';

type Props = {
  card: Card;
  cardFace: CardFace;
  displayData: DisplayData;
}

export function SagaLayout({ card, cardFace, displayData }: Props) {
  const cardPart = cardFace.parts[0];

  const isCreature = cardPart.typeline?.includes("Creature");

  return (
    <BaseBackground
      texture={<TexturedBackground cardPart={cardPart} sx={isCreature ? undefined : {
        height: "89%", 
        borderEndEndRadius: "2.2em 1.5em",
        borderEndStartRadius: "2.2em 1.5em",
      }} />}
    >
      <Nameplate showFlip={!!card.doubleFaceType} card={card} cardPart={cardPart} displayData={displayData} />
      
      <GradientBackground cardPart={cardPart} sx={{ flex: 1, ...sizing(87.5, 0)}}>
        <Box sx={{ flex: 1 }}>
          <Textbox cardPart={cardPart} displayData={displayData} noFlavor={isCreature} />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Art
            sx={isCreature && card.real ? { height: "90%" } : {}}
            cardPart={cardPart}
            displayData={displayData}
            objectPosition={isCreature ? "left" : undefined}
          />
        </Box>
      </GradientBackground>

      <Typeplate card={card} cardPart={cardPart} displayData={displayData} sx={isCreature ? undefined : { mb: "2.8%" } } />

      {isCreature && (
        <>
          <GradientBackground showBottom cardPart={cardPart} sx={{ ...sizing(87.5, 13)}}>
            <Textbox cardPart={cardPart} displayData={displayData} noText />
          </GradientBackground>

          <PowerToughness cardPart={cardPart} displayData={displayData} />
        </>
      )}

      <BottomInfo card={card} cardPart={cardPart} displayData={displayData} />
    </BaseBackground>
  );
}
