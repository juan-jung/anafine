import type { Meta, StoryObj } from "@storybook/react";
import Input from "components/atoms/Input/Input";

const meta: Meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "입력 창",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const square: Story = {
  args: {
    placeholder: "입력 창입니다.",
  },
};
