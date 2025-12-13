import { View, ViewStyle, TextStyle, Pressable } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface SuggestedBid {
  amount: number
  label: string // e.g., "Market", "Aggressive", "Conservative"
  deviation: number // percentage from market price
  isRecommended?: boolean
  confidence?: number // 0-100
}

export interface QuickBidPanelProps {
  /**
   * Current market price
   */
  marketPrice: number
  /**
   * AI-generated suggested bid prices
   */
  suggestions: SuggestedBid[]
  /**
   * Current highest bid
   */
  currentBid?: number
  /**
   * Callback when a quick bid is selected
   */
  onQuickBid: (amount: number) => void
  /**
   * Whether bidding is disabled
   */
  disabled?: boolean
  /**
   * AI confidence in suggestions (0-100)
   */
  aiConfidence?: number
  /**
   * AI reasoning text
   */
  aiReasoning?: string
}

/**
 * QuickBidPanel - AI-powered quick bid suggestions
 *
 * Chirashi-styled panel with thumb-tap bid buttons
 * showing market deviations and AI recommendations.
 */
export function QuickBidPanel(props: QuickBidPanelProps) {
  const {
    marketPrice,
    suggestions,
    currentBid,
    onQuickBid,
    disabled = false,
    aiConfidence,
    aiReasoning,
  } = props

  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($container)}>
      {/* Header with AI indicator */}
      <View style={themed($header)}>
        <View style={themed($headerLeft)}>
          <View style={themed($aiBadge)}>
            <Text text="AI SUGGEST" size="xxs" weight="bold" style={themed($aiText)} />
          </View>
          {aiConfidence !== undefined && (
            <Text
              text={`${aiConfidence}% confidence`}
              size="xxs"
              style={themed($confidenceText)}
            />
          )}
        </View>
        <View style={themed($marketInfo)}>
          <Text text="Market:" size="xxs" style={themed($marketLabel)} />
          <Text
            text={`¥${marketPrice.toLocaleString()}`}
            size="sm"
            weight="bold"
            style={themed($marketPrice)}
          />
        </View>
      </View>

      {/* AI Reasoning */}
      {aiReasoning && (
        <View style={themed($reasoningBox)}>
          <Text text={aiReasoning} size="xs" style={themed($reasoningText)} numberOfLines={2} />
        </View>
      )}

      {/* Quick Bid Buttons */}
      <View style={themed($bidGrid)}>
        {suggestions.map((suggestion, index) => (
          <QuickBidButton
            key={index}
            suggestion={suggestion}
            currentBid={currentBid}
            onPress={() => onQuickBid(suggestion.amount)}
            disabled={disabled}
          />
        ))}
      </View>

      {/* Current Bid Indicator */}
      {currentBid !== undefined && (
        <View style={themed($currentBidRow)}>
          <Text text="Current bid:" size="xs" style={themed($currentBidLabel)} />
          <Text
            text={`¥${currentBid.toLocaleString()}`}
            size="sm"
            weight="bold"
            style={themed($currentBidAmount)}
          />
        </View>
      )}
    </View>
  )
}

interface QuickBidButtonProps {
  suggestion: SuggestedBid
  currentBid?: number
  onPress: () => void
  disabled?: boolean
}

