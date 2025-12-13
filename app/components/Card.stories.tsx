import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Card } from "./Card"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { colors } from "../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  alignmentCard: {
    flex: 1,
    height: 160,
  },
  alignmentGrid: {
    flexDirection: "row",
    gap: 12,
  },
  alignmentShowcase: {
    gap: 16,
  },
  arrowContainer: {
    justifyContent: "center",
    paddingLeft: 8,
  },
  assetBadge: {
    alignItems: "center",
    backgroundColor: colors.palette.badgeTeal,
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  assetImagePlaceholder: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 12,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  assetMetric: {
    gap: 2,
  },
  assetMetrics: {
    flexDirection: "row",
    gap: 24,
    marginTop: 8,
  },
  assetType: {
    color: colors.palette.neutral600,
    marginTop: 2,
  },
  badgeCard: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 12,
    gap: 8,
    minWidth: 80,
    padding: 16,
  },
  badgeCoral: {
    backgroundColor: colors.palette.badgeCoral,
  },
  badgeDescription: {
    color: colors.palette.neutral600,
  },
  badgeGray: {
    backgroundColor: colors.palette.badgeGray,
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  badgeLabel: {
    color: colors.palette.neutral100,
    letterSpacing: 0.5,
  },
  badgeMint: {
    backgroundColor: colors.palette.badgeMint,
  },
  badgeSage: {
    backgroundColor: colors.palette.badgeSage,
  },
  badgeShowcase: {
    gap: 8,
  },
  badgeTeal: {
    backgroundColor: colors.palette.badgeTeal,
  },
  badgeText: {
    color: colors.palette.neutral100,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cardStack: {
    gap: 16,
  },
  categoryTag: {
    color: colors.palette.primary400,
    letterSpacing: 1,
  },
  dashboardContainer: {
    gap: 16,
  },
  dealFooter: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  dealHeader: {
    gap: 2,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    padding: 24,
  },
  featuredBadge: {
    backgroundColor: colors.palette.accent400,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  featuredBadgeText: {
    color: colors.palette.neutral900,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  featuredCard: {
    borderColor: colors.palette.primary400,
    borderWidth: 2,
  },
  featuredHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  featuredHeaderContent: {
    flex: 1,
    gap: 2,
  },
  featuredTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  footerDetail: {
    color: colors.palette.neutral500,
  },
  fundingBar: {
    backgroundColor: colors.palette.neutral300,
    borderRadius: 4,
    height: 8,
    marginTop: 12,
    overflow: "hidden",
  },
  fundingProgress: {
    backgroundColor: colors.palette.primary400,
    borderRadius: 4,
    height: "100%",
    width: "72%",
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.primary400,
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  investmentMetrics: {
    marginTop: 16,
  },
  locationText: {
    color: colors.palette.neutral600,
    marginTop: 2,
  },
  metricHighlight: {
    color: colors.palette.primary400,
  },
  metricLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 0.5,
  },
  metricsColumn: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  positiveValue: {
    color: colors.palette.badgeMint,
  },
  progressLabel: {
    color: colors.palette.neutral600,
    marginTop: 8,
  },
  quickActionCard: {
    alignItems: "center",
    flex: 1,
    gap: 12,
    minHeight: 120,
    paddingVertical: 20,
  },
  quickActionIcon: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  quickActionLabel: {
    color: colors.palette.neutral700,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  returnBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.palette.badgeMint + "20",
    borderRadius: 6,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  returnText: {
    color: colors.palette.badgeMint,
    fontWeight: "600",
  },
  sectionLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  showcaseContainer: {
    gap: 32,
  },
  showcaseDivider: {
    backgroundColor: colors.palette.neutral300,
    height: 1,
    marginVertical: 8,
  },
  statCard: {
    flex: 1,
    minHeight: 100,
  },
  statChange: {
    color: colors.palette.badgeMint,
  },
  statChangeDark: {
    color: colors.palette.neutral600,
  },
  statLabel: {
    color: colors.palette.neutral400,
    letterSpacing: 0.5,
  },
  statLabelDark: {
    color: colors.palette.neutral500,
    letterSpacing: 0.5,
  },
  statValue: {
    color: colors.palette.neutral100,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  summaryCard: {
    borderRadius: 24,
    padding: 24,
  },
  summaryChange: {
    color: colors.palette.badgeMint,
    marginTop: 4,
  },
  summaryHeader: {
    alignItems: "center",
    gap: 4,
  },
  summaryLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1,
  },
  summaryValue: {
    color: colors.palette.neutral900,
    letterSpacing: -1,
  },
  typeBadge: {
    alignItems: "center",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
})

/**
 * Card Stories
 *
 * Premium card components for the Tsuriai fish marketplace.
 * Inspired by Japanese fish market aesthetics and Tsukiji auction energy.
 *
 * Design principles:
 * - Generous padding and rounded corners (20-24px radius)
 * - Clear visual hierarchy with subtle shadows
 * - Asset type badges for quick identification
 * - Progress indicators and metrics prominently displayed
 */
const meta = {
  title: "Core/Card",
  component: Card,
  argTypes: {
    preset: {
      control: "select",
      options: ["default", "reversed"],
      description: "Visual style preset",
    },
    verticalAlignment: {
      control: "select",
      options: ["top", "center", "space-between", "force-footer-bottom"],
      description: "Content vertical alignment",
    },
    heading: {
      control: "text",
      description: "Card heading text",
    },
    content: {
      control: "text",
      description: "Card body content",
    },
    footer: {
      control: "text",
      description: "Card footer text",
    },
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    heading: "Investment Opportunity",
    content: "High-yield real estate investment with projected 18% IRR over 5 years.",
    footer: "Minimum: $25,000",
    preset: "default",
  },
}

export const Reversed: Story = {
  args: {
    heading: "Featured Deal",
    content: "Premium Class A multifamily development in Austin's growth corridor.",
    footer: "Closing Soon",
    preset: "reversed",
  },
}

export const Pressable: Story = {
  args: {
    heading: "View Details",
    content: "Tap to explore this investment opportunity.",
    onPress: () => console.log("Card pressed"),
  },
}

// =============================================================================
// PORTFOLIO SUMMARY (Wealthsimple inspired)
// =============================================================================

export const PortfolioSummary: Story = {
  name: "Portfolio: Summary",
  render: () => (
    <Card preset="default" style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text size="xs" weight="medium" text="TOTAL PORTFOLIO VALUE" style={styles.summaryLabel} />
        <Text preset="heading" size="xxl" text="$247,892.45" style={styles.summaryValue} />
        <Text
          size="sm"
          weight="semiBold"
          text="+$12,456.78 (+5.29%)"
          style={styles.summaryChange}
        />
      </View>
      <View style={styles.showcaseDivider} />
      <View style={styles.statsRow}>
        <View style={styles.assetMetric}>
          <Text size="xxs" text="INVESTMENTS" style={styles.metricLabel} />
          <Text weight="bold" text="8" />
        </View>
        <View style={styles.assetMetric}>
          <Text size="xxs" text="DISTRIBUTIONS" style={styles.metricLabel} />
          <Text weight="bold" text="$18,450" />
        </View>
        <View style={styles.assetMetric}>
          <Text size="xxs" text="AVG. IRR" style={styles.metricLabel} />
          <Text weight="bold" text="14.2%" style={styles.positiveValue} />
        </View>
      </View>
    </Card>
  ),
}

// =============================================================================
// INVESTMENT OPPORTUNITY (Public inspired)
// =============================================================================

export const FeaturedOpportunity: Story = {
  name: "Investment: Featured",
  render: () => (
    <Card
      preset="default"
      style={styles.featuredCard}
      onPress={() => console.log("View deal")}
      HeadingComponent={
        <View style={styles.featuredHeader}>
          <View style={styles.assetBadge}>
            <Text size="xxs" weight="bold" text="AVX" style={styles.badgeText} />
          </View>
          <View style={styles.featuredHeaderContent}>
            <View style={styles.featuredTitleRow}>
              <Text weight="bold" size="md" text="Sunset Tower" />
              <View style={styles.featuredBadge}>
                <Text size="xxs" text="FEATURED" style={styles.featuredBadgeText} />
              </View>
            </View>
            <Text size="xs" text="Class A Multifamily · Austin, TX" style={styles.locationText} />
          </View>
        </View>
      }
      ContentComponent={
        <View style={styles.investmentMetrics}>
          <View style={styles.statsRow}>
            <View style={styles.assetMetric}>
              <Text size="xxs" text="TARGET IRR" style={styles.metricLabel} />
              <Text weight="bold" size="lg" text="18.5%" style={styles.metricHighlight} />
            </View>
            <View style={styles.assetMetric}>
              <Text size="xxs" text="HOLD PERIOD" style={styles.metricLabel} />
              <Text weight="bold" size="lg" text="5 yrs" />
            </View>
            <View style={styles.assetMetric}>
              <Text size="xxs" text="MINIMUM" style={styles.metricLabel} />
              <Text weight="bold" size="lg" text="$50K" />
            </View>
          </View>
          <View style={styles.fundingBar}>
            <View style={styles.fundingProgress} />
          </View>
          <Text size="xs" text="72% funded · $3.6M remaining" style={styles.progressLabel} />
        </View>
      }
    />
  ),
}

export const InvestmentOpportunity: Story = {
  name: "Investment: Standard",
  render: () => (
    <Card
      preset="default"
      onPress={() => console.log("View deal")}
      LeftComponent={
        <View style={styles.assetBadge}>
          <Text size="xxs" text="JV1" style={styles.badgeText} />
        </View>
      }
      RightComponent={
        <View style={styles.metricsColumn}>
          <Text size="xxs" text="TARGET IRR" style={styles.metricLabel} />
          <Text weight="bold" size="lg" text="22.0%" style={styles.metricHighlight} />
        </View>
      }
      HeadingComponent={
        <View style={styles.dealHeader}>
          <Text size="xxs" text="JOINT VENTURE" style={styles.categoryTag} />
          <Text weight="bold" size="md" text="Marina Bay Development" />
        </View>
      }
      ContentComponent={
        <Text size="xs" text="Mixed-Use · San Diego, CA" style={styles.locationText} />
      }
      FooterComponent={
        <View style={styles.dealFooter}>
          <Text size="xxs" text="Min: $100,000" style={styles.footerDetail} />
          <Text size="xxs" text="Closing: Jan 15" style={styles.footerDetail} />
        </View>
      }
    />
  ),
}

// =============================================================================
// PORTFOLIO ASSET
// =============================================================================

export const PortfolioAsset: Story = {
  name: "Portfolio: Asset",
  render: () => (
    <Card
      preset="default"
      onPress={() => console.log("View asset")}
      LeftComponent={
        <View style={styles.assetImagePlaceholder}>
          <Icon icon="components" size={32} color={colors.palette.neutral500} />
        </View>
      }
      RightComponent={
        <View style={styles.arrowContainer}>
          <Icon icon="caretRight" size={20} color={colors.palette.neutral400} />
        </View>
      }
      HeadingComponent={
        <View>
          <Text weight="semiBold" text="Riverside Commons" />
          <Text size="xs" text="Mixed-Use Development" style={styles.assetType} />
        </View>
      }
      ContentComponent={
        <View style={styles.assetMetrics}>
          <View style={styles.assetMetric}>
            <Text size="xxs" text="YOUR INVESTMENT" style={styles.metricLabel} />
            <Text weight="semiBold" text="$75,000" />
          </View>
          <View style={styles.assetMetric}>
            <Text size="xxs" text="CURRENT VALUE" style={styles.metricLabel} />
            <Text weight="semiBold" text="$89,250" style={styles.positiveValue} />
          </View>
        </View>
      }
      FooterComponent={
        <View style={styles.returnBadge}>
          <Text size="xs" text="+19.0% Return" style={styles.returnText} />
        </View>
      }
    />
  ),
}

// =============================================================================
// QUICK ACTIONS (Cash App inspired)
// =============================================================================

export const QuickActions: Story = {
  name: "Quick Actions",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text size="xs" weight="medium" text="QUICK ACTIONS" style={styles.sectionLabel} />
      <View style={styles.quickActionsRow}>
        <Card preset="default" style={styles.quickActionCard} onPress={() => {}}>
          <View style={styles.quickActionIcon}>
            <Icon icon="components" size={24} color={colors.palette.primary400} />
          </View>
          <Text weight="medium" text="Invest" style={styles.quickActionLabel} />
        </Card>
        <Card preset="default" style={styles.quickActionCard} onPress={() => {}}>
          <View style={styles.quickActionIcon}>
            <Icon icon="caretRight" size={24} color={colors.palette.primary400} />
          </View>
          <Text weight="medium" text="Transfer" style={styles.quickActionLabel} />
        </Card>
        <Card preset="default" style={styles.quickActionCard} onPress={() => {}}>
          <View style={styles.quickActionIcon}>
            <Icon icon="view" size={24} color={colors.palette.primary400} />
          </View>
          <Text weight="medium" text="Activity" style={styles.quickActionLabel} />
        </Card>
      </View>
    </View>
  ),
}

// =============================================================================
// ASSET TYPE BADGES
// =============================================================================

export const AssetTypeBadges: Story = {
  name: "Asset Type Badges",
  render: () => (
    <View style={styles.badgeShowcase}>
      <Text size="xs" weight="medium" text="ASSET CATEGORIES" style={styles.sectionLabel} />
      <View style={styles.badgeGrid}>
        <View style={styles.badgeCard}>
          <View style={[styles.typeBadge, styles.badgeTeal]}>
            <Text size="xxs" weight="semiBold" text="AVX" style={styles.badgeLabel} />
          </View>
          <Text size="xs" text="Concept" style={styles.badgeDescription} />
        </View>
        <View style={styles.badgeCard}>
          <View style={[styles.typeBadge, styles.badgeGray]}>
            <Text size="xxs" weight="semiBold" text="IPX" style={styles.badgeLabel} />
          </View>
          <Text size="xs" text="Internal" style={styles.badgeDescription} />
        </View>
        <View style={styles.badgeCard}>
          <View style={[styles.typeBadge, styles.badgeSage]}>
            <Text size="xxs" weight="semiBold" text="IPL" style={styles.badgeLabel} />
          </View>
          <Text size="xs" text="Legacy" style={styles.badgeDescription} />
        </View>
        <View style={styles.badgeCard}>
          <View style={[styles.typeBadge, styles.badgeCoral]}>
            <Text size="xxs" weight="semiBold" text="IPR" style={styles.badgeLabel} />
          </View>
          <Text size="xs" text="Rehab" style={styles.badgeDescription} />
        </View>
        <View style={styles.badgeCard}>
          <View style={[styles.typeBadge, styles.badgeMint]}>
            <Text size="xxs" weight="semiBold" text="JV1" style={styles.badgeLabel} />
          </View>
          <Text size="xs" text="Joint Venture" style={styles.badgeDescription} />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// DASHBOARD STATS
// =============================================================================

export const DashboardStats: Story = {
  name: "Dashboard: Stats",
  render: () => (
    <View style={styles.dashboardContainer}>
      <Text size="xs" weight="medium" text="PORTFOLIO OVERVIEW" style={styles.sectionLabel} />
      <View style={styles.statsRow}>
        <Card
          preset="reversed"
          style={styles.statCard}
          HeadingComponent={<Text size="xxs" text="TOTAL VALUE" style={styles.statLabel} />}
          ContentComponent={<Text weight="bold" size="xl" text="$2.45M" style={styles.statValue} />}
          FooterComponent={<Text size="xxs" text="+12.4% YTD" style={styles.statChange} />}
        />
        <Card
          preset="default"
          style={styles.statCard}
          HeadingComponent={<Text size="xxs" text="DISTRIBUTIONS" style={styles.statLabelDark} />}
          ContentComponent={<Text weight="bold" size="xl" text="$89.2K" />}
          FooterComponent={<Text size="xxs" text="This Year" style={styles.statChangeDark} />}
        />
      </View>
    </View>
  ),
}

// =============================================================================
// VERTICAL ALIGNMENT
// =============================================================================

export const VerticalAlignments: Story = {
  name: "Vertical Alignments",
  render: () => (
    <View style={styles.alignmentShowcase}>
      <Text
        size="xs"
        weight="medium"
        text="VERTICAL ALIGNMENT OPTIONS"
        style={styles.sectionLabel}
      />
      <View style={styles.alignmentGrid}>
        <Card
          heading="Top"
          content="Content"
          footer="Footer"
          verticalAlignment="top"
          style={styles.alignmentCard}
        />
        <Card
          heading="Center"
          content="Content"
          footer="Footer"
          verticalAlignment="center"
          style={styles.alignmentCard}
        />
      </View>
      <View style={styles.alignmentGrid}>
        <Card
          heading="Space Between"
          content="Content"
          footer="Footer"
          verticalAlignment="space-between"
          style={styles.alignmentCard}
        />
        <Card
          heading="Footer Bottom"
          content="Content"
          footer="Footer"
          verticalAlignment="force-footer-bottom"
          style={styles.alignmentCard}
        />
      </View>
    </View>
  ),
}

// =============================================================================
// ALL PRESETS SHOWCASE
// =============================================================================

export const AllPresets: Story = {
  name: "All Presets",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text size="xs" weight="medium" text="CARD PRESETS" style={styles.sectionLabel} />
      <View style={styles.cardStack}>
        <Card
          heading="Default Card"
          content="Light background with subtle border and shadow. Used for most content."
          footer="Standard preset"
          preset="default"
        />
        <Card
          heading="Reversed Card"
          content="Dark background for emphasis and featured content."
          footer="Premium content"
          preset="reversed"
        />
      </View>
    </View>
  ),
}

// =============================================================================
// WITH COMPONENTS
// =============================================================================

export const WithLeftIcon: Story = {
  name: "With Left Component",
  render: () => (
    <Card
      heading="Real Estate"
      content="Commercial and residential property investments."
      LeftComponent={
        <View style={styles.iconContainer}>
          <Icon icon="components" size={24} color={colors.palette.neutral100} />
        </View>
      }
    />
  ),
}

export const WithRightArrow: Story = {
  name: "With Right Component",
  render: () => (
    <Card
      heading="Portfolio Summary"
      content="View your complete investment portfolio."
      onPress={() => console.log("Navigate")}
      RightComponent={
        <View style={styles.arrowContainer}>
          <Icon icon="caretRight" size={24} color={colors.palette.neutral600} />
        </View>
      }
    />
  ),
}
