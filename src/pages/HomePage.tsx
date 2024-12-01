import { Box, Button, Grid2, Typography } from "@mui/material";
import { PageContainer } from "../common/PageContainer";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { getCards } from "../storage/card.storage";

export function HomePage() {
  const navigate = useNavigate();
  const cards = useMemo(() => getCards(), []);

  return (
    <PageContainer>
      <Grid2 container display="flex" flexDirection="column" alignItems="center" spacing={8}>
        <Typography variant="h2">
          MTG Card Creator
        </Typography>
        <Typography textAlign="center">
          Todo
        </Typography>
      </Grid2>

      <Button
        variant="contained"
        sx={{ width: 100 }}
        onClick={() => navigate({ pathname: "edit" })}
      >
        Create
      </Button>

      <Button
        variant="contained"
        sx={{ width: 100 }}
        onClick={() => navigate({ pathname: "real-cards" })}
      >
        Real
      </Button>

      {cards.map((x) => (
        <Box key={x.id}>
          {x.name}
          <Button onClick={() => navigate({ pathname: `edit/${x.id}` })}>Edit</Button>
        </Box>
      ))}
    </PageContainer>
  );
}
