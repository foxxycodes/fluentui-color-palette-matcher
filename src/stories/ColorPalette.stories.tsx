import { getTheme } from "@fluentui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ColorPalette from "../components/ColorPalette";

export default {
  title: "ColorPalette",
  component: ColorPalette,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof ColorPalette>;

const Template: ComponentStory<typeof ColorPalette> = (args) => {
  return <ColorPalette {...args} />;
};

export const SingleSet = Template.bind({});
export const MultipleSets = Template.bind({});

SingleSet.args = {
  theme: { name: "Default Teams", theme: getTheme() },
};

MultipleSets.args = {
  theme: { name: "Default Teams", theme: getTheme() },
  sets: ["palette", "semanticColors"],
};
