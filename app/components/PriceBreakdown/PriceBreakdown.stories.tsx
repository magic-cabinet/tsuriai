import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { PriceBreakdown, PriceLineItem } from "./PriceBreakdown"
import { Text } from "../Text"

const meta: Meta<typeof PriceBreakdown> = {
  title: "Layout/PriceBreakdown",
  component: PriceBreakdown,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof PriceBreakdown>

const basicItems: PriceLineItem[] = [
  { label: "Bluefin Tuna (5kg)", amount: 450 },
  { label: "Processing Fee", amount: 25 },
  { label: "Delivery", amount: 15 },
]

export const Default: Story = {
  args: {
    items: basicItems,
    total: 490,
  },
}

export const WithDiscount: Story = {
  args: {
    items: [
      { label: "Bluefin Tuna (5kg)", amount: 450 },
      { label: "Processing Fee", amount: 25 },
      { label: "Delivery", amount: 15 },
      { label: "Early Bird Discount", amount: 50, isDiscount: true },
    ],
    total: 440,
  },
}

export const WithHighlight: Story = {
  args: {
    items: [
      { label: "Bluefin Tuna (5kg)", amount: 450 },
      { label: "Processing Fee", amount: 25 },
      { label: "Bulk Discount (10%)", amount: 47.5, isDiscount: true, isHighlight: true },
    ],
    total: 427.5,
  },
}

export const WithSubtotal: Story = {
  args: {
    items: [
      { label: "Bluefin Tuna (5kg)", amount: 450 },
      { label: "Salmon (3kg)", amount: 180 },
      { label: "Subtotal", amount: 630, isBold: true },
      { label: "Tax (8%)", amount: 50.4 },
      { label: "Shipping", amount: 25 },
    ],
    total: 705.4,
  },
}

export const JapaneseYen: Story = {
  args: {
    items: [
      { label: "Otoro (200g)", amount: 8500 },
      { label: "Chutoro (300g)", amount: 6200 },
      { label: "Handling Fee", amount: 500 },
    ],
    total: 15200,
    currency: "JPY",
    locale: "ja-JP",
  },
}

export const AuctionBid: Story = {
  render: () => (
    <View>
      <Text preset="subheading" text="Your Winning Bid" style={{ marginBottom: 12 }} />
      <PriceBreakdown
        items={[
          { label: "Winning Bid", amount: 1250 },
          { label: "Buyer's Premium (5%)", amount: 62.5 },
          { label: "Inspection Fee", amount: 50 },
          { label: "Loyalty Discount", amount: 25, isDiscount: true, isHighlight: true },
        ]}
        total={1337.5}
        totalLabel="Amount Due"
      />
    </View>
  ),
}

export const NoDivider: Story = {
  args: {
    items: basicItems,
    total: 490,
    showDivider: false,
  },
}
