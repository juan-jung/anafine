import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta = {
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
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const square: Story = {
  args: { shape: "square", src: "/favicon.png", alt: "카테고리 아이콘 이미지" },
};
