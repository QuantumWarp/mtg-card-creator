
import { CardPart } from "../../models/card";
import { Color } from "../../models/color";

export interface Palette {
  light: string;
  mid: string;
  dark: string;
}

export const palettes = {
  Multicolor: { dark: "#e5d387", mid: "#d6c494", light: "#f6f2de" },
  Colorless: { dark: "#dfe0e1", mid: "#dae0e4", light: "#d6dde0" },
  [Color.White]: { dark: "#eaeae7", mid: "#f4f4f0", light: "#f1efe7" },
  [Color.Blue]: { dark: "#016aa1", mid: "#bed4e4", light: "#e1e8ef" },
  [Color.Black]: { dark: "#36342f", mid: "#b7b0ae", light: "#ebeae7" },
  [Color.Red]: { dark: "#d04535", mid: "#ebc4af", light: "#ecd3c5" },
  [Color.Green]: { dark: "#1e905c", mid: "#c6fff0", light: "#edffff" },
};

export function getPalettes(cardPart: CardPart) {
  const { typeline } = cardPart;
  const isLand = !!typeline?.toLowerCase().includes("land");

  let colors = cardPart.colors;
  colors = (isLand || !colors) ? deriveColors(cardPart, isLand) : colors;

  let expectedColors = colors;

  const manaCostOrder = Object.values(Color);
  expectedColors = expectedColors
    .sort((a, b) => manaCostOrder.indexOf(a) - manaCostOrder.indexOf(b))

  switch (expectedColors.length) {
    case 0: return [isLand ? palettes.Multicolor : palettes.Colorless];
    case 1: return [palettes[expectedColors[0]]];
    case 2: return [palettes[expectedColors[0]], palettes[expectedColors[1]], palettes.Multicolor];
    default: return [palettes.Multicolor];
  }
}

export function getGradient(color1: string, color2: string) {
  if (!color2) return color1;
  return `linear-gradient(to right, ${color1} 0%, ${color1} 25%, ${color2} 75%, ${color2} 100%)`;
}

export function deriveColors(cardPart: Pick<CardPart, 'text' | 'manaCost'>, isLand: boolean) {
  const { text, manaCost } = cardPart;
  const colors = [];
  if (isLand) {
    if (text?.includes("{W}") || text?.includes("Plains")) colors.push(Color.White);
    if (text?.includes("{B}") || text?.includes("Swamp")) colors.push(Color.Black);
    if (text?.includes("{U}") || text?.includes("Island")) colors.push(Color.Blue);
    if (text?.includes("{R}") || text?.includes("Mountain")) colors.push(Color.Red);
    if (text?.includes("{G}") || text?.includes("Forest")) colors.push(Color.Green);
    if (text?.includes("add one mana of any color")) return Object.values(Color);
  } else {
    if (manaCost?.includes("W")) colors.push(Color.White);
    if (manaCost?.includes("B")) colors.push(Color.Black);
    if (manaCost?.includes("U")) colors.push(Color.Blue);
    if (manaCost?.includes("R")) colors.push(Color.Red);
    if (manaCost?.includes("G")) colors.push(Color.Green);
  }
  return colors;
}

export function isColoredManaCost(cardPart: CardPart) {
  const { manaCost } = cardPart;
  return manaCost?.includes("W")
    || manaCost?.includes("B")
    || manaCost?.includes("U")
    || manaCost?.includes("R")
    || manaCost?.includes("G");
}
