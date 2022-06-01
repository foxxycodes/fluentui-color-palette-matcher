import styled from "@emotion/styled";
import {
  getColorFromString,
  IColor,
  IPartialTheme,
  MotionAnimations,
} from "@fluentui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { ThemeObject } from "../themes/themes";
import ColorCard from "./ColorCard";
import Group from "./Group";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.m};
`;

const Palette = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: ${(props) => props.theme.spacing.s1};
  justify-content: space-between;
`;

const getDiffColor = (a: IColor, b: IColor) => {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
};

export interface IColorPalette {
  theme: ThemeObject;
  sets?: (keyof IPartialTheme)[];
  filterByColor?: string;
  maxFilteredColors?: number;
}

const ColorPalette: React.FC<IColorPalette> = (props) => {
  const {
    theme,
    sets = ["palette"],
    filterByColor,
    maxFilteredColors = 2,
  } = props;

  const renderSwatches = React.useCallback(
    (set: keyof IPartialTheme) => {
      const subset = theme.theme[set];
      if (!subset) return;
      const swatches: {
        el: JSX.Element;
        diff?: number;
      }[] = [];
      for (const [propertyName, colorValue] of Object.entries(subset)) {
        // calculate distance between filter color and color
        const filterColor =
          filterByColor !== undefined
            ? getColorFromString(filterByColor)
            : undefined;
        const color = getColorFromString(colorValue);
        const diff = filterColor && color && getDiffColor(filterColor, color);
        swatches.push({
          el: (
            <ColorCard
              bgColor={color ? color.str : ""}
              propertyName={propertyName}
              propertyPath={`${set}.${propertyName}`}
              diff={diff}
            />
          ),
          diff,
        });
      }
      // closest 3 colors
      if (filterByColor !== undefined)
        return swatches
          .sort((a, b) => {
            if (a.diff === undefined || b.diff === undefined) return 0;
            return a.diff - b.diff;
          })
          .slice(0, maxFilteredColors)
          .map((s) => s.el);
      return swatches.map((swatch) => swatch.el);
    },
    [theme, filterByColor, maxFilteredColors]
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
