import { StyleProp, View, ViewStyle, TextStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "../Text"
import { Divider } from "../Divider"

export interface PriceLineItem {
  /**
   * Line item label
   */
  label?: string
  /**
   * Line item label i18n key
   */
  labelTx?: TextProps["tx"]
  /**
   * Price amount (will be formatted)
   */
  amount: number
  /**
   * Whether this is a discount (negative value display)
   */
  isDiscount?: boolean
  /**
   * Whether this is highlighted (e.g., savings)
   */
  isHighlight?: boolean
  /**
   * Whether this line should be bold (e.g., subtotals)
   */
  isBold?: boolean
}

export interface PriceBreakdownProps {
  /**
   * Array of price line items
   */
  items: PriceLineItem[]
  /**
   * Total label
   * @default "Total"
   */
  totalLabel?: string
  /**
   * Total label i18n key
   */
  totalLabelTx?: TextProps["tx"]
  /**
   * Total amount
   */
  total: number
  /**
   * Currency code
   * @default "USD"
   */
  currency?: string
  /**
   * Locale for formatting
   * @default "en-US"
   */
  locale?: string
  /**
   * Whether to show divider before total
   * @default true
   */
  showDivider?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * PriceBreakdown component for displaying itemized pricing.
 * Supports discounts, highlights, and currency formatting.
 *
 * @param {PriceBreakdownProps} props - The props for the `PriceBreakdown` component.
 * @returns {JSX.Element} The rendered `PriceBreakdown` component.
 *
 * @example
 * <PriceBreakdown
 *   items={[
 *     { label: "Bluefin Tuna (5kg)", amount: 450 },
 *     { label: "Processing Fee", amount: 25 },
 *     { label: "Early Bird Discount", amount: 50, isDiscount: true },
 *   ]}
 *   total={425}
 *   currency="USD"
 * />
 */
export function PriceBreakdown(props: PriceBreakdownProps) {
  const {
    items,
    totalLabel = "Total",
    totalLabelTx,
    total,
    currency = "USD",
    locale = "en-US",
    showDivider = true,
    style: $styleOverride,
  } = props

  const { themed } = useAppTheme()

  const formatPrice = (amount: number, isDiscount = false): string => {
    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(Math.abs(amount))
    return isDiscount ? `-${formatted}` : formatted
  }

  const $containerStyle: StyleProp<ViewStyle> = [themed($container), $styleOverride]

  return (
    <View style={$containerStyle}>
      {items.map((item, index) => {
        const $rowStyle: StyleProp<ViewStyle> = [themed($row)]
        const $labelStyle: StyleProp<TextStyle> = [
          themed($label),
          item.isBold && themed($boldText),
        ]
        const $amountStyle: StyleProp<TextStyle> = [
          themed($amount),
          item.isBold && themed($boldText),
          item.isDiscount && themed($discountText),
          item.isHighlight && themed($highlightText),
        ]

        return (
          <View key={index} style={$rowStyle}>
            <Text text={item.label} tx={item.labelTx} style={$labelStyle} />
            <Text
              text={formatPrice(item.amount, item.isDiscount)}
              style={$amountStyle}
            />
          </View>
        )
      })}

      {showDivider && <Divider spacing="sm" />}

      <View style={themed($totalRow)}>
        <Text
          text={totalLabel}
          tx={totalLabelTx}
          style={themed($totalLabel)}
        />
        <Text text={formatPrice(total)} style={themed($totalAmount)} />
      </View>
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.sand100,
  borderRadius: spacing.sm,
  padding: spacing.md,
})

const $row: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: spacing.xxs,
})

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
  flex: 1,
})

const $amount: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand900,
  fontFamily: typography.primary.medium,
})

const $boldText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.semiBold,
})

const $discountText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.seafoam500,
})

const $highlightText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.seafoam500,
})

const $totalRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: spacing.xs,
})

const $totalLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand900,
  fontFamily: typography.primary.semiBold,
  fontSize: 16,
})

const $totalAmount: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.sand900,
  fontFamily: typography.primary.bold,
  fontSize: 18,
})
