import { useState } from "react"
import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react"

import { DateRangePicker, DateRange } from "./DateRangePicker"
import { Text } from "../Text"
import { colors } from "../../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand100,
    flex: 1,
    padding: 24,
  },
  grid: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    color: colors.palette.sand600,
    letterSpacing: 1.2,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  showcaseCard: {
    backgroundColor: colors.palette.sand200,
    borderRadius: 16,
    gap: 20,
    padding: 24,
  },
  showcaseDivider: {
    backgroundColor: colors.palette.sand300,
    height: 1,
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
})

/**
 * DateRangePicker Stories
 *
 * Date range selection component for the tsuriai fishing app.
 * Use for filtering catch data, auction history, and order reports.
 *
 * Design principles:
 * - Quick preset selection for common ranges
 * - Clear visual calendar for custom selection
 * - Seaside color palette (ocean blues for selection)
 */
const meta: Meta<typeof DateRangePicker> = {
  title: "Core/DateRangePicker",
  component: DateRangePicker,
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text when no range selected",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    showPresets: {
      control: "boolean",
      description: "Whether to show preset ranges",
    },
    showClear: {
      control: "boolean",
      description: "Whether to show clear button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the picker is disabled",
    },
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DateRangePicker>

// =============================================================================
// INTERACTIVE WRAPPER
// =============================================================================

function DateRangePickerWrapper(props: React.ComponentProps<typeof DateRangePicker>) {
  const [value, setValue] = useState<DateRange>(
    props.value ?? { startDate: null, endDate: null }
  )
  return <DateRangePicker {...props} value={value} onChange={setValue} />
}

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  render: () => <DateRangePickerWrapper value={{ startDate: null, endDate: null }} onChange={() => {}} />,
}

export const WithSelection: Story = {
  name: "With Selection",
  render: () => {
    const today = new Date()
    const weekAgo = new Date()
    weekAgo.setDate(today.getDate() - 7)
    return (
      <DateRangePickerWrapper
        value={{ startDate: weekAgo, endDate: today }}
        onChange={() => {}}
      />
    )
  },
}

export const SmallSize: Story = {
  name: "Small Size",
  render: () => <DateRangePickerWrapper value={{ startDate: null, endDate: null }} onChange={() => {}} size="sm" />,
}

export const LargeSize: Story = {
  name: "Large Size",
  render: () => <DateRangePickerWrapper value={{ startDate: null, endDate: null }} onChange={() => {}} size="lg" />,
}

export const Disabled: Story = {
  render: () => {
    const today = new Date()
    const weekAgo = new Date()
    weekAgo.setDate(today.getDate() - 7)
    return (
      <DateRangePickerWrapper
        value={{ startDate: weekAgo, endDate: today }}
        onChange={() => {}}
        disabled
      />
    )
  },
}

export const WithoutPresets: Story = {
  name: "Without Presets",
  render: () => <DateRangePickerWrapper value={{ startDate: null, endDate: null }} onChange={() => {}} showPresets={false} />,
}

export const WithoutClear: Story = {
  name: "Without Clear Button",
  render: () => {
    const today = new Date()
    const weekAgo = new Date()
    weekAgo.setDate(today.getDate() - 7)
    return (
      <DateRangePickerWrapper
        value={{ startDate: weekAgo, endDate: today }}
        onChange={() => {}}
        showClear={false}
      />
    )
  },
}

// =============================================================================
// FISH MARKET CONTEXT
// =============================================================================

export const CatchHistoryFilter: Story = {
  name: "Fish Market: Catch History Filter",
  render: () => (
    <View style={styles.section}>
      <Text size="xs" weight="medium" text="FILTER CATCH HISTORY" style={styles.sectionLabel} />
      <DateRangePickerWrapper
        value={{ startDate: null, endDate: null }}
        onChange={() => {}}
        placeholder="Select date range for catch data"
      />
    </View>
  ),
}

export const AuctionReport: Story = {
  name: "Fish Market: Auction Report",
  render: () => {
    const endOfMonth = new Date()
    const startOfMonth = new Date(endOfMonth.getFullYear(), endOfMonth.getMonth(), 1)
    return (
      <View style={styles.section}>
        <Text size="xs" weight="medium" text="AUCTION REPORT PERIOD" style={styles.sectionLabel} />
        <DateRangePickerWrapper
          value={{ startDate: startOfMonth, endDate: endOfMonth }}
          onChange={() => {}}
          placeholder="Select report period"
        />
      </View>
    )
  },
}

export const OrderFiltering: Story = {
  name: "Fish Market: Order Filtering",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="ORDER SEARCH FILTERS" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <View style={styles.section}>
        <Text size="xxs" text="Order Date" style={styles.sectionLabel} />
        <DateRangePickerWrapper
          value={{ startDate: null, endDate: null }}
          onChange={() => {}}
          placeholder="Filter by order date"
          size="sm"
        />
      </View>
      <View style={styles.section}>
        <Text size="xxs" text="Delivery Date" style={styles.sectionLabel} />
        <DateRangePickerWrapper
          value={{ startDate: null, endDate: null }}
          onChange={() => {}}
          placeholder="Filter by delivery date"
          size="sm"
        />
      </View>
    </View>
  ),
}

// =============================================================================
// SIZE COMPARISON
// =============================================================================

export const SizeComparison: Story = {
  name: "Size Comparison",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="SIZE VARIANTS" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />

      <View style={styles.section}>
        <Text size="xxs" text="Small" style={styles.sectionLabel} />
        <DateRangePickerWrapper
          value={{ startDate: null, endDate: null }}
          onChange={() => {}}
          size="sm"
        />
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Medium (Default)" style={styles.sectionLabel} />
        <DateRangePickerWrapper
          value={{ startDate: null, endDate: null }}
          onChange={() => {}}
          size="md"
        />
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Large" style={styles.sectionLabel} />
        <DateRangePickerWrapper
          value={{ startDate: null, endDate: null }}
          onChange={() => {}}
          size="lg"
        />
      </View>
    </View>
  ),
}

// =============================================================================
// CUSTOM PRESETS
// =============================================================================

export const CustomPresets: Story = {
  name: "Custom Presets",
  render: () => (
    <View style={styles.section}>
      <Text size="xs" weight="medium" text="FISHING SEASON PRESETS" style={styles.sectionLabel} />
      <DateRangePickerWrapper
        value={{ startDate: null, endDate: null }}
        onChange={() => {}}
        presets={[
          {
            key: "morning_catch",
            label: "Morning Catch",
            getValue: () => {
              const today = new Date()
              today.setHours(4, 0, 0, 0)
              const end = new Date(today)
              end.setHours(12, 0, 0, 0)
              return { startDate: today, endDate: end }
            },
          },
          {
            key: "this_season",
            label: "This Season",
            getValue: () => {
              const today = new Date()
              const seasonStart = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1)
              return { startDate: seasonStart, endDate: today }
            },
          },
          {
            key: "peak_season",
            label: "Peak Season",
            getValue: () => {
              const year = new Date().getFullYear()
              return {
                startDate: new Date(year, 5, 1), // June 1
                endDate: new Date(year, 8, 30), // Sep 30
              }
            },
          },
        ]}
      />
    </View>
  ),
}

// =============================================================================
// WITH DATE CONSTRAINTS
// =============================================================================

export const WithDateConstraints: Story = {
  name: "With Date Constraints",
  render: () => {
    const today = new Date()
    const minDate = new Date()
    minDate.setDate(today.getDate() - 30)
    const maxDate = new Date()
    maxDate.setDate(today.getDate() + 7)

    return (
      <View style={styles.section}>
        <Text size="xs" weight="medium" text="CONSTRAINED DATES (Last 30 days to +7 days)" style={styles.sectionLabel} />
        <DateRangePickerWrapper
          value={{ startDate: null, endDate: null }}
          onChange={() => {}}
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Select within allowed range"
        />
      </View>
    )
  },
}

// =============================================================================
// COMPLETE SHOWCASE
// =============================================================================

export const CompleteShowcase: Story = {
  name: "Complete DateRangePicker Showcase",
  render: () => {
    const today = new Date()
    const weekAgo = new Date()
    weekAgo.setDate(today.getDate() - 7)

    return (
      <View style={styles.grid}>
        {/* Empty State */}
        <View style={styles.showcaseCard}>
          <Text size="xs" weight="medium" text="EMPTY STATE" style={styles.sectionLabel} />
          <View style={styles.showcaseDivider} />
          <DateRangePickerWrapper
            value={{ startDate: null, endDate: null }}
            onChange={() => {}}
          />
        </View>

        {/* With Selection */}
        <View style={styles.showcaseCard}>
          <Text size="xs" weight="medium" text="WITH SELECTION" style={styles.sectionLabel} />
          <View style={styles.showcaseDivider} />
          <DateRangePickerWrapper
            value={{ startDate: weekAgo, endDate: today }}
            onChange={() => {}}
          />
        </View>

        {/* All Sizes */}
        <View style={styles.showcaseCard}>
          <Text size="xs" weight="medium" text="ALL SIZES" style={styles.sectionLabel} />
          <View style={styles.showcaseDivider} />
          <View style={styles.section}>
            <DateRangePickerWrapper
              value={{ startDate: weekAgo, endDate: today }}
              onChange={() => {}}
              size="sm"
            />
            <DateRangePickerWrapper
              value={{ startDate: weekAgo, endDate: today }}
              onChange={() => {}}
              size="md"
            />
            <DateRangePickerWrapper
              value={{ startDate: weekAgo, endDate: today }}
              onChange={() => {}}
              size="lg"
            />
          </View>
        </View>

        {/* Disabled */}
        <View style={styles.showcaseCard}>
          <Text size="xs" weight="medium" text="DISABLED STATE" style={styles.sectionLabel} />
          <View style={styles.showcaseDivider} />
          <DateRangePickerWrapper
            value={{ startDate: weekAgo, endDate: today }}
            onChange={() => {}}
            disabled
          />
        </View>
      </View>
    )
  },
}
