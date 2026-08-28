import { Box } from "@mui/material"
import { Card } from "../../../models/card";
import { getPalettes, isColoredManaCost } from "../../helpers/palette";

type Props = {
  card: Card;
}

export function ColorIndicator({ card }: Props) {
  const showIndicator = card.colors && card.colors.length !== 0 && !isColoredManaCost(card);
  if (!showIndicator) return null;

  const [color1, color2] = getPalettes(card);
  console.log(color2)

  return (
    <Box sx={{
      gap: 1,
      height: "0.9em",
      width: "0.9em",
      background: `linear-gradient(to bottom right, ${color1.dark} 0%, ${color1.dark} 50%, ${color2.dark} 50%, ${color2.dark} 100%)`,
      boxSizing: "border-box",
      borderRadius: "50%",
      boxShadow: "inset 0.12em -0.12em 0.12em rgba(255, 255, 255, 0.3), inset -0.12em 0.12em 0.12em rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }} />
  )
}