import { useCallback, useMemo, useState } from "react"
import { Pressable, StyleProp, View, ViewStyle, TextStyle, ScrollView } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"
import { Icon } from "../Icon"
import { Button } from "../Button"
import { Modal } from "../Modal"

export interface DateRange {
  /**
   * Start date of the range
   */
  startDate: Date | null
  /**
   * End date of the range
   */
  endDate: Date | null
}

export interface PresetRange {
  /**
   * Unique key for the preset
   */
  key: string
  /**
   * Display label
   */
  label?: string
  /**
   * i18n key for label
   */
  labelTx?: TextProps["tx"]
  /**
   * Function to calculate the date range
   */
  getValue: () => DateRange
}

export interface DateRangePickerProps {
  /**
   * Current selected date range
   */
  value: DateRange
  /**
   * Callback when date range changes
   */
  onChange: (range: DateRange) => void
  /**
   * Placeholder text when no range selected
   * @default "Select date range"
   */
  placeholder?: string
  /**
   * Placeholder i18n key
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Custom preset ranges (uses defaults if not provided)
   */
  presets?: PresetRange[]
  /**
   * Whether to show preset ranges
   * @default true
   */
  showPresets?: boolean
  /**
   * Whether to show clear button
   * @default true
   */
  showClear?: boolean
  /**
   * Minimum selectable date
   */
  minDate?: Date
  /**
   * Maximum selectable date
   */
  maxDate?: Date
  /**
   * Size variant
   * @default "md"
   */
  size?: "sm" | "md" | "lg"
  /**
   * Whether the picker is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const DEFAULT_PRESETS: PresetRange[] = [
  {
    key: "today",
    label: "Today",
    getValue: () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const endOfDay = new Date(today)
      endOfDay.setHours(23, 59, 59, 999)
      return { startDate: today, endDate: endOfDay }
    },
  },
  {
    key: "yesterday",
    label: "Yesterday",
    getValue: () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)
      const endOfDay = new Date(yesterday)
      endOfDay.setHours(23, 59, 59, 999)
      return { startDate: yesterday, endDate: endOfDay }
    },
  },
  {
    key: "this_week",
    label: "This Week",
    getValue: () => {
      const today = new Date()
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())
      startOfWeek.setHours(0, 0, 0, 0)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      endOfWeek.setHours(23, 59, 59, 999)
      return { startDate: startOfWeek, endDate: endOfWeek }
    },
  },
  {
    key: "last_week",
    label: "Last Week",
    getValue: () => {
      const today = new Date()
      const startOfLastWeek = new Date(today)
      startOfLastWeek.setDate(today.getDate() - today.getDay() - 7)
      startOfLastWeek.setHours(0, 0, 0, 0)
      const endOfLastWeek = new Date(startOfLastWeek)
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6)
      endOfLastWeek.setHours(23, 59, 59, 999)
      return { startDate: startOfLastWeek, endDate: endOfLastWeek }
    },
  },
  {
    key: "this_month",
    label: "This Month",
    getValue: () => {
      const today = new Date()
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
      return { startDate: startOfMonth, endDate: endOfMonth }
    },
  },
  {
    key: "last_month",
    label: "Last Month",
    getValue: () => {
      const today = new Date()
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999)
      return { startDate: startOfLastMonth, endDate: endOfLastMonth }
    },
  },
  {
    key: "last_30_days",
    label: "Last 30 Days",
    getValue: () => {
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(today.getDate() - 29)
      thirtyDaysAgo.setHours(0, 0, 0, 0)
      return { startDate: thirtyDaysAgo, endDate: today }
    },
  },
]

/**
 * DateRangePicker component for selecting date ranges.
 * Supports preset ranges and custom date selection.
 *
 * @param {DateRangePickerProps} props - The props for the `DateRangePicker` component.
 * @returns {JSX.Element} The rendered `DateRangePicker` component.
 *
 * @example
 * <DateRangePicker
 *   value={{ startDate: new Date(), endDate: new Date() }}
 *   onChange={(range) => setDateRange(range)}
 *   showPresets
 * />
 */
export function DateRangePicker(props: DateRangePickerProps) {
  const {
    value,
    onChange,
    placeholder = "Select date range",
    placeholderTx,
    presets = DEFAULT_PRESETS,
    showPresets = true,
    showClear = true,
    minDate,
    maxDate,
    size = "md",
    disabled = false,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(value.startDate ?? new Date())
  const [selectingStart, setSelectingStart] = useState(true)
  const [tempRange, setTempRange] = useState<DateRange>(value)

  const formatDate = (date: Date | null): string => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const displayText = useMemo(() => {
    if (!value.startDate && !value.endDate) return null
    if (value.startDate && value.endDate) {
      return `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`
    }
    return formatDate(value.startDate ?? value.endDate)
  }, [value])

  const handleOpen = useCallback(() => {
    if (disabled) return
    setTempRange(value)
    setSelectingStart(true)
    setViewMonth(value.startDate ?? new Date())
    setIsOpen(true)
  }, [disabled, value])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleClear = useCallback(() => {
    onChange({ startDate: null, endDate: null })
  }, [onChange])

  const handlePresetSelect = useCallback(
    (preset: PresetRange) => {
      const range = preset.getValue()
      onChange(range)
      setIsOpen(false)
    },
    [onChange]
  )

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (selectingStart) {
        setTempRange({ startDate: date, endDate: null })
        setSelectingStart(false)
      } else {
        const start = tempRange.startDate!
        if (date < start) {
          setTempRange({ startDate: date, endDate: start })
        } else {
          setTempRange({ startDate: start, endDate: date })
        }
        setSelectingStart(true)
      }
    },
    [selectingStart, tempRange.startDate]
  )

