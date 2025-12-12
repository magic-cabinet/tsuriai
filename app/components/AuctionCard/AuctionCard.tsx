import { Pressable, StyleProp, View, ViewStyle, TextStyle, Image, ImageSourcePropType } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"
import { Card } from "../Card"
import { Badge } from "../Badge"
import { AuctionTimer } from "../AuctionTimer"
import { Icon } from "../Icon"

type AuctionType = "standard" | "dutch" | "sealed" | "reserve"

export interface AuctionCardProps {
  /**
   * Auction title/item name
   */
  title: string
  /**
   * Title i18n key
   */
  titleTx?: TextProps["tx"]
  /**
   * Item description
   */
  description?: string
  /**
   * Item image
   */
  image?: ImageSourcePropType
  /**
   * Auction type
   * @default "standard"
   */
  auctionType?: AuctionType
  /**
   * Auction end date
   */
  endDate: Date
  /**
   * Start date for upcoming auctions
   */
  startDate?: Date
  /**
   * Current bid amount
   */
  currentBid: number
  /**
   * Starting price
   */
  startingPrice?: number
  /**
   * Reserve price (if reserve auction)
   */
  reservePrice?: number
  /**
   * Whether reserve has been met
   */
  reserveMet?: boolean
  /**
   * Number of bids
   */
  bidCount: number
  /**
   * Number of watchers
   */
  watcherCount?: number
  /**
   * Currency code
   * @default "USD"
   */
  currency?: string
  /**
   * Seller name
   */
  sellerName?: string
  /**
   * Seller rating
   */
  sellerRating?: number
  /**
   * Whether user is watching this auction
   */
  isWatching?: boolean
  /**
   * Whether user has bid on this auction
   */
  hasBid?: boolean
  /**
   * Callback when card is pressed
   */
  onPress?: () => void
  /**
   * Callback when watch button is pressed
   */
  onToggleWatch?: () => void
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const auctionTypeLabels: Record<AuctionType, string> = {
  standard: "Standard",
  dutch: "Dutch",
  sealed: "Sealed Bid",
  reserve: "Reserve",
}

/**
 * AuctionCard component for displaying auction listings.
 * Shows item, pricing, timer, and bid information.
 *
 * @param {AuctionCardProps} props - The props for the `AuctionCard` component.
 * @returns {JSX.Element} The rendered `AuctionCard` component.
 *
 * @example
 * <AuctionCard
 *   title="Bluefin Tuna - Grade A"
 *   description="45.5kg, Fresh from Tsukiji"
 *   endDate={new Date(Date.now() + 3600000)}
 *   currentBid={1250}
 *   bidCount={12}
 *   watcherCount={45}
 *   sellerName="Yamamoto Fishing"
 *   sellerRating={4.8}
 *   onPress={() => handleAuctionSelect(auction)}
 * />
 */
export function AuctionCard(props: AuctionCardProps) {
  const {
    title,
    titleTx,
    description,
    image,
    auctionType = "standard",
    endDate,
    startDate,
    currentBid,
    startingPrice,
    reservePrice,
    reserveMet,
    bidCount,
    watcherCount,
    currency = "USD",
    sellerName,
    sellerRating,
    isWatching = false,
    hasBid = false,
    onPress,
    onToggleWatch,
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

  const isEnded = endDate.getTime() < Date.now()
  const isUpcoming = startDate && startDate.getTime() > Date.now()

  const content = (
    <Card
      style={$styleOverride}
      ContentComponent={
        <View style={themed($content)}>
          {/* Image and badges */}
          <View style={themed($imageSection)}>
            {image ? (
              <Image source={image} style={{ width: "100%", height: 160, borderRadius: 8 }} resizeMode="cover" />
            ) : (
              <View style={themed($imagePlaceholder)}>
                <Icon icon="components" size={32} color={theme.colors.palette.sand400} />
              </View>
            )}
            <View style={themed($badgeContainer)}>
              {auctionType !== "standard" && (
                <Badge
                  text={auctionTypeLabels[auctionType]}
                  status="info"
                  size="sm"
                  badgeStyle="solid"
                />
              )}
              {hasBid && (
                <Badge text="Your Bid" status="success" size="sm" badgeStyle="subtle" />
              )}
            </View>
            {onToggleWatch && (
              <Pressable
                style={themed($watchButton)}
                onPress={onToggleWatch}
                hitSlop={8}
              >
                <Icon
                  icon="heart"
                  size={20}
                  color={isWatching ? theme.colors.palette.coral500 : theme.colors.palette.sand400}
                />
              </Pressable>
            )}
          </View>

          {/* Info section */}
          <View style={themed($infoSection)}>
            <Text text={title} tx={titleTx} preset="bold" style={themed($title)} numberOfLines={2} />
            {description && (
              <Text text={description} size="sm" style={themed($description)} numberOfLines={1} />
            )}

            {/* Seller info */}
            {sellerName && (
              <View style={themed($sellerRow)}>
                <Text text={sellerName} size="xs" style={themed($sellerName)} />
                {sellerRating !== undefined && (
                  <View style={themed($ratingContainer)}>
                    <Icon icon="heart" size={12} color={theme.colors.palette.sunset400} />
                    <Text text={sellerRating.toFixed(1)} size="xs" style={themed($rating)} />
                  </View>
                )}
              </View>
            )}

            {/* Price and timer section */}
            <View style={themed($priceTimerSection)}>
              <View style={themed($priceContainer)}>
                <Text text="Current Bid" size="xs" style={themed($priceLabel)} />
                <Text text={formatPrice(currentBid)} preset="bold" style={themed($currentBid)} />
                {reservePrice !== undefined && !reserveMet && (
                  <Text text="Reserve not met" size="xs" style={themed($reserveText)} />
                )}
              </View>
              {!isEnded && (
                <AuctionTimer
                  endDate={endDate}
                  startDate={startDate}
                  size="small"
                  showPhaseBadge={false}
                  showIcon={false}
                />
              )}
            </View>

            {/* Stats row */}
            <View style={themed($statsRow)}>
              <View style={themed($stat)}>
                <Icon icon="components" size={14} color={theme.colors.palette.sand500} />
                <Text text={`${bidCount} bids`} size="xs" style={themed($statText)} />
              </View>
              {watcherCount !== undefined && (
                <View style={themed($stat)}>
                  <Icon icon="view" size={14} color={theme.colors.palette.sand500} />
                  <Text text={`${watcherCount} watching`} size="xs" style={themed($statText)} />
                </View>
              )}
            </View>
          </View>
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

const $imageSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "relative",
  marginBottom: spacing.sm,
})

const $imagePlaceholder: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: "100%",
  height: 160,
  borderRadius: spacing.sm,
  backgroundColor: colors.palette.sand200,
  alignItems: "center",
  justifyContent: "center",
})

const $badgeContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  top: spacing.xs,
  left: spacing.xs,
  flexDirection: "row",
  gap: spacing.xxs,
})

const $watchButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  position: "absolute",
  top: spacing.xs,
  right: spacing.xs,
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: colors.palette.sand100,
  alignItems: "center",
  justifyContent: "center",
})

const $infoSection: ThemedStyle<ViewStyle> = () => ({})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $description: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand600,
  marginTop: spacing.xxxs,
})

const $sellerRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginTop: spacing.xs,
})

const $sellerName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $ratingContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginLeft: spacing.sm,
  gap: spacing.xxxs,
})

const $rating: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand700,
  fontFamily: typography.primary.medium,
})

const $priceTimerSection: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginTop: spacing.md,
  paddingTop: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $priceContainer: ThemedStyle<ViewStyle> = () => ({})

const $priceLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $currentBid: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 20,
  color: colors.palette.ocean600,
})

const $reserveText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
})

const $statsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.md,
  marginTop: spacing.sm,
})

const $stat: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $statText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

// Helper for spacing
const spacing = { xxxs: 2 }
