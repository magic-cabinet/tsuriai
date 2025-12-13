import { Pressable, StyleProp, View, ViewStyle, TextStyle, ImageSourcePropType } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"
import { Card } from "../Card"
import { Avatar } from "../Avatar"
import { Badge } from "../Badge"
import { Icon } from "../Icon"

type UserRole = "buyer" | "seller" | "both" | "admin"
type VerificationStatus = "unverified" | "pending" | "verified"

export interface UserProfileCardProps {
  /**
   * User's full name
   */
  name: string
  /**
   * Name i18n key
   */
  nameTx?: TextProps["tx"]
  /**
   * Username/handle
   */
  username?: string
  /**
   * User's avatar image
   */
  avatar?: ImageSourcePropType
  /**
   * User's role on the platform
   */
  role?: UserRole
  /**
   * Verification status
   */
  verificationStatus?: VerificationStatus
  /**
   * User's location
   */
  location?: string
  /**
   * Member since date
   */
  memberSince?: Date
  /**
   * Bio/description
   */
  bio?: string
  /**
   * Reputation score (0-5)
   */
  rating?: number
  /**
   * Number of reviews
   */
  reviewCount?: number
  /**
   * Number of completed transactions
   */
  transactionCount?: number
  /**
   * Number of successful bids (for buyers)
   */
  successfulBids?: number
  /**
   * Number of items sold (for sellers)
   */
  itemsSold?: number
  /**
   * Whether this is the current user's profile
   */
  isOwnProfile?: boolean
  /**
   * Callback when card is pressed
   */
  onPress?: () => void
  /**
   * Callback for message action
   */
  onMessage?: () => void
  /**
   * Callback for follow action
   */
  onFollow?: () => void
  /**
   * Whether currently following this user
   */
  isFollowing?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const roleLabels: Record<UserRole, string> = {
  buyer: "Buyer",
  seller: "Seller",
  both: "Buyer & Seller",
  admin: "Administrator",
}

/**
 * UserProfileCard component for displaying user information.
 * Shows avatar, name, role, rating, and stats.
 *
 * @param {UserProfileCardProps} props - The props for the `UserProfileCard` component.
 * @returns {JSX.Element} The rendered `UserProfileCard` component.
 *
 * @example
 * <UserProfileCard
 *   name="Kenji Yamamoto"
 *   username="@yamamoto_fishing"
 *   role="seller"
 *   verificationStatus="verified"
 *   location="Tokyo, Japan"
 *   rating={4.8}
 *   reviewCount={156}
 *   itemsSold={342}
 *   onPress={() => handleProfileView()}
 * />
 */
export function UserProfileCard(props: UserProfileCardProps) {
  const {
    name,
    nameTx,
    username,
    avatar,
    role = "buyer",
    verificationStatus = "unverified",
    location,
    memberSince,
    bio,
    rating,
    reviewCount,
    transactionCount,
    successfulBids,
    itemsSold,
    isOwnProfile = false,
    onPress,
    onMessage,
    onFollow,
    isFollowing = false,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const formatMemberSince = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date)
  }

