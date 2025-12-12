import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { ChirashiCard } from "./ChirashiCard"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand200,
    flex: 1,
    padding: 16,
  },
  grid: {
    gap: 16,
  },
})

const meta = {
  title: "Domain/ChirashiCard",
  component: ChirashiCard,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    title: "Fresh Tuna",
    price: 2500,
  },
} satisfies Meta<typeof ChirashiCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Premium Bluefin Tuna",
    japaneseTitle: "本マグロ 大トロ",
    price: 2500,
    originalPrice: 3800,
    priceUnit: "/kg",
    bannerText: "本日の特売",
    bannerStyle: "burst",
    discountPercent: 34,
    origin: "築地直送",
    grade: "A級",
    weight: "45.5kg",
    remainingStock: 3,
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    bidCount: 12,
    onPress: () => console.log("Card pressed"),
  },
}

export const RibbonBanner: Story = {
  name: "Ribbon Banner Style",
  args: {
    title: "Wild Salmon Fillet",
    japaneseTitle: "天然サーモン",
    price: 1800,
    originalPrice: 2400,
    priceUnit: "/kg",
    bannerText: "SPECIAL DEAL",
    bannerStyle: "ribbon",
    discountPercent: 25,
    origin: "北海道産",
    grade: "Premium",
    weight: "12kg",
    remainingStock: 8,
    bidCount: 5,
    onPress: () => console.log("Card pressed"),
  },
}

export const StampBanner: Story = {
  name: "Stamp Banner Style",
  args: {
    title: "Swordfish Steak",
    japaneseTitle: "メカジキ ステーキ",
    price: 3200,
    priceUnit: "/kg",
    bannerText: "限定品",
    bannerStyle: "stamp",
    origin: "太平洋",
    grade: "B級",
    weight: "8.2kg",
    tags: [
      { text: "新鮮", color: "green" },
      { text: "人気", color: "red" },
    ],
    endDate: new Date(Date.now() + 30 * 60 * 1000),
    bidCount: 18,
    onPress: () => console.log("Card pressed"),
  },
}

export const UrgentDeal: Story = {
  name: "Urgent Deal (Low Stock)",
  args: {
    title: "Sea Bream",
    japaneseTitle: "真鯛",
    price: 980,
    originalPrice: 1500,
    priceUnit: "/尾",
    bannerText: "タイムセール",
    bannerStyle: "burst",
    discountPercent: 35,
    origin: "瀬戸内海",
    grade: "特選",
    remainingStock: 1,
    endDate: new Date(Date.now() + 5 * 60 * 1000),
    bidCount: 24,
    onPress: () => console.log("Card pressed"),
  },
}

export const WithManyTags: Story = {
  name: "With Many Tags",
  args: {
    title: "Mixed Seafood Box",
    japaneseTitle: "海鮮セット",
    price: 5500,
    originalPrice: 7800,
    priceUnit: "/箱",
    bannerText: "お買い得",
    origin: "日本海",
    tags: [
      { text: "送料無料", color: "green" },
      { text: "冷凍", color: "blue" },
      { text: "業務用", color: "purple" },
      { text: "大容量", color: "orange" },
    ],
    remainingStock: 15,
    bidCount: 7,
    onPress: () => console.log("Card pressed"),
  },
}

export const NoBanner: Story = {
  name: "No Banner",
  args: {
    title: "Yellowtail",
    japaneseTitle: "ハマチ",
    price: 1200,
    priceUnit: "/kg",
    origin: "鹿児島",
    grade: "養殖",
    weight: "5kg",
    endDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
    bidCount: 3,
    onPress: () => console.log("Card pressed"),
  },
}

export const SimplePrice: Story = {
  name: "Simple (Price Only)",
  args: {
    title: "Fresh Squid",
    japaneseTitle: "スルメイカ",
    price: 450,
    priceUnit: "/杯",
    onPress: () => console.log("Card pressed"),
  },
}

export const MultipleCards: Story = {
  name: "Multiple Cards (Grid)",
  render: () => (
    <View style={styles.grid}>
      <ChirashiCard
        title="Premium Tuna"
        japaneseTitle="本マグロ"
        price={2500}
        originalPrice={3800}
        priceUnit="/kg"
        bannerText="本日の特売"
        discountPercent={34}
        origin="築地"
        grade="A級"
        remainingStock={3}
        endDate={new Date(Date.now() + 2 * 60 * 60 * 1000)}
        bidCount={12}
      />
      <ChirashiCard
        title="Wild Salmon"
        japaneseTitle="天然サーモン"
        price={1800}
        priceUnit="/kg"
        bannerText="FRESH"
        bannerStyle="ribbon"
        origin="北海道"
        weight="12kg"
        bidCount={5}
      />
      <ChirashiCard
        title="Sea Bream"
        japaneseTitle="真鯛"
        price={980}
        originalPrice={1500}
        priceUnit="/尾"
        bannerText="限定"
        bannerStyle="stamp"
        discountPercent={35}
        remainingStock={1}
        endDate={new Date(Date.now() + 5 * 60 * 1000)}
      />
    </View>
  ),
}
