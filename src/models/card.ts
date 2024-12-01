import { Color } from "./color";

export interface Card {
  real?: boolean;

  name: string;
  rarity: string;
  collectorNumber: string;

  set: {
    name: string;
    code: string;
    iconUri: string;
    cardCount: number;
  };

  manaCost: string;
  colors: Color[];

  typeline: string;

  power?: string | number;
  toughness?: string | number;

  text: string[];
  flavourText: string;

  artUri: string;
  artist: string;

  cardFaces: Omit<Card, "cardFaces">[];
}
