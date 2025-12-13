import { Image, ImageSourcePropType, StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Icon } from "../Icon"

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"
type AvatarShape = "circle" | "rounded"

export interface AvatarProps {
  /**
   * Image source for the avatar
   */
  source?: ImageSourcePropType
  /**
   * User's name (used to generate initials fallback)
   */
  name?: string
  /**
   * Size of the avatar
   * @default "md"
   */
  size?: AvatarSize
  /**
   * Shape of the avatar
   * @default "circle"
   */
  shape?: AvatarShape
  /**
   * Style override for the container
   */
  style?: StyleProp<ViewStyle>
}

const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
}

const fontSizeMap: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 20,
  xl: 28,
}

const iconSizeMap: Record<AvatarSize, number> = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 32,
  xl: 44,
}

/**
 * Avatar component for displaying user images or initials.
 * Falls back to initials from name or a user icon.
 *
 * @param {AvatarProps} props - The props for the `Avatar` component.
 * @returns {JSX.Element} The rendered `Avatar` component.
 *
 * @example
 * <Avatar source={{ uri: "https://example.com/avatar.jpg" }} size="lg" />
 * <Avatar name="John Doe" size="md" />
 * <Avatar size="sm" /> // Shows user icon fallback
 */
export function Avatar(props: AvatarProps) {
  const { source, name, size = "md", shape = "circle", style: $styleOverride } = props

  const { themed, theme } = useAppTheme()

  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(" ")
    if (names.length === 1) return names[0].charAt(0).toUpperCase()
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  const avatarSize = sizeMap[size]
  const fontSize = fontSizeMap[size]
  const iconSize = iconSizeMap[size]
  const borderRadius = shape === "circle" ? avatarSize / 2 : avatarSize / 4

  const $containerStyle: StyleProp<ViewStyle> = [
    themed($baseContainer),
    {
      width: avatarSize,
      height: avatarSize,
      borderRadius,
    },
    $styleOverride,
  ]

  const $textStyle: StyleProp<TextStyle> = [
    themed($initialsText),
    { fontSize, lineHeight: fontSize * 1.2 },
  ]

  // Render image if source is provided
  if (source) {
    return (
      <View style={$containerStyle}>
        <Image
          source={source}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius,
          }}
          resizeMode="cover"
        />
      </View>
    )
  }

  // Render initials if name is provided
  if (name) {
    return (
      <View style={$containerStyle}>
        <Text style={$textStyle}>{getInitials(name)}</Text>
      </View>
    )
  }

  // Render icon fallback
  return (
    <View style={$containerStyle}>
      <Icon icon="community" size={iconSize} color={theme.colors.palette.sand100} />
    </View>
  )
}

const $baseContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.palette.ocean400,
  overflow: "hidden",
})

const $initialsText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand100,
  fontFamily: typography.primary.medium,
  textAlign: "center",
})
