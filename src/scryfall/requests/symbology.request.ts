import { localStorageCache } from "../caching/local-storage.cache";
import { scryfallRequest } from "../helpers/scryfall.request";
import { scryfallUrl } from "../helpers/url";


export interface Symbology {
  symbol: string;
  svgUri: string;
}

export const symbologyRequest = async (): Promise<Symbology[]> => {
  const url = scryfallUrl + `/symbology`;

  return localStorageCache('symbology', async () => {
    const json = await scryfallRequest(url);
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return json.data.map((x: any) => ({
      symbol: x.symbol,
      svgUri: x.svg_uri
    }));
  });
}
