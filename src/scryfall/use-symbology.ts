import { useEffect, useState } from "react";
import { Symbology, symbologyRequest } from "./requests/symbology.request";
import { scryfallCache } from "./caching/scryfall.cache";

export function useSymbology() {
  const [data, setData] = useState<Symbology[]>();

  useEffect(() => {
    scryfallCache("scryfall-symbology", async () => {
      return await symbologyRequest();
    }).then((x) => setData(x));
  }, []);

  return data;
}
