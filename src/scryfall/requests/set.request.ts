import { scryfallRequest } from "../helpers/scryfall.request";
import { scryfallUrl } from "../helpers/url";

export interface ScryfallSet {
  id: string;
  name: string;
  code: string;
  cardCount: number;
  iconSvgUri: string;
}

export const setRequest = async (setId: string): Promise<ScryfallSet> => {
  const url = scryfallUrl + `/sets/${setId}`;

  const json = await scryfallRequest(url);

  return {
    id: json.id,
    name: json.name,
    code: json.code,
    cardCount: json.card_count,
    iconSvgUri: json.icon_svg_uri
  };
}
