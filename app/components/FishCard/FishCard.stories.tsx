import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { FishCard } from "./FishCard"

const meta: Meta<typeof FishCard> = {
  title: "Fish/FishCard",
  component: FishCard,
  argTypes: {
    grade: {
      control: "select",
      options: ["A", "B", "C", "premium", "standard"],
    },
    freshness: {
      control: "select",
      options: ["live", "fresh", "frozen", "processed"],
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

type Story = StoryObj<typeof FishCard>

export const Default: Story = {
  args: {
    species: "Bluefin Tuna",
    japaneseName: "クロマグロ",
    weight: 45.5,
    grade: "A",
    freshness: "fresh",
    pricePerKg: 150,
    totalPrice: 6825,
    origin: "Tsukiji, Tokyo",
    catchDate: new Date(),
  },
}

export const PremiumGrade: Story = {
  args: {
    species: "Otoro",
    japaneseName: "大トロ",
    weight: 2.5,
    grade: "premium",
    freshness: "fresh",
    pricePerKg: 850,
    totalPrice: 2125,
    origin: "Oma, Aomori",
  },
}

export const LiveFish: Story = {
  args: {
    species: "Sea Bream",
    japaneseName: "真鯛",
    weight: 3.2,
    grade: "A",
    freshness: "live",
    pricePerKg: 45,
    totalPrice: 144,
    origin: "Nagasaki",
  },
}

export const FrozenProduct: Story = {
  args: {
    species: "Yellowfin Tuna",
    japaneseName: "キハダマグロ",
    weight: 28,
    grade: "B",
    freshness: "frozen",
    pricePerKg: 35,
    totalPrice: 980,
    origin: "Pacific Ocean",
  },
}

export const MinimalInfo: Story = {
  args: {
    species: "Mackerel",
    weight: 1.5,
  },
}

export const Selected: Story = {
  args: {
    species: "Salmon",
    japaneseName: "サーモン",
    weight: 5.0,
    grade: "A",
    freshness: "fresh",
    pricePerKg: 28,
    totalPrice: 140,
    selected: true,
  },
}

export const WithPress: Story = {
  args: {
    species: "Squid",
    japaneseName: "イカ",
    weight: 0.8,
    grade: "standard",
    freshness: "fresh",
    pricePerKg: 18,
    totalPrice: 14.4,
    onPress: () => alert("Fish card pressed!"),
  },
}

export const JapaneseYen: Story = {
  args: {
    species: "Bluefin Tuna",
    japaneseName: "クロマグロ",
    weight: 45.5,
    grade: "A",
    freshness: "fresh",
    pricePerKg: 15000,
    totalPrice: 682500,
    currency: "JPY",
    origin: "Tsukiji, Tokyo",
  },
}
