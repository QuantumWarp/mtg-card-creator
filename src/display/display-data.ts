import { Card, CardPart } from "../models/card";

export class DisplayData {
  width?: string;
  hideFlavorText?: boolean;
  onClick?: (part?: keyof Card | keyof CardPart) => void;
  isFront?: boolean;
}
