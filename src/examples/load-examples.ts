import { compressImage } from "../storage/image";
import { crystallize } from "./crystallize";
import { oceansEdge } from "./oceans-edge";
import { packCaller } from "./pack-caller";

export const loadExamples = async () => {
  const cards = [
    crystallize,
    packCaller,
    oceansEdge,
  ];

  for (const card of cards) {
    card.artUri = await compressImage(card.artUri);
  }

  return cards;
};
