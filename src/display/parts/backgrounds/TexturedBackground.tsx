import { Box } from "@mui/material";
import { sizing } from "../../helpers/styles";
import { getPalettes, palettes } from "../../helpers/palette";
import { CardPart } from "../../../models/card";

type Props = {
  cardPart: CardPart;
}

export function TexturedBackground({ cardPart }: Props) {
  const { typeline } = cardPart;
  const [color1, color2, multicolor] = getPalettes(cardPart);
  const color = color2 ? multicolor : color1;
  
  const legendaryHeader = typeline?.includes("Legendary")
    && !typeline?.includes("Planeswalker");
  const isLand = typeline?.includes("Land");
  const isArtifact = typeline?.includes("Artifact");

  const base = isLand ? "#a0876f" : (isArtifact ? palettes.Colorless.mid : color.mid);
  const offset = legendaryHeader ? 2 : 0;

  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: base,
        borderRadius: "1.4% 1.4% 15% 15%",
        ...sizing(93, 88 - offset, 3.5, 2.5 + offset),
      }}
    />
  );
}