  const handleConfirm = useCallback(() => {
    if (tempRange.startDate && tempRange.endDate) {
      onChange(tempRange)
      setIsOpen(false)
    }
  }, [tempRange, onChange])

  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      return false
    },
    [minDate, maxDate]
  )

  const isDateInRange = useCallback(
    (date: Date): boolean => {
      if (!tempRange.startDate || !tempRange.endDate) return false
      return date >= tempRange.startDate && date <= tempRange.endDate
    },
    [tempRange]
  )

  const isDateSelected = useCallback(
    (date: Date): boolean => {
      if (tempRange.startDate && date.toDateString() === tempRange.startDate.toDateString()) return true
      if (tempRange.endDate && date.toDateString() === tempRange.endDate.toDateString()) return true
      return false
    },
    [tempRange]
  )

  const renderCalendar = () => {
    const year = viewMonth.getFullYear()
    const month = viewMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const weeks: (Date | null)[][] = []
    let currentWeek: (Date | null)[] = []

    // Fill in empty days at start
    for (let i = 0; i < startingDay; i++) {
      currentWeek.push(null)
    }

    // Fill in days of month
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(new Date(year, month, day))
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }

    // Fill in empty days at end
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      weeks.push(currentWeek)
    }

    return (
      <View style={themed($calendar)}>
        {/* Month Navigation */}
        <View style={themed($calendarHeader)}>
          <Pressable
            onPress={() => setViewMonth(new Date(year, month - 1, 1))}
            style={themed($navButton)}
          >
            <Icon icon="caretLeft" size={20} color={theme.colors.palette.sand700} />
          </Pressable>
          <Text
            text={viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            weight="bold"
            size="md"
          />
          <Pressable
            onPress={() => setViewMonth(new Date(year, month + 1, 1))}
            style={themed($navButton)}
          >
            <Icon icon="caretRight" size={20} color={theme.colors.palette.sand700} />
          </Pressable>
        </View>

        {/* Day Labels */}
        <View style={themed($weekRow)}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <View key={day} style={themed($dayCell)}>
              <Text text={day} size="xs" style={themed($dayLabel)} />
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={themed($weekRow)}>
            {week.map((date, dayIndex) => {
              if (!date) {
                return <View key={dayIndex} style={themed($dayCell)} />
              }

              const isDisabled = isDateDisabled(date)
              const isSelected = isDateSelected(date)
              const inRange = isDateInRange(date)
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <Pressable
                  key={dayIndex}
                  style={[
                    themed($dayCell),
                    inRange && themed($dayInRange),
                    isSelected && themed($daySelected),
                    isToday && !isSelected && themed($dayToday),
                    isDisabled && themed($dayDisabled),
                  ]}
                  onPress={() => !isDisabled && handleDateSelect(date)}
                  disabled={isDisabled}
                >
                  <Text
                    text={date.getDate().toString()}
                    size="sm"
                    style={[
                      themed($dayText),
                      isSelected && themed($dayTextSelected),
                      isDisabled && themed($dayTextDisabled),
                    ]}
                  />
                </Pressable>
              )
            })}
          </View>
        ))}
      </View>
    )
  }

  const $containerStyles: StyleProp<ViewStyle> = [
    themed($container),
    themed($sizeStyles[size]),
    disabled && themed($containerDisabled),
    $styleOverride,
  ]

  return (
    <>
      <Pressable style={$containerStyles} onPress={handleOpen} disabled={disabled}>
        <Icon
          icon="components"
          size={size === "sm" ? 16 : size === "lg" ? 24 : 20}
          color={disabled ? theme.colors.palette.sand400 : theme.colors.palette.ocean500}
        />
        {displayText ? (
          <Text
            text={displayText}
            size={size === "sm" ? "xs" : size === "lg" ? "md" : "sm"}
            style={themed($valueText)}
          />
        ) : (
          <Text
            text={placeholder}
            tx={placeholderTx}
            size={size === "sm" ? "xs" : size === "lg" ? "md" : "sm"}
            style={themed($placeholderText)}
          />
        )}
        {showClear && displayText && !disabled && (
          <Pressable
            onPress={(e) => {
              e.stopPropagation()
              handleClear()
            }}
            hitSlop={8}
          >
            <Icon icon="x" size={16} color={theme.colors.palette.sand500} />
          </Pressable>
        )}
        <Icon
          icon="caretRight"
          size={16}
          color={theme.colors.palette.sand400}
          style={{ transform: [{ rotate: "90deg" }] }}
        />
      </Pressable>

      <Modal visible={isOpen} onClose={handleClose} heading="Select Date Range" size="lg">
        {/* Presets */}
        {showPresets && (
          <View style={themed($presetsSection)}>
            <Text text="Quick Select" size="xs" weight="medium" style={themed($presetLabel)} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={themed($presetsRow)}>
                {presets.map((preset) => (
                  <Pressable
                    key={preset.key}
                    style={themed($presetChip)}
                    onPress={() => handlePresetSelect(preset)}
                  >
                    <Text text={preset.label} tx={preset.labelTx} size="xs" style={themed($presetChipText)} />
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Selection indicator */}
        <View style={themed($selectionRow)}>
          <View style={[themed($selectionBox), selectingStart && themed($selectionBoxActive)]}>
            <Text text="Start" size="xs" style={themed($selectionLabel)} />
            <Text
              text={tempRange.startDate ? formatDate(tempRange.startDate) : "Select"}
              size="sm"
              weight="medium"
            />
          </View>
          <Icon icon="caretRight" size={16} color={theme.colors.palette.sand400} />
          <View style={[themed($selectionBox), !selectingStart && themed($selectionBoxActive)]}>
            <Text text="End" size="xs" style={themed($selectionLabel)} />
            <Text
              text={tempRange.endDate ? formatDate(tempRange.endDate) : "Select"}
              size="sm"
              weight="medium"
            />
          </View>
        </View>

        {/* Calendar */}
        {renderCalendar()}

        {/* Actions */}
        <View style={themed($actions)}>
          <Button text="Cancel" preset="default" onPress={handleClose} style={themed($actionButton)} />
          <Button
            text="Confirm"
            preset="reversed"
            onPress={handleConfirm}
            disabled={!tempRange.startDate || !tempRange.endDate}
            style={themed($actionButton)}
          />
        </View>
      </Modal>
    </>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.sand100,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.palette.sand300,
  gap: spacing.xs,
})

const $sizeStyles: Record<"sm" | "md" | "lg", ThemedStyle<ViewStyle>> = {
  sm: ({ spacing }) => ({
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 36,
  }),
  md: ({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 44,
  }),
  lg: ({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 52,
  }),
}

const $containerDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.sand200,
  borderColor: colors.palette.sand200,
})

const $valueText: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.palette.sand900,
})

