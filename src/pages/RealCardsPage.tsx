import { Grid2, Typography } from "@mui/material";
import { PageContainer } from "../common/PageContainer";
import { useRealCard } from "../scryfall/use-real-card";
import { useCatalog } from "../scryfall/use-catalog";
import { useSymbol } from "../scryfall/use-symbol";

export function RealCardsPage() {
  const card = useRealCard("Charging Badger");
  const catalog = useCatalog("artifact");
  const sym1 = useSymbol("{0}");
  const sym2 = useSymbol("{T}");

  return (
    <PageContainer>
      <Grid2 container display="flex" flexDirection="column" alignItems="center" spacing={8}>
        <Typography variant="h2">
          RealCardsPage
        </Typography>
      </Grid2>

      {card?.name}
      {catalog?.[0]}

      <img src={card?.image} />
      <img src={sym1} />
      <img src={sym2} />
    </PageContainer>
  );
}