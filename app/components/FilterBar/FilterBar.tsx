import { useCallback } from "react"
import { Pressable, ScrollView, StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"
import { Icon, IconTypes } from "../Icon"

export interface FilterOption {
  /**
   * Unique key for the filter
   */
  key: string
  /**
   * Filter label text
   */
  label?: string
  /**
   * Filter label i18n key
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional icon to show
   */
  icon?: IconTypes
  /**
   * Count to display (e.g., number of matching items)
   */
  count?: number
}

export interface FilterBarProps {
  /**
   * Array of filter options
   */
  filters: FilterOption[]
  /**
   * Currently selected filter keys
   */
  selectedKeys: string[]
  /**
   * Callback when filter selection changes
   */
  onChange: (keys: string[]) => void
  /**
   * Whether multiple filters can be selected
   * @default false
   */
  multiSelect?: boolean
  /**
   * Whether to scroll horizontally
   * @default true
   */
  scrollable?: boolean
  /**
   * Size variant
   * @default "md"
   */
  size?: "sm" | "md" | "lg"
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * FilterBar component with chips/toggles for filtering content.
 * Supports single and multi-select modes.
 *
 * @param {FilterBarProps} props - The props for the `FilterBar` component.
 * @returns {JSX.Element} The rendered `FilterBar` component.
 *
 * @example
 * <FilterBar
 *   filters={[
 *     { key: "all", label: "All", count: 24 },
 *     { key: "fish", label: "Fish", icon: "components" },
 *     { key: "shellfish", label: "Shellfish" },
 *   ]}
 *   selectedKeys={["all"]}
 *   onChange={(keys) => setSelectedFilters(keys)}
 * />
 */
export function FilterBar(props: FilterBarProps) {
  const {
    filters,
    selectedKeys,
    onChange,
    multiSelect = false,
    scrollable = true,
    size = "md",
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const handleFilterPress = useCallback(
    (key: string) => {
      if (multiSelect) {
        if (selectedKeys.includes(key)) {
          onChange(selectedKeys.filter((k) => k !== key))
        } else {
          onChange([...selectedKeys, key])
        }
      } else {
        onChange([key])
      }
    },
    [selectedKeys, onChange, multiSelect]
  )

  const renderFilters = () =>
    filters.map((filter) => {
      const isSelected = selectedKeys.includes(filter.key)

      const $chipStyle: StyleProp<ViewStyle> = [
        themed($baseChip),
        themed($chipSizeStyles[size]),
        isSelected && themed($selectedChip),
      ]

      const $textStyle: StyleProp<TextStyle> = [
        themed($chipText),
        themed($textSizeStyles[size]),
        isSelected && themed($selectedText),
      ]

      return (
        <Pressable
          key={filter.key}
          style={$chipStyle}
          onPress={() => handleFilterPress(filter.key)}
          accessibilityRole="button"
          accessibilityState={{ selected: isSelected }}
        >
          {filter.icon && (
            <Icon
              icon={filter.icon}
              size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
              color={isSelected ? theme.colors.palette.sand100 : theme.colors.palette.sand700}
              style={{ marginRight: theme.spacing.xxs }}
            />
          )}
          <Text text={filter.label} tx={filter.labelTx} style={$textStyle} />
          {filter.count !== undefined && (
            <View style={[themed($countBadge), isSelected && themed($countBadgeSelected)]}>
              <Text style={[themed($countText), isSelected && themed($countTextSelected)]}>
                {filter.count}
              </Text>
            </View>
          )}
        </Pressable>
      )
    })

  const $containerStyle: StyleProp<ViewStyle> = [themed($container), $styleOverride]

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={$containerStyle}
        contentContainerStyle={themed($scrollContent)}
      >
        {renderFilters()}
      </ScrollView>
    )
  }

  return (
    <View style={[$containerStyle, themed($wrapContent)]}>{renderFilters()}</View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = () => ({})

const $scrollContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  gap: spacing.xs,
})

const $wrapContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.xs,
})

const $baseChip: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.palette.sand200,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: colors.palette.sand300,
})

const $chipSizeStyles: Record<"sm" | "md" | "lg", ThemedStyle<ViewStyle>> = {
  sm: ({ spacing }) => ({
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    minHeight: 28,
  }),
  md: ({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minHeight: 36,
  }),
  lg: ({ spacing }) => ({
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    minHeight: 44,
  }),
}

const $selectedChip: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean500,
  borderColor: colors.palette.ocean500,
})

const $chipText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.medium,
  color: colors.palette.sand700,
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

const $selectedText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
})

const $countBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginLeft: spacing.xxs,
  backgroundColor: colors.palette.sand300,
  borderRadius: 10,
  paddingHorizontal: spacing.xxs,
  paddingVertical: 1,
  minWidth: 18,
  alignItems: "center",
})

const $countBadgeSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean600,
})

const $countText: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 10,
  fontWeight: "600",
  color: colors.palette.sand700,
})

const $countTextSelected: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
})