const $placeholderText: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.palette.sand500,
})

const $presetsSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $presetLabel: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand600,
  marginBottom: spacing.xs,
  textTransform: "uppercase",
  letterSpacing: 0.5,
})

const $presetsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xs,
})

const $presetChip: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  backgroundColor: colors.palette.ocean100,
  borderRadius: 16,
})

const $presetChipText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
})

const $selectionRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.sm,
  marginBottom: spacing.md,
})

const $selectionBox: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  padding: spacing.sm,
  backgroundColor: colors.palette.sand100,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.sand300,
  alignItems: "center",
})

const $selectionBoxActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.palette.ocean500,
  backgroundColor: colors.palette.ocean100,
})

const $selectionLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  textTransform: "uppercase",
  letterSpacing: 0.5,
})

const $calendar: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $calendarHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.md,
})

const $navButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
})

const $weekRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
})

const $dayCell: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  aspectRatio: 1,
  alignItems: "center",
  justifyContent: "center",
  margin: 1,
  borderRadius: 8,
})

const $dayLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  textTransform: "uppercase",
})

const $dayText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $dayTextSelected: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
})

const $dayTextDisabled: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $daySelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean500,
})

const $dayInRange: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean100,
})

const $dayToday: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderWidth: 1,
  borderColor: colors.palette.ocean400,
})

const $dayDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.sand100,
})

const $actions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $actionButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
