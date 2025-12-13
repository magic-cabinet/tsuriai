import { Pressable, StyleProp, View, ViewStyle, TextStyle, Image, ImageSourcePropType } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"
import { Badge } from "../Badge"
import { Card } from "../Card"

type FishGrade = "A" | "B" | "C" | "premium" | "standard"
type FishFreshness = "live" | "fresh" | "frozen" | "processed"

export interface FishCardProps {
  /**
   * Fish species name
   */
  species: string
  /**
   * Species name i18n key
   */
  speciesTx?: TextProps["tx"]
  /**
   * Japanese name (optional)
   */
  japaneseName?: string
  /**
   * Weight in kg
   */
  weight: number
  /**
   * Grade of the fish
   */
  grade?: FishGrade
  /**
   * Freshness status
   */
  freshness?: FishFreshness
  /**
   * Price per kg
   */
  pricePerKg?: number
  /**
   * Total price
   */
  totalPrice?: number
  /**
   * Currency code
   * @default "USD"
   */
  currency?: string
  /**
   * Fish image source
   */
  image?: ImageSourcePropType
  /**
   * Catch location
   */
  origin?: string
  /**
   * Catch date
   */
  catchDate?: Date
  /**
   * Callback when card is pressed
   */
  onPress?: () => void
  /**
   * Whether the card is selected
   */
  selected?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const gradeLabels: Record<FishGrade, string> = {
  A: "Grade A",
  B: "Grade B",
  C: "Grade C",
  premium: "Premium",
  standard: "Standard",
}

const freshnessLabels: Record<FishFreshness, string> = {
  live: "Live",
  fresh: "Fresh",
  frozen: "Frozen",
  processed: "Processed",
}

/**
 * FishCard component for displaying fish information.
 * Shows species, weight, grade, price, and other details.
 *
 * @param {FishCardProps} props - The props for the `FishCard` component.
 * @returns {JSX.Element} The rendered `FishCard` component.
 *
 * @example
 * <FishCard
 *   species="Bluefin Tuna"
 *   japaneseName="クロマグロ"
 *   weight={45.5}
 *   grade="A"
 *   freshness="fresh"
 *   pricePerKg={150}
 *   totalPrice={6825}
 *   origin="Tsukiji, Tokyo"
 *   onPress={() => handleFishSelect(fish)}
 * />
 */
export function FishCard(props: FishCardProps) {
  const {
    species,
    speciesTx,
    japaneseName,
    weight,
    grade,
    freshness,
    pricePerKg,
    totalPrice,
    currency = "USD",
    image,
    origin,
    catchDate,
    onPress,
    selected = false,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const getGradeBadgeStatus = (g: FishGrade) => {
    switch (g) {
      case "A":
      case "premium":
        return "success"
      case "B":
        return "info"
      case "C":
      case "standard":
        return "neutral"
      default:
        return "neutral"
    }
  }

  const getFreshnessBadgeStatus = (f: FishFreshness) => {
    switch (f) {
      case "live":
        return "success"
      case "fresh":
        return "success"
      case "frozen":
        return "info"
      case "processed":
        return "neutral"
      default:
        return "neutral"
    }
  }

  const $containerStyle: StyleProp<ViewStyle> = [
    selected && themed($selectedContainer),
    $styleOverride,
  ]

  const content = (
    <Card
      style={$containerStyle}
      ContentComponent={
        <View style={themed($content)}>
          {/* Image section */}
          {image && (
            <View style={themed($imageContainer)}>
              <Image source={image} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
            </View>
          )}

          {/* Info section */}
          <View style={themed($infoSection)}>
            {/* Header with species and badges */}
            <View style={themed($header)}>
              <View style={themed($titleContainer)}>
                <Text
                  text={species}
                  tx={speciesTx}
                  preset="bold"
                  style={themed($speciesText)}
                />
                {japaneseName && (
                  <Text text={japaneseName} size="xs" style={themed($japaneseText)} />
                )}
              </View>
              <View style={themed($badgeRow)}>
                {grade && (
                  <Badge
                    text={gradeLabels[grade]}
                    status={getGradeBadgeStatus(grade)}
                    size="sm"
                    badgeStyle="subtle"
                  />
                )}
                {freshness && (
                  <Badge
                    text={freshnessLabels[freshness]}
                    status={getFreshnessBadgeStatus(freshness)}
                    size="sm"
                    badgeStyle="outline"
                  />
                )}
              </View>
            </View>

            {/* Details row */}
            <View style={themed($detailsRow)}>
              <View style={themed($detail)}>
                <Text text="Weight" size="xs" style={themed($detailLabel)} />
                <Text text={`${weight} kg`} style={themed($detailValue)} />
              </View>
              {origin && (
                <View style={themed($detail)}>
                  <Text text="Origin" size="xs" style={themed($detailLabel)} />
                  <Text text={origin} style={themed($detailValue)} numberOfLines={1} />
                </View>
              )}
              {catchDate && (
                <View style={themed($detail)}>
                  <Text text="Caught" size="xs" style={themed($detailLabel)} />
                  <Text text={formatDate(catchDate)} style={themed($detailValue)} />
                </View>
              )}
            </View>

            {/* Price section */}
            {(pricePerKg !== undefined || totalPrice !== undefined) && (
              <View style={themed($priceSection)}>
                {pricePerKg !== undefined && (
                  <Text text={`${formatPrice(pricePerKg)}/kg`} size="sm" style={themed($pricePerKg)} />
                )}
                {totalPrice !== undefined && (
                  <Text text={formatPrice(totalPrice)} preset="bold" style={themed($totalPrice)} />
                )}
              </View>
            )}
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

const $selectedContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderWidth: 2,
  borderColor: colors.palette.ocean500,
})

const $content: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
})

const $imageContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 100,
  height: 100,
  borderRadius: spacing.sm,
  overflow: "hidden",
  marginRight: spacing.md,
})

const $infoSection: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $titleContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxs,
})

const $speciesText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $japaneseText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $badgeRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xxs,
  marginTop: spacing.xxs,
})

const $detailsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.md,
  marginBottom: spacing.sm,
})

const $detail: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $detailLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $detailValue: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand800,
  fontFamily: typography.primary.medium,
})

const $priceSection: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
  paddingTop: spacing.xs,
})

const $pricePerKg: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $totalPrice: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
  fontSize: 18,
})
