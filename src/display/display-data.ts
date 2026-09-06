import { Card, CardFace, CardPart, SetInformation } from "../models/card";

export type CardKey =
  | keyof Card
  | keyof CardFace
  | keyof CardPart
  | keyof SetInformation;

export type CardClick = { cardKey?: CardKey, cardPart?: CardPart };

export class DisplayData {
  width?: string;
  hideFlavorText?: boolean;
  isFront?: boolean;
  autoRotate?: boolean;
  onClick?: (cardClick?: CardClick) => void;
}
