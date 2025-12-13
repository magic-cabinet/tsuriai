import { useEffect, useRef } from "react"
import { View, ViewStyle, TextStyle, ScrollView, Animated } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface TickerItem {
  species: string
  speciesJapanese?: string
  price: number
  change: number // percentage
  volume?: number // kg traded today
}

export interface FishPriceTickerProps {
  /**
   * Array of ticker items to display
   */
  items: TickerItem[]
  /**
   * Auto-scroll speed (ms per item)
   * @default 3000
   */
  scrollSpeed?: number
  /**
   * Whether to show the ticker in compact mode
   */
  compact?: boolean
}

/**
 * FishPriceTicker - Scrolling price ticker bar
 *
 * Displays real-time fish prices like a stock ticker,
 * with price changes and trading volume.
 */
export function FishPriceTicker(props: FishPriceTickerProps) {
  const { items, scrollSpeed = 3000, compact = false } = props
  const { themed, theme } = useAppTheme()
  const scrollRef = useRef<ScrollView>(null)
  const scrollX = useRef(new Animated.Value(0)).current

  // Auto-scroll animation
  useEffect(() => {
    if (items.length === 0) return

    let scrollPosition = 0
    const itemWidth = compact ? 120 : 180
    const totalWidth = items.length * itemWidth

    const scroll = () => {
      scrollPosition += itemWidth
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0
        scrollRef.current?.scrollTo({ x: 0, animated: false })
      }
      scrollRef.current?.scrollTo({ x: scrollPosition, animated: true })
    }

    const interval = setInterval(scroll, scrollSpeed)
    return () => clearInterval(interval)
  }, [items, scrollSpeed, compact])

  if (items.length === 0) return null

  return (
    <View style={themed($container)}>
      {/* Ticker Label */}
      <View style={themed($labelContainer)}>
        <Text text="LIVE" size="xxs" weight="bold" style={themed($liveText)} />
        <View style={themed($liveDot)} />
      </View>

      {/* Scrolling Ticker */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={themed($tickerScroll)}
        contentContainerStyle={themed($tickerContent)}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, index) => (
          <TickerItemView
            key={`${item.species}-${index}`}
            item={item}
            compact={compact}
          />
        ))}
      </ScrollView>
    </View>
  )
}

interface TickerItemViewProps {
  item: TickerItem
  compact?: boolean
}

function TickerItemView({ item, compact }: TickerItemViewProps) {
  const { themed, theme } = useAppTheme()
  const isUp = item.change > 0
  const isDown = item.change < 0

  return (
    <View style={[themed($tickerItem), compact && themed($tickerItemCompact)]}>
      {/* Species */}
      <View style={themed($speciesContainer)}>
        <Text
          text={item.species}
          size="xs"
          weight="bold"
          style={themed($speciesText)}
          numberOfLines={1}
        />
        {!compact && item.speciesJapanese && (
          <Text
            text={item.speciesJapanese}
            size="xxs"
            style={themed($japaneseText)}
          />
        )}
      </View>

      {/* Price & Change */}
      <View style={themed($priceSection)}>
        <Text
          text={`¥${item.price.toLocaleString()}`}
          size={compact ? "xs" : "sm"}
          weight="bold"
          style={[
            themed($priceText),
            isUp && { color: theme.colors.palette.seafoam500 },
            isDown && { color: theme.colors.palette.coral500 },
          ]}
        />
        <View
          style={[
            themed($changeBadge),
            isUp && themed($changeBadgeUp),
            isDown && themed($changeBadgeDown),
          ]}
        >
          <Text
            text={isUp ? "▲" : isDown ? "▼" : "–"}
            size="xxs"
            style={{
              color: isUp
                ? theme.colors.palette.seafoam500
                : isDown
                ? theme.colors.palette.coral500
                : theme.colors.palette.sand500,
            }}
          />
          <Text
            text={`${item.change > 0 ? "+" : ""}${item.change.toFixed(1)}%`}
            size="xxs"
            weight="bold"
            style={[
              themed($changeText),
              isUp && { color: theme.colors.palette.seafoam500 },
              isDown && { color: theme.colors.palette.coral500 },
            ]}
          />
        </View>
      </View>

      {/* Volume (optional) */}
      {!compact && item.volume !== undefined && (
        <Text
          text={`Vol: ${item.volume.toLocaleString()}kg`}
          size="xxs"
          style={themed($volumeText)}
        />
      )}

      {/* Separator */}
      <View style={themed($separator)} />
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.sand900,
  paddingVertical: spacing.xs,
  borderBottomWidth: 3,
  borderBottomColor: colors.palette.coral500,
})

const $labelContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
  paddingHorizontal: spacing.sm,
  borderRightWidth: 1,
  borderRightColor: colors.palette.sand700,
})

const $liveText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
  letterSpacing: 1,
})

const $liveDot: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: colors.palette.coral500,
})

const $tickerScroll: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $tickerContent: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

const $tickerItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: spacing.sm,
  gap: spacing.xs,
  minWidth: 180,
})

const $tickerItemCompact: ThemedStyle<ViewStyle> = () => ({
  minWidth: 120,
})

const $speciesContainer: ThemedStyle<ViewStyle> = () => ({
  minWidth: 60,
})

const $speciesText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
})

const $japaneseText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $priceSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $priceText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
})

const $changeBadge: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxxs,
  paddingHorizontal: spacing.xxs,
  paddingVertical: spacing.xxxs,
  borderRadius: 4,
  backgroundColor: colors.palette.sand700,
})

const $changeBadgeUp: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: "rgba(94, 234, 212, 0.2)",
})

const $changeBadgeDown: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: "rgba(251, 113, 133, 0.2)",
})

const $changeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $volumeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $separator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 1,
  height: 20,
  backgroundColor: colors.palette.sand700,
  marginLeft: 8,
})
