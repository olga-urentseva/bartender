import SearchPage, { loadSearchPageData } from "./components/pages/SearchPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CocktailPage, {
  cocktailPageLoader,
} from "./components/pages/CocktailPage";
import AboutPage from "./components/pages/AboutPage";
import ErrorPage from "./components/pages/ErrorPage";
import CocktailsLibraryPage, {
  CocktailsLibraryLoader,
} from "./components/pages/CocktailsLibraryPage";
import MainPage, { mainPageLoader } from "./components/pages/MainPage";
import CollectionsPage, {
  CollectionsPageLoader,
} from "./components/pages/CollectionsPage";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

const GlobalStyles = createGlobalStyle`
  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    loader: () => mainPageLoader(),
    errorElement: <ErrorPage />,
  },
  {
    path: "/cocktails/:cocktailId",
    element: <CocktailPage />,
    loader: async ({ params }) => cocktailPageLoader({ params: params }),
    errorElement: <ErrorPage />,
  },
  {
    path: "/cocktails",
    element: <CocktailsLibraryPage />,
    loader: ({ request }) => CocktailsLibraryLoader({ request: request }),
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
    loader: ({ request, params }) =>
      loadSearchPageData({ request: request, params: params }),
    errorElement: <ErrorPage />,
  },
  {
    path: "/collections",
    element: <CollectionsPage />,
    loader: CollectionsPageLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/collections/:collectionId",
    element: <SearchPage />,
    loader: ({ request, params }) =>
      loadSearchPageData({ request: request, params: params }),
    errorElement: <ErrorPage />,
  },
  {
    path: "/collections/cocktails/:collectionId",
    element: <CocktailPage />,
    loader: async ({ params }) => cocktailPageLoader({ params: params }),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
