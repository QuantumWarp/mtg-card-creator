import { cardRequest, ScryfallCard } from "./requests/card.request";
import { Card } from "../models/card";
import { ScryfallSet, setRequest } from "./requests/set.request";
import { localStorageCache } from "./caching/local-storage.cache";
import { useEffect, useState } from "react";
import { Color } from "../models/color";

export function useRealCard(name: string) {
  const [card, setCard] = useState<Card>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setCard(undefined);
    setError(undefined);

    fetchRealCard(name)
      .then((x) => setCard(x))
      .catch((x) => setError(x));
  }, [name]);

  return {
    card,
    loading: Boolean(name) && !card && !error,
    error,
  };
}

const fetchRealCard = async (
  name: string
): Promise<Card> => {
  return localStorageCache(`scryfall-card-${name}`, async () => {
    const scryfallCard = await cardRequest(name);
    const scryfallSet = await setRequest(scryfallCard.setId);
    return createCard(scryfallCard, scryfallSet);
  })
}

const createCard = (
  scryfallCard: ScryfallCard,
  scryfallSet: ScryfallSet
): Card => ({
    real: true,
    id: scryfallCard.id,
    name: scryfallCard.name,
    rarity: scryfallCard.rarity,
    collectorNumber: scryfallCard.collectorNumber,

    set: {
      name: scryfallCard.setName,
      code: scryfallSet.code,
      iconUri: scryfallSet.iconSvgUri,
      cardCount: scryfallSet.cardCount,
    },
  
    manaCost: scryfallCard.manaCost,
    colors: scryfallCard.colors as Color[],
  
    typeline: scryfallCard.typeline,
  
    power: scryfallCard.power,
    toughness: scryfallCard.toughness,
  
    text: scryfallCard.oracleText,
    flavorText: scryfallCard.flavorText,
  
    artUri: scryfallCard.artUri,
    artist: scryfallCard.artist,
  
    cardFaces: []
  })