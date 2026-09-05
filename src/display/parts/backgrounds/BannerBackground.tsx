import { ReactNode } from "react";
import { Box, CSSObject, SxProps } from "@mui/material";
import { center, roundedBorder, sizing } from "../../helpers/styles";
import { CardPart } from "../../../models/card";
import { getColorlessTint, getGradient, getPalettes } from "../../helpers/palette";


type Props = {
  cardPart: CardPart;
  children: ReactNode;
  allowTint?: boolean;
  dark?: boolean;
  removeOuterBorder?: boolean;
  sx?: SxProps;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function BannerBackground({ cardPart, children, allowTint, dark, removeOuterBorder, sx, onClick }: Props) {
  const [color1, color2, multicolor] = getPalettes(cardPart);
  const background = getGradient(color1.dark, color2?.dark);
  const color = color2 ? multicolor : color1;

  const colorlessTint = allowTint && getColorlessTint(cardPart);

  const cssSx = sx as CSSObject;
  const blunting = {
    ...(cssSx.borderEndStartRadius !== undefined && { borderEndStartRadius: cssSx.borderEndStartRadius }),
    ...(cssSx.borderEndEndRadius !== undefined && { borderEndEndRadius: cssSx.borderEndEndRadius }),
    ...(cssSx.borderStartEndRadius !== undefined && { borderStartEndRadius: cssSx.borderStartEndRadius }),
    ...(cssSx.borderStartStartRadius !== undefined && { borderStartStartRadius: cssSx.borderStartStartRadius }),
  };

  return (
    <Box
      sx={{
        position: "relative",
        fontSize: "64%",
        fontWeight: "bold",
        ...sizing(92, 7.5),
        ...sx,
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          p: "0.16em",
          position: "relative",
          height: "100%",
          background: removeOuterBorder ? undefined : background,
          boxShadow: removeOuterBorder ? undefined :"-0.10em 0 0.08em rgba(0, 0, 0, 0.4)",
          ...roundedBorder(15, 30),
          ...blunting,
        }}
      >
        <Box
          sx={{
            backgroundColor: colorlessTint ? colorlessTint.mid : (dark ? color.dark : color.mid),
            p: "0.4% 2.4% 1% 2.4%",
            boxSizing: "border-box",
            border: "0.05em solid black",
            boxShadow: "inset 0.12em -0.12em 0.12em rgba(0, 0, 0, 0.5), inset -0.12em 0.12em 0.12em rgba(255, 255, 255, 0.5)",
            ...sizing(100, 100),
            ...center({ justifyContent: "space-between" }),
            ...roundedBorder(10, 20),
            ...blunting,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
