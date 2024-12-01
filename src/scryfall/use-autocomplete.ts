import { useEffect, useState } from "react";
import { autocompleteRequest } from "./requests/autocomplete.request";

export function useAutocomplete(search: string) {
  const [associatedSearch, setAssociatedSearch] = useState<string>();
  const [results, setResults] = useState<string[]>();

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!search) {
        setResults([]);
        setAssociatedSearch(search);
        return;
      }

      const currentSearch = search;
      const newResults = await autocompleteRequest(currentSearch);
      setResults(newResults);
      setAssociatedSearch(currentSearch);
    }, 800);

    return () => { clearTimeout(handler); };
  }, [search, setResults]);

  return {
    results,
    isFetching: search !== associatedSearch,
  };
}