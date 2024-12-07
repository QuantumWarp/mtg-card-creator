import { useEffect, useState } from "react";
import { getFromMemoryCache, memoryCache } from "./caching/memory.cache";
import { useSymbology } from "./use-symbology";
import { Symbology } from "./requests/symbology.request";

export function useSymbol(encoded: string) {
  const key = `symbol-${encoded}`;
  const symbology = useSymbology();
  const [data, setData] = useState<Symbology | undefined>(getFromMemoryCache(key));

  useEffect(() => {
    if (!symbology) return;
    memoryCache(key, async () => {
      console.log(encoded)
      return symbology.find((x) => x.symbol === encoded);
    }).then((x) => setData(x));
  }, [encoded, key, symbology]);

  return data;
}
