import { useState } from "react"
import { StyleSheet, View, Alert } from "react-native"
import type { Meta, StoryObj } from "@storybook/react"

import { FeasibilityCalculator, FeasibilityResult } from "./FeasibilityCalculator"
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
})

/**
 * FeasibilityCalculator Stories
 *
 * Bid analysis tool for the tsuriai fishing marketplace.
 * Helps buyers calculate costs, margins, and get recommendations.
 *
 * Design principles:
 * - Clear input parameters
 * - Transparent cost breakdown
 * - Actionable recommendations
 * - Seaside color palette for status indicators
 */
const meta: Meta<typeof FeasibilityCalculator> = {
  title: "Operations/FeasibilityCalculator",
  component: FeasibilityCalculator,
  argTypes: {
    productName: {
      control: "text",
      description: "Product being bid on",
    },
    unit: {
      control: "text",
      description: "Unit of measurement",
    },
    bidPrice: {
      control: "number",
      description: "Bid price per unit",
    },
    quantity: {
      control: "number",
      description: "Quantity being purchased",
    },
    targetSellPrice: {
      control: "number",
      description: "Target sell price per unit",
    },
    variant: {
      control: "select",
      options: ["compact", "detailed"],
      description: "Display variant",
    },
    minAcceptableMargin: {
      control: "number",
      description: "Minimum margin for 'buy' recommendation",
    },
    targetMargin: {
      control: "number",
      description: "Target margin for 'strong buy' recommendation",
    },
  },
  args: {
    productName: "Bluefin Tuna",
    unit: "lb",
    bidPrice: 45,
    quantity: 100,
    targetSellPrice: 65,
    variant: "detailed",
    minAcceptableMargin: 15,
    targetMargin: 25,
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

type Story = StoryObj<typeof FeasibilityCalculator>

// =============================================================================
// INTERACTIVE WRAPPER
// =============================================================================

function FeasibilityCalculatorWrapper(
  props: React.ComponentProps<typeof FeasibilityCalculator>
) {
  const handleCalculate = (result: FeasibilityResult) => {
    console.log("Calculation result:", result)
  }

  const handleSubmitBid = (bidPrice: number, quantity: number) => {
    Alert.alert(
      "Bid Submitted",
      `Bid: $${bidPrice.toFixed(2)}/lb x ${quantity} lbs = $${(bidPrice * quantity).toFixed(2)}`
    )
  }

  return (
    <FeasibilityCalculator
      {...props}
      onCalculate={handleCalculate}
      onSubmitBid={handleSubmitBid}
    />
  )
}

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  render: (args) => <FeasibilityCalculatorWrapper {...args} />,
}

export const EmptyForm: Story = {
  name: "Empty Form",
  render: (args) => (
    <FeasibilityCalculatorWrapper
      {...args}
      bidPrice={undefined}
      quantity={undefined}
      targetSellPrice={undefined}
    />
  ),
}

export const CompactVariant: Story = {
  name: "Compact Variant",
  args: {
    variant: "compact",
  },
}

export const StrongBuyRecommendation: Story = {
  name: "Strong Buy Recommendation",
  args: {
    bidPrice: 35,
    quantity: 200,
    targetSellPrice: 55,
  },
}

export const HoldRecommendation: Story = {
  name: "Hold Recommendation",
  args: {
    bidPrice: 50,
    quantity: 100,
    targetSellPrice: 58,
  },
}

export const AvoidRecommendation: Story = {
  name: "Avoid Recommendation",
  args: {
    bidPrice: 55,
    quantity: 100,
    targetSellPrice: 52,
  },
}

// =============================================================================
// FISH MARKET SCENARIOS
// =============================================================================

export const BluefinTunaAuction: Story = {
  name: "Fish Market: Bluefin Tuna Auction",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="AUCTION LOT #247" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <FeasibilityCalculatorWrapper
        productName="Premium Bluefin Tuna"
        unit="lb"
        bidPrice={85}
        quantity={50}
        targetSellPrice={125}
        costItems={[
          { key: "auction_fee", label: "Auction Fee (5%)", amountPerUnit: 4.25, isFixed: false },
          { key: "handling", label: "Premium Handling", amountPerUnit: 2.0, isFixed: false },
          { key: "air_freight", label: "Air Freight (Express)", amountPerUnit: 5.0, isFixed: false },
          { key: "storage", label: "Flash Freeze Storage", amountPerUnit: 1.0, isFixed: false },
          { key: "inspection", label: "Quality Inspection", amountPerUnit: 50, isFixed: true, isOptional: true },
        ]}
      />
    </View>
  ),
}

export const SalmonBulkPurchase: Story = {
  name: "Fish Market: Salmon Bulk Purchase",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="BULK ORDER ANALYSIS" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <FeasibilityCalculatorWrapper
        productName="King Salmon (Wild)"
        unit="lb"
        bidPrice={28}
        quantity={500}
        targetSellPrice={42}
        costItems={[
          { key: "commission", label: "Broker Commission", amountPerUnit: 0.75, isFixed: false },
          { key: "processing", label: "Filleting & Processing", amountPerUnit: 1.5, isFixed: false },
          { key: "transport", label: "Refrigerated Transport", amountPerUnit: 0.5, isFixed: false },
          { key: "packaging", label: "Vacuum Packaging", amountPerUnit: 0.25, isFixed: false },
        ]}
        minAcceptableMargin={12}
        targetMargin={20}
      />
    </View>
  ),
}

