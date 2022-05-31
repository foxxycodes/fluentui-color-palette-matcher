import { initializeIcons, loadTheme } from "@fluentui/react";
import { ThemeProvider } from "@emotion/react";
import { themes } from "../src/themes/themes";

initializeIcons();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={loadTheme(themes[0].theme)}>
      <Story />
    </ThemeProvider>
  ),
];
