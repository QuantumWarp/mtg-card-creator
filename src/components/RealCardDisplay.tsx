import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { CardDisplay } from "../display/CardDisplay";
import { useRealCard } from "../scryfall/use-real-card";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
  name: string;
  setCode: string | undefined;
}

export function RealCardDisplay({ name, setCode }: Props) {
  const navigate = useNavigate();
  const { card, loading, error } = useRealCard(name, setCode);

  return (
    <Grid
      size={{ xs: 12, lg: 6 }}
      sx={{
        display: "flex",
        flexDirection:"column",
        alignItems: { xs: "center", lg: "flex-end" }}}
    >
      <Button
        onClick={() => navigate({
            pathname: "/create",
            search: createSearchParams({
              name,
              ...(setCode && { setCode })
            }).toString()
        })}
      >
        View in Editor
      </Button>

      {card && <CardDisplay card={card} />}
      {loading && (
        <Box sx={{ width: "100%", height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box sx={{ width: "100%", height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          Error loading card
        </Box>
      )}
    </Grid>
  );
}
