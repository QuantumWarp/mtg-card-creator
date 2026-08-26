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
  const cardRef = useRef<HTMLElement>();
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
  }, [cardRef])

  return (
    <Box
      ref={cardRef}
      sx={{
        position: "relative",
        boxShadow: theme.palette.mode === "dark" ? "none" : 5,
        backgroundColor: "black",
        fontFamily: "Matrix, Garamond, serif",
        borderRadius: ".6em",
        width: width || "min(100%, 500px)",
        aspectRatio: 0.715,
        fontSize: `${fontSize}px`,
        color: "black",
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
