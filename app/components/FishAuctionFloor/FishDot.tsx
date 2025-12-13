import { Pressable, View, ViewStyle, TextStyle } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { FishStatus } from "./types"

export interface FishDotProps {
  /**
   * Unique identifier
   */
  id: string
  /**
   * Weight in kg - determines dot size
   */
  weight: number
  /**
   * Availability status
   */
  status: FishStatus
  /**
   * Whether this dot is selected
   */
  selected?: boolean
  /**
   * Callback when pressed
   */
  onPress?: (id: string) => void
  /**
   * Whether dot is disabled
   */
  disabled?: boolean
}

// Map weight to dot size (min 32, max 64)
function getDotSize(weight: number): number {
  // Clamp weight between 1-200kg for sizing
  const clampedWeight = Math.max(1, Math.min(200, weight))
  // Scale: 1kg = 32px, 200kg = 64px
  return 32 + (clampedWeight / 200) * 32
}

/**
 * FishDot - Selectable fish indicator in chirashi style
 *
 * A circular dot representing a single fish, sized by weight,
 * with bold coral borders and vibrant status colors.
 */
export function FishDot(props: FishDotProps) {
  const {
    id,
    weight,
    status,
    selected = false,
    onPress,
    disabled = false,
  } = props

  const { themed, theme } = useAppTheme()
  const scale = useSharedValue(1)
  const dotSize = getDotSize(weight)

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 300 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 })
  }

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress(id)
    }
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  // Status-based colors (chirashi style - vibrant)
  const getStatusColors = () => {
    if (selected) {
      return {
        bg: theme.colors.palette.ocean500,
        border: theme.colors.palette.coral500,
        text: theme.colors.palette.sand100,
      }
    }
    switch (status) {
      case "available":
        return {
          bg: theme.colors.palette.seafoam300,
          border: theme.colors.palette.seafoam500,
          text: theme.colors.palette.sand900,
        }
      case "bidding":
        return {
          bg: theme.colors.palette.sunset300,
          border: theme.colors.palette.sunset500,
          text: theme.colors.palette.sand900,
        }
      case "sold":
        return {
          bg: theme.colors.palette.sand300,
          border: theme.colors.palette.sand400,
          text: theme.colors.palette.sand600,
        }
      case "reserved":
        return {
          bg: theme.colors.palette.coral200,
          border: theme.colors.palette.coral400,
          text: theme.colors.palette.sand900,
        }
      default:
        return {
          bg: theme.colors.palette.sand300,
          border: theme.colors.palette.sand400,
          text: theme.colors.palette.sand600,
        }
    }
  }

  const colors = getStatusColors()
  const isInteractive = status === "available" || status === "bidding"

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !isInteractive}
      accessibilityRole="button"
      accessibilityLabel={`Fish ${weight}kg, ${status}${selected ? ", selected" : ""}`}
      accessibilityState={{ selected, disabled: disabled || !isInteractive }}
    >
      <Animated.View style={[themed($container), animatedStyle]}>
        {/* The dot */}
        <View
          style={[
            themed($dot),
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: colors.bg,
              borderColor: colors.border,
              borderWidth: selected ? 4 : 3,
            },
          ]}
        >
          {/* Weight inside dot for larger fish */}
          {dotSize >= 48 && (
            <Text
              text={`${Math.round(weight)}`}
              weight="bold"
              style={[themed($dotText), { color: colors.text, fontSize: dotSize * 0.28 }]}
            />
          )}
        </View>

        {/* Weight label below */}
        <Text
          text={`${weight}kg`}
          size="xxs"
          weight="medium"
          style={[
            themed($weightLabel),
            { color: selected ? theme.colors.palette.coral500 : theme.colors.palette.sand600 },
          ]}
        />

        {/* Selected indicator - burst effect */}
        {selected && (
          <View style={themed($selectedBurst)}>
            <Text text="★" style={themed($starText)} />
          </View>
        )}
      </Animated.View>
    </Pressable>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  paddingHorizontal: spacing.xxs,
  paddingVertical: spacing.xs,
})

const $dot: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  justifyContent: "center",
  // Chirashi style - bold shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 4,
})

const $dotText: ThemedStyle<TextStyle> = () => ({
  textAlign: "center",
})

const $weightLabel: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xxxs,
  textAlign: "center",
})

const $selectedBurst: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: -4,
  right: -4,
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: colors.palette.coral500,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: colors.palette.sand100,
})

const $starText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontSize: 10,
  lineHeight: 12,
})
