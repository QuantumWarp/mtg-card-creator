import { useState, useEffect } from "react";
import { catalogRequest, CatalogTypes } from "./requests/catalog.request";

export function useCatalog(catalog: CatalogTypes) {
  const [data, setData] = useState<string[]>();

  useEffect(() => {
    catalogRequest(catalog).then((x) => setData(x));
  }, [catalog]);

  return data;
}
