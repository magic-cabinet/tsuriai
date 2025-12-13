import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { Divider } from "./Divider"
import { Text } from "../Text"

const meta: Meta<typeof Divider> = {
  title: "Atoms/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["solid", "dashed"],
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
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

type Story = StoryObj<typeof Divider>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    text: "OR",
  },
}

export const Dashed: Story = {
  args: {
    variant: "dashed",
  },
}

export const ThickLine: Story = {
  args: {
    thickness: 2,
  },
}

export const Vertical: Story = {
  render: () => (
    <View style={{ flexDirection: "row", height: 100, alignItems: "center" }}>
      <Text text="Left content" />
      <Divider orientation="vertical" spacing="md" />
      <Text text="Right content" />
    </View>
  ),
}

export const SpacingVariants: Story = {
  render: () => (
    <View>
      <Text text="No spacing" />
      <Divider spacing="none" />
      <Text text="Small spacing" />
      <Divider spacing="sm" />
      <Text text="Medium spacing" />
      <Divider spacing="md" />
      <Text text="Large spacing" />
      <Divider spacing="lg" />
      <Text text="After large spacing" />
    </View>
  ),
}
