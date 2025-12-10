import { useState } from "react"
import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Text } from "./Text"
import { colors } from "../theme/colors"
import { Checkbox } from "./Toggle/Checkbox"
import { Radio } from "./Toggle/Radio"
import { Switch } from "./Toggle/Switch"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  checkboxGroup: {
    gap: 4,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
    padding: 20,
  },
  divider: {
    backgroundColor: colors.palette.neutral300,
    height: 1,
    marginVertical: 8,
  },
  fundingOption: {
    backgroundColor: colors.palette.neutral200,
    borderColor: colors.palette.neutral300,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  fundingOptionAmount: {
    color: colors.palette.neutral900,
  },
  fundingOptionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  fundingOptionFee: {
    color: colors.palette.neutral500,
  },
  fundingOptionRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fundingOptionSelected: {
    borderColor: colors.palette.primary400,
    borderWidth: 2,
  },
  fundingOptionTitle: {
    color: colors.palette.neutral900,
  },
  fundingOptionsGroup: {
    gap: 12,
  },
  notificationItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  notificationSubtitle: {
    color: colors.palette.neutral600,
    marginTop: 2,
  },
  notificationText: {
    flex: 1,
    marginRight: 16,
  },
  optionDescription: {
    color: colors.palette.neutral600,
    marginLeft: 36,
    marginTop: 2,
  },
  optionRow: {
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.palette.neutral900,
    marginBottom: 16,
  },
  settingsCard: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 16,
    gap: 0,
    padding: 20,
  },
  settingsHeader: {
    gap: 4,
    marginBottom: 16,
  },
  settingsSubtitle: {
    color: colors.palette.neutral600,
  },
  showcaseContainer: {
    gap: 32,
  },
  showcaseGroup: {
    gap: 16,
  },
  showcaseRow: {
    flexDirection: "row",
    gap: 24,
  },
  stateColumn: {
    alignItems: "center",
    gap: 8,
  },
  stateLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 0.5,
    textAlign: "center",
  },
})

/**
 * Toggle Stories
 *
 * Checkbox, Radio, and Switch components for the Beyond Equity platform.
 * Used in settings, preferences, onboarding agreements, and trading options.
 */
const meta = {
  title: "Forms/Toggle",
  component: Checkbox,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// CHECKBOX
// =============================================================================

export const CheckboxDefault: Story = {
  name: "Checkbox: Default",
  render: function CheckboxDefaultStory() {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        label="I agree to the terms and conditions"
        value={checked}
        onValueChange={setChecked}
      />
    )
  },
}

export const CheckboxChecked: Story = {
  name: "Checkbox: Checked",
  render: function CheckboxCheckedStory() {
    const [checked, setChecked] = useState(true)
    return (
      <Checkbox
        label="Enable two-factor authentication"
        value={checked}
        onValueChange={setChecked}
      />
    )
  },
}

export const CheckboxWithHelper: Story = {
  name: "Checkbox: With Helper",
  render: function CheckboxHelperStory() {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        label="Enable margin trading"
        helper="Margin trading involves additional risk. Learn more before enabling."
        value={checked}
        onValueChange={setChecked}
      />
    )
  },
}

export const CheckboxDisabled: Story = {
  name: "Checkbox: Disabled",
  args: {
    label: "Account verified",
    value: true,
    status: "disabled",
  },
}

// =============================================================================
// RADIO
// =============================================================================

export const RadioDefault: Story = {
  name: "Radio: Default",
  render: function RadioDefaultStory() {
    const [selected, setSelected] = useState(false)
    return <Radio label="Market order" value={selected} onValueChange={setSelected} />
  },
}

export const RadioGroup: Story = {
  name: "Radio: Order Types",
  render: function RadioGroupStory() {
    const [orderType, setOrderType] = useState("market")
    return (
      <View style={styles.showcaseGroup}>
        <Text preset="subheading" text="Order Type" style={styles.sectionTitle} />
        <View style={styles.optionRow}>
          <Radio
            label="Market Order"
            value={orderType === "market"}
            onValueChange={() => setOrderType("market")}
          />
          <Text
            size="xs"
            text="Execute immediately at current market price"
            style={styles.optionDescription}
          />
        </View>
        <View style={styles.optionRow}>
          <Radio
            label="Limit Order"
            value={orderType === "limit"}
            onValueChange={() => setOrderType("limit")}
          />
          <Text
            size="xs"
            text="Execute only at your specified price or better"
            style={styles.optionDescription}
          />
        </View>
        <View style={styles.optionRow}>
          <Radio
            label="Stop Order"
            value={orderType === "stop"}
            onValueChange={() => setOrderType("stop")}
          />
          <Text
            size="xs"
            text="Trigger market order when price reaches your stop"
            style={styles.optionDescription}
          />
        </View>
        <View style={styles.optionRow}>
          <Radio
            label="Stop-Limit Order"
            value={orderType === "stop-limit"}
            onValueChange={() => setOrderType("stop-limit")}
          />
          <Text
            size="xs"
            text="Trigger limit order when price reaches your stop"
            style={styles.optionDescription}
          />
        </View>
      </View>
    )
  },
}

