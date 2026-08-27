import { Box, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { RegularLayout } from './layouts/Regular';
import { Card } from '../models/card';
import { SagaLayout } from './layouts/Saga';
import { AdventureLayout } from './layouts/Adventure';
import { CaseLayout } from './layouts/Case';
import { spliceFace } from './helpers/general';

type CardDisplayProps = {
  width?: string;
  hideFlavorText?: boolean;
  card: Card;
  onClick?: (part?: keyof Card) => void;
}

export function CardDisplay({
  width, card, hideFlavorText, onClick
}: CardDisplayProps) {
  const cardRef = useRef<HTMLElement>(undefined);
  const theme = useTheme();
  const [fontSize, setFontSize] = useState(24);
  const [faceIndex, setFaceIndex] = useState(0);

  const clickHandler = (part: keyof Card | undefined) => {
    if (part === "cardFaces" && card.cardFaces) {
      let nextFace = faceIndex + 1;
      if (nextFace > card.cardFaces.length - 1) nextFace = 0;
      setFaceIndex(nextFace);
      return;
    }

    onClick?.(part)
  };

  useEffect(() => {
    setFaceIndex(0);
  }, [card]);

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

  const cardWithFace = spliceFace(card, faceIndex);
  const { typeline, cardFaces } = cardWithFace;
  const isSaga = typeline.includes("Saga");

  const isCase = typeline.includes("Case")
    || typeline.includes("Class");

  const isAdventure = cardFaces && cardFaces[1] && (
    cardFaces[1].typeline.includes("Adventure")
    || cardFaces[1].typeline.includes("Omen")
    || card.layout === "prepare"
  );

  const isRegular = !isSaga && !isAdventure && !isCase;
  
  return (
    <Box
      ref={cardRef}
      sx={{
        boxShadow: theme.palette.mode === "dark" ? "none" : 5,
        width: width || "min(100%, 500px)",
        fontSize: `${fontSize}px`,
        cursor: onClick ? "pointer" : "default",
        userSelect: onClick ? "none" : "auto"
      }}
      onClick={() => onClick?.()}
    >
      {isRegular && <RegularLayout card={cardWithFace} hideFlavorText={hideFlavorText} onClick={clickHandler} />}
      {isSaga && <SagaLayout card={cardWithFace} hideFlavorText={hideFlavorText} onClick={clickHandler} />}
      {isAdventure && <AdventureLayout card={cardWithFace} hideFlavorText={hideFlavorText} onClick={clickHandler} />}
      {isCase && <CaseLayout card={cardWithFace} hideFlavorText={hideFlavorText} onClick={clickHandler} />}
    </Box>
  );
}
