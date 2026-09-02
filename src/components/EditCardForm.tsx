import { Checkbox, Divider, FormControlLabel, Grid, Tab, Tabs } from "@mui/material";
import { Card, CardFace } from "../models/card";
import { DoubleFaceType, Layout } from "../models/layout";
import { defaultFace } from "../storage/card.storage";
import { useEffect, useState } from "react";
import { EditCardFaceForm } from "./forms/EditCardFaceForm";
import { EditCardPartForm } from "./forms/EditCardPartForm";
import { EditCardSpecificsForm } from "./forms/EditCardSpecificsForm";
import { CardClick } from "../display/display-data";
import { ConfirmationDialog } from "./ConfirmationDialog";

type Props = {
  card: Card;
  frontEdit: boolean;
  focusData: CardClick | undefined;
  onFrontEditChange: (isFront: boolean) => void;
  onChange: (card: Card) => void;
}

export function EditCardForm({ card, frontEdit, focusData, onFrontEditChange, onChange }: Props) {
  const [partIndex, setPartIndex] = useState(0);
  const [removeDoubleOpen, setRemoveDoubleOpen] = useState(false);
  const cardFace = frontEdit ? card.frontFace : card.backFace!;
  const cardPart = cardFace.parts[partIndex];

  useEffect(() => {
    if (focusData) {
      if (focusData.cardKey === "doubleFaceType") {
        onFrontEditChange(!frontEdit);
      }
      if (focusData.cardPart) {
        const newPartIndex = cardFace.parts.indexOf(focusData.cardPart);
        setPartIndex(newPartIndex);
      }
    }
  }, [focusData, cardFace.parts, frontEdit, onFrontEditChange]);

  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
      <EditCardSpecificsForm
        card={card}
        focusKey={focusData?.cardKey}
        onChange={onChange}
      />

      <Grid size={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!card.doubleFaceType}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  onChange({
                    ...card,
                    doubleFaceType: DoubleFaceType.Transform,
                    backFace: defaultFace(),
                  });
                } else {
                  setRemoveDoubleOpen(true);
                }
              }}
            />
          }
          label="Is Double Faced"
        />
      </Grid>

      <Divider />

      {card.doubleFaceType && (
        <Grid size={12}>
          <Tabs
            value={frontEdit ? 0 : 1}
            onChange={(_, newValue) => onFrontEditChange(newValue === 0)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Front Face" />
            <Tab label="Back Face" />
          </Tabs>
        </Grid>
      )}

      <EditCardFaceForm
        cardFace={cardFace}
        onChange={(newFace) => {
          onChange({
            ...card,
            frontFace: frontEdit ? newFace : card.frontFace,
            backFace: frontEdit ? card.backFace : newFace,
          });
          setPartIndex(0);
        }}
      />

      {cardFace.parts.length > 1 && (
        <Grid size={12}>
          <Tabs
            value={partIndex}
            onChange={(_, newValue) => setPartIndex(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label={cardFace.layout === Layout.Split ? "Left Part" : "Main Part"} />
            <Tab label={cardFace.layout === Layout.Split ? "Right Part" : "Mini Part"} />
          </Tabs>
        </Grid>
      )}

      <EditCardPartForm
        layout={cardFace.layout}
        focusKey={focusData?.cardKey}
        cardPart={cardPart}
        onChange={(newPart) => {
          const newParts = [...cardFace.parts];
          newParts[partIndex] = newPart;
          const newFace: CardFace = { ...cardFace, parts: newParts };
          onChange({
            ...card,
            frontFace: frontEdit ? newFace : card.frontFace,
            backFace: frontEdit ? card.backFace : newFace,
          });
        }}
      />

      <ConfirmationDialog
        title="Remove Back Face"
        action="Remove"
        open={removeDoubleOpen}
        onConfirm={() => {
          onChange({ ...card, doubleFaceType: undefined, backFace: undefined });
          onFrontEditChange(true);
          setPartIndex(0);
        }}
        onClose={() => setRemoveDoubleOpen(false)}
      >
        Are you sure you want to remove the back face?
        You will permanently lose all data entered into the back face.
      </ConfirmationDialog>
    </Grid>
  )
}