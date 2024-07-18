import "styled-components";
import { ThemeType } from "./libs/design-system/styled-components/theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
