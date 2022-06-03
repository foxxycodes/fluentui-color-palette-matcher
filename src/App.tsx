import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import {
  createTheme,
  getTheme,
  IColor,
  initializeIcons,
  ITheme,
  Separator,
  Slider,
  Text,
} from "@fluentui/react";
import React from "react";
import Accordion from "./components/Accordion";
import ColorPalette from "./components/ColorPalette";
import ColorPicker from "./components/ColorPicker";
import Layout from "./components/Layout";
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
  const [maxMatches, setMaxMatches] = React.useState(2);
  const [filterColor, setFilterColor] = React.useState<IColor | undefined>();

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
      <Layout
        settingsPanel={
          <>
            <Text variant="large" style={{ fontWeight: "bold" }}>
              Search For Closest Hex-Colors
            </Text>
            <Separator styles={{ root: { width: "100%" } }} />
            <ColorPicker onColorChanged={(color) => setFilterColor(color)} />
            <Separator styles={{ root: { width: "100%" } }} />
            <Slider
              styles={{ root: { width: "100%" } }}
              label="Number of Matches"
              min={0}
              max={30}
              value={maxMatches}
              showValue
              onChange={(value) => setMaxMatches(value)}
            />
          </>
        }
        content={themes?.map((theme, index) => (
          <ThemeProvider key={index} theme={theme.theme}>
            <Accordion title={theme.name} open={true}>
              <ColorPalette
                theme={theme}
                filterByColor={filterColor?.str}
                maxFilteredColors={maxMatches}
              ></ColorPalette>
            </Accordion>
          </ThemeProvider>
        ))}
      />
    </AppContainer>
  );
};

export default App;
