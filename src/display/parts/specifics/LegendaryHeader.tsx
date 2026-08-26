import { Box } from "@mui/material";
import { Card } from "../../../models/card";
import { sizing } from "../../helpers/styles";
import { getPalettes, getGradient } from "../../helpers/palette";

type Props = {
  card: Card;
}

export function LegendaryHeader({ card }: Props) {
  const [color1, color2] = getPalettes(card);
  const background = getGradient(color1.dark, color2?.dark);

  return (
    <Box
      sx={{ 
        position: "absolute",
        filter: "drop-shadow(-0.10em 0 0.08em rgba(0, 0, 0, 0.4))",
        ...sizing(104, 126, -2, -21),
      }}
    >
      <Box
        sx={{
        ...sizing(100, 100),
        background: background,
        clipPath: "polygon("
        + "50% 95%, 4% 95%, 3% 96%, 2% 98%, 1.5% 100%," // Bottom left
        + "0.8% 90%, 0.3% 80%, 0% 68%, 1.4% 62%," // Left side bottom
        + "0.4% 45%, 0.4% 40%, 1.5% 20%, 2.5% 10%, 3.2% 6%," // Left side top
        + "4.5% 10.5%, 6% 15%, 8% 20%, 12% 20%, 14% 20%, 15% 12%, 16.5% 5%," // Top A
        + "19% 12%, 22% 17%, 25% 20%, 27.5% 21%, 30% 20%, 34% 15%, 40% 5%," // Top B
        + "40.5% 12%, 44% 5%, 48% 1%, 50% 0%," // Top C
        // Reflected
        + "50% 0%, 52% 1%, 56% 5%, 59.5% 12%," // Reflected Top C
        + "60% 5%, 66% 15%, 70% 20%, 72.5% 21%, 75% 20%, 78% 17%, 81% 12%," // Reflected Top B
        + "83.5% 5%, 85% 12%, 86% 20%, 88% 20%, 92% 20%, 94% 15%, 95.5% 10%," // Reflected Top A
        + "96.8% 6%, 97.5% 10%, 98.5% 20%, 99.6% 40%, 99.6% 45%," // Reflected Left side top
        + "98.6% 62%, 100% 68%, 99.7% 80%, 99.2% 90%," // Reflected Left side bottom
        + "98.5% 100%, 98% 98%, 97% 96%, 96% 95%, 50% 95%)", // Bottom right
        }}
      />
    </Box>
  );
}
