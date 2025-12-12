import { FlatList, StyleProp, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { AuctionCard, AuctionCardProps } from "../AuctionCard"
import { Spinner } from "../Spinner"
import { EmptyState } from "../EmptyState"
import { FilterBar } from "../FilterBar"

type AuctionFilter = "all" | "active" | "ending_soon" | "upcoming" | "ended"

export interface AuctionListProps {
  /**
   * Array of auction items to display
   */
  auctions: Omit<AuctionCardProps, "onPress" | "onToggleWatch">[]
  /**
   * Callback when an auction item is pressed
   */
  onAuctionPress?: (auctionId: string, index: number) => void
  /**
   * Callback when watch button is toggled
   */
  onToggleWatch?: (auctionId: string, index: number) => void
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
   * Whether to show filter bar
   */
  showFilters?: boolean
  /**
   * Currently active filter
   */
  activeFilter?: AuctionFilter
  /**
   * Callback when filter changes
   */
  onFilterChange?: (filter: AuctionFilter) => void
  /**
   * Number of columns for grid layout
   * @default 1
   */
  numColumns?: 1 | 2
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

const FILTER_OPTIONS: { id: AuctionFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "ending_soon", label: "Ending Soon" },
  { id: "upcoming", label: "Upcoming" },
  { id: "ended", label: "Ended" },
]

/**
 * AuctionList component for displaying a list of auctions.
 * Supports filtering, pagination, grid/list layouts, and empty states.
 *
 * @param {AuctionListProps} props - The props for the `AuctionList` component.
 * @returns {JSX.Element} The rendered `AuctionList` component.
 *
 * @example
 * <AuctionList
 *   auctions={auctionData}
 *   onAuctionPress={(id) => navigateToAuction(id)}
 *   onToggleWatch={(id) => toggleWatchlist(id)}
 *   showFilters
 *   activeFilter="active"
 *   onFilterChange={setFilter}
 * />
 */
export function AuctionList(props: AuctionListProps) {
  const {
    auctions,
    onAuctionPress,
    onToggleWatch,
    loading = false,
    loadingMore = false,
    onEndReached,
    showFilters = false,
    activeFilter = "all",
    onFilterChange,
    numColumns = 1,
    ListHeaderComponent,
    emptyTitle = "No auctions found",
    emptyDescription = "Check back later for new listings",
    style: $styleOverride,
  } = props

  const { themed } = useAppTheme()

  const renderItem = ({ item, index }: { item: Omit<AuctionCardProps, "onPress" | "onToggleWatch">; index: number }) => {
    const auctionId = `auction-${index}`
    return (
      <View style={numColumns === 2 ? themed($gridItem) : themed($listItem)}>
        <AuctionCard
          {...item}
          onPress={onAuctionPress ? () => onAuctionPress(auctionId, index) : undefined}
          onToggleWatch={onToggleWatch ? () => onToggleWatch(auctionId, index) : undefined}
        />
      </View>
    )
  }

  const renderSeparator = () => {
    if (numColumns === 2) return null
    return <View style={themed($separator)} />
  }

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
        {showFilters && (
          <View style={themed($filterContainer)}>
            <FilterBar
              filters={FILTER_OPTIONS}
              selectedFilters={[activeFilter]}
              onFilterChange={(filters) => {
                if (onFilterChange && filters.length > 0) {
                  onFilterChange(filters[0] as AuctionFilter)
                }
              }}
              multiSelect={false}
            />
          </View>
        )}
      </View>
    )
  }

  if (loading) {
    return (
      <View style={[themed($loadingContainer), $styleOverride]}>
        <Spinner size="lg" />
        <Text text="Loading auctions..." size="sm" style={themed($loadingText)} />
      </View>
    )
  }

  return (
    <FlatList
      data={auctions}
      keyExtractor={(_, index) => `auction-${index}`}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      numColumns={numColumns}
      key={numColumns} // Force re-render when columns change
      style={$styleOverride}
      contentContainerStyle={[
        themed($contentContainer),
        auctions.length === 0 && themed($emptyContainer),
      ]}
      columnWrapperStyle={numColumns === 2 ? themed($columnWrapper) : undefined}
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
  height: spacing.md,
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

const $loadingText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $emptyState: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
})

const $emptyContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $filterContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
})

const $listItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
})

const $gridItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.xs,
})

const $columnWrapper: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.sm,
  gap: spacing.sm,
})
