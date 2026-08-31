import { Button, ButtonBase, Grid, TextField } from "@mui/material";
import { CardSymbol } from "../../display/helpers/symbols/CardSymbol";
import { SymbolSelector } from "./SymbolSelector";
import { RefObject, useState } from "react";


type ManaCostControlProps = {
  inputRef?: RefObject<HTMLInputElement | undefined>;
  value: string;
  onChange: (value: string) => void;
}

export function ManaCostControl({
  inputRef,
  value,
  onChange
}: ManaCostControlProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  const addMana = (encoded: string) => {
    if (encoded === "{1}") {
      const containsNumber = /{\d+}/.test(value);
      if (containsNumber) return value.replace(/{(\d+)}/g, (_, num) => `{${Number(num) + 1}}`);
      else return "{1}" + value;
    } else {
      return encoded + value;
    }
  };

  const changeMana = (encoded: string) => {
    const updated = addMana(encoded);
    onChange(updated);
  }

  const symbolButton = (encoded: string) => (
    <ButtonBase sx={{ p: 0.4 }} onClick={() => changeMana(encoded)} tabIndex={-1}>
      <CardSymbol encoded={encoded} size="30px" noShadow />
    </ButtonBase>
  );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          inputRef={inputRef}
          label="Mana Cost"
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Grid>
      
      <Grid size={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
        {symbolButton("{W}")}
        {symbolButton("{U}")}
        {symbolButton("{B}")}
        {symbolButton("{R}")}
        {symbolButton("{G}")}
        {symbolButton("{1}")}

        <Button onClick={(e) => setAnchorEl(e.currentTarget)} tabIndex={-1}>
          More
        </Button>

        <SymbolSelector
          manaOnly
          omit={["{W}","{U}","{B}","{R}","{G}","{1}"]}
          anchorEl={anchorEl}
          onSelect={changeMana}
          onClose={() => setAnchorEl(undefined)}
        />
      </Grid>
    </Grid>
  )
}