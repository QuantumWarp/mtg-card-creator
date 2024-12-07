import { v4 as uuid } from "uuid";
import { Card } from "../models/card";

export const getCards = (): Card[] => {
  const keys = Object.keys(localStorage);
  const cardIds = keys.filter((x) => x.startsWith("card-")).map((x) => x.replace("card-", ""));
  const cards = cardIds.map((x) => getCard(x));

  return cards.sort((a, b) => a.name.localeCompare(b.name));
}

export const getCard = (id: string): Card => {
  const result = localStorage.getItem(`card-${id}`);
  if (!result) throw new Error("Card not found");
  return JSON.parse(result!);
}

export const saveCard = (card: Card): void => {
  localStorage.setItem(`card-${card.id}`, JSON.stringify(card));
}

export const deleteCard = (card: Card): void => {
  localStorage.removeItem(`card-${card.id}`);
}

export const defaultCard = (): Card => {
  return {
    id: uuid(),
    name: "",
    rarity: "",
    collectorNumber: "",

    set: {
      name: "",
      code: "",
      iconUri: "",
      cardCount: 0
    },

    manaCost: "",
    colors: [],

    typeline: "",

    power: undefined,
    toughness: undefined,

    text: "",
    flavorText: "",

    artUri: "",
    artist: "",

    cardFaces: [],
  }
}