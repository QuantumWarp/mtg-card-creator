import { Card } from "../models/card";
import { saveCard } from "./card.storage";

const legacyCardPrefix = "mtg-card-creator-card-";
const legacyScryfallPrefix = "scryfall-";

export const migrateLocalStorage = async () => {
  const keys = Object.keys(localStorage);
  const cardKeys = keys.filter((x) => x.startsWith(legacyCardPrefix));
  const scryfallKeys = keys.filter((x) => x.startsWith(legacyScryfallPrefix));

  for (const key of cardKeys) {
    const card: Card = JSON.parse(localStorage.getItem(key)!);
    await saveCard(card);
    localStorage.removeItem(key);
  }

  for (const key of scryfallKeys) {
    localStorage.removeItem(key);
  }
};
