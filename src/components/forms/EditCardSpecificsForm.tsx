import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Case from "case";
import { useEffect, useRef } from "react";
import { Rarity } from "../../models/rarity";
import { Card } from "../../models/card";

type Props = {
  card: Card;
  focusKey?: keyof Card;
  onChange: (card: Card) => void;
}

export function EditCardSpecificsForm({ card, focusKey, onChange }: Props) {
  const rarityRef = useRef<HTMLSelectElement>(undefined);
  const collectorNumberRef = useRef<HTMLInputElement>(undefined);
  const setCodeRef = useRef<HTMLInputElement>(undefined);

  useEffect(() => {
    if (focusKey === "rarity") rarityRef.current?.focus();
    if (focusKey === "collectorNumber") collectorNumberRef.current?.select();
    if (focusKey === "set") setCodeRef.current?.select();
  }, [focusKey]);
  
  return (
    <>
      <Grid size={4}>
        <FormControl fullWidth>
          <InputLabel>Rarity</InputLabel>
          <Select
            inputRef={rarityRef}
            label="Rarity"
            value={card.rarity}
            onChange={(e) => onChange({  ...card, rarity: e.target.value as Rarity })}
          >
            {Object.values(Rarity).map((x) => (
              <MenuItem key={x} value={x}>
                {Case.title(x)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid size={4}>
        <TextField
          inputRef={collectorNumberRef}
          label="Collector Number"
          fullWidth
          value={card.collectorNumber}
          onChange={(e) => onChange({  ...card, collectorNumber: e.target.value })}
        />
      </Grid>

      <Grid size={4}>
        <TextField
          label="Set Card Count"
          type="number"
          fullWidth
          value={card.set.total}
          onChange={(e) => onChange({  ...card, set: { ...card.set, total: Number(e.target.value) || undefined } })}
        />
      </Grid>

      <Grid size={4}>
        <TextField
          inputRef={setCodeRef}
          label="Set Code"
          fullWidth
          value={card.set.code}
          onChange={(e) => onChange({  ...card, set: { ...card.set, code: e.target.value } })}
        />
      </Grid>
    </>
  )
}