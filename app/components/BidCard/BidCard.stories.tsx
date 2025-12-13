import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { BidCard } from "./BidCard"

const meta: Meta<typeof BidCard> = {
  title: "Domain/Auction/BidCard",
  component: BidCard,
  argTypes: {
    status: {
      control: "select",
      options: ["pending", "winning", "outbid", "won", "lost", "expired"],
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

type Story = StoryObj<typeof BidCard>

export const Winning: Story = {
  args: {
    amount: 1250,
    status: "winning",
    itemName: "Bluefin Tuna",
    itemDescription: "Grade A, 45.5kg from Tsukiji",
    bidderName: "You",
    timestamp: new Date(),
    highestBid: 1250,
    competingBids: 5,
  },
}

export const Outbid: Story = {
  args: {
    amount: 1100,
    status: "outbid",
    itemName: "Bluefin Tuna",
    itemDescription: "Grade A, 45.5kg from Tsukiji",
    bidderName: "You",
    timestamp: new Date(Date.now() - 3600000),
    highestBid: 1350,
    competingBids: 8,
  },
}

export const Won: Story = {
  args: {
    amount: 2500,
    status: "won",
    itemName: "Premium Otoro",
    itemDescription: "Grade Premium, 2.5kg",
    bidderName: "You",
    timestamp: new Date(Date.now() - 86400000),
  },
}

export const Lost: Story = {
  args: {
    amount: 800,
    status: "lost",
    itemName: "Sea Bream",
    itemDescription: "Grade B, 3.2kg",
    bidderName: "You",
    timestamp: new Date(Date.now() - 86400000 * 2),
    highestBid: 950,
  },
}

export const Pending: Story = {
  args: {
    amount: 500,
    status: "pending",
    itemName: "Mackerel Lot",
    itemDescription: "10kg lot, mixed grades",
    bidderName: "You",
    timestamp: new Date(),
  },
}

export const WithAutoBid: Story = {
  args: {
    amount: 1500,
    status: "winning",
    itemName: "Yellowfin Tuna",
    itemDescription: "Grade A, 28kg",
    bidderName: "You",
    timestamp: new Date(),
    maxAutoBid: 2000,
    competingBids: 3,
  },
}

export const JapaneseYen: Story = {
  args: {
    amount: 125000,
    status: "winning",
    itemName: "Bluefin Tuna",
    itemDescription: "Grade A, 45.5kg",
    currency: "JPY",
    bidderName: "You",
    timestamp: new Date(),
  },
}

export const WithPress: Story = {
  args: {
    amount: 750,
    status: "winning",
    itemName: "Salmon",
    itemDescription: "Grade A, 5kg",
    bidderName: "You",
    timestamp: new Date(),
    onPress: () => alert("Bid details pressed!"),
  },
}
