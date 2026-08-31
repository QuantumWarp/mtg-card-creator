import { v4 as uuid } from "uuid";
import { createHashRouter, Outlet } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EditCardPage } from "./pages/EditCardPage";
import { PuzzleListPage } from "./pages/PuzzleListPage";
import { RealCardsPage } from "./pages/RealCardsPage";
import { defaultCard, getCard, getCards } from "./storage/card.storage";
import { KeyedPuzzlePage } from "./pages/PuzzlePage";
import { fetchRealCard } from "./scryfall/use-real-card";
import { appendExamples, getExample } from "./examples/load-examples";
import { PageContainer } from "./components/PageContainer";
import { Box, Typography } from "@mui/material";

export const router = createHashRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: (
      <PageContainer>
        <Box>
          <Typography variant="h3">
            Unexpected Error
          </Typography>

          <Typography sx={{ mt: 4 }}>
            If this error appears on first load of the app
            you may need to delete all data using the button in the toolbar below.
            Make sure to <b>back up your data</b> before doing so.
          </Typography>
        </Box>
      </PageContainer>
    ),
    children: [
      {
        path: "/",
        loader: () => {
          let cards = getCards();
          cards = appendExamples(cards);
          return { cards };
        },
        element: <HomePage />,
      },
      {
        path: "/create",
        loader: async ({ request }) => {
          let card = defaultCard();
          const url = new URL(request.url);
          const name = url.searchParams.get("name");
          const setCode = url.searchParams.get("setCode");
          if (name) {
            card = await fetchRealCard(name, setCode || undefined);
            card.id = uuid();
            card.real = false;
            card.set = { code: card.set.code, total: card.set.total }
          }
          return { card };
        },
        element: <EditCardPage />,
      },
      {
        path: "/edit/:cardId",
        loader: async ({ params }) => {
          const { cardId } = params;
          const example = getExample(cardId!);
          if (example) return { card: example };
          const card = getCard(cardId!);
          return { card };
        },
        element: <EditCardPage />,
      },
      {
        path: "/real-cards",
        loader: () => ({ card: undefined }),
        element: <RealCardsPage />,
      },
      {
        path: "/puzzle-list",
        element: <PuzzleListPage />,
      },
      {
        path: "/puzzles/:puzzleIndex?",
        element: <KeyedPuzzlePage />,
      }
    ]
  }
]);
