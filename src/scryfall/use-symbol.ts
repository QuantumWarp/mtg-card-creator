import { useEffect, useRef, useState } from "react";
import { symbologyRequest } from "./requests/symbology.request";
import { getFromMemoryCache, memoryCache } from "./caching/memory.cache";

export function useSymbol(encoded: string) {
  const key = `symbol-${encoded}`;
  const [data, setData] = useState(getFromMemoryCache(key));

  const prevName = useRef<string>();

  useEffect(() => {
    if (prevName.current === encoded) return;
    prevName.current = encoded;

    memoryCache(key, async () => {
      const symbology = await symbologyRequest();
      const symbol = symbology.find((x) => x.symbol === encoded);
      return symbol?.svgUri;
    }).then((x) => setData(x));
  }, [encoded, key]);

  return data;
}
