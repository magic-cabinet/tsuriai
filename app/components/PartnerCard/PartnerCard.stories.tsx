import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { PartnerCard } from "./PartnerCard"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand200,
    flex: 1,
    padding: 16,
  },
})

const meta = {
  title: "Operations/PartnerCard",
  component: PartnerCard,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    name: "Partner Name",
    type: "supplier",
  },
} satisfies Meta<typeof PartnerCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "Yamamoto Fishing Co.",
    type: "supplier",
    tier: "premium",
    location: "Tsukiji, Tokyo",
    description: "Premium seafood supplier specializing in bluefin tuna and seasonal catches from the Pacific.",
    rating: 4.8,
    transactionCount: 1250,
    yearsPartner: 5,
    verified: true,
    contactName: "Kenji Yamamoto",
    onPress: () => console.log("Card pressed"),
    onContact: () => console.log("Contact pressed"),
  },
}

export const Supplier: Story = {
  args: {
    name: "Pacific Fisheries Ltd.",
    type: "supplier",
    tier: "preferred",
    location: "Hokkaido, Japan",
    description: "Fresh salmon and crab from the northern seas.",
    rating: 4.6,
    transactionCount: 850,
    yearsPartner: 3,
    verified: true,
    onPress: () => console.log("Card pressed"),
  },
}

export const Buyer: Story = {
  args: {
    name: "Tokyo Sushi Masters",
    type: "buyer",
    tier: "premium",
    location: "Ginza, Tokyo",
    description: "High-end sushi restaurant chain sourcing only the finest ingredients.",
    rating: 4.9,
    transactionCount: 2100,
    yearsPartner: 7,
    verified: true,
    contactName: "Takeshi Mori",
    onPress: () => console.log("Card pressed"),
    onContact: () => console.log("Contact pressed"),
  },
}

export const Logistics: Story = {
  args: {
    name: "FishExpress Logistics",
    type: "logistics",
    tier: "standard",
    location: "Osaka, Japan",
    description: "Temperature-controlled seafood transportation across Japan.",
    rating: 4.5,
    transactionCount: 3500,
    verified: true,
    onPress: () => console.log("Card pressed"),
  },
}

export const Processor: Story = {
  args: {
    name: "Ocean Fresh Processing",
    type: "processor",
    tier: "preferred",
    location: "Shimonoseki, Japan",
    description: "Expert fish processing and packaging services.",
    rating: 4.7,
    transactionCount: 1800,
    yearsPartner: 4,
    onPress: () => console.log("Card pressed"),
  },
}

export const Compact: Story = {
  args: {
    name: "Yamamoto Fishing Co.",
    type: "supplier",
    tier: "premium",
    verified: true,
    compact: true,
    onPress: () => console.log("Card pressed"),
  },
}

export const Unverified: Story = {
  args: {
    name: "New Partner Inc.",
    type: "supplier",
    location: "Nagoya, Japan",
    description: "Recently joined the platform.",
    transactionCount: 15,
    onPress: () => console.log("Card pressed"),
  },
}
