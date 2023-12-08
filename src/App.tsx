import { createGlobalStyle, ThemeProvider } from "styled-components";
import SearchPage, { loadSearchPageData } from "./components/pages/SearchPage";
import { theme } from "./styles/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CocktailPage from "./components/pages/CocktailPage";
import AboutPage from "./components/pages/AboutPage";
import getCocktailById from "./api/getCocktailById";
import ErrorPage from "./components/pages/ErrorPage";
import CocktailsLibraryPage, {
  CocktailsLibraryLoader,
} from "./components/pages/CocktailsLibraryPage";
import MainPage from "./components/pages/MainPage";
import CollectionsPage from "./components/pages/CollectionsPage";

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
    errorElement: <ErrorPage />,
  },
  {
    path: "/cocktails/:cocktailId",
    element: <CocktailPage />,
    loader: async ({ params }) => {
      const response = await getCocktailById(params.cocktailId);
      if (!response) {
        throw new Response("Cocktail not found", { status: 404 });
      }
      return response;
    },
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
    loader: ({ request }) => loadSearchPageData({ request: request }),
    errorElement: <ErrorPage />,
  },
  {
    path: "/collections",
    element: <CollectionsPage />,
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
