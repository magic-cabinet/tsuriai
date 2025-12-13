import { Pressable, StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Icon } from "../Icon"

type PaginationVariant = "default" | "simple" | "compact"

export interface PaginationProps {
  /**
   * Current page (1-indexed)
   */
  currentPage: number
  /**
   * Total number of pages
   */
  totalPages: number
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void
  /**
   * Pagination style variant
   * @default "default"
   */
  variant?: PaginationVariant
  /**
   * Maximum number of page buttons to show
   * @default 5
   */
  maxButtons?: number
  /**
   * Whether to show first/last page buttons
   * @default true
   */
  showFirstLast?: boolean
  /**
   * Whether to show prev/next buttons
   * @default true
   */
  showPrevNext?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Pagination component for navigating through pages.
 * Supports multiple variants including numbered, simple, and compact.
 *
 * @param {PaginationProps} props - The props for the `Pagination` component.
 * @returns {JSX.Element} The rendered `Pagination` component.
 *
 * @example
 * <Pagination
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 */
export function Pagination(props: PaginationProps) {
  const {
    currentPage,
    totalPages,
    onPageChange,
    variant = "default",
    maxButtons = 5,
    showFirstLast = true,
    showPrevNext = true,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages

  const handlePrev = () => canGoPrev && onPageChange(currentPage - 1)
  const handleNext = () => canGoNext && onPageChange(currentPage + 1)
  const handleFirst = () => onPageChange(1)
  const handleLast = () => onPageChange(totalPages)

  // Generate page numbers to display
  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | "ellipsis")[] = []
    const halfButtons = Math.floor(maxButtons / 2)

    let start = Math.max(1, currentPage - halfButtons)
    let end = Math.min(totalPages, currentPage + halfButtons)

    // Adjust if we're at the start or end
    if (currentPage <= halfButtons) {
      end = maxButtons
    } else if (currentPage >= totalPages - halfButtons) {
      start = totalPages - maxButtons + 1
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push("ellipsis")
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    // Add ellipsis and last page if needed
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("ellipsis")
      pages.push(totalPages)
    }

    return pages
  }

  const $containerStyle: StyleProp<ViewStyle> = [themed($container), $styleOverride]

  // Simple variant: just prev/next with page info
  if (variant === "simple") {
    return (
      <View style={$containerStyle}>
        <Pressable
          style={[themed($navButton), !canGoPrev && themed($disabledButton)]}
          onPress={handlePrev}
          disabled={!canGoPrev}
        >
          <Icon
            icon="caretLeft"
            size={20}
            color={canGoPrev ? theme.colors.palette.sand900 : theme.colors.palette.sand400}
          />
        </Pressable>
        <Text style={themed($pageInfo)}>
          {currentPage} of {totalPages}
        </Text>
        <Pressable
          style={[themed($navButton), !canGoNext && themed($disabledButton)]}
          onPress={handleNext}
          disabled={!canGoNext}
        >
          <Icon
            icon="caretRight"
            size={20}
            color={canGoNext ? theme.colors.palette.sand900 : theme.colors.palette.sand400}
          />
        </Pressable>
      </View>
    )
  }

  // Compact variant: just dots
  if (variant === "compact") {
    return (
      <View style={$containerStyle}>
        {Array.from({ length: totalPages }, (_, i) => (
          <Pressable
            key={i}
            style={[themed($dot), currentPage === i + 1 && themed($dotActive)]}
            onPress={() => onPageChange(i + 1)}
          />
        ))}
      </View>
    )
  }

  // Default variant: full pagination with page numbers
  const pageNumbers = getPageNumbers()

  return (
    <View style={$containerStyle}>
      {showFirstLast && (
        <Pressable
          style={[themed($navButton), !canGoPrev && themed($disabledButton)]}
          onPress={handleFirst}
          disabled={!canGoPrev}
        >
          <Icon
            icon="caretLeft"
            size={16}
            color={canGoPrev ? theme.colors.palette.sand900 : theme.colors.palette.sand400}
          />
          <Icon
            icon="caretLeft"
            size={16}
            color={canGoPrev ? theme.colors.palette.sand900 : theme.colors.palette.sand400}
            style={{ marginLeft: -8 }}
          />
        </Pressable>
      )}

      {showPrevNext && (
        <Pressable
          style={[themed($navButton), !canGoPrev && themed($disabledButton)]}
          onPress={handlePrev}
          disabled={!canGoPrev}
        >
          <Icon
            icon="caretLeft"
            size={20}
            color={canGoPrev ? theme.colors.palette.sand900 : theme.colors.palette.sand400}
          />
        </Pressable>
      )}

      {pageNumbers.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <View key={`ellipsis-${index}`} style={themed($ellipsis)}>
              <Text style={themed($ellipsisText)}>...</Text>
            </View>
          )
        }

        const isActive = page === currentPage
        return (
          <Pressable
            key={page}
            style={[themed($pageButton), isActive && themed($pageButtonActive)]}
            onPress={() => onPageChange(page)}
          >
            <Text style={[themed($pageText), isActive && themed($pageTextActive)]}>
              {page}
            </Text>
          </Pressable>
        )
      })}

      {showPrevNext && (
        <Pressable
          style={[themed($navButton), !canGoNext && themed($disabledButton)]}
          onPress={handleNext}
          disabled={!canGoNext}
        >
          <Icon
            icon="caretRight"
            size={20}
            color={canGoNext ? theme.colors.palette.sand900 : theme.colors.palette.sand400}
          />
        </Pressable>
      )}

      {showFirstLast && (
        <Pressable
          style={[themed($navButton), !canGoNext && themed($disabledButton)]}
          onPress={handleLast}
          disabled={!canGoNext}
        >
          <Icon
            icon="caretRight"
            size={16}
            color={canGoNext ? theme.colors.palette.sand900 : theme.colors.palette.sand400}
          />
          <Icon
            icon="caretRight"
            size={16}
            color={canGoNext ? theme.colors.palette.sand900 : theme.colors.palette.sand400}
            style={{ marginLeft: -8 }}
          />
        </Pressable>
      )}
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.xxs,
})

const $navButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: spacing.xs,
  backgroundColor: colors.palette.sand200,
})

const $disabledButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.sand100,
})

const $pageButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  minWidth: 36,
  height: 36,
  borderRadius: spacing.xs,
  paddingHorizontal: spacing.xs,
})

const $pageButtonActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean500,
})

const $pageText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.primary.medium,
  fontSize: 14,
  color: colors.palette.sand700,
})

const $pageTextActive: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
})

const $ellipsis: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xxs,
})

const $ellipsisText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $pageInfo: ThemedStyle<TextStyle> = ({ colors, spacing, typography }) => ({
  fontFamily: typography.primary.medium,
  fontSize: 14,
  color: colors.palette.sand700,
  paddingHorizontal: spacing.md,
})

const $dot: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: colors.palette.sand300,
  marginHorizontal: spacing.xxs,
})

const $dotActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean500,
  width: 24,
})
