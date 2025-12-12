import { StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { CountdownTimer } from "../CountdownTimer"
import { Badge } from "../Badge"
import { Icon } from "../Icon"

type AuctionPhase = "upcoming" | "active" | "ending_soon" | "ended"

export interface AuctionTimerProps {
  /**
   * Target end date/time for the auction
   */
  endDate: Date
  /**
   * Start date for upcoming auctions
   */
  startDate?: Date
  /**
   * Callback when auction ends
   */
  onEnd?: () => void
  /**
   * Minutes threshold for "ending soon" status
   * @default 5
   */
  endingSoonThreshold?: number
  /**
   * Size variant
   * @default "medium"
   */
  size?: "xs" | "small" | "medium" | "large"
  /**
   * Whether to show the phase badge
   * @default true
   */
  showPhaseBadge?: boolean
  /**
   * Whether to show the icon
   * @default true
   */
  showIcon?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * AuctionTimer component combining CountdownTimer with auction-specific UI.
 * Shows auction phase, time remaining, and visual urgency indicators.
 *
 * @param {AuctionTimerProps} props - The props for the `AuctionTimer` component.
 * @returns {JSX.Element} The rendered `AuctionTimer` component.
 *
 * @example
 * <AuctionTimer
 *   endDate={new Date(Date.now() + 3600000)}
 *   onEnd={() => handleAuctionEnd()}
 *   endingSoonThreshold={10}
 * />
 */
export function AuctionTimer(props: AuctionTimerProps) {
  const {
    endDate,
    startDate,
    onEnd,
    endingSoonThreshold = 5,
    size = "medium",
    showPhaseBadge = true,
    showIcon = true,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const now = new Date()
  const timeToEnd = endDate.getTime() - now.getTime()
  const timeToStart = startDate ? startDate.getTime() - now.getTime() : 0

  const getPhase = (): AuctionPhase => {
    if (timeToEnd <= 0) return "ended"
    if (startDate && timeToStart > 0) return "upcoming"
    if (timeToEnd <= endingSoonThreshold * 60 * 1000) return "ending_soon"
    return "active"
  }

  const phase = getPhase()

  const phaseConfig: Record<AuctionPhase, { label: string; status: "success" | "warning" | "error" | "info" | "neutral" }> = {
    upcoming: { label: "Upcoming", status: "info" },
    active: { label: "Live", status: "success" },
    ending_soon: { label: "Ending Soon", status: "warning" },
    ended: { label: "Ended", status: "neutral" },
  }

  const config = phaseConfig[phase]

  const $containerStyle: StyleProp<ViewStyle> = [
    themed($container),
    themed($sizeStyles[size]),
    phase === "ending_soon" && themed($endingSoonContainer),
    phase === "ended" && themed($endedContainer),
    $styleOverride,
  ]

  const iconSize = size === "xs" ? 12 : size === "small" ? 16 : size === "large" ? 24 : 20
  const iconColor =
    phase === "ending_soon"
      ? theme.colors.palette.coral500
      : phase === "ended"
      ? theme.colors.palette.sand500
      : theme.colors.palette.ocean500

  return (
    <View style={$containerStyle}>
      <View style={themed($headerRow)}>
        {showIcon && (
          <View style={themed($icon)}>
            <Icon
              icon="bell"
              size={iconSize}
              color={iconColor}
            />
          </View>
        )}
        {showPhaseBadge && (
          <Badge
            text={config.label}
            status={config.status}
            size="sm"
            badgeStyle={phase === "active" ? "solid" : "subtle"}
          />
        )}
      </View>

      {phase === "ended" ? (
        <View style={themed($endedContent)}>
          <Text text="Auction Ended" style={themed($endedText)} />
        </View>
      ) : phase === "upcoming" && startDate ? (
        <View style={themed($timerContent)}>
          <Text text="Starts in" size="xs" style={themed($labelText)} />
          <CountdownTimer
            targetDate={startDate}
            size={size}
            onExpire={onEnd}
          />
        </View>
      ) : (
        <View style={themed($timerContent)}>
          <Text
            text={phase === "ending_soon" ? "Hurry!" : "Time left"}
            size="xs"
            style={[themed($labelText), phase === "ending_soon" && themed($urgentLabel)]}
          />
          <CountdownTimer
            targetDate={endDate}
            size={size}
            onExpire={onEnd}
          />
        </View>
      )}
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.sand100,
  borderRadius: spacing.sm,
  padding: spacing.sm,
  borderWidth: 1,
  borderColor: colors.palette.sand300,
})

const $sizeStyles: Record<"xs" | "small" | "medium" | "large", ThemedStyle<ViewStyle>> = {
  xs: ({ spacing }) => ({
    padding: spacing.xxs,
    borderRadius: spacing.xs,
  }),
  small: ({ spacing }) => ({
    padding: spacing.xs,
  }),
  medium: ({ spacing }) => ({
    padding: spacing.sm,
  }),
  large: ({ spacing }) => ({
    padding: spacing.md,
  }),
}

const $endingSoonContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.coral100,
  borderColor: colors.palette.coral300,
})

const $endedContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.sand200,
  borderColor: colors.palette.sand400,
})

const $headerRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $icon: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.xs,
})

const $timerContent: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

const $labelText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand600,
  marginBottom: spacing.xxs,
})

const $urgentLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.coral500,
  fontWeight: "600",
})

const $endedContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  paddingVertical: spacing.sm,
})

const $endedText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand600,
  fontFamily: typography.primary.medium,
})
