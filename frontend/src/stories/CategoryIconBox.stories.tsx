import type { Meta, StoryObj } from "@storybook/react";
import CategoryIconBox from "components/Organisms/CategoryIconBox";

const meta: Meta = {
  title: "Organisms/CategoryIconBox",
  component: CategoryIconBox,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const categorybox: Story = {
  args: {
    category: [
      "약물",
      "의료용품",
      "진단검사",
      "도수치료",
      "MRI",
      "약물",
      "의료용품",
      "진단검사",
      "도수치료",
      "MRI",
      "약물",
      "의료용품",
      "진단검사",
      "도수치료",
      "MRI",
      "약물",
      "의료용품",
      "진단검사",
      "도수치료",
      "MRI",
    ],
    categoryWidth: 300,
  },
};
