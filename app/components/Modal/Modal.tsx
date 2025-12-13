import { ReactNode, useEffect } from "react"
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"
import { Icon } from "../Icon"
import { Text, TextProps } from "../Text"
import { Spinner } from "../Spinner"

type ModalSizes = "sm" | "md" | "lg" | "full"

export interface ModalProps extends Omit<RNModalProps, "visible" | "children"> {
  /**
   * Whether the modal is visible
   */
  visible: boolean
  /**
   * Callback when modal requests to close
   */
  onClose: () => void
  /**
   * Whether tapping backdrop dismisses modal
   * @default true
   */
  backdropDismiss?: boolean
  /**
   * Modal size variant
   * @default "md"
   */
  size?: ModalSizes
  /**
   * Modal heading text
   */
  heading?: TextProps["text"]
  /**
   * Modal heading i18n key
   */
  headingTx?: TextProps["tx"]
  /**
   * Optional heading i18n options
   */
  headingTxOptions?: TextProps["txOptions"]
  /**
   * Custom heading component
   */
  HeadingComponent?: ReactNode
  /**
   * Modal body content
   */
  children?: ReactNode
  /**
   * Modal footer content
   */
  FooterComponent?: ReactNode
  /**
   * Whether to show close button in header
   * @default true
   */
  showCloseButton?: boolean
  /**
   * Whether modal is in loading state
   * @default false
   */
  loading?: boolean
  /**
   * Loading text to display
   */
  loadingText?: string
  /**
   * Style override for modal container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style override for modal content
   */
  contentStyle?: StyleProp<ViewStyle>
  /**
   * Style override for header
   */
  headerStyle?: StyleProp<ViewStyle>
  /**
   * Style override for body
   */
  bodyStyle?: StyleProp<ViewStyle>
  /**
   * Style override for footer
   */
  footerStyle?: StyleProp<ViewStyle>
}

/**
 * Modal component for overlays with animated entry/exit.
 * Supports multiple sizes, custom header/body/footer, backdrop dismiss, and loading states.
 *
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/}
 * @param {ModalProps} props - The props for the `Modal` component.
 * @returns {JSX.Element} The rendered `Modal` component.
 *
 * @example
 * <Modal
 *   visible={isVisible}
 *   onClose={() => setIsVisible(false)}
 *   heading="Confirm Action"
 *   size="md"
 * >
 *   <Text>Are you sure?</Text>
 * </Modal>
 */
export function Modal(props: ModalProps) {
  const {
    visible,
    onClose,
    backdropDismiss = true,
    size = "md",
    heading,
    headingTx,
    headingTxOptions,
    HeadingComponent,
    children,
    FooterComponent,
    showCloseButton = true,
    loading = false,
    loadingText = "Loading...",
    containerStyle: $containerStyleOverride,
    contentStyle: $contentStyleOverride,
    headerStyle: $headerStyleOverride,
    bodyStyle: $bodyStyleOverride,
    footerStyle: $footerStyleOverride,
    ...rest
  } = props

  const { themed, theme } = useAppTheme()

  // Animation values
  const backdropOpacity = useSharedValue(0)
  const contentTranslateY = useSharedValue(50)
  const contentOpacity = useSharedValue(0)

  // Animate in/out based on visible prop
  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 200 })
      contentTranslateY.value = withSpring(0, {
        damping: 20,
        stiffness: 300,
      })
      contentOpacity.value = withTiming(1, { duration: 200 })
    } else {
      backdropOpacity.value = withTiming(0, { duration: 200 })
      contentTranslateY.value = withTiming(50, { duration: 200 })
      contentOpacity.value = withTiming(0, { duration: 200 })
    }
  }, [visible])

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }))

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
    opacity: contentOpacity.value,
  }))

  const handleBackdropPress = () => {
    if (backdropDismiss && !loading) {
      onClose()
    }
  }

  const isHeadingPresent = !!(HeadingComponent || heading || headingTx)

  const $containerStyle: StyleProp<ViewStyle> = [
    themed($containerPresets[size]),
    $containerStyleOverride,
  ]

  const $contentStyle: StyleProp<ViewStyle> = [
    themed($contentBase),
    themed($contentPresets[size]),
    $contentStyleOverride,
  ]

  const $headerStyle: StyleProp<ViewStyle> = [themed($headerBase), $headerStyleOverride]
  const $bodyStyle: StyleProp<ViewStyle> = [themed($bodyBase), $bodyStyleOverride]
  const $footerStyle: StyleProp<ViewStyle> = [themed($footerBase), $footerStyleOverride]

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
      {...rest}
    >
      <View style={themed($overlay)}>
        {/* Backdrop */}
        <Pressable
          style={themed($backdrop)}
          onPress={handleBackdropPress}
          disabled={!backdropDismiss || loading}
        >
          <Animated.View style={[themed($backdropAnimated), backdropAnimatedStyle]} />
        </Pressable>

        {/* Modal Content Container */}
        <View style={$containerStyle} pointerEvents="box-none">
          <Animated.View style={contentAnimatedStyle}>
            <View style={$contentStyle}>
              {/* Header */}
              {(isHeadingPresent || showCloseButton) && (
                <View style={$headerStyle}>
                  {HeadingComponent ? (
                    <View style={themed($headingContainer)}>{HeadingComponent}</View>
                  ) : (
                    isHeadingPresent && (
                      <Text
                        preset="subheading"
                        text={heading}
                        tx={headingTx}
                        txOptions={headingTxOptions}
                        style={themed($headingText)}
                      />
                    )
                  )}
                  {showCloseButton && !loading && (
                    <Pressable
                      onPress={onClose}
                      style={themed($closeButton)}
                      hitSlop={8}
                      accessibilityRole="button"
                      accessibilityLabel="Close modal"
                    >
                      <Icon
                        icon="x"
                        size={24}
                        color={theme.colors.palette.sand700}
                      />
                    </Pressable>
                  )}
                </View>
              )}

              {/* Body */}
              <ScrollView
                style={$bodyStyle}
                showsVerticalScrollIndicator={size === "full"}
                bounces={false}
              >
                {loading ? (
                  <View style={themed($loadingContainer)}>
                    <Spinner size="lg" color="primary" />
                    <Text text={loadingText} style={themed($loadingText)} />
                  </View>
                ) : (
                  children
                )}
              </ScrollView>

              {/* Footer */}
              {FooterComponent && !loading && <View style={$footerStyle}>{FooterComponent}</View>}
            </View>
          </Animated.View>
        </View>
      </View>
    </RNModal>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $overlay: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $backdrop: ThemedStyle<ViewStyle> = () => ({
  ...StyleSheet.absoluteFillObject,
})

