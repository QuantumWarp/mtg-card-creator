import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { BottomInfo } from '../parts/BottomInfo';
import { Card, CardFace } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';
import { GradientBackground } from '../parts/backgrounds/GradientBackground';
import { roundedBorder, sizing } from '../helpers/styles';
import { RotatedContent } from '../parts/backgrounds/RotatedContent';
import { Box } from '@mui/material';
import { DisplayData } from '../display-data';
import { Defense } from '../parts/specifics/Defense';

type Props = {
  card: Card;
  cardFace: CardFace;
  displayData: DisplayData;
}

export function BattleLayout({ card, cardFace, displayData }: Props) {
  const cardPart = cardFace.parts[0];

  return (
    <BaseBackground>
      <RotatedContent sx={{ ml: "-2%" }}>
        <Nameplate showFlip card={card} cardPart={cardPart} displayData={displayData} sx={{ mt: 0, height: "12%", fontSize: "0.76em" }} />

        <Box sx={{ ...sizing(96, 41), position: "relative" }}>
          <Art
            cardPart={cardPart}
            displayData={displayData}
            sx={{
              position: "absolute",
              zIndex: -1,
              ...sizing(100, 120, 0, -10),
              ...roundedBorder(16, 140),
            }}
          />
        </Box>
        
        <Typeplate card={card} cardPart={cardPart} displayData={displayData} sx={{ height: "12%" }}  />

        <GradientBackground showBottom cardPart={cardPart} sx={{ flex: 1, ...sizing(87.5, 0) }}>
          <Textbox cardPart={cardPart} displayData={displayData} />
        </GradientBackground>
        
        <Defense cardPart={cardPart} displayData={displayData} />
      </RotatedContent>

      <BottomInfo card={card} cardPart={cardPart} displayData={displayData} />
    </BaseBackground>
  );
}
