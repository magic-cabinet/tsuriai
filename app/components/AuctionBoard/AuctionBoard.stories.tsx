import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { AuctionBoard } from "./AuctionBoard"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand100,
    flex: 1,
  },
})

const meta = {
  title: "Domain/AuctionBoard",
  component: AuctionBoard,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    auctions: [],
  },
} satisfies Meta<typeof AuctionBoard>

export default meta

type Story = StoryObj<typeof meta>

const sampleAuctions = [
  {
    title: "Premium Bluefin Tuna",
    description: "45.5kg, Grade A",
    endDate: new Date(Date.now() + 3600000),
    currentBid: 2500,
    bidCount: 15,
    watcherCount: 48,
    sellerName: "Yamamoto Fishing",
    sellerRating: 4.9,
    isWatching: true,
    hasBid: true,
  },
  {
    title: "Wild Salmon",
    description: "12kg, Fresh",
    endDate: new Date(Date.now() + 7200000),
    currentBid: 450,
    bidCount: 8,
    sellerName: "Pacific Catch",
    sellerRating: 4.7,
  },
  {
    title: "Swordfish Steak",
    description: "8.2kg",
    endDate: new Date(Date.now() + 1800000),
    currentBid: 320,
    bidCount: 12,
    sellerName: "Deep Sea",
    sellerRating: 4.5,
  },
]

const sampleBids = [
  {
    id: "1",
    amount: 2500,
    bidderName: "You",
    status: "winning" as const,
    timestamp: new Date(),
    isCurrentUser: true,
  },
  {
    id: "2",
    amount: 450,
    bidderName: "You",
    status: "outbid" as const,
    timestamp: new Date(Date.now() - 300000),
    isCurrentUser: true,
  },
]

export const Default: Story = {
  args: {
    auctions: sampleAuctions,
    myBids: sampleBids,
    watchedAuctions: sampleAuctions.filter((_, i) => i === 0),
    wonAuctions: [],
    activeBidsCount: 2,
    watchingCount: 1,
    wonCount: 0,
    onAuctionPress: (id) => console.log("Auction pressed:", id),
    onBidPress: (id) => console.log("Bid pressed:", id),
    onToggleWatch: (id) => console.log("Toggle watch:", id),
    onTabChange: (tab) => console.log("Tab changed:", tab),
  },
}

export const WithWonAuctions: Story = {
  name: "With Won Auctions",
  args: {
    auctions: sampleAuctions,
    myBids: sampleBids,
    watchedAuctions: sampleAuctions.slice(0, 2),
    wonAuctions: [sampleAuctions[0]],
    activeBidsCount: 2,
    watchingCount: 2,
    wonCount: 1,
  },
}

export const Loading: Story = {
  args: {
    auctions: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    auctions: [],
    myBids: [],
    watchedAuctions: [],
    wonAuctions: [],
  },
}
