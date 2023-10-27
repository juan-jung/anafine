import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "components/atoms/TextArea/TextArea";

const meta: Meta = {
  title: "Atoms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "텍스트 내용",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: { type: "text" },
      description: "css 클래스 지정을 위한 이름",
      table: {
        type: { summary: "string" },
      },
    },
    id: {
      control: { type: "text" },
      description: "고유 식별자",
      table: {
        type: { summary: "string" },
      },
    },
    color: {
      control: { type: "text" },
      description: "색상",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const textarea: Story = {
  args: {
    children: "test text",
    selected: false,
  },
};
