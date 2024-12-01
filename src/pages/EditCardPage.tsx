import { Button, Grid2, Typography } from "@mui/material";
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
      <Grid2 container display="flex" flexDirection="column" alignItems="center" spacing={8}>
        <Typography variant="h2">
          EditCardPage
        </Typography>
      </Grid2>

      <EditCardForm card={card} onChange={setCard} />
      <CardDisplay card={card} />
      <Button onClick={save}>Save</Button>
      <Button onClick={() => navigate("/")}>Cancel</Button>
    </PageContainer>
  );
}