  const content = (
    <Card
      style={$styleOverride}
      ContentComponent={
        <View style={themed($content)}>
          {/* Header with avatar and name */}
          <View style={themed($header)}>
            <Avatar
              name={name}
              source={avatar}
              size="xl"
            />
            <View style={themed($headerInfo)}>
              <View style={themed($nameRow)}>
                <Text text={name} tx={nameTx} preset="bold" style={themed($name)} />
                {verificationStatus === "verified" && (
                  <Icon icon="check" size={18} color={theme.colors.palette.ocean500} />
                )}
              </View>
              {username && (
                <Text text={username} size="sm" style={themed($username)} />
              )}
              <View style={themed($badgeRow)}>
                <Badge
                  text={roleLabels[role]}
                  status={role === "seller" || role === "both" ? "info" : "neutral"}
                  size="sm"
                  badgeStyle="subtle"
                />
                {verificationStatus === "pending" && (
                  <Badge text="Pending" status="warning" size="sm" badgeStyle="outline" />
                )}
              </View>
            </View>
          </View>

          {/* Location and member info */}
          <View style={themed($infoSection)}>
            {location && (
              <View style={themed($infoRow)}>
                <Icon icon="pin" size={14} color={theme.colors.palette.sand500} />
                <Text text={location} size="sm" style={themed($infoText)} />
              </View>
            )}
            {memberSince && (
              <View style={themed($infoRow)}>
                <Icon icon="components" size={14} color={theme.colors.palette.sand500} />
                <Text text={`Member since ${formatMemberSince(memberSince)}`} size="sm" style={themed($infoText)} />
              </View>
            )}
          </View>

          {/* Bio */}
          {bio && (
            <Text text={bio} size="sm" style={themed($bio)} numberOfLines={3} />
          )}

          {/* Rating */}
          {rating !== undefined && (
            <View style={themed($ratingSection)}>
              <View style={themed($ratingDisplay)}>
                <Icon icon="heart" size={20} color={theme.colors.palette.sunset400} />
                <Text text={rating.toFixed(1)} preset="bold" style={themed($ratingValue)} />
                {reviewCount !== undefined && (
                  <Text text={`(${reviewCount} reviews)`} size="sm" style={themed($reviewCount)} />
                )}
              </View>
            </View>
          )}

          {/* Stats */}
          <View style={themed($statsSection)}>
            {transactionCount !== undefined && (
              <View style={themed($stat)}>
                <Text text={String(transactionCount)} preset="bold" style={themed($statValue)} />
                <Text text="Transactions" size="xs" style={themed($statLabel)} />
              </View>
            )}
            {successfulBids !== undefined && (
              <View style={themed($stat)}>
                <Text text={String(successfulBids)} preset="bold" style={themed($statValue)} />
                <Text text="Bids Won" size="xs" style={themed($statLabel)} />
              </View>
            )}
            {itemsSold !== undefined && (
              <View style={themed($stat)}>
                <Text text={String(itemsSold)} preset="bold" style={themed($statValue)} />
                <Text text="Items Sold" size="xs" style={themed($statLabel)} />
              </View>
            )}
          </View>

          {/* Actions */}
          {!isOwnProfile && (onMessage || onFollow) && (
            <View style={themed($actionsSection)}>
              {onMessage && (
                <Pressable style={themed($actionButton)} onPress={onMessage}>
                  <Icon icon="components" size={16} color={theme.colors.palette.ocean500} />
                  <Text text="Message" size="sm" style={themed($actionText)} />
                </Pressable>
              )}
              {onFollow && (
                <Pressable
                  style={[themed($actionButton), isFollowing && themed($followingButton)]}
                  onPress={onFollow}
                >
                  <Icon
                    icon={isFollowing ? "check" : "community"}
                    size={16}
                    color={isFollowing ? theme.colors.palette.sand100 : theme.colors.palette.ocean500}
                  />
                  <Text
                    text={isFollowing ? "Following" : "Follow"}
                    size="sm"
                    style={[themed($actionText), isFollowing && themed($followingText)]}
                  />
                </Pressable>
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
  marginBottom: spacing.md,
})

const $headerInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  marginLeft: spacing.md,
  justifyContent: "center",
})

const $nameRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $name: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
  fontSize: 18,
})

const $username: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $badgeRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xxs,
  marginTop: spacing.xs,
})

const $infoSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxs,
  marginBottom: spacing.sm,
})

const $infoRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $infoText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $bio: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand700,
  marginBottom: spacing.md,
})

const $ratingSection: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingVertical: spacing.sm,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: colors.palette.sand300,
  marginBottom: spacing.sm,
})

const $ratingDisplay: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $ratingValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
  fontSize: 20,
})

const $reviewCount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $statsSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-around",
  marginBottom: spacing.md,
})

const $stat: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

const $statValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
  fontSize: 18,
})

const $statLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $actionsSection: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  gap: spacing.sm,
  paddingTop: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $actionButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.xs,
  paddingVertical: spacing.sm,
  borderRadius: spacing.sm,
  borderWidth: 1,
  borderColor: colors.palette.ocean500,
})

const $followingButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean500,
  borderColor: colors.palette.ocean500,
})

const $actionText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.ocean500,
  fontFamily: typography.primary.medium,
})

const $followingText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
})
