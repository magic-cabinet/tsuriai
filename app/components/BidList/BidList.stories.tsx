import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { BidList } from "./BidList"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand100,
    flex: 1,
  },
})

const meta = {
  title: "Auction/BidList",
  component: BidList,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    bids: [],
  },
} satisfies Meta<typeof BidList>

export default meta

type Story = StoryObj<typeof meta>

// Sample bid data
const sampleBids = [
  {
    id: "1",
    amount: 1500,
    bidderName: "Kenji Yamamoto",
    status: "winning" as const,
    timestamp: new Date(),
    isCurrentUser: true,
  },
  {
    id: "2",
    amount: 1400,
    bidderName: "Haruki Tanaka",
    status: "outbid" as const,
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "3",
    amount: 1300,
    bidderName: "Yuki Sato",
    status: "outbid" as const,
    timestamp: new Date(Date.now() - 600000),
  },
  {
    id: "4",
    amount: 1200,
    bidderName: "Takeshi Mori",
    status: "outbid" as const,
    timestamp: new Date(Date.now() - 900000),
  },
  {
    id: "5",
    amount: 1100,
    bidderName: "Sakura Ito",
    status: "outbid" as const,
    timestamp: new Date(Date.now() - 86400000), // Yesterday
  },
]

export const Default: Story = {
  args: {
    bids: sampleBids,
    onBidPress: (id) => console.log("Bid pressed:", id),
  },
}

export const Loading: Story = {
  args: {
    bids: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    bids: [],
    emptyTitle: "No bids yet",
    emptyDescription: "Be the first to place a bid on this premium tuna!",
  },
}

export const GroupedByDate: Story = {
  name: "Grouped by Date",
  args: {
    bids: sampleBids,
    groupByDate: true,
    onBidPress: (id) => console.log("Bid pressed:", id),
  },
}

export const LoadingMore: Story = {
  name: "Loading More (Pagination)",
  args: {
    bids: sampleBids.slice(0, 3),
    loadingMore: true,
  },
}

export const ManyBids: Story = {
  name: "Many Bids",
  args: {
    bids: Array.from({ length: 20 }, (_, i) => ({
      id: `bid-${i}`,
      amount: 2000 - i * 50,
      bidderName: `Bidder ${i + 1}`,
      status: i === 0 ? ("winning" as const) : ("outbid" as const),
      timestamp: new Date(Date.now() - i * 300000),
      isCurrentUser: i === 0,
    })),
    onBidPress: (id) => console.log("Bid pressed:", id),
  },
}
