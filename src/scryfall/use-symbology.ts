import { useEffect, useState } from "react";
import { Symbology, symbologyRequest } from "./requests/symbology.request";
import { localStorageCache } from "./caching/local-storage.cache";

export function useSymbology() {
  const [data, setData] = useState<Symbology[]>();

  useEffect(() => {
    localStorageCache("scryfall-symbology", async () => {
      return await symbologyRequest();
    }).then((x) => setData(x));
  }, []);

  return data;
}
