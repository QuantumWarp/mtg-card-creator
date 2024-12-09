import { createHashRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EditCardPage } from "./pages/EditCardPage";
import { RealCardsPage } from "./pages/RealCardsPage";
import { defaultCard, getCard, getCards } from "./storage/card.storage";
import { loadExamplesIfRequired } from "./examples/load-examples";

export const router = createHashRouter([
  {
    path: "/",
    loader: async () => {
      let cards = getCards();
      cards = await loadExamplesIfRequired(cards);
      return { cards };
    },
    element: <HomePage />,
  },
  {
    path: "/edit/:cardId?",
    loader: ({ params }) => {
      const { cardId } = params;
      const card = cardId ? getCard(cardId) : defaultCard();
      return { card };
    },
    element: <EditCardPage />,
  },
  {
    path: "/real-cards",
    loader: () => ({ card: undefined }),
    element: <RealCardsPage />,
  },
]);
