import { useState } from "react"
import { ScrollView, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Tabs } from "../Tabs"
import { AuctionList } from "../AuctionList"
import { BidList } from "../BidList"
import { FilterBar } from "../FilterBar"
import { SearchBar } from "../SearchBar"
import { StatCard } from "../StatCard"
import { AuctionCardProps } from "../AuctionCard"
import { BidListItemProps } from "../BidListItem"

type BoardTab = "auctions" | "my_bids" | "watching" | "won"

export interface AuctionBoardProps {
  /**
   * All auctions
   */
  auctions: Omit<AuctionCardProps, "onPress" | "onToggleWatch">[]
  /**
   * User's bids
   */
  myBids?: Omit<BidListItemProps, "onPress">[]
  /**
   * Watched auctions
   */
  watchedAuctions?: Omit<AuctionCardProps, "onPress" | "onToggleWatch">[]
  /**
   * Won auctions
   */
  wonAuctions?: Omit<AuctionCardProps, "onPress" | "onToggleWatch">[]
  /**
   * Currently active tab
   */
  activeTab?: BoardTab
  /**
   * Callback when tab changes
   */
  onTabChange?: (tab: BoardTab) => void
  /**
   * Callback when auction is pressed
   */
  onAuctionPress?: (auctionId: string, index: number) => void
  /**
   * Callback when bid is pressed
   */
  onBidPress?: (bidId: string, index: number) => void
  /**
   * Callback when watch is toggled
   */
  onToggleWatch?: (auctionId: string, index: number) => void
  /**
   * Whether data is loading
   */
  loading?: boolean
  /**
   * Total active bids count
   */
  activeBidsCount?: number
  /**
   * Total won auctions count
   */
  wonCount?: number
  /**
   * Total watching count
   */
  watchingCount?: number
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const BOARD_TABS = [
  { key: "auctions", label: "All Auctions" },
  { key: "my_bids", label: "My Bids" },
  { key: "watching", label: "Watching" },
  { key: "won", label: "Won" },
]

/**
 * AuctionBoard component - main dashboard for browsing auctions and managing bids.
 *
 * @param {AuctionBoardProps} props - The props for the `AuctionBoard` component.
 * @returns {JSX.Element} The rendered `AuctionBoard` component.
 */
export function AuctionBoard(props: AuctionBoardProps) {
  const {
    auctions,
    myBids = [],
    watchedAuctions = [],
    wonAuctions = [],
    activeTab: controlledTab,
    onTabChange,
    onAuctionPress,
    onBidPress,
    onToggleWatch,
    loading = false,
    activeBidsCount,
    wonCount,
    watchingCount,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()
  const [internalTab, setInternalTab] = useState<BoardTab>("auctions")

  const activeTab = controlledTab ?? internalTab
  const handleTabChange = (tab: string) => {
    const boardTab = tab as BoardTab
    if (onTabChange) {
      onTabChange(boardTab)
    } else {
      setInternalTab(boardTab)
    }
  }

  // Stats for header
  const stats = {
    activeBids: activeBidsCount ?? myBids.filter((b) => b.status === "winning" || b.status === "pending").length,
    watching: watchingCount ?? watchedAuctions.length,
    won: wonCount ?? wonAuctions.length,
  }

  const renderContent = () => {
    switch (activeTab) {
      case "auctions":
        return (
          <AuctionList
            auctions={auctions}
            onAuctionPress={onAuctionPress}
            onToggleWatch={onToggleWatch}
            loading={loading}
            showFilters
            emptyTitle="No auctions available"
            emptyDescription="Check back later for new listings"
          />
        )
      case "my_bids":
        return (
          <BidList
            bids={myBids}
            onBidPress={onBidPress}
            loading={loading}
            groupByDate
            emptyTitle="No bids yet"
            emptyDescription="Start bidding on auctions to see your bids here"
          />
        )
      case "watching":
        return (
          <AuctionList
            auctions={watchedAuctions}
            onAuctionPress={onAuctionPress}
            onToggleWatch={onToggleWatch}
            loading={loading}
            emptyTitle="Not watching any auctions"
            emptyDescription="Tap the heart icon on auctions to add them to your watchlist"
          />
        )
      case "won":
        return (
          <AuctionList
            auctions={wonAuctions}
            onAuctionPress={onAuctionPress}
            loading={loading}
            emptyTitle="No won auctions"
            emptyDescription="Auctions you win will appear here"
          />
        )
      default:
        return null
    }
  }

  return (
    <View style={[themed($container), $styleOverride]}>
      {/* Stats Header */}
      <View style={themed($statsHeader)}>
        <StatCard
          label="Active Bids"
          value={stats.activeBids.toString()}
          trend={stats.activeBids > 0 ? "up" : undefined}
          style={themed($statCard)}
        />
        <StatCard
          label="Watching"
          value={stats.watching.toString()}
          style={themed($statCard)}
        />
        <StatCard
          label="Won"
          value={stats.won.toString()}
          trend={stats.won > 0 ? "up" : undefined}
          style={themed($statCard)}
        />
      </View>

      {/* Tabs */}
      <View style={themed($tabsContainer)}>
        <Tabs
          tabs={BOARD_TABS}
          activeKey={activeTab}
          onChange={handleTabChange}
          variant="pills"
        />
      </View>

      {/* Content */}
      <View style={themed($content)}>
        {renderContent()}
      </View>
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $statsHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  gap: spacing.sm,
})

const $statCard: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $tabsContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingHorizontal: spacing.md,
  paddingBottom: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.sand300,
})

const $content: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
