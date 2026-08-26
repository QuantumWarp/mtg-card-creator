import { Card } from "../../models/card";

export function clickHandler(
    e: React.MouseEvent<HTMLDivElement | HTMLSpanElement, MouseEvent>,
    onClick: ((part: keyof Card) => void) | undefined,
    part: keyof Card,
) {
    if (!onClick) return;
    onClick(part);
    e.stopPropagation();
}