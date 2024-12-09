import { useState, useEffect } from "react";
import { catalogRequest, CatalogType } from "./requests/catalog.request";
import { localStorageCache } from "./caching/local-storage.cache";

const allCatalogs = Object.values(CatalogType);

type CatalogDictionary = {
  [key in CatalogType]?: string[];
}

export function useCatalogs(catalogs: CatalogType[] = allCatalogs) {
  const [data, setData] = useState<CatalogDictionary>();

  useEffect(() => {
    setData({});
    for (const catalog of catalogs) {
      localStorageCache(`scryfall-catalog-${catalog}`, async () => {
        return await catalogRequest(catalog);
      }).then((x) => setData((prev) => ({ ...prev, [catalog]: x })));
    }
  }, [catalogs]);

  return data;
}
