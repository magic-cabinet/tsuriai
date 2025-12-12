import { ScrollView, StyleProp, TextStyle, View, ViewStyle, Image, ImageSourcePropType } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Card } from "../Card"
import { Avatar } from "../Avatar"
import { Badge } from "../Badge"
import { StatCard } from "../StatCard"
import { Divider } from "../Divider"
import { Icon } from "../Icon"
import { Button } from "../Button"
import { Tabs } from "../Tabs"

type FisheryType = "boat" | "farm" | "cooperative" | "market"
type FisheryStatus = "active" | "inactive" | "seasonal"

export interface FisheryDetailPanelProps {
  /**
   * Fishery name
   */
  name: string
  /**
   * Type of fishery
   */
  type: FisheryType
  /**
   * Current status
   */
  status: FisheryStatus
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
   * Cover/banner image
   */
  coverImage?: ImageSourcePropType
  /**
   * Description/about text
   */
  description?: string
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
   * Total transactions
   */
  totalTransactions?: number
  /**
   * Success rate percentage
   */
  successRate?: number
  /**
   * Contact phone
   */
  phone?: string
  /**
   * Contact email
   */
  email?: string
  /**
   * Callback when contact button pressed
   */
  onContact?: () => void
  /**
   * Callback when follow button pressed
   */
  onFollow?: () => void
  /**
   * Whether user is following
   */
  isFollowing?: boolean
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

const statusConfig: Record<FisheryStatus, { label: string; status: "success" | "warning" | "neutral" }> = {
  active: { label: "Active", status: "success" },
  inactive: { label: "Inactive", status: "neutral" },
  seasonal: { label: "Seasonal", status: "warning" },
}

/**
 * FisheryDetailPanel component for displaying detailed fishery information.
 *
 * @param {FisheryDetailPanelProps} props - The props for the `FisheryDetailPanel` component.
 * @returns {JSX.Element} The rendered `FisheryDetailPanel` component.
 */
export function FisheryDetailPanel(props: FisheryDetailPanelProps) {
  const {
    name,
    type,
    status,
    owner,
    location,
    image,
    coverImage,
    description,
    rating,
    reviewCount,
    specialties,
    yearsActive,
    sustainabilityCertified,
    totalTransactions,
    successRate,
    phone,
    email,
    onContact,
    onFollow,
    isFollowing = false,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const statusInfo = statusConfig[status]

  return (
    <ScrollView style={$styleOverride} contentContainerStyle={themed($container)}>
      {/* Cover Image */}
      {coverImage && (
        <Image source={coverImage} style={{ width: "100%", height: 180 }} resizeMode="cover" />
      )}

      {/* Header Card */}
      <Card style={themed($headerCard)}>
        <View style={themed($headerContent)}>
          <View style={themed($avatarSection)}>
            {image ? (
              <Image source={image} style={{ width: 80, height: 80, borderRadius: 12 }} resizeMode="cover" />
            ) : (
              <Avatar name={name} size="xl" shape="rounded" />
            )}
            {sustainabilityCertified && (
              <View style={themed($certifiedBadge)}>
                <Icon icon="check" size={14} color={theme.colors.palette.sand100} />
              </View>
            )}
          </View>

          <View style={themed($headerInfo)}>
            <Text text={name} preset="heading" style={themed($nameText)} />
            <View style={themed($typeRow)}>
              <Text text={typeLabels[type]} size="sm" style={themed($typeText)} />
              <Badge
                text={statusInfo.label}
                status={statusInfo.status}
                size="sm"
                badgeStyle="subtle"
              />
            </View>
            {owner && (
              <Text text={`Captain: ${owner}`} size="sm" style={themed($ownerText)} />
            )}
            <View style={themed($locationRow)}>
              <Icon icon="pin" size={14} color={theme.colors.palette.sand500} />
              <Text text={location} size="sm" style={themed($locationText)} />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={themed($actionButtons)}>
          {onFollow && (
            <Button
              text={isFollowing ? "Following" : "Follow"}
              preset={isFollowing ? "default" : "reversed"}
              onPress={onFollow}
              style={themed($followButton)}
            />
          )}
          {onContact && (
            <Button
              text="Contact"
              preset="default"
              onPress={onContact}
              style={themed($contactButton)}
            />
          )}
        </View>
      </Card>

      {/* Stats Section */}
      <View style={themed($statsSection)}>
        <StatCard
          label="Rating"
          value={rating ? `${rating.toFixed(1)}${reviewCount ? ` (${reviewCount})` : ""}` : "N/A"}
          icon="heart"
          style={themed($statCard)}
        />
        <StatCard
          label="Years Active"
          value={yearsActive?.toString() || "N/A"}
          icon="community"
          style={themed($statCard)}
        />
        <StatCard
          label="Transactions"
          value={totalTransactions ? `${totalTransactions}${successRate ? ` (${successRate}%)` : ""}` : "0"}
          icon="components"
          style={themed($statCard)}
        />
      </View>

      {/* About Section */}
      {description && (
        <Card style={themed($sectionCard)}>
          <Text text="About" preset="subheading" style={themed($sectionTitle)} />
          <Text text={description} size="sm" style={themed($descriptionText)} />
        </Card>
      )}

      {/* Specialties Section */}
      {specialties && specialties.length > 0 && (
        <Card style={themed($sectionCard)}>
          <Text text="Specialties" preset="subheading" style={themed($sectionTitle)} />
          <View style={themed($specialtiesList)}>
            {specialties.map((specialty, index) => (
              <Badge
                key={index}
                text={specialty}
                status="info"
                size="md"
                badgeStyle="outline"
              />
            ))}
          </View>
        </Card>
      )}

      {/* Contact Section */}
      {(phone || email) && (
        <Card style={themed($sectionCard)}>
          <Text text="Contact Information" preset="subheading" style={themed($sectionTitle)} />
          {phone && (
            <View style={themed($contactRow)}>
              <Icon icon="community" size={16} color={theme.colors.palette.sand600} />
              <Text text={phone} size="sm" style={themed($contactText)} />
            </View>
          )}
          {email && (
            <View style={themed($contactRow)}>
              <Icon icon="community" size={16} color={theme.colors.palette.sand600} />
              <Text text={email} size="sm" style={themed($contactText)} />
            </View>
          )}
        </Card>
      )}
    </ScrollView>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xl,
})

const $headerCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginHorizontal: spacing.md,
  marginTop: -40,
})

const $headerContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.md,
})

const $avatarSection: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
})

const $certifiedBadge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: -4,
  right: -4,
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: colors.palette.seafoam400,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: colors.background,
})

const $headerInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxs,
})

const $nameText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $typeRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $typeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $ownerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $locationRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $locationText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $actionButtons: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
  marginTop: spacing.md,
})

const $followButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.ocean500,
})

const $contactButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $statsSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  paddingHorizontal: spacing.md,
  marginTop: spacing.md,
  gap: spacing.sm,
})

const $statCard: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $sectionCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginHorizontal: spacing.md,
  marginTop: spacing.md,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand800,
  marginBottom: spacing.sm,
})

const $descriptionText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
  lineHeight: 22,
})

const $specialtiesList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.xs,
})

const $contactRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
  marginBottom: spacing.xs,
})

const $contactText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
})
