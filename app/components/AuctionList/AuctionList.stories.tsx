import { useState } from "react"
import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { AuctionList } from "./AuctionList"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand100,
    flex: 1,
  },
})

const meta = {
  title: "Domain/AuctionList",
  component: AuctionList,
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
} satisfies Meta<typeof AuctionList>

export default meta

type Story = StoryObj<typeof meta>

// Sample auction data
const sampleAuctions = [
  {
    title: "Premium Bluefin Tuna",
    description: "45.5kg, Grade A, Fresh from Tsukiji",
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
    title: "Wild Salmon Fillet",
    description: "12kg, Premium quality",
    endDate: new Date(Date.now() + 7200000),
    currentBid: 450,
    bidCount: 8,
    watcherCount: 23,
    sellerName: "Pacific Catch Co.",
    sellerRating: 4.7,
    isWatching: false,
    hasBid: false,
  },
  {
    title: "Swordfish Steak",
    description: "8.2kg, Fresh catch",
    endDate: new Date(Date.now() + 1800000), // 30 min
    currentBid: 320,
    bidCount: 12,
    watcherCount: 31,
    sellerName: "Deep Sea Fishery",
    sellerRating: 4.5,
    isWatching: true,
    hasBid: false,
  },
  {
    title: "Japanese Yellowtail",
    description: "15kg, Hamachi grade",
    endDate: new Date(Date.now() + 14400000),
    currentBid: 890,
    bidCount: 6,
    watcherCount: 19,
    sellerName: "Tanaka Fishery",
    sellerRating: 4.8,
    isWatching: false,
    hasBid: false,
  },
]

export const Default: Story = {
  args: {
    auctions: sampleAuctions,
    onAuctionPress: (id) => console.log("Auction pressed:", id),
    onToggleWatch: (id) => console.log("Toggle watch:", id),
  },
}

export const WithFilters: Story = {
  name: "With Filters",
  args: {
    auctions: sampleAuctions,
    showFilters: true,
    activeFilter: "active",
    onAuctionPress: (id) => console.log("Auction pressed:", id),
    onFilterChange: (filter) => console.log("Filter changed:", filter),
  },
}

export const GridLayout: Story = {
  name: "Grid Layout (2 Columns)",
  args: {
    auctions: sampleAuctions,
    numColumns: 2,
    onAuctionPress: (id) => console.log("Auction pressed:", id),
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
    emptyTitle: "No auctions available",
    emptyDescription: "New auctions are posted daily. Check back soon!",
  },
}

export const LoadingMore: Story = {
  name: "Loading More (Pagination)",
  args: {
    auctions: sampleAuctions.slice(0, 2),
    loadingMore: true,
  },
}

export const ManyAuctions: Story = {
  name: "Many Auctions",
  args: {
    auctions: Array.from({ length: 10 }, (_, i) => ({
      title: `Auction Item ${i + 1}`,
      description: `Premium quality seafood item #${i + 1}`,
      endDate: new Date(Date.now() + (i + 1) * 3600000),
      currentBid: 500 + i * 100,
      bidCount: 5 + i,
      watcherCount: 10 + i * 2,
      sellerName: `Seller ${i + 1}`,
      sellerRating: 4.5 + (i % 5) * 0.1,
      isWatching: i % 3 === 0,
      hasBid: i % 4 === 0,
    })),
    onAuctionPress: (id) => console.log("Auction pressed:", id),
  },
}
