import { Autocomplete, Grid2, TextField, Typography } from "@mui/material";
import { PageContainer } from "../common/PageContainer";
import { useRealCard } from "../scryfall/use-real-card";
import { CardDisplay } from "../display/card/CardDisplay";
import { useState } from "react";
import { useAutocomplete } from "../scryfall/use-autocomplete";

export function RealCardsPage() {
  const [name, setName] = useState("Charging Badger");
  const [search, setSearch] = useState("");
  const { results, isFetching } = useAutocomplete(search);
  const card = useRealCard(name);

  return (
    <PageContainer>
      <Grid2 container display="flex" flexDirection="column" alignItems="center" spacing={8}>
        <Typography variant="h2">
          RealCardsPage
        </Typography>
      </Grid2>
    
      <Autocomplete
        value={search}
        disablePortal
        options={results || []}
        sx={{ width: 300 }}
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

      {card && <CardDisplay card={card} />}
    </PageContainer>
  );
}