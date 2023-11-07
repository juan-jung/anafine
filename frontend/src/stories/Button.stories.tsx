import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "components/atoms/Button";

const meta: Meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    ver: "large",
    label: "Button",
  },
};

export const Medium: Story = {
  args: {
    ver: "medium",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    ver: "small",
    label: "Button",
  },
};

export const Search: Story = {
  args: {
    ver: "search",
    label: "Button",
  },
};
