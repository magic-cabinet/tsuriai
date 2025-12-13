import { ActivityIndicator, ActivityIndicatorProps, StyleProp, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"

type SpinnerSize = "sm" | "md" | "lg"
type SpinnerColor = "primary" | "white" | "inherit"

export interface SpinnerProps extends Omit<ActivityIndicatorProps, "size" | "color"> {
  /**
   * The size of the spinner
   * @default "md"
   */
  size?: SpinnerSize
  /**
   * The color variant of the spinner
   * @default "primary"
   */
  color?: SpinnerColor
  /**
   * Optional custom color override (hex/rgb string)
   * If provided, this will be used instead of the color variant
   */
  customColor?: string
  /**
   * An optional style override for the spinner container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * A loading spinner/indicator component.
 * Uses React Native's ActivityIndicator with size and color variants based on the seaside theme.
 *
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/}
 * @param {SpinnerProps} props - The props for the `Spinner` component.
 * @returns {JSX.Element} The rendered `Spinner` component.
 *
 * @example
 * <Spinner size="md" color="primary" />
 *
 * @example
 * <Spinner size="lg" color="white" />
 */
export function Spinner(props: SpinnerProps) {
  const { size = "md", color = "primary", customColor, style, ...rest } = props

  const { theme } = useAppTheme()

  // Map size variants to ActivityIndicator sizes
  const getSizeValue = (): "small" | "large" => {
    switch (size) {
      case "sm":
        return "small"
      case "lg":
        return "large"
      case "md":
      default:
        return "small" // React Native only supports "small" and "large", we'll use "small" for md
    }
  }

  // Map color variants to actual colors from seaside palette
  const getColorValue = (): string => {
    if (customColor) {
      return customColor
    }

    switch (color) {
      case "primary":
        return theme.colors.palette.ocean500 // deep ocean - main brand
      case "white":
        return theme.colors.palette.sand100 // white sand
      case "inherit":
        return theme.colors.text // use default text color for inherit behavior
      default:
        return theme.colors.palette.ocean500
    }
  }

  return (
    <ActivityIndicator
      size={getSizeValue()}
      color={getColorValue()}
      style={style}
      {...rest}
    />
  )
}
