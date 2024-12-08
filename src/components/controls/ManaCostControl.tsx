import { Button, ButtonBase, Grid2, TextField } from "@mui/material";
import { CardSymbol } from "../../display/symbols/CardSymbol";
import { SymbolSelector } from "./SymbolSelector";
import { useState } from "react";


type ManaCostControlProps = {
  value: string;
  onChange: (value: string) => void;
}

export function ManaCostControl({
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
    <ButtonBase sx={{ p: 0.4 }} onClick={() => changeMana(encoded)}>
      <CardSymbol encoded={encoded} size="30px" noShadow />
    </ButtonBase>
  );

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Mana Cost"
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Grid2>
      
      <Grid2 size={{ xs: 12, sm: 6 }} display="flex" justifyContent="center">
        {symbolButton("{W}")}
        {symbolButton("{U}")}
        {symbolButton("{B}")}
        {symbolButton("{R}")}
        {symbolButton("{G}")}
        {symbolButton("{1}")}

        <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
          More
        </Button>

        <SymbolSelector
          manaOnly
          omit={["{W}","{U}","{B}","{R}","{G}","{1}"]}
          anchorEl={anchorEl}
          onSelect={changeMana}
          onClose={() => setAnchorEl(undefined)}
        />
      </Grid2>
    </Grid2>
  )
}