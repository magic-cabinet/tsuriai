import { useState } from "react"
import { View, StyleSheet, ScrollView, Dimensions } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { FishAuctionFloor } from "./FishAuctionFloor"
import { FishDot } from "./FishDot"
import { FishRowHeader } from "./FishRowHeader"
import { FishDotGrid } from "./FishDotGrid"
import { FishDetailPanel } from "./FishDetailPanel"
import { FishPriceTicker } from "./FishPriceTicker"
import { FishTallyBar } from "./FishTallyBar"
import { PriceDriversPanel } from "./PriceDriversPanel"
import { QuickBidPanel, SuggestedBid } from "./QuickBidPanel"
import { FishItem, TickerItem, TallyItem, PriceDriver } from "./index"
import { Text } from "../Text"
import { colors } from "@/theme/colors"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand200,
    flex: 1,
    padding: 16,
  },
  fullScreen: {
    backgroundColor: colors.palette.sand100,
    height: screenHeight - 100,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    color: colors.palette.sand800,
  },
  spacer: {
    height: 16,
  },
})

// =============================================================================
// SAMPLE DATA
// =============================================================================

const SAMPLE_FISH: FishItem[] = [
  // Swordfish
  { id: "sw-1", species: "Swordfish", speciesJapanese: "メカジキ", weight: 52, grade: "Premium", freshness: "fresh", status: "available", pricePerKg: 3200, origin: "Tsukiji", catchDate: new Date("2024-01-15") },
  { id: "sw-2", species: "Swordfish", speciesJapanese: "メカジキ", weight: 48, grade: "A", freshness: "fresh", status: "available", pricePerKg: 2800, origin: "Tsukiji" },
  { id: "sw-3", species: "Swordfish", speciesJapanese: "メカジキ", weight: 45, grade: "A", freshness: "fresh", status: "bidding", pricePerKg: 2800, currentBid: 130000, bidCount: 5, auctionEndDate: new Date(Date.now() + 300000) },
  { id: "sw-4", species: "Swordfish", speciesJapanese: "メカジキ", weight: 42, grade: "B", freshness: "fresh", status: "sold", pricePerKg: 2400 },
  { id: "sw-5", species: "Swordfish", speciesJapanese: "メカジキ", weight: 38, grade: "B", freshness: "frozen", status: "reserved", pricePerKg: 2200 },
  // Bluefin Tuna
  { id: "bt-1", species: "Bluefin Tuna", speciesJapanese: "本マグロ", weight: 180, grade: "Premium", freshness: "fresh", status: "available", pricePerKg: 8500, origin: "Oma" },
  { id: "bt-2", species: "Bluefin Tuna", speciesJapanese: "本マグロ", weight: 165, grade: "Premium", freshness: "fresh", status: "bidding", pricePerKg: 8200, currentBid: 1400000, bidCount: 12, auctionEndDate: new Date(Date.now() + 180000) },
  { id: "bt-3", species: "Bluefin Tuna", speciesJapanese: "本マグロ", weight: 150, grade: "A", freshness: "fresh", status: "available", pricePerKg: 7500 },
  { id: "bt-4", species: "Bluefin Tuna", speciesJapanese: "本マグロ", weight: 140, grade: "A", freshness: "fresh", status: "sold", pricePerKg: 7200 },
  { id: "bt-5", species: "Bluefin Tuna", speciesJapanese: "本マグロ", weight: 120, grade: "B", freshness: "frozen", status: "sold", pricePerKg: 6000 },
  // Salmon
  { id: "sa-1", species: "Salmon", speciesJapanese: "サーモン", weight: 12, grade: "A", freshness: "fresh", status: "available", pricePerKg: 1800 },
  { id: "sa-2", species: "Salmon", speciesJapanese: "サーモン", weight: 11, grade: "A", freshness: "fresh", status: "available", pricePerKg: 1800 },
  { id: "sa-3", species: "Salmon", speciesJapanese: "サーモン", weight: 10, grade: "B", freshness: "fresh", status: "available", pricePerKg: 1600 },
  { id: "sa-4", species: "Salmon", speciesJapanese: "サーモン", weight: 9, grade: "B", freshness: "frozen", status: "bidding", pricePerKg: 1400, currentBid: 13000, bidCount: 3 },
  { id: "sa-5", species: "Salmon", speciesJapanese: "サーモン", weight: 8, grade: "Standard", freshness: "frozen", status: "available", pricePerKg: 1200 },
  // Sea Bream
  { id: "sb-1", species: "Sea Bream", speciesJapanese: "鯛", weight: 5.5, grade: "Premium", freshness: "live", status: "available", pricePerKg: 4500 },
  { id: "sb-2", species: "Sea Bream", speciesJapanese: "鯛", weight: 5.2, grade: "A", freshness: "live", status: "available", pricePerKg: 4000 },
  { id: "sb-3", species: "Sea Bream", speciesJapanese: "鯛", weight: 4.8, grade: "A", freshness: "fresh", status: "bidding", pricePerKg: 3800, currentBid: 19000, bidCount: 7 },
  { id: "sb-4", species: "Sea Bream", speciesJapanese: "鯛", weight: 4.5, grade: "B", freshness: "fresh", status: "sold", pricePerKg: 3200 },
]

