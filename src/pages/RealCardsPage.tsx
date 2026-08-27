import { Autocomplete, Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer";
import { useRealCard } from "../scryfall/use-real-card";
import { CardDisplay } from "../display/CardDisplay";
import { useState } from "react";
import { useAutocomplete } from "../scryfall/use-autocomplete";
import { useNavigate } from "react-router-dom";

export function RealCardsPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Charging Badger");
  const [search, setSearch] = useState("");
  const { results, isFetching } = useAutocomplete(search);
  const { card, loading, error } = useRealCard(name);

  const renderButton = (reason: string, name: string) => (
    <Button onClick={() => setName(name)}>
      <Box sx={{ flex: 1, textAlign: "right" }}>
        {reason}
      </Box>
      <Box sx={{ width: "30px" }}>-</Box>
      <Box sx={{ flex: 1.2, textAlign: "left" }}>
        {name}
      </Box>
    </Button>
  )

  return (
    <PageContainer>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h3">
          Real Card Search
        </Typography>

        <Grid container spacing={1}>
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
          >Back</Button>
        </Grid>
      </Box>
      
      <Typography sx={{ my: 4 }}>
        All symbols, artwork and characters resulting from these searches are copyrighted by Wizards of the Coast.
      </Typography>

      <Grid container spacing={{ xs: 4, lg: 0 }} sx={{ width: "100%" }}>
        <Grid size={6} sx={{ display: "flex", flexDirection: "column" }}>
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

          <Typography variant="h6" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
            Examples
          </Typography>

          {renderButton("Basics", "Charging Badger")}
          {renderButton("Basics", "Lightning Bolt")}
          {renderButton("Basics", "Mana Drain")}
          {renderButton("Basics", "Dirge Bat")}
          {renderButton("2 Color", "Lazav, Dimir Mastermind")}
          {renderButton("3 Color", "Narset, Enlightened Exile")}
          {renderButton("Artifact", "Solemn Simulacrum")}
          {renderButton("Land", "Island")}
          {renderButton("Colored Land", "Windswept Heath")}
          {renderButton("Transform", "Search for Azcanta")}
          {renderButton("Modal", "Bala Ged Recovery")}
          {renderButton("Planeswalker", "Jace, Memory Adept")}
          {renderButton("Planeswalker Transform", "Arlinn, the Pack's Hope")}
          {renderButton("Saga", "Phyrexian Scriptures")}
          {renderButton("Saga Transform", "Azusa's Many Journeys")}
          {renderButton("Saga Creature", "Summon: Fenrir")}
          {renderButton("Adventure", "Lovestruck Beast")}
          {renderButton("Omen", "Disruptive Stormbrood")}
          {renderButton("Prepared", "Jadzi, Steward of Fate")}
          {renderButton("Case", "Case of the Shattered Pact")}
          {renderButton("Class", "Stormchaser's Talent")}
          {renderButton("Battle", "Invasion of Ixalan")}
          {renderButton("Aftermath", "Destined // Lead")}
          {renderButton("Fuse", "Give // Take")}
          {renderButton("Split", "Flotsam // Jetsam")}
          {renderButton("Room", "Smoky Lounge // Misty Salon")}
          {renderButton("Vehicle", "Smuggler's Copter")}
          {renderButton("Spacecraft", "Exploration Broodship")}
          {renderButton("Devoid", "Thought Harvester")}
          {renderButton("Color Indicator", "Asmoranomardicadaistinaculdacar")}
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }} sx={{ display: "flex", justifyContent: { xs: "center", lg: "flex-end" }}}>
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
      </Grid>
    </PageContainer>
  );
}