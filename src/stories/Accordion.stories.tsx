import { getTheme } from "@fluentui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Accordion from "../components/Accordion";
import ColorPalette from "../components/ColorPalette";
import { Text } from "@fluentui/react";

export default {
  title: "Accordion",
  component: Accordion,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => {
  return <Accordion {...args} />;
};

export const WithPalette = Template.bind({});
export const WithText = Template.bind({});

WithPalette.args = {
  title: "Teams Default - Palette",
  open: true,
  children: (
    <ColorPalette theme={{ name: "Default", theme: getTheme() }}></ColorPalette>
  ),
};

WithText.args = {
  title: "Teams Default - Text",
  open: true,
  children: (
    <Text>This is a Text-Component inside an Accordion-Component.</Text>
  ),
};
