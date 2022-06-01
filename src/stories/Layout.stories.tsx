import { ComponentMeta, ComponentStory } from "@storybook/react";
import Accordion from "../components/Accordion";
import ColorPicker from "../components/ColorPicker";
import Layout from "../components/Layout";
import { WithPalette } from "./Accordion.stories";

export default {
  title: "Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => {
  return <Layout {...args} />;
};

export const WithSettings = Template.bind({});
export const WithContent = Template.bind({});
export const Full = Template.bind({});

WithSettings.args = {
  settingsPanel: <ColorPicker />,
};

WithContent.args = {
  content: <Accordion title="" {...WithPalette.args}></Accordion>,
};

Full.args = {
  settingsPanel: WithSettings.args.settingsPanel,
  content: WithContent.args.content,
};
