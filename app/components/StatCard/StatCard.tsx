import { ReactNode } from "react"
import { StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Icon, IconTypes } from "../Icon"
import { Badge } from "../Badge"

type Trend = "up" | "down" | "neutral"
type Variant = "compact" | "expanded"

export interface StatCardProps {
  /**
   * Label text for the statistic
   */
  label: string
  /**
   * The main value to display
   */
  value: string | number
  /**
   * Optional trend direction
   */
  trend?: Trend
  /**
   * Optional trend value text (e.g., "+5.2%")
   */
  trendValue?: string
  /**
   * Optional icon to display
   */
  icon?: IconTypes
  /**
   * Display variant
   */
  variant?: Variant
  /**
   * Optional style override for the container
   */
  style?: StyleProp<ViewStyle>
  /**
   * Optional style override for the value text
   */
  valueStyle?: StyleProp<TextStyle>
  /**
   * Optional style override for the label text
   */
  labelStyle?: StyleProp<TextStyle>
  /**
   * Custom component to render instead of default value
   */
  ValueComponent?: ReactNode
}

/**
 * StatCard component for displaying key metrics with optional trend indicators.
 * Uses the seaside color palette for trend visualization.
 *
 * @param {StatCardProps} props - The props for the `StatCard` component.
 * @returns {JSX.Element} The rendered `StatCard` component.
 *
 * @example
 * <StatCard
 *   label="Price per lb"
 *   value="$12.50"
 *   trend="up"
 *   trendValue="+5.2%"
 *   icon="check"
 * />
 */
export function StatCard(props: StatCardProps) {
  const {
    label,
    value,
    trend,
    trendValue,
    icon,
    variant = "compact",
    style: $styleOverride,
    valueStyle: $valueStyleOverride,
    labelStyle: $labelStyleOverride,
    ValueComponent,
  } = props

  const { themed, theme } = useAppTheme()

  const isCompact = variant === "compact"

  // Determine trend colors based on direction
  const getTrendColor = (): string => {
    if (!trend) return theme.colors.palette.sand500

    switch (trend) {
      case "up":
        return theme.colors.palette.seafoam300 // Green for positive
      case "down":
        return theme.colors.palette.coral400 // Red for negative
      case "neutral":
      default:
        return theme.colors.palette.sand500 // Gray for neutral
    }
  }

  // Determine trend status for badge
  const getTrendStatus = (): "success" | "error" | "neutral" => {
    if (!trend) return "neutral"
    switch (trend) {
      case "up":
        return "success"
      case "down":
        return "error"
      case "neutral":
      default:
        return "neutral"
    }
  }

  // Determine trend icon
  const getTrendIcon = (): IconTypes | undefined => {
    if (!trend) return undefined
    switch (trend) {
      case "up":
        return "caretRight" // Using caretRight rotated as up arrow
      case "down":
        return "caretRight" // Using caretRight rotated as down arrow
      default:
        return undefined
    }
  }

  const $containerStyles: StyleProp<ViewStyle> = [
    themed($baseContainerStyle),
    isCompact ? themed($compactContainerStyle) : themed($expandedContainerStyle),
    $styleOverride,
  ]

  const $valueStyles: StyleProp<TextStyle> = [
    themed($baseValueStyle),
    isCompact ? $compactValueStyle : $expandedValueStyle,
    $valueStyleOverride,
  ]

  const $labelStyles: StyleProp<TextStyle> = [
    themed($baseLabelStyle),
    $labelStyleOverride,
  ]

  const trendColor = getTrendColor()
  const trendIcon = getTrendIcon()
  const trendStatus = getTrendStatus()

  return (
    <View style={$containerStyles}>
      {/* Header with label and optional icon */}
      <View style={themed($headerStyle)}>
        <Text text={label} style={$labelStyles} />
        {icon && (
          <Icon
            icon={icon}
            size={isCompact ? 16 : 20}
            color={theme.colors.palette.sand500}
          />
        )}
      </View>

      {/* Value display */}
      <View style={themed($valueContainerStyle)}>
        {ValueComponent || (
          <Text
            text={typeof value === "number" ? value.toLocaleString() : value}
            style={$valueStyles}
          />
        )}
      </View>

      {/* Trend indicator */}
      {(trend || trendValue) && (
        <View style={themed($trendContainerStyle)}>
          {trend && trendIcon && (
            <View
              style={[
                themed($trendIconContainerStyle),
                trend === "down" && $trendIconRotatedStyle,
              ]}
            >
              <Icon icon={trendIcon} size={12} color={trendColor} />
            </View>
          )}
          {trendValue && (
            <Badge
              text={trendValue}
              status={trendStatus}
              badgeStyle="subtle"
              size="sm"
              style={themed($trendBadgeStyle)}
            />
          )}
        </View>
      )}
    </View>
  )
}

// Base styles
const $baseContainerStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: colors.border,
  padding: spacing.md,
  gap: spacing.xs,
})

const $compactContainerStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  gap: spacing.xs,
})

const $expandedContainerStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
  gap: spacing.sm,
})

const $headerStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: spacing.xs,
})

const $baseLabelStyle: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  lineHeight: 16,
  color: colors.textDim,
  fontFamily: typography.primary.medium,
  letterSpacing: 0.5,
  textTransform: "uppercase",
})

const $valueContainerStyle: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "baseline",
})

const $baseValueStyle: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.text,
  fontFamily: typography.primary.bold,
})

const $compactValueStyle: TextStyle = {
  fontSize: 24,
  lineHeight: 32,
}

const $expandedValueStyle: TextStyle = {
  fontSize: 32,
  lineHeight: 40,
}

const $trendContainerStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $trendIconContainerStyle: ThemedStyle<ViewStyle> = () => ({
  transform: [{ rotate: "-90deg" }], // Rotate caretRight to point up
})

const $trendIconRotatedStyle: ViewStyle = {
  transform: [{ rotate: "90deg" }], // Rotate caretRight to point down
}

const $trendBadgeStyle: ThemedStyle<ViewStyle> = () => ({
  alignSelf: "flex-start",
})
