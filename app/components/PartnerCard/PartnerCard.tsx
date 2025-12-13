import { Pressable, StyleProp, TextStyle, View, ViewStyle, Image, ImageSourcePropType } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Card } from "../Card"
import { Avatar } from "../Avatar"
import { Badge } from "../Badge"
import { Icon } from "../Icon"
import { Button } from "../Button"

type PartnerType = "supplier" | "buyer" | "logistics" | "processor"
type PartnerTier = "standard" | "preferred" | "premium"

export interface PartnerCardProps {
  /**
   * Partner/company name
   */
  name: string
  /**
   * Partner type
   */
  type: PartnerType
  /**
   * Partner tier/level
   */
  tier?: PartnerTier
  /**
   * Company logo
   */
  logo?: ImageSourcePropType
  /**
   * Location
   */
  location?: string
  /**
   * Description/specialization
   */
  description?: string
  /**
   * Average rating
   */
  rating?: number
  /**
   * Number of transactions
   */
  transactionCount?: number
  /**
   * Years in partnership
   */
  yearsPartner?: number
  /**
   * Whether partner is verified
   */
  verified?: boolean
  /**
   * Contact person name
   */
  contactName?: string
  /**
   * Callback when card is pressed
   */
  onPress?: () => void
  /**
   * Callback when contact is pressed
   */
  onContact?: () => void
  /**
   * Whether to show compact view
   */
  compact?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const TYPE_CONFIG: Record<PartnerType, { label: string; color: string }> = {
  supplier: { label: "Supplier", color: "ocean" },
  buyer: { label: "Buyer", color: "seafoam" },
  logistics: { label: "Logistics", color: "sunset" },
  processor: { label: "Processor", color: "kelp" },
}

const TIER_CONFIG: Record<PartnerTier, { label: string; status: "neutral" | "info" | "success" }> = {
  standard: { label: "Standard", status: "neutral" },
  preferred: { label: "Preferred", status: "info" },
  premium: { label: "Premium", status: "success" },
}

/**
 * PartnerCard component for displaying business partner information.
 *
 * @param {PartnerCardProps} props - The props for the `PartnerCard` component.
 * @returns {JSX.Element} The rendered `PartnerCard` component.
 */
export function PartnerCard(props: PartnerCardProps) {
  const {
    name,
    type,
    tier,
    logo,
    location,
    description,
    rating,
    transactionCount,
    yearsPartner,
    verified = false,
    contactName,
    onPress,
    onContact,
    compact = false,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const typeConfig = TYPE_CONFIG[type]
  const tierConfig = tier ? TIER_CONFIG[tier] : null

  const content = (
    <Card style={$styleOverride}>
      <View style={themed(compact ? $compactContent : $content)}>
        {/* Header */}
        <View style={themed($header)}>
          {logo ? (
            <Image source={logo} style={{ width: compact ? 40 : 56, height: compact ? 40 : 56, borderRadius: 8 }} resizeMode="cover" />
          ) : (
            <Avatar name={name} size={compact ? "md" : "lg"} shape="rounded" />
          )}

          <View style={themed($headerInfo)}>
            <View style={themed($nameRow)}>
              <Text
                text={name}
                preset={compact ? "bold" : "subheading"}
                style={themed($nameText)}
                numberOfLines={1}
              />
              {verified && (
                <View style={themed($verifiedBadge)}>
                  <Icon icon="check" size={12} color={theme.colors.palette.sand100} />
                </View>
              )}
            </View>

            <View style={themed($badgeRow)}>
              <Badge
                text={typeConfig.label}
                status="info"
                size="sm"
                badgeStyle="outline"
              />
              {tierConfig && (
                <Badge
                  text={tierConfig.label}
                  status={tierConfig.status}
                  size="sm"
                  badgeStyle="subtle"
                />
              )}
            </View>

            {location && !compact && (
              <View style={themed($locationRow)}>
                <Icon icon="pin" size={12} color={theme.colors.palette.sand500} />
                <Text text={location} size="xs" style={themed($locationText)} numberOfLines={1} />
              </View>
            )}
          </View>
        </View>

        {/* Description */}
        {description && !compact && (
          <Text text={description} size="sm" style={themed($description)} numberOfLines={2} />
        )}

        {/* Stats */}
        {!compact && (rating !== undefined || transactionCount !== undefined || yearsPartner !== undefined) && (
          <View style={themed($statsRow)}>
            {rating !== undefined && (
              <View style={themed($stat)}>
                <Icon icon="heart" size={14} color={theme.colors.palette.sunset400} />
                <Text text={rating.toFixed(1)} size="sm" weight="medium" style={themed($statValue)} />
              </View>
            )}
            {transactionCount !== undefined && (
              <View style={themed($stat)}>
                <Text text={`${transactionCount} transactions`} size="xs" style={themed($statLabel)} />
              </View>
            )}
            {yearsPartner !== undefined && (
              <View style={themed($stat)}>
                <Text text={`${yearsPartner}y partner`} size="xs" style={themed($statLabel)} />
              </View>
            )}
          </View>
        )}

        {/* Contact */}
        {(contactName || onContact) && !compact && (
          <View style={themed($contactSection)}>
            {contactName && (
              <Text text={`Contact: ${contactName}`} size="xs" style={themed($contactName)} />
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
        )}
      </View>
    </Card>
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

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.md,
})

const $compactContent: ThemedStyle<ViewStyle> = () => ({})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.md,
})

const $headerInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxs,
})

const $nameRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $nameText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
  flex: 1,
})

const $verifiedBadge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: colors.palette.seafoam400,
  alignItems: "center",
  justifyContent: "center",
})

const $badgeRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xs,
})

const $locationRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $locationText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  flex: 1,
})

const $description: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
  lineHeight: 20,
})

const $statsRow: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  gap: spacing.lg,
  paddingTop: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $stat: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $statValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $statLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $contactSection: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $contactName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $contactButton: ThemedStyle<ViewStyle> = () => ({
  paddingHorizontal: 16,
})
