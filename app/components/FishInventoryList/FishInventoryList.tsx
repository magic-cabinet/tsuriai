import { FlatList, StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { FishCard, FishCardProps } from "../FishCard"
import { Spinner } from "../Spinner"
import { EmptyState } from "../EmptyState"
import { FilterBar } from "../FilterBar"
import { SearchBar } from "../SearchBar"

type FishFilter = "all" | "available" | "sold" | "reserved"
type SortOption = "newest" | "price_low" | "price_high" | "weight"

export interface FishInventoryListProps {
  /**
   * Array of fish items to display
   */
  fish: (Omit<FishCardProps, "onPress"> & { id?: string; status?: "available" | "sold" | "reserved" })[]
  /**
   * Callback when a fish item is pressed
   */
  onFishPress?: (fishId: string, index: number) => void
  /**
   * Whether the list is loading
   */
  loading?: boolean
  /**
   * Whether to show a loading indicator at the bottom (for pagination)
   */
  loadingMore?: boolean
  /**
   * Callback when end of list is reached (for pagination)
   */
  onEndReached?: () => void
  /**
   * Whether to show search bar
   */
  showSearch?: boolean
  /**
   * Search query
   */
  searchQuery?: string
  /**
   * Callback when search query changes
   */
  onSearchChange?: (query: string) => void
  /**
   * Whether to show filter bar
   */
  showFilters?: boolean
  /**
   * Currently active filter
   */
  activeFilter?: FishFilter
  /**
   * Callback when filter changes
   */
  onFilterChange?: (filter: FishFilter) => void
  /**
   * Current sort option
   */
  sortBy?: SortOption
  /**
   * Callback when sort changes
   */
  onSortChange?: (sort: SortOption) => void
  /**
   * Header component
   */
  ListHeaderComponent?: React.ReactElement
  /**
   * Empty state title
   */
  emptyTitle?: string
  /**
   * Empty state description
   */
  emptyDescription?: string
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const FILTER_OPTIONS: { id: FishFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "available", label: "Available" },
  { id: "sold", label: "Sold" },
  { id: "reserved", label: "Reserved" },
]

/**
 * FishInventoryList component for displaying fish inventory.
 * Supports search, filtering, sorting, and pagination.
 *
 * @param {FishInventoryListProps} props - The props for the `FishInventoryList` component.
 * @returns {JSX.Element} The rendered `FishInventoryList` component.
 *
 * @example
 * <FishInventoryList
 *   fish={fishData}
 *   onFishPress={(id) => navigateToFish(id)}
 *   showSearch
 *   showFilters
 *   activeFilter="available"
 * />
 */
export function FishInventoryList(props: FishInventoryListProps) {
  const {
    fish,
    onFishPress,
    loading = false,
    loadingMore = false,
    onEndReached,
    showSearch = false,
    searchQuery = "",
    onSearchChange,
    showFilters = false,
    activeFilter = "all",
    onFilterChange,
    sortBy,
    onSortChange,
    ListHeaderComponent,
    emptyTitle = "No fish in inventory",
    emptyDescription = "Add fish to your inventory to see them here",
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const renderItem = ({ item, index }: { item: typeof fish[0]; index: number }) => {
    const fishId = item.id || `fish-${index}`
    return (
      <View style={themed($listItem)}>
        <FishCard
          {...item}
          onPress={onFishPress ? () => onFishPress(fishId, index) : undefined}
        />
        {item.status && item.status !== "available" && (
          <View style={themed($statusOverlay)}>
            <Text
              text={item.status === "sold" ? "SOLD" : "RESERVED"}
              size="sm"
              weight="bold"
              style={themed($statusText)}
            />
          </View>
        )}
      </View>
    )
  }

  const renderSeparator = () => <View style={themed($separator)} />

  const renderFooter = () => {
    if (!loadingMore) return null
    return (
      <View style={themed($footer)}>
        <Spinner size="sm" />
      </View>
    )
  }

  const renderEmpty = () => {
    if (loading) return null
    return (
      <EmptyState
        heading={emptyTitle}
        content={emptyDescription}
        style={themed($emptyState)}
      />
    )
  }

  const renderHeader = () => {
    return (
      <View>
        {ListHeaderComponent}

        {showSearch && (
          <View style={themed($searchContainer)}>
            <SearchBar
              value={searchQuery}
              onChangeText={onSearchChange || (() => {})}
              placeholder="Search fish..."
            />
          </View>
        )}

        {showFilters && (
          <View style={themed($filterContainer)}>
            <FilterBar
              filters={FILTER_OPTIONS}
              selectedFilters={[activeFilter]}
              onFilterChange={(filters) => {
                if (onFilterChange && filters.length > 0) {
                  onFilterChange(filters[0] as FishFilter)
                }
              }}
              multiSelect={false}
            />
          </View>
        )}

        {/* Summary stats */}
        <View style={themed($summaryContainer)}>
          <View style={themed($summaryItem)}>
            <Text text={fish.length.toString()} preset="bold" style={themed($summaryValue)} />
            <Text text="Total" size="xs" style={themed($summaryLabel)} />
          </View>
          <View style={themed($summaryDivider)} />
          <View style={themed($summaryItem)}>
            <Text
              text={fish.filter((f) => f.status !== "sold").length.toString()}
              preset="bold"
              style={themed($summaryValueAvailable)}
            />
            <Text text="Available" size="xs" style={themed($summaryLabel)} />
          </View>
          <View style={themed($summaryDivider)} />
          <View style={themed($summaryItem)}>
            <Text
              text={`${fish.reduce((sum, f) => sum + f.weight, 0).toFixed(1)} kg`}
              preset="bold"
              style={themed($summaryValue)}
            />
            <Text text="Total Weight" size="xs" style={themed($summaryLabel)} />
          </View>
        </View>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={[themed($loadingContainer), $styleOverride]}>
        <Spinner size="lg" />
        <Text text="Loading inventory..." size="sm" style={themed($loadingText)} />
      </View>
    )
  }

  return (
    <FlatList
      data={fish}
      keyExtractor={(item, index) => item.id || `fish-${index}`}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      style={$styleOverride}
      contentContainerStyle={[
        themed($contentContainer),
        fish.length === 0 && themed($emptyContainer),
      ]}
    />
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.lg,
})

const $separator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.sm,
})

const $listItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  position: "relative",
})

const $statusOverlay: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: 16,
})

const $statusText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  letterSpacing: 2,
})

const $footer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.md,
  alignItems: "center",
})

const $loadingContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: spacing.xxl,
  gap: spacing.md,
})

const $loadingText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $emptyState: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
})

const $emptyContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $searchContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingTop: spacing.sm,
})

const $filterContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
})

const $summaryContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  paddingVertical: spacing.md,
  marginHorizontal: spacing.md,
  marginBottom: spacing.sm,
  backgroundColor: colors.palette.sand200,
  borderRadius: 12,
})

const $summaryItem: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

const $summaryValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
  fontSize: 18,
})

const $summaryValueAvailable: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.seafoam500,
  fontSize: 18,
})

const $summaryLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $summaryDivider: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 1,
  height: 30,
  backgroundColor: colors.palette.sand400,
})
