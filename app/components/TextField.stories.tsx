import { useState } from "react"
import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Button } from "./Button"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { TextField } from "./TextField"
import { colors } from "../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  amountContainer: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 24,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: -2,
    textAlign: "center",
  },
  amountLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1,
  },
  amountWrapper: {
    backgroundColor: colors.transparent,
    borderWidth: 0,
  },
  balanceRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    marginTop: 8,
  },
  balanceText: {
    color: colors.palette.neutral500,
  },
  balanceValue: {
    color: colors.palette.badgeMint,
  },
  buttonPill: {
    borderRadius: 28,
  },
  buttonPrimary: {
    backgroundColor: colors.palette.primary400,
  },
  currencyPrefix: {
    alignItems: "center",
    justifyContent: "center",
  },
  currencyText: {
    color: colors.palette.neutral400,
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: -2,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    padding: 24,
  },
  divider: {
    backgroundColor: colors.palette.neutral300,
    height: 1,
    marginVertical: 8,
  },
  fieldGroup: {
    gap: 16,
  },
  formCard: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 24,
    gap: 24,
    padding: 28,
  },
  formHeader: {
    gap: 4,
  },
  formSubtitle: {
    color: colors.palette.neutral600,
  },
  iconAccessory: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  investmentCard: {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral300,
    borderRadius: 24,
    borderWidth: 1,
    gap: 24,
    padding: 28,
  },
  otpContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  otpInput: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderColor: colors.palette.neutral300,
    borderRadius: 12,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    width: 48,
  },
  otpInputFocused: {
    borderColor: colors.palette.primary400,
    borderWidth: 2,
  },
  otpText: {
    color: colors.palette.neutral900,
    fontSize: 24,
    fontWeight: "600",
  },
  presetAmount: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 12,
    flex: 1,
    paddingVertical: 14,
  },
  presetAmountSelected: {
    backgroundColor: colors.palette.primary400,
  },
  presetAmountText: {
    color: colors.palette.neutral700,
    fontWeight: "600",
  },
  presetAmountTextSelected: {
    color: colors.palette.neutral100,
  },
  presetRow: {
    flexDirection: "row",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowField: {
    flex: 1,
  },
  searchInput: {
    borderRadius: 28,
  },
  sectionLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  showcaseCard: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 20,
    gap: 20,
    padding: 24,
  },
  showcaseContainer: {
    gap: 32,
  },
  showcaseDivider: {
    backgroundColor: colors.palette.neutral300,
    height: 1,
    marginVertical: 4,
  },
  stateColumn: {
    flex: 1,
    gap: 8,
  },
  stateGrid: {
    gap: 16,
  },
  stateLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1,
  },
  stepHeader: {
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  stepNumber: {
    color: colors.palette.neutral100,
    fontWeight: "700",
  },
  stepNumberBadge: {
    alignItems: "center",
    backgroundColor: colors.palette.primary400,
    borderRadius: 14,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  stepSubtitle: {
    color: colors.palette.neutral600,
    textAlign: "center",
  },
  stepTitle: {
    color: colors.palette.neutral900,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  verificationCard: {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral300,
    borderRadius: 24,
    borderWidth: 1,
    gap: 32,
    padding: 32,
  },
  verificationFooter: {
    alignItems: "center",
    gap: 16,
  },
  verificationHeader: {
    alignItems: "center",
    gap: 8,
  },
  verificationLink: {
    color: colors.palette.primary400,
  },
})

/**
 * TextField Stories
 *
 * Premium form inputs for the Beyond Equity investment platform.
 * Inspired by Wealthsimple's clean forms and Public's input clarity.
 *
 * Design principles:
 * - Generous touch targets (min 44px height)
 * - Clear labels with helper text
 * - Pill-shaped search inputs
 * - Large currency inputs for investment flows
 * - OTP verification patterns
 */
const meta = {
  title: "Forms/TextField",
  component: TextField,
  argTypes: {
    status: {
      control: "select",
      options: [undefined, "error", "disabled"],
      description: "Input state",
    },
    label: {
      control: "text",
      description: "Field label",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    helper: {
      control: "text",
      description: "Helper text below input",
    },
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
  },
}

export const WithHelper: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
    helper: "We'll send a verification code to this number",
  },
}

export const WithError: Story = {
  args: {
    label: "Social Security Number",
    placeholder: "XXX-XX-XXXX",
    helper: "Invalid SSN format. Please check and try again.",
    status: "error",
  },
}

export const Disabled: Story = {
  args: {
    label: "Account Number",
    placeholder: "Auto-generated",
    status: "disabled",
    value: "BEGM-2024-001234",
  },
}

// =============================================================================
// SEARCH INPUTS (Public inspired)
// =============================================================================

