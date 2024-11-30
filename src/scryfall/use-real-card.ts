import { cardRequest, ScryfallCard } from "./requests/card.request";
import { Card } from "../models/card";
import { ScryfallSet, setRequest } from "./requests/set.request";
import { localStorageCache } from "./caching/local-storage.cache";
import { useEffect, useState } from "react";

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
) => ({
    name: scryfallCard.name,
    set: scryfallCard.setName,
    setIcon: scryfallSet.iconSvgUri,
    rarity: scryfallCard.rarity,
  
    manaCost: [],
    colors: [],
  
    supertypes: [],
    types: [],
    subtypes: [],
  
    power: scryfallCard.power,
    toughness: scryfallCard.toughness,
  
    text: [scryfallCard.oracleText],
    flavourText: scryfallCard.flavourText,
  
    image: scryfallCard.artUri,
    artist: scryfallCard.artist,
  
    cardFaces: []
  })