import { useState } from "react"
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { TextField } from "../TextField"
import { Button } from "../Button"
import { Card } from "../Card"
import { PriceBreakdown } from "../PriceBreakdown"
import { Badge } from "../Badge"

export interface BidSubmissionFormProps {
  /**
   * Current highest bid amount
   */
  currentBid: number
  /**
   * Minimum bid increment
   * @default 10
   */
  minIncrement?: number
  /**
   * Starting/minimum bid amount
   */
  startingBid?: number
  /**
   * Currency code
   * @default "USD"
   */
  currency?: string
  /**
   * Whether the form is in a loading/submitting state
   */
  loading?: boolean
  /**
   * Error message to display
   */
  error?: string
  /**
   * Whether to show price breakdown
   * @default true
   */
  showBreakdown?: boolean
  /**
   * Buyer's premium percentage
   * @default 5
   */
  buyersPremiumPercent?: number
  /**
   * Callback when bid is submitted
   */
  onSubmit: (amount: number) => void
  /**
   * Callback when form is cancelled
   */
  onCancel?: () => void
  /**
   * Quick bid amounts to show as buttons
   */
  quickBidAmounts?: number[]
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

/**
 * BidSubmissionForm component for placing bids on auctions.
 * Shows current bid, input for new bid, quick bid buttons, and price breakdown.
 *
 * @param {BidSubmissionFormProps} props - The props for the `BidSubmissionForm` component.
 * @returns {JSX.Element} The rendered `BidSubmissionForm` component.
 *
 * @example
 * <BidSubmissionForm
 *   currentBid={1500}
 *   minIncrement={50}
 *   onSubmit={(amount) => placeBid(amount)}
 *   onCancel={() => closeForm()}
 * />
 */
export function BidSubmissionForm(props: BidSubmissionFormProps) {
  const {
    currentBid,
    minIncrement = 10,
    startingBid,
    currency = "USD",
    loading = false,
    error,
    showBreakdown = true,
    buyersPremiumPercent = 5,
    onSubmit,
    onCancel,
    quickBidAmounts,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const minimumBid = Math.max(currentBid + minIncrement, startingBid || 0)
  const [bidAmount, setBidAmount] = useState(minimumBid.toString())
  const [inputError, setInputError] = useState<string | undefined>()

  const parsedBidAmount = parseFloat(bidAmount) || 0

  const formatPrice = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleBidAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const cleaned = value.replace(/[^0-9.]/g, "")
    setBidAmount(cleaned)
    setInputError(undefined)
  }

  const handleQuickBid = (amount: number) => {
    setBidAmount(amount.toString())
    setInputError(undefined)
  }

  const validateAndSubmit = () => {
    const amount = parseFloat(bidAmount)

    if (isNaN(amount) || amount <= 0) {
      setInputError("Please enter a valid bid amount")
      return
    }

    if (amount < minimumBid) {
      setInputError(`Minimum bid is ${formatPrice(minimumBid)}`)
      return
    }

    setInputError(undefined)
    onSubmit(amount)
  }

  // Calculate quick bid amounts if not provided
  const defaultQuickBids = quickBidAmounts || [
    minimumBid,
    minimumBid + minIncrement * 2,
    minimumBid + minIncrement * 5,
  ]

  // Calculate price breakdown
  const buyersPremium = parsedBidAmount * (buyersPremiumPercent / 100)
  const total = parsedBidAmount + buyersPremium

  const breakdownItems = [
    { label: "Your Bid", amount: parsedBidAmount },
    { label: `Buyer's Premium (${buyersPremiumPercent}%)`, amount: buyersPremium },
  ]

  return (
    <Card style={$styleOverride}>
      <View style={themed($content)}>
        {/* Current bid info */}
        <View style={themed($currentBidSection)}>
          <Text text="Current Highest Bid" size="xs" style={themed($label)} />
          <Text text={formatPrice(currentBid)} preset="bold" style={themed($currentBidAmount)} />
        </View>

        {/* Bid input */}
        <View style={themed($inputSection)}>
          <Text text="Your Bid" size="sm" weight="medium" style={themed($inputLabel)} />
          <TextField
            value={bidAmount}
            onChangeText={handleBidAmountChange}
            keyboardType="numeric"
            placeholder={`Min: ${formatPrice(minimumBid)}`}
            status={inputError || error ? "error" : undefined}
            helper={inputError || error}
            LeftAccessory={() => (
              <Text text={currency === "USD" ? "$" : currency} style={themed($currencyPrefix)} />
            )}
          />
        </View>

        {/* Quick bid buttons */}
        <View style={themed($quickBidsSection)}>
          <Text text="Quick Bid" size="xs" style={themed($label)} />
          <View style={themed($quickBidsRow)}>
            {defaultQuickBids.map((amount) => (
              <Pressable
                key={amount}
                style={[
                  themed($quickBidButton),
                  parsedBidAmount === amount && themed($quickBidButtonActive),
                ]}
                onPress={() => handleQuickBid(amount)}
              >
                <Text
                  text={formatPrice(amount)}
                  size="sm"
                  style={[
                    themed($quickBidText),
                    parsedBidAmount === amount && themed($quickBidTextActive),
                  ]}
                />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Price breakdown */}
        {showBreakdown && parsedBidAmount > 0 && (
          <View style={themed($breakdownSection)}>
            <PriceBreakdown
              items={breakdownItems}
              total={total}
              currency={currency}
              showSubtotal={false}
            />
          </View>
        )}

        {/* Validation message */}
        {parsedBidAmount > 0 && parsedBidAmount >= minimumBid && (
          <View style={themed($validationSection)}>
            <Badge text="Valid Bid" status="success" size="sm" badgeStyle="subtle" />
            <Text
              text={`Your bid is ${formatPrice(parsedBidAmount - currentBid)} above current bid`}
              size="xs"
              style={themed($validationText)}
            />
          </View>
        )}

        {/* Action buttons */}
        <View style={themed($actionsSection)}>
          {onCancel && (
            <Button
              text="Cancel"
              preset="default"
              onPress={onCancel}
              disabled={loading}
              style={themed($cancelButton)}
            />
          )}
          <Button
            text={loading ? "Placing Bid..." : "Place Bid"}
            preset="reversed"
            onPress={validateAndSubmit}
            disabled={loading || parsedBidAmount < minimumBid}
            style={themed($submitButton)}
          />
        </View>

        {/* Disclaimer */}
        <Text
          text="By placing a bid, you agree to our terms and conditions."
          size="xxs"
          style={themed($disclaimer)}
        />
      </View>
    </Card>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.md,
})

const $currentBidSection: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  alignItems: "center",
  paddingBottom: spacing.md,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.sand300,
})

const $label: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  textTransform: "uppercase",
  letterSpacing: 1,
})

const $currentBidAmount: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontSize: 28,
  color: colors.palette.ocean600,
})

const $inputSection: ThemedStyle<ViewStyle> = () => ({})

const $inputLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
  marginBottom: 4,
})

const $currencyPrefix: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand600,
  marginLeft: spacing.sm,
})

const $quickBidsSection: ThemedStyle<ViewStyle> = () => ({})

const $quickBidsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xs,
  marginTop: spacing.xs,
})

const $quickBidButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.sand400,
  backgroundColor: colors.palette.sand100,
  alignItems: "center",
})

const $quickBidButtonActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.palette.ocean500,
  backgroundColor: colors.palette.ocean100,
})

const $quickBidText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
})

const $quickBidTextActive: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
  fontWeight: "600",
})

const $breakdownSection: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingTop: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand300,
})

const $validationSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $validationText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.seafoam500,
})

const $actionsSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
  marginTop: spacing.sm,
})

const $cancelButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $submitButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 2,
  backgroundColor: colors.palette.ocean500,
})

const $disclaimer: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
  textAlign: "center",
})
