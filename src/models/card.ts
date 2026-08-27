import { Color } from "./color";
import { Layout } from "./layout";
import { Rarity } from "./rarity";

export interface CardFace {
  name: string;
  
  manaCost: string;
  colors?: Color[];

  typeline: string;

  power?: string | number;
  toughness?: string | number;
  loyalty?: string | number;

  text: string;
  flavorText?: string;
  textScaling?: string | number;

  artUri: string;
  artist: string;
}

export interface Card extends CardFace {
  real?: boolean;

  id: string;
  rarity: Rarity;
  collectorNumber: string;
  layout: Layout;

  set: {
    name?: string;
    iconUri?: string;
    code: string;
    cardCount: number;
  };

  cardFaces?: CardFace[];
}
