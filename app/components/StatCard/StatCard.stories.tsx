import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { StatCard } from "./StatCard"
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
  gridRow: {
    flexDirection: "row",
    gap: 12,
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
  statCard: {
    flex: 1,
  },
})

/**
 * StatCard Stories
 *
 * Display key metrics for the tsuriai fishing app.
 * Shows prices, quantities, and percentage changes with trend indicators.
 *
 * Design principles:
 * - Clear hierarchy: label → value → trend
 * - Seaside colors for trends (seafoam/coral/sand)
 * - Compact and expanded variants for different contexts
 * - Support for currency, percentage, and number formatting
 */
const meta = {
  title: "Core/StatCard",
  component: StatCard,
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the statistic",
    },
    value: {
      control: "text",
      description: "The main value to display",
    },
    trend: {
      control: "select",
      options: ["up", "down", "neutral", undefined],
      description: "Trend direction",
    },
    trendValue: {
      control: "text",
      description: "Trend value text (e.g., '+5.2%')",
    },
    variant: {
      control: "select",
      options: ["compact", "expanded"],
      description: "Display variant",
    },
    icon: {
      control: "select",
      options: ["check", "view", "heart", "bell", undefined],
      description: "Optional icon",
    },
  },
  args: {
    label: "Metric",
    value: "$1,234",
    variant: "compact",
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof StatCard>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    label: "Total Sales",
    value: "$12,450",
  },
}

export const WithPositiveTrend: Story = {
  name: "With Positive Trend",
  args: {
    label: "Revenue",
    value: "$24,892",
    trend: "up",
    trendValue: "+15.3%",
  },
}

export const WithNegativeTrend: Story = {
  name: "With Negative Trend",
  args: {
    label: "Inventory",
    value: "247 lbs",
    trend: "down",
    trendValue: "-8.1%",
  },
}

export const WithNeutralTrend: Story = {
  name: "With Neutral Trend",
  args: {
    label: "Orders",
    value: "42",
    trend: "neutral",
    trendValue: "0.0%",
  },
}

export const CompactVariant: Story = {
  name: "Compact Variant",
  args: {
    label: "Price per lb",
    value: "$18.75",
    trend: "up",
    trendValue: "+5.2%",
    variant: "compact",
  },
}

export const ExpandedVariant: Story = {
  name: "Expanded Variant",
  args: {
    label: "Total Catch",
    value: "1,247 lbs",
    trend: "up",
    trendValue: "+12.4%",
    variant: "expanded",
  },
}

export const WithIcon: Story = {
  name: "With Icon",
  args: {
    label: "Premium Sales",
    value: "$8,920",
    trend: "up",
    trendValue: "+22.5%",
    icon: "check",
  },
}

// =============================================================================
// FISH MARKET CONTEXT
// =============================================================================

export const FishMarketPricing: Story = {
  name: "Fish Market: Pricing",
  render: () => (
    <View style={styles.section}>
      <View style={styles.gridRow}>
        <StatCard
          label="Tuna"
          value="$24.50/lb"
          trend="up"
          trendValue="+8.3%"
          style={styles.statCard}
        />
        <StatCard
          label="Salmon"
          value="$18.75/lb"
          trend="down"
          trendValue="-3.2%"
          style={styles.statCard}
        />
      </View>
      <View style={styles.gridRow}>
        <StatCard
          label="Halibut"
          value="$32.00/lb"
          trend="neutral"
          trendValue="0.0%"
          style={styles.statCard}
        />
        <StatCard
          label="Cod"
          value="$15.25/lb"
          trend="up"
          trendValue="+12.5%"
          style={styles.statCard}
        />
      </View>
    </View>
  ),
}

export const InventoryCount: Story = {
  name: "Fish Market: Inventory",
  render: () => (
    <View style={styles.section}>
      <View style={styles.gridRow}>
        <StatCard
          label="Fresh Catch"
          value="847 lbs"
          trend="up"
          trendValue="+15%"
          icon="check"
          style={styles.statCard}
        />
        <StatCard
          label="Reserved"
          value="124 lbs"
          trend="neutral"
          icon="view"
          style={styles.statCard}
        />
      </View>
    </View>
  ),
}

export const AuctionMetrics: Story = {
  name: "Fish Market: Auction Stats",
  render: () => (
    <View style={styles.section}>
      <View style={styles.gridRow}>
        <StatCard
          label="Active Bids"
          value="23"
          trend="up"
          trendValue="+5"
          style={styles.statCard}
        />
        <StatCard
          label="Avg Price"
          value="$21.40/lb"
          trend="up"
          trendValue="+6.8%"
          style={styles.statCard}
        />
      </View>
      <View style={styles.gridRow}>
        <StatCard
          label="Time Left"
          value="2h 15m"
          trend="down"
          style={styles.statCard}
        />
        <StatCard
          label="Participants"
          value="47"
          trend="up"
          trendValue="+12"
          style={styles.statCard}
        />
      </View>
    </View>
  ),
}

export const DailySummary: Story = {
  name: "Fish Market: Daily Summary",
  render: () => (
    <View style={styles.section}>
      <Text size="xs" weight="medium" text="TODAY'S STATS" style={styles.sectionLabel} />
      <View style={styles.gridRow}>
        <StatCard
          label="Total Sales"
          value="$12,847"
          trend="up"
          trendValue="+18.5%"
          variant="expanded"
          style={styles.statCard}
        />
      </View>
      <View style={styles.gridRow}>
        <StatCard
          label="Orders"
          value="42"
          trend="up"
          trendValue="+15"
          style={styles.statCard}
        />
        <StatCard
          label="Avg Order"
          value="$306"
          trend="up"
          trendValue="+3.2%"
          style={styles.statCard}
        />
      </View>
      <View style={styles.gridRow}>
        <StatCard
          label="Weight Sold"
          value="847 lbs"
          trend="up"
          trendValue="+12%"
          style={styles.statCard}
        />
        <StatCard
          label="Customers"
          value="38"
          trend="neutral"
          trendValue="±0"
          style={styles.statCard}
        />
      </View>
    </View>
  ),
}

