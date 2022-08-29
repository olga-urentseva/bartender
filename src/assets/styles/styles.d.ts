import "styled-components";
import { theme } from "./theme";

type MyTheme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends MyTheme {}
}
