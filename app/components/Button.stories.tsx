import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Button } from "./Button"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { colors } from "../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  buttonBuy: {
    backgroundColor: colors.palette.badgeMint,
    borderRadius: 14,
  },
  buttonColumn: {
    gap: 16,
  },
  buttonPair: {
    flexDirection: "row",
    gap: 12,
  },
  buttonPairItem: {
    flex: 1,
  },
  buttonPill: {
    borderRadius: 28,
  },
  buttonPrimary: {
    backgroundColor: colors.palette.primary400,
    borderRadius: 14,
  },
  buttonSell: {
    backgroundColor: colors.palette.badgeCoral,
    borderRadius: 14,
  },
  buttonTextDark: {
    color: colors.palette.neutral900,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    padding: 24,
  },
  decoratorDark: {
    backgroundColor: colors.palette.neutral900,
    flex: 1,
    padding: 24,
  },
  flowAmount: {
    color: colors.palette.neutral900,
    letterSpacing: -1,
  },
  flowCard: {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral300,
    borderRadius: 24,
    borderWidth: 1,
    gap: 24,
    padding: 32,
  },
  flowHeader: {
    alignItems: "center",
    gap: 8,
  },
  flowSubtitle: {
    color: colors.palette.neutral600,
  },
  onboardingCard: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 24,
    gap: 32,
    padding: 32,
  },
  onboardingHeader: {
    gap: 8,
  },
  onboardingSubtitle: {
    color: colors.palette.neutral600,
    lineHeight: 22,
  },
  onboardingTitle: {
    color: colors.palette.neutral900,
    letterSpacing: -0.5,
  },
  progressDot: {
    backgroundColor: colors.palette.neutral400,
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  progressDotActive: {
    backgroundColor: colors.palette.primary400,
    width: 24,
  },
  progressRow: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 8,
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
  stateColumn: {
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  stateGrid: {
    flexDirection: "row",
    gap: 16,
  },
  stateLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1,
  },
  tradingCard: {
    backgroundColor: colors.palette.neutral900,
    borderRadius: 24,
    gap: 20,
    padding: 28,
  },
  tradingHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tradingPrice: {
    color: colors.palette.neutral100,
    letterSpacing: -0.5,
  },
  tradingPriceChange: {
    color: colors.palette.badgeMint,
  },
  tradingSymbol: {
    color: colors.palette.neutral100,
  },
})

/**
 * Button Stories
 *
 * Premium button components for the Beyond Equity investment platform.
 * Inspired by Cash App's boldness, Wealthsimple's refinement, and Public's clarity.
 *
 * Design principles:
 * - High-contrast CTAs for primary actions
 * - Generous padding and pill-shaped options for touch targets
 * - Subtle state changes that feel responsive
 * - Context-aware styling (trading, onboarding, account management)
 */
const meta = {
  title: "Core/Button",
  component: Button,
  argTypes: {
    preset: {
      control: "select",
      options: ["default", "filled", "reversed"],
      description: "Visual style preset",
    },
    disabled: {
      control: "boolean",
      description: "Disables button interaction",
    },
    text: {
      control: "text",
      description: "Button label text",
    },
  },
  args: {
    onPress: () => console.log("Button pressed"),
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    text: "Continue",
    preset: "default",
  },
}

export const Filled: Story = {
  args: {
    text: "Continue",
    preset: "filled",
  },
}

export const Reversed: Story = {
  args: {
    text: "Continue",
    preset: "reversed",
  },
}

export const Disabled: Story = {
  args: {
    text: "Continue",
    preset: "filled",
    disabled: true,
  },
}

// =============================================================================
// PILL STYLE (Cash App inspired)
// =============================================================================

export const PillPrimary: Story = {
  name: "Pill: Primary",
  render: () => (
    <Button
      text="Get Started"
      preset="reversed"
      style={[styles.buttonPill, styles.buttonPrimary]}
      onPress={() => {}}
    />
  ),
}

export const PillDark: Story = {
  name: "Pill: Dark",
  render: () => (
    <Button text="Next" preset="reversed" style={styles.buttonPill} onPress={() => {}} />
  ),
}

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithLeftIcon: Story = {
  name: "With Left Icon",
  render: () => (
    <Button
      text="Add to Watchlist"
      preset="default"
      LeftAccessory={({ style }) => (
        <Icon icon="heart" size={18} color={colors.palette.neutral700} style={style} />
      )}
      onPress={() => {}}
    />
  ),
}

export const WithRightIcon: Story = {
  name: "With Right Icon",
  render: () => (
    <Button
      text="Continue"
      preset="reversed"
      style={styles.buttonPill}
      RightAccessory={({ style }) => (
        <Icon icon="caretRight" size={18} color={colors.palette.neutral100} style={style} />
      )}
      onPress={() => {}}
    />
  ),
}

// =============================================================================
// TRADING CONTEXT (Robinhood/Public inspired)
// =============================================================================

