import SearchPage, {
  loader as searchPageLoader,
} from "./components/pages/SearchPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CocktailPage, {
  loader as cocktailPageLoader,
} from "./components/pages/CocktailPage";
import AboutPage from "./components/pages/AboutPage";
import ErrorPage from "./components/pages/ErrorPage";
import CocktailsLibraryPage, {
  loader as cocktailsPageLoader,
} from "./components/pages/CocktailsLibraryPage";
import MainPage, {
  loader as mainPageLoader,
} from "./components/pages/MainPage";
import CollectionsPage, {
  loader as collectionsPageLoader,
} from "./components/pages/CollectionsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    loader: mainPageLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cocktails/:cocktailId",
    element: <CocktailPage />,
    loader: cocktailPageLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cocktails",
    element: <CocktailsLibraryPage />,
    loader: cocktailsPageLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
    loader: searchPageLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/collections",
    element: <CollectionsPage />,
    loader: collectionsPageLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/collections/:collectionId",
    element: <SearchPage />,
    loader: searchPageLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/collections/cocktails/:collectionId",
    element: <CocktailPage />,
    loader: cocktailPageLoader,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
