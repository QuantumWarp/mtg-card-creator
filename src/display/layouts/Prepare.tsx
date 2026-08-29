import { Nameplate } from '../parts/Nameplate';
import { Art } from '../parts/Art';
import { Textbox } from '../parts/Textbox';
import { Typeplate } from '../parts/Typeplate';
import { PowerToughness } from '../parts/PowerToughness';
import { BottomInfo } from '../parts/BottomInfo';
import { TexturedBackground } from '../parts/backgrounds/TexturedBackground';
import { Card, CardFace, CardPart } from '../../models/card';
import { BaseBackground } from '../parts/backgrounds/BaseBackground';
import { GradientBackground } from '../parts/backgrounds/GradientBackground';
import { sizing } from '../helpers/styles';
import { Box } from '@mui/material';
import { DisplayData } from '../display-data';

type Props = {
  card: Card;
  cardFace: CardFace;
  displayData: DisplayData;
}

export function PrepareLayout({ card, cardFace, displayData }: Props) {
  const mainPart = cardFace.parts[0];
  const miniPart = cardFace.parts[1];

  return (
    <BaseBackground
      texture={<TexturedBackground cardPart={mainPart} />}
    >
      <Nameplate showFlip={!!card.doubleFaceType} card={card} cardPart={mainPart} displayData={displayData} />
      
      <GradientBackground cardPart={mainPart} sx={sizing(87.5, 41)}>
        <Art cardPart={mainPart} displayData={displayData} />
      </GradientBackground>
      
      <Typeplate card={card} cardPart={mainPart} displayData={displayData} />

      <GradientBackground showBottom cardPart={mainPart} sx={{ flex: 1, ...sizing(87.5, 0) }}>
        <MiniCard card={card} cardPart={miniPart} mainPart={mainPart} displayData={displayData} />

        <Box sx={{ flex: 1 }}>
          <Textbox cardPart={mainPart} displayData={displayData} />
        </Box>
      </GradientBackground>

      <PowerToughness cardPart={mainPart} displayData={displayData} />

      <BottomInfo card={card} cardPart={mainPart} displayData={displayData} />
    </BaseBackground>
  );
}

type MiniCard = {
  card: Card;
  cardPart: CardPart;
  mainPart: CardPart;
  displayData: DisplayData;
}

function MiniCard({ card, cardPart, mainPart, displayData }: MiniCard) {
  const sameColor = mainPart.colors?.length === 1
    && mainPart.colors?.length === cardPart.colors?.length
    && mainPart.colors?.[0] === cardPart.colors?.[0];

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Nameplate
        card={card}
        cardPart={cardPart}
        displayData={displayData}
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
        card={card}
        cardPart={cardPart}
        displayData={displayData}
        sx={{
          ...sizing(107, 18),
          ml: "-7%",
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
        }}
      />

      <GradientBackground
        showBottom={!sameColor}
        cardPart={cardPart}
        sx={{ flex: 1, height: 0, boxShadow: "none" }}
      >
        <Textbox cardPart={cardPart} displayData={displayData} />
      </GradientBackground>
    </Box>
  );
}