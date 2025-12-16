import { useCallback, useMemo, useState } from "react"
import { Pressable, StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Card } from "../Card"
import { Badge } from "../Badge"
import { Icon } from "../Icon"
import { Button } from "../Button"
import { TextField } from "../TextField"
import { PriceBreakdown, PriceLineItem } from "../PriceBreakdown"
import { Divider } from "../Divider"

type Recommendation = "strong_buy" | "buy" | "hold" | "avoid"
type CalculatorVariant = "compact" | "detailed"

export interface CostItem {
  /**
   * Cost item identifier
   */
  key: string
  /**
   * Display label
   */
  label: string
  /**
   * Amount per unit
   */
  amountPerUnit: number
  /**
   * Whether this is a fixed cost (not per unit)
   * @default false
   */
  isFixed?: boolean
  /**
   * Whether this is optional
   * @default false
   */
  isOptional?: boolean
}

export interface FeasibilityResult {
  /**
   * Total cost for the bid
   */
  totalCost: number
  /**
   * Expected revenue at target sell price
   */
  expectedRevenue: number
  /**
   * Gross profit
   */
  grossProfit: number
  /**
   * Profit margin percentage
   */
  profitMargin: number
  /**
   * Break-even sell price per unit
   */
  breakEvenPrice: number
  /**
   * ROI percentage
   */
  roi: number
  /**
   * Recommendation based on margin
   */
  recommendation: Recommendation
}

