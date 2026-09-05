import { Box, SxProps } from "@mui/material";
import { sizing } from "../../helpers/styles";
import { getColorlessTint, getGradient, getPalettes, palettes } from "../../helpers/palette";
import { CardPart } from "../../../models/card";

type Props = {
  cardPart: CardPart;
  sx?: SxProps;
}

export function TexturedBackground({ cardPart, sx }: Props) {
  const { typeline } = cardPart;
  const [color1, color2, multicolor] = getPalettes(cardPart);
  const color = color2 ? multicolor : color1;
  
  const legendaryHeader = typeline?.includes("Legendary")
    && !typeline?.includes("Planeswalker");
  const isLand = typeline?.includes("Land");
  const isArtifact = typeline?.includes("Artifact");
  const isVehicle = typeline?.includes("Vehicle");

  const colorlessTint = getColorlessTint(cardPart);

  const base = isVehicle
    ? "repeating-linear-gradient(to bottom, #9d9d9d 3%, #9d9d9d 5.5%, #6e3d18 5.5%, #6e3d18 10.8%)"
    : colorlessTint
    ? getGradient(colorlessTint.mid, palettes.Colorless.mid, true)
    : isLand ? "#a0876f" : (isArtifact ? palettes.Colorless.mid : color.mid);
  const clipTop = legendaryHeader ? { clipPath: "inset(1.5em 0 0 0)" } : {};

  return (
    <Box
      sx={{
        position: "absolute",
        background: base,
        borderRadius: "1.4% 1.4% 15% 15%",
        ...sizing(93, 88, 3.5, 2.5),
        ...clipTop,
        ...sx,
      }}
    />
  );
}
