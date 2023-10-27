import type { Meta, StoryObj } from "@storybook/react";
import Header from "components/Organisms/Header/Header";

const meta: Meta = {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {},
};
