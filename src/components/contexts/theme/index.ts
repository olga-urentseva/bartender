import { createContext, useContext } from "react";

const ThemeContext = createContext<{ theme: string }>({
  theme: "light",
});
