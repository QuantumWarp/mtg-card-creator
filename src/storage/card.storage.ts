import { v4 as uuid } from "uuid";
import { Card, CardFace } from "../models/card";
import { Rarity } from "../models/rarity";
import { Layout } from "../models/layout";

const cardPrefix = "mtg-card-creator-card-";

export const getCards = (): Card[] => {
  const keys = Object.keys(localStorage);
  const cardIds = keys.filter((x) => x.startsWith(cardPrefix)).map((x) => x.replace(cardPrefix, ""));
  const cards = cardIds.map((x) => getCard(x));

  return cards.sort((a, b) => a.frontFace.parts[0].name.localeCompare(b.frontFace.parts[0].name));
}

export const getCard = (id: string): Card => {
  const result = localStorage.getItem(`${cardPrefix}${id}`);
  if (!result) throw new Error("Card not found");
  return JSON.parse(result!);
}

export const saveCard = (card: Card): void => {
  localStorage.setItem(`${cardPrefix}${card.id}`, JSON.stringify(card));
}

export const deleteCard = (card: Card): void => {
  localStorage.removeItem(`${cardPrefix}${card.id}`);
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
    parts: [{
      name: "",
      colors: [],
    }],
  };
}