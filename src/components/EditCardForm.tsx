import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Card } from "../models/card";
import { readAndCompressImageFile } from "../storage/image";
import { ManaCostControl } from "./controls/ManaCostControl";
import { OracleTextControl } from "./controls/OracleTextControl";
import { TypelineControl } from "./controls/TypelineControl";
import { Rarity } from "../models/rarity";
import Case from "case";

type EditCardFormProps = {
  card: Card;
  onChange: (card: Card) => void;
}

export function EditCardForm({ card, onChange }: EditCardFormProps) {
  return (
    <Grid2 container spacing={2} alignItems="center">
      <Grid2 size={{ xs: 12, sm: 8 }}>
        <TextField
          label="Name"
          fullWidth
          value={card.name}
          onChange={(e) => onChange({  ...card, name: e.target.value })}
        />
      </Grid2>

      <Grid2 size={12}>
        <ManaCostControl
          value={card.manaCost}
          onChange={(manaCost) => onChange({  ...card, manaCost })}
        />
      </Grid2>

      <Grid2 size={9}>
        <TypelineControl
          value={card.typeline}
          onChange={(typeline) => onChange({  ...card, typeline })}
        />
      </Grid2>

      <Grid2 size={3}>
        <FormControl fullWidth>
          <InputLabel>Rarity</InputLabel>
          <Select
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
      </Grid2>

      <Grid2 size={12}>
        <OracleTextControl
          value={card.text}
          onChange={(text) => onChange({  ...card, text })}
        />
      </Grid2>

      <Grid2 size={9}>
        <TextField
          label="Flavour Text"
          fullWidth
          multiline
          value={card.flavorText}
          onChange={(e) => onChange({  ...card, flavorText: e.target.value })}
        />
      </Grid2>

      <Grid2 size={3}>
        <TextField
          label="Text Scaling"
          fullWidth
          value={card.textScaling === undefined ? "1" : card.textScaling}
          onChange={(e) => onChange({  ...card, textScaling: e.target.value })}
        />
      </Grid2>

      <Grid2 size={4} display="flex" justifyContent="center">
        <Button component="label" sx={{ p: 1.5, flex: 1 }} variant="outlined">
          Choose Image
          <input
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            onChange={async (event) => {
              const selectedFile = event.target.files?.[0];
              if (!selectedFile) return;
              const artUri = await readAndCompressImageFile(selectedFile);
              onChange({ ...card, artUri });
            }}
          />
        </Button>
      </Grid2>
      
      <Grid2 size={8}>
        <TextField
          label="Artist"
          fullWidth
          value={card.artist}
          onChange={(e) => onChange({  ...card, artist: e.target.value })}
        />
      </Grid2>

      <Grid2 size={4}>
        <TextField
          label="Collector Number"
          fullWidth
          value={card.collectorNumber}
          onChange={(e) => onChange({  ...card, collectorNumber: e.target.value })}
        />
      </Grid2>

      <Grid2 size={4}>
        <TextField
          label="Set Card Count"
          type="number"
          fullWidth
          value={card.set.cardCount}
          onChange={(e) => onChange({  ...card, set: { ...card.set, cardCount: Number(e.target.value) } })}
        />
      </Grid2>

      <Grid2 size={4}>
        <TextField
          label="Set Code"
          fullWidth
          value={card.set.code}
          onChange={(e) => onChange({  ...card, set: { ...card.set, code: e.target.value } })}
        />
      </Grid2>
    </Grid2>
  )
}