import { View, ViewStyle, TextStyle } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface TallyItem {
  species: string
  speciesJapanese?: string
  supply: number // kg available
  demand: number // kg requested/bid on
  avgPrice: number
  priceChange: number // percentage
}

export interface FishTallyBarProps {
  /**
   * Tally data for each species
   */
  items: TallyItem[]
  /**
   * Whether to show in compact single-row mode
   */
  compact?: boolean
}

/**
 * FishTallyBar - Compact supply/demand tally display
 *
 * Shows at-a-glance:
 * - Supply vs Demand ratio bars
 * - Price trends
 * - Forecasting indicators (oversupply/undersupply)
 */
export function FishTallyBar(props: FishTallyBarProps) {
  const { items, compact = false } = props
  const { themed, theme } = useAppTheme()

  if (compact) {
    return (
      <View style={themed($compactContainer)}>
        {items.map((item) => (
          <CompactTallyItem key={item.species} item={item} />
        ))}
      </View>
    )
  }

  return (
    <View style={themed($container)}>
      <View style={themed($header)}>
        <Text text="市場集計 MARKET TALLY" weight="bold" style={themed($headerText)} />
        <View style={themed($legend)}>
          <View style={themed($legendItem)}>
            <View style={[themed($legendDot), { backgroundColor: theme.colors.palette.seafoam400 }]} />
            <Text text="Supply" size="xxs" style={themed($legendText)} />
          </View>
          <View style={themed($legendItem)}>
            <View style={[themed($legendDot), { backgroundColor: theme.colors.palette.coral400 }]} />
            <Text text="Demand" size="xxs" style={themed($legendText)} />
          </View>
        </View>
      </View>
      <View style={themed($tallyGrid)}>
        {items.map((item) => (
          <TallyItemRow key={item.species} item={item} />
        ))}
      </View>
    </View>
  )
}

function CompactTallyItem({ item }: { item: TallyItem }) {
  const { themed, theme } = useAppTheme()
  const ratio = item.supply > 0 ? item.demand / item.supply : 0
  const isOversupply = ratio < 0.7
  const isUndersupply = ratio > 1.2
  const isBalanced = !isOversupply && !isUndersupply

  return (
    <View style={themed($compactItem)}>
      <Text text={item.species.slice(0, 3).toUpperCase()} size="xxs" weight="bold" style={themed($compactSpecies)} />
      <View
        style={[
          themed($compactIndicator),
          isOversupply && { backgroundColor: theme.colors.palette.seafoam400 },
          isUndersupply && { backgroundColor: theme.colors.palette.coral400 },
          isBalanced && { backgroundColor: theme.colors.palette.ocean400 },
        ]}
      >
        <Text
          text={ratio.toFixed(1)}
          size="xxs"
          weight="bold"
          style={themed($compactRatio)}
        />
      </View>
      <Text
        text={item.priceChange > 0 ? "▲" : item.priceChange < 0 ? "▼" : "–"}
        size="xxs"
        style={{
          color: item.priceChange > 0
            ? theme.colors.palette.coral500
            : item.priceChange < 0
            ? theme.colors.palette.seafoam500
            : theme.colors.palette.sand500,
        }}
      />
    </View>
  )
}

