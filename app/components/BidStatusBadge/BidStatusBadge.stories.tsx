import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { BidStatusBadge } from "./BidStatusBadge"
import { Card } from "../Card"
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
  auctionCard: {
    padding: 16,
    gap: 12,
  },
  auctionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  auctionInfo: {
    flex: 1,
    gap: 4,
  },
  auctionBadges: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  multipleBadges: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
})

/**
 * BidStatusBadge Stories
 *
 * Bid status indicators for the auction system in the tsuriai fishing app.
 * Uses the seaside color palette to show different bid states.
 *
 * Design principles:
 * - Clear status communication for auction bids
 * - Color-coded states using seaside palette
 * - Multiple size options for different UI contexts
 * - Optional icons for enhanced clarity
 */
const meta = {
  title: "Business/BidStatusBadge",
  component: BidStatusBadge,
  argTypes: {
    status: {
      control: "select",
      options: ["pending", "won", "outbid", "expired", "cancelled"],
      description: "Bid status variant affecting color and behavior",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show status icon",
    },
    text: {
      control: "text",
      description: "Badge label text (defaults to status name)",
    },
  },
  args: {
    status: "pending",
    size: "md",
    showIcon: false,
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof BidStatusBadge>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    status: "pending",
  },
}

// =============================================================================
// STATUS VARIANTS
// =============================================================================

export const Pending: Story = {
  name: "Status: Pending",
  args: {
    status: "pending",
    text: "Pending",
  },
}

export const Won: Story = {
  name: "Status: Won",
  args: {
    status: "won",
    text: "Won",
  },
}

export const Outbid: Story = {
  name: "Status: Outbid",
  args: {
    status: "outbid",
    text: "Outbid",
  },
}

export const Expired: Story = {
  name: "Status: Expired",
  args: {
    status: "expired",
    text: "Expired",
  },
}

export const Cancelled: Story = {
  name: "Status: Cancelled",
  args: {
    status: "cancelled",
    text: "Cancelled",
  },
}

// =============================================================================
// ALL STATUSES
// =============================================================================

export const AllStatuses: Story = {
  name: "All Bid Statuses",
  render: () => (
    <View style={styles.badgeRow}>
      <BidStatusBadge status="pending" />
      <BidStatusBadge status="won" />
      <BidStatusBadge status="outbid" />
      <BidStatusBadge status="expired" />
      <BidStatusBadge status="cancelled" />
    </View>
  ),
}

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithIcons: Story = {
  name: "All Statuses With Icons",
  render: () => (
    <View style={styles.badgeRow}>
      <BidStatusBadge status="pending" showIcon />
      <BidStatusBadge status="won" showIcon />
      <BidStatusBadge status="outbid" showIcon />
      <BidStatusBadge status="expired" showIcon />
      <BidStatusBadge status="cancelled" showIcon />
    </View>
  ),
}

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const Sizes: Story = {
  name: "All Sizes",
  render: () => (
    <View style={styles.section}>
      <View style={styles.badgeRow}>
        <BidStatusBadge status="won" size="sm" text="Small" />
        <BidStatusBadge status="won" size="md" text="Medium" />
        <BidStatusBadge status="won" size="lg" text="Large" />
      </View>
    </View>
  ),
}

