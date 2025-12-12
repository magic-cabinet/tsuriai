import { Pressable, StyleProp, View, ViewStyle, TextStyle, Image, ImageSourcePropType } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"
import { Badge } from "../Badge"
import { Card } from "../Card"
import { Icon } from "../Icon"
import { Avatar } from "../Avatar"

type FisheryType = "boat" | "farm" | "cooperative" | "market"
type FisheryStatus = "active" | "inactive" | "seasonal"

export interface FisheryCardProps {
  /**
   * Fishery/boat name
   */
  name: string
  /**
   * Name i18n key
   */
  nameTx?: TextProps["tx"]
  /**
   * Type of fishery
   */
  type: FisheryType
  /**
   * Current status
   */
  status?: FisheryStatus
  /**
   * Owner/captain name
   */
  owner?: string
  /**
   * Location/port
   */
  location: string
  /**
   * Fishery image or logo
   */
  image?: ImageSourcePropType
  /**
   * Average rating (0-5)
   */
  rating?: number
  /**
   * Number of reviews
   */
  reviewCount?: number
  /**
   * Specialties/main catch types
   */
  specialties?: string[]
  /**
   * Years in operation
   */
  yearsActive?: number
  /**
   * Whether certified sustainable
   */
  sustainabilityCertified?: boolean
  /**
   * Callback when card is pressed
   */
  onPress?: () => void
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const typeLabels: Record<FisheryType, string> = {
  boat: "Fishing Boat",
  farm: "Fish Farm",
  cooperative: "Cooperative",
  market: "Fish Market",
}

const typeIcons: Record<FisheryType, string> = {
  boat: "components",
  farm: "community",
  cooperative: "community",
  market: "components",
}

/**
 * FisheryCard component for displaying fishery/boat information.
 * Shows name, type, location, rating, and specialties.
 *
 * @param {FisheryCardProps} props - The props for the `FisheryCard` component.
 * @returns {JSX.Element} The rendered `FisheryCard` component.
 *
 * @example
 * <FisheryCard
 *   name="Yamamoto Fishing"
 *   type="boat"
 *   status="active"
 *   owner="Kenji Yamamoto"
 *   location="Tsukiji, Tokyo"
 *   rating={4.8}
 *   reviewCount={156}
 *   specialties={["Tuna", "Bonito", "Mackerel"]}
 *   sustainabilityCertified={true}
 *   onPress={() => handleFisherySelect(fishery)}
 * />
 */
export function FisheryCard(props: FisheryCardProps) {
  const {
    name,
    nameTx,
    type,
    status = "active",
    owner,
    location,
    image,
    rating,
    reviewCount,
    specialties,
    yearsActive,
    sustainabilityCertified,
    onPress,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const getStatusBadge = (s: FisheryStatus) => {
    switch (s) {
      case "active":
        return { text: "Active", status: "success" as const }
      case "inactive":
        return { text: "Inactive", status: "neutral" as const }
      case "seasonal":
        return { text: "Seasonal", status: "warning" as const }
    }
  }

  const statusBadge = getStatusBadge(status)

  const content = (
    <Card
      style={$styleOverride}
      ContentComponent={
        <View style={themed($content)}>
          {/* Header with image/avatar and name */}
          <View style={themed($header)}>
            {image ? (
              <Image source={image} style={{ width: 56, height: 56, borderRadius: 8, marginRight: 12 }} resizeMode="cover" />
            ) : (
              <Avatar name={name} size="lg" shape="rounded" />
            )}
            <View style={themed($headerInfo)}>
              <View style={themed($nameRow)}>
                <Text text={name} tx={nameTx} preset="bold" style={themed($nameText)} />
                {sustainabilityCertified && (
                  <View style={themed($certifiedIcon)}>
                    <Icon
                      icon="check"
                      size={16}
                      color={theme.colors.palette.seafoam400}
                    />
                  </View>
                )}
              </View>
              <View style={themed($typeRow)}>
                <Text text={typeLabels[type]} size="sm" style={themed($typeText)} />
                <Badge
                  text={statusBadge.text}
                  status={statusBadge.status}
                  size="sm"
                  badgeStyle="subtle"
                />
              </View>
              {owner && (
                <Text text={`Captain: ${owner}`} size="xs" style={themed($ownerText)} />
              )}
            </View>
          </View>

          {/* Location and stats */}
          <View style={themed($detailsSection)}>
            <View style={themed($locationRow)}>
              <Icon icon="pin" size={14} color={theme.colors.palette.sand500} />
              <Text text={location} size="sm" style={themed($locationText)} />
            </View>

            <View style={themed($statsRow)}>
              {rating !== undefined && (
                <View style={themed($stat)}>
                  <Icon icon="heart" size={14} color={theme.colors.palette.sunset400} />
                  <Text text={rating.toFixed(1)} size="sm" style={themed($statValue)} />
                  {reviewCount !== undefined && (
                    <Text text={`(${reviewCount})`} size="xs" style={themed($reviewCount)} />
                  )}
                </View>
              )}
              {yearsActive !== undefined && (
                <View style={themed($stat)}>
                  <Text text={`${yearsActive} years`} size="sm" style={themed($statValue)} />
                </View>
              )}
            </View>
          </View>

          {/* Specialties */}
          {specialties && specialties.length > 0 && (
            <View style={themed($specialtiesSection)}>
              <Text text="Specialties" size="xs" style={themed($specialtiesLabel)} />
              <View style={themed($specialtiesList)}>
                {specialties.slice(0, 4).map((specialty, index) => (
                  <Badge
                    key={index}
                    text={specialty}
                    status="info"
                    size="sm"
                    badgeStyle="outline"
                  />
                ))}
                {specialties.length > 4 && (
                  <Text text={`+${specialties.length - 4}`} size="xs" style={themed($moreText)} />
                )}
              </View>
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

const $headerInfo: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
})

const $nameRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
})

const $nameText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $certifiedIcon: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginLeft: spacing.xxs,
})

const $typeRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  marginTop: spacing.xxxs,
})

const $typeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $ownerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  marginTop: spacing.xxxs,
})

const $detailsSection: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingTop: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $locationRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
  marginBottom: spacing.xs,
})

const $locationText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
})

const $statsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.lg,
})

const $stat: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $statValue: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand800,
  fontFamily: typography.primary.medium,
})

const $reviewCount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $specialtiesSection: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingTop: spacing.sm,
  marginTop: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $specialtiesLabel: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand500,
  marginBottom: spacing.xs,
})

const $specialtiesList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.xxs,
})

const $moreText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand500,
  marginLeft: spacing.xxs,
  alignSelf: "center",
})

// Helper for owner text spacing
const spacing = { xxxs: 2 }
