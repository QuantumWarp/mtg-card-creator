import { scryfallRequest } from "../helpers/scryfall.request";
import { scryfallUrl } from "../helpers/url";

export interface ScryfallCard {
  id: string;

  name: string;
  setId: string;
  setName: string;
  rarity: string;

  manaCost: string;
  colors: string[];

  typeline: string;

  power: string;
  toughness: string;

  oracleText: string;
  flavourText: string;

  artUri: string;
  artist: string;

  // TODO: card faces
}

export const cardRequest = async (name: string): Promise<ScryfallCard> => {
  const url = scryfallUrl + `/cards/named?exact=${name}`;

  const json = await scryfallRequest(url);

  return {
    id: json.id,

    name: json.name,
    setId: json.set_id,
    setName: json.set_name,
    rarity: json.rarity,

    manaCost: json.mana_cost,
    colors: json.colors,
  
    typeline: json.typeline,
  
    power: json.power,
    toughness: json.toughness,
  
    oracleText: json.oracle_text,
    flavourText: json.flavour_text,
  
    artUri: json.image_uris.art_crop,
    artist: json.artist,
  };
}