export const SearchPill: Story = {
  name: "Search: Pill Style",
  render: () => (
    <TextField
      placeholder="Search stocks, ETFs, crypto..."
      LeftAccessory={() => (
        <View style={styles.iconAccessory}>
          <Icon icon="view" size={20} color={colors.palette.neutral500} />
        </View>
      )}
      inputWrapperStyle={styles.searchInput}
    />
  ),
}

export const SearchWithClear: Story = {
  name: "Search: With Clear",
  render: () => (
    <TextField
      placeholder="Search your portfolio..."
      value="AAPL"
      LeftAccessory={() => (
        <View style={styles.iconAccessory}>
          <Icon icon="view" size={20} color={colors.palette.neutral500} />
        </View>
      )}
      RightAccessory={() => (
        <View style={styles.iconAccessory}>
          <Icon icon="x" size={18} color={colors.palette.neutral400} />
        </View>
      )}
      inputWrapperStyle={styles.searchInput}
    />
  ),
}

// =============================================================================
// PASSWORD INPUT
// =============================================================================

export const PasswordInput: Story = {
  name: "Password",
  render: () => (
    <TextField
      label="Password"
      placeholder="Enter your password"
      secureTextEntry
      RightAccessory={() => (
        <View style={styles.iconAccessory}>
          <Icon icon="hidden" size={20} color={colors.palette.neutral500} />
        </View>
      )}
    />
  ),
}

// =============================================================================
// INVESTMENT AMOUNT (Cash App inspired)
// =============================================================================

export const InvestmentAmount: Story = {
  name: "Investment: Amount Entry",
  render: function InvestmentAmountStory() {
    const [amount, setAmount] = useState("5,000")
    const [selectedPreset, setSelectedPreset] = useState<string | null>("$5,000")

    return (
      <View style={styles.investmentCard}>
        <View style={styles.amountContainer}>
          <Text size="xs" weight="medium" text="INVESTMENT AMOUNT" style={styles.amountLabel} />
          <View style={styles.row}>
            <View style={styles.currencyPrefix}>
              <Text style={styles.currencyText}>$</Text>
            </View>
            <TextField
              placeholder="0"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              style={styles.amountInput}
              inputWrapperStyle={styles.amountWrapper}
            />
          </View>
          <View style={styles.balanceRow}>
            <Text size="xs" text="Available:" style={styles.balanceText} />
            <Text size="xs" weight="semiBold" text="$24,892.45" style={styles.balanceValue} />
          </View>
        </View>

        <View style={styles.presetRow}>
          {["$500", "$1,000", "$5,000"].map((preset) => (
            <View
              key={preset}
              style={[
                styles.presetAmount,
                selectedPreset === preset && styles.presetAmountSelected,
              ]}
              onTouchEnd={() => {
                setSelectedPreset(preset)
                setAmount(preset.replace("$", "").replace(",", ""))
              }}
            >
              <Text
                weight="semiBold"
                text={preset}
                style={[
                  styles.presetAmountText,
                  selectedPreset === preset && styles.presetAmountTextSelected,
                ]}
              />
            </View>
          ))}
        </View>

        <Button
          text="Review Investment"
          preset="reversed"
          style={[styles.buttonPill, styles.buttonPrimary]}
          RightAccessory={({ style }) => (
            <Icon icon="caretRight" size={18} color={colors.palette.neutral100} style={style} />
          )}
          onPress={() => {}}
        />
      </View>
    )
  },
}

// =============================================================================
// OTP VERIFICATION (Wealthsimple inspired)
// =============================================================================

export const OTPVerification: Story = {
  name: "Verification: OTP Code",
  render: () => (
    <View style={styles.verificationCard}>
      <View style={styles.verificationHeader}>
        <Text preset="heading" text="Enter verification code" style={styles.stepTitle} />
        <Text
          size="sm"
          text="We sent a 6-digit code to (555) ***-4567"
          style={styles.stepSubtitle}
        />
      </View>

      <View style={styles.otpContainer}>
        {["5", "5", "5", "", "", ""].map((digit, i) => (
          <View key={i} style={[styles.otpInput, i === 3 && styles.otpInputFocused]}>
            <Text text={digit} style={styles.otpText} />
          </View>
        ))}
      </View>

      <View style={styles.verificationFooter}>
        <Button
          text="Verify"
          preset="reversed"
          style={[styles.buttonPill, styles.buttonPrimary]}
          onPress={() => {}}
        />
        <Text size="sm" text="Resend code" style={styles.verificationLink} />
      </View>
    </View>
  ),
}

// =============================================================================
// KYC ONBOARDING FORMS
// =============================================================================

