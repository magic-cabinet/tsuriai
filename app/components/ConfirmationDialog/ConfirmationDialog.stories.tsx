import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { View } from "react-native"
import { ConfirmationDialog } from "./ConfirmationDialog"
import { Button } from "../Button"

const meta: Meta<typeof ConfirmationDialog> = {
  title: "Overlay/ConfirmationDialog",
  component: ConfirmationDialog,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "danger", "warning", "success"],
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

type Story = StoryObj<typeof ConfirmationDialog>

const InteractiveDialog = (args: any) => {
  const [visible, setVisible] = useState(false)
  return (
    <View>
      <Button text="Open Dialog" onPress={() => setVisible(true)} />
      <ConfirmationDialog
        {...args}
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={() => {
          alert("Confirmed!")
          setVisible(false)
        }}
      />
    </View>
  )
}

export const Default: Story = {
  render: (args) => <InteractiveDialog {...args} />,
  args: {
    title: "Confirm Action",
    message: "Are you sure you want to proceed with this action?",
  },
}

export const WithIcon: Story = {
  render: (args) => <InteractiveDialog {...args} />,
  args: {
    title: "Confirm Action",
    message: "Are you sure you want to proceed with this action?",
    icon: "check",
  },
}

export const Danger: Story = {
  render: (args) => <InteractiveDialog {...args} />,
  args: {
    variant: "danger",
    icon: "x",
    title: "Delete Item",
    message: "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText: "Delete",
  },
}

export const Warning: Story = {
  render: (args) => <InteractiveDialog {...args} />,
  args: {
    variant: "warning",
    icon: "bell",
    title: "Warning",
    message: "This action may have consequences. Do you wish to continue?",
    confirmText: "Continue",
  },
}

export const Success: Story = {
  render: (args) => <InteractiveDialog {...args} />,
  args: {
    variant: "success",
    icon: "check",
    title: "Complete Purchase",
    message: "You are about to complete your purchase. Proceed?",
    confirmText: "Purchase",
  },
}

export const CustomButtons: Story = {
  render: (args) => <InteractiveDialog {...args} />,
  args: {
    title: "Save Changes",
    message: "Do you want to save your changes before leaving?",
    confirmText: "Save",
    cancelText: "Discard",
  },
}
