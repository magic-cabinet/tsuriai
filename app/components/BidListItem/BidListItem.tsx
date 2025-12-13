import { Pressable, StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { BidStatusBadge, BidStatus } from "../BidStatusBadge"
import { Avatar } from "../Avatar"
import { Icon } from "../Icon"

export interface BidListItemProps {
  /**
   * Bid amount
   */
  amount: number
  /**
   * Currency code
   * @default "USD"
   */
  currency?: string
  /**
   * Bid status
   */
  status?: BidStatus
  /**
   * Bidder name
   */
  bidderName: string
  /**
   * Bidder avatar image URI
   */
  bidderAvatar?: string
  /**
   * Bid timestamp
   */
  timestamp: Date
  /**
   * Whether this is the current user's bid
   */
  isOwnBid?: boolean
  /**
   * Whether this is the winning bid
   */
  isWinningBid?: boolean
  /**
   * Bid rank/position (1st, 2nd, etc.)
   */
  rank?: number
  /**
   * Callback when item is pressed
   */
  onPress?: () => void
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * BidListItem component for displaying individual bids in a list.
 * Compact format suitable for bid history or leaderboards.
 *
 * @param {BidListItemProps} props - The props for the `BidListItem` component.
 * @returns {JSX.Element} The rendered `BidListItem` component.
 *
 * @example
 * <BidListItem
 *   amount={1250}
 *   bidderName="John D."
 *   timestamp={new Date()}
 *   isWinningBid={true}
 *   rank={1}
 * />
 */
export function BidListItem(props: BidListItemProps) {
  const {
    amount,
    currency = "USD",
    status,
    bidderName,
    bidderAvatar,
    timestamp,
    isOwnBid = false,
    isWinningBid = false,
    rank,
    onPress,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const formatPrice = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatTime = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const $containerStyle: StyleProp<ViewStyle> = [
    themed($container),
    isWinningBid && themed($winningContainer),
    isOwnBid && themed($ownBidContainer),
    $styleOverride,
  ]

  const content = (
    <View style={$containerStyle}>
      {/* Rank indicator */}
      {rank !== undefined && (
        <View style={themed($rankContainer)}>
          <Text
            text={`#${rank}`}
            style={[
              themed($rankText),
              rank === 1 && themed($firstRankText),
            ]}
          />
        </View>
      )}

      {/* Bidder info */}
      <View style={themed($bidderSection)}>
        <Avatar
          name={bidderName}
          source={bidderAvatar ? { uri: bidderAvatar } : undefined}
          size="sm"
        />
        <View style={themed($bidderInfo)}>
          <View style={themed($nameRow)}>
            <Text
              text={bidderName}
              style={[themed($bidderName), isOwnBid && themed($ownBidName)]}
            />
            {isOwnBid && (
              <Text text="(You)" size="xs" style={themed($youLabel)} />
            )}
          </View>
          <Text text={formatTime(timestamp)} size="xs" style={themed($timestamp)} />
        </View>
      </View>

      {/* Amount and status */}
      <View style={themed($amountSection)}>
        <Text
          text={formatPrice(amount)}
          preset="bold"
          style={[
            themed($amount),
            isWinningBid && themed($winningAmount),
          ]}
        />
        {status && <BidStatusBadge status={status} size="sm" />}
        {isWinningBid && !status && (
          <Icon icon="check" size={16} color={theme.colors.palette.seafoam500} />
        )}
      </View>
    </View>
  )

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button">
        {content}
      </Pressable>
    )
  }

  return content
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  backgroundColor: colors.palette.sand100,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.sand300,
})

const $winningContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.seafoam100,
})

const $ownBidContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean100,
})

const $rankContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 32,
  marginRight: spacing.sm,
})

const $rankText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.medium,
  fontSize: 12,
  color: colors.palette.sand500,
})

const $firstRankText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sunset500,
  fontWeight: "700",
})

const $bidderSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $bidderInfo: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $nameRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $bidderName: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.medium,
  color: colors.palette.sand800,
})

const $ownBidName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
})

const $youLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean500,
})

const $timestamp: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $amountSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $amount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $winningAmount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.seafoam500,
})