export const KYCPersonalInfo: Story = {
  name: "KYC: Personal Info",
  render: () => (
    <View style={styles.formCard}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumberBadge}>
          <Text size="xs" text="1" style={styles.stepNumber} />
        </View>
        <Text preset="subheading" text="Personal Information" style={styles.stepTitle} />
        <Text size="sm" text="Required for account verification" style={styles.stepSubtitle} />
      </View>
      <View style={styles.divider} />
      <View style={styles.fieldGroup}>
        <View style={styles.row}>
          <View style={styles.rowField}>
            <TextField label="First Name" placeholder="John" />
          </View>
          <View style={styles.rowField}>
            <TextField label="Last Name" placeholder="Smith" />
          </View>
        </View>
        <TextField
          label="Date of Birth"
          placeholder="MM/DD/YYYY"
          helper="Must be 18 or older to invest"
        />
        <TextField
          label="Social Security Number"
          placeholder="XXX-XX-XXXX"
          secureTextEntry
          helper="Required for tax reporting (IRS Form W-9)"
          RightAccessory={() => (
            <View style={styles.iconAccessory}>
              <Icon icon="lock" size={18} color={colors.palette.neutral500} />
            </View>
          )}
        />
      </View>
    </View>
  ),
}

export const KYCAddress: Story = {
  name: "KYC: Address",
  render: () => (
    <View style={styles.formCard}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumberBadge}>
          <Text size="xs" text="2" style={styles.stepNumber} />
        </View>
        <Text preset="subheading" text="Residential Address" style={styles.stepTitle} />
        <Text size="sm" text="Must be a U.S. address" style={styles.stepSubtitle} />
      </View>
      <View style={styles.divider} />
      <View style={styles.fieldGroup}>
        <TextField label="Street Address" placeholder="123 Main Street" />
        <TextField label="Apartment, suite, etc." placeholder="Apt 4B (optional)" />
        <View style={styles.row}>
          <View style={styles.rowField}>
            <TextField label="City" placeholder="New York" />
          </View>
          <View style={styles.rowField}>
            <TextField label="State" placeholder="NY" />
          </View>
        </View>
        <TextField label="ZIP Code" placeholder="10001" keyboardType="number-pad" />
      </View>
    </View>
  ),
}

export const BankLinking: Story = {
  name: "Bank: Link Account",
  render: () => (
    <View style={styles.formCard}>
      <View style={styles.formHeader}>
        <Text preset="subheading" text="Link Bank Account" />
        <Text size="sm" text="For ACH transfers and distributions" style={styles.formSubtitle} />
      </View>
      <View style={styles.divider} />
      <View style={styles.fieldGroup}>
        <TextField label="Account Holder Name" placeholder="John Smith" />
        <TextField
          label="Routing Number"
          placeholder="9 digits"
          keyboardType="number-pad"
          helper="Found on your checks or bank statement"
        />
        <TextField
          label="Account Number"
          placeholder="Enter account number"
          keyboardType="number-pad"
          secureTextEntry
          RightAccessory={() => (
            <View style={styles.iconAccessory}>
              <Icon icon="lock" size={18} color={colors.palette.neutral500} />
            </View>
          )}
        />
        <TextField
          label="Confirm Account Number"
          placeholder="Re-enter account number"
          keyboardType="number-pad"
          secureTextEntry
        />
      </View>
    </View>
  ),
}

// =============================================================================
// INPUT STATES SHOWCASE
// =============================================================================

export const AllStates: Story = {
  name: "All Input States",
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="INPUT STATES" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.stateGrid}>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="DEFAULT" style={styles.stateLabel} />
            <TextField placeholder="Enter text..." />
          </View>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="WITH VALUE" style={styles.stateLabel} />
            <TextField placeholder="Enter text..." value="john@beyondequity.com" />
          </View>
        </View>
        <View style={styles.stateGrid}>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="ERROR" style={styles.stateLabel} />
            <TextField
              placeholder="Enter text..."
              value="invalid@"
              status="error"
              helper="Invalid email"
            />
          </View>
          <View style={styles.stateColumn}>
            <Text size="xxs" text="DISABLED" style={styles.stateLabel} />
            <TextField placeholder="Cannot edit" status="disabled" value="Read only" />
          </View>
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// SEARCH SHOWCASE
// =============================================================================

export const SearchShowcase: Story = {
  name: "Search Showcase",
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="SEARCH INPUTS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.fieldGroup}>
          <TextField
            placeholder="Search investments..."
            LeftAccessory={() => (
              <View style={styles.iconAccessory}>
                <Icon icon="view" size={20} color={colors.palette.neutral500} />
              </View>
            )}
            inputWrapperStyle={styles.searchInput}
          />
          <TextField
            placeholder="Filter by asset type..."
            LeftAccessory={() => (
              <View style={styles.iconAccessory}>
                <Icon icon="components" size={20} color={colors.palette.neutral500} />
              </View>
            )}
            RightAccessory={() => (
              <View style={styles.iconAccessory}>
                <Icon icon="caretRight" size={16} color={colors.palette.neutral400} />
              </View>
            )}
            inputWrapperStyle={styles.searchInput}
          />
        </View>
      </View>
    </View>
  ),
}
