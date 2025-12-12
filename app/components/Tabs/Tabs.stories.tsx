import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { View } from "react-native"
import { Tabs, TabItem } from "./Tabs"
import { Text } from "../Text"

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "pills", "enclosed"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
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

type Story = StoryObj<typeof Tabs>

const defaultTabs: TabItem[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
]

const InteractiveTabs = (args: any) => {
  const [activeKey, setActiveKey] = useState("all")
  return (
    <View>
      <Tabs {...args} activeKey={activeKey} onChange={setActiveKey} />
      <Text text={`Active tab: ${activeKey}`} style={{ marginTop: 16 }} />
    </View>
  )
}

export const Underline: Story = {
  render: (args) => <InteractiveTabs {...args} />,
  args: {
    tabs: defaultTabs,
    variant: "underline",
  },
}

export const Pills: Story = {
  render: (args) => <InteractiveTabs {...args} />,
  args: {
    tabs: defaultTabs,
    variant: "pills",
  },
}

export const Enclosed: Story = {
  render: (args) => <InteractiveTabs {...args} />,
  args: {
    tabs: defaultTabs,
    variant: "enclosed",
    fullWidth: true,
  },
}

export const WithBadges: Story = {
  render: (args) => <InteractiveTabs {...args} />,
  args: {
    tabs: [
      { key: "inbox", label: "Inbox", badge: 5 },
      { key: "sent", label: "Sent" },
      { key: "drafts", label: "Drafts", badge: 2 },
    ],
    variant: "underline",
  },
}

export const WithDisabled: Story = {
  render: (args) => <InteractiveTabs {...args} />,
  args: {
    tabs: [
      { key: "all", label: "All" },
      { key: "active", label: "Active" },
      { key: "archived", label: "Archived", disabled: true },
    ],
    variant: "underline",
  },
}

export const Sizes: Story = {
  render: () => {
    const [active, setActive] = useState("all")
    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text text="Small" size="xs" style={{ marginBottom: 8 }} />
          <Tabs tabs={defaultTabs} activeKey={active} onChange={setActive} size="sm" />
        </View>
        <View>
          <Text text="Medium" size="xs" style={{ marginBottom: 8 }} />
          <Tabs tabs={defaultTabs} activeKey={active} onChange={setActive} size="md" />
        </View>
        <View>
          <Text text="Large" size="xs" style={{ marginBottom: 8 }} />
          <Tabs tabs={defaultTabs} activeKey={active} onChange={setActive} size="lg" />
        </View>
      </View>
    )
  },
}

export const FullWidth: Story = {
  render: (args) => <InteractiveTabs {...args} />,
  args: {
    tabs: defaultTabs,
    variant: "underline",
    fullWidth: true,
  },
}
