import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { PackingContainer } from "./PackingContainer"
import { Text } from "../Text"
import type { PackableItem, PackedRect } from "@/utils/packing"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  container: {
    backgroundColor: colors.palette.sand200,
    borderRadius: 12,
    height: 400,
    width: "100%",
  },
  decorator: {
    backgroundColor: colors.palette.sand100,
    flex: 1,
    padding: 16,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  fishCard: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
  freshBadge: {
    backgroundColor: colors.palette.seafoam400,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    right: 4,
    top: 4,
  },
  freshText: {
    color: "white",
    fontSize: 8,
    fontWeight: "700",
  },
  hotBadge: {
    backgroundColor: colors.palette.coral500,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    left: 4,
    top: 4,
  },
  hotText: {
    color: "white",
    fontSize: 8,
    fontWeight: "700",
  },
  price: {
    color: colors.palette.ocean600,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  title: {
    marginBottom: 16,
  },
})

const COLORS = [
  colors.palette.ocean400,
  colors.palette.seafoam300,
  colors.palette.coral300,
  colors.palette.sunset300,
  colors.palette.kelp300,
]

// Simple test items
const simpleItems: PackableItem[] = [
  { id: "1", minWidth: 100, minHeight: 80, priority: 5 },
  { id: "2", minWidth: 80, minHeight: 60, priority: 3 },
  { id: "3", minWidth: 120, minHeight: 90, priority: 8 },
  { id: "4", minWidth: 90, minHeight: 70, priority: 4 },
  { id: "5", minWidth: 70, minHeight: 50, priority: 2 },
]

// Fish auction items - priority determines visual prominence
const fishItems: PackableItem[] = [
  { id: "bluefin", minWidth: 120, minHeight: 90, priority: 10 },
  { id: "salmon", minWidth: 100, minHeight: 75, priority: 7 },
  { id: "halibut", minWidth: 90, minHeight: 70, priority: 5 },
  { id: "yellowtail", minWidth: 85, minHeight: 65, priority: 6 },
  { id: "cod", minWidth: 80, minHeight: 60, priority: 3 },
  { id: "mackerel", minWidth: 75, minHeight: 55, priority: 4 },
  { id: "sardine", minWidth: 70, minHeight: 50, priority: 2 },
]

const fishData: Record<string, { name: string; price: string; emoji: string; hot?: boolean; fresh?: boolean }> = {
  bluefin: { name: "Bluefin Tuna", price: "$85/lb", emoji: "🐟", hot: true },
  salmon: { name: "King Salmon", price: "$32/lb", emoji: "🍣", fresh: true },
  halibut: { name: "Halibut", price: "$28/lb", emoji: "🐠" },
  yellowtail: { name: "Yellowtail", price: "$45/lb", emoji: "🐡", hot: true },
  cod: { name: "Pacific Cod", price: "$15/lb", emoji: "🐟" },
  mackerel: { name: "Mackerel", price: "$12/lb", emoji: "🐟", fresh: true },
  sardine: { name: "Sardines", price: "$8/lb", emoji: "🐠" },
}

const meta = {
  title: "Layout/PackingContainer",
  component: PackingContainer,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof PackingContainer>

export default meta
type Story = StoryObj<typeof meta>

// Basic demo
export const Basic: Story = {
  args: {
    items: simpleItems,
    algorithm: "maxrects",
    animation: "bouncy",
    density: "loose",
    style: styles.container,
    renderItem: (item: PackableItem, _rect: PackedRect, index: number) => (
      <View style={[styles.card, { backgroundColor: COLORS[index % COLORS.length] }]}>
        <Text weight="bold" style={{ color: "white" }}>
          P{item.priority}
        </Text>
      </View>
    ),
  },
}

// Treemap (priority-based sizing)
export const Treemap: Story = {
  args: {
    items: simpleItems,
    algorithm: "treemap",
    animation: "snappy",
    density: "tight",
    style: styles.container,
    renderItem: (item: PackableItem, _rect: PackedRect, index: number) => (
      <View style={[styles.card, { backgroundColor: COLORS[index % COLORS.length] }]}>
        <Text weight="bold" style={{ color: "white" }}>
          P{item.priority}
        </Text>
      </View>
    ),
  },
}

// Fish Auction Grid
export const FishAuction: Story = {
  args: {
    items: fishItems,
    algorithm: "treemap",
    animation: "wave",
    density: "loose",
    style: styles.container,
    renderItem: (item: PackableItem, _rect: PackedRect, _index: number) => {
      const fish = fishData[item.id]
      if (!fish) return null

      const bgColor = fish.hot
        ? colors.palette.coral100
        : fish.fresh
          ? colors.palette.seafoam100
          : colors.palette.sand100
      const borderColor = fish.hot
        ? colors.palette.coral300
        : fish.fresh
          ? colors.palette.seafoam300
          : colors.palette.sand400

      return (
        <View style={[styles.fishCard, { backgroundColor: bgColor, borderColor }]}>
          {fish.hot && (
            <View style={styles.hotBadge}>
              <Text style={styles.hotText}>HOT</Text>
            </View>
          )}
          {fish.fresh && (
            <View style={styles.freshBadge}>
              <Text style={styles.freshText}>FRESH</Text>
            </View>
          )}
          <Text style={styles.emoji}>{fish.emoji}</Text>
          <Text weight="semiBold" size="xs">
            {fish.name}
          </Text>
          <Text style={styles.price}>{fish.price}</Text>
        </View>
      )
    },
  },
}

// With debug overlay
export const WithDebug: Story = {
  args: {
    items: simpleItems,
    algorithm: "maxrects",
    animation: "snappy",
    density: "loose",
    showDebug: true,
    style: styles.container,
    renderItem: (item: PackableItem, _rect: PackedRect, index: number) => (
      <View style={[styles.card, { backgroundColor: COLORS[index % COLORS.length] }]}>
        <Text weight="bold" style={{ color: "white" }}>
          {item.id}
        </Text>
      </View>
    ),
  },
}

// Using variant prop (selects from 24 preset combinations)
export const Variant12: Story = {
  args: {
    items: fishItems,
    variant: 12, // Treemap Snappy Loose
    style: styles.container,
    renderItem: (item: PackableItem, _rect: PackedRect, _index: number) => {
      const fish = fishData[item.id]
      if (!fish) return null
      return (
        <View style={[styles.fishCard, { backgroundColor: colors.palette.ocean100, borderColor: colors.palette.ocean300 }]}>
          <Text style={styles.emoji}>{fish.emoji}</Text>
          <Text weight="semiBold" size="xs">{fish.name}</Text>
        </View>
      )
    },
  },
}

// Chaos variant - random stagger timing
export const ChaosVariant: Story = {
  args: {
    items: simpleItems,
    variant: 22, // Chaos Pack
    style: styles.container,
    renderItem: (item: PackableItem, _rect: PackedRect, index: number) => (
      <View style={[styles.card, { backgroundColor: COLORS[index % COLORS.length] }]}>
        <Text weight="bold" style={{ color: "white" }}>
          {item.id}
        </Text>
      </View>
    ),
  },
}
