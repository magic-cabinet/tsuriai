import { StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Icon } from "../Icon"

type DisplaySize = "sm" | "md" | "lg"
type DisplayVariant = "minimal" | "compact" | "detailed"

export interface ReputationScoreDisplayProps {
  /**
   * Reputation score (0-5)
   */
  score: number
  /**
   * Maximum score
   * @default 5
   */
  maxScore?: number
  /**
   * Number of reviews/ratings
   */
  reviewCount?: number
  /**
   * Display size
   * @default "md"
   */
  size?: DisplaySize
  /**
   * Display variant
   * @default "compact"
   */
  variant?: DisplayVariant
  /**
   * Whether to show star icons
   * @default true
   */
  showStars?: boolean
  /**
   * Whether to show the score breakdown
   * @default false
   */
  showBreakdown?: boolean
  /**
   * Score breakdown by rating (5-star, 4-star, etc.)
   */
  breakdown?: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * ReputationScoreDisplay component for showing user/seller ratings.
 * Supports multiple display variants from minimal to detailed breakdown.
 *
 * @param {ReputationScoreDisplayProps} props - The props for the `ReputationScoreDisplay` component.
 * @returns {JSX.Element} The rendered `ReputationScoreDisplay` component.
 *
 * @example
 * <ReputationScoreDisplay
 *   score={4.8}
 *   reviewCount={156}
 *   variant="compact"
 * />
 */
export function ReputationScoreDisplay(props: ReputationScoreDisplayProps) {
  const {
    score,
    maxScore = 5,
    reviewCount,
    size = "md",
    variant = "compact",
    showStars = true,
    showBreakdown = false,
    breakdown,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const normalizedScore = Math.min(Math.max(score, 0), maxScore)
  const fullStars = Math.floor(normalizedScore)
  const hasHalfStar = normalizedScore - fullStars >= 0.5
  const emptyStars = maxScore - fullStars - (hasHalfStar ? 1 : 0)

  const starSize = size === "sm" ? 14 : size === "lg" ? 24 : 18

  const renderStars = () => {
    const stars = []
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`full-${i}`}
          icon="heart"
          size={starSize}
          color={theme.colors.palette.sunset400}
        />
      )
    }
    if (hasHalfStar) {
      stars.push(
        <Icon
          key="half"
          icon="heart"
          size={starSize}
          color={theme.colors.palette.sunset300}
        />
      )
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          icon="heart"
          size={starSize}
          color={theme.colors.palette.sand300}
        />
      )
    }
    return stars
  }

  const totalReviews = breakdown
    ? Object.values(breakdown).reduce((sum, count) => sum + count, 0)
    : reviewCount || 0

  const getBreakdownPercentage = (count: number) => {
    if (totalReviews === 0) return 0
    return (count / totalReviews) * 100
  }

  // Minimal variant: just score number
  if (variant === "minimal") {
    return (
      <View style={[themed($minimalContainer), $styleOverride]}>
        {showStars && (
          <Icon icon="heart" size={starSize} color={theme.colors.palette.sunset400} />
        )}
        <Text
          text={normalizedScore.toFixed(1)}
          style={[themed($minimalScore), themed($scoreSizes[size])]}
        />
      </View>
    )
  }

  // Compact variant: score with stars
  if (variant === "compact") {
    return (
      <View style={[themed($compactContainer), $styleOverride]}>
        <View style={themed($scoreRow)}>
          <Text
            text={normalizedScore.toFixed(1)}
            preset="bold"
            style={[themed($compactScore), themed($scoreSizes[size])]}
          />
          {showStars && <View style={themed($starsContainer)}>{renderStars()}</View>}
        </View>
        {reviewCount !== undefined && (
          <Text
            text={`${reviewCount} reviews`}
            size="xs"
            style={themed($reviewCount)}
          />
        )}
      </View>
    )
  }

  // Detailed variant: full breakdown
  return (
    <View style={[themed($detailedContainer), $styleOverride]}>
      {/* Main score display */}
      <View style={themed($mainScoreSection)}>
        <Text text={normalizedScore.toFixed(1)} style={themed($detailedScore)} />
        <Text text={`out of ${maxScore}`} size="xs" style={themed($outOfText)} />
        {showStars && (
          <View style={themed($starsContainer)}>{renderStars()}</View>
        )}
        {reviewCount !== undefined && (
          <Text text={`${reviewCount} reviews`} size="sm" style={themed($reviewCountDetailed)} />
        )}
      </View>

      {/* Breakdown section */}
      {showBreakdown && breakdown && (
        <View style={themed($breakdownSection)}>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = breakdown[rating as keyof typeof breakdown]
            const percentage = getBreakdownPercentage(count)
            return (
              <View key={rating} style={themed($breakdownRow)}>
                <Text text={`${rating}`} size="xs" style={themed($breakdownLabel)} />
                <Icon icon="heart" size={12} color={theme.colors.palette.sunset400} />
                <View style={themed($barContainer)}>
                  <View style={themed($barBackground)} />
                  <View
                    style={[
                      themed($barFill),
                      { width: `${percentage}%` },
                    ]}
                  />
                </View>
                <Text text={`${count}`} size="xs" style={themed($breakdownCount)} />
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $minimalContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $minimalScore: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand800,
  fontFamily: typography.primary.medium,
})

const $compactContainer: ThemedStyle<ViewStyle> = () => ({})

const $scoreRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $compactScore: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $scoreSizes: Record<DisplaySize, ThemedStyle<TextStyle>> = {
  sm: () => ({
    fontSize: 14,
  }),
  md: () => ({
    fontSize: 18,
  }),
  lg: () => ({
    fontSize: 24,
  }),
}

const $starsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xxxs,
})

const $reviewCount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  marginTop: spacing.xxxs,
})

const $detailedContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.sand100,
  borderRadius: spacing.sm,
  padding: spacing.md,
})

const $mainScoreSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginBottom: spacing.md,
})

const $detailedScore: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 48,
  fontFamily: typography.primary.bold,
  color: colors.palette.sand900,
})

const $outOfText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $reviewCountDetailed: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand600,
  marginTop: spacing.xs,
})

const $breakdownSection: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingTop: spacing.md,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
  gap: spacing.xs,
})

const $breakdownRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $breakdownLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  width: 12,
  color: colors.palette.sand600,
  textAlign: "center",
})

const $barContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  height: 8,
  borderRadius: 4,
  overflow: "hidden",
  position: "relative",
})

const $barBackground: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.palette.sand300,
})

const $barFill: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  backgroundColor: colors.palette.sunset400,
  borderRadius: 4,
})

const $breakdownCount: ThemedStyle<TextStyle> = ({ colors }) => ({
  width: 32,
  color: colors.palette.sand600,
  textAlign: "right",
})

// Helper for spacing
const spacing = { xxxs: 2 }
