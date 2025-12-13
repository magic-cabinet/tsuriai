import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Badge } from "./Badge"
import { Icon } from "../Icon"
import { Text } from "../Text"
import { colors } from "../../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
  },
  badgeWithIcon: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
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
    flexWrap: "wrap",
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
})

/**
 * Badge Stories
 *
 * Status indicators, counts, and labels for the tsuriai fishing app.
 * Uses the seaside color palette for different states.
 *
 * Design principles:
 * - Clear status communication through color
 * - Multiple size options for different contexts
 * - Three style variants: solid, outline, and subtle
 * - Support for text labels and numeric counts
 */
const meta = {
  title: "Core/Badge",
  component: Badge,
  argTypes: {
    status: {
      control: "select",
      options: ["success", "warning", "error", "info", "neutral"],
      description: "Status variant affecting color scheme",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    badgeStyle: {
      control: "select",
      options: ["solid", "outline", "subtle"],
      description: "Style variant",
    },
    text: {
      control: "text",
      description: "Badge label text",
    },
    count: {
      control: "number",
      description: "Numeric count to display",
    },
  },
  args: {
    text: "Label",
    status: "neutral",
    size: "md",
    badgeStyle: "solid",
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    text: "Default",
  },
}

// =============================================================================
// STATUS VARIANTS
// =============================================================================

export const Success: Story = {
  args: {
    text: "Fresh Catch",
    status: "success",
  },
}

export const Warning: Story = {
  args: {
    text: "Expiring Soon",
    status: "warning",
  },
}

export const Error: Story = {
  args: {
    text: "Sold Out",
    status: "error",
  },
}

export const Info: Story = {
  args: {
    text: "Premium",
    status: "info",
  },
}

export const Neutral: Story = {
  args: {
    text: "Standard",
    status: "neutral",
  },
}

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const Sizes: Story = {
  name: "All Sizes",
  render: () => (
    <View style={styles.badgeRow}>
      <Badge text="Small" size="sm" status="info" />
      <Badge text="Medium" size="md" status="info" />
      <Badge text="Large" size="lg" status="info" />
    </View>
  ),
}

// =============================================================================
// STYLE VARIANTS
// =============================================================================

export const Solid: Story = {
  name: "Style: Solid",
  render: () => (
    <View style={styles.badgeRow}>
      <Badge text="Success" status="success" badgeStyle="solid" />
      <Badge text="Warning" status="warning" badgeStyle="solid" />
      <Badge text="Error" status="error" badgeStyle="solid" />
      <Badge text="Info" status="info" badgeStyle="solid" />
      <Badge text="Neutral" status="neutral" badgeStyle="solid" />
    </View>
  ),
}

export const Outline: Story = {
  name: "Style: Outline",
  render: () => (
    <View style={styles.badgeRow}>
      <Badge text="Success" status="success" badgeStyle="outline" />
      <Badge text="Warning" status="warning" badgeStyle="outline" />
      <Badge text="Error" status="error" badgeStyle="outline" />
      <Badge text="Info" status="info" badgeStyle="outline" />
      <Badge text="Neutral" status="neutral" badgeStyle="outline" />
    </View>
  ),
}

export const Subtle: Story = {
  name: "Style: Subtle",
  render: () => (
    <View style={styles.badgeRow}>
      <Badge text="Success" status="success" badgeStyle="subtle" />
      <Badge text="Warning" status="warning" badgeStyle="subtle" />
      <Badge text="Error" status="error" badgeStyle="subtle" />
      <Badge text="Info" status="info" badgeStyle="subtle" />
      <Badge text="Neutral" status="neutral" badgeStyle="subtle" />
    </View>
  ),
}

// =============================================================================
// COUNT BADGES
// =============================================================================

export const WithCount: Story = {
  name: "With Count Number",
  render: () => (
    <View style={styles.badgeRow}>
      <Badge count={5} status="info" size="sm" />
      <Badge count={12} status="success" size="md" />
      <Badge count={99} status="warning" size="lg" />
      <Badge count={100} status="error" />
    </View>
  ),
}

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithIcon: Story = {
  name: "With Icon (Custom Layout)",
  render: () => (
    <View style={styles.badgeRow}>
      <Badge status="success" badgeStyle="solid" size="md">
        <View style={styles.badgeWithIcon}>
          <Icon icon="check" size={12} color={colors.palette.sand900} />
          <Text text="Verified" size="xxs" style={{ color: colors.palette.sand900 }} />
        </View>
      </Badge>
      <Badge status="info" badgeStyle="outline" size="md">
        <View style={styles.badgeWithIcon}>
          <Icon icon="view" size={12} color={colors.palette.ocean500} />
          <Text text="Premium" size="xxs" style={{ color: colors.palette.ocean500 }} />
        </View>
      </Badge>
      <Badge status="error" badgeStyle="subtle" size="lg">
        <View style={styles.badgeWithIcon}>
          <Icon icon="x" size={14} color={colors.palette.coral500} />
          <Text text="Unavailable" size="xs" style={{ color: colors.palette.coral500 }} />
        </View>
      </Badge>
    </View>
  ),
}

// =============================================================================
// FISHING APP CONTEXTS
// =============================================================================

export const FishingStatus: Story = {
  name: "Fishing: Status Labels",
  render: () => (
    <View style={styles.section}>
      <View style={styles.badgeRow}>
        <Badge text="Fresh Catch" status="success" badgeStyle="solid" size="md" />
        <Badge text="Premium" status="info" badgeStyle="solid" size="md" />
        <Badge text="Hot Deal" status="error" badgeStyle="solid" size="sm" />
        <Badge text="Limited" status="warning" badgeStyle="outline" size="sm" />
        <Badge text="Standard" status="neutral" badgeStyle="subtle" size="sm" />
      </View>
    </View>
  ),
}

export const AuctionBadges: Story = {
  name: "Auction: Live Status",
  render: () => (
    <View style={styles.section}>
      <View style={styles.badgeRow}>
        <Badge status="success" badgeStyle="solid" size="sm">
          <View style={styles.badgeWithIcon}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.palette.sand900,
                marginRight: 4,
              }}
            />
            <Text text="Live" size="xxs" style={{ color: colors.palette.sand900 }} />
          </View>
        </Badge>
        <Badge text="Ending Soon" status="warning" badgeStyle="solid" size="sm" />
        <Badge text="Sold" status="neutral" badgeStyle="subtle" size="sm" />
        <Badge text="Reserved" status="info" badgeStyle="outline" size="sm" />
      </View>
    </View>
  ),
}

