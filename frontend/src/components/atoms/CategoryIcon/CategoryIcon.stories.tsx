import type { Meta, StoryObj } from "@storybook/react";
import CategoryIcon from "components/atoms/CategoryIcon/CategoryIcon";

const meta = {
  title: "Atoms/CategoryIcon",
  component: CategoryIcon,
  tags: ["autodocs"],
  argTypes: {
    shape: {
      options: ["square", "circle"],
      control: { type: "radio" },
      defaultValue: "square",
      description: "카테고리 아이콘의 형태",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "square" },
      },
    },
    src: {
      control: { type: "text" },
      description: "카테고리 아이콘 URL",
      table: {
        type: { summary: "string" },
      },
    },
    alt: {
      control: { type: "text" },
      description: "이미지 내용 설명",
      table: {
        type: { summary: "string" },
      },
    },
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
      description: "너비",
      table: {
        type: { summary: "number" },
      },
    },
  },
} satisfies Meta<typeof CategoryIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const square: Story = {
  args: { shape: "square", src: "/favicon.png", alt: "카테고리 아이콘 이미지" },
};
