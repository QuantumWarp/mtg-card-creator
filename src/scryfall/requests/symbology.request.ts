/* eslint-disable @typescript-eslint/no-explicit-any */
import Case from "case";
import { scryfallRequest } from "../helpers/scryfall.request";
import { scryfallUrl } from "../helpers/url";


export interface Symbology {
  symbol: string;
  svgUri: string;
  manaCost: boolean;
  description: boolean;
}

export const symbologyRequest = async (): Promise<Symbology[]> => {
  const url = scryfallUrl + `/symbology`;

  const json = await scryfallRequest(url);

  return json.data
    .filter((x: any) => !x.funny)
    .map((x: any) => ({
      symbol: x.symbol,
      svgUri: x.svg_uri,
      manaCost: x.appears_in_mana_costs,
      description: Case.sentence(x.english)
    }));
}
