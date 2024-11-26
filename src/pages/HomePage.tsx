import { Button, Grid2, Typography } from "@mui/material";
import { PageContainer } from "../common/PageContainer";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

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
        onClick={() => navigate({ pathname: "set" })}
      >
        Set
      </Button>

      <Button
        variant="contained"
        sx={{ width: 100 }}
        onClick={() => navigate({ pathname: "real-cards" })}
      >
        Real
      </Button>
    </PageContainer>
  );
}
