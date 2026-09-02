import { CardPart } from "../../models/card";
import { CardKey, DisplayData } from "../display-data";

export function clickHandler(
  e: React.MouseEvent<HTMLDivElement | HTMLSpanElement, MouseEvent>,
  displayData: DisplayData,
  cardKey: CardKey,
  cardPart: CardPart | undefined
) {
  if (!displayData.onClick) return;
  displayData.onClick({ cardKey, cardPart });
  e.stopPropagation();
}
