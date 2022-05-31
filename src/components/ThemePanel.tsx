import styled from "@emotion/styled";
import { IPartialTheme, Text } from "@fluentui/react";
import React from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { ThemeObject } from "../themes/themes";
import ColorCard from "./ColorCard";

// pick text color based on background color
const textColorBasedOnBgColor = (bgColor: string) => {
  // hex to rgb regex
  const hexToRgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(bgColor);
  if (!hexToRgb) {
    return;
  }
  const r = parseInt(hexToRgb[1], 16);
  const g = parseInt(hexToRgb[2], 16);
  const b = parseInt(hexToRgb[3], 16);
  const bgColorLuminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return bgColorLuminance > 128 ? "black" : "white";
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Palette = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.s1};
`;

export interface IThemePanel {
  theme: ThemeObject;
}

const ThemePanel: React.FC<IThemePanel> = (props) => {
  const { theme } = props;

  const renderSwatches = (set: keyof IPartialTheme) => {
    const palette = theme.theme[set];
    if (!palette) return;

    const swatches = [];
    for (const [key, value] of Object.entries(palette)) {
      swatches.push(
        <ColorCard
          key={`${key}-${value}`}
          bgColor={value}
          propertyName={key}
          propertyPath={`theme.${set}.${key}`}
        />
      );
    }
    return swatches;
  };

  return (
    <Wrapper>
      <Palette>{renderSwatches("palette")}</Palette>
    </Wrapper>
  );
};

export default ThemePanel;