const SAMPLE_TICKER: TickerItem[] = [
  { species: "Bluefin Tuna", speciesJapanese: "本マグロ", price: 8500, change: 2.3, volume: 2400 },
  { species: "Swordfish", speciesJapanese: "メカジキ", price: 2800, change: -1.2, volume: 850 },
  { species: "Salmon", speciesJapanese: "サーモン", price: 1600, change: 0.5, volume: 3200 },
  { species: "Sea Bream", speciesJapanese: "鯛", price: 4000, change: 3.1, volume: 420 },
  { species: "Yellowtail", speciesJapanese: "ブリ", price: 2200, change: -0.8, volume: 1100 },
  { species: "Mackerel", speciesJapanese: "鯖", price: 800, change: 1.5, volume: 5600 },
]

const SAMPLE_TALLY: TallyItem[] = [
  { species: "Bluefin Tuna", speciesJapanese: "本マグロ", supply: 2400, demand: 3100, avgPrice: 8500, priceChange: 2.3 },
  { species: "Swordfish", speciesJapanese: "メカジキ", supply: 850, demand: 720, avgPrice: 2800, priceChange: -1.2 },
  { species: "Salmon", speciesJapanese: "サーモン", supply: 3200, demand: 3000, avgPrice: 1600, priceChange: 0.5 },
  { species: "Sea Bream", speciesJapanese: "鯛", supply: 420, demand: 650, avgPrice: 4000, priceChange: 3.1 },
]

const SAMPLE_DRIVERS: PriceDriver[] = [
  { name: "Diesel Fuel", nameJapanese: "軽油", category: "fuel", currentValue: 158, unit: "¥/L", change: 2.8, impact: "high" },
  { name: "Fish Feed", nameJapanese: "飼料", category: "feed", currentValue: 12500, unit: "¥/20kg", change: -0.5, impact: "medium" },
  { name: "Shipping Rate", nameJapanese: "運賃", category: "shipping", currentValue: 45000, unit: "¥/ton", change: 1.2, impact: "medium" },
  { name: "Pacific Weather", nameJapanese: "太平洋", category: "weather", currentValue: 0, unit: "Storm", change: 0, impact: "low" },
  { name: "JPY/USD", nameJapanese: "為替", category: "currency", currentValue: 149.5, unit: "¥/$", change: -0.3, impact: "high" },
]

const SAMPLE_PRICE_DATA: Record<string, { avg: number; change: number; high: number; low: number }> = {
  "Swordfish": { avg: 2800, change: -1.2, high: 3500, low: 2200 },
  "Bluefin Tuna": { avg: 8500, change: 2.3, high: 12000, low: 6000 },
  "Salmon": { avg: 1600, change: 0.5, high: 2200, low: 1100 },
  "Sea Bream": { avg: 4000, change: 3.1, high: 5500, low: 3000 },
}

const SAMPLE_SUGGESTIONS: SuggestedBid[] = [
  { amount: 125000, label: "Conservative", deviation: -3.8, confidence: 85 },
  { amount: 130000, label: "Market", deviation: 0, isRecommended: true, confidence: 92 },
  { amount: 138000, label: "Aggressive", deviation: 6.2, confidence: 78 },
]

