import { scryfallRequest } from "../helpers/scryfall.request";
import { scryfallUrl } from "../helpers/url";

export const autocompleteRequest = async (search: string): Promise<string[]> => {
  const url = scryfallUrl + `/cards/autocomplete?q=${encodeURIComponent(search)}`;
  const json = await scryfallRequest(url);
  return json.data;
}
