import { Autocomplete, Box, Button, CircularProgress, Grid2, TextField, Typography } from "@mui/material";
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
  const { card, loading, error } = useRealCard(name);

  return (
    <PageContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between" >
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
      
      <Typography my={4}>
        All symbols, artwork and characters resulting from these searches are copyrighted by Wizards of the Coast.
      </Typography>

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

          <Typography variant="h6" mt={4} mb={2} textAlign="center">
            Working Examples
          </Typography>

          <Button onClick={() => setName("Charging Badger")}>Charging Badger</Button>
          <Button onClick={() => setName("Lightning Bolt")}>Lightning Bolt</Button>
          <Button onClick={() => setName("Mana Drain")}>Mana Drain</Button>
          <Button onClick={() => setName("Narset, Enlightened Exile")}>Narset, Enlightened Exile</Button>
          <Button onClick={() => setName("Solemn Simulacrum")}>Solemn Simulacrum</Button>
          <Button onClick={() => setName("Lazav, Dimir Mastermind")}>Lazav, Dimir Mastermind</Button>
          <Button onClick={() => setName("Windswept Heath")}>Windswept Heath</Button>
          <Button onClick={() => setName("Island")}>Island</Button>

          <Typography variant="h6" mt={4} mb={2} textAlign="center">
            Unformatted Examples
          </Typography>

          <Button onClick={() => setName("Jace, Memory Adept")}>Planeswalker - Jace, Memory Adept</Button>
          <Button onClick={() => setName("Search for Azcanta")}>Flip - Search for Azcanta</Button>
          <Button onClick={() => setName("Phyrexian Scriptures")}>Saga - Phyrexian Scriptures</Button>
          <Button onClick={() => setName("Invasion of Ixalan")}>Battle - Invasion of Ixalan</Button>
          <Button onClick={() => setName("Lovestruck Beast")}>Adventure - Lovestruck Beast</Button>
          <Button onClick={() => setName("Destined // Lead")}>Split - Destined // Lead</Button>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }} display="flex" justifyContent={{ xs: "center", lg: "flex-end" }}>
          {card && <CardDisplay card={card} />}
          {loading && (
            <Box width="100%" height={500} display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Box width="100%" height={500} display="flex" alignItems="center" justifyContent="center">
              Error loading card
            </Box>
          )}
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}