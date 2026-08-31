import { cardRequest, ScryfallCard, ScryfallCardFace, ScryfallLayout } from "./requests/card.request";
import { Card, CardFace, CardPart } from "../models/card";
import { ScryfallSet, setRequest } from "./requests/set.request";
import { localStorageCache } from "./caching/local-storage.cache";
import { useEffect, useState } from "react";
import { Color } from "../models/color";
import { DoubleFaceType, Layout } from "../models/layout";
import { colorsFromManaCost } from "../display/helpers/palette";

export function useRealCard(name: string, setCode?: string) {
  const [card, setCard] = useState<Card>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    let ignore = false;

    setCard(undefined);
    setError(undefined);

    fetchRealCard(name, setCode)
      .then((x) => !ignore && setCard(x))
      .catch((x) => !ignore && setError(x));

    return () => { ignore = true; }
  }, [name, setCode]);

  return {
    card,
    loading: Boolean(name) && !card && !error,
    error,
  };
}

export async function fetchRealCard(name: string, setCode?: string): Promise<Card> {
  const key = `scryfall-card-${name}` + (setCode ? `-${setCode}` : "");
  const scryfallCard = await localStorageCache(key, () => cardRequest(name, setCode));
  const setId = scryfallCard.setId;
  const scryfallSet = await localStorageCache(`scryfall-set-${setId}`, () => setRequest(setId));
  return parseCard(scryfallCard, scryfallSet);
}

function parseCard(scryfallCard: ScryfallCard, scryfallSet: ScryfallSet): Card {
  return {
    ...parseBaseInformation(scryfallCard, scryfallSet),
    doubleFaceType: parseDoubleFaceType(scryfallCard),
    frontFace: parseFrontFace(scryfallCard),
    backFace: parseBackFace(scryfallCard),
  }
}

function parseBaseInformation(scryfallCard: ScryfallCard, scryfallSet: ScryfallSet) {
  return {
    real: true,
    id: scryfallCard.id,
    rarity: scryfallCard.rarity,

    collectorNumber: scryfallCard.collectorNumber,
    set: {
      id: scryfallCard.setId,
      name: scryfallCard.setName,
      code: scryfallSet.code,
      iconUri: scryfallSet.iconSvgUri,
      total: scryfallSet.cardCount,
    },
  } satisfies Partial<Card>;
}

function parseDoubleFaceType(card: ScryfallCard): DoubleFaceType | undefined {
  switch (card.layout) {
    case ScryfallLayout.TokenModal:
    case ScryfallLayout.Modal:
      return DoubleFaceType.Modal;
    case ScryfallLayout.Battle:
    case ScryfallLayout.Meld:
    case ScryfallLayout.Transform:
      return DoubleFaceType.Transform;
    case ScryfallLayout.Normal:
    case ScryfallLayout.Saga:
      return card.cardFaces.length > 1 ? DoubleFaceType.Transform : undefined;
    default:
      return undefined;
  }
}

function parseFrontFace(card: ScryfallCard): CardFace {
  const faces = getFrontFaces(card);
  return parseFace(card, faces);
}

function parseBackFace(card: ScryfallCard): CardFace | undefined {
  const face = getBackFace(card);
  if (!face) return undefined;
  return parseFace(card, [face]);
}

function getFrontFaces(card: ScryfallCard): ScryfallCardFace[] {
  if (card.cardFaces.length === 0) return [card];
  const hasBack = parseDoubleFaceType(card) !== undefined;
  return hasBack ? card.cardFaces.slice(0, -1) : card.cardFaces;
}

function getBackFace(card: ScryfallCard): ScryfallCardFace | undefined {
  if (card.cardFaces.length === 0) return undefined;
  const hasBack = parseDoubleFaceType(card) !== undefined;
  return hasBack ? card.cardFaces[card.cardFaces.length - 1] : undefined;
}

function parseFace(card: ScryfallCard, scryfallFaces: ScryfallCardFace[]): CardFace {
  return {
    layout: parseLayout(card, scryfallFaces),
    parts: scryfallFaces.map((x) => parsePart(card, x)),
  }
}

function parseLayout(card: ScryfallCard, scryfallFaces: ScryfallCardFace[]): Layout {
  const firstScryfallFace = scryfallFaces[0];
  if (card.layout === ScryfallLayout.Adventure) return Layout.Adventure;
  if (card.layout === ScryfallLayout.Prepare) return Layout.Prepare;
  if (card.layout === ScryfallLayout.Split) return Layout.Split;
  if (firstScryfallFace.typeline.includes("Planeswalker")) return Layout.Planeswalker;
  if (firstScryfallFace.typeline.includes("Battle")) return Layout.Battle;
  if (firstScryfallFace.typeline.includes("Case") ||
   firstScryfallFace.typeline.includes("Class")) return Layout.Case;
  if (firstScryfallFace.typeline.includes("Saga")) return Layout.Saga;
  return Layout.Regular;
}

function parsePart(card: ScryfallCard, scryfallFace: ScryfallCardFace): CardPart {
  const manaCost = scryfallFace.manaCost || card.manaCost;
  const colors = (scryfallFace.colors || card.colors) as Color[];
  const fromManaCost = colorsFromManaCost(manaCost);
  const matchesColors = colors.length === fromManaCost.length && fromManaCost.every((x) => colors.includes(x));

  const requiresColorReassignment = card.layout === ScryfallLayout.Split ||
    ([ScryfallLayout.Adventure, ScryfallLayout.Prepare].includes(card.layout) && card.name !== scryfallFace.name);

  return {
    name: scryfallFace.name || card.name,
    manaCost: manaCost,
    colors: (matchesColors || requiresColorReassignment) ? undefined : colors,
    typeline: scryfallFace.typeline || card.typeline,
    power: scryfallFace.power || card.power,
    toughness: scryfallFace.toughness || card.toughness,
    loyalty: scryfallFace.loyalty || card.loyalty,
    defense: scryfallFace.defense || card.defense,
    text: scryfallFace.oracleText || card.oracleText,
    flavorText: scryfallFace.flavorText || card.flavorText,
    artUri: scryfallFace.artUri || card.artUri,
    artist: scryfallFace.artist || card.artist,
  }
}
