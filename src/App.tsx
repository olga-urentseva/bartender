import { createGlobalStyle, ThemeProvider } from "styled-components";
import MainPage from "./components/pages/MainPage";
import { theme } from "./assets/styles/theme";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
