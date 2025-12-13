import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { BidListItem } from "./BidListItem"
import { Text } from "../Text"

const meta: Meta<typeof BidListItem> = {
  title: "Domain/Auction/BidListItem",
  component: BidListItem,
  decorators: [
    (Story) => (
      <View style={{ padding: 0 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof BidListItem>

export const Default: Story = {
  args: {
    amount: 1250,
    bidderName: "Takeshi M.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
}

export const WinningBid: Story = {
  args: {
    amount: 1500,
    bidderName: "Sarah K.",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    isWinningBid: true,
    rank: 1,
  },
}

export const OwnBid: Story = {
  args: {
    amount: 1350,
    bidderName: "You",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    isOwnBid: true,
    rank: 2,
  },
}

export const WithStatus: Story = {
  args: {
    amount: 1100,
    bidderName: "Mike T.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: "outbid",
    rank: 3,
  },
}

export const BidHistory: Story = {
  render: () => (
    <View>
      <Text preset="subheading" text="Bid History" style={{ padding: 16 }} />
      <BidListItem
        amount={1500}
        bidderName="Sarah K."
        timestamp={new Date(Date.now() - 2 * 60 * 1000)}
        isWinningBid={true}
        rank={1}
      />
      <BidListItem
        amount={1350}
        bidderName="You"
        timestamp={new Date(Date.now() - 10 * 60 * 1000)}
        isOwnBid={true}
        rank={2}
      />
      <BidListItem
        amount={1250}
        bidderName="Takeshi M."
        timestamp={new Date(Date.now() - 25 * 60 * 1000)}
        rank={3}
      />
      <BidListItem
        amount={1100}
        bidderName="Mike T."
        timestamp={new Date(Date.now() - 45 * 60 * 1000)}
        rank={4}
      />
      <BidListItem
        amount={1000}
        bidderName="Linda S."
        timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000)}
        rank={5}
      />
    </View>
  ),
}

export const RecentBids: Story = {
  render: () => (
    <View>
      <Text preset="subheading" text="Recent Activity" style={{ padding: 16 }} />
      <BidListItem
        amount={2500}
        bidderName="John D."
        timestamp={new Date()}
        isWinningBid={true}
      />
      <BidListItem
        amount={2400}
        bidderName="You"
        timestamp={new Date(Date.now() - 30 * 1000)}
        isOwnBid={true}
        status="outbid"
      />
      <BidListItem
        amount={2200}
        bidderName="Anonymous"
        timestamp={new Date(Date.now() - 2 * 60 * 1000)}
      />
    </View>
  ),
}

export const JapaneseYen: Story = {
  args: {
    amount: 150000,
    bidderName: "Yamamoto K.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    currency: "JPY",
    rank: 1,
    isWinningBid: true,
  },
}