// =============================================================================
// SWITCH
// =============================================================================

export const SwitchDefault: Story = {
  name: "Switch: Default",
  render: function SwitchDefaultStory() {
    const [enabled, setEnabled] = useState(false)
    return <Switch label="Enable notifications" value={enabled} onValueChange={setEnabled} />
  },
}

export const SwitchEnabled: Story = {
  name: "Switch: Enabled",
  render: function SwitchEnabledStory() {
    const [enabled, setEnabled] = useState(true)
    return <Switch label="Dark mode" value={enabled} onValueChange={setEnabled} />
  },
}

// =============================================================================
// INVESTMENT SCENARIOS
// =============================================================================

export const OnboardingAgreements: Story = {
  name: "Onboarding: Agreements",
  render: function OnboardingAgreementsStory() {
    const [agreements, setAgreements] = useState({
      terms: false,
      privacy: false,
      esign: false,
      margin: false,
    })

    const updateAgreement = (key: keyof typeof agreements) => {
      setAgreements((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <View style={styles.settingsCard}>
        <View style={styles.settingsHeader}>
          <Text preset="subheading" text="Review & Agree" />
          <Text
            size="sm"
            text="Please review and accept the following agreements"
            style={styles.settingsSubtitle}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.checkboxGroup}>
          <Checkbox
            label="Terms of Service"
            helper="I have read and agree to the Terms of Service"
            value={agreements.terms}
            onValueChange={() => updateAgreement("terms")}
          />
          <Checkbox
            label="Privacy Policy"
            helper="I acknowledge the Privacy Policy and data practices"
            value={agreements.privacy}
            onValueChange={() => updateAgreement("privacy")}
          />
          <Checkbox
            label="E-Sign Consent"
            helper="I agree to receive documents electronically"
            value={agreements.esign}
            onValueChange={() => updateAgreement("esign")}
          />
          <Checkbox
            label="Customer Agreement"
            helper="I agree to the Brokerage Customer Agreement"
            value={agreements.margin}
            onValueChange={() => updateAgreement("margin")}
          />
        </View>
      </View>
    )
  },
}

export const NotificationSettings: Story = {
  name: "Settings: Notifications",
  render: function NotificationSettingsStory() {
    const [settings, setSettings] = useState({
      priceAlerts: true,
      orderFills: true,
      dividends: true,
      news: false,
      marketing: false,
    })

    const toggleSetting = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <View style={styles.settingsCard}>
        <View style={styles.settingsHeader}>
          <Text preset="subheading" text="Notifications" />
          <Text size="sm" text="Manage your alert preferences" style={styles.settingsSubtitle} />
        </View>
        <View style={styles.divider} />

        <View style={styles.notificationItem}>
          <View style={styles.notificationText}>
            <Text weight="medium" text="Price Alerts" />
            <Text
              size="xs"
              text="Get notified when stocks hit your targets"
              style={styles.notificationSubtitle}
            />
          </View>
          <Switch value={settings.priceAlerts} onValueChange={() => toggleSetting("priceAlerts")} />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationText}>
            <Text weight="medium" text="Order Fills" />
            <Text
              size="xs"
              text="Alerts when your orders are executed"
              style={styles.notificationSubtitle}
            />
          </View>
          <Switch value={settings.orderFills} onValueChange={() => toggleSetting("orderFills")} />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationText}>
            <Text weight="medium" text="Dividends" />
            <Text
              size="xs"
              text="Notifications for dividend payments"
              style={styles.notificationSubtitle}
            />
          </View>
          <Switch value={settings.dividends} onValueChange={() => toggleSetting("dividends")} />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationText}>
            <Text weight="medium" text="Market News" />
            <Text
              size="xs"
              text="Breaking news for your watchlist"
              style={styles.notificationSubtitle}
            />
          </View>
          <Switch value={settings.news} onValueChange={() => toggleSetting("news")} />
        </View>

        <View style={styles.notificationItem}>
          <View style={styles.notificationText}>
            <Text weight="medium" text="Marketing" />
            <Text
              size="xs"
              text="Product updates and promotions"
              style={styles.notificationSubtitle}
            />
          </View>
          <Switch value={settings.marketing} onValueChange={() => toggleSetting("marketing")} />
        </View>
      </View>
    )
  },
}

