import { Autocomplete, TextField } from "@mui/material";
import { MutableRefObject, useMemo } from "react";
import { CatalogType } from "../../scryfall/requests/catalog.request";
import { useCatalogs } from "../../scryfall/use-catalogs";
import Case from "case";

type TypelineOption = {
  catalog: CatalogType,
  item: string;
}

type TypelineControlProps = {
  inputRef?: MutableRefObject<HTMLInputElement | undefined>;
  value: string;
  onChange: (value: string) => void;
}

export function TypelineControl({
  inputRef,
  value,
  onChange
}: TypelineControlProps) {
  const dict = useCatalogs();
  const flattened: TypelineOption[] = useMemo(() => {
    if (!dict) return [];
    return Object.entries(dict).flatMap(([key, items]) =>
      items.map((item) => ({ catalog: key as CatalogType, item })));
  }, [dict]);

  const updateValue = (newValue: string) => {
    onChange(newValue.replace(/-/g, "—"))
  };

  const appendOption = (option?: TypelineOption) => {
    if (!option) return;
    let newValue = value.replace(/\b\s*[^\s]+$/, "");
    newValue += (!newValue || newValue.endsWith(" ")) ? "" : " ";

    const isSubtype = ![CatalogType.Supertypes, CatalogType.Card].includes(option.catalog);
    if (isSubtype && !newValue.includes("—")) {
      newValue += "— "
    }
  
    updateValue(newValue + option.item);
  }

  return (
    <Autocomplete
      freeSolo
      inputValue={value}
      onInputChange={(e, newValue) => {
        if (e?.type !== "change" && newValue) return;
        updateValue(newValue);
      }}
      onChange={(_, option) => appendOption(option as TypelineOption)}
      filterOptions={(options, state) => {
        const splitValue = state.inputValue.split(" ");
        const searchValue = splitValue[splitValue.length - 1];
        return options.filter((x) => x.item.toLowerCase().includes(searchValue.toLowerCase()));
      }}
      groupBy={(option) => Case.title(option.catalog)}
      getOptionLabel={(option) => (option as { item: string }).item || ""}
      options={flattened}
      renderInput={(params) => <TextField {...params} label="Typeline" inputRef={inputRef} />}
    />
  )
}