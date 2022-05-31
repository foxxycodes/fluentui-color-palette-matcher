import { getTheme } from "@fluentui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Group from "../components/Group";
import ColorPalette from "../components/ColorPalette";

export default {
  title: "Group",
  component: Group,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Group>;

const Template: ComponentStory<typeof Group> = (args) => {
  return <Group {...args} />;
};

export const WithPalette = Template.bind({});

WithPalette.args = {
  title: "Teams Default - Palette",
  children: (
    <ColorPalette
      theme={{ name: "Teams Default", theme: getTheme() }}
    ></ColorPalette>
  ),
};