export const FundingOptions: Story = {
  name: "Funding: Transfer Speed",
  render: function FundingOptionsStory() {
    const [selected, setSelected] = useState("instant")
    return (
      <View style={styles.settingsCard}>
        <View style={styles.settingsHeader}>
          <Text preset="subheading" text="Transfer Speed" />
          <Text
            size="sm"
            text="Choose how quickly to fund your account"
            style={styles.settingsSubtitle}
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.fundingOptionsGroup}>
          <View
            style={[styles.fundingOption, selected === "instant" && styles.fundingOptionSelected]}
          >
            <View style={styles.fundingOptionRow}>
              <Radio value={selected === "instant"} onValueChange={() => setSelected("instant")} />
              <View style={styles.fundingOptionDetails}>
                <Text weight="semiBold" text="Instant" style={styles.fundingOptionTitle} />
                <Text
                  size="xs"
                  text="Available immediately, up to $5,000"
                  style={styles.fundingOptionFee}
                />
              </View>
              <Text weight="semiBold" text="Free" style={styles.fundingOptionAmount} />
            </View>
          </View>

          <View
            style={[styles.fundingOption, selected === "sameday" && styles.fundingOptionSelected]}
          >
            <View style={styles.fundingOptionRow}>
              <Radio value={selected === "sameday"} onValueChange={() => setSelected("sameday")} />
              <View style={styles.fundingOptionDetails}>
                <Text weight="semiBold" text="Same Day" style={styles.fundingOptionTitle} />
                <Text
                  size="xs"
                  text="Available by 5pm ET, up to $50,000"
                  style={styles.fundingOptionFee}
                />
              </View>
              <Text weight="semiBold" text="$5.00" style={styles.fundingOptionAmount} />
            </View>
          </View>

          <View
            style={[styles.fundingOption, selected === "standard" && styles.fundingOptionSelected]}
          >
            <View style={styles.fundingOptionRow}>
              <Radio
                value={selected === "standard"}
                onValueChange={() => setSelected("standard")}
              />
              <View style={styles.fundingOptionDetails}>
                <Text weight="semiBold" text="Standard ACH" style={styles.fundingOptionTitle} />
                <Text
                  size="xs"
                  text="1-3 business days, no limit"
                  style={styles.fundingOptionFee}
                />
              </View>
              <Text weight="semiBold" text="Free" style={styles.fundingOptionAmount} />
            </View>
          </View>
        </View>
      </View>
    )
  },
}

// =============================================================================
// SHOWCASE
// =============================================================================

export const AllToggleTypes: Story = {
  name: "All Toggle Types",
  render: function AllToggleTypesStory() {
    const [checkboxOn, setCheckboxOn] = useState(true)
    const [checkboxOff, setCheckboxOff] = useState(false)
    const [radioOn, setRadioOn] = useState(true)
    const [radioOff, setRadioOff] = useState(false)
    const [switchOn, setSwitchOn] = useState(true)
    const [switchOff, setSwitchOff] = useState(false)

    return (
      <View style={styles.showcaseContainer}>
        <View style={styles.showcaseGroup}>
          <Text preset="subheading" text="Checkbox" style={styles.sectionTitle} />
          <View style={styles.showcaseRow}>
            <View style={styles.stateColumn}>
              <Text size="xxs" text="OFF" style={styles.stateLabel} />
              <Checkbox value={checkboxOff} onValueChange={setCheckboxOff} />
            </View>
            <View style={styles.stateColumn}>
              <Text size="xxs" text="ON" style={styles.stateLabel} />
              <Checkbox value={checkboxOn} onValueChange={setCheckboxOn} />
            </View>
            <View style={styles.stateColumn}>
              <Text size="xxs" text="DISABLED" style={styles.stateLabel} />
              <Checkbox value={true} status="disabled" />
            </View>
          </View>
        </View>

        <View style={styles.showcaseGroup}>
          <Text preset="subheading" text="Radio" style={styles.sectionTitle} />
          <View style={styles.showcaseRow}>
            <View style={styles.stateColumn}>
              <Text size="xxs" text="OFF" style={styles.stateLabel} />
              <Radio value={radioOff} onValueChange={setRadioOff} />
            </View>
            <View style={styles.stateColumn}>
              <Text size="xxs" text="ON" style={styles.stateLabel} />
              <Radio value={radioOn} onValueChange={setRadioOn} />
            </View>
            <View style={styles.stateColumn}>
              <Text size="xxs" text="DISABLED" style={styles.stateLabel} />
              <Radio value={true} status="disabled" />
            </View>
          </View>
        </View>

        <View style={styles.showcaseGroup}>
          <Text preset="subheading" text="Switch" style={styles.sectionTitle} />
          <View style={styles.showcaseRow}>
            <View style={styles.stateColumn}>
              <Text size="xxs" text="OFF" style={styles.stateLabel} />
              <Switch value={switchOff} onValueChange={setSwitchOff} />
            </View>
            <View style={styles.stateColumn}>
              <Text size="xxs" text="ON" style={styles.stateLabel} />
              <Switch value={switchOn} onValueChange={setSwitchOn} />
            </View>
            <View style={styles.stateColumn}>
              <Text size="xxs" text="DISABLED" style={styles.stateLabel} />
              <Switch value={true} status="disabled" />
            </View>
          </View>
        </View>
      </View>
    )
  },
}
