import { Box, SxProps } from "@mui/material";
import { CardPart } from "../../../models/card";
import { getGradient, getPalettes } from "../../helpers/palette";
import { ReactNode } from "react";
import { leftShadow } from "../../helpers/styles";

type Props = {
  cardPart: CardPart;
  children: ReactNode;
  sx?: SxProps;
  showBottom?: boolean;
}

export function GradientBackground({ cardPart, sx, children, showBottom = false }: Props) {
  const [color1, color2] = getPalettes(cardPart);

  return (
    <Box
      sx={{
        background: getGradient(color1.dark, color2?.dark),
        boxSizing: "border-box",
        padding: "0 0.8% 0 0.8%",
        display: "flex",
        ...(showBottom && { paddingBottom: "0.8%" }),
        ...leftShadow(),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
