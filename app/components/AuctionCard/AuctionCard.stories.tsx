import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { AuctionCard } from "./AuctionCard"

const meta: Meta<typeof AuctionCard> = {
  title: "Auction/AuctionCard",
  component: AuctionCard,
  argTypes: {
    auctionType: {
      control: "select",
      options: ["standard", "dutch", "sealed", "reserve"],
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

type Story = StoryObj<typeof AuctionCard>

export const Default: Story = {
  args: {
    title: "Bluefin Tuna - Grade A",
    description: "45.5kg, Fresh from Tsukiji Market",
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    currentBid: 1250,
    bidCount: 12,
    watcherCount: 45,
    sellerName: "Yamamoto Fishing",
    sellerRating: 4.8,
  },
}

export const WithUserBid: Story = {
  args: {
    title: "Premium Otoro",
    description: "2.5kg, Grade Premium",
    endDate: new Date(Date.now() + 30 * 60 * 1000),
    currentBid: 2500,
    bidCount: 8,
    watcherCount: 89,
    hasBid: true,
    sellerName: "Oma Fishing Co.",
    sellerRating: 4.9,
  },
}

export const Watching: Story = {
  args: {
    title: "Sea Bream Lot",
    description: "10kg lot, mixed sizes",
    endDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
    currentBid: 450,
    bidCount: 5,
    watcherCount: 23,
    isWatching: true,
    sellerName: "Nagasaki Fishery",
    sellerRating: 4.5,
    onToggleWatch: () => alert("Toggle watch!"),
  },
}

export const ReserveAuction: Story = {
  args: {
    title: "Yellowfin Tuna",
    description: "28kg, Grade B",
    auctionType: "reserve",
    endDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
    currentBid: 800,
    reservePrice: 1200,
    reserveMet: false,
    bidCount: 3,
    watcherCount: 15,
    sellerName: "Pacific Fleet",
  },
}

export const DutchAuction: Story = {
  args: {
    title: "Salmon Lot (50kg)",
    description: "Fresh Atlantic Salmon",
    auctionType: "dutch",
    endDate: new Date(Date.now() + 1 * 60 * 60 * 1000),
    currentBid: 1500,
    startingPrice: 2000,
    bidCount: 0,
    watcherCount: 78,
  },
}

export const EndingSoon: Story = {
  args: {
    title: "Squid Bundle",
    description: "5kg fresh squid",
    endDate: new Date(Date.now() + 3 * 60 * 1000),
    currentBid: 125,
    bidCount: 18,
    watcherCount: 56,
    hasBid: true,
  },
}

export const WithPress: Story = {
  args: {
    title: "Mackerel - Fresh",
    description: "3kg, caught this morning",
    endDate: new Date(Date.now() + 45 * 60 * 1000),
    currentBid: 85,
    bidCount: 4,
    onPress: () => alert("Auction selected!"),
    onToggleWatch: () => alert("Toggle watch!"),
  },
}

export const Compact: Story = {
  args: {
    title: "Bluefin Tuna - Grade A",
    description: "45.5kg, Fresh from Tsukiji Market",
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    currentBid: 1250,
    bidCount: 12,
    watcherCount: 45,
    sellerName: "Yamamoto Fishing",
    sellerRating: 4.8,
    compact: true,
  },
}

export const CompactGrid: Story = {
  decorators: [
    (Story) => (
      <View style={{ padding: 16, flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Story />
        </View>
        <View style={{ flex: 1 }}>
          <Story />
        </View>
      </View>
    ),
  ],
  args: {
    title: "Premium Otoro",
    endDate: new Date(Date.now() + 30 * 60 * 1000),
    currentBid: 2500,
    bidCount: 8,
    compact: true,
  },
}
