import { Card, CardPart } from "../../models/card";
import { DisplayData } from "../display-data";

export function clickHandler(
  e: React.MouseEvent<HTMLDivElement | HTMLSpanElement, MouseEvent>,
  displayData: DisplayData,
  part: keyof Card | keyof CardPart,
) {
  if (!displayData.onClick) return;
  displayData.onClick(part);
  e.stopPropagation();
}
