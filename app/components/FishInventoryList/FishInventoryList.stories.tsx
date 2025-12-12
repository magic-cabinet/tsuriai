import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { FishInventoryList } from "./FishInventoryList"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand100,
    flex: 1,
  },
})

const meta = {
  title: "Domain/FishInventoryList",
  component: FishInventoryList,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    fish: [],
  },
} satisfies Meta<typeof FishInventoryList>

export default meta

type Story = StoryObj<typeof meta>

// Sample fish inventory data
const sampleFish = [
  {
    id: "1",
    species: "Bluefin Tuna",
    japaneseName: "クロマグロ",
    weight: 45.5,
    grade: "A" as const,
    freshness: "fresh" as const,
    pricePerKg: 150,
    totalPrice: 6825,
    origin: "Tsukiji, Tokyo",
    status: "available" as const,
  },
  {
    id: "2",
    species: "Yellowtail",
    japaneseName: "ハマチ",
    weight: 12.3,
    grade: "premium" as const,
    freshness: "live" as const,
    pricePerKg: 85,
    totalPrice: 1045,
    origin: "Kyushu",
    status: "available" as const,
  },
  {
    id: "3",
    species: "Salmon",
    weight: 8.7,
    grade: "B" as const,
    freshness: "frozen" as const,
    pricePerKg: 45,
    totalPrice: 391,
    origin: "Hokkaido",
    status: "sold" as const,
  },
  {
    id: "4",
    species: "Swordfish",
    weight: 15.2,
    grade: "A" as const,
    freshness: "fresh" as const,
    pricePerKg: 120,
    totalPrice: 1824,
    origin: "Pacific Ocean",
    status: "reserved" as const,
  },
  {
    id: "5",
    species: "Mackerel",
    japaneseName: "サバ",
    weight: 3.5,
    grade: "standard" as const,
    freshness: "fresh" as const,
    pricePerKg: 25,
    totalPrice: 87,
    origin: "Japan Sea",
    status: "available" as const,
  },
]

export const Default: Story = {
  args: {
    fish: sampleFish,
    onFishPress: (id) => console.log("Fish pressed:", id),
  },
}

export const WithSearchAndFilters: Story = {
  name: "With Search and Filters",
  args: {
    fish: sampleFish,
    showSearch: true,
    showFilters: true,
    activeFilter: "all",
    onFishPress: (id) => console.log("Fish pressed:", id),
    onSearchChange: (query) => console.log("Search:", query),
    onFilterChange: (filter) => console.log("Filter:", filter),
  },
}

export const FilteredAvailable: Story = {
  name: "Filtered - Available Only",
  args: {
    fish: sampleFish.filter((f) => f.status === "available"),
    showFilters: true,
    activeFilter: "available",
    onFishPress: (id) => console.log("Fish pressed:", id),
  },
}

export const Loading: Story = {
  args: {
    fish: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    fish: [],
    emptyTitle: "Your inventory is empty",
    emptyDescription: "Start adding fish to your inventory to track and sell them.",
  },
}

export const LoadingMore: Story = {
  name: "Loading More (Pagination)",
  args: {
    fish: sampleFish.slice(0, 3),
    loadingMore: true,
    onFishPress: (id) => console.log("Fish pressed:", id),
  },
}

export const LargeInventory: Story = {
  name: "Large Inventory",
  args: {
    fish: Array.from({ length: 20 }, (_, i) => ({
      id: `fish-${i}`,
      species: ["Tuna", "Salmon", "Yellowtail", "Swordfish", "Mackerel"][i % 5],
      weight: 5 + Math.random() * 50,
      grade: (["A", "B", "premium", "standard"] as const)[i % 4],
      freshness: (["fresh", "frozen", "live"] as const)[i % 3],
      pricePerKg: 20 + Math.random() * 150,
      status: (["available", "available", "available", "sold", "reserved"] as const)[i % 5],
    })),
    showSearch: true,
    showFilters: true,
    onFishPress: (id) => console.log("Fish pressed:", id),
  },
}
