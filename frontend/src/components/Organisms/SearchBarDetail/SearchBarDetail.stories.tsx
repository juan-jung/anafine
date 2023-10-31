import type { Meta, StoryObj } from "@storybook/react";
import SearchBarDetail from "components/Organisms/SearchBarDetail/SearchBarDetail";

const meta: Meta = {
  title: "Organisms/SearchBarDetail",
  component: SearchBarDetail,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const search: Story = {
  args: {},
};