const $backdropAnimated: ThemedStyle<ViewStyle> = (theme) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme.colors.palette.sand900,
  opacity: 0.5,
})

const $containerPresets: Record<ModalSizes, ThemedStyleArray<ViewStyle>> = {
  sm: [
    (theme) => ({
      width: "80%",
      maxWidth: 320,
      maxHeight: "60%",
    }),
  ],
  md: [
    (theme) => ({
      width: "85%",
      maxWidth: 440,
      maxHeight: "70%",
    }),
  ],
  lg: [
    (theme) => ({
      width: "90%",
      maxWidth: 560,
      maxHeight: "80%",
    }),
  ],
  full: [
    (theme) => ({
      width: "95%",
      maxWidth: 640,
      maxHeight: "90%",
      margin: theme.spacing.md,
    }),
  ],
}

const $contentBase: ThemedStyle<ViewStyle> = (theme) => ({
  borderRadius: theme.spacing.lg,
  overflow: "hidden",
  shadowColor: theme.colors.palette.sand900,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.24,
  shadowRadius: 24,
  elevation: 24,
})

const $contentPresets: Record<ModalSizes, ThemedStyleArray<ViewStyle>> = {
  sm: [
    (theme) => ({
      backgroundColor: theme.colors.palette.sand100,
    }),
  ],
  md: [
    (theme) => ({
      backgroundColor: theme.colors.palette.sand100,
    }),
  ],
  lg: [
    (theme) => ({
      backgroundColor: theme.colors.palette.sand100,
    }),
  ],
  full: [
    (theme) => ({
      backgroundColor: theme.colors.palette.sand100,
    }),
  ],
}

const $headerBase: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.palette.sand300,
})

const $headingContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $headingText: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  color: theme.colors.palette.sand900,
})

const $closeButton: ThemedStyle<ViewStyle> = (theme) => ({
  padding: theme.spacing.xxs,
  marginLeft: theme.spacing.sm,
})

const $bodyBase: ThemedStyle<ViewStyle> = (theme) => ({
  paddingHorizontal: theme.spacing.lg,
  paddingVertical: theme.spacing.md,
})

const $footerBase: ThemedStyle<ViewStyle> = (theme) => ({
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.md,
  paddingBottom: theme.spacing.lg,
  borderTopWidth: 1,
  borderTopColor: theme.colors.palette.sand300,
})

const $loadingContainer: ThemedStyle<ViewStyle> = (theme) => ({
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: theme.spacing.xxl,
  gap: theme.spacing.md,
})

const $loadingText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.palette.sand600,
})