function TallyItemRow({ item }: { item: TallyItem }) {
  const { themed, theme } = useAppTheme()
  const maxValue = Math.max(item.supply, item.demand)
  const supplyWidth = maxValue > 0 ? (item.supply / maxValue) * 100 : 0
  const demandWidth = maxValue > 0 ? (item.demand / maxValue) * 100 : 0

  const ratio = item.supply > 0 ? item.demand / item.supply : 0
  const forecast = ratio < 0.7 ? "OVERSUPPLY" : ratio > 1.2 ? "SHORTAGE" : "BALANCED"
  const forecastColor = ratio < 0.7 ? "seafoam500" : ratio > 1.2 ? "coral500" : "ocean500"

  return (
    <View style={themed($tallyRow)}>
      {/* Species */}
      <View style={themed($speciesCol)}>
        {item.speciesJapanese ? (
          <Text text={item.speciesJapanese} size="xs" weight="bold" style={themed($speciesName)} numberOfLines={1} />
        ) : (
          <Text text={item.species} size="xs" weight="bold" style={themed($speciesName)} numberOfLines={1} />
        )}
        <Text text={item.species} size="xxs" style={themed($speciesEn)} numberOfLines={1} />
      </View>

      {/* Bar Chart */}
      <View style={themed($barCol)}>
        <View style={themed($barContainer)}>
          <View style={[themed($supplyBar), { width: `${supplyWidth}%` }]} />
        </View>
        <View style={themed($barContainer)}>
          <View style={[themed($demandBar), { width: `${demandWidth}%` }]} />
        </View>
      </View>

      {/* Values */}
      <View style={themed($valuesCol)}>
        <Text text={`${item.supply.toLocaleString()}kg`} size="xxs" style={themed($supplyText)} />
        <Text text={`${item.demand.toLocaleString()}kg`} size="xxs" style={themed($demandText)} />
      </View>

      {/* Forecast */}
      <View style={themed($forecastCol)}>
        <View style={[themed($forecastBadge), { backgroundColor: theme.colors.palette[`${forecastColor.replace("500", "100")}` as keyof typeof theme.colors.palette] }]}>
          <Text
            text={forecast}
            size="xxs"
            weight="bold"
            style={{ color: theme.colors.palette[forecastColor as keyof typeof theme.colors.palette] }}
          />
        </View>
        <View style={themed($priceChange)}>
          <Text
            text={item.priceChange > 0 ? "▲" : item.priceChange < 0 ? "▼" : "–"}
            size="xxs"
            style={{
              color: item.priceChange > 0
                ? theme.colors.palette.coral500
                : item.priceChange < 0
                ? theme.colors.palette.seafoam500
                : theme.colors.palette.sand500,
            }}
          />
          <Text
            text={`${item.priceChange > 0 ? "+" : ""}${item.priceChange.toFixed(1)}%`}
            size="xxs"
            weight="bold"
            style={{
              color: item.priceChange > 0
                ? theme.colors.palette.coral500
                : item.priceChange < 0
                ? theme.colors.palette.seafoam500
                : theme.colors.palette.sand500,
            }}
          />
        </View>
      </View>
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.sand100,
  borderRadius: spacing.sm,
  borderWidth: 2,
  borderColor: colors.palette.ocean500,
  overflow: "hidden",
})

const $compactContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  backgroundColor: colors.palette.sand900,
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.xs,
  gap: spacing.sm,
})

const $compactItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $compactSpecies: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $compactIndicator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xxs,
  paddingVertical: spacing.xxxs,
  borderRadius: 3,
})

const $compactRatio: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.palette.ocean500,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
})

const $headerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontSize: 12,
  letterSpacing: 1,
})

const $legend: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $legendItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $legendDot: ThemedStyle<ViewStyle> = () => ({
  width: 8,
  height: 8,
  borderRadius: 4,
})

const $legendText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand200,
})

const $tallyGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
  gap: spacing.xs,
})

const $tallyRow: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  paddingVertical: spacing.xxs,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.sand200,
})

const $speciesCol: ThemedStyle<ViewStyle> = () => ({
  width: 60,
})

const $speciesName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $speciesEn: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $barCol: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxxs,
})

const $barContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 6,
  backgroundColor: colors.palette.sand200,
  borderRadius: 3,
  overflow: "hidden",
})

const $supplyBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: "100%",
  backgroundColor: colors.palette.seafoam400,
  borderRadius: 3,
})

const $demandBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: "100%",
  backgroundColor: colors.palette.coral400,
  borderRadius: 3,
})

const $valuesCol: ThemedStyle<ViewStyle> = () => ({
  width: 50,
  alignItems: "flex-end",
})

const $supplyText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.seafoam500,
})

const $demandText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
})

const $forecastCol: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 70,
  alignItems: "flex-end",
  gap: spacing.xxxs,
})

const $forecastBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xxs,
  paddingVertical: spacing.xxxs,
  borderRadius: 3,
})

const $priceChange: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxxs,
})
