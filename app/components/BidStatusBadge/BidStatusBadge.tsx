import { ReactNode } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Icon, IconTypes } from "../Icon"
import { Text, TextProps } from "../Text"

export type BidStatus = "pending" | "winning" | "won" | "outbid" | "lost" | "expired" | "cancelled"
type Size = "sm" | "md" | "lg"

export interface BidStatusBadgeProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the badge text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Bid status variant of the badge.
   */
  status: BidStatus
  /**
   * Size variant of the badge.
   */
  size?: Size
  /**
   * Whether to show an icon for the status.
   */
  showIcon?: boolean
  /**
   * Children components.
   */
  children?: ReactNode
}

/**
 * A component for displaying bid status in the auction system.
 * Uses the seaside color palette to indicate different bid states.
 * @param {BidStatusBadgeProps} props - The props for the `BidStatusBadge` component.
 * @returns {JSX.Element} The rendered `BidStatusBadge` component.
 * @example
 * <BidStatusBadge
 *   status="won"
 *   size="md"
 *   showIcon
 * />
 */
export function BidStatusBadge(props: BidStatusBadgeProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    children,
  } = props

  const { themed } = useAppTheme()

  const status: BidStatus = props.status
  const size: Size = props.size ?? "md"
  const showIcon = props.showIcon ?? false

  // Get default text for status if no text provided
  const defaultText = STATUS_TEXT[status]
  const content = tx || text || children || defaultText

  const icon = showIcon ? STATUS_ICONS[status] : undefined
  const iconColor = themed($textStatusStyles[status]).color

  const $viewStyles: StyleProp<ViewStyle> = [
    themed($baseBadgeStyle),
    themed($sizeStyles[size]),
    themed($statusStyles[status]),
    $viewStyleOverride,
  ]

  const $textStyles: StyleProp<TextStyle> = [
    themed($baseTextStyle),
    themed($textSizeStyles[size]),
    themed($textStatusStyles[status]),
    $textStyleOverride,
  ]

  return (
    <View style={$viewStyles}>
      {icon && (
        <Icon
          icon={icon}
          size={ICON_SIZES[size]}
          color={iconColor as string}
          containerStyle={themed($iconContainerStyle)}
        />
      )}
      <Text tx={tx} text={typeof content === "string" ? content : undefined} txOptions={txOptions} style={$textStyles}>
        {typeof content !== "string" ? content : undefined}
      </Text>
    </View>
  )
}

// Default text labels for each status
const STATUS_TEXT: Record<BidStatus, string> = {
  pending: "Pending",
  winning: "Winning",
  won: "Won",
  outbid: "Outbid",
  lost: "Lost",
  expired: "Expired",
  cancelled: "Cancelled",
}

// Optional icons for each status
const STATUS_ICONS: Record<BidStatus, IconTypes | undefined> = {
  pending: undefined, // Could use "clock" icon if available
  winning: "check",
  won: "check",
  outbid: "x",
  lost: "x",
  expired: undefined, // Could use "calendar" icon if available
  cancelled: "x",
}

// Base styles
const $baseBadgeStyle: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-start",
  borderRadius: 12,
  borderWidth: 1,
  gap: 4,
})

const $baseTextStyle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.medium,
  textAlign: "center",
})

const $iconContainerStyle: ThemedStyle<ViewStyle> = () => ({
  marginRight: 2,
})

// Size styles for container
const $sizeStyles: Record<Size, ThemedStyle<ViewStyle>> = {
  sm: ({ spacing }) => ({
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxxs,
    minWidth: 20,
    minHeight: 20,
  }),
  md: ({ spacing }) => ({
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    minWidth: 24,
    minHeight: 24,
  }),
  lg: ({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minWidth: 32,
    minHeight: 32,
  }),
}

// Size styles for text
const $textSizeStyles: Record<Size, ThemedStyle<TextStyle>> = {
  sm: () => ({
    fontSize: 10,
    lineHeight: 14,
  }),
  md: () => ({
    fontSize: 12,
    lineHeight: 16,
  }),
  lg: () => ({
    fontSize: 14,
    lineHeight: 20,
  }),
}

// Icon sizes for each badge size
const ICON_SIZES: Record<Size, number> = {
  sm: 10,
  md: 12,
  lg: 14,
}

// Status styles using seaside colors
const $statusStyles: Record<BidStatus, ThemedStyle<ViewStyle>> = {
  pending: ({ colors }) => ({
    backgroundColor: colors.palette.sunset400,
    borderColor: colors.palette.sunset400,
  }),
  winning: ({ colors }) => ({
    backgroundColor: colors.palette.seafoam400,
    borderColor: colors.palette.seafoam400,
  }),
  won: ({ colors }) => ({
    backgroundColor: colors.palette.seafoam300,
    borderColor: colors.palette.seafoam300,
  }),
  outbid: ({ colors }) => ({
    backgroundColor: colors.palette.coral400,
    borderColor: colors.palette.coral400,
  }),
  lost: ({ colors }) => ({
    backgroundColor: colors.palette.coral300,
    borderColor: colors.palette.coral300,
  }),
  expired: ({ colors }) => ({
    backgroundColor: colors.palette.sand500,
    borderColor: colors.palette.sand500,
  }),
  cancelled: ({ colors }) => ({
    backgroundColor: colors.palette.sand400,
    borderColor: colors.palette.sand400,
  }),
}

// Text color styles for each status
const $textStatusStyles: Record<BidStatus, ThemedStyle<TextStyle>> = {
  pending: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
  winning: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
  won: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
  outbid: ({ colors }) => ({
    color: colors.palette.sand100,
  }),
  lost: ({ colors }) => ({
    color: colors.palette.sand100,
  }),
  expired: ({ colors }) => ({
    color: colors.palette.sand100,
  }),
  cancelled: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
}
