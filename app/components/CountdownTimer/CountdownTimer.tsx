/**
 * CountdownTimer - Reusable countdown timer for auctions
 *
 * Features:
 * - Display days/hours/mins/secs
 * - Urgent state when < 1 hour remaining
 * - Expired state when time runs out
 * - Animated transitions between numbers
 */

import React, { useEffect, useMemo, useState } from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface CountdownTimerProps {
  /**
   * Target date to count down to
   */
  targetDate: Date
  /**
   * Callback fired when timer expires
   */
  onExpire?: () => void
  /**
   * Size variant
   */
  size?: "xs" | "small" | "medium" | "large"
  /**
   * Optional style override
   */
  style?: ViewStyle
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
  isExpired: boolean
  isUrgent: boolean // Less than 1 hour remaining
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date()
  const difference = targetDate.getTime() - now.getTime()
  const totalSeconds = Math.floor(difference / 1000)

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: true,
      isUrgent: false,
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isExpired: false,
    isUrgent: totalSeconds < 3600, // Less than 1 hour
  }
}

export function CountdownTimer({
  targetDate,
  onExpire,
  size = "medium",
  style,
}: CountdownTimerProps) {
  const { theme, themed } = useAppTheme()
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate),
  )

  // Animated scale for pulse effect
  const scale = useSharedValue(1)

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeRemaining(targetDate)
      setTimeRemaining(newTime)

      if (newTime.isExpired && onExpire) {
        onExpire()
        clearInterval(interval)
      }

      // Pulse effect when urgent
      if (newTime.isUrgent && !newTime.isExpired) {
        scale.value = withSpring(1.05, { damping: 10, stiffness: 100 })
        setTimeout(() => {
          scale.value = withSpring(1, { damping: 10, stiffness: 100 })
        }, 150)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate, onExpire, scale])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  // Determine color scheme based on state
  const containerStyle = useMemo(() => {
    if (timeRemaining.isExpired) {
      return themed($containerExpired)
    } else if (timeRemaining.isUrgent) {
      return themed($containerUrgent)
    }
    return themed($containerNormal)
  }, [timeRemaining.isExpired, timeRemaining.isUrgent, themed])

  const textColor = useMemo(() => {
    if (timeRemaining.isExpired) {
      return theme.colors.palette.sand600
    } else if (timeRemaining.isUrgent) {
      return theme.colors.palette.coral500
    }
    return theme.colors.palette.ocean600
  }, [timeRemaining.isExpired, timeRemaining.isUrgent, theme])

  const labelColor = useMemo(() => {
    if (timeRemaining.isExpired) {
      return theme.colors.palette.sand500
    } else if (timeRemaining.isUrgent) {
      return theme.colors.palette.coral400
    }
    return theme.colors.palette.ocean400
  }, [timeRemaining.isExpired, timeRemaining.isUrgent, theme])

  // Size-based styles
  const sizeStyles = useMemo(() => {
    switch (size) {
      case "xs":
        return {
          number: { fontSize: 12, lineHeight: 14 },
          label: { fontSize: 8, lineHeight: 10 },
          gap: 2,
          hideLabels: true,
        }
      case "small":
        return {
          number: { fontSize: 20, lineHeight: 28 },
          label: { fontSize: 10, lineHeight: 14 },
          gap: 8,
          hideLabels: false,
        }
      case "large":
        return {
          number: { fontSize: 36, lineHeight: 44 },
          label: { fontSize: 14, lineHeight: 20 },
          gap: 16,
          hideLabels: false,
        }
      default:
        return {
          number: { fontSize: 28, lineHeight: 36 },
          label: { fontSize: 12, lineHeight: 16 },
          gap: 12,
          hideLabels: false,
        }
    }
  }, [size])

  // Render expired state
  if (timeRemaining.isExpired) {
    return (
      <Animated.View
        entering={FadeIn.duration(300)}
        style={[styles.container, containerStyle, style]}
      >
        <Text
          text="EXPIRED"
          weight="bold"
          style={{
            color: textColor,
            fontSize: sizeStyles.number.fontSize,
            lineHeight: sizeStyles.number.lineHeight,
            letterSpacing: 2,
          }}
        />
      </Animated.View>
    )
  }

  // Show days only if > 0
  const showDays = timeRemaining.days > 0
  const hideLabels = sizeStyles.hideLabels

  const containerSizeStyle = size === "xs" ? styles.containerXs : styles.container

  return (
    <Animated.View
      style={[containerSizeStyle, containerStyle, animatedStyle, style]}
      entering={FadeIn.duration(300)}
    >
      {showDays && (
        <TimeUnit
          value={timeRemaining.days}
          label="DAYS"
          textColor={textColor}
          labelColor={labelColor}
          numberStyle={sizeStyles.number}
          labelStyle={sizeStyles.label}
          hideLabel={hideLabels}
        />
      )}
      {showDays && <TimeSeparator color={textColor} size={sizeStyles.number.fontSize} />}
      <TimeUnit
        value={timeRemaining.hours}
        label="HRS"
        textColor={textColor}
        labelColor={labelColor}
        numberStyle={sizeStyles.number}
        labelStyle={sizeStyles.label}
        hideLabel={hideLabels}
      />
      <TimeSeparator color={textColor} size={sizeStyles.number.fontSize} />
      <TimeUnit
        value={timeRemaining.minutes}
        label="MIN"
        textColor={textColor}
        labelColor={labelColor}
        numberStyle={sizeStyles.number}
        labelStyle={sizeStyles.label}
        hideLabel={hideLabels}
      />
      <TimeSeparator color={textColor} size={sizeStyles.number.fontSize} />
      <TimeUnit
        value={timeRemaining.seconds}
        label="SEC"
        textColor={textColor}
        labelColor={labelColor}
        numberStyle={sizeStyles.number}
        labelStyle={sizeStyles.label}
        hideLabel={hideLabels}
      />
    </Animated.View>
  )
}

