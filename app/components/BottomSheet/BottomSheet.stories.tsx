import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { View } from "react-native"
import { BottomSheet } from "./BottomSheet"
import { Button } from "../Button"
import { Text } from "../Text"
import { ListItem } from "../ListItem"

const meta: Meta<typeof BottomSheet> = {
  title: "Molecules/BottomSheet",
  component: BottomSheet,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof BottomSheet>

const InteractiveBottomSheet = (args: any) => {
  const [visible, setVisible] = useState(false)
  return (
    <View>
      <Button text="Open Bottom Sheet" onPress={() => setVisible(true)} />
      <BottomSheet {...args} visible={visible} onClose={() => setVisible(false)}>
        <Text text="This is the bottom sheet content." />
        <Text
          text="You can drag it up and down, or tap the backdrop to close."
          style={{ marginTop: 8 }}
        />
      </BottomSheet>
    </View>
  )
}

export const Default: Story = {
  render: (args) => <InteractiveBottomSheet {...args} />,
  args: {
    heading: "Bottom Sheet",
  },
}

export const WithSnapPoints: Story = {
  render: (args) => <InteractiveBottomSheet {...args} />,
  args: {
    heading: "Multiple Snap Points",
    snapPoints: ["25%", "50%", "80%"],
  },
}

export const WithList: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)
    return (
      <View>
        <Button text="Open Options" onPress={() => setVisible(true)} />
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          heading="Sort By"
          snapPoints={["40%"]}
        >
          <ListItem text="Newest First" leftIcon="caretRight" />
          <ListItem text="Price: Low to High" leftIcon="caretRight" />
          <ListItem text="Price: High to Low" leftIcon="caretRight" />
          <ListItem text="Distance" leftIcon="caretRight" />
        </BottomSheet>
      </View>
    )
  },
}

export const NoDrag: Story = {
  render: (args) => <InteractiveBottomSheet {...args} />,
  args: {
    heading: "Fixed Bottom Sheet",
    enableDrag: false,
    snapPoints: ["50%"],
  },
}

export const NoBackdropDismiss: Story = {
  render: (args) => <InteractiveBottomSheet {...args} />,
  args: {
    heading: "Tap backdrop disabled",
    backdropDismiss: false,
    snapPoints: ["50%"],
  },
}

export const NoHandleOrHeader: Story = {
  render: () => {
    const [visible, setVisible] = useState(false)
    return (
      <View>
        <Button text="Open Minimal Sheet" onPress={() => setVisible(true)} />
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={false}
          showCloseButton={false}
          snapPoints={["30%"]}
        >
          <Text text="A minimal bottom sheet without handle or close button." />
          <Button
            text="Close"
            onPress={() => setVisible(false)}
            style={{ marginTop: 16 }}
          />
        </BottomSheet>
      </View>
    )
  },
}
