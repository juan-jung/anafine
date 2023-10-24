import type { Meta, StoryObj } from "@storybook/react";
import Input from "components/atoms/Input/Input";

const meta: Meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    hasBorder: {
      control: { type: "boolean" },
      defaultValue: true,
      description: "보더",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const text: Story = {
  args: {
    placeholder: "입력 창입니다.",
  },
};