interface TimeUnitProps {
  value: number
  label: string
  textColor: string
  labelColor: string
  numberStyle: { fontSize: number; lineHeight: number }
  labelStyle: { fontSize: number; lineHeight: number }
  hideLabel?: boolean
}

function TimeUnit({
  value,
  label,
  textColor,
  labelColor,
  numberStyle,
  labelStyle,
  hideLabel = false,
}: TimeUnitProps) {
  const formattedValue = value.toString().padStart(2, "0")

  return (
    <View style={styles.timeUnit}>
      <Animated.View key={formattedValue} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
        <Text
          text={formattedValue}
          weight="bold"
          style={{
            color: textColor,
            fontSize: numberStyle.fontSize,
            lineHeight: numberStyle.lineHeight,
            letterSpacing: -0.5,
          }}
        />
      </Animated.View>
      {!hideLabel && (
        <Text
          text={label}
          weight="medium"
          style={{
            color: labelColor,
            fontSize: labelStyle.fontSize,
            lineHeight: labelStyle.lineHeight,
            letterSpacing: 1,
          }}
        />
      )}
    </View>
  )
}

interface TimeSeparatorProps {
  color: string
  size: number
}

function TimeSeparator({ color, size }: TimeSeparatorProps) {
  return (
    <Text
      text=":"
      weight="bold"
      style={{
        color,
        fontSize: size,
        lineHeight: size * 1.2,
        marginHorizontal: 4,
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  containerXs: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 4,
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  timeUnit: {
    alignItems: "center",
    gap: 2,
  },
})

// Themed container styles
const $containerNormal: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.ocean100,
  borderColor: theme.colors.palette.ocean200,
  borderWidth: 1,
})

const $containerUrgent: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.coral100,
  borderColor: theme.colors.palette.coral200,
  borderWidth: 1,
})

const $containerExpired: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.sand200,
  borderColor: theme.colors.palette.sand300,
  borderWidth: 1,
})
