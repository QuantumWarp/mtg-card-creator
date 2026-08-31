import { Button, ButtonBase, Grid, IconButton, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Card } from "../models/card";
import { CardDisplay } from "../display/CardDisplay";
import { useState } from "react";
import { appendExamples } from "../examples/load-examples";
import { getCards } from "../storage/card.storage";
import { HelpOutlined } from "@mui/icons-material";
import { AboutDialog } from "../components/AboutDialog";

export function HomePage() {
  const navigate = useNavigate();
  const [openAbout, setOpenAbout] = useState(false);
  const { cards: loaderCards } = useLoaderData() as { cards: Card[] };
  const [cards, setCards] = useState(loaderCards);
  const [filter, setFilter] = useState<string>();

  const reloadData = () => {
    setCards(appendExamples(getCards()));
  };

  const allSetCodes = [...new Set(cards.map((x) => x.set?.code).filter((x) => !!x))] as string[];
  const showSetTabs = allSetCodes.length > 1;
  const filteredCards = filter ? cards.filter((x) => x.set?.code === filter) : cards;

  return (
    <PageContainer maxWidth={1800} reload={reloadData}>
      <Grid container sx={{ display: "flex", flexDirection: "column", alignItems: "center", spacing: 8 }}>
        <Typography variant="h2">
          MTG Puzzles & Card Creator 
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", textAlign: "center", maxWidth: 800 }}>
          Don't forget to back up your cards as they are only stored in your browser!
          
          <Tooltip title="About this app" placement="top">
            <IconButton onClick={() => setOpenAbout(true)}>
              <HelpOutlined />
            </IconButton>
          </Tooltip>
        </Typography>
        <AboutDialog open={openAbout} onClose={() => setOpenAbout(false)} />
      </Grid>

      <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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
          onClick={() => navigate({ pathname: "create" })}
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
      </Grid>

      {showSetTabs && (
        <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={filter}
            onChange={(_, newCode) => setFilter(newCode)}
          >
            {allSetCodes.map((x) => (
              <ToggleButton value={x}>{x}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      )}

      <Grid container spacing={4} sx={{ justifyContent: "center", px: 2, mt: 6 }}>
        {filteredCards.map((x) => (
          <Grid key={x.id} size={{ xs: 12, md: 4, lg: 3, xl: 12 / 5 }}>
            <ButtonBase
              sx={{
                width: "100%",
                transition: "transform 0.2s ease",
                ":hover": {
                  transform: "translateY(-10px)",
                }
              }}
            >
              <CardDisplay card={x} displayData={{ onClick: () => navigate({ pathname: `edit/${x.id}` }) }} />
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
