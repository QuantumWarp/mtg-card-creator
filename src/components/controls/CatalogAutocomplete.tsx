import { Autocomplete, TextField } from "@mui/material";
import { CatalogType } from "../../scryfall/requests/catalog.request";
import { useCatalogs } from "../../scryfall/use-catalogs";
import Case from "case";

type CatalogAutocompleteProps = {
  label: string
  catalogs: CatalogType[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function CatalogAutocomplete({
  label,
  catalogs, 
  value,
  onChange
}: CatalogAutocompleteProps) {
  const dict = useCatalogs(catalogs);
  const flattened = dict && Object.entries(dict).flatMap(([key, items]) =>
    items.map((item) => ({ catalog: key, item })));

  return (
    <Autocomplete
      multiple
      freeSolo
      value={value}
      onChange={(_, value) => onChange(value as string[])}
      groupBy={(option) => Case.title(option.catalog)}
      getOptionLabel={(option) => (option as { item: string }).item}
      options={flattened || []}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )
}