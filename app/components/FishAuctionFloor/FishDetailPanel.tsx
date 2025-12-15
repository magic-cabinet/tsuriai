import { View, ViewStyle, TextStyle, Image, ImageSourcePropType } from "react-native"

import { Text } from "@/components/Text"
import { Icon } from "@/components/Icon"
import { CountdownTimer } from "@/components/CountdownTimer"
import { Button } from "@/components/Button"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { FishItem, FishGrade, FishFreshness } from "./types"
import { QuickBidPanel, SuggestedBid } from "./QuickBidPanel"

export interface FishDetailPanelProps {
  /**
   * Selected fish data
   */
  fish: FishItem | null
  /**
   * AI-generated bid suggestions
   */
  bidSuggestions?: SuggestedBid[]
  /**
   * AI reasoning for suggestions
   */
  aiReasoning?: string
  /**
   * Callback when bid is placed
   */
  onBid?: (fishId: string, amount: number) => void
  /**
   * Historical price data for sparkline
   */
  priceHistory?: number[]
  /**
   * Market average price
   */
  marketPrice?: number
}

// Grade to color mapping
const GRADE_COLORS: Record<FishGrade, { bg: string; text: string }> = {
  Premium: { bg: "sunset100", text: "sunset500" },
  A: { bg: "seafoam100", text: "seafoam500" },
  B: { bg: "ocean100", text: "ocean500" },
  C: { bg: "sand200", text: "sand600" },
  Standard: { bg: "sand200", text: "sand600" },
}

// Freshness to color mapping
const FRESHNESS_COLORS: Record<FishFreshness, { bg: string; text: string; label: string }> = {
  live: { bg: "seafoam100", text: "seafoam500", label: "活" },
  fresh: { bg: "ocean100", text: "ocean500", label: "鮮" },
  frozen: { bg: "sand200", text: "sand600", label: "凍" },
  processed: { bg: "sunset100", text: "sunset500", label: "加" },
}

/**
 * FishDetailPanel - Ultra-compressed chirashi detail view
 *
 * Maximum information density with:
 * - Compact header with all key stats
 * - Price burst with comparison
 * - AI quick bid suggestions
 * - Mini sparkline for price history
 */
export function FishDetailPanel(props: FishDetailPanelProps) {
  const {
    fish,
    bidSuggestions,
    aiReasoning,
    onBid,
    priceHistory,
    marketPrice,
  } = props

  const { themed, theme } = useAppTheme()

  if (!fish) {
    return (
      <View style={themed($emptyContainer)}>
        <Icon icon="components" size={48} color={theme.colors.palette.sand300} />
        <Text text="魚を選択してください" size="sm" style={themed($emptyText)} />
        <Text text="Select a fish" size="xs" style={themed($emptyTextEn)} />
      </View>
    )
  }

  const gradeColor = GRADE_COLORS[fish.grade]
  const freshnessColor = FRESHNESS_COLORS[fish.freshness]
  const totalPrice = fish.pricePerKg * fish.weight
  const hasAuction = fish.auctionEndDate !== undefined

  return (
    <View style={themed($container)}>
      {/* HEADER BAR - Species + Status */}
      <View style={themed($headerBar)}>
        <View style={themed($speciesBlock)}>
          {fish.speciesJapanese ? (
            <Text text={fish.speciesJapanese} weight="bold" style={themed($speciesText)} />
          ) : (
            <Text text={fish.species.toUpperCase()} weight="bold" style={themed($speciesText)} />
          )}
          <Text text={fish.species.toUpperCase()} style={themed($speciesEn)} />
        </View>
        <View style={themed($statusBadges)}>
          <View style={[themed($badge), { backgroundColor: theme.colors.palette[gradeColor.bg as keyof typeof theme.colors.palette] }]}>
            <Text text={fish.grade} size="xxs" weight="bold" style={{ color: theme.colors.palette[gradeColor.text as keyof typeof theme.colors.palette] }} />
          </View>
          <View style={[themed($badge), { backgroundColor: theme.colors.palette[freshnessColor.bg as keyof typeof theme.colors.palette] }]}>
            <Text text={freshnessColor.label} size="xxs" weight="bold" style={{ color: theme.colors.palette[freshnessColor.text as keyof typeof theme.colors.palette] }} />
          </View>
        </View>
      </View>

      {/* COMPACT INFO GRID */}
      <View style={themed($infoGrid)}>
        {/* Weight */}
        <View style={themed($infoCell)}>
          <Text text="WT" size="xxs" style={themed($infoLabel)} />
          <Text text={`${fish.weight}kg`} size="sm" weight="bold" style={themed($infoValue)} />
        </View>
        {/* Price/kg */}
        <View style={themed($infoCell)}>
          <Text text="¥/kg" size="xxs" style={themed($infoLabel)} />
          <Text text={`${fish.pricePerKg.toLocaleString()}`} size="sm" weight="bold" style={themed($infoValue)} />
        </View>
        {/* Origin */}
        {fish.origin && (
          <View style={themed($infoCell)}>
            <Text text="FROM" size="xxs" style={themed($infoLabel)} />
            <Text text={fish.origin} size="xs" weight="medium" style={themed($infoValue)} numberOfLines={1} />
          </View>
        )}
        {/* Catch Date */}
        {fish.catchDate && (
          <View style={themed($infoCell)}>
            <Text text="CATCH" size="xxs" style={themed($infoLabel)} />
            <Text text={formatDate(fish.catchDate)} size="xs" weight="medium" style={themed($infoValue)} />
          </View>
        )}
      </View>

      {/* PRICE BURST */}
      <View style={themed($priceBurst)}>
        <View style={themed($priceMain)}>
          <Text text="¥" size="sm" weight="bold" style={themed($currencySymbol)} />
          <Text text={totalPrice.toLocaleString()} weight="bold" style={themed($priceText)} />
          <Text text="TOTAL" size="xxs" weight="bold" style={themed($priceLabel)} />
        </View>
        {fish.currentBid !== undefined && (
          <View style={themed($bidRow)}>
            <Text text="Current:" size="xxs" style={themed($bidLabel)} />
            <Text text={`¥${fish.currentBid.toLocaleString()}`} size="sm" weight="bold" style={themed($bidAmount)} />
            {fish.bidCount !== undefined && (
              <Text text={`(${fish.bidCount} bids)`} size="xxs" style={themed($bidCount)} />
            )}
          </View>
        )}
      </View>

      {/* COUNTDOWN TIMER */}
      {hasAuction && fish.auctionEndDate && (
        <View style={themed($timerRow)}>
          <CountdownTimer targetDate={fish.auctionEndDate} size="small" />
        </View>
      )}

      {/* SPARKLINE (if price history available) */}
      {priceHistory && priceHistory.length > 1 && (
        <View style={themed($sparklineContainer)}>
          <Text text="PRICE TREND" size="xxs" style={themed($sparklineLabel)} />
          <Sparkline data={priceHistory} />
        </View>
      )}

      {/* QUICK BID PANEL */}
      {bidSuggestions && bidSuggestions.length > 0 && onBid && (
        <QuickBidPanel
          marketPrice={marketPrice ?? fish.pricePerKg}
          suggestions={bidSuggestions}
          currentBid={fish.currentBid}
          onQuickBid={(amount) => onBid(fish.id, amount)}
          aiConfidence={85}
          aiReasoning={aiReasoning}
        />
      )}

      {/* SIMPLE BID BUTTON (fallback) */}
      {(!bidSuggestions || bidSuggestions.length === 0) && onBid && (
        <Button
          text={`BID ON ${fish.species.toUpperCase()}`}
          preset="reversed"
          onPress={() => onBid(fish.id, fish.currentBid ?? totalPrice)}
          style={themed($bidButton)}
        />
      )}
    </View>
  )
}

