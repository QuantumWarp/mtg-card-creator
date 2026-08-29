import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { CardFace, CardPart } from "../../models/card";
import Case from "case";
import { Layout } from "../../models/layout";

type EditCardFormProps = {
  cardFace: CardFace;
  onChange: (cardFace: CardFace) => void;
}

export function EditCardFaceForm({ cardFace, onChange }: EditCardFormProps) {
  const handleLayoutChange = (newLayout: Layout) => {
    const newParts = getNewParts(newLayout);
    const updatedParts = applyUpdates(newLayout, newParts);
    onChange({ ...cardFace, layout: newLayout, parts: updatedParts });
  };

  const getNewParts = (newLayout: Layout): CardPart[] => {
    const twoPartLayout = [Layout.Adventure, Layout.Prepare, Layout.Split].includes(newLayout);
    const expectedPartCount = twoPartLayout ? 2 : 1;
    const currentPartCount = cardFace.parts.length;
    if (expectedPartCount > currentPartCount) return [...cardFace.parts, { name: "" }]
    if (expectedPartCount < currentPartCount) return cardFace.parts.slice(0, 1);
    return cardFace.parts;
  };

  const applyUpdates = (newLayout: Layout, newParts: CardPart[]): CardPart[] => {
    const firstPart = newParts[0];
    const secondPart = newParts[1];

    if (newLayout !== Layout.Planeswalker) firstPart.loyalty = undefined;
    if (newLayout !== Layout.Battle) firstPart.defense = undefined;
    if (newLayout === Layout.Planeswalker || newLayout === Layout.Battle) {
      firstPart.power = undefined;
      firstPart.toughness = undefined;
    }

    firstPart.typeline = "";
    if (secondPart) secondPart.typeline = "";
    if (newLayout === Layout.Adventure) secondPart.typeline = "Adventure";
    if (newLayout === Layout.Battle) firstPart.typeline = "Battle — Siege";
    if (newLayout === Layout.Case) firstPart.typeline = "Enchantment — Case";
    if (newLayout === Layout.Planeswalker) firstPart.typeline = "Legendary Planeswalker";
    if (newLayout === Layout.Saga) firstPart.typeline = "Enchantment — Saga";

    return newParts;
  };

  return (
    <Grid size={6}>
      <FormControl fullWidth>
        <InputLabel>Layout</InputLabel>
        <Select
          label="Layout"
          value={cardFace.layout}
          onChange={(e) => handleLayoutChange(e.target.value as Layout)}
        >
          {Object.values(Layout).map((x) => (
            <MenuItem key={x} value={x}>
              {Case.title(x)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}