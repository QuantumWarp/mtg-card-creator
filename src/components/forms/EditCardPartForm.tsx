import { Button, Grid, TextField } from "@mui/material";
import { CardPart } from "../../models/card";
import { readAndCompressImageFile } from "../../storage/image";
import { ManaCostControl } from "../controls/ManaCostControl";
import { OracleTextControl } from "../controls/OracleTextControl";
import { TypelineControl } from "../controls/TypelineControl";
import { useRef } from "react";
import { deriveColors } from "../../display/helpers/palette";
import { Layout } from "../../models/layout";

type Props = {
  layout: Layout;
  cardPart: CardPart;
  onChange: (cardPart: CardPart) => void;
}

export function EditCardPartForm({ layout, cardPart, onChange }: Props) {
  const nameRef = useRef<HTMLInputElement>(undefined);
  const manaCostRef = useRef<HTMLInputElement>(undefined);
  const typelineRef = useRef<HTMLInputElement>(undefined);
  const textRef = useRef<HTMLInputElement>(undefined);
  const flavorRef = useRef<HTMLInputElement>(undefined);
  const loyaltyRef = useRef<HTMLInputElement>(undefined);
  const defenseRef = useRef<HTMLInputElement>(undefined);
  const powerRef = useRef<HTMLInputElement>(undefined);
  const toughnessRef = useRef<HTMLInputElement>(undefined);
  const imageRef = useRef<HTMLLabelElement>(null);
  const artistRef = useRef<HTMLInputElement>(undefined);
  
  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
      <Grid size={{ xs: 12, sm: 8 }}>
        <TextField
          inputRef={nameRef}
          autoFocus
          label="Name"
          fullWidth
          value={cardPart.name}
          onChange={(e) => onChange({  ...cardPart, name: e.target.value })}
        />
      </Grid>

      <Grid size={12}>
        <ManaCostControl
          inputRef={manaCostRef}
          value={cardPart.manaCost || ""}
          onChange={(x) => onChange({ 
            ...cardPart,
            manaCost: x || undefined,
            colors: x ? deriveColors({ text: "", manaCost: x }, !!cardPart.typeline?.includes("Land")) : undefined,
          })}
        />
      </Grid>

      <Grid size={9}>
        <TypelineControl
          inputRef={typelineRef}
          value={cardPart.typeline || ""}
          onChange={(x) => onChange({  ...cardPart, typeline: x || undefined })}
        />
      </Grid>

      <Grid size={12}>
        <OracleTextControl
          inputRef={textRef}
          value={cardPart.text || ""}
          onChange={(x) => onChange({  ...cardPart, text: x || undefined })}
        />
      </Grid>

      <Grid size={12}>
        <TextField
          inputRef={flavorRef}
          label="Flavour Text"
          fullWidth
          multiline
          value={cardPart.flavorText}
          onChange={(e) => onChange({  ...cardPart, flavorText: e.target.value || undefined })}
        />
      </Grid>

      <Grid size={4}>
        <TextField
          label="Text Scaling"
          fullWidth
          value={cardPart.textScaling === undefined ? "1" : cardPart.textScaling}
          onChange={(e) => onChange({  ...cardPart, textScaling: e.target.value })}
        />
      </Grid>

      {layout === Layout.Planeswalker && (
        <Grid size={5}>
          <TextField
            inputRef={loyaltyRef}
            label="Loyalty"
            fullWidth
            value={cardPart.loyalty || ""}
            onChange={(e) => onChange({  ...cardPart, loyalty: e.target.value ? e.target.value : undefined })}
          />
        </Grid>
      )}
      
      {layout === Layout.Battle && (
        <Grid size={5}>
          <TextField
            inputRef={defenseRef}
            label="Defense"
            fullWidth
            value={cardPart.defense || ""}
            onChange={(e) => onChange({  ...cardPart, defense: e.target.value ? e.target.value : undefined })}
          />
        </Grid>
      )}
      
      {layout !== Layout.Planeswalker && layout !== Layout.Battle && (
        <>
          <Grid size={4}>
            <TextField
              inputRef={powerRef}
              label="Power"
              fullWidth
              value={cardPart.power || ""}
              onChange={(e) => onChange({  ...cardPart, power: e.target.value ? e.target.value : undefined })}
            />
          </Grid>
        
          <Grid size={4}>
            <TextField
              inputRef={toughnessRef}
              label="Toughness"
              fullWidth
              value={cardPart.toughness || ""}
              onChange={(e) => onChange({  ...cardPart, toughness: e.target.value ? e.target.value : undefined })}
            />
          </Grid>
        </>
      )}

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
              onChange({ ...cardPart, artUri });
            }}
          />
        </Button>
      </Grid>
      
      <Grid size={8}>
        <TextField
          inputRef={artistRef}
          label="Artist"
          fullWidth
          value={cardPart.artist}
          onChange={(e) => onChange({  ...cardPart, artist: e.target.value || undefined })}
        />
      </Grid>
    </Grid>
  )
}