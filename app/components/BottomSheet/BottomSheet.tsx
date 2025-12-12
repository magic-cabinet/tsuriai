import { ReactNode, useEffect, useCallback } from "react"
import {
  Dimensions,
  Modal as RNModal,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"
import { Icon } from "../Icon"

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

type SnapPoint = number | string

export interface BottomSheetProps {
  /**
   * Whether the bottom sheet is visible
   */
  visible: boolean
  /**
   * Callback when sheet requests to close
   */
  onClose: () => void
  /**
   * Snap points as percentages or pixel values
   * @default ["50%"]
   */
  snapPoints?: SnapPoint[]
  /**
   * Initial snap point index
   * @default 0
   */
  initialSnapIndex?: number
  /**
   * Whether dragging the sheet is enabled
   * @default true
   */
  enableDrag?: boolean
  /**
   * Whether tapping backdrop dismisses the sheet
   * @default true
   */
  backdropDismiss?: boolean
  /**
   * Heading text
   */
  heading?: string
  /**
   * Heading i18n key
   */
  headingTx?: TextProps["tx"]
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean
  /**
   * Whether to show the drag handle
   * @default true
   */
  showHandle?: boolean
  /**
   * Content of the bottom sheet
   */
  children?: ReactNode
  /**
   * Style override for sheet container
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style override for content area
   */
  contentStyle?: StyleProp<ViewStyle>
}

/**
 * BottomSheet component for sliding panels from the bottom.
 * Supports snap points, dragging, and backdrop dismiss.
 *
 * @param {BottomSheetProps} props - The props for the `BottomSheet` component.
 * @returns {JSX.Element} The rendered `BottomSheet` component.
 *
 * @example
 * <BottomSheet
 *   visible={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   heading="Filter Options"
 *   snapPoints={["25%", "50%", "90%"]}
 * >
 *   <FilterContent />
 * </BottomSheet>
 */
export function BottomSheet(props: BottomSheetProps) {
  const {
    visible,
    onClose,
    snapPoints = ["50%"],
    initialSnapIndex = 0,
    enableDrag = true,
    backdropDismiss = true,
    heading,
    headingTx,
    showCloseButton = true,
    showHandle = true,
    children,
    style: $styleOverride,
    contentStyle: $contentStyleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  // Convert snap points to pixel values
  const snapPointsInPixels = snapPoints.map((point) => {
    if (typeof point === "number") return point
    const percentage = parseFloat(point) / 100
    return SCREEN_HEIGHT * percentage
  })

  const maxHeight = Math.max(...snapPointsInPixels)
  const translateY = useSharedValue(SCREEN_HEIGHT)
  const backdropOpacity = useSharedValue(0)

  const snapToPoint = useCallback(
    (height: number) => {
      "worklet"
      translateY.value = withSpring(SCREEN_HEIGHT - height, {
        damping: 20,
        stiffness: 300,
      })
    },
    []
  )

  const close = useCallback(() => {
    "worklet"
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 })
    backdropOpacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(onClose)()
    })
  }, [onClose])

  // Open/close animation
  useEffect(() => {
    if (visible) {
      const initialHeight = snapPointsInPixels[initialSnapIndex] ?? snapPointsInPixels[0]
      translateY.value = SCREEN_HEIGHT
      backdropOpacity.value = withTiming(1, { duration: 200 })
      snapToPoint(initialHeight)
    }
  }, [visible])

  // Pan gesture for dragging
  const panGesture = Gesture.Pan()
    .enabled(enableDrag)
    .onUpdate((event) => {
      const newTranslateY = SCREEN_HEIGHT - maxHeight + event.translationY
      translateY.value = Math.max(newTranslateY, SCREEN_HEIGHT - maxHeight)
    })
    .onEnd((event) => {
      const currentHeight = SCREEN_HEIGHT - translateY.value
      const velocity = event.velocityY

      // If swiping down fast, close
      if (velocity > 500) {
        close()
        return
      }

      // Find closest snap point
      let closestSnap = snapPointsInPixels[0]
      let minDistance = Math.abs(currentHeight - closestSnap)

      for (const snap of snapPointsInPixels) {
        const distance = Math.abs(currentHeight - snap)
        if (distance < minDistance) {
          minDistance = distance
          closestSnap = snap
        }
      }

      // If below minimum snap point, close
      if (currentHeight < snapPointsInPixels[0] * 0.5) {
        close()
      } else {
        snapToPoint(closestSnap)
      }
    })

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }))

  const handleBackdropPress = () => {
    if (backdropDismiss) {
      close()
    }
  }

  const $sheetStyle: StyleProp<ViewStyle> = [
    themed($sheet),
    { maxHeight },
    $styleOverride,
  ]

  const $contentStyle: StyleProp<ViewStyle> = [
    themed($content),
    $contentStyleOverride,
  ]

  if (!visible) return null

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={themed($overlay)}>
          {/* Backdrop */}
          <Pressable
            style={themed($backdropPressable)}
            onPress={handleBackdropPress}
          >
            <Animated.View style={[themed($backdrop), backdropAnimatedStyle]} />
          </Pressable>

          {/* Sheet */}
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[sheetAnimatedStyle, $sheetStyle]}>
              {/* Handle */}
              {showHandle && (
                <View style={themed($handleContainer)}>
                  <View style={themed($handle)} />
                </View>
              )}

              {/* Header */}
              {(heading || headingTx || showCloseButton) && (
                <View style={themed($header)}>
                  {(heading || headingTx) && (
                    <Text
                      text={heading}
                      tx={headingTx}
                      preset="subheading"
                      style={themed($headingText)}
                    />
                  )}
                  {showCloseButton && (
                    <Pressable
                      onPress={() => close()}
                      style={themed($closeButton)}
                      hitSlop={8}
                    >
                      <Icon icon="x" size={24} color={theme.colors.palette.sand700} />
                    </Pressable>
                  )}
                </View>
              )}

              {/* Content */}
              <View style={$contentStyle}>{children}</View>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </RNModal>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $overlay: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "flex-end",
})

const $backdropPressable: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

const $backdrop: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.sand900,
  opacity: 0.5,
})

const $sheet: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.sand100,
  borderTopLeftRadius: spacing.lg,
  borderTopRightRadius: spacing.lg,
  minHeight: 100,
  shadowColor: colors.palette.sand900,
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 12,
})

const $handleContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  paddingTop: spacing.sm,
  paddingBottom: spacing.xs,
})

const $handle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: colors.palette.sand400,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.sand300,
})

const $headingText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.palette.sand900,
})

const $closeButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xxs,
})

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
})
