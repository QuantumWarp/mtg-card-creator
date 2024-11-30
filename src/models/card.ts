import { ManaCost } from "./mana-cost";
import { Color } from "./color";

export interface Card {
  name: string;
  set: string;
  setIcon: string;
  rarity: string;

  manaCost: ManaCost;
  colors: Color[];

  supertypes: string[];
  types: string[];
  subtypes: string[];

  power?: string | number;
  toughness?: string | number;

  text: string[];
  flavourText: string;

  image: string;
  artist: string;

  cardFaces: Omit<Card, "cardFaces">[];
}
