import { getTheme } from "@fluentui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Accordion from "../components/Accordion";
import ColorPalette from "../components/ColorPalette";

export default {
  title: "Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => {
  return <Accordion {...args} />;
};

export const WithPalette = Template.bind({});

WithPalette.args = {
  title: "Teams Default - Palette",
  open: true,
  children: (
    <ColorPalette theme={{ name: "Default", theme: getTheme() }}></ColorPalette>
  ),
};
