import { StyleProp, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"

type DividerOrientation = "horizontal" | "vertical"
type DividerVariant = "solid" | "dashed"

export interface DividerProps {
  /**
   * Orientation of the divider
   * @default "horizontal"
   */
  orientation?: DividerOrientation
  /**
   * Visual style of the line
   * @default "solid"
   */
  variant?: DividerVariant
  /**
   * Optional label text in the middle
   */
  text?: string
  /**
   * Optional i18n key for label
   */
  tx?: TextProps["tx"]
  /**
   * Optional i18n options
   */
  txOptions?: TextProps["txOptions"]
  /**
   * Thickness of the line
   * @default 1
   */
  thickness?: number
  /**
   * Spacing (margin) around the divider
   * @default "md"
   */
  spacing?: "none" | "sm" | "md" | "lg"
  /**
   * Style override for the container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Divider component for visual separation of content.
 * Supports horizontal/vertical orientation and optional label.
 *
 * @param {DividerProps} props - The props for the `Divider` component.
 * @returns {JSX.Element} The rendered `Divider` component.
 *
 * @example
 * <Divider />
 * <Divider text="OR" />
 * <Divider orientation="vertical" />
 */
export function Divider(props: DividerProps) {
  const {
    orientation = "horizontal",
    variant = "solid",
    text,
    tx,
    txOptions,
    thickness = 1,
    spacing = "md",
    style: $styleOverride,
  } = props

  const { themed } = useAppTheme()

  const hasLabel = !!(text || tx)
  const isHorizontal = orientation === "horizontal"

  const $containerStyle: StyleProp<ViewStyle> = [
    isHorizontal ? themed($horizontalContainer) : themed($verticalContainer),
    themed($spacingStyles[spacing]),
    $styleOverride,
  ]

  const $lineStyle: StyleProp<ViewStyle> = [
    themed($baseLine),
    isHorizontal
      ? { height: thickness, flex: hasLabel ? 1 : undefined }
      : { width: thickness, flex: 1 },
    variant === "dashed" && { borderStyle: "dashed" },
  ]

  if (!hasLabel) {
    return <View style={$containerStyle}><View style={$lineStyle} /></View>
  }

  // With label (horizontal only makes sense)
  return (
    <View style={$containerStyle}>
      <View style={$lineStyle} />
      <Text
        text={text}
        tx={tx}
        txOptions={txOptions}
        style={themed($labelText)}
        size="xs"
      />
      <View style={$lineStyle} />
    </View>
  )
}

const $horizontalContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
})

const $verticalContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "stretch",
})

const $spacingStyles: Record<"none" | "sm" | "md" | "lg", ThemedStyle<ViewStyle>> = {
  none: () => ({}),
  sm: ({ spacing }) => ({
    marginVertical: spacing.xs,
  }),
  md: ({ spacing }) => ({
    marginVertical: spacing.md,
  }),
  lg: ({ spacing }) => ({
    marginVertical: spacing.lg,
  }),
}

const $baseLine: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.sand300,
})

const $labelText: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand500,
  marginHorizontal: spacing.md,
})