function QuickBidButton({ suggestion, currentBid, onPress, disabled }: QuickBidButtonProps) {
  const { themed, theme } = useAppTheme()
  const scale = useSharedValue(1)

  const isAboveCurrentBid = currentBid === undefined || suggestion.amount > currentBid
  const isRecommended = suggestion.isRecommended
  const deviationUp = suggestion.deviation > 0
  const deviationDown = suggestion.deviation < 0

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 })
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !isAboveCurrentBid}
    >
      <Animated.View
        style={[
          themed($bidButton),
          isRecommended && themed($bidButtonRecommended),
          !isAboveCurrentBid && themed($bidButtonDisabled),
          animatedStyle,
        ]}
      >
        {/* Recommended Star */}
        {isRecommended && (
          <View style={themed($recommendedStar)}>
            <Text text="★" style={themed($starText)} />
          </View>
        )}

        {/* Label */}
        <Text
          text={suggestion.label}
          size="xxs"
          weight="bold"
          style={[
            themed($bidLabel),
            isRecommended && { color: theme.colors.palette.coral500 },
          ]}
        />

        {/* Amount */}
        <Text
          text={`¥${suggestion.amount.toLocaleString()}`}
          size="lg"
          weight="bold"
          style={[
            themed($bidAmount),
            isRecommended && themed($bidAmountRecommended),
            !isAboveCurrentBid && themed($bidAmountDisabled),
          ]}
        />

        {/* Deviation Badge */}
        <View
          style={[
            themed($deviationBadge),
            deviationUp && themed($deviationUp),
            deviationDown && themed($deviationDown),
          ]}
        >
          <Text
            text={deviationUp ? "▲" : deviationDown ? "▼" : "–"}
            size="xxs"
            style={{
              color: deviationUp
                ? theme.colors.palette.coral500
                : deviationDown
                ? theme.colors.palette.seafoam500
                : theme.colors.palette.sand500,
            }}
          />
          <Text
            text={`${suggestion.deviation > 0 ? "+" : ""}${suggestion.deviation.toFixed(1)}%`}
            size="xxs"
            weight="medium"
            style={[
              themed($deviationText),
              deviationUp && { color: theme.colors.palette.coral500 },
              deviationDown && { color: theme.colors.palette.seafoam500 },
            ]}
          />
        </View>

        {/* Confidence (if available) */}
        {suggestion.confidence !== undefined && (
          <View style={themed($confidenceBar)}>
            <View
              style={[
                themed($confidenceFill),
                { width: `${suggestion.confidence}%` },
              ]}
            />
          </View>
        )}
      </Animated.View>
    </Pressable>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.sand100,
  borderRadius: spacing.sm,
  borderWidth: 3,
  borderColor: colors.palette.coral500,
  padding: spacing.sm,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.sm,
})

const $headerLeft: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $aiBadge: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
  backgroundColor: colors.palette.ocean100,
  paddingHorizontal: spacing.xs,
  paddingVertical: spacing.xxxs,
  borderRadius: 4,
})

const $aiText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
  letterSpacing: 1,
})

const $confidenceText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $marketInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "baseline",
  gap: spacing.xxs,
})

const $marketLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $marketPrice: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $reasoningBox: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.ocean100,
  padding: spacing.xs,
  borderRadius: spacing.xxs,
  marginBottom: spacing.sm,
  borderLeftWidth: 3,
  borderLeftColor: colors.palette.ocean500,
})

const $reasoningText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
  fontStyle: "italic",
})

const $bidGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.xs,
  marginBottom: spacing.sm,
})

const $bidButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flex: 1,
  minWidth: 90,
  backgroundColor: colors.palette.sand200,
  borderRadius: spacing.xs,
  padding: spacing.sm,
  alignItems: "center",
  borderWidth: 2,
  borderColor: colors.palette.sand300,
})

const $bidButtonRecommended: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.sunset100,
  borderColor: colors.palette.coral500,
  borderWidth: 3,
})

const $bidButtonDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.sand300,
  opacity: 0.5,
})

const $recommendedStar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: -8,
  right: -8,
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: colors.palette.coral500,
  alignItems: "center",
  justifyContent: "center",
})

const $starText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontSize: 10,
})

const $bidLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
  marginBottom: 2,
})

const $bidAmount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
  // Chirashi text shadow
  textShadowColor: colors.palette.sand300,
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 0,
})

const $bidAmountRecommended: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
  textShadowColor: colors.palette.coral200,
})

const $bidAmountDisabled: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $deviationBadge: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxxs,
  marginTop: spacing.xxs,
  paddingHorizontal: spacing.xxs,
  paddingVertical: spacing.xxxs,
  borderRadius: 4,
  backgroundColor: colors.palette.sand300,
})

const $deviationUp: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.coral100,
})

const $deviationDown: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.seafoam100,
})

const $deviationText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $confidenceBar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  height: 3,
  backgroundColor: colors.palette.sand300,
  borderRadius: 2,
  marginTop: spacing.xxs,
  overflow: "hidden",
})

const $confidenceFill: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: "100%",
  backgroundColor: colors.palette.ocean500,
  borderRadius: 2,
})

const $currentBidRow: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.xs,
  paddingTop: spacing.xs,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $currentBidLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $currentBidAmount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
})
