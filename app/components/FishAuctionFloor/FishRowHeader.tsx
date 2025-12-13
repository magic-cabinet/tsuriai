import { View, ViewStyle, TextStyle } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface FishRowHeaderProps {
  /**
   * Species name in English
   */
  species: string
  /**
   * Species name in Japanese
   */
  speciesJapanese?: string
  /**
   * Total count of fish in this row
   */
  totalCount: number
  /**
   * Available count
   */
  availableCount: number
  /**
   * Weight range in kg
   */
  weightRange: { min: number; max: number }
  /**
   * Current average price per kg
   */
  avgPrice?: number
  /**
   * Price change percentage (positive = up, negative = down)
   */
  priceChange?: number
  /**
   * Historical high price
   */
  historicalHigh?: number
  /**
   * Historical low price
   */
  historicalLow?: number
}

/**
 * FishRowHeader - Chirashi-styled row header with price ticker
 *
 * Shows species info, availability, and real-time price data
 * like a trading terminal ticker.
 */
export function FishRowHeader(props: FishRowHeaderProps) {
  const {
    species,
    speciesJapanese,
    totalCount,
    availableCount,
    weightRange,
    avgPrice,
    priceChange,
    historicalHigh,
    historicalLow,
  } = props

  const { themed, theme } = useAppTheme()

  const soldCount = totalCount - availableCount
  const priceUp = priceChange !== undefined && priceChange > 0
  const priceDown = priceChange !== undefined && priceChange < 0

  return (
    <View style={themed($container)}>
      {/* Left: Species Info */}
      <View style={themed($speciesSection)}>
        <View style={themed($speciesRow)}>
          <Text text={species.toUpperCase()} weight="bold" style={themed($speciesName)} />
          {speciesJapanese && (
            <Text text={speciesJapanese} weight="medium" style={themed($speciesJapanese)} />
          )}
        </View>
        <View style={themed($statsRow)}>
          <View style={themed($statBadge)}>
            <Text
              text={`${availableCount}/${totalCount}`}
              size="xxs"
              weight="bold"
              style={themed($statText)}
            />
          </View>
          <Text
            text={`${weightRange.min}-${weightRange.max}kg`}
            size="xxs"
            style={themed($rangeText)}
          />
        </View>
      </View>

      {/* Right: Price Ticker */}
      {avgPrice !== undefined && (
        <View style={themed($tickerSection)}>
          {/* Current Price */}
          <View style={themed($priceContainer)}>
            <Text text="¥" size="xs" style={themed($currencySymbol)} />
            <Text
              text={avgPrice.toLocaleString()}
              weight="bold"
              style={themed($priceText)}
            />
            <Text text="/kg" size="xxs" style={themed($priceUnit)} />
          </View>

          {/* Price Change */}
          {priceChange !== undefined && (
            <View
              style={[
                themed($changeContainer),
                priceUp && themed($changeUp),
                priceDown && themed($changeDown),
              ]}
            >
              <Text
                text={priceUp ? "▲" : priceDown ? "▼" : "–"}
                size="xxs"
                style={{
                  color: priceUp
                    ? theme.colors.palette.seafoam500
                    : priceDown
                    ? theme.colors.palette.coral500
                    : theme.colors.palette.sand500,
                }}
              />
              <Text
                text={`${priceChange > 0 ? "+" : ""}${priceChange.toFixed(1)}%`}
                size="xxs"
                weight="bold"
                style={[
                  themed($changeText),
                  priceUp && { color: theme.colors.palette.seafoam500 },
                  priceDown && { color: theme.colors.palette.coral500 },
                ]}
              />
            </View>
          )}

          {/* Historical Range */}
          {(historicalHigh !== undefined || historicalLow !== undefined) && (
            <View style={themed($historicalRow)}>
              {historicalHigh !== undefined && (
                <Text
                  text={`H:¥${historicalHigh.toLocaleString()}`}
                  size="xxs"
                  style={themed($historicalText)}
                />
              )}
              {historicalLow !== undefined && (
                <Text
                  text={`L:¥${historicalLow.toLocaleString()}`}
                  size="xxs"
                  style={themed($historicalText)}
                />
              )}
            </View>
          )}
        </View>
      )}

      {/* Sold indicator */}
      {soldCount > 0 && (
        <View style={themed($soldBadge)}>
          <Text text={`${soldCount} SOLD`} size="xxs" weight="bold" style={themed($soldText)} />
        </View>
      )}
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
  backgroundColor: colors.palette.sand100,
  borderBottomWidth: 2,
  borderBottomColor: colors.palette.coral500,
  marginBottom: spacing.xs,
})

const $speciesSection: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $speciesRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "baseline",
  gap: spacing.xs,
})

const $speciesName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
  fontSize: 16,
  letterSpacing: 1,
})

const $speciesJapanese: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
  fontSize: 12,
})

const $statsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  marginTop: spacing.xxxs,
})

const $statBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.ocean100,
  paddingHorizontal: spacing.xs,
  paddingVertical: spacing.xxxs,
  borderRadius: 4,
})

const $statText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
})

const $rangeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $tickerSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "flex-end",
  gap: spacing.xxxs,
})

const $priceContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "baseline",
})

const $currencySymbol: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
})

const $priceText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
  fontSize: 18,
  // Text shadow for chirashi style
  textShadowColor: colors.palette.coral200,
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 0,
})

const $priceUnit: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $changeContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxxs,
  paddingHorizontal: spacing.xxs,
  paddingVertical: spacing.xxxs,
  borderRadius: 4,
  backgroundColor: colors.palette.sand200,
})

const $changeUp: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.seafoam100,
})

const $changeDown: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.coral100,
})

const $changeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $historicalRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $historicalText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $soldBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  right: spacing.sm,
  top: -6,
  backgroundColor: colors.palette.coral500,
  paddingHorizontal: spacing.xs,
  paddingVertical: spacing.xxxs,
  borderRadius: 4,
  transform: [{ rotate: "-3deg" }],
})

const $soldText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
})
