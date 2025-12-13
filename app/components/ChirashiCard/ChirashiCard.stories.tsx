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

// Demo fish images from Unsplash
const DEMO_IMAGES = {
  tuna: { uri: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop" },
  salmon: { uri: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=200&h=200&fit=crop" },
  swordfish: { uri: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=200&h=200&fit=crop" },
  seaBream: { uri: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=200&h=200&fit=crop" },
  squid: { uri: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=200&h=200&fit=crop" },
  seafoodBox: { uri: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=200&h=200&fit=crop" },
  yellowtail: { uri: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=200&h=200&fit=crop" },
  shark: { uri: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=200&h=200&fit=crop" },
}

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
    image: DEMO_IMAGES.tuna,
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
    image: DEMO_IMAGES.salmon,
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
    image: DEMO_IMAGES.swordfish,
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
    image: DEMO_IMAGES.seaBream,
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
    image: DEMO_IMAGES.seafoodBox,
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
    image: DEMO_IMAGES.yellowtail,
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
    image: DEMO_IMAGES.squid,
    price: 450,
    priceUnit: "/杯",
    onPress: () => console.log("Card pressed"),
  },
}

export const SharkFin: Story = {
  name: "Shark Fin Special",
  args: {
    title: "Blue Shark",
    japaneseTitle: "ヨシキリザメ",
    image: DEMO_IMAGES.shark,
    price: 8500,
    originalPrice: 12000,
    priceUnit: "/kg",
    bannerText: "希少入荷",
    bannerStyle: "burst",
    discountPercent: 29,
    origin: "気仙沼",
    grade: "最高級",
    weight: "25kg",
    tags: [
      { text: "希少", color: "purple" },
      { text: "高級", color: "red" },
    ],
    remainingStock: 2,
    endDate: new Date(Date.now() + 1 * 60 * 60 * 1000),
    bidCount: 31,
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
        image={DEMO_IMAGES.tuna}
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
        image={DEMO_IMAGES.salmon}
        price={1800}
        priceUnit="/kg"
        bannerText="FRESH"
        bannerStyle="ribbon"
        origin="北海道"
        weight="12kg"
        bidCount={5}
      />
      <ChirashiCard
        title="Blue Shark"
        japaneseTitle="ヨシキリザメ"
        image={DEMO_IMAGES.shark}
        price={8500}
        originalPrice={12000}
        priceUnit="/kg"
        bannerText="希少"
        bannerStyle="stamp"
        discountPercent={29}
        remainingStock={2}
        endDate={new Date(Date.now() + 1 * 60 * 60 * 1000)}
      />
    </View>
  ),
}
