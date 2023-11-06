import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "components/Organisms/SearchBar";

const meta: Meta = {
  title: "Organisms/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const search: Story = {
  args: {},
};