export const SizesWithIcons: Story = {
  name: "All Sizes With Icons",
  render: () => (
    <View style={styles.section}>
      <View style={styles.badgeRow}>
        <BidStatusBadge status="won" size="sm" showIcon />
        <BidStatusBadge status="won" size="md" showIcon />
        <BidStatusBadge status="won" size="lg" showIcon />
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
          <BidStatusBadge status="pending" size="sm" />
          <BidStatusBadge status="won" size="sm" />
          <BidStatusBadge status="outbid" size="sm" />
          <BidStatusBadge status="expired" size="sm" />
          <BidStatusBadge status="cancelled" size="sm" />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Medium" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <BidStatusBadge status="pending" size="md" />
          <BidStatusBadge status="won" size="md" />
          <BidStatusBadge status="outbid" size="md" />
          <BidStatusBadge status="expired" size="md" />
          <BidStatusBadge status="cancelled" size="md" />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="Large" style={styles.sectionLabel} />
        <View style={styles.gridRow}>
          <BidStatusBadge status="pending" size="lg" />
          <BidStatusBadge status="won" size="lg" />
          <BidStatusBadge status="outbid" size="lg" />
          <BidStatusBadge status="expired" size="lg" />
          <BidStatusBadge status="cancelled" size="lg" />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// IN AUCTION CARD CONTEXT
// =============================================================================

export const InAuctionCard: Story = {
  name: "In Auction Card Context",
  render: () => (
    <View style={styles.grid}>
      <Card preset="default" style={styles.auctionCard}>
        <View style={styles.auctionHeader}>
          <View style={styles.auctionInfo}>
            <Text size="md" weight="bold" text="Premium Yellowfin Tuna" />
            <Text size="xs" style={{ color: colors.palette.sand600 }} text="25 lbs, Fresh Catch" />
          </View>
          <BidStatusBadge status="won" showIcon />
        </View>
        <View style={styles.auctionBadges}>
          <Text size="sm" weight="medium" text="Your bid: $125" />
        </View>
      </Card>

      <Card preset="default" style={styles.auctionCard}>
        <View style={styles.auctionHeader}>
          <View style={styles.auctionInfo}>
            <Text size="md" weight="bold" text="Wild Salmon Fillet" />
            <Text size="xs" style={{ color: colors.palette.sand600 }} text="15 lbs, Wild Caught" />
          </View>
          <BidStatusBadge status="outbid" showIcon />
        </View>
        <View style={styles.auctionBadges}>
          <Text size="sm" text="Your bid: $85" style={{ color: colors.palette.sand600 }} />
          <Text size="sm" weight="medium" text="Current: $92" />
        </View>
      </Card>

      <Card preset="default" style={styles.auctionCard}>
        <View style={styles.auctionHeader}>
          <View style={styles.auctionInfo}>
            <Text size="md" weight="bold" text="Swordfish Steak" />
            <Text size="xs" style={{ color: colors.palette.sand600 }} text="10 lbs, Premium" />
          </View>
          <BidStatusBadge status="pending" showIcon />
        </View>
        <View style={styles.auctionBadges}>
          <Text size="sm" text="Your bid: $110" />
          <Text size="xs" style={{ color: colors.palette.sunset500 }} text="Ends in 2h 15m" />
        </View>
      </Card>

      <Card preset="default" style={styles.auctionCard}>
        <View style={styles.auctionHeader}>
          <View style={styles.auctionInfo}>
            <Text size="md" weight="bold" text="Mahi Mahi Fillet" />
            <Text size="xs" style={{ color: colors.palette.sand600 }} text="12 lbs, Fresh" />
          </View>
          <BidStatusBadge status="expired" size="sm" />
        </View>
        <View style={styles.auctionBadges}>
          <Text size="sm" style={{ color: colors.palette.sand600 }} text="Your bid: $75 (not met)" />
        </View>
      </Card>
    </View>
  ),
}

// =============================================================================
// MULTIPLE BADGES TOGETHER
// =============================================================================

export const MultipleBadgesTogether: Story = {
  name: "Multiple Badges Together",
  render: () => (
    <View style={styles.grid}>
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="MY BIDS OVERVIEW" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.multipleBadges}>
          <BidStatusBadge status="won" size="sm" text="3 Won" showIcon />
          <BidStatusBadge status="pending" size="sm" text="5 Pending" />
          <BidStatusBadge status="outbid" size="sm" text="2 Outbid" showIcon />
          <BidStatusBadge status="expired" size="sm" text="1 Expired" />
        </View>
      </View>

      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="AUCTION FILTERS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.multipleBadges}>
          <BidStatusBadge status="pending" size="md" />
          <BidStatusBadge status="won" size="md" />
          <BidStatusBadge status="outbid" size="md" />
          <BidStatusBadge status="expired" size="md" />
          <BidStatusBadge status="cancelled" size="md" />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// COMPLETE SHOWCASE
// =============================================================================

export const CompleteShowcase: Story = {
  name: "Complete Showcase",
  render: () => (
    <View style={styles.grid}>
      {/* All Statuses */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="BID STATUS BADGES" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.gridRow}>
          <BidStatusBadge status="pending" showIcon />
          <BidStatusBadge status="won" showIcon />
          <BidStatusBadge status="outbid" showIcon />
          <BidStatusBadge status="expired" />
          <BidStatusBadge status="cancelled" />
        </View>
      </View>

      {/* Size Variants */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="SIZE VARIANTS (WON)" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.gridRow}>
          <BidStatusBadge status="won" size="sm" showIcon />
          <BidStatusBadge status="won" size="md" showIcon />
          <BidStatusBadge status="won" size="lg" showIcon />
        </View>
      </View>

      {/* With and Without Icons */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="WITH/WITHOUT ICONS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.section}>
          <View style={styles.gridRow}>
            <BidStatusBadge status="won" showIcon />
            <BidStatusBadge status="outbid" showIcon />
            <BidStatusBadge status="pending" showIcon />
          </View>
          <View style={styles.gridRow}>
            <BidStatusBadge status="won" />
            <BidStatusBadge status="outbid" />
            <BidStatusBadge status="pending" />
          </View>
        </View>
      </View>

      {/* Real-world Example */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="AUCTION LISTING EXAMPLE" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <Card preset="default" style={styles.auctionCard}>
          <View style={styles.auctionHeader}>
            <View style={styles.auctionInfo}>
              <Text size="md" weight="bold" text="King Salmon" />
              <Text size="xs" style={{ color: colors.palette.sand600 }} text="20 lbs, Premium Wild" />
            </View>
            <BidStatusBadge status="won" size="md" showIcon />
          </View>
          <View style={styles.auctionBadges}>
            <Text size="sm" weight="medium" text="Winning bid: $145" />
            <Text size="xs" style={{ color: colors.palette.seafoam500 }} text="Congratulations!" />
          </View>
        </Card>
      </View>
    </View>
  ),
}
