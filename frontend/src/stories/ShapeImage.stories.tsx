import type { Meta, StoryObj } from "@storybook/react";
import ShapeImage from "components/atoms/ShapeImage";

const meta: Meta = {
  title: "Atoms/ShapeImage",
  component: ShapeImage,
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "number" },
      defaultValue: 320,
      description: "너비",
      table: {
        type: { summary: "number" },
      },
    },
    height: {
      control: { type: "number" },
      defaultValue: 320,
      description: "높이",
      table: {
        type: { summary: "number" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const square: Story = {
  args: {
    shape: "square",
    src: "/favicon.png",
    alt: "카테고리 아이콘",
    width: 300,
    height: 300,
  },
};

export const circle: Story = {
  args: {
    shape: "circle",
    src: "/favicon.png",
    alt: "카테고리 아이콘",
    width: 300,
    height: 300,
  },
};
