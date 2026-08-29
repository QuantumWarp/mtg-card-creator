import { Color } from "./color";
import { DoubleFaceType, Layout } from "./layout";
import { Rarity } from "./rarity";

export interface Card {
  real: boolean;

  id: string;
  rarity: Rarity;
  collectorNumber?: string | number;
  set: SetInformation;

  frontFace: CardFace;
  backFace?: CardFace;
  doubleFaceType?: DoubleFaceType;
}

export interface SetInformation {
  id?: string;
  name?: string;
  iconUri?: string;
  code?: string;
  total?: number;
}

export interface CardFace {
  layout: Layout;
  parts: CardPart[];
}

export interface CardPart {
  name: string;
  
  manaCost?: string;
  colors?: Color[];

  typeline?: string;

  power?: string | number;
  toughness?: string | number;
  loyalty?: string | number;
  defense?: string | number;

  text?: string;
  flavorText?: string;

  artUri?: string;
  artist?: string;
  
  textScaling?: string | number;
}