// Simple sparkline component
function Sparkline({ data }: { data: number[] }) {
  const { themed, theme } = useAppTheme()
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const height = 24
  const width = 100

  return (
    <View style={[themed($sparkline), { width, height }]}>
      {data.map((value, i) => {
        const barHeight = ((value - min) / range) * height
        const isLast = i === data.length - 1
        return (
          <View
            key={i}
            style={{
              width: width / data.length - 1,
              height: barHeight,
              backgroundColor: isLast
                ? theme.colors.palette.coral500
                : theme.colors.palette.ocean300,
              alignSelf: "flex-end",
            }}
          />
        )
      })}
    </View>
  )
}

function formatDate(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.sand100,
  borderRadius: spacing.sm,
  borderWidth: 3,
  borderColor: colors.palette.coral500,
  overflow: "hidden",
})

const $emptyContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.sand200,
  borderRadius: spacing.sm,
  padding: spacing.xl,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: colors.palette.sand300,
  borderStyle: "dashed",
})

const $emptyText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  marginTop: 8,
})

const $emptyTextEn: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $headerBar: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.palette.coral500,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
})

const $speciesBlock: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "baseline",
  gap: 6,
})

const $speciesText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontSize: 16,
  letterSpacing: 1,
})

const $speciesEn: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand200,
  fontSize: 12,
})

const $statusBadges: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xxs,
})

const $badge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xs,
  paddingVertical: spacing.xxxs,
  borderRadius: 4,
})

const $infoGrid: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  padding: spacing.xs,
  backgroundColor: colors.palette.sand200,
  borderBottomWidth: 2,
  borderBottomColor: colors.palette.sand300,
})

const $infoCell: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "50%",
  paddingVertical: spacing.xxxs,
  paddingHorizontal: spacing.xxs,
})

const $infoLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  letterSpacing: 1,
})

const $infoValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $priceBurst: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.sunset100,
  borderWidth: 3,
  borderColor: colors.palette.sunset500,
  margin: spacing.xs,
  padding: spacing.sm,
  borderRadius: spacing.xs,
})

const $priceMain: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "baseline",
  justifyContent: "center",
})

const $currencySymbol: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
})

const $priceText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
  fontSize: 32,
  lineHeight: 36,
  textShadowColor: colors.palette.coral200,
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 0,
})

const $priceLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sunset500,
  marginLeft: 4,
})

const $bidRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.xxs,
  marginTop: spacing.xxs,
})

const $bidLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $bidAmount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
})

const $bidCount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $timerRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  paddingVertical: spacing.xs,
})

const $sparklineContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $sparklineLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  letterSpacing: 1,
  marginBottom: 4,
})

const $sparkline: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: 1,
  alignItems: "flex-end",
})

const $bidButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  margin: spacing.sm,
})
