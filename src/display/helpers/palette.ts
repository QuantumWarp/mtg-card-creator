
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

export function getGradient(color1: string, color2: string) {
  if (!color2) return color1;
  return `linear-gradient(to right, ${color1} 0%, ${color1} 25%, ${color2} 75%, ${color2} 100%)`;
}

export function getPalettes(cardPart: CardPart) {
  const { typeline } = cardPart;
  const isLand = !!typeline?.toLowerCase().includes("land");

  const colors =  deriveCardColoring(cardPart);
  const expectedColors = sortColors(colors);
  switch (expectedColors.length) {
    case 0: return [isLand ? palettes.Multicolor : palettes.Colorless];
    case 1: return [palettes[expectedColors[0]]];
    case 2: return [palettes[expectedColors[0]], palettes[expectedColors[1]], palettes.Multicolor];
    default: return [palettes.Multicolor];
  }
}

export function deriveCardColoring(cardPart: CardPart) {
  const { text, colors, manaCost, typeline } = cardPart;
  if (colors) return colors;

  const isLand = !!typeline?.toLowerCase().includes("land");
  if (!isLand) return colorsFromManaCost(manaCost);

  const coloring = [];
  if (text?.includes("{W}") || text?.includes("Plains")) coloring.push(Color.White);
  if (text?.includes("{B}") || text?.includes("Swamp")) coloring.push(Color.Black);
  if (text?.includes("{U}") || text?.includes("Island")) coloring.push(Color.Blue);
  if (text?.includes("{R}") || text?.includes("Mountain")) coloring.push(Color.Red);
  if (text?.includes("{G}") || text?.includes("Forest")) coloring.push(Color.Green);
  if (text?.includes("add one mana of any color")) return Object.values(Color);
  return coloring;
}

export function colorsFromManaCost(manaCost: string | undefined) {
  const colors = [];
  if (manaCost?.includes("W")) colors.push(Color.White);
  if (manaCost?.includes("B")) colors.push(Color.Black);
  if (manaCost?.includes("U")) colors.push(Color.Blue);
  if (manaCost?.includes("R")) colors.push(Color.Red);
  if (manaCost?.includes("G")) colors.push(Color.Green);
  return colors;
}

export function isColoredManaCost(cardPart: CardPart) {
  const { manaCost } = cardPart;
  return colorsFromManaCost(manaCost).length > 0;
}

export function sortColors(colors: Color[]) {
  if (colors.length < 2) return colors;
  const match = colorOrders
    .filter((x) => x.length === colors.length)
    .filter((x) => colors.every((c) => x.includes(c)));
  return match[0].split("") as Color[];
}

const colorOrders = [
  "WU",
  "UB",
  "BR",
  "RG",
  "GW",
  "WB",
  "UR",
  "BG",
  "RW",
  "GU",
  "GWU",
  "WUB",
  "UBR",
  "BRG",
  "RGW",
  "RWB",
  "GUR",
  "WBG",
  "URW",
  "BGU",
  "WUBR",
  "UBRG",
  "BRGW",
  "RGWU",
  "GWUB",
  "WUBRG",
];
