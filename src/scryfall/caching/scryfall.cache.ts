import { indexedDbStore } from "../../storage/indexed-db";

const withStore = indexedDbStore("mtg-card-creator-scryfall", "cache");

export const scryfallCache = async <T>(
  key: string,
  func: () => Promise<T>,
): Promise<T> => {
  const cached = await withStore<T | undefined>("readonly", (store) => store.get(key));
  if (cached !== undefined) return cached;

  const value = await func();
  await withStore("readwrite", (store) => store.put(value, key));

  return value;
}

export const clearScryfallCache = async (): Promise<void> => {
  await withStore("readwrite", (store) => store.clear());
}
