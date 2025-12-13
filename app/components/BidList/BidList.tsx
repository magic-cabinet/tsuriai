import { FlatList, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { BidListItem, BidListItemProps } from "../BidListItem"
import { Spinner } from "../Spinner"
import { EmptyState } from "../EmptyState"

export interface BidListProps {
  /**
   * Array of bid items to display
   */
  bids: Omit<BidListItemProps, "onPress">[]
  /**
   * Callback when a bid item is pressed
   */
  onBidPress?: (bidId: string, index: number) => void
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
   * Header component
   */
  ListHeaderComponent?: React.ReactElement
  /**
   * Whether to show section headers (group by date)
   */
  groupByDate?: boolean
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

/**
 * BidList component for displaying a list of bids.
 * Supports pagination, loading states, and empty states.
 *
 * @param {BidListProps} props - The props for the `BidList` component.
 * @returns {JSX.Element} The rendered `BidList` component.
 *
 * @example
 * <BidList
 *   bids={[
 *     { id: "1", amount: 1500, bidderName: "John", status: "winning", timestamp: new Date() },
 *     { id: "2", amount: 1400, bidderName: "Jane", status: "outbid", timestamp: new Date() },
 *   ]}
 *   onBidPress={(id) => handleBidPress(id)}
 *   loading={false}
 * />
 */
export function BidList(props: BidListProps) {
  const {
    bids,
    onBidPress,
    loading = false,
    loadingMore = false,
    onEndReached,
    ListHeaderComponent,
    groupByDate = false,
    emptyTitle = "No bids yet",
    emptyDescription = "Be the first to place a bid on this item",
    style: $styleOverride,
  } = props

  const { themed } = useAppTheme()

  const renderItem = ({ item, index }: { item: Omit<BidListItemProps, "onPress">; index: number }) => (
    <BidListItem
      {...item}
      onPress={onBidPress ? () => onBidPress(`bid-${index}`, index) : undefined}
    />
  )

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

  if (loading) {
    return (
      <View style={[themed($loadingContainer), $styleOverride]}>
        <Spinner size="lg" />
        <Text text="Loading bids..." size="sm" style={themed($loadingText)} />
      </View>
    )
  }

  // Group bids by date if enabled
  const groupedBids = groupByDate ? groupBidsByDate(bids) : null

  if (groupByDate && groupedBids) {
    return (
      <FlatList
        data={groupedBids}
        keyExtractor={(item) => item.title}
        renderItem={({ item: group }) => (
          <View>
            <View style={themed($sectionHeader)}>
              <Text text={group.title} size="xs" weight="medium" style={themed($sectionTitle)} />
            </View>
            {group.data.map((bid, index) => (
              <View key={`bid-${index}`}>
                {renderItem({ item: bid, index })}
                {index < group.data.length - 1 && renderSeparator()}
              </View>
            ))}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={themed($groupSeparator)} />}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        style={$styleOverride}
        contentContainerStyle={bids.length === 0 ? themed($emptyContainer) : undefined}
      />
    )
  }

  return (
    <FlatList
      data={bids}
      keyExtractor={(_, index) => `bid-${index}`}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      style={$styleOverride}
      contentContainerStyle={bids.length === 0 ? themed($emptyContainer) : undefined}
    />
  )
}

// Helper to group bids by date
function groupBidsByDate(bids: Omit<BidListItemProps, "onPress">[]) {
  const groups: { title: string; data: Omit<BidListItemProps, "onPress">[] }[] = []
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const formatDate = (date: Date) => {
    if (isSameDay(date, today)) return "Today"
    if (isSameDay(date, yesterday)) return "Yesterday"
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()

  bids.forEach((bid) => {
    const dateStr = formatDate(bid.timestamp)
    const existingGroup = groups.find((g) => g.title === dateStr)
    if (existingGroup) {
      existingGroup.data.push(bid)
    } else {
      groups.push({ title: dateStr, data: [bid] })
    }
  })

  return groups
}

// =============================================================================
// STYLES
// =============================================================================

const $separator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 1,
  backgroundColor: colors.palette.sand200,
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

const $sectionHeader: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  backgroundColor: colors.palette.sand100,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
  textTransform: "uppercase",
  letterSpacing: 1,
})

const $groupSeparator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: spacing.sm,
})
