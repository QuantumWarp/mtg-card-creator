import { Color } from "./color";
import { Rarity } from "./rarity";

export interface Card {
  real?: boolean;

  id: string;
  name: string;
  rarity: Rarity;
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
  textScaling?: string | number;

  artUri: string;
  artist: string;

  cardFaces?: Card[];
}
