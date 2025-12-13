import { useState, useMemo } from "react"
import { View, ViewStyle, ScrollView, useWindowDimensions } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { FishItem, GroupBy } from "./types"
import { FishDotGrid } from "./FishDotGrid"
import { FishDetailPanel, FishDetailPanelProps } from "./FishDetailPanel"
import { FishPriceTicker, TickerItem } from "./FishPriceTicker"
import { FishTallyBar, TallyItem } from "./FishTallyBar"
import { PriceDriversPanel, PriceDriver } from "./PriceDriversPanel"
import { SuggestedBid } from "./QuickBidPanel"

export interface FishAuctionFloorProps {
  /**
   * All fish available in the auction
   */
  fish: FishItem[]
  /**
   * Initial selected fish ID
   */
  initialSelectedId?: string
  /**
   * Callback when a bid is placed
   */
  onBid?: (fishId: string, amount: number) => void
  /**
   * How to group fish in the grid
   * @default "species"
   */
  groupBy?: GroupBy
  /**
   * Sort order within groups
   * @default "desc"
   */
  sortOrder?: "asc" | "desc"
  /**
   * Price ticker items
   */
  tickerItems?: TickerItem[]
  /**
   * Tally data for supply/demand
   */
  tallyItems?: TallyItem[]
  /**
   * Price drivers data
   */
  priceDrivers?: PriceDriver[]
  /**
   * AI bid suggestions generator
   */
  getBidSuggestions?: (fish: FishItem) => SuggestedBid[]
  /**
   * AI reasoning generator
   */
  getAiReasoning?: (fish: FishItem) => string
  /**
   * Price data for each species
   */
  priceData?: Record<string, { avg: number; change: number; high: number; low: number }>
  /**
   * Price history for detail panel sparkline
   */
  priceHistory?: number[]
  /**
   * Layout mode
   * @default "split"
   */
  layout?: "split" | "stacked" | "compact"
  /**
   * Whether to show the ticker
   * @default true
   */
  showTicker?: boolean
  /**
   * Whether to show the tally bar
   * @default true
   */
  showTally?: boolean
  /**
   * Whether to show price drivers
   * @default true
   */
  showDrivers?: boolean
}

/**
 * FishAuctionFloor - Master-detail auction visualization
 *
 * A chirashi-styled auction floor with:
 * - Real-time price ticker at top
 * - Fish dot grid (seat picker style)
 * - Detail panel for selected fish
 * - Supply/demand tally
 * - Price drivers panel
 */
