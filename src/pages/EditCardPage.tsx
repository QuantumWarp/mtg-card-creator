import { Box, Button, Grid2, Typography } from "@mui/material";
import { PageContainer } from "../common/PageContainer";
import { EditCardForm } from "../components/EditCardForm";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { saveCard } from "../storage/card.storage";
import { CardDisplay } from "../display/card/CardDisplay";

export function EditCardPage() {
  const navigate = useNavigate();
  const { card: initialCard } = useLoaderData();
  const [card, setCard] = useState(initialCard);

  const save = () => {
    saveCard(card);
    navigate("/");
  };

  return (
    <PageContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3">
          Edit Card
        </Typography>

        <Box>
          <Button onClick={save}>Save</Button>
          <Button onClick={() => navigate("/")}>Cancel</Button>
        </Box>
      </Box>

      <Grid2 container spacing={3} width="100%">
        <Grid2 size={6}>
          <EditCardForm card={card} onChange={setCard} /> 
        </Grid2>

        <Grid2 size={6}>
          <CardDisplay card={card} />
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}
