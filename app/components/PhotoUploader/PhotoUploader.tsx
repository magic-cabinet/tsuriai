import { useState } from "react"
import { Image, ImageSourcePropType, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Icon } from "../Icon"
import { Spinner } from "../Spinner"
import { Button } from "../Button"

interface UploadedPhoto {
  id: string
  uri: string
  name?: string
  size?: number
  uploadProgress?: number
  error?: string
}

export interface PhotoUploaderProps {
  /**
   * Array of uploaded photos
   */
  photos: UploadedPhoto[]
  /**
   * Maximum number of photos allowed
   * @default 5
   */
  maxPhotos?: number
  /**
   * Whether uploading is in progress
   */
  uploading?: boolean
  /**
   * Callback when add photo is pressed
   */
  onAddPhoto?: () => void
  /**
   * Callback when photo is removed
   */
  onRemovePhoto?: (photoId: string) => void
  /**
   * Callback when photo is pressed (for preview)
   */
  onPhotoPress?: (photo: UploadedPhoto) => void
  /**
   * Whether the uploader is disabled
   */
  disabled?: boolean
  /**
   * Helper text
   */
  helperText?: string
  /**
   * Error message
   */
  error?: string
  /**
   * Label text
   */
  label?: string
  /**
   * Whether photos are required
   */
  required?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * PhotoUploader component for uploading and managing photos.
 *
 * @param {PhotoUploaderProps} props - The props for the `PhotoUploader` component.
 * @returns {JSX.Element} The rendered `PhotoUploader` component.
 */
export function PhotoUploader(props: PhotoUploaderProps) {
  const {
    photos,
    maxPhotos = 5,
    uploading = false,
    onAddPhoto,
    onRemovePhoto,
    onPhotoPress,
    disabled = false,
    helperText,
    error,
    label,
    required = false,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const canAddMore = photos.length < maxPhotos && !disabled

  return (
    <View style={$styleOverride}>
      {/* Label */}
      {label && (
        <View style={themed($labelContainer)}>
          <Text text={label} size="sm" weight="medium" style={themed($label)} />
          {required && <Text text=" *" style={themed($required)} />}
        </View>
      )}

      {/* Photos Grid */}
      <View style={themed($photosGrid)}>
        {photos.map((photo) => (
          <View key={photo.id} style={themed($photoContainer)}>
            <Pressable
              style={themed($photoWrapper)}
              onPress={() => onPhotoPress?.(photo)}
              disabled={!onPhotoPress}
            >
              <Image
                source={{ uri: photo.uri }}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
                resizeMode="cover"
              />

              {/* Upload Progress Overlay */}
              {photo.uploadProgress !== undefined && photo.uploadProgress < 100 && (
                <View style={themed($progressOverlay)}>
                  <Spinner size="sm" color="white" />
                  <Text
                    text={`${photo.uploadProgress}%`}
                    size="xs"
                    style={themed($progressText)}
                  />
                </View>
              )}

              {/* Error Overlay */}
              {photo.error && (
                <View style={themed($errorOverlay)}>
                  <Icon icon="x" size={20} color={theme.colors.palette.sand100} />
                  <Text text="Failed" size="xs" style={themed($errorText)} />
                </View>
              )}
            </Pressable>

            {/* Remove Button */}
            {onRemovePhoto && !disabled && (
              <Pressable
                style={themed($removeButton)}
                onPress={() => onRemovePhoto(photo.id)}
                hitSlop={8}
              >
                <Icon icon="x" size={14} color={theme.colors.palette.sand100} />
              </Pressable>
            )}
          </View>
        ))}

        {/* Add Photo Button */}
        {canAddMore && (
          <Pressable
            style={[themed($addPhotoButton), disabled && themed($addPhotoButtonDisabled)]}
            onPress={onAddPhoto}
            disabled={disabled || uploading}
          >
            {uploading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <Icon
                  icon="components"
                  size={24}
                  color={disabled ? theme.colors.palette.sand400 : theme.colors.palette.ocean500}
                />
                <Text
                  text="Add Photo"
                  size="xs"
                  style={[themed($addPhotoText), disabled && themed($addPhotoTextDisabled)]}
                />
              </>
            )}
          </Pressable>
        )}
      </View>

      {/* Helper/Error Text */}
      {(helperText || error) && (
        <Text
          text={error || helperText || ""}
          size="xs"
          style={[themed($helperText), error && themed($errorHelperText)]}
        />
      )}

      {/* Photo Count */}
      <Text
        text={`${photos.length}/${maxPhotos} photos`}
        size="xs"
        style={themed($photoCount)}
      />
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $labelContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  marginBottom: spacing.xs,
})

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
})

const $required: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
})

const $photosGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.sm,
})

const $photoContainer: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
})

const $photoWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 80,
  height: 80,
  borderRadius: 8,
  overflow: "hidden",
  backgroundColor: colors.palette.sand200,
})

const $progressOverlay: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
})

const $progressText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  marginTop: 4,
})

const $errorOverlay: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.palette.coral500,
  opacity: 0.9,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  marginTop: 2,
})

const $removeButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: -6,
  right: -6,
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: colors.palette.coral500,
  alignItems: "center",
  justifyContent: "center",
})

const $addPhotoButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 80,
  height: 80,
  borderRadius: 8,
  borderWidth: 2,
  borderStyle: "dashed",
  borderColor: colors.palette.ocean400,
  backgroundColor: colors.palette.ocean100,
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
})

const $addPhotoButtonDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.palette.sand300,
  backgroundColor: colors.palette.sand100,
})

const $addPhotoText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean500,
})

const $addPhotoTextDisabled: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $helperText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand500,
  marginTop: spacing.xs,
})

const $errorHelperText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
})

const $photoCount: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand400,
  marginTop: spacing.xs,
  textAlign: "right",
})
