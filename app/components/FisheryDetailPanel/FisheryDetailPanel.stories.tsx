import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { FisheryDetailPanel } from "./FisheryDetailPanel"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand200,
    flex: 1,
  },
})

const meta = {
  title: "Fish/FisheryDetailPanel",
  component: FisheryDetailPanel,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    name: "Yamamoto Fishing",
    type: "boat",
    status: "active",
    location: "Tsukiji, Tokyo",
  },
} satisfies Meta<typeof FisheryDetailPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "Yamamoto Fishing",
    type: "boat",
    status: "active",
    owner: "Kenji Yamamoto",
    location: "Tsukiji, Tokyo",
    description: "Family-owned fishing operation specializing in premium tuna and seasonal catches. Three generations of expertise in sustainable fishing practices.",
    rating: 4.8,
    reviewCount: 156,
    specialties: ["Bluefin Tuna", "Yellowtail", "Bonito", "Mackerel"],
    yearsActive: 45,
    sustainabilityCertified: true,
    totalTransactions: 1250,
    successRate: 98,
    phone: "+81 3-1234-5678",
    email: "contact@yamamotofishing.jp",
    onContact: () => console.log("Contact pressed"),
    onFollow: () => console.log("Follow pressed"),
    isFollowing: false,
  },
}

export const Following: Story = {
  args: {
    ...Default.args,
    isFollowing: true,
  },
}

export const FishFarm: Story = {
  name: "Fish Farm",
  args: {
    name: "Pacific Aquaculture",
    type: "farm",
    status: "active",
    location: "Kyushu, Japan",
    description: "Modern aquaculture facility producing high-quality farmed salmon and sea bream using sustainable practices.",
    rating: 4.5,
    reviewCount: 89,
    specialties: ["Salmon", "Sea Bream", "Rainbow Trout"],
    yearsActive: 12,
    sustainabilityCertified: true,
    totalTransactions: 450,
    successRate: 96,
    onContact: () => console.log("Contact pressed"),
    onFollow: () => console.log("Follow pressed"),
  },
}

export const Cooperative: Story = {
  args: {
    name: "Hokkaido Fishermen's Co-op",
    type: "cooperative",
    status: "seasonal",
    location: "Hokkaido, Japan",
    description: "Collective of 50+ independent fishermen working together to bring the freshest catches from the northern seas.",
    rating: 4.6,
    reviewCount: 234,
    specialties: ["Salmon", "Crab", "Sea Urchin", "Scallops"],
    yearsActive: 30,
    totalTransactions: 3200,
    successRate: 94,
    onContact: () => console.log("Contact pressed"),
    onFollow: () => console.log("Follow pressed"),
  },
}

export const Minimal: Story = {
  args: {
    name: "Local Fishery",
    type: "boat",
    status: "active",
    location: "Osaka Bay",
  },
}
