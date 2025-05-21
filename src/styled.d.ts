import "styled-components";
import { themeNew } from "./styles/theme";

type MyTheme = typeof themeNew;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends MyTheme {}
}
