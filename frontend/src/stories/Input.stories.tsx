import type { Meta, StoryObj } from "@storybook/react";
import Input from "components/atoms/Input";

const meta: Meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: { type: "text" },
      description: "id",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    name: {
      control: { type: "text" },
      description: "name",
      table: {
        type: {
          summary: "string",
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

export const search: Story = {
  args: {
    placeholder: "입력 창입니다.",
    className: "input--search",
  },
};
