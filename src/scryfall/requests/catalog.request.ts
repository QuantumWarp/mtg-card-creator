import { scryfallRequest } from "../helpers/scryfall.request";
import { scryfallUrl } from "../helpers/url";

export enum CatalogType {
  Card = "card",
  Supertypes = "supertypes",
  Artifact = "artifact",
  Battle = "battle",
  Enchantment = "enchantment",
  Land = "land",
  Spell = "spell",
  Creature = "creature",
}

export const catalogRequest = async (catalog: CatalogType): Promise<string[]> => {
  const urlEnd = catalog.endsWith("types") ? catalog : `${catalog}-types`;
  const url = scryfallUrl + `/catalog/${urlEnd}`;
  const json = await scryfallRequest(url);
  return json.data;
}
