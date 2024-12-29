import { Card } from "../models/card";
import { saveCard } from "../storage/card.storage";
import { compressImage } from "../storage/image";
import { crystallize } from "./crystallize";
import { oceansEdge } from "./oceans-edge";
import { packCaller } from "./pack-caller";

const loadedKey = "mtg-card-creator-loaded";

export const loadExamplesIfRequired = async (existing: Card[]) => {
  const loaded = localStorage.getItem(loadedKey);
  localStorage.setItem(loadedKey, "true");

  if (loaded) return existing;
  if (existing.length > 0) return existing;

  const examples = await createExamples();

  for (const card of examples) {
    saveCard(card);
  }

  return examples.sort((a, b) => a.name.localeCompare(b.name));
};

const createExamples = async () => {
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
