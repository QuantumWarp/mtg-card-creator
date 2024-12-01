import { Box, Button, TextField } from "@mui/material";
import { Card } from "../models/card";
import { readAndCompressImage } from "../common/image";

type EditCardFormProps = {
  card: Card;
  onChange: (card: Card) => void;
}

export function EditCardForm({ card, onChange }: EditCardFormProps) {
  return (
    <Box>
      <TextField
        value={card.name}
        onChange={(e) => onChange({  ...card, name: e.target.value })}
      />

      <Button component="label">
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
    </Box>
  )
}