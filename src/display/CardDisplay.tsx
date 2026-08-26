import { Box, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { RegularLayout } from './layouts/Regular';
import { Card } from '../models/card';

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

  // const { typeline } = card;
  // const isSaga = typeline.includes("Saga");

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
      <RegularLayout
        card={card}
        hideFlavorText={hideFlavorText}
        onClick={onClick}
      />
    </Box>
  );
}
