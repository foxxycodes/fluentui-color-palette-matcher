import { ITheme, loadTheme, ThemeProvider } from "@fluentui/react";
import React from "react";
import ThemePanel from "./components/ThemePanel";
import { ThemeObject } from "./themes/themes";

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

  React.useEffect(() => {
    const temp: { name: string; theme: ITheme }[] = [];
    props.themes.forEach((theme) => {
      temp.push({ name: theme.name, theme: loadTheme(theme.theme) });
    });
    setThemes(temp);
  }, [props.themes]);

  return (
    <>
      {themes?.map((theme, index) => {
        return (
          <ThemeProvider key={index} theme={theme.theme}>
            <ThemePanel theme={theme}></ThemePanel>
          </ThemeProvider>
        );
      })}
    </>
  );
};

export default App;
