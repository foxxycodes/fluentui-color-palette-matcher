import { getTheme } from "@fluentui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ColorCard from "../components/ColorCard";

export default {
  title: "ColorCard",
  component: ColorCard,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof ColorCard>;

const Template: ComponentStory<typeof ColorCard> = (args) => {
  return <ColorCard {...args} />;
};

export const Light = Template.bind({});
export const Dark = Template.bind({});

Light.args = {
  bgColor: "#fff",
  propertyName: "white",
  propertyPath: "theme.palette.white",
};

Dark.args = {
  bgColor: getTheme().palette?.accent,
  propertyName: "accent",
  propertyPath: "theme.palette.accent",
};
