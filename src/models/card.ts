import { Color } from "./color";

export interface Card {
  real?: boolean;

  id: string;
  name: string;
  rarity: string;
  collectorNumber: string;

  set: {
    name?: string;
    iconUri?: string;
    code: string;
    cardCount: number;
  };

  manaCost: string;
  colors?: Color[];

  typeline: string;

  power?: string | number;
  toughness?: string | number;

  text: string;
  flavorText?: string;

  artUri: string;
  artist: string;

  cardFaces?: Card[];
}