export interface FeasibilityCalculatorProps {
  /**
   * Product name being bid on
   */
  productName?: string
  /**
   * Unit of measurement (e.g., "lb", "kg", "piece")
   * @default "lb"
   */
  unit?: string
  /**
   * Current bid price per unit
   */
  bidPrice?: number
  /**
   * Quantity being purchased
   */
  quantity?: number
  /**
   * Target sell price per unit
   */
  targetSellPrice?: number
  /**
   * Cost items to include in calculation
   */
  costItems?: CostItem[]
  /**
   * Minimum acceptable profit margin for "buy" recommendation
   * @default 15
   */
  minAcceptableMargin?: number
  /**
   * Target profit margin for "strong_buy" recommendation
   * @default 25
   */
  targetMargin?: number
  /**
   * Variant display mode
   * @default "detailed"
   */
  variant?: CalculatorVariant
  /**
   * Callback when calculation is performed
   */
  onCalculate?: (result: FeasibilityResult) => void
  /**
   * Callback when bid is submitted
   */
  onSubmitBid?: (bidPrice: number, quantity: number) => void
  /**
   * Currency code
   * @default "USD"
   */
  currency?: string
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const DEFAULT_COST_ITEMS: CostItem[] = [
  { key: "auction_fee", label: "Auction Fee", amountPerUnit: 0.5, isFixed: false },
  { key: "handling", label: "Handling & Processing", amountPerUnit: 1.0, isFixed: false },
  { key: "transport", label: "Transport/Logistics", amountPerUnit: 0.75, isFixed: false },
  { key: "storage", label: "Cold Storage", amountPerUnit: 0.25, isFixed: false },
  { key: "insurance", label: "Insurance", amountPerUnit: 0.15, isFixed: false, isOptional: true },
]

const RECOMMENDATION_CONFIG: Record<Recommendation, {
  label: string
  badgeStatus: "success" | "warning" | "error" | "info" | "neutral"
  description: string
}> = {
  strong_buy: {
    label: "Strong Buy",
    badgeStatus: "success",
    description: "Excellent margin - proceed with confidence",
  },
  buy: {
    label: "Buy",
    badgeStatus: "info",
    description: "Good margin - acceptable deal",
  },
  hold: {
    label: "Hold",
    badgeStatus: "warning",
    description: "Thin margin - consider negotiating",
  },
  avoid: {
    label: "Avoid",
    badgeStatus: "error",
    description: "Poor margin - not recommended",
  },
}

/**
 * FeasibilityCalculator component for bid analysis.
 * Calculates costs, margins, and provides recommendations.
 *
 * @param {FeasibilityCalculatorProps} props - The props for the `FeasibilityCalculator` component.
 * @returns {JSX.Element} The rendered `FeasibilityCalculator` component.
 *
 * @example
 * <FeasibilityCalculator
 *   productName="Bluefin Tuna"
 *   bidPrice={45}
 *   quantity={100}
 *   targetSellPrice={65}
 *   onSubmitBid={(price, qty) => submitBid(price, qty)}
 * />
 */
export function FeasibilityCalculator(props: FeasibilityCalculatorProps) {
  const {
    productName = "Product",
    unit = "lb",
    bidPrice: initialBidPrice,
    quantity: initialQuantity,
    targetSellPrice: initialTargetPrice,
    costItems = DEFAULT_COST_ITEMS,
    minAcceptableMargin = 15,
    targetMargin = 25,
    variant = "detailed",
    onCalculate,
    onSubmitBid,
    currency = "USD",
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  // Form state
  const [bidPrice, setBidPrice] = useState(initialBidPrice?.toString() ?? "")
  const [quantity, setQuantity] = useState(initialQuantity?.toString() ?? "")
  const [targetSellPrice, setTargetSellPrice] = useState(initialTargetPrice?.toString() ?? "")
  const [enabledCosts, setEnabledCosts] = useState<Set<string>>(
    new Set(costItems.filter((c) => !c.isOptional).map((c) => c.key))
  )

  // Parse inputs
  const parsedBidPrice = parseFloat(bidPrice) || 0
  const parsedQuantity = parseFloat(quantity) || 0
  const parsedTargetPrice = parseFloat(targetSellPrice) || 0

  // Calculate result
  const result = useMemo((): FeasibilityResult | null => {
    if (!parsedBidPrice || !parsedQuantity || !parsedTargetPrice) return null

    // Calculate costs
    let totalVariableCosts = 0
    let totalFixedCosts = 0

    costItems.forEach((item) => {
      if (!enabledCosts.has(item.key)) return
      if (item.isFixed) {
        totalFixedCosts += item.amountPerUnit
      } else {
        totalVariableCosts += item.amountPerUnit * parsedQuantity
      }
    })

    const productCost = parsedBidPrice * parsedQuantity
    const totalCost = productCost + totalVariableCosts + totalFixedCosts
    const expectedRevenue = parsedTargetPrice * parsedQuantity
    const grossProfit = expectedRevenue - totalCost
    const profitMargin = expectedRevenue > 0 ? (grossProfit / expectedRevenue) * 100 : 0
    const breakEvenPrice = parsedQuantity > 0 ? totalCost / parsedQuantity : 0
    const roi = totalCost > 0 ? (grossProfit / totalCost) * 100 : 0

    // Determine recommendation
    let recommendation: Recommendation
    if (profitMargin >= targetMargin) {
      recommendation = "strong_buy"
    } else if (profitMargin >= minAcceptableMargin) {
      recommendation = "buy"
    } else if (profitMargin >= 5) {
      recommendation = "hold"
    } else {
      recommendation = "avoid"
    }

    return {
      totalCost,
      expectedRevenue,
      grossProfit,
      profitMargin,
      breakEvenPrice,
      roi,
      recommendation,
    }
  }, [
    parsedBidPrice,
    parsedQuantity,
    parsedTargetPrice,
    costItems,
    enabledCosts,
    targetMargin,
    minAcceptableMargin,
  ])

  const handleToggleCost = useCallback((key: string) => {
    setEnabledCosts((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  const handleCalculate = useCallback(() => {
    if (result && onCalculate) {
      onCalculate(result)
    }
  }, [result, onCalculate])

  const handleSubmitBid = useCallback(() => {
    if (onSubmitBid && parsedBidPrice && parsedQuantity) {
      onSubmitBid(parsedBidPrice, parsedQuantity)
    }
  }, [onSubmitBid, parsedBidPrice, parsedQuantity])

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
  }

  // Build cost breakdown items for PriceBreakdown
  const costBreakdownItems: PriceLineItem[] = useMemo(() => {
    if (!parsedQuantity) return []

    const items: PriceLineItem[] = [
      { label: `${productName} (${parsedQuantity} ${unit} @ ${formatCurrency(parsedBidPrice)}/${unit})`, amount: parsedBidPrice * parsedQuantity, isBold: true },
    ]

    costItems.forEach((item) => {
      if (!enabledCosts.has(item.key)) return
      const amount = item.isFixed ? item.amountPerUnit : item.amountPerUnit * parsedQuantity
      items.push({ label: item.label, amount })
    })

    return items
  }, [productName, parsedBidPrice, parsedQuantity, unit, costItems, enabledCosts])

  const recommendationConfig = result ? RECOMMENDATION_CONFIG[result.recommendation] : null

  // Compact variant
  if (variant === "compact" && result) {
    return (
      <Card variant="outlined" style={$styleOverride}>
        <View style={themed($compactContainer)}>
          <View style={themed($compactLeft)}>
            <Text text={productName} weight="bold" size="md" numberOfLines={1} />
            <Text
              text={`${parsedQuantity} ${unit} @ ${formatCurrency(parsedBidPrice)}/${unit}`}
              size="sm"
              style={themed($subtleText)}
              numberOfLines={1}
            />
          </View>
          <View style={themed($compactRight)}>
            <Badge
              text={recommendationConfig?.label ?? ""}
              status={recommendationConfig?.badgeStatus ?? "neutral"}
              size="md"
            />
            <Text
              text={`${result.profitMargin.toFixed(1)}% margin`}
              size="xs"
              style={themed($subtleText)}
            />
          </View>
        </View>
      </Card>
    )
  }

  return (
    <View style={$styleOverride}>
      {/* Header */}
      <Card variant="elevated" style={themed($headerCard)}>
        <View style={themed($headerRow)}>
          <Icon icon="components" size={24} color={theme.colors.palette.ocean500} />
          <View style={themed($headerInfo)}>
            <Text text="Bid Feasibility Calculator" weight="bold" size="md" numberOfLines={1} />
            <Text text={productName} size="sm" style={themed($subtleText)} numberOfLines={1} />
          </View>
        </View>
      </Card>

      {/* Input Form */}
      <Card variant="filled" style={themed($formCard)}>
        <Text text="Bid Parameters" weight="bold" style={themed($sectionTitle)} />

        <View style={themed($inputRow)}>
          <View style={themed($inputGroup)}>
            <TextField
              label={`Bid Price (per ${unit})`}
              value={bidPrice}
              onChangeText={setBidPrice}
              keyboardType="decimal-pad"
              placeholder="0.00"
              LeftAccessory={(props) => (
                <View style={[props.style, themed($currencyContainer)]}>
                  <Text text="$" style={themed($currencyPrefix)} />
                </View>
              )}
            />
          </View>
          <View style={themed($inputGroup)}>
            <TextField
              label={`Quantity (${unit})`}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="decimal-pad"
              placeholder="0"
            />
          </View>
        </View>

        <TextField
          label={`Target Sell Price (per ${unit})`}
          value={targetSellPrice}
          onChangeText={setTargetSellPrice}
          keyboardType="decimal-pad"
          placeholder="0.00"
          LeftAccessory={(props) => (
            <View style={[props.style, themed($currencyContainer)]}>
              <Text text="$" style={themed($currencyPrefix)} />
            </View>
          )}
        />
      </Card>

      {/* Cost Items */}
      <Card variant="outlined" style={themed($costsCard)}>
        <Text text="Cost Factors" weight="bold" style={themed($sectionTitle)} />

        {costItems.map((item) => {
          const isEnabled = enabledCosts.has(item.key)
          return (
            <Pressable
              key={item.key}
              style={themed($costRow)}
              onPress={() => item.isOptional && handleToggleCost(item.key)}
            >
              <View style={themed($costLeft)}>
                {item.isOptional ? (
                  <View style={[themed($checkbox), isEnabled && themed($checkboxChecked)]}>
                    {isEnabled && <Icon icon="check" size={12} color={theme.colors.palette.sand100} />}
                  </View>
                ) : (
                  <View style={themed($checkboxRequired)}>
                    <Icon icon="check" size={12} color={theme.colors.palette.ocean500} />
                  </View>
                )}
                <View style={themed($costLabelContainer)}>
                  <Text text={item.label} size="sm" numberOfLines={1} />
                  {item.isOptional && (
                    <Text text="Optional" size="xs" style={themed($optionalLabel)} />
                  )}
                </View>
              </View>
              <Text
                text={item.isFixed ? formatCurrency(item.amountPerUnit) : `${formatCurrency(item.amountPerUnit)}/${unit}`}
                size="sm"
                style={themed($costAmount)}
                numberOfLines={1}
              />
            </Pressable>
          )
        })}
      </Card>

      {/* Results */}
      {result && (
        <>
          {/* Cost Breakdown */}
          <Card variant="filled" style={themed($breakdownCard)}>
            <Text text="Cost Breakdown" weight="bold" style={themed($sectionTitle)} />
            <PriceBreakdown
              items={costBreakdownItems}
              total={result.totalCost}
              totalLabel="Total Cost"
              currency={currency}
            />
          </Card>

          {/* Profit Analysis */}
          <Card variant="elevated" style={themed($analysisCard)}>
            <View style={themed($recommendationHeader)}>
              <Badge
                text={recommendationConfig?.label ?? ""}
                status={recommendationConfig?.badgeStatus ?? "neutral"}
                size="lg"
                badgeStyle="solid"
              />
              <Text text={recommendationConfig?.description ?? ""} size="sm" style={themed($subtleText)} />
            </View>

            <Divider spacing="md" />

            <View style={themed($metricsGrid)}>
              <View style={themed($metricItem)}>
                <Text text="Expected Revenue" size="xs" style={themed($metricLabel)} />
                <Text text={formatCurrency(result.expectedRevenue)} size="md" weight="bold" />
              </View>
              <View style={themed($metricItem)}>
                <Text text="Total Cost" size="xs" style={themed($metricLabel)} />
                <Text text={formatCurrency(result.totalCost)} size="md" weight="bold" />
              </View>
              <View style={themed($metricItem)}>
                <Text text="Gross Profit" size="xs" style={themed($metricLabel)} />
                <Text
                  text={formatCurrency(result.grossProfit)}
                  size="md"
                  weight="bold"
                  style={{ color: result.grossProfit >= 0 ? theme.colors.palette.seafoam500 : theme.colors.palette.coral500 }}
                />
              </View>
              <View style={themed($metricItem)}>
                <Text text="Profit Margin" size="xs" style={themed($metricLabel)} />
                <Text
                  text={`${result.profitMargin.toFixed(1)}%`}
                  size="md"
                  weight="bold"
                  style={{ color: result.profitMargin >= minAcceptableMargin ? theme.colors.palette.seafoam500 : theme.colors.palette.coral500 }}
                />
              </View>
              <View style={themed($metricItem)}>
                <Text text="Break-Even Price" size="xs" style={themed($metricLabel)} />
                <Text text={`${formatCurrency(result.breakEvenPrice)}/${unit}`} size="md" weight="bold" />
              </View>
              <View style={themed($metricItem)}>
                <Text text="ROI" size="xs" style={themed($metricLabel)} />
                <Text
                  text={`${result.roi.toFixed(1)}%`}
                  size="md"
                  weight="bold"
                  style={{ color: result.roi >= 0 ? theme.colors.palette.seafoam500 : theme.colors.palette.coral500 }}
                />
              </View>
            </View>
          </Card>

          {/* Actions */}
          <View style={themed($actions)}>
            {onCalculate && (
              <Button
                text="Recalculate"
                preset="default"
                onPress={handleCalculate}
                style={themed($actionButton)}
              />
            )}
            {onSubmitBid && (
              <Button
                text="Submit Bid"
                preset="reversed"
                onPress={handleSubmitBid}
                disabled={result.recommendation === "avoid"}
                style={themed($actionButton)}
              />
            )}
          </View>
        </>
      )}
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $compactContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.md,
})

const $compactLeft: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  minWidth: 0,
})

const $compactRight: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "flex-end",
  gap: spacing.xxs,
  flexShrink: 0,
})

const $headerCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $headerRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.md,
})