export const ProductBadges: Story = {
  name: "Product: Quality Indicators",
  render: () => (
    <View style={styles.section}>
      <View style={styles.badgeRow}>
        <Badge text="Wild Caught" status="success" badgeStyle="solid" size="md" />
        <Badge text="Sustainable" status="success" badgeStyle="outline" size="md" />
        <Badge text="Farm Raised" status="info" badgeStyle="subtle" size="md" />
        <Badge text="Last 3" status="error" badgeStyle="solid" size="sm" />
      </View>
    </View>
  ),
}

// =============================================================================
// SIZE COMPARISON
// =============================================================================

export const SizeComparison: Story = {
  name: "Size Comparison Grid",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="SIZE VARIANTS" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />

      <View style={styles.section}>
        <Text size="xxs" text="Small" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <Badge text="Success" status="success" size="sm" />
          <Badge text="Warning" status="warning" size="sm" />
          <Badge text="Error" status="error" size="sm" />
          <Badge text="Info" status="info" size="sm" />
          <Badge count={9} status="neutral" size="sm" />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Medium" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <Badge text="Success" status="success" size="md" />
          <Badge text="Warning" status="warning" size="md" />
          <Badge text="Error" status="error" size="md" />
          <Badge text="Info" status="info" size="md" />
          <Badge count={42} status="neutral" size="md" />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Large" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <Badge text="Success" status="success" size="lg" />
          <Badge text="Warning" status="warning" size="lg" />
          <Badge text="Error" status="error" size="lg" />
          <Badge text="Info" status="info" size="lg" />
          <Badge count={128} status="neutral" size="lg" />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// STYLE COMPARISON
// =============================================================================

export const StyleComparison: Story = {
  name: "Style Comparison Grid",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="STYLE VARIANTS" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />

      <View style={styles.section}>
        <Text size="xxs" text="Solid" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <Badge text="Success" status="success" badgeStyle="solid" />
          <Badge text="Warning" status="warning" badgeStyle="solid" />
          <Badge text="Error" status="error" badgeStyle="solid" />
          <Badge text="Info" status="info" badgeStyle="solid" />
          <Badge text="Neutral" status="neutral" badgeStyle="solid" />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Outline" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <Badge text="Success" status="success" badgeStyle="outline" />
          <Badge text="Warning" status="warning" badgeStyle="outline" />
          <Badge text="Error" status="error" badgeStyle="outline" />
          <Badge text="Info" status="info" badgeStyle="outline" />
          <Badge text="Neutral" status="neutral" badgeStyle="outline" />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Subtle" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <Badge text="Success" status="success" badgeStyle="subtle" />
          <Badge text="Warning" status="warning" badgeStyle="subtle" />
          <Badge text="Error" status="error" badgeStyle="subtle" />
          <Badge text="Info" status="info" badgeStyle="subtle" />
          <Badge text="Neutral" status="neutral" badgeStyle="subtle" />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// COMPLETE SHOWCASE
// =============================================================================

export const CompleteShowcase: Story = {
  name: "Complete Badge Showcase",
  render: () => (
    <View style={styles.grid}>
      {/* Status Badges */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="STATUS BADGES" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.gridRow}>
          <Badge text="Fresh" status="success" badgeStyle="solid" />
          <Badge text="Expiring" status="warning" badgeStyle="solid" />
          <Badge text="Sold Out" status="error" badgeStyle="solid" />
          <Badge text="Premium" status="info" badgeStyle="solid" />
          <Badge text="Standard" status="neutral" badgeStyle="solid" />
        </View>
      </View>

      {/* Count Badges */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="NOTIFICATION COUNTS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.gridRow}>
          <Badge count={1} status="error" size="sm" />
          <Badge count={5} status="warning" size="sm" />
          <Badge count={12} status="info" size="md" />
          <Badge count={99} status="success" size="md" />
          <Badge count={999} status="neutral" size="lg" />
        </View>
      </View>

      {/* Mixed Styles */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="MIXED STYLES" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.section}>
          <View style={styles.gridRow}>
            <Badge text="Solid" status="success" badgeStyle="solid" size="sm" />
            <Badge text="Outline" status="info" badgeStyle="outline" size="md" />
            <Badge text="Subtle" status="warning" badgeStyle="subtle" size="lg" />
          </View>
        </View>
      </View>
    </View>
  ),
}
