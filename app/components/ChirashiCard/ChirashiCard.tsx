import { Pressable, StyleProp, View, ViewStyle, TextStyle, Image, ImageSourcePropType, ImageStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Icon } from "../Icon"
import { CountdownTimer } from "../CountdownTimer"

export interface ChirashiCardProps {
  /**
   * Product/item title
   */
  title: string
  /**
   * Japanese subtitle (optional)
   */
  japaneseTitle?: string
  /**
   * Item image
   */
  image?: ImageSourcePropType
  /**
   * Current/sale price
   */
  price: number
  /**
   * Original price for comparison (strikethrough)
   */
  originalPrice?: number
  /**
   * Price unit (e.g., "/kg", "/box", "/lot")
   */
  priceUnit?: string
  /**
   * Currency code
   * @default "JPY"
   */
  currency?: string
  /**
   * Banner text (e.g., "本日の特売", "SPECIAL", "限定")
   */
  bannerText?: string
  /**
   * Banner style
   */
  bannerStyle?: "burst" | "ribbon" | "stamp"
  /**
   * Array of tags/badges to display
   */
  tags?: Array<{
    text: string
    color?: "red" | "blue" | "green" | "orange" | "purple"
    icon?: string
  }>
  /**
   * Quantity remaining
   */
  remainingStock?: number
  /**
   * Auction end time
   */
  endDate?: Date
  /**
   * Number of bids
   */
  bidCount?: number
  /**
   * Discount percentage to display
   */
  discountPercent?: number
  /**
   * Origin/source text
   */
  origin?: string
  /**
   * Grade/quality
   */
  grade?: string
  /**
   * Weight
   */
  weight?: string
  /**
   * Callback when card is pressed
   */
  onPress?: () => void
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * ChirashiCard - Japanese chirashi (flyer) style maximalist card
 *
 * Inspired by Japanese supermarket advertising with:
 * - Bold price displays with bursts/ribbons
 * - Dense information layout
 * - Vibrant colors and multiple focal points
 * - Urgency indicators
 */
export function ChirashiCard(props: ChirashiCardProps) {
  const {
    title,
    japaneseTitle,
    image,
    price,
    originalPrice,
    priceUnit = "",
    currency = "JPY",
    bannerText,
    bannerStyle = "burst",
    tags = [],
    remainingStock,
    endDate,
    bidCount,
    discountPercent,
    origin,
    grade,
    weight,
    onPress,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const formatPrice = (value: number): string => {
    if (currency === "JPY") {
      return `¥${value.toLocaleString()}`
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getTagColor = (color?: string) => {
    switch (color) {
      case "red": return theme.colors.palette.coral500
      case "blue": return theme.colors.palette.ocean500
      case "green": return theme.colors.palette.seafoam500
      case "orange": return theme.colors.palette.sunset500
      case "purple": return "#8B5CF6"
      default: return theme.colors.palette.ocean500
    }
  }

  const getTagBg = (color?: string) => {
    switch (color) {
      case "red": return theme.colors.palette.coral100
      case "blue": return theme.colors.palette.ocean100
      case "green": return theme.colors.palette.seafoam100
      case "orange": return theme.colors.palette.sunset100
      case "purple": return "#EDE9FE"
      default: return theme.colors.palette.ocean100
    }
  }

  const content = (
    <View style={[themed($container), $styleOverride]}>
      {/* Banner Header */}
      {bannerText && (
        <View style={themed(bannerStyle === "burst" ? $bannerBurst : bannerStyle === "stamp" ? $bannerStamp : $bannerRibbon)}>
          <Text
            text={bannerStyle === "burst" ? `★ ${bannerText} ★` : bannerText}
            weight="bold"
            style={themed($bannerText)}
          />
        </View>
      )}

      {/* Main Content Row */}
      <View style={themed($mainRow)}>
        {/* Image Section */}
        <View style={themed($imageSection)}>
          {image ? (
            <Image source={image} style={themed($image)} resizeMode="cover" />
          ) : (
            <View style={themed($imagePlaceholder)}>
              <Icon icon="components" size={40} color={theme.colors.palette.sand400} />
            </View>
          )}

          {/* Discount Badge */}
          {discountPercent && (
            <View style={themed($discountBadge)}>
              <Text text={`${discountPercent}%`} weight="bold" style={themed($discountText)} />
              <Text text="OFF" weight="bold" style={themed($discountOffText)} />
            </View>
          )}
        </View>

        {/* Price Section */}
        <View style={themed($priceSection)}>
          {/* Price Burst */}
          <View style={themed($priceBurst)}>
            <Text
              text={formatPrice(price)}
              weight="bold"
              style={themed($priceText)}
            />
            {priceUnit && (
              <Text text={priceUnit} weight="medium" style={themed($priceUnit)} />
            )}
          </View>

          {/* Original Price (strikethrough) */}
          {originalPrice && (
            <View style={themed($originalPriceRow)}>
              <Text text="通常" size="xs" style={themed($originalLabel)} />
              <Text
                text={formatPrice(originalPrice)}
                size="sm"
                style={themed($originalPrice)}
              />
            </View>
          )}

          {/* Title */}
          <Text text={title} weight="bold" style={themed($title)} numberOfLines={2} />
          {japaneseTitle && (
            <Text text={japaneseTitle} size="xs" style={themed($japaneseTitle)} />
          )}
        </View>
      </View>

      {/* Tags Row */}
      {(tags.length > 0 || origin || grade || weight) && (
        <View style={themed($tagsRow)}>
          {origin && (
            <View style={[themed($tag), { backgroundColor: getTagBg("blue") }]}>
              <Icon icon="pin" size={10} color={getTagColor("blue")} />
              <Text text={origin} size="xxs" weight="medium" style={{ color: getTagColor("blue") }} />
            </View>
          )}
          {grade && (
            <View style={[themed($tag), { backgroundColor: getTagBg("green") }]}>
              <Text text={grade} size="xxs" weight="bold" style={{ color: getTagColor("green") }} />
            </View>
          )}
          {weight && (
            <View style={[themed($tag), { backgroundColor: getTagBg("orange") }]}>
              <Text text={weight} size="xxs" weight="medium" style={{ color: getTagColor("orange") }} />
            </View>
          )}
          {tags.map((tag, index) => (
            <View key={index} style={[themed($tag), { backgroundColor: getTagBg(tag.color) }]}>
              {tag.icon && <Icon icon={tag.icon as any} size={10} color={getTagColor(tag.color)} />}
              <Text text={tag.text} size="xxs" weight="medium" style={{ color: getTagColor(tag.color) }} />
            </View>
          ))}
        </View>
      )}

      {/* Bottom Info Bar */}
      <View style={themed($infoBar)}>
        {remainingStock !== undefined && (
          <View style={themed($infoItem)}>
            <View style={themed($stockBadge)}>
              <Text text={`残り ${remainingStock}点!`} size="xs" weight="bold" style={themed($stockText)} />
            </View>
          </View>
        )}

        {endDate && (
          <View style={themed($infoItem)}>
            <CountdownTimer targetDate={endDate} size="xs" />
          </View>
        )}

        {bidCount !== undefined && (
          <View style={themed($infoItem)}>
            <View style={themed($bidBadge)}>
              <Icon icon="components" size={12} color={theme.colors.palette.ocean600} />
              <Text text={`入札${bidCount}`} size="xs" weight="medium" style={themed($bidText)} />
            </View>
          </View>
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
  backgroundColor: colors.palette.sand100,
  borderRadius: spacing.sm,
  borderWidth: 3,
  borderColor: colors.palette.coral500,
  overflow: "hidden",
})

// Banner styles
const $bannerBurst: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.coral500,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  alignItems: "center",
})

const $bannerRibbon: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.sunset500,
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.md,
  alignItems: "center",
  transform: [{ skewX: "-2deg" }],
})

const $bannerStamp: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.ocean600,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.lg,
  alignItems: "center",
  alignSelf: "center",
  borderRadius: spacing.xxs,
  marginTop: spacing.xs,
  borderWidth: 2,
  borderColor: colors.palette.ocean600,
})

