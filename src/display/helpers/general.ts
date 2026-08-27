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

export function spliceFace(card: Card, faceIndex: number) {
  if (!card.cardFaces || card.cardFaces.length === 0) return card;

  let cardWithFace = card;
  const face = card.cardFaces[faceIndex];
  cardWithFace = { ...cardWithFace, ...face };

  if (!cardWithFace.artUri) {
    cardWithFace.artUri = card.artUri;
  }

  if (faceIndex !== 0 && !face.colors) {
    cardWithFace.colors = undefined;
  }

  return cardWithFace;
}
