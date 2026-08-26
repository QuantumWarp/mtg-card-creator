import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Card } from "../models/card";
import { readAndCompressImageFile } from "../storage/image";
import { ManaCostControl } from "./controls/ManaCostControl";
import { OracleTextControl } from "./controls/OracleTextControl";
import { TypelineControl } from "./controls/TypelineControl";
import { Rarity } from "../models/rarity";
import Case from "case";
import { useEffect, useRef } from "react";

type EditCardFormProps = {
  card: Card;
  focusKey?: keyof Card;
  onChange: (card: Card) => void;
}

export function EditCardForm({ card, focusKey, onChange }: EditCardFormProps) {
  const nameRef = useRef<HTMLInputElement>(undefined);
  const manaCostRef = useRef<HTMLInputElement>(undefined);
  const typelineRef = useRef<HTMLInputElement>(undefined);
  const rarityRef = useRef<HTMLSelectElement>(undefined);
  const textRef = useRef<HTMLInputElement>(undefined);
  const flavorRef = useRef<HTMLInputElement>(undefined);
  const powerRef = useRef<HTMLInputElement>(undefined);
  const toughnessRef = useRef<HTMLInputElement>(undefined);
  const imageRef = useRef<HTMLLabelElement>(null);
  const artistRef = useRef<HTMLInputElement>(undefined);
  const collectorNumberRef = useRef<HTMLInputElement>(undefined);
  const setCodeRef = useRef<HTMLInputElement>(undefined);

  useEffect(() => {
    if (focusKey === "name") nameRef.current?.focus();
    if (focusKey === "manaCost") manaCostRef.current?.select();
    if (focusKey === "typeline") typelineRef.current?.focus();
    if (focusKey === "rarity") rarityRef.current?.focus();
    if (focusKey === "text") textRef.current?.focus();
    if (focusKey === "flavorText") flavorRef.current?.focus();
    if (focusKey === "power") powerRef.current?.select();
    if (focusKey === "toughness") toughnessRef.current?.select();
    if (focusKey === "artUri") imageRef.current?.click();
    if (focusKey === "artist") artistRef.current?.focus();
    if (focusKey === "collectorNumber") collectorNumberRef.current?.select();
    if (focusKey === "set") setCodeRef.current?.select();
  }, [focusKey]);
  
  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
      <Grid size={{ xs: 12, sm: 8 }}>
        <TextField
          inputRef={nameRef}
          autoFocus
          label="Name"
          fullWidth
          value={card.name}
          onChange={(e) => onChange({  ...card, name: e.target.value })}
        />
      </Grid>

      <Grid size={12}>
        <ManaCostControl
          inputRef={manaCostRef}
          value={card.manaCost}
          onChange={(manaCost) => onChange({  ...card, manaCost })}
        />
      </Grid>

      <Grid size={9}>
        <TypelineControl
          inputRef={typelineRef}
          value={card.typeline}
          onChange={(typeline) => onChange({  ...card, typeline })}
        />
      </Grid>

      <Grid size={3}>
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

      <Grid size={12}>
        <OracleTextControl
          inputRef={textRef}
          value={card.text}
          onChange={(text) => onChange({  ...card, text })}
        />
      </Grid>

      <Grid size={12}>
        <TextField
          inputRef={flavorRef}
          label="Flavour Text"
          fullWidth
          multiline
          value={card.flavorText}
          onChange={(e) => onChange({  ...card, flavorText: e.target.value })}
        />
      </Grid>

      <Grid size={4}>
        <TextField
          label="Text Scaling"
          fullWidth
          value={card.textScaling === undefined ? "1" : card.textScaling}
          onChange={(e) => onChange({  ...card, textScaling: e.target.value })}
        />
      </Grid>
      
      <Grid size={4}>
        <TextField
          inputRef={powerRef}
          label="Power"
          fullWidth
          value={card.power || ""}
          onChange={(e) => onChange({  ...card, power: e.target.value ? e.target.value : undefined })}
        />
      </Grid>
      
      <Grid size={4}>
        <TextField
          inputRef={toughnessRef}
          label="Toughness"
          fullWidth
          value={card.toughness || ""}
          onChange={(e) => onChange({  ...card, toughness: e.target.value ? e.target.value : undefined })}
        />
      </Grid>

      <Grid size={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Button component="label" sx={{ p: 1.5, flex: 1 }} variant="outlined" ref={imageRef}>
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
      </Grid>
      
      <Grid size={8}>
        <TextField
          inputRef={artistRef}
          label="Artist"
          fullWidth
          value={card.artist}
          onChange={(e) => onChange({  ...card, artist: e.target.value })}
        />
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
          value={card.set.cardCount}
          onChange={(e) => onChange({  ...card, set: { ...card.set, cardCount: Number(e.target.value) } })}
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
    </Grid>
  )
}