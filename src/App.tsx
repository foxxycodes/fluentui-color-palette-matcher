import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { createTheme, initializeIcons, ITheme } from "@fluentui/react";
import React from "react";
import ColorPalette from "./components/ColorPalette";
import { ThemeObject } from "./themes/themes";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.semanticColors.bodyBackground};
`;

export interface IApp {
  themes: ThemeObject[];
}

/**
 * creates for each passed in theme a ThemeProvider
 * @param props
 */
const App: React.FC<IApp> = (props) => {
  const [themes, setThemes] =
    React.useState<{ name: string; theme: ITheme }[]>();

  React.useLayoutEffect(() => {
    initializeIcons();
  }, []);

  React.useEffect(() => {
    const temp: { name: string; theme: ITheme }[] = [];
    props.themes.forEach((theme) => {
      temp.push({ name: theme.name, theme: createTheme(theme.theme) });
    });
    setThemes(temp);
  }, [props.themes]);

  return (
    <AppContainer>
      {themes?.map((theme, index) => (
        <ThemeProvider key={index} theme={theme.theme}>
          <ColorPalette theme={theme}></ColorPalette>
        </ThemeProvider>
      ))}
    </AppContainer>
  );
};

export default App;
