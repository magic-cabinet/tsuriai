import { ReactNode } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"

import { Text, TextProps } from "../Text"

type Status = "success" | "warning" | "error" | "info" | "neutral"
type Size = "sm" | "md" | "lg"
type BadgeStyle = "solid" | "outline" | "subtle"

export interface BadgeProps {
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
   * Status variant of the badge.
   */
  status?: Status
  /**
   * Size variant of the badge.
   */
  size?: Size
  /**
   * Style variant of the badge.
   */
  badgeStyle?: BadgeStyle
  /**
   * Optional count number to display instead of text.
   */
  count?: number
  /**
   * Children components.
   */
  children?: ReactNode
}

/**
 * A component for status indicators, counts, and labels.
 * Uses the seaside color palette for different statuses.
 * @param {BadgeProps} props - The props for the `Badge` component.
 * @returns {JSX.Element} The rendered `Badge` component.
 * @example
 * <Badge
 *   text="Success"
 *   status="success"
 *   size="md"
 *   badgeStyle="solid"
 * />
 */
export function Badge(props: BadgeProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    count,
    children,
  } = props

  const { themed } = useAppTheme()

  const status: Status = props.status ?? "neutral"
  const size: Size = props.size ?? "md"
  const badgeStyle: BadgeStyle = props.badgeStyle ?? "solid"

  const content = count !== undefined ? String(count) : tx || text || children

  const $viewStyles: StyleProp<ViewStyle> = [
    themed($baseBadgeStyle),
    themed($sizeStyles[size]),
    themed($statusStyles[status][badgeStyle]),
    $viewStyleOverride,
  ]

  const $textStyles: StyleProp<TextStyle> = [
    themed($baseTextStyle),
    themed($textSizeStyles[size]),
    themed($textStatusStyles[status][badgeStyle]),
    $textStyleOverride,
  ]

  return (
    <View style={$viewStyles}>
      <Text tx={tx} text={typeof content === "string" ? content : undefined} txOptions={txOptions} style={$textStyles}>
        {typeof content !== "string" ? content : undefined}
      </Text>
    </View>
  )
}

// Base styles
const $baseBadgeStyle: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-start",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "transparent",
})

const $baseTextStyle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.medium,
  textAlign: "center",
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

// Status styles for each badge style variant
const $statusStyles: Record<Status, Record<BadgeStyle, ThemedStyle<ViewStyle>>> = {
  success: {
    solid: ({ colors }) => ({
      backgroundColor: colors.palette.seafoam300,
      borderColor: colors.palette.seafoam300,
    }),
    outline: ({ colors }) => ({
      backgroundColor: colors.transparent,
      borderColor: colors.palette.seafoam300,
    }),
    subtle: ({ colors }) => ({
      backgroundColor: colors.palette.seafoam100,
      borderColor: colors.transparent,
    }),
  },
  warning: {
    solid: ({ colors }) => ({
      backgroundColor: colors.palette.sunset400,
      borderColor: colors.palette.sunset400,
    }),
    outline: ({ colors }) => ({
      backgroundColor: colors.transparent,
      borderColor: colors.palette.sunset400,
    }),
    subtle: ({ colors }) => ({
      backgroundColor: colors.palette.sunset100,
      borderColor: colors.transparent,
    }),
  },
  error: {
    solid: ({ colors }) => ({
      backgroundColor: colors.palette.coral400,
      borderColor: colors.palette.coral400,
    }),
    outline: ({ colors }) => ({
      backgroundColor: colors.transparent,
      borderColor: colors.palette.coral400,
    }),
    subtle: ({ colors }) => ({
      backgroundColor: colors.palette.coral100,
      borderColor: colors.transparent,
    }),
  },
  info: {
    solid: ({ colors }) => ({
      backgroundColor: colors.palette.ocean500,
      borderColor: colors.palette.ocean500,
    }),
    outline: ({ colors }) => ({
      backgroundColor: colors.transparent,
      borderColor: colors.palette.ocean500,
    }),
    subtle: ({ colors }) => ({
      backgroundColor: colors.palette.ocean100,
      borderColor: colors.transparent,
    }),
  },
  neutral: {
    solid: ({ colors }) => ({
      backgroundColor: colors.palette.sand500,
      borderColor: colors.palette.sand500,
    }),
    outline: ({ colors }) => ({
      backgroundColor: colors.transparent,
      borderColor: colors.palette.sand500,
    }),
    subtle: ({ colors }) => ({
      backgroundColor: colors.palette.sand300,
      borderColor: colors.transparent,
    }),
  },
}

// Text color styles for each status and badge style
const $textStatusStyles: Record<Status, Record<BadgeStyle, ThemedStyle<TextStyle>>> = {
  success: {
    solid: ({ colors }) => ({
      color: colors.palette.sand900,
    }),
    outline: ({ colors }) => ({
      color: colors.palette.seafoam500,
    }),
    subtle: ({ colors }) => ({
      color: colors.palette.seafoam500,
    }),
  },
  warning: {
    solid: ({ colors }) => ({
      color: colors.palette.sand900,
    }),
    outline: ({ colors }) => ({
      color: colors.palette.sunset500,
    }),
    subtle: ({ colors }) => ({
      color: colors.palette.sunset500,
    }),
  },
  error: {
    solid: ({ colors }) => ({
      color: colors.palette.sand100,
    }),
    outline: ({ colors }) => ({
      color: colors.palette.coral500,
    }),
    subtle: ({ colors }) => ({
      color: colors.palette.coral500,
    }),
  },
  info: {
    solid: ({ colors }) => ({
      color: colors.palette.sand100,
    }),
    outline: ({ colors }) => ({
      color: colors.palette.ocean500,
    }),
    subtle: ({ colors }) => ({
      color: colors.palette.ocean600,
    }),
  },
  neutral: {
    solid: ({ colors }) => ({
      color: colors.palette.sand100,
    }),
    outline: ({ colors }) => ({
      color: colors.palette.sand700,
    }),
    subtle: ({ colors }) => ({
      color: colors.palette.sand700,
    }),
  },
}
