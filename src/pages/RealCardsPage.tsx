import { Grid2, Typography } from "@mui/material";
import { PageContainer } from "../common/PageContainer";

export function RealCardsPage() {
  return (
    <PageContainer>
      <Grid2 container display="flex" flexDirection="column" alignItems="center" spacing={8}>
        <Typography variant="h2">
          RealCardsPage
        </Typography>
      </Grid2>
    </PageContainer>
  );
}
