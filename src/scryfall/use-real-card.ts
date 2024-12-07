import { cardRequest, ScryfallCard } from "./requests/card.request";
import { Card } from "../models/card";
import { ScryfallSet, setRequest } from "./requests/set.request";
import { localStorageCache } from "./caching/local-storage.cache";
import { useEffect, useState } from "react";
import { Color } from "../models/color";

export function useRealCard(name: string) {
  const [card, setCard] = useState<Card>();

  useEffect(() => {
    fetchRealCard(name).then((x) => setCard(x));
  }, [name]);

  return card;
}

const fetchRealCard = async (
  name: string
): Promise<Card> => {
  return localStorageCache(`real-card-${name}`, async () => {
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
  
    text: [scryfallCard.oracleText],
    flavourText: scryfallCard.flavourText,
  
    artUri: scryfallCard.artUri,
    artist: scryfallCard.artist,
  
    cardFaces: []
  })