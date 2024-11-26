import { createHashRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EditCardPage } from "./pages/EditCardPage";
import { RealCardsPage } from "./pages/RealCardsPage";
import { SetPage } from "./pages/SetPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/edit/:cardId?",
    loader: () => ({ card: undefined }),
    element: <EditCardPage />,
  },
  {
    path: "/set",
    loader: () => ({ card: undefined }),
    element: <SetPage />,
  },
  {
    path: "/real-cards",
    loader: () => ({ card: undefined }),
    element: <RealCardsPage />,
  },
]);
