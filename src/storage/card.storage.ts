import { v4 as uuid } from "uuid";
import { Card, CardFace } from "../models/card";
import { Rarity } from "../models/rarity";
import { Layout } from "../models/layout";
import { indexedDbStore } from "./indexed-db";

const withStore = indexedDbStore("mtg-card-creator", "cards", { keyPath: "id" });

export const getCards = async (): Promise<Card[]> => {
  const cards = await withStore<Card[]>("readonly", (store) => store.getAll());

  return cards.sort((a, b) => {
    const compareCode = (a.set?.code || "").localeCompare(b.set?.code || "");
    if (compareCode !== 0) return compareCode;

    const numA = parseInt(String(a.collectorNumber), 10) || 0;
    const numB = parseInt(String(b.collectorNumber), 10) || 0;
    const compareNum = numA - numB;
    if (compareNum !== 0) return compareNum;

    return a.frontFace?.parts[0]?.name.localeCompare(b.frontFace?.parts[0]?.name) || 0;
  });

}

export const getCard = async (id: string): Promise<Card> => {
  const result = await withStore<Card | undefined>("readonly", (store) => store.get(id));
  if (!result) throw new Error("Card not found");
  return result;
}

export const saveCard = async (card: Card): Promise<void> => {
  await withStore("readwrite", (store) => store.put(card));
}

export const deleteCard = async (card: Card): Promise<void> => {
  await withStore("readwrite", (store) => store.delete(card.id));
}

export const deleteAllCards = async (): Promise<void> => {
  await withStore("readwrite", (store) => store.clear());
}

export const defaultCard = (): Card => {
  return {
    real: false,
    id: uuid(),

    rarity: Rarity.Common,
    set: {},

    frontFace: defaultFace(),
  }
}

export const defaultFace = (): CardFace => {
  return {
    layout: Layout.Regular,
    parts: [{ name: "" }],
  };
}
