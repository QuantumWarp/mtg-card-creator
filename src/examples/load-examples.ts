import { Card } from "../models/card";
import { deleteCard } from "../storage/card.storage";
import { crystallize } from "./crystallize";
import { oceansEdge } from "./oceans-edge";
import { packCaller } from "./pack-caller";

const hideExamplesKey = "mtg-card-creator-hide-examples";

const examples = [
  crystallize,
  packCaller,
  oceansEdge,
];

export const appendExamples = (existing: Card[]) => {
  const stripped = stripOldExamples(existing);
  return examplesEnabled() ? stripped.concat(examples) : stripped;
};

export const toggleExamples = () => {
  if (examplesEnabled()) localStorage.setItem(hideExamplesKey, "true");
  else localStorage.removeItem(hideExamplesKey);  
}

export const examplesEnabled = () => {
  return !localStorage.getItem(hideExamplesKey);
}

export const getExample = (exampleId: string) => {
  return examples.find((x) => x.id === exampleId);
};

const stripOldExamples = (existing: Card[]) => {
  const existingExamples = existing.filter((x) => x.id.includes("example"));
  for (const card of existingExamples) {
    deleteCard(card);
  }
  return existing.filter((x) => !x.id.includes("example"))
}