export function FishAuctionFloor(props: FishAuctionFloorProps) {
  const {
    fish,
    initialSelectedId,
    onBid,
    groupBy = "species",
    sortOrder = "desc",
    tickerItems,
    tallyItems,
    priceDrivers,
    getBidSuggestions,
    getAiReasoning,
    priceData,
    priceHistory,
    layout = "split",
    showTicker = true,
    showTally = true,
    showDrivers = true,
  } = props

  const { themed, theme } = useAppTheme()
  const { width } = useWindowDimensions()
  const isWide = width >= 768

  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId)

  const selectedFish = useMemo(() => {
    return fish.find((f) => f.id === selectedId) ?? null
  }, [fish, selectedId])

  const bidSuggestions = useMemo(() => {
    if (!selectedFish || !getBidSuggestions) return undefined
    return getBidSuggestions(selectedFish)
  }, [selectedFish, getBidSuggestions])

  const aiReasoning = useMemo(() => {
    if (!selectedFish || !getAiReasoning) return undefined
    return getAiReasoning(selectedFish)
  }, [selectedFish, getAiReasoning])

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  const handleBid = (fishId: string, amount: number) => {
    if (onBid) {
      onBid(fishId, amount)
    }
  }

  // Compact layout for smaller screens
  if (layout === "compact" || (!isWide && layout === "split")) {
    return (
      <View style={themed($containerCompact)}>
        {/* Ticker */}
        {showTicker && tickerItems && tickerItems.length > 0 && (
          <FishPriceTicker items={tickerItems} compact />
        )}

        {/* Compact Tally */}
        {showTally && tallyItems && tallyItems.length > 0 && (
          <FishTallyBar items={tallyItems} compact />
        )}

        {/* Compact Drivers */}
        {showDrivers && priceDrivers && priceDrivers.length > 0 && (
          <PriceDriversPanel drivers={priceDrivers} compact />
        )}

        {/* Main Content */}
        <ScrollView style={themed($scrollCompact)} showsVerticalScrollIndicator={false}>
          {/* Selected Fish Detail */}
          {selectedFish && (
            <View style={themed($detailCompact)}>
              <FishDetailPanel
                fish={selectedFish}
                bidSuggestions={bidSuggestions}
                aiReasoning={aiReasoning}
                onBid={handleBid}
                priceHistory={priceHistory}
                marketPrice={priceData?.[selectedFish.species]?.avg}
              />
            </View>
          )}

          {/* Fish Grid */}
          <View style={themed($gridCompact)}>
            <FishDotGrid
              fish={fish}
              selectedId={selectedId}
              onSelect={handleSelect}
              groupBy={groupBy}
              sortOrder={sortOrder}
              priceData={priceData}
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  // Stacked layout
  if (layout === "stacked") {
    return (
      <View style={themed($containerStacked)}>
        {/* Header Section */}
        <View style={themed($headerStacked)}>
          {showTicker && tickerItems && tickerItems.length > 0 && (
            <FishPriceTicker items={tickerItems} />
          )}
        </View>

        {/* Main Scrollable Content */}
        <ScrollView style={themed($scrollStacked)} showsVerticalScrollIndicator={false}>
          {/* Tally Section */}
          {showTally && tallyItems && tallyItems.length > 0 && (
            <View style={themed($sectionStacked)}>
              <FishTallyBar items={tallyItems} />
            </View>
          )}

          {/* Detail Panel */}
          <View style={themed($sectionStacked)}>
            <FishDetailPanel
              fish={selectedFish}
              bidSuggestions={bidSuggestions}
              aiReasoning={aiReasoning}
              onBid={handleBid}
              priceHistory={priceHistory}
              marketPrice={selectedFish ? priceData?.[selectedFish.species]?.avg : undefined}
            />
          </View>

          {/* Fish Grid */}
          <View style={themed($sectionStacked)}>
            <Text text="AUCTION FLOOR 競り場" weight="bold" style={themed($sectionTitle)} />
            <FishDotGrid
              fish={fish}
              selectedId={selectedId}
              onSelect={handleSelect}
              groupBy={groupBy}
              sortOrder={sortOrder}
              priceData={priceData}
            />
          </View>

          {/* Price Drivers */}
          {showDrivers && priceDrivers && priceDrivers.length > 0 && (
            <View style={themed($sectionStacked)}>
              <PriceDriversPanel drivers={priceDrivers} />
            </View>
          )}
        </ScrollView>
      </View>
    )
  }

  // Split layout (default for wide screens)
  return (
    <View style={themed($container)}>
      {/* Top Ticker Bar */}
      {showTicker && tickerItems && tickerItems.length > 0 && (
        <FishPriceTicker items={tickerItems} />
      )}

      {/* Main Split View */}
      <View style={themed($splitContainer)}>
        {/* Left: Grid + Info */}
        <View style={themed($leftPanel)}>
          {/* Tally Bar */}
          {showTally && tallyItems && tallyItems.length > 0 && (
            <View style={themed($tallySection)}>
              <FishTallyBar items={tallyItems} />
            </View>
          )}

          {/* Fish Grid */}
          <View style={themed($gridSection)}>
            <Text text="AUCTION FLOOR 競り場" weight="bold" style={themed($sectionTitle)} />
            <FishDotGrid
              fish={fish}
              selectedId={selectedId}
              onSelect={handleSelect}
              groupBy={groupBy}
              sortOrder={sortOrder}
              priceData={priceData}
            />
          </View>

          {/* Price Drivers */}
          {showDrivers && priceDrivers && priceDrivers.length > 0 && (
            <View style={themed($driversSection)}>
              <PriceDriversPanel drivers={priceDrivers} />
            </View>
          )}
        </View>

        {/* Right: Detail Panel */}
        <View style={themed($rightPanel)}>
          <FishDetailPanel
            fish={selectedFish}
            bidSuggestions={bidSuggestions}
            aiReasoning={aiReasoning}
            onBid={handleBid}
            priceHistory={priceHistory}
            marketPrice={selectedFish ? priceData?.[selectedFish.species]?.avg : undefined}
          />
        </View>
      </View>
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.sand100,
})

const $containerCompact: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.sand900,
})

const $containerStacked: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.sand200,
})

const $splitContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  flexDirection: "row",
})

const $leftPanel: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 2,
  backgroundColor: colors.palette.sand200,
})

const $rightPanel: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flex: 1,
  minWidth: 280,
  maxWidth: 360,
  padding: spacing.sm,
  backgroundColor: colors.palette.sand100,
  borderLeftWidth: 3,
  borderLeftColor: colors.palette.coral500,
})

const $tallySection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.sm,
})

const $gridSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.sm,
})

const $driversSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.sm,
})

const $sectionTitle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  color: colors.palette.sand700,
  fontSize: 14,
  letterSpacing: 1,
  marginBottom: spacing.xs,
})

// Stacked layout styles
const $headerStacked: ThemedStyle<ViewStyle> = () => ({})

const $scrollStacked: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $sectionStacked: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.sm,
})

// Compact layout styles
const $scrollCompact: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $detailCompact: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.sm,
})

const $gridCompact: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
