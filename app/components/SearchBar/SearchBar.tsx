import { useRef, useState } from "react"
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  TextStyle,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Icon } from "../Icon"
import { Spinner } from "../Spinner"

export interface SearchBarProps extends Omit<TextInputProps, "style"> {
  /**
   * Current search value
   */
  value: string
  /**
   * Callback when search value changes
   */
  onChangeText: (text: string) => void
  /**
   * Callback when search is submitted
   */
  onSubmit?: (text: string) => void
  /**
   * Callback when clear button is pressed
   */
  onClear?: () => void
  /**
   * Placeholder text
   * @default "Search..."
   */
  placeholder?: string
  /**
   * Whether search is in loading state
   * @default false
   */
  loading?: boolean
  /**
   * Whether to show the clear button
   * @default true
   */
  showClearButton?: boolean
  /**
   * Size variant
   * @default "md"
   */
  size?: "sm" | "md" | "lg"
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style override for input
   */
  inputStyle?: StyleProp<TextStyle>
}

/**
 * SearchBar component for searching/filtering content.
 * Includes search icon, clear button, and loading state.
 *
 * @param {SearchBarProps} props - The props for the `SearchBar` component.
 * @returns {JSX.Element} The rendered `SearchBar` component.
 *
 * @example
 * <SearchBar
 *   value={searchQuery}
 *   onChangeText={setSearchQuery}
 *   onSubmit={handleSearch}
 *   placeholder="Search fish..."
 * />
 */
export function SearchBar(props: SearchBarProps) {
  const {
    value,
    onChangeText,
    onSubmit,
    onClear,
    placeholder = "Search...",
    loading = false,
    showClearButton = true,
    size = "md",
    style: $styleOverride,
    inputStyle: $inputStyleOverride,
    ...textInputProps
  } = props

  const { themed, theme } = useAppTheme()
  const inputRef = useRef<TextInput>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handleClear = () => {
    onChangeText("")
    onClear?.()
    inputRef.current?.focus()
  }

  const handleSubmit = () => {
    onSubmit?.(value)
  }

  const iconSize = size === "sm" ? 16 : size === "lg" ? 24 : 20

  const $containerStyle: StyleProp<ViewStyle> = [
    themed($baseContainer),
    themed($sizeStyles[size]),
    isFocused && themed($focusedContainer),
    $styleOverride,
  ]

  const $inputStyle: StyleProp<TextStyle> = [
    themed($baseInput),
    themed($inputSizeStyles[size]),
    $inputStyleOverride,
  ]

  return (
    <Pressable
      style={$containerStyle}
      onPress={() => inputRef.current?.focus()}
    >
      <View style={themed($iconContainer)}>
        {loading ? (
          <Spinner size="sm" color="primary" />
        ) : (
          <Icon
            icon="debug"
            size={iconSize}
            color={isFocused ? theme.colors.palette.ocean500 : theme.colors.palette.sand500}
          />
        )}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.palette.sand500}
        style={$inputStyle}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        {...textInputProps}
      />
      {showClearButton && value.length > 0 && (
        <Pressable
          onPress={handleClear}
          style={themed($clearButton)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Icon icon="x" size={iconSize} color={theme.colors.palette.sand500} />
        </Pressable>
      )}
    </Pressable>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $baseContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.sand200,
  borderRadius: spacing.md,
  borderWidth: 1,
  borderColor: colors.palette.sand300,
})

const $sizeStyles: Record<"sm" | "md" | "lg", ThemedStyle<ViewStyle>> = {
  sm: ({ spacing }) => ({
    paddingHorizontal: spacing.sm,
    minHeight: 36,
  }),
  md: ({ spacing }) => ({
    paddingHorizontal: spacing.md,
    minHeight: 44,
  }),
  lg: ({ spacing }) => ({
    paddingHorizontal: spacing.md,
    minHeight: 52,
  }),
}

const $focusedContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.palette.ocean500,
  backgroundColor: colors.palette.sand100,
})

const $iconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.xs,
})

const $baseInput: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  flex: 1,
  fontFamily: typography.primary.normal,
  color: colors.palette.sand900,
  padding: 0,
})

const $inputSizeStyles: Record<"sm" | "md" | "lg", ThemedStyle<TextStyle>> = {
  sm: () => ({
    fontSize: 14,
  }),
  md: () => ({
    fontSize: 16,
  }),
  lg: () => ({
    fontSize: 18,
  }),
}

const $clearButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginLeft: spacing.xs,
  padding: spacing.xxs,
})
