import { createHashRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EditCardPage } from "./pages/EditCardPage";
import { RealCardsPage } from "./pages/RealCardsPage";
import { defaultCard, getCard } from "./storage/card.storage";

export const router = createHashRouter([
  {
    path: "/",
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
