import { localStorageCache } from "../caching/local-storage.cache";
import { scryfallRequest } from "../helpers/scryfall.request";
import { scryfallUrl } from "../helpers/url";

export type CatalogTypes =
  "artifact" |
  "battle" |
  "card" |
  "creature" |
  "enchantment" |
  "land" |
  "spell" |
  "supertype";

export const catalogRequest = async (catalog: CatalogTypes): Promise<string[]> => {
  const url = scryfallUrl + `/catalog/${catalog}-types`;

  return localStorageCache(`${catalog}-types`, async () => {
    const json = await scryfallRequest(url);
    return json.data;
  });
}