const $bannerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontSize: 14,
  letterSpacing: 2,
})

// Main content
const $mainRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  padding: spacing.sm,
  gap: spacing.sm,
})

const $imageSection: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
  width: 100,
  height: 100,
})

const $image: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  width: 100,
  height: 100,
  borderRadius: spacing.xs,
})

const $imagePlaceholder: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 100,
  height: 100,
  borderRadius: spacing.xs,
  backgroundColor: colors.palette.sand200,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: colors.palette.sand300,
  borderStyle: "dashed",
})

const $discountBadge: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: -4,
  right: -4,
  backgroundColor: colors.palette.coral500,
  borderRadius: 20,
  width: 44,
  height: 44,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: colors.palette.sand100,
  transform: [{ rotate: "12deg" }],
})

const $discountText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontSize: 14,
  lineHeight: 16,
})

const $discountOffText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontSize: 8,
  lineHeight: 10,
})

// Price section
const $priceSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxs,
})

const $priceBurst: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.sunset100,
  borderWidth: 3,
  borderColor: colors.palette.sunset500,
  borderRadius: spacing.xs,
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.sm,
  flexDirection: "row",
  alignItems: "baseline",
  alignSelf: "flex-start",
  gap: spacing.xxs,
})

const $priceText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
  fontSize: 28,
  lineHeight: 32,
  textShadowColor: colors.palette.coral200,
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 0,
})

const $priceUnit: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
  fontSize: 14,
})

const $originalPriceRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $originalLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $originalPrice: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  textDecorationLine: "line-through",
})

const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
  fontSize: 16,
})

const $japaneseTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

// Tags
const $tagsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  paddingHorizontal: spacing.sm,
  paddingBottom: spacing.xs,
  gap: spacing.xxs,
})

const $tag: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.xxxs,
  paddingHorizontal: spacing.xs,
  borderRadius: spacing.xxxs,
  gap: spacing.xxxs,
})

// Info bar
const $infoBar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  backgroundColor: colors.palette.sand200,
  borderTopWidth: 2,
  borderTopColor: colors.palette.sand300,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
  justifyContent: "space-between",
  alignItems: "center",
  gap: spacing.xs,
})

const $infoItem: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
})

const $stockBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.coral500,
  paddingVertical: spacing.xxxs,
  paddingHorizontal: spacing.xs,
  borderRadius: spacing.xxxs,
})

const $stockText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
})

const $bidBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.ocean100,
  paddingVertical: spacing.xxxs,
  paddingHorizontal: spacing.xs,
  borderRadius: spacing.xxxs,
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxxs,
})

const $bidText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
})
