import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Text } from "./Text"
import { colors } from "../theme/colors"

/**
 * Text Stories
 *
 * Typography showcase for the BeyondAlpha design system.
 * Uses Inter as the primary font with a refined typographic scale
 * designed for investment-grade interfaces.
 */
const meta = {
  title: "Core/Text",
  component: Text,
  argTypes: {
    preset: {
      control: "select",
      options: ["default", "bold", "heading", "subheading", "formLabel", "formHelper"],
      description: "Typography preset",
    },
    size: {
      control: "select",
      options: ["xxl", "xl", "lg", "md", "sm", "xs", "xxs"],
      description: "Font size modifier",
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semiBold", "bold"],
      description: "Font weight",
    },
    text: {
      control: "text",
      description: "Text content",
    },
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// PRESETS
// =============================================================================

export const Default: Story = {
  args: {
    text: "This is default text using Inter Regular",
    preset: "default",
  },
}

export const Bold: Story = {
  args: {
    text: "This is bold text with emphasis",
    preset: "bold",
  },
}

export const Heading: Story = {
  args: {
    text: "Investment Opportunities",
    preset: "heading",
  },
}

export const Subheading: Story = {
  args: {
    text: "Premium Real Estate Portfolio",
    preset: "subheading",
  },
}

export const FormLabel: Story = {
  args: {
    text: "Email Address",
    preset: "formLabel",
  },
}

export const FormHelper: Story = {
  args: {
    text: "We'll send account updates to this email",
    preset: "formHelper",
  },
}

// =============================================================================
// TYPE SCALE
// =============================================================================

export const TypeScale: Story = {
  name: "Type Scale",
  render: () => (
    <View style={styles.scaleContainer}>
      <Text preset="subheading" text="Type Scale" style={styles.sectionTitle} />
      <View style={styles.scaleList}>
        <View style={styles.scaleRow}>
          <Text size="xxs" text="XXS" style={styles.sizeLabel} />
          <Text size="xxl" text="$2.4M Portfolio Value" />
        </View>
        <View style={styles.scaleRow}>
          <Text size="xxs" text="XL" style={styles.sizeLabel} />
          <Text size="xl" text="Investment Dashboard" />
        </View>
        <View style={styles.scaleRow}>
          <Text size="xxs" text="LG" style={styles.sizeLabel} />
          <Text size="lg" text="Asset Performance" />
        </View>
        <View style={styles.scaleRow}>
          <Text size="xxs" text="MD" style={styles.sizeLabel} />
          <Text size="md" text="Quarterly Returns" />
        </View>
        <View style={styles.scaleRow}>
          <Text size="xxs" text="SM" style={styles.sizeLabel} />
          <Text size="sm" text="Default body text size" />
        </View>
        <View style={styles.scaleRow}>
          <Text size="xxs" text="XS" style={styles.sizeLabel} />
          <Text size="xs" text="Secondary information" />
        </View>
        <View style={styles.scaleRow}>
          <Text size="xxs" text="XXS" style={styles.sizeLabel} />
          <Text size="xxs" text="Fine print and captions" />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// WEIGHT VARIATIONS
// =============================================================================

export const WeightVariations: Story = {
  name: "Font Weights",
  render: () => (
    <View style={styles.weightContainer}>
      <Text preset="subheading" text="Inter Font Weights" style={styles.sectionTitle} />
      <View style={styles.weightList}>
        <View style={styles.weightRow}>
          <Text size="xs" text="300" style={styles.weightLabel} />
          <Text weight="light" size="lg" text="Light — Elegant refinement" />
        </View>
        <View style={styles.weightRow}>
          <Text size="xs" text="400" style={styles.weightLabel} />
          <Text weight="normal" size="lg" text="Regular — Clear readability" />
        </View>
        <View style={styles.weightRow}>
          <Text size="xs" text="500" style={styles.weightLabel} />
          <Text weight="medium" size="lg" text="Medium — Subtle emphasis" />
        </View>
        <View style={styles.weightRow}>
          <Text size="xs" text="600" style={styles.weightLabel} />
          <Text weight="semiBold" size="lg" text="SemiBold — Strong presence" />
        </View>
        <View style={styles.weightRow}>
          <Text size="xs" text="700" style={styles.weightLabel} />
          <Text weight="bold" size="lg" text="Bold — Maximum impact" />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// PRESET SHOWCASE
// =============================================================================

export const AllPresets: Story = {
  name: "All Presets",
  render: () => (
    <View style={styles.presetsContainer}>
      <Text preset="subheading" text="Typography Presets" style={styles.sectionTitle} />
      <View style={styles.presetList}>
        <View style={styles.presetItem}>
          <Text size="xxs" text="HEADING" style={styles.presetLabel} />
          <Text preset="heading" text="Portfolio Overview" />
        </View>
        <View style={styles.presetItem}>
          <Text size="xxs" text="SUBHEADING" style={styles.presetLabel} />
          <Text preset="subheading" text="Asset Allocation Strategy" />
        </View>
        <View style={styles.presetItem}>
          <Text size="xxs" text="DEFAULT" style={styles.presetLabel} />
          <Text preset="default" text="Your portfolio has grown 12.4% this quarter." />
        </View>
        <View style={styles.presetItem}>
          <Text size="xxs" text="BOLD" style={styles.presetLabel} />
          <Text preset="bold" text="Important: Review your investment strategy" />
        </View>
        <View style={styles.presetItem}>
          <Text size="xxs" text="FORM LABEL" style={styles.presetLabel} />
          <Text preset="formLabel" text="Investment Amount" />
        </View>
        <View style={styles.presetItem}>
          <Text size="xxs" text="FORM HELPER" style={styles.presetLabel} />
          <Text preset="formHelper" text="Minimum investment: $25,000" />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// REAL-WORLD EXAMPLES
// =============================================================================

export const InvestmentContext: Story = {
  name: "Investment Context",
  render: () => (
    <View style={styles.investmentCard}>
      <View style={styles.cardHeader}>
        <Text size="xxs" text="REAL ESTATE" style={styles.categoryLabel} />
        <Text preset="subheading" text="Sunset Tower Apartments" />
        <Text size="xs" text="Class A Multifamily · Austin, TX" style={styles.locationText} />
      </View>
      <View style={styles.divider} />
      <View style={styles.metricsGrid}>
        <View style={styles.metric}>
          <Text size="xxs" text="TARGET IRR" style={styles.metricLabel} />
          <Text preset="bold" size="xl" text="18.5%" style={styles.metricValue} />
        </View>
        <View style={styles.metric}>
          <Text size="xxs" text="EQUITY MULTIPLE" style={styles.metricLabel} />
          <Text preset="bold" size="xl" text="2.1x" style={styles.metricValue} />
        </View>
        <View style={styles.metric}>
          <Text size="xxs" text="HOLD PERIOD" style={styles.metricLabel} />
          <Text preset="bold" size="xl" text="5 yrs" style={styles.metricValue} />
        </View>
      </View>
      <View style={styles.divider} />
      <Text
        size="sm"
        text="Class A multifamily development in Austin's rapidly growing East side. 240 units with premium amenities targeting young professionals."
        style={styles.description}
      />
    </View>
  ),
}

export const FinancialData: Story = {
  name: "Financial Data Display",
  render: () => (
    <View style={styles.financialContainer}>
      <Text preset="subheading" text="Q4 2024 Summary" style={styles.sectionTitle} />
      <View style={styles.financialGrid}>
        <View style={styles.financialRow}>
          <Text size="sm" text="Total Investments" style={styles.financialLabel} />
          <Text weight="semiBold" size="md" text="$2,450,000" />
        </View>
        <View style={styles.financialRow}>
          <Text size="sm" text="Distributions Received" style={styles.financialLabel} />
          <Text weight="semiBold" size="md" text="$89,250" style={styles.positiveValue} />
        </View>
        <View style={styles.financialRow}>
          <Text size="sm" text="Unrealized Gains" style={styles.financialLabel} />
          <Text weight="semiBold" size="md" text="+$312,400" style={styles.positiveValue} />
        </View>
        <View style={styles.financialRow}>
          <Text size="sm" text="Portfolio Return" style={styles.financialLabel} />
          <Text weight="bold" size="lg" text="+16.4%" style={styles.positiveValue} />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  cardHeader: {
    gap: 4,
  },
  categoryLabel: {
    color: colors.palette.primary400,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
    padding: 20,
  },
  description: {
    color: colors.palette.neutral700,
    lineHeight: 22,
  },
  divider: {
    backgroundColor: colors.palette.neutral300,
    height: 1,
  },
  financialContainer: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 16,
    gap: 8,
    padding: 24,
  },
  financialGrid: {
    gap: 12,
  },
  financialLabel: {
    color: colors.palette.neutral600,
  },
  financialRow: {
    alignItems: "center",
    borderBottomColor: colors.palette.neutral300,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  investmentCard: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 16,
    gap: 16,
    padding: 24,
  },
  locationText: {
    color: colors.palette.neutral600,
    marginTop: 4,
  },
  metric: {
    alignItems: "center",
    gap: 4,
  },
  metricLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1,
  },
  metricValue: {
    color: colors.palette.neutral900,
  },
  metricsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  positiveValue: {
    color: colors.palette.badgeMint,
  },
  presetItem: {
    gap: 4,
  },
  presetLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1,
  },
  presetList: {
    gap: 20,
  },
  presetsContainer: {
    gap: 8,
  },
  scaleContainer: {
    gap: 8,
  },
  scaleList: {
    gap: 16,
  },
  scaleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
  sectionTitle: {
    color: colors.palette.neutral900,
    marginBottom: 16,
  },
  sizeLabel: {
    color: colors.palette.neutral500,
    width: 32,
  },
  weightContainer: {
    gap: 8,
  },
  weightLabel: {
    color: colors.palette.neutral500,
    textAlign: "right",
    width: 32,
  },
  weightList: {
    gap: 12,
  },
  weightRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
})
