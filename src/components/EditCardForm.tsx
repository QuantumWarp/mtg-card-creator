import { Button, Grid2, TextField } from "@mui/material";
import { Card } from "../models/card";
import { readAndCompressImage } from "../common/image";
import { ManaCostControl } from "./controls/ManaCostControl";
import { OracleTextControl } from "./controls/OracleTextControl";
import { TypelineControl } from "./controls/TypelineControl";

type EditCardFormProps = {
  card: Card;
  onChange: (card: Card) => void;
}

export function EditCardForm({ card, onChange }: EditCardFormProps) {
  return (
    <Grid2 container spacing={2} alignItems="center">
      <Grid2 size={6}>
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

      <Grid2 size={12}>
        <TypelineControl
          value={card.typeline}
          onChange={(typeline) => onChange({  ...card, typeline })}
        />
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
          value={card.flavourText}
          onChange={(e) => onChange({  ...card, flavourText: e.target.value })}
        />
      </Grid2>
      <Grid2 size={3}>
        <TextField
          label="Font Scaling"
          type="number"
          fullWidth
          value={card.set.cardCount}
          onChange={(e) => onChange({  ...card, set: { ...card.set, cardCount: Number(e.target.value) } })}
        />
      </Grid2>

      <Grid2 size={4} display="flex" justifyContent="center">
        <Button component="label" sx={{ p: 1.5, flex: 1 }}>
          Choose Image
          <input
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            onChange={async (event) => {
              const selectedFile = event.target.files?.[0];
              if (!selectedFile) return;
              const compressedBlob = await readAndCompressImage(selectedFile);
              const reader = new FileReader();
              reader.readAsDataURL(compressedBlob);
              reader.onload = () => {
                onChange({ ...card, artUri: reader.result as string });
              };
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