const $headerInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  minWidth: 0,
  gap: spacing.xxs,
})

const $subtleText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $formCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand800,
  marginBottom: spacing.md,
})

const $inputRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
  marginBottom: spacing.sm,
})

const $inputGroup: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $currencyContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginEnd: -spacing.xs,
})

const $currencyPrefix: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  fontSize: 16,
  lineHeight: 24,
})

const $costsCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $costRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: spacing.xs,
})

const $costLeft: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
  flex: 1,
  minWidth: 0,
})

const $checkbox: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 20,
  height: 20,
  borderRadius: 4,
  borderWidth: 2,
  borderColor: colors.palette.sand400,
  alignItems: "center",
  justifyContent: "center",
})

const $checkboxChecked: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean500,
  borderColor: colors.palette.ocean500,
})

const $checkboxRequired: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 20,
  height: 20,
  borderRadius: 4,
  backgroundColor: colors.palette.ocean100,
  alignItems: "center",
  justifyContent: "center",
})

const $costLabelContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  minWidth: 0,
})

const $optionalLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $costAmount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
  flexShrink: 0,
})

const $breakdownCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $analysisCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $recommendationHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  gap: spacing.xs,
})

const $metricsGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.md,
})

const $metricItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "45%",
  minWidth: 0,
  gap: spacing.xxs,
})

const $metricLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  textTransform: "uppercase",
  letterSpacing: 0.5,
})

const $actions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $actionButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
