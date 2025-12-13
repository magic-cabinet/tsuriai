import { ReactNode, useState, useCallback } from "react"
import { Pressable, StyleProp, View, ViewStyle, TextStyle, LayoutChangeEvent } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"

export interface TabItem {
  /**
   * Unique key for the tab
   */
  key: string
  /**
   * Tab label text
   */
  label?: string
  /**
   * Tab label i18n key
   */
  labelTx?: TextProps["tx"]
  /**
   * Tab label i18n options
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Optional badge count
   */
  badge?: number
  /**
   * Whether tab is disabled
   */
  disabled?: boolean
}

export interface TabsProps {
  /**
   * Array of tab items
   */
  tabs: TabItem[]
  /**
   * Currently active tab key
   */
  activeKey: string
  /**
   * Callback when tab changes
   */
  onChange: (key: string) => void
  /**
   * Tab style variant
   * @default "underline"
   */
  variant?: "underline" | "pills" | "enclosed"
  /**
   * Size of tabs
   * @default "md"
   */
  size?: "sm" | "md" | "lg"
  /**
   * Whether tabs should fill available width
   * @default false
   */
  fullWidth?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Tabs component for content switching.
 * Supports underline, pills, and enclosed variants.
 *
 * @param {TabsProps} props - The props for the `Tabs` component.
 * @returns {JSX.Element} The rendered `Tabs` component.
 *
 * @example
 * <Tabs
 *   tabs={[
 *     { key: "all", label: "All" },
 *     { key: "active", label: "Active", badge: 3 },
 *     { key: "completed", label: "Completed" },
 *   ]}
 *   activeKey="all"
 *   onChange={(key) => setActiveTab(key)}
 * />
 */
export function Tabs(props: TabsProps) {
  const {
    tabs,
    activeKey,
    onChange,
    variant = "underline",
    size = "md",
    fullWidth = false,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const [tabLayouts, setTabLayouts] = useState<Record<string, { x: number; width: number }>>({})
  const indicatorX = useSharedValue(0)
  const indicatorWidth = useSharedValue(0)

  const handleTabLayout = useCallback(
    (key: string) => (event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout
      setTabLayouts((prev) => {
        const updated = { ...prev, [key]: { x, width } }
        // Update indicator position if this is the active tab
        if (key === activeKey) {
          indicatorX.value = withSpring(x, { damping: 20, stiffness: 300 })
          indicatorWidth.value = withSpring(width, { damping: 20, stiffness: 300 })
        }
        return updated
      })
    },
    [activeKey]
  )

  const handleTabPress = useCallback(
    (key: string) => {
      const layout = tabLayouts[key]
      if (layout) {
        indicatorX.value = withSpring(layout.x, { damping: 20, stiffness: 300 })
        indicatorWidth.value = withSpring(layout.width, { damping: 20, stiffness: 300 })
      }
      onChange(key)
    },
    [tabLayouts, onChange]
  )

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }))

  const $containerStyle: StyleProp<ViewStyle> = [
    themed($baseContainer),
    variant === "enclosed" && themed($enclosedContainer),
    $styleOverride,
  ]

  const $tabsRowStyle: StyleProp<ViewStyle> = [
    themed($tabsRow),
    fullWidth && { flex: 1 },
  ]

  return (
    <View style={$containerStyle}>
      <View style={$tabsRowStyle}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey
          const isDisabled = tab.disabled

          const $tabStyle: StyleProp<ViewStyle> = [
            themed($baseTab),
            themed($sizeStyles[size]),
            fullWidth && { flex: 1 },
            variant === "pills" && themed($pillTab),
            variant === "pills" && isActive && themed($pillTabActive),
            variant === "enclosed" && themed($enclosedTab),
            variant === "enclosed" && isActive && themed($enclosedTabActive),
            isDisabled && themed($disabledTab),
          ]

          const $textStyle: StyleProp<TextStyle> = [
            themed($baseText),
            themed($textSizeStyles[size]),
            isActive && themed($activeText),
            isDisabled && themed($disabledText),
          ]

          return (
            <Pressable
              key={tab.key}
              style={$tabStyle}
              onPress={() => !isDisabled && handleTabPress(tab.key)}
              onLayout={handleTabLayout(tab.key)}
              disabled={isDisabled}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive, disabled: isDisabled }}
            >
              <Text
                text={tab.label}
                tx={tab.labelTx}
                txOptions={tab.labelTxOptions}
                style={$textStyle}
              />
              {tab.badge !== undefined && tab.badge > 0 && (
                <View style={themed($badgeContainer)}>
                  <Text style={themed($badgeText)}>{tab.badge}</Text>
                </View>
              )}
            </Pressable>
          )
        })}
      </View>
      {variant === "underline" && (
        <Animated.View style={[themed($indicator), indicatorStyle]} />
      )}
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $baseContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.sand300,
})

const $enclosedContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderBottomWidth: 0,
  backgroundColor: colors.palette.sand200,
  borderRadius: spacing.sm,
  padding: spacing.xxs,
})

const $tabsRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
})

const $baseTab: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: spacing.md,
})

const $sizeStyles: Record<"sm" | "md" | "lg", ThemedStyle<ViewStyle>> = {
  sm: ({ spacing }) => ({
    paddingVertical: spacing.xs,
    minHeight: 36,
  }),
  md: ({ spacing }) => ({
    paddingVertical: spacing.sm,
    minHeight: 44,
  }),
  lg: ({ spacing }) => ({
    paddingVertical: spacing.md,
    minHeight: 52,
  }),
}

const $pillTab: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: spacing.md,
  marginRight: spacing.xs,
})

const $pillTabActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean500,
})

const $enclosedTab: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: spacing.xs,
  flex: 1,
})

const $enclosedTabActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.sand100,
})

const $disabledTab: ThemedStyle<ViewStyle> = () => ({
  opacity: 0.5,
})

const $baseText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.medium,
  color: colors.palette.sand600,
})

const $textSizeStyles: Record<"sm" | "md" | "lg", ThemedStyle<TextStyle>> = {
  sm: () => ({
    fontSize: 12,
  }),
  md: () => ({
    fontSize: 14,
  }),
  lg: () => ({
    fontSize: 16,
  }),
}

const $activeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean500,
})

const $disabledText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $indicator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: 0,
  height: 2,
  backgroundColor: colors.palette.ocean500,
})

const $badgeContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginLeft: spacing.xxs,
  backgroundColor: colors.palette.coral400,
  borderRadius: 10,
  paddingHorizontal: spacing.xxs,
  paddingVertical: 2,
  minWidth: 18,
  alignItems: "center",
})

const $badgeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontSize: 10,
  fontWeight: "600",
})
