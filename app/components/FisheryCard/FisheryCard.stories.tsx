import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { FisheryCard } from "./FisheryCard"

const meta: Meta<typeof FisheryCard> = {
  title: "Fish/FisheryCard",
  component: FisheryCard,
  argTypes: {
    type: {
      control: "select",
      options: ["boat", "farm", "cooperative", "market"],
    },
    status: {
      control: "select",
      options: ["active", "inactive", "seasonal"],
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

type Story = StoryObj<typeof FisheryCard>

export const Default: Story = {
  args: {
    name: "Yamamoto Fishing",
    type: "boat",
    status: "active",
    owner: "Kenji Yamamoto",
    location: "Tsukiji, Tokyo",
    rating: 4.8,
    reviewCount: 156,
    specialties: ["Tuna", "Bonito", "Mackerel"],
    yearsActive: 25,
    sustainabilityCertified: true,
  },
}

export const FishFarm: Story = {
  args: {
    name: "Seto Inland Aquaculture",
    type: "farm",
    status: "active",
    location: "Ehime Prefecture",
    rating: 4.5,
    reviewCount: 89,
    specialties: ["Sea Bream", "Yellowtail", "Oysters"],
    yearsActive: 15,
    sustainabilityCertified: true,
  },
}

export const Cooperative: Story = {
  args: {
    name: "Hokkaido Fishermen's Union",
    type: "cooperative",
    status: "active",
    location: "Hokkaido",
    rating: 4.9,
    reviewCount: 312,
    specialties: ["Salmon", "Sea Urchin", "Crab", "Scallops", "Squid"],
    yearsActive: 50,
  },
}

export const Market: Story = {
  args: {
    name: "Toyosu Fish Market",
    type: "market",
    status: "active",
    location: "Tokyo, Japan",
    rating: 4.7,
    reviewCount: 1024,
    specialties: ["Tuna", "Various Fresh Seafood"],
  },
}

export const SeasonalStatus: Story = {
  args: {
    name: "Pacific Bluefin Co.",
    type: "boat",
    status: "seasonal",
    owner: "Takeshi Mori",
    location: "Oma, Aomori",
    rating: 4.6,
    reviewCount: 78,
    specialties: ["Bluefin Tuna"],
    yearsActive: 12,
  },
}

export const Inactive: Story = {
  args: {
    name: "Old Harbor Fishery",
    type: "boat",
    status: "inactive",
    location: "Nagasaki",
    yearsActive: 40,
  },
}

export const MinimalInfo: Story = {
  args: {
    name: "Local Fishing Boat",
    type: "boat",
    location: "Osaka Bay",
  },
}

export const WithPress: Story = {
  args: {
    name: "Yamamoto Fishing",
    type: "boat",
    location: "Tsukiji, Tokyo",
    rating: 4.8,
    reviewCount: 156,
    onPress: () => alert("Fishery selected!"),
  },
}
