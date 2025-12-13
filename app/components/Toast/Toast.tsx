import { ReactNode, useEffect } from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Icon, IconTypes } from "../Icon"
import { Text, TextProps } from "../Text"

type ToastType = "success" | "error" | "warning" | "info"
type ToastPosition = "top" | "bottom"

export interface ToastProps {
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
   * An optional style override for the toast text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Type of toast affecting icon and color scheme.
   */
  type?: ToastType
  /**
   * Position of the toast (top or bottom).
   */
  position?: ToastPosition
  /**
   * Duration in milliseconds before auto-dismiss. Set to 0 to disable auto-dismiss.
   */
  duration?: number
  /**
   * Callback when toast is dismissed.
   */
  onDismiss?: () => void
  /**
   * Optional action button text.
   */
  actionText?: string
  /**
   * Optional action button callback.
   */
  onAction?: () => void
  /**
   * Custom icon override (uses default type icon if not provided).
   */
  icon?: IconTypes
  /**
   * Children components.
   */
  children?: ReactNode
  /**
   * Whether to show the dismiss button.
   */
  dismissible?: boolean
}

const TOAST_ICONS: Record<ToastType, IconTypes> = {
  success: "check",
  error: "x",
  warning: "bell",
  info: "view",
}

/**
 * A Toast/Snackbar notification component for displaying temporary messages.
 * Uses Reanimated for smooth slide in/out animations.
 * @param {ToastProps} props - The props for the `Toast` component.
 * @returns {JSX.Element} The rendered `Toast` component.
 * @example
 * <Toast
 *   text="Item added successfully"
 *   type="success"
 *   position="bottom"
 *   duration={3000}
 *   onDismiss={handleDismiss}
 * />
 */
export function Toast(props: ToastProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    type = "info",
    position = "bottom",
    duration = 3000,
    onDismiss,
    actionText,
    onAction,
    icon,
    children,
    dismissible = true,
  } = props

  const { themed, theme } = useAppTheme()
  const insets = useSafeAreaInsets()

  const translateY = useSharedValue(position === "top" ? -200 : 200)

  useEffect(() => {
    // Slide in animation
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 90,
    })

    // Auto-dismiss after duration
    if (duration > 0 && onDismiss) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, duration)

      return () => clearTimeout(timer)
    }
    return undefined
  }, [duration])

  const handleDismiss = () => {
    translateY.value = withTiming(
      position === "top" ? -200 : 200,
      { duration: 300 },
      (finished) => {
        if (finished && onDismiss) {
          runOnJS(onDismiss)()
        }
      },
    )
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const iconName = icon || TOAST_ICONS[type]
  const iconColor = themed($iconColors[type])

  const $containerStyle: StyleProp<ViewStyle> = [
    themed($baseContainerStyle),
    position === "top" && { top: insets.top + 16 },
    position === "bottom" && { bottom: insets.bottom + 16 },
    themed($typeStyles[type]),
    $viewStyleOverride,
  ]

  const $textStyles: StyleProp<TextStyle> = [
    themed($baseTextStyle),
    themed($typeTextStyles[type]),
    $textStyleOverride,
  ]

  return (
    <Animated.View style={[animatedStyle, $containerStyle]}>
      <View style={themed($contentContainer)}>
        {iconName && (
          <Icon icon={iconName} size={20} color={iconColor.color} containerStyle={themed($iconStyle)} />
        )}
        <View style={themed($textContainer)}>
          <Text tx={tx} text={text} txOptions={txOptions} style={$textStyles}>
            {children}
          </Text>
        </View>
        {dismissible && (
          <Pressable onPress={handleDismiss} hitSlop={8} style={themed($dismissButton)}>
            <Icon icon="x" size={16} color={iconColor.color} />
          </Pressable>
        )}
      </View>
      {actionText && onAction && (
        <Pressable onPress={onAction} style={themed($actionButton)}>
          <Text
            text={actionText}
            size="sm"
            weight="medium"
            style={themed($actionTextStyles[type])}
          />
        </Pressable>
      )}
    </Animated.View>
  )
}

// Base styles
const $baseContainerStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "absolute",
  left: spacing.md,
  right: spacing.md,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 8,
})

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
})

const $textContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $baseTextStyle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.medium,
  fontSize: 14,
  lineHeight: 20,
})

const $iconStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.sm,
})

const $dismissButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginLeft: spacing.sm,
})

const $actionButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  borderTopWidth: 1,
  borderTopColor: "rgba(255, 255, 255, 0.2)",
})

// Type-specific styles
const $typeStyles: Record<ToastType, ThemedStyle<ViewStyle>> = {
  success: ({ colors }) => ({
    backgroundColor: colors.palette.seafoam300,
    borderWidth: 1,
    borderColor: colors.palette.seafoam400,
  }),
  error: ({ colors }) => ({
    backgroundColor: colors.palette.coral500,
    borderWidth: 1,
    borderColor: colors.palette.coral500,
  }),
  warning: ({ colors }) => ({
    backgroundColor: colors.palette.sunset400,
    borderWidth: 1,
    borderColor: colors.palette.sunset500,
  }),
  info: ({ colors }) => ({
    backgroundColor: colors.palette.ocean500,
    borderWidth: 1,
    borderColor: colors.palette.ocean600,
  }),
}

const $typeTextStyles: Record<ToastType, ThemedStyle<TextStyle>> = {
  success: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
  error: ({ colors }) => ({
    color: colors.palette.sand100,
  }),
  warning: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
  info: ({ colors }) => ({
    color: colors.palette.sand100,
  }),
}

const $iconColors: Record<ToastType, ThemedStyle<{ color: string }>> = {
  success: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
  error: ({ colors }) => ({
    color: colors.palette.sand100,
  }),
  warning: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
  info: ({ colors }) => ({
    color: colors.palette.sand100,
  }),
}

const $actionTextStyles: Record<ToastType, ThemedStyle<TextStyle>> = {
  success: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
  error: ({ colors }) => ({
    color: colors.palette.sand100,
  }),
  warning: ({ colors }) => ({
    color: colors.palette.sand900,
  }),
  info: ({ colors }) => ({
    color: colors.palette.sand100,
  }),
}
