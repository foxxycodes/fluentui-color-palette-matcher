import styled from "@emotion/styled";
import { IPartialTheme, Text } from "@fluentui/react";
import React from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { ThemeObject } from "../themes/themes";
import ColorCard from "./ColorCard";
import Group from "./Group";

// find nearest hex color
const nearestHexColor = (color: string): string => {
  const hex = color.replace(/^#/, "");
  if (hex.length === 3) {
    const hexArray = hex.split("");
    hexArray.forEach((char, index) => {
      hexArray[index] = char + char;
    });
    return "#" + hexArray.join("");
  }
  return color;
};

// get diff color
const getDiffColor = (colorA: string, colorB: string) => {
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);
};

// hex to rgb
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

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
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.m};
`;

const Palette = styled.div`
  width: 100%;
  display: grid; /* 1 */
  grid-template-columns: repeat(auto-fill, 200px); /* 2 */
  grid-gap: 1rem; /* 3 */
  justify-content: space-between;
`;

export interface IColorPalette {
  theme: ThemeObject;
  sets?: (keyof IPartialTheme)[];
}

const ColorPalette: React.FC<IColorPalette> = (props) => {
  const { theme, sets = ["palette"] } = props;

  const renderSwatches = React.useCallback(
    (set: keyof IPartialTheme) => {
      const subset = theme.theme[set];
      if (!subset) return;

      const swatches = [];
      for (const [propertyName, colorValue] of Object.entries(subset)) {
        swatches.push(
          <ColorCard
            key={`${propertyName}-${colorValue}`}
            bgColor={colorValue}
            propertyName={propertyName}
            propertyPath={`theme.${set}.${propertyName}`}
          />
        );
      }
      return swatches;
    },
    [theme]
  );

  return (
    <Wrapper>
      {sets.map((set) => {
        const title = `${theme.name} - ${
          set.charAt(0).toUpperCase() + set.slice(1)
        }`;
        return (
          <Group key={title} title={title}>
            <Palette>{renderSwatches(set)}</Palette>
          </Group>
        );
      })}
    </Wrapper>
  );
};

export default ColorPalette;
