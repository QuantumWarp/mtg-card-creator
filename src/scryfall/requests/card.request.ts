/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rarity } from "../../models/rarity";
import { scryfallRequest } from "../helpers/scryfall.request";
import { scryfallUrl } from "../helpers/url";

export interface ScryfallCardFace {
  name: string;

  manaCost: string;
  colors: string[];

  typeline: string;

  power: string;
  toughness: string;
  loyalty: string;
  defense: string;
  
  oracleText: string;
  flavorText: string;
  
  artUri: string;
  artist: string;
}

export interface ScryfallCard extends ScryfallCardFace {
  id: string;

  setId: string;
  setName: string;
  rarity: Rarity;
  collectorNumber: string;
  layout: ScryfallLayout;

  cardFaces: ScryfallCardFace[];
}

export const cardRequest = async (name: string, setCode?: string): Promise<ScryfallCard> => {
  let url = scryfallUrl + `/cards/named?exact=${encodeURIComponent(name)}`;
  if (setCode) url += `&set=${setCode}`;

  const json = await scryfallRequest(url);

  return {
    id: json.id,

    setId: json.set_id,
    setName: json.set_name,
    rarity: json.rarity,
    collectorNumber: json.collector_number,
    layout: json.layout,

    ...cardFaceFromJson(json),

    cardFaces: json.card_faces ? json.card_faces.map((x: any) => cardFaceFromJson(x)) : []
  };
}

const cardFaceFromJson = (json: any): ScryfallCardFace => {
  return {
    name: json.name,

    manaCost: json.mana_cost,
    colors: json.colors,
  
    typeline: json.type_line,
  
    power: json.power,
    toughness: json.toughness,
    loyalty: json.loyalty,
    defense: json.defense,
  
    oracleText: json.oracle_text,
    flavorText: json.flavor_text,
  
    artUri: json.image_uris?.art_crop,
    artist: json.artist,
  };
}

export enum ScryfallLayout {
  Normal = 'normal',
  Transform = 'transform',
  Adventure = 'adventure',
  Prepare = 'prepare',
  Split = 'split',
  Modal = 'modal_dfc',
  Class = 'class',
  Case = 'case',
  Saga = 'saga',
  Battle = 'battle',

  // Skipped
  Mutate = 'mutate',
  Token = 'token',
  Flip = 'flip',
  Meld = 'meld',
  Leveler = 'leveler',
  Prototype = 'prototype',
  Planar = 'planar',
  Scheme = 'scheme',
  Vanguard = 'vanguard',
  TokenModal = 'double_faced_token',
  Emblem = 'emblem',
  Augment = 'augment',
  Host = 'host',
  ArtSeries = 'art_series',
  Reversible = 'reversible_card',
  Front = 'front_card',
}
