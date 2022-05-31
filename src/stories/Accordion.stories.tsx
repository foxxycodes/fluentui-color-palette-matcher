import { getTheme } from "@fluentui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Accordion from "../components/Accordion";
import ThemePanel from "../components/ThemePanel";

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
    <ThemePanel theme={{ name: "Default", theme: getTheme() }}></ThemePanel>
  ),
};
