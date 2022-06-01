import { getTheme, Text } from "@fluentui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Group from "../components/Group";
import ColorPalette from "../components/ColorPalette";
import ColorCard from "../components/ColorCard";

export default {
  title: "Group",
  component: Group,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Group>;

export const WithText = () => (
  <Group title="Group">
    <Text>This is a Text-Component inside a Group-Component.</Text>
  </Group>
);

export const WithColorCards = () => (
  <Group title="Group">
    <ColorCard
      bgColor="#0078d4"
      propertyName="blue"
      propertyPath="theme.palette.blue"
    />
    <ColorCard
      bgColor="#23d400"
      propertyName="green"
      propertyPath="theme.palette.green"
    />
  </Group>
);
