import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { BidSubmissionForm } from "./BidSubmissionForm"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand200,
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
})

const meta = {
  title: "Auction/BidSubmissionForm",
  component: BidSubmissionForm,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    currentBid: 1500,
    onSubmit: (amount) => console.log("Bid submitted:", amount),
  },
} satisfies Meta<typeof BidSubmissionForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentBid: 1500,
    minIncrement: 50,
    onSubmit: (amount) => console.log("Bid submitted:", amount),
    onCancel: () => console.log("Cancelled"),
  },
}

export const WithQuickBids: Story = {
  name: "With Custom Quick Bids",
  args: {
    currentBid: 1500,
    minIncrement: 50,
    quickBidAmounts: [1550, 1600, 1700, 2000],
    onSubmit: (amount) => console.log("Bid submitted:", amount),
  },
}

export const Loading: Story = {
  args: {
    currentBid: 1500,
    loading: true,
    onSubmit: (amount) => console.log("Bid submitted:", amount),
  },
}

export const WithError: Story = {
  name: "With Error",
  args: {
    currentBid: 1500,
    error: "Unable to place bid. Please try again.",
    onSubmit: (amount) => console.log("Bid submitted:", amount),
  },
}

export const HighValueAuction: Story = {
  name: "High Value Auction",
  args: {
    currentBid: 25000,
    minIncrement: 500,
    buyersPremiumPercent: 10,
    onSubmit: (amount) => console.log("Bid submitted:", amount),
    onCancel: () => console.log("Cancelled"),
  },
}

export const WithoutBreakdown: Story = {
  name: "Without Price Breakdown",
  args: {
    currentBid: 500,
    showBreakdown: false,
    onSubmit: (amount) => console.log("Bid submitted:", amount),
  },
}

export const JapaneseYen: Story = {
  name: "Japanese Yen Currency",
  args: {
    currentBid: 150000,
    minIncrement: 5000,
    currency: "JPY",
    onSubmit: (amount) => console.log("Bid submitted:", amount),
    onCancel: () => console.log("Cancelled"),
  },
}