export const ShellfishContract: Story = {
  name: "Fish Market: Shellfish Contract",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="CONTRACT NEGOTIATION" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <FeasibilityCalculatorWrapper
        productName="Live Lobster"
        unit="piece"
        bidPrice={18}
        quantity={200}
        targetSellPrice={32}
        costItems={[
          { key: "holding", label: "Holding Tank Rental", amountPerUnit: 100, isFixed: true },
          { key: "feed", label: "Feed & Care", amountPerUnit: 0.5, isFixed: false },
          { key: "transport", label: "Live Transport", amountPerUnit: 1.5, isFixed: false },
          { key: "mortality", label: "Mortality Buffer (5%)", amountPerUnit: 0.9, isFixed: false },
        ]}
      />
    </View>
  ),
}

// =============================================================================
// CUSTOM COST ITEMS
// =============================================================================

export const WithCustomCosts: Story = {
  name: "With Custom Cost Items",
  render: () => (
    <FeasibilityCalculatorWrapper
      productName="Sea Urchin (Uni)"
      unit="tray"
      bidPrice={120}
      quantity={25}
      targetSellPrice={200}
      costItems={[
        { key: "import_duty", label: "Import Duty", amountPerUnit: 8, isFixed: false },
        { key: "customs", label: "Customs Clearance", amountPerUnit: 150, isFixed: true },
        { key: "handling", label: "Special Handling", amountPerUnit: 5, isFixed: false },
        { key: "expedited", label: "Expedited Shipping", amountPerUnit: 15, isFixed: false, isOptional: true },
        { key: "insurance", label: "Premium Insurance", amountPerUnit: 3, isFixed: false, isOptional: true },
      ]}
    />
  ),
}

// =============================================================================
// MARGIN THRESHOLDS
// =============================================================================

export const ConservativeThresholds: Story = {
  name: "Conservative Margin Thresholds",
  render: () => (
    <View style={styles.section}>
      <Text size="xs" weight="medium" text="HIGH MARGIN REQUIREMENTS (20%/35%)" style={styles.sectionLabel} />
      <FeasibilityCalculatorWrapper
        productName="Premium Halibut"
        bidPrice={40}
        quantity={75}
        targetSellPrice={55}
        minAcceptableMargin={20}
        targetMargin={35}
      />
    </View>
  ),
}

export const AggressiveThresholds: Story = {
  name: "Aggressive Margin Thresholds",
  render: () => (
    <View style={styles.section}>
      <Text size="xs" weight="medium" text="LOW MARGIN REQUIREMENTS (8%/15%)" style={styles.sectionLabel} />
      <FeasibilityCalculatorWrapper
        productName="Cod (Commodity)"
        bidPrice={12}
        quantity={300}
        targetSellPrice={15}
        minAcceptableMargin={8}
        targetMargin={15}
      />
    </View>
  ),
}

// =============================================================================
// COMPACT COMPARISON
// =============================================================================

export const CompactComparison: Story = {
  name: "Compact Variant Comparison",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="QUICK BID COMPARISON" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <View style={styles.section}>
        <FeasibilityCalculator
          productName="Bluefin Tuna"
          bidPrice={45}
          quantity={100}
          targetSellPrice={70}
          variant="compact"
        />
        <FeasibilityCalculator
          productName="Yellowfin Tuna"
          bidPrice={28}
          quantity={150}
          targetSellPrice={42}
          variant="compact"
        />
        <FeasibilityCalculator
          productName="Albacore Tuna"
          bidPrice={18}
          quantity={200}
          targetSellPrice={25}
          variant="compact"
        />
        <FeasibilityCalculator
          productName="Skipjack Tuna"
          bidPrice={12}
          quantity={300}
          targetSellPrice={14}
          variant="compact"
        />
      </View>
    </View>
  ),
}

// =============================================================================
// COMPLETE SHOWCASE
// =============================================================================

export const CompleteShowcase: Story = {
  name: "Complete FeasibilityCalculator Showcase",
  render: () => (
    <View style={styles.grid}>
      {/* Strong Buy Example */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="STRONG BUY EXAMPLE" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <FeasibilityCalculator
          productName="Premium Catch"
          bidPrice={30}
          quantity={100}
          targetSellPrice={55}
          variant="compact"
        />
      </View>

      {/* Buy Example */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="BUY EXAMPLE" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <FeasibilityCalculator
          productName="Standard Catch"
          bidPrice={35}
          quantity={100}
          targetSellPrice={48}
          variant="compact"
        />
      </View>

      {/* Hold Example */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="HOLD EXAMPLE" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <FeasibilityCalculator
          productName="Tight Margin"
          bidPrice={40}
          quantity={100}
          targetSellPrice={47}
          variant="compact"
        />
      </View>

      {/* Avoid Example */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="AVOID EXAMPLE" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <FeasibilityCalculator
          productName="Bad Deal"
          bidPrice={45}
          quantity={100}
          targetSellPrice={44}
          variant="compact"
        />
      </View>
    </View>
  ),
}
