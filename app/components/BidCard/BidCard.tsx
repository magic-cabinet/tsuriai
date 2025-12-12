import { Pressable, StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"
import { Card } from "../Card"
import { BidStatusBadge, BidStatus } from "../BidStatusBadge"
import { Avatar } from "../Avatar"
import { Divider } from "../Divider"

export interface BidCardProps {
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
  status: BidStatus
  /**
   * Item/fish being bid on
   */
  itemName: string
  /**
   * Item description or details
   */
  itemDescription?: string
  /**
   * Bidder name
   */
  bidderName?: string
  /**
   * Bid timestamp
   */
  timestamp?: Date
  /**
   * Current highest bid (for comparison)
   */
  highestBid?: number
  /**
   * Your maximum autobid (if set)
   */
  maxAutoBid?: number
  /**
   * Number of competing bids
   */
  competingBids?: number
  /**
   * Callback when card is pressed
   */
  onPress?: () => void
  /**
   * Callback for retract bid action
   */
  onRetract?: () => void
  /**
   * Callback for increase bid action
   */
  onIncrease?: () => void
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * BidCard component for displaying bid details with status.
 * Shows bid amount, item info, status badge, and optional actions.
 *
 * @param {BidCardProps} props - The props for the `BidCard` component.
 * @returns {JSX.Element} The rendered `BidCard` component.
 *
 * @example
 * <BidCard
 *   amount={1250}
 *   status="winning"
 *   itemName="Bluefin Tuna"
 *   itemDescription="Grade A, 45.5kg"
 *   bidderName="You"
 *   timestamp={new Date()}
 *   highestBid={1250}
 *   competingBids={5}
 *   onPress={() => handleBidDetails()}
 * />
 */
export function BidCard(props: BidCardProps) {
  const {
    amount,
    currency = "USD",
    status,
    itemName,
    itemDescription,
    bidderName,
    timestamp,
    highestBid,
    maxAutoBid,
    competingBids,
    onPress,
    onRetract,
    onIncrease,
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
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date)
  }

  const isWinning = status === "winning" || status === "won"
  const isLosing = status === "outbid" || status === "lost"

  const content = (
    <Card
      style={$styleOverride}
      ContentComponent={
        <View style={themed($content)}>
          {/* Header: Status badge and amount */}
          <View style={themed($header)}>
            <BidStatusBadge status={status} size="md" showIcon />
            <View style={themed($amountContainer)}>
              <Text
                text={formatPrice(amount)}
                preset="bold"
                style={[
                  themed($amount),
                  isWinning && themed($winningAmount),
                  isLosing && themed($losingAmount),
                ]}
              />
              {highestBid !== undefined && highestBid !== amount && (
                <Text
                  text={`Highest: ${formatPrice(highestBid)}`}
                  size="xs"
                  style={themed($highestBid)}
                />
              )}
            </View>
          </View>

          <Divider spacing="sm" />

          {/* Item info */}
          <View style={themed($itemSection)}>
            <Text text={itemName} preset="subheading" style={themed($itemName)} />
            {itemDescription && (
              <Text text={itemDescription} size="sm" style={themed($itemDescription)} />
            )}
          </View>

          {/* Bid details */}
          <View style={themed($detailsRow)}>
            {bidderName && (
              <View style={themed($detailItem)}>
                <Avatar name={bidderName} size="xs" />
                <Text text={bidderName} size="sm" style={themed($bidderName)} />
              </View>
            )}
            {timestamp && (
              <Text text={formatTime(timestamp)} size="xs" style={themed($timestamp)} />
            )}
          </View>

          {/* Additional info */}
          {(maxAutoBid !== undefined || competingBids !== undefined) && (
            <View style={themed($infoRow)}>
              {maxAutoBid !== undefined && (
                <View style={themed($infoItem)}>
                  <Text text="Max auto-bid:" size="xs" style={themed($infoLabel)} />
                  <Text text={formatPrice(maxAutoBid)} size="xs" style={themed($infoValue)} />
                </View>
              )}
              {competingBids !== undefined && (
                <View style={themed($infoItem)}>
                  <Text text="Competing bids:" size="xs" style={themed($infoLabel)} />
                  <Text text={String(competingBids)} size="xs" style={themed($infoValue)} />
                </View>
              )}
            </View>
          )}
        </View>
      }
    />
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

const $content: ThemedStyle<ViewStyle> = () => ({})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
})

const $amountContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "flex-end",
})

const $amount: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 24,
  color: colors.palette.sand900,
})

const $winningAmount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.seafoam500,
})

const $losingAmount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
})

const $highestBid: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $itemSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $itemName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $itemDescription: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $detailsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $detailItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $bidderName: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand800,
  fontFamily: typography.primary.medium,
})

const $timestamp: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $infoRow: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: spacing.sm,
  paddingTop: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $infoItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xxs,
})

const $infoLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $infoValue: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand700,
  fontFamily: typography.primary.medium,
})
