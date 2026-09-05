import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { BottomInfo } from '../parts/BottomInfo';
import { Card, CardFace, CardPart } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';
import { GradientBackground } from '../parts/backgrounds/GradientBackground';
import { sizing } from '../helpers/styles';
import { RotatedContent } from '../parts/backgrounds/RotatedContent';
import { Box } from '@mui/material';
import { TexturedBackground } from '../parts/backgrounds/TexturedBackground';
import { DisplayData } from '../display-data';

type Props = {
  card: Card;
  cardFace: CardFace;
  displayData: DisplayData;
}

export function SplitLayout({ card, cardFace, displayData }: Props) {
  const firstPart = cardFace.parts[0];
  const secondPart = cardFace.parts[1];

  return (
    <BaseBackground>
      <RotatedContent sx={{ flexDirection: "row", ...sizing(128, 72, -15, 13) }}>
        <MiniCard card={card} cardPart={firstPart} displayData={displayData} left />
        <MiniCard card={card} cardPart={secondPart} displayData={displayData} />
      </RotatedContent>

      <BottomInfo card={card} cardPart={firstPart} displayData={displayData} />
    </BaseBackground>
  );
}

type MiniProps = {
  card: Card;
  cardPart: CardPart;
  displayData: DisplayData;
  left?: boolean;
}

function MiniCard({ card, cardPart, displayData, left }: MiniProps) {
  return (
    <Box sx={{ flex: 1, height: "100%", position: "relative", mx: "-1%" }}>
      <TexturedBackground cardPart={cardPart} />

      <Box sx={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
        <Nameplate card={card} cardPart={cardPart} displayData={displayData} sx={{ height: "10%" }} />

        <GradientBackground cardPart={cardPart} sx={{ ...sizing(87.5, 43) }}>
          <Art cardPart={cardPart} displayData={displayData} objectPosition={left ? "left" : "right"} />
        </GradientBackground>

        <Typeplate card={card} cardPart={cardPart} displayData={displayData} sx={{ height: "9%" }}/>

        <GradientBackground
            showBottom
            cardPart={cardPart}
            sx={{ ...sizing(87.5, 0), flex: 1, height: 0 }}
        >
          <Textbox cardPart={cardPart} displayData={displayData} />
        </GradientBackground>
      </Box>
    </Box>
  );
}