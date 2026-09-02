import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer";
import { EditCardForm } from "../components/EditCardForm";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { deleteCard, saveCard } from "../storage/card.storage";
import { CardDisplay } from "../display/CardDisplay";
import { Card } from "../models/card";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { CardClick } from "../display/display-data";

export function EditCardPage() {
  const navigate = useNavigate();
  const { card: initialCard } = useLoaderData() as { card: Card };
  const [card, setCard] = useState(initialCard);
  const [frontEdit, setFrontEdit] = useState(true);
  const [focusData, setFocusData] = useState<CardClick>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const dirty = card !== initialCard;
  const isExample = card.id.includes("example");

  const save = () => {
    saveCard(card);
    navigate("/");
  };

  useEffect(() => {
    if (!focusData) return;
    setFocusData(undefined);
  }, [focusData])

  return (
    <PageContainer>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 8 }}>
        <Typography variant="h3">
          Edit Card
        </Typography>

        <Grid container spacing={1}>
          <Tooltip title={isExample && "Examples cannot be saved. Please create a new card."}>
            <span>
              <Button
                disabled={isExample}
                onClick={save}
                variant="outlined"
              >Save</Button>
            </span>
          </Tooltip>

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


          <Tooltip title={isExample && "Examples cannot be deleted here. Please hide examples using the bottom toolbar button."}>
            <span>
              <Button
                disabled={isExample}
                color="error"
                variant="outlined"
                onClick={() => setDeleteOpen(true)}
              >Delete</Button>
            </span>
          </Tooltip>

          <ConfirmationDialog
            title="Delete Card"
            action="Delete"
            open={deleteOpen}
            onConfirm={() => { deleteCard(card); navigate("/"); }}
            onClose={() => setDeleteOpen(false)}
          >
            Are you sure you want to delete <b>{card.frontFace.parts[0].name}?</b>
          </ConfirmationDialog>
        </Grid>
      </Box>

      <Grid container spacing={{ xs: 4, lg: 0 }} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <EditCardForm
            card={card}
            frontEdit={frontEdit}
            focusData={focusData}
            onFrontEditChange={setFrontEdit}
            onChange={setCard}
          /> 
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }} sx={{ display: "flex", justifyContent: { xs: "center", lg: "flex-end" }}}>
          <CardDisplay card={card} displayData={{ isFront: frontEdit, onClick: setFocusData }} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
