import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { View } from "react-native"
import { SearchBar } from "./SearchBar"
import { Text } from "../Text"

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/SearchBar",
  component: SearchBar,
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

type Story = StoryObj<typeof SearchBar>

const InteractiveSearchBar = (args: any) => {
  const [value, setValue] = useState("")
  return (
    <View>
      <SearchBar {...args} value={value} onChangeText={setValue} />
      <Text text={`Search value: "${value}"`} style={{ marginTop: 16 }} />
    </View>
  )
}

export const Default: Story = {
  render: (args) => <InteractiveSearchBar {...args} />,
  args: {
    placeholder: "Search...",
  },
}

export const WithValue: Story = {
  render: (args) => <InteractiveSearchBar {...args} />,
  args: {
    placeholder: "Search fish...",
  },
}

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState("Searching...")
    return <SearchBar value={value} onChangeText={setValue} loading />
  },
}

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <View style={{ gap: 16 }}>
        <View>
          <Text text="Small" size="xs" style={{ marginBottom: 8 }} />
          <SearchBar value={value} onChangeText={setValue} size="sm" />
        </View>
        <View>
          <Text text="Medium" size="xs" style={{ marginBottom: 8 }} />
          <SearchBar value={value} onChangeText={setValue} size="md" />
        </View>
        <View>
          <Text text="Large" size="xs" style={{ marginBottom: 8 }} />
          <SearchBar value={value} onChangeText={setValue} size="lg" />
        </View>
      </View>
    )
  },
}

export const CustomPlaceholder: Story = {
  render: (args) => <InteractiveSearchBar {...args} />,
  args: {
    placeholder: "Search for tuna, salmon, mackerel...",
  },
}

export const WithSubmit: Story = {
  render: () => {
    const [value, setValue] = useState("")
    const [submitted, setSubmitted] = useState("")
    return (
      <View>
        <SearchBar
          value={value}
          onChangeText={setValue}
          onSubmit={(text) => setSubmitted(text)}
          placeholder="Press enter to search..."
        />
        {submitted && (
          <Text text={`Searched for: "${submitted}"`} style={{ marginTop: 16 }} />
        )}
      </View>
    )
  },
}
