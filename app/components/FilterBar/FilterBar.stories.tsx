import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { View } from "react-native"
import { FilterBar, FilterOption } from "./FilterBar"
import { Text } from "../Text"

const meta: Meta<typeof FilterBar> = {
  title: "Input/FilterBar",
  component: FilterBar,
  argTypes: {
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

type Story = StoryObj<typeof FilterBar>

const defaultFilters: FilterOption[] = [
  { key: "all", label: "All" },
  { key: "fish", label: "Fish" },
  { key: "shellfish", label: "Shellfish" },
  { key: "premium", label: "Premium" },
]

const InteractiveFilterBar = (args: any) => {
  const [selected, setSelected] = useState<string[]>(["all"])
  return (
    <View>
      <FilterBar {...args} selectedKeys={selected} onChange={setSelected} />
      <Text text={`Selected: ${selected.join(", ")}`} style={{ marginTop: 16 }} />
    </View>
  )
}

export const SingleSelect: Story = {
  render: (args) => <InteractiveFilterBar {...args} />,
  args: {
    filters: defaultFilters,
  },
}

export const MultiSelect: Story = {
  render: (args) => <InteractiveFilterBar {...args} />,
  args: {
    filters: defaultFilters,
    multiSelect: true,
  },
}

export const WithCounts: Story = {
  render: (args) => <InteractiveFilterBar {...args} />,
  args: {
    filters: [
      { key: "all", label: "All", count: 156 },
      { key: "tuna", label: "Tuna", count: 42 },
      { key: "salmon", label: "Salmon", count: 38 },
      { key: "mackerel", label: "Mackerel", count: 28 },
      { key: "squid", label: "Squid", count: 24 },
      { key: "shrimp", label: "Shrimp", count: 24 },
    ],
  },
}

export const WithIcons: Story = {
  render: (args) => <InteractiveFilterBar {...args} />,
  args: {
    filters: [
      { key: "all", label: "All", icon: "menu" },
      { key: "fish", label: "Fish", icon: "components" },
      { key: "nearby", label: "Nearby", icon: "pin" },
    ],
  },
}

export const Sizes: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["all"])
    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text text="Small" size="xs" style={{ marginBottom: 8 }} />
          <FilterBar
            filters={defaultFilters}
            selectedKeys={selected}
            onChange={setSelected}
            size="sm"
          />
        </View>
        <View>
          <Text text="Medium" size="xs" style={{ marginBottom: 8 }} />
          <FilterBar
            filters={defaultFilters}
            selectedKeys={selected}
            onChange={setSelected}
            size="md"
          />
        </View>
        <View>
          <Text text="Large" size="xs" style={{ marginBottom: 8 }} />
          <FilterBar
            filters={defaultFilters}
            selectedKeys={selected}
            onChange={setSelected}
            size="lg"
          />
        </View>
      </View>
    )
  },
}

export const NonScrollable: Story = {
  render: (args) => <InteractiveFilterBar {...args} />,
  args: {
    filters: defaultFilters,
    scrollable: false,
  },
}
