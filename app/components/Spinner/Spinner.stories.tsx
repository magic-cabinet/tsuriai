import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Spinner } from "./Spinner"
import { Text } from "../Text"
import { colors } from "@/theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  darkBackground: {
    backgroundColor: colors.palette.neutral900,
    flex: 1,
    padding: 24,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    padding: 24,
  },
  inlineContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  loadingCard: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 20,
    gap: 16,
    padding: 32,
  },
  loadingCardDark: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral800,
    borderRadius: 20,
    gap: 16,
    padding: 32,
  },
  loadingText: {
    color: colors.palette.neutral600,
  },
  loadingTextDark: {
    color: colors.palette.neutral400,
  },
  sectionLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1.5,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  sectionLabelLight: {
    color: colors.palette.neutral400,
    letterSpacing: 1.5,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  showcaseCard: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 20,
    gap: 24,
    padding: 28,
  },
  showcaseCardDark: {
    backgroundColor: colors.palette.neutral800,
    borderRadius: 20,
    gap: 24,
    padding: 28,
  },
  showcaseContainer: {
    gap: 32,
  },
  showcaseDivider: {
    backgroundColor: colors.palette.neutral300,
    height: 1,
    marginVertical: 4,
  },
  showcaseDividerDark: {
    backgroundColor: colors.palette.neutral700,
    height: 1,
    marginVertical: 4,
  },
  sizeColumn: {
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  sizeGrid: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },
  sizeLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1,
  },
})

/**
 * Spinner Stories
 *
 * Loading spinner/indicator component for the Tsuriai fish marketplace.
 * Simple, clean animation to indicate loading states throughout the app.
 *
 * Design principles:
 * - Clear visual feedback for loading states
 * - Size variants for different contexts (inline, cards, full-screen)
 * - Color variants for different backgrounds (light, dark)
 * - Follows seaside color palette for brand consistency
 */
const meta = {
  title: "Core/Spinner",
  component: Spinner,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Spinner size variant",
    },
    color: {
      control: "select",
      options: ["primary", "white", "inherit"],
      description: "Spinner color variant",
    },
    customColor: {
      control: "color",
      description: "Optional custom color override",
    },
  },
  args: {
    size: "md",
    color: "primary",
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <View style={styles.centeredContainer}>
          <Story />
        </View>
      </View>
    ),
  ],
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    size: "md",
    color: "primary",
  },
}

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const Small: Story = {
  args: {
    size: "sm",
    color: "primary",
  },
}

export const Medium: Story = {
  args: {
    size: "md",
    color: "primary",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    color: "primary",
  },
}

export const AllSizes: Story = {
  name: "All Sizes",
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="SPINNER SIZES" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.sizeGrid}>
          <View style={styles.sizeColumn}>
            <Text size="xxs" text="SMALL" style={styles.sizeLabel} />
            <Spinner size="sm" color="primary" />
          </View>
          <View style={styles.sizeColumn}>
            <Text size="xxs" text="MEDIUM" style={styles.sizeLabel} />
            <Spinner size="md" color="primary" />
          </View>
          <View style={styles.sizeColumn}>
            <Text size="xxs" text="LARGE" style={styles.sizeLabel} />
            <Spinner size="lg" color="primary" />
          </View>
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// COLOR VARIANTS
// =============================================================================

export const Primary: Story = {
  args: {
    size: "md",
    color: "primary",
  },
}

export const White: Story = {
  name: "White (on dark)",
  decorators: [
    (Story) => (
      <View style={styles.darkBackground}>
        <View style={styles.centeredContainer}>
          <Story />
        </View>
      </View>
    ),
  ],
  args: {
    size: "md",
    color: "white",
  },
}

export const Inherit: Story = {
  args: {
    size: "md",
    color: "inherit",
  },
}

export const AllColors: Story = {
  name: "All Colors",
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="SPINNER COLORS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.sizeGrid}>
          <View style={styles.sizeColumn}>
            <Text size="xxs" text="PRIMARY" style={styles.sizeLabel} />
            <Spinner size="md" color="primary" />
          </View>
          <View style={styles.sizeColumn}>
            <Text size="xxs" text="INHERIT" style={styles.sizeLabel} />
            <Spinner size="md" color="inherit" />
          </View>
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// DARK BACKGROUND
// =============================================================================

export const OnDarkBackground: Story = {
  name: "On Dark Background",
  decorators: [
    (Story) => (
      <View style={styles.darkBackground}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.showcaseCardDark}>
        <Text size="xs" weight="medium" text="DARK CONTEXT" style={styles.sectionLabelLight} />
        <View style={styles.showcaseDividerDark} />
        <View style={styles.sizeGrid}>
          <View style={styles.sizeColumn}>
            <Text size="xxs" text="WHITE" style={[styles.sizeLabel, { color: colors.palette.neutral400 }]} />
            <Spinner size="md" color="white" />
          </View>
          <View style={styles.sizeColumn}>
            <Text size="xxs" text="PRIMARY" style={[styles.sizeLabel, { color: colors.palette.neutral400 }]} />
            <Spinner size="md" color="primary" />
          </View>
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// INLINE WITH TEXT
// =============================================================================

export const InlineWithText: Story = {
  name: "Inline with Text",
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="INLINE USAGE" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />

        <View style={styles.inlineContainer}>
          <Spinner size="sm" color="primary" />
          <Text text="Loading your portfolio..." />
        </View>

        <View style={styles.inlineContainer}>
          <Spinner size="sm" color="primary" />
          <Text text="Processing transaction..." />
        </View>

        <View style={styles.inlineContainer}>
          <Spinner size="sm" color="primary" />
          <Text text="Updating market data..." />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// LOADING STATES
// =============================================================================

export const LoadingCard: Story = {
  name: "Loading Card",
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.loadingCard}>
      <Spinner size="lg" color="primary" />
      <Text text="Loading your investments..." style={styles.loadingText} />
    </View>
  ),
}

export const LoadingCardDark: Story = {
  name: "Loading Card (Dark)",
  decorators: [
    (Story) => (
      <View style={styles.darkBackground}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.loadingCardDark}>
      <Spinner size="lg" color="white" />
      <Text text="Loading your investments..." style={styles.loadingTextDark} />
    </View>
  ),
}

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

export const UsageShowcase: Story = {
  name: "Usage Showcase",
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.showcaseContainer}>
      {/* Small inline loaders */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="SMALL INLINE" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.inlineContainer}>
          <Spinner size="sm" color="primary" />
          <Text size="sm" text="Refreshing..." style={styles.loadingText} />
        </View>
      </View>

      {/* Medium content loaders */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="MEDIUM CONTENT" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.loadingCard}>
          <Spinner size="md" color="primary" />
          <Text text="Loading portfolio..." style={styles.loadingText} />
        </View>
      </View>

      {/* Large full-screen loaders */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="LARGE FULL-SCREEN" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.loadingCard}>
          <Spinner size="lg" color="primary" />
          <Text preset="subheading" text="Setting up your account..." style={styles.loadingText} />
          <Text size="sm" text="This may take a few moments" style={styles.loadingText} />
        </View>
      </View>
    </View>
  ),
}
