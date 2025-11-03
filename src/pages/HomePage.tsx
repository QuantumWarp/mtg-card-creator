import { Button, ButtonBase, Grid2, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Card } from "../models/card";
import { CardDisplay } from "../display/card/CardDisplay";

export function HomePage() {
  const navigate = useNavigate();
  const { cards } = useLoaderData() as { cards: Card[] };

  return (
    <PageContainer maxWidth={1800}>
      <Grid2 container display="flex" flexDirection="column" alignItems="center" spacing={8}>
        <Typography variant="h2">
          MTG Puzzles & Card Creator 
        </Typography>
        <Typography textAlign="center" maxWidth={800}>
          Initially designed for creating cards using only CSS,
          this unofficial tool lets you design custom MTG cards or browse real cards in the same layout.
          Remember to credit any artwork used in your custom creations. The puzzle section
          was added later as a fun way to learn about various Magic: The Gathering rules and interactions!
        </Typography>
      </Grid2>

      <Grid2 container spacing={1} display="flex" justifyContent="center" mt={4} mb={8}>
        <Button
          variant="contained"
          sx={{ width: 135 }}
          onClick={() => navigate({ pathname: "puzzle-list" })}
        >
          Puzzles
        </Button>

        <Button
          variant="contained"
          sx={{ width: 135 }}
          onClick={() => navigate({ pathname: "edit" })}
        >
          Create Card
        </Button>

        <Button
          variant="contained"
          sx={{ width: 135 }}
          onClick={() => navigate({ pathname: "real-cards" })}
        >
          Real Cards
        </Button>
      </Grid2>

      <Grid2 container spacing={4} justifyContent="center" px={2}>
        {cards.map((x) => (
          <Grid2 key={x.id} size={{ xs: 12, md: 4, lg: 3, xl: 12 / 5 }}>
            <ButtonBase
              sx={{
                width: "100%",
                transition: "transform 0.2s ease",
                ":hover": {
                  transform: "translateY(-10px)",
                }
              }}
            >
              <CardDisplay card={x} onClick={() => navigate({ pathname: `edit/${x.id}` })} />
            </ButtonBase>
          </Grid2>
        ))}
      </Grid2>
    </PageContainer>
  );
}
