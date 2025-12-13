import { View, ViewStyle, ScrollView } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { FishItem, FishGroup, GroupBy } from "./types"
import { FishDot } from "./FishDot"
import { FishRowHeader } from "./FishRowHeader"

export interface FishDotGridProps {
  /**
   * List of fish to display
   */
  fish: FishItem[]
  /**
   * Currently selected fish ID
   */
  selectedId?: string
  /**
   * Callback when fish is selected
   */
  onSelect?: (id: string) => void
  /**
   * How to group the fish
   * @default "species"
   */
  groupBy?: GroupBy
  /**
   * Sort order within groups
   * @default "desc"
   */
  sortOrder?: "asc" | "desc"
  /**
   * Price data for each species (for header ticker)
   */
  priceData?: Record<string, { avg: number; change: number; high: number; low: number }>
}

/**
 * Groups fish by the specified criteria
 */
function groupFish(fish: FishItem[], groupBy: GroupBy): FishGroup[] {
  const groups: Record<string, FishItem[]> = {}

  fish.forEach((f) => {
    let key: string
    switch (groupBy) {
      case "species":
        key = f.species
        break
      case "weight":
        // Group by weight ranges: 0-50, 50-100, 100-150, 150+
        if (f.weight < 50) key = "small"
        else if (f.weight < 100) key = "medium"
        else if (f.weight < 150) key = "large"
        else key = "xlarge"
        break
      case "grade":
        key = f.grade
        break
      default:
        key = f.species
    }
    if (!groups[key]) groups[key] = []
    groups[key].push(f)
  })

  return Object.entries(groups).map(([key, items]) => {
    const weights = items.map((f) => f.weight)
    const firstItem = items[0]

    let label: string
    let labelJapanese: string | undefined

    switch (groupBy) {
      case "species":
        label = key
        labelJapanese = firstItem.speciesJapanese
        break
      case "weight":
        label = key === "small" ? "0-50kg" : key === "medium" ? "50-100kg" : key === "large" ? "100-150kg" : "150kg+"
        labelJapanese = key === "small" ? "小型" : key === "medium" ? "中型" : key === "large" ? "大型" : "特大"
        break
      case "grade":
        label = `Grade ${key}`
        labelJapanese = key === "Premium" ? "特上" : key === "A" ? "上" : key === "B" ? "並" : key === "C" ? "下" : "普通"
        break
      default:
        label = key
    }

    return {
      key,
      label,
      labelJapanese,
      fish: items,
      totalCount: items.length,
      availableCount: items.filter((f) => f.status === "available" || f.status === "bidding").length,
      weightRange: {
        min: Math.min(...weights),
        max: Math.max(...weights),
      },
    }
  })
}

/**
 * FishDotGrid - Visual grid of selectable fish dots
 *
 * Organizes fish in rows by species (or other grouping),
 * with seat-picker style selection UX.
 */
export function FishDotGrid(props: FishDotGridProps) {
  const {
    fish,
    selectedId,
    onSelect,
    groupBy = "species",
    sortOrder = "desc",
    priceData,
  } = props

  const { themed } = useAppTheme()

  const groups = groupFish(fish, groupBy)

  // Sort groups alphabetically
  groups.sort((a, b) => a.label.localeCompare(b.label))

  return (
    <ScrollView
      style={themed($container)}
      contentContainerStyle={themed($content)}
      showsVerticalScrollIndicator={false}
    >
      {groups.map((group) => {
        // Sort fish within group by weight
        const sortedFish = [...group.fish].sort((a, b) =>
          sortOrder === "desc" ? b.weight - a.weight : a.weight - b.weight
        )

        const prices = priceData?.[group.key]

        return (
          <View key={group.key} style={themed($groupContainer)}>
            <FishRowHeader
              species={group.label}
              speciesJapanese={group.labelJapanese}
              totalCount={group.totalCount}
              availableCount={group.availableCount}
              weightRange={group.weightRange}
              avgPrice={prices?.avg}
              priceChange={prices?.change}
              historicalHigh={prices?.high}
              historicalLow={prices?.low}
            />
            <View style={themed($dotsContainer)}>
              {sortedFish.map((f) => (
                <FishDot
                  key={f.id}
                  id={f.id}
                  weight={f.weight}
                  status={f.status}
                  selected={f.id === selectedId}
                  onPress={onSelect}
                />
              ))}
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.sand200,
})

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.sm,
})

const $groupContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $dotsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
})