export const TradingActions: Story = {
  name: "Trading: Buy/Sell",
  render: () => (
    <View style={styles.tradingCard}>
      <View style={styles.tradingHeader}>
        <View>
          <Text weight="bold" size="lg" text="AAPL" style={styles.tradingSymbol} />
          <Text size="sm" text="+2.34%" style={styles.tradingPriceChange} />
        </View>
        <Text preset="heading" text="$178.72" style={styles.tradingPrice} />
      </View>
      <View style={styles.buttonPair}>
        <View style={styles.buttonPairItem}>
          <Button
            text="Buy"
            preset="reversed"
            style={styles.buttonBuy}
            textStyle={styles.buttonTextDark}
            onPress={() => {}}
          />
        </View>
        <View style={styles.buttonPairItem}>
          <Button
            text="Sell"
            preset="reversed"
            style={styles.buttonSell}
            textStyle={styles.buttonTextDark}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// INVESTMENT FLOW (Wealthsimple inspired)
// =============================================================================

export const InvestmentConfirm: Story = {
  name: "Investment: Confirm",
  render: () => (
    <View style={styles.flowCard}>
      <View style={styles.flowHeader}>
        <Text size="sm" text="You're investing" style={styles.flowSubtitle} />
        <Text preset="heading" size="xxl" text="$5,000.00" style={styles.flowAmount} />
        <Text size="sm" text="in Sunset Tower Apartments" style={styles.flowSubtitle} />
      </View>
      <View style={styles.buttonColumn}>
        <Button
          text="Confirm Investment"
          preset="reversed"
          style={[styles.buttonPill, styles.buttonPrimary]}
          RightAccessory={({ style }) => (
            <Icon icon="check" size={18} color={colors.palette.neutral100} style={style} />
          )}
          onPress={() => {}}
        />
        <Button text="Cancel" preset="default" style={styles.buttonPill} onPress={() => {}} />
      </View>
    </View>
  ),
}

// =============================================================================
// ONBOARDING FLOW
// =============================================================================

export const OnboardingStep: Story = {
  name: "Onboarding: Step",
  render: () => (
    <View style={styles.onboardingCard}>
      <View style={styles.onboardingHeader}>
        <Text preset="heading" text="Let's verify your identity" style={styles.onboardingTitle} />
        <Text
          size="sm"
          text="We're required by law to collect this information. It's secure and encrypted."
          style={styles.onboardingSubtitle}
        />
      </View>
      <View style={styles.buttonColumn}>
        <Button
          text="Continue"
          preset="reversed"
          style={styles.buttonPill}
          RightAccessory={({ style }) => (
            <Icon icon="caretRight" size={18} color={colors.palette.neutral100} style={style} />
          )}
          onPress={() => {}}
        />
        <View style={styles.progressRow}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// BUTTON STATES SHOWCASE
// =============================================================================

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="BUTTON STATES" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.stateGrid}>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="DEFAULT" style={styles.stateLabel} />
            <Button text="Action" preset="default" onPress={() => {}} />
          </View>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="FILLED" style={styles.stateLabel} />
            <Button text="Action" preset="filled" onPress={() => {}} />
          </View>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="REVERSED" style={styles.stateLabel} />
            <Button text="Action" preset="reversed" onPress={() => {}} />
          </View>
        </View>
        <View style={styles.stateGrid}>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="DISABLED" style={styles.stateLabel} />
            <Button text="Action" preset="filled" disabled onPress={() => {}} />
          </View>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="PILL" style={styles.stateLabel} />
            <Button text="Action" preset="reversed" style={styles.buttonPill} onPress={() => {}} />
          </View>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="PRIMARY" style={styles.stateLabel} />
            <Button
              text="Action"
              preset="reversed"
              style={[styles.buttonPill, styles.buttonPrimary]}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// DARK MODE SHOWCASE
// =============================================================================

export const DarkModeActions: Story = {
  name: "Dark Mode",
  decorators: [
    (Story) => (
      <View style={styles.decoratorDark}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.showcaseCardDark}>
      <Text size="xs" weight="medium" text="DARK CONTEXT" style={styles.sectionLabelLight} />
      <View style={styles.showcaseDividerDark} />
      <View style={styles.buttonColumn}>
        <Button
          text="Primary Action"
          preset="reversed"
          style={[styles.buttonPill, styles.buttonPrimary]}
          onPress={() => {}}
        />
        <Button
          text="Secondary Action"
          preset="default"
          style={styles.buttonPill}
          onPress={() => {}}
        />
      </View>
    </View>
  ),
}

// =============================================================================
// COMPLETE ACTION SHOWCASE
// =============================================================================

export const ActionShowcase: Story = {
  name: "Action Showcase",
  render: () => (
    <View style={styles.showcaseContainer}>
      {/* Account Actions */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="ACCOUNT ACTIONS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.buttonColumn}>
          <Button
            text="Add Funds"
            preset="reversed"
            style={[styles.buttonPill, styles.buttonPrimary]}
            LeftAccessory={({ style }) => (
              <Icon icon="components" size={18} color={colors.palette.neutral100} style={style} />
            )}
            onPress={() => {}}
          />
          <Button
            text="Transfer Out"
            preset="default"
            style={styles.buttonPill}
            LeftAccessory={({ style }) => (
              <Icon icon="caretRight" size={18} color={colors.palette.neutral700} style={style} />
            )}
            onPress={() => {}}
          />
          <Button
            text="View Statements"
            preset="filled"
            style={styles.buttonPill}
            LeftAccessory={({ style }) => (
              <Icon icon="view" size={18} color={colors.palette.neutral700} style={style} />
            )}
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="QUICK ACTIONS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.buttonPair}>
          <View style={styles.buttonPairItem}>
            <Button
              text="Buy"
              preset="reversed"
              style={styles.buttonBuy}
              textStyle={styles.buttonTextDark}
              onPress={() => {}}
            />
          </View>
          <View style={styles.buttonPairItem}>
            <Button
              text="Sell"
              preset="reversed"
              style={styles.buttonSell}
              textStyle={styles.buttonTextDark}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </View>
  ),
}