const SAMPLE_PRICE_HISTORY = [2650, 2720, 2680, 2750, 2800, 2780, 2850, 2820, 2880, 2800]

// =============================================================================
// META
// =============================================================================

const meta = {
  title: "Auction Floor/Full View",
  component: FishAuctionFloor,
  decorators: [
    (Story) => (
      <View style={styles.fullScreen}>
        <Story />
      </View>
    ),
  ],
  args: {
    fish: SAMPLE_FISH,
    tickerItems: SAMPLE_TICKER,
    tallyItems: SAMPLE_TALLY,
    priceDrivers: SAMPLE_DRIVERS,
    priceData: SAMPLE_PRICE_DATA,
  },
} satisfies Meta<typeof FishAuctionFloor>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// STORIES - FULL AUCTION FLOOR
// =============================================================================

export const Default: Story = {
  args: {
    fish: SAMPLE_FISH,
    tickerItems: SAMPLE_TICKER,
    tallyItems: SAMPLE_TALLY,
    priceDrivers: SAMPLE_DRIVERS,
    priceData: SAMPLE_PRICE_DATA,
    priceHistory: SAMPLE_PRICE_HISTORY,
    getBidSuggestions: () => SAMPLE_SUGGESTIONS,
    getAiReasoning: () => "Based on current market conditions and supply levels, the market price offers a balanced risk/reward ratio.",
    layout: "stacked",
  },
}

export const SplitLayout: Story = {
  args: {
    ...Default.args,
    layout: "split",
  },
}

export const CompactLayout: Story = {
  args: {
    ...Default.args,
    layout: "compact",
  },
}

export const MinimalView: Story = {
  args: {
    fish: SAMPLE_FISH,
    priceData: SAMPLE_PRICE_DATA,
    showTicker: false,
    showTally: false,
    showDrivers: false,
    layout: "stacked",
  },
}

// =============================================================================
// STORIES - INDIVIDUAL COMPONENTS
// =============================================================================

export const TickerOnly: Story = {
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: colors.palette.sand900 }}>
        <Story />
      </View>
    ),
  ],
  render: () => <FishPriceTicker items={SAMPLE_TICKER} />,
}

export const TickerCompact: Story = {
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: colors.palette.sand900 }}>
        <Story />
      </View>
    ),
  ],
  render: () => <FishPriceTicker items={SAMPLE_TICKER} compact />,
}

export const TallyBarFull: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => <FishTallyBar items={SAMPLE_TALLY} />,
}

export const TallyBarCompact: Story = {
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: colors.palette.sand900 }}>
        <Story />
      </View>
    ),
  ],
  render: () => <FishTallyBar items={SAMPLE_TALLY} compact />,
}

export const PriceDriversFull: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => <PriceDriversPanel drivers={SAMPLE_DRIVERS} />,
}

export const PriceDriversCompact: Story = {
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: colors.palette.sand800 }}>
        <Story />
      </View>
    ),
  ],
  render: () => <PriceDriversPanel drivers={SAMPLE_DRIVERS} compact />,
}

export const QuickBidPanelStory: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <QuickBidPanel
      marketPrice={130000}
      suggestions={SAMPLE_SUGGESTIONS}
      currentBid={128000}
      onQuickBid={(amount) => console.log("Bid:", amount)}
      aiConfidence={88}
      aiReasoning="Supply is limited and demand is high. Consider aggressive bidding."
    />
  ),
}

export const DetailPanelWithFish: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <FishDetailPanel
      fish={SAMPLE_FISH[2]}
      bidSuggestions={SAMPLE_SUGGESTIONS}
      aiReasoning="This swordfish is in high demand. Current bid is below market average."
      onBid={(id, amount) => console.log("Bid on", id, ":", amount)}
      priceHistory={SAMPLE_PRICE_HISTORY}
      marketPrice={2800}
    />
  ),
}

export const DetailPanelEmpty: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => <FishDetailPanel fish={null} />,
}

