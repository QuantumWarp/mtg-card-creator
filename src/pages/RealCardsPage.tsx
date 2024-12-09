import { Autocomplete, Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer";
import { useRealCard } from "../scryfall/use-real-card";
import { CardDisplay } from "../display/card/CardDisplay";
import { useState } from "react";
import { useAutocomplete } from "../scryfall/use-autocomplete";
import { useNavigate } from "react-router-dom";

export function RealCardsPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Charging Badger");
  const [search, setSearch] = useState("");
  const { results, isFetching } = useAutocomplete(search);
  const card = useRealCard(name);

  return (
    <PageContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={8}>
        <Typography variant="h3">
          Real Card Search
        </Typography>

        <Grid2 container spacing={1}>
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
          >Back</Button>
        </Grid2>
      </Box>


      <Grid2 container spacing={{ xs: 4, lg: 0 }} width="100%">
        <Grid2 size={6} display="flex" flexDirection="column">
          <Autocomplete
            fullWidth
            value={search}
            disablePortal
            options={results || []}
            loading={isFetching}
            filterOptions={(x) => x}
            onChange={(_, value) => value && setName(value)}
            renderInput={(params) =>
              <TextField
                {...params}
                label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />

          <Typography variant="h6" mt={4} mb={1}>
            Working Examples
          </Typography>

          <Button onClick={() => setName("Charging Badger")}>Charging Badger</Button>
          <Button onClick={() => setName("Lightning Bolt")}>Lightning Bolt</Button>
          <Button onClick={() => setName("Narset, Enlightened Exile")}>Narset, Enlightened Exile</Button>
          <Button onClick={() => setName("Windswept Heath")}>Windswept Heath</Button>
          <Button onClick={() => setName("Island")}>Island</Button>

          <Typography variant="h6" mt={4} mb={1}>
            Unformatted Examples
          </Typography>

          <Button onClick={() => setName("Jace, Memory Adept")}>Jace, Memory Adept</Button>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }} display="flex" justifyContent={{ xs: "center", lg: "flex-end" }}>
          {card && <CardDisplay card={card} />}
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}