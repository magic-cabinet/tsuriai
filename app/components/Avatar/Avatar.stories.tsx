import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { Avatar } from "./Avatar"

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: "select",
      options: ["circle", "rounded"],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    source: { uri: "https://i.pravatar.cc/150?img=3" },
    size: "lg",
  },
}

export const WithName: Story = {
  args: {
    name: "John Doe",
    size: "lg",
  },
}

export const WithSingleName: Story = {
  args: {
    name: "Alice",
    size: "lg",
  },
}

export const FallbackIcon: Story = {
  args: {
    size: "lg",
  },
}

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Avatar name="XS" size="xs" />
      <Avatar name="SM" size="sm" />
      <Avatar name="MD" size="md" />
      <Avatar name="LG" size="lg" />
      <Avatar name="XL" size="xl" />
    </View>
  ),
}

export const Shapes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Avatar name="Circle" size="lg" shape="circle" />
      <Avatar name="Rounded" size="lg" shape="rounded" />
    </View>
  ),
}
