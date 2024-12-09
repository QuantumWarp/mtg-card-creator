import { Box, useTheme } from '@mui/material';
import { Nameplate } from './Nameplate';
import { Art } from './Art';
import { Textbox } from './Textbox';
import { Typeplate } from './Typeplate';
import { PowerToughness } from './PowerToughness';
import { BottomInfo } from './BottomInfo';
import { TexturedBackground } from './TexturedBackground';
import { sizing } from '../style.helper';
import { Card } from '../../models/card';
import { getGradient, getPalettes } from '../palette';
import { useEffect, useRef, useState } from 'react';

type CardDisplayProps = {
  width?: string;
  card: Card;
  onClick?: (part?: keyof Card) => void;
}

export function CardDisplay({
  width, card, onClick
}: CardDisplayProps) {
  const cardRef = useRef<HTMLElement>();
  const theme = useTheme();
  const [fontSize, setFontSize] = useState(24);
  const [color1, color2] = getPalettes(card);
  const background = getGradient(color1.dark, color2?.dark);
  const showPowerToughness = card.power !== undefined || card.toughness !== undefined || card.typeline.toLowerCase().includes("creature");

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
      <TexturedBackground card={card} />

      <Box
        sx={{
          position: "absolute",
          background: background,
          borderRadius: "2% 2% 0 0",
          padding: "0 0.8% 0.8% 0.8%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-0.14em 0.11em 0.05em rgba(0, 0, 0, 0.5)",
          ...sizing(88, 88, 6, 4),
        }}
      >
        <Nameplate card={card} onClick={onClick} />
        <Art card={card} onClick={onClick} />
        <Typeplate card={card} onClick={onClick} />
        <Textbox card={card} onClick={onClick} />

        {showPowerToughness && (
          <PowerToughness card={card} onClick={onClick} />
        )}
      </Box>

      <BottomInfo card={card} onClick={onClick} />
    </Box>
  );
}