export const RowHeaderStory: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View>
      <FishRowHeader
        species="Bluefin Tuna"
        speciesJapanese="本マグロ"
        totalCount={5}
        availableCount={3}
        weightRange={{ min: 120, max: 180 }}
        avgPrice={8500}
        priceChange={2.3}
        historicalHigh={12000}
        historicalLow={6000}
      />
      <View style={styles.spacer} />
      <FishRowHeader
        species="Swordfish"
        speciesJapanese="メカジキ"
        totalCount={5}
        availableCount={2}
        weightRange={{ min: 38, max: 52 }}
        avgPrice={2800}
        priceChange={-1.2}
        historicalHigh={3500}
        historicalLow={2200}
      />
    </View>
  ),
}

export const DotGridOnly: Story = {
  decorators: [
    (Story) => (
      <View style={styles.fullScreen}>
        <Story />
      </View>
    ),
  ],
  render: () => {
    const [selected, setSelected] = useState<string | undefined>("sw-3")
    return (
      <FishDotGrid
        fish={SAMPLE_FISH}
        selectedId={selected}
        onSelect={setSelected}
        groupBy="species"
        sortOrder="desc"
        priceData={SAMPLE_PRICE_DATA}
      />
    )
  },
}

// =============================================================================
// STORIES - FISH DOT VARIATIONS
// =============================================================================

export const FishDotDemo: Story = {
  decorators: [
    (Story) => (
      <ScrollView style={styles.decorator}>
        <Story />
      </ScrollView>
    ),
  ],
  render: () => {
    const [selected, setSelected] = useState<string | null>("fish-3")

    return (
      <View>
        <View style={styles.section}>
          <Text text="SWORDFISH メカジキ" preset="subheading" style={styles.sectionTitle} />
          <View style={styles.row}>
            <FishDot id="fish-1" weight={52} status="available" selected={selected === "fish-1"} onPress={setSelected} />
            <FishDot id="fish-2" weight={48} status="available" selected={selected === "fish-2"} onPress={setSelected} />
            <FishDot id="fish-3" weight={45} status="available" selected={selected === "fish-3"} onPress={setSelected} />
            <FishDot id="fish-4" weight={42} status="bidding" selected={selected === "fish-4"} onPress={setSelected} />
            <FishDot id="fish-5" weight={38} status="sold" selected={selected === "fish-5"} onPress={setSelected} />
            <FishDot id="fish-6" weight={35} status="reserved" selected={selected === "fish-6"} onPress={setSelected} />
          </View>
        </View>

        <View style={styles.section}>
          <Text text="BLUEFIN TUNA 本マグロ" preset="subheading" style={styles.sectionTitle} />
          <View style={styles.row}>
            <FishDot id="tuna-1" weight={180} status="available" selected={selected === "tuna-1"} onPress={setSelected} />
            <FishDot id="tuna-2" weight={165} status="available" selected={selected === "tuna-2"} onPress={setSelected} />
            <FishDot id="tuna-3" weight={150} status="bidding" selected={selected === "tuna-3"} onPress={setSelected} />
            <FishDot id="tuna-4" weight={140} status="sold" selected={selected === "tuna-4"} onPress={setSelected} />
            <FishDot id="tuna-5" weight={120} status="sold" selected={selected === "tuna-5"} onPress={setSelected} />
          </View>
        </View>

        <View style={styles.section}>
          <Text text="STATUS LEGEND" preset="subheading" style={styles.sectionTitle} />
          <View style={styles.row}>
            <FishDot id="legend-1" weight={30} status="available" />
            <Text text="Available" size="sm" style={{ marginRight: 16 }} />
            <FishDot id="legend-2" weight={30} status="bidding" />
            <Text text="Bidding" size="sm" style={{ marginRight: 16 }} />
            <FishDot id="legend-3" weight={30} status="sold" />
            <Text text="Sold" size="sm" style={{ marginRight: 16 }} />
            <FishDot id="legend-4" weight={30} status="reserved" />
            <Text text="Reserved" size="sm" />
          </View>
        </View>
      </View>
    )
  },
}

export const AllStatuses: Story = {
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.row}>
      <FishDot id="1" weight={40} status="available" />
      <FishDot id="2" weight={40} status="bidding" />
      <FishDot id="3" weight={40} status="sold" />
      <FishDot id="4" weight={40} status="reserved" />
      <FishDot id="5" weight={40} status="available" selected />
    </View>
  ),
}
