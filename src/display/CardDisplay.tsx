import { Box, Button, Typography, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { RegularLayout } from './layouts/Regular';
import { Card, CardPart } from '../models/card';
import { SagaLayout } from './layouts/Saga';
import { AdventureLayout } from './layouts/Adventure';
import { CaseLayout } from './layouts/Case';
import { BattleLayout } from './layouts/Battle';
import { SplitLayout } from './layouts/Split';
import { Layout } from '../models/layout';
import { DisplayData } from './display-data';
import { PlaneswalkerLayout } from './layouts/Planeswalker';
import { PrepareLayout } from './layouts/Prepare';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseBackground } from './parts/backgrounds/BaseBackground';
import { deleteCard } from '../storage/card.storage';

type Props = {
  card: Card;
  displayData?: DisplayData;
}

export function CardDisplay({ card, displayData }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        boxShadow: theme.palette.mode === "dark" ? "none" : 5,
        width: displayData?.width || "min(100%, 500px)",
      }}
    >
      <ErrorBoundary
        fallbackRender={() => (
          <BaseBackground>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center", height: "80%", color: "white" }}>
              <Typography sx={{ mx: 4, textAlign: "center" }}>
                Error displaying card. You can still export the card in a backup to save the data before deletion.
              </Typography>

              <Button sx={{ width: "40%" }} onClick={() => deleteCard(card)}>
                Delete
              </Button>
            </Box>
          </BaseBackground>
        )}
      >
        <CardDisplayInner card={card} displayData={displayData} />
      </ErrorBoundary>
    </Box>
  );
}

function CardDisplayInner({ card, displayData: initialDisplayData = {} }: Props) {
  const cardRef = useRef<HTMLElement>(undefined);
  const [fontSize, setFontSize] = useState(24);
  const [frontFace, setFrontFace] = useState(true);

  const clickHandler = (part: keyof Card | keyof CardPart | undefined) => {
    if (part === "doubleFaceType") {
      setFrontFace(!frontFace);
      return;
    }

    initialDisplayData.onClick?.(part)
  };

  useEffect(() => { if (initialDisplayData.isFront) setFrontFace(true); }, [card, initialDisplayData.isFront]);
  useEffect(() => { setFrontFace(initialDisplayData.isFront ?? true); }, [initialDisplayData.isFront]);

  useEffect(() => {
    const updateFontSize = () => {
      if (cardRef.current) {
        const widthPx = cardRef.current.offsetWidth;
        setFontSize(widthPx * 0.075);
      }
    };

    updateFontSize();

    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, [cardRef]);

  const cardFace = (frontFace || !card.backFace) ? card.frontFace : card.backFace;
  const rotate = [Layout.Split, Layout.Battle].includes(cardFace.layout);
  const displayData: DisplayData = {
    ...initialDisplayData,
    onClick: clickHandler,
    isFront: frontFace || !card.backFace,
  }
  
  return (
    <Box
      ref={cardRef}
      onClick={() => displayData?.onClick?.()}
      sx={{
        fontSize: `${fontSize}px`,
        transform: rotate ? "rotate(90deg)" : "",
        transformOrigin: "center",
        cursor: displayData?.onClick ? "pointer" : "default",
        userSelect: displayData?.onClick ? "none" : "auto",
      }}
    >
      {cardFace.layout === Layout.Regular && (
        <RegularLayout card={card} cardFace={cardFace} displayData={displayData} />
      )}
      {cardFace.layout === Layout.Planeswalker && (
        <PlaneswalkerLayout card={card} cardFace={cardFace} displayData={displayData} />
      )}
      {cardFace.layout === Layout.Saga && (
        <SagaLayout card={card} cardFace={cardFace} displayData={displayData} />
      )}
      {cardFace.layout === Layout.Adventure && (
        <AdventureLayout card={card} cardFace={cardFace} displayData={displayData} />
      )}
      {cardFace.layout === Layout.Prepare && (
        <PrepareLayout card={card} cardFace={cardFace} displayData={displayData} />
      )}
      {cardFace.layout === Layout.Case && (
        <CaseLayout card={card} cardFace={cardFace} displayData={displayData} />
      )}
      {cardFace.layout === Layout.Battle && (
        <BattleLayout card={card} cardFace={cardFace} displayData={displayData} />
      )}
      {cardFace.layout === Layout.Split && (
        <SplitLayout card={card} cardFace={cardFace} displayData={displayData} />
      )}
    </Box>
  );
}
