import { compressImage } from "../common/image";
import { crystallize } from "./crystallize";

export const loadExamples = async () => {
  const cards = [
    crystallize,
  ];

  for (const card of cards) {
    card.artUri = await compressImage(card.artUri);
  }

  return cards;
};
