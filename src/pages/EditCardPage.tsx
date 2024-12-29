import { Box, Button, Grid2, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer";
import { EditCardForm } from "../components/EditCardForm";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { deleteCard, saveCard } from "../storage/card.storage";
import { CardDisplay } from "../display/card/CardDisplay";
import { Card } from "../models/card";
import { ConfirmationDialog } from "../components/ConfirmationDialog";

export function EditCardPage() {
  const navigate = useNavigate();
  const { card: initialCard } = useLoaderData() as { card: Card };
  const [card, setCard] = useState(initialCard);
  const [focusKey, setFocusKey] = useState<keyof Card>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const dirty = card !== initialCard;

  const save = () => {
    saveCard(card);
    navigate("/");
  };

  useEffect(() => {
    if (!focusKey) return;
    setFocusKey(undefined);
  }, [focusKey])

  return (
    <PageContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={8}>
        <Typography variant="h3">
          Edit Card
        </Typography>

        <Grid2 container spacing={1}>
          <Button
            onClick={save}
            variant="outlined"
          >Save</Button>

          <Button
            onClick={() => {
              if (dirty) setCancelOpen(true);
              else navigate("/");
            }}
            variant="outlined"
          >Cancel</Button>

          <ConfirmationDialog
            title="Discard Changes"
            action="Discard"
            open={cancelOpen}
            onConfirm={() => navigate("/")}
            onClose={() => setCancelOpen(false)}
          >
            Are you sure you want to discard your changes?
          </ConfirmationDialog>

          <Button
            color="error"
            variant="outlined"
            onClick={() => setDeleteOpen(true)}
          >Delete</Button>

          <ConfirmationDialog
            title="Delete Card"
            action="Delete"
            open={deleteOpen}
            onConfirm={() => { deleteCard(card); navigate("/"); }}
            onClose={() => setDeleteOpen(false)}
          >
            Are you sure you want to delete <b>{card.name}?</b>
          </ConfirmationDialog>
        </Grid2>
      </Box>

      <Grid2 container spacing={{ xs: 4, lg: 0 }} width="100%">
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <EditCardForm
            card={card}
            onChange={setCard}
            focusKey={focusKey}
          /> 
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }} display="flex" justifyContent={{ xs: "center", lg: "flex-end" }}>
          <CardDisplay card={card} onClick={setFocusKey} />
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}
