import type { Meta, StoryObj } from "@storybook/react";
import SearchCell from "components/Organisms/SearchCell";

const meta: Meta = {
  title: "Organisms/SearchCell",
  component: SearchCell,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const search: Story = {
  args: {},
};
