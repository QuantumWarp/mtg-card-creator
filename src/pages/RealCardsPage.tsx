import { Autocomplete, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer";
import { useState } from "react";
import { useAutocomplete } from "../scryfall/use-autocomplete";
import { useNavigate } from "react-router-dom";
import { RealCardDisplay } from "../components/RealCardDisplay";

export function RealCardsPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("Charging Badger");
  const [setCode, setSetCode] = useState<string | undefined>("BNG")
  const [search, setSearch] = useState("");
  const { results, isFetching } = useAutocomplete(search);

  const renderButton = (reason: string, name: string, setCode: string) => (
    <Button onClick={() => { setName(name); setSetCode(setCode); }}>
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

      <Grid container spacing={4} sx={{ width: "100%" }}>
        <Grid size={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Autocomplete
            fullWidth
            value={search}
            disablePortal
            options={results || []}
            loading={isFetching}
            filterOptions={(x) => x}
            onChange={(_, value) => {
              if (!value) return;
              setName(value);
              setSetCode(undefined);
            }}
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

          {renderButton("Basics", "Charging Badger", "BNG")}
          {renderButton("Basics", "Lightning Bolt", "M10")}
          {renderButton("2 Color", "Lazav, Dimir Mastermind", "GTC")}
          {renderButton("3 Color", "Narset, Enlightened Exile", "MAT")}
          {renderButton("Artifact", "Solemn Simulacrum", "M21")}
          {renderButton("Land", "Island", "BFZ")}
          {renderButton("Colored Land", "Windswept Heath", "KTK")}
          {renderButton("Transform", "Search for Azcanta", "XLN")}
          {renderButton("Modal", "Bala Ged Recovery", "ZNR")}
          {renderButton("Planeswalker", "Jace, Memory Adept", "M14")}
          {renderButton("Planeswalker Transform", "Arlinn, the Pack's Hope", "MID")}
          {renderButton("Saga", "Phyrexian Scriptures", "DOM")}
          {renderButton("Saga Creature", "Summon: Fenrir", "FIN")}
          {renderButton("Adventure", "Lovestruck Beast", "ELD")}
          {renderButton("Omen", "Disruptive Stormbrood", "TDM")}
          {renderButton("Prepared", "Jadzi, Steward of Fate", "SOS")}
          {renderButton("Case", "Case of the Shattered Pact", "MKM")}
          {renderButton("Class", "Stormchaser's Talent", "BLB")}
          {renderButton("Battle", "Invasion of Ixalan", "MOM")}
          {renderButton("Split", "Flotsam // Jetsam", "MKM")}
          {renderButton("Vehicle", "Smuggler's Copter", "KLD")}
          {renderButton("Devoid", "Brood Butcher", "BFZ")}
          {renderButton("Color Indicator", "Asmoranomardicadaistinaculdacar", "MH2")}
        </Grid>

        <RealCardDisplay name={name} setCode={setCode} />
      </Grid>
    </PageContainer>
  );
}