// =============================================================================
// VARIANT COMPARISON
// =============================================================================

export const VariantComparison: Story = {
  name: "Variant Comparison",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="VARIANT COMPARISON" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />

      <View style={styles.section}>
        <Text size="xxs" text="Compact" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <StatCard
            label="Price"
            value="$24.50"
            trend="up"
            trendValue="+8%"
            variant="compact"
            style={styles.statCard}
          />
          <StatCard
            label="Stock"
            value="247 lbs"
            trend="down"
            trendValue="-5%"
            variant="compact"
            style={styles.statCard}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Expanded" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <StatCard
            label="Revenue"
            value="$12.4K"
            trend="up"
            trendValue="+15%"
            variant="expanded"
            style={styles.statCard}
          />
          <StatCard
            label="Orders"
            value="89"
            trend="up"
            trendValue="+12"
            variant="expanded"
            style={styles.statCard}
          />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// TREND COMPARISON
// =============================================================================

export const TrendComparison: Story = {
  name: "Trend Comparison",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="TREND INDICATORS" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />

      <View style={styles.section}>
        <Text size="xxs" text="Positive Trend (Seafoam)" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <StatCard
            label="Sales"
            value="$8,920"
            trend="up"
            trendValue="+22.5%"
            style={styles.statCard}
          />
          <StatCard
            label="Customers"
            value="156"
            trend="up"
            trendValue="+15"
            style={styles.statCard}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Negative Trend (Coral)" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <StatCard
            label="Inventory"
            value="247 lbs"
            trend="down"
            trendValue="-8.1%"
            style={styles.statCard}
          />
          <StatCard
            label="Time Left"
            value="1h 30m"
            trend="down"
            trendValue="-50%"
            style={styles.statCard}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Neutral Trend (Sand)" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <StatCard
            label="Orders"
            value="42"
            trend="neutral"
            trendValue="0.0%"
            style={styles.statCard}
          />
          <StatCard
            label="Price"
            value="$18.50"
            trend="neutral"
            trendValue="±0"
            style={styles.statCard}
          />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <View style={styles.section}>
      <View style={styles.gridRow}>
        <StatCard
          label="Verified"
          value="$12,450"
          trend="up"
          trendValue="+15%"
          icon="check"
          style={styles.statCard}
        />
        <StatCard
          label="Viewed"
          value="847"
          trend="up"
          trendValue="+22"
          icon="view"
          style={styles.statCard}
        />
      </View>
      <View style={styles.gridRow}>
        <StatCard
          label="Premium"
          value="$8,920"
          trend="up"
          trendValue="+18%"
          icon="heart"
          style={styles.statCard}
        />
        <StatCard
          label="Alerts"
          value="5"
          trend="neutral"
          icon="bell"
          style={styles.statCard}
        />
      </View>
    </View>
  ),
}

// =============================================================================
// NUMBER FORMATTING
// =============================================================================

export const NumberFormatting: Story = {
  name: "Number Formatting",
  render: () => (
    <View style={styles.section}>
      <Text size="xs" weight="medium" text="FORMAT EXAMPLES" style={styles.sectionLabel} />
      <View style={styles.gridRow}>
        <StatCard
          label="Currency"
          value="$24,892.50"
          trend="up"
          trendValue="+15%"
          style={styles.statCard}
        />
        <StatCard
          label="Percentage"
          value="87.5%"
          trend="up"
          trendValue="+5.2%"
          style={styles.statCard}
        />
      </View>
      <View style={styles.gridRow}>
        <StatCard
          label="Weight"
          value="1,247 lbs"
          trend="down"
          trendValue="-8%"
          style={styles.statCard}
        />
        <StatCard
          label="Count"
          value={42}
          trend="up"
          trendValue="+12"
          style={styles.statCard}
        />
      </View>
    </View>
  ),
}

// =============================================================================
// COMPLETE SHOWCASE
// =============================================================================

export const CompleteShowcase: Story = {
  name: "Complete StatCard Showcase",
  render: () => (
    <View style={styles.grid}>
      {/* Basic Stats */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="BASIC STATS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.gridRow}>
          <StatCard label="Sales" value="$12,450" style={styles.statCard} />
          <StatCard label="Orders" value="42" style={styles.statCard} />
        </View>
      </View>

      {/* With Trends */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="WITH TRENDS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.gridRow}>
          <StatCard
            label="Revenue"
            value="$24,892"
            trend="up"
            trendValue="+15.3%"
            style={styles.statCard}
          />
          <StatCard
            label="Inventory"
            value="247 lbs"
            trend="down"
            trendValue="-8.1%"
            style={styles.statCard}
          />
        </View>
      </View>

      {/* Expanded Variant */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="EXPANDED VARIANT" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <StatCard
          label="Total Catch Today"
          value="1,247 lbs"
          trend="up"
          trendValue="+12.4%"
          variant="expanded"
          icon="check"
        />
      </View>

      {/* With Icons */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="WITH ICONS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.gridRow}>
          <StatCard
            label="Premium"
            value="$8,920"
            trend="up"
            trendValue="+22%"
            icon="heart"
            style={styles.statCard}
          />
          <StatCard
            label="Verified"
            value="156"
            trend="up"
            trendValue="+15"
            icon="check"
            style={styles.statCard}
          />
        </View>
      </View>
    </View>
  ),
}
