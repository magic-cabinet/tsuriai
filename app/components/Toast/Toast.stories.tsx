import { useState } from "react"
import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Toast } from "./Toast"
import { ToastProvider, useToast } from "./ToastProvider"
import { Button } from "../Button"
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
    minHeight: 400,
  },
  demoContainer: {
    gap: 12,
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
  section: {
    gap: 12,
  },
  sectionLabel: {
    color: colors.palette.sand600,
    letterSpacing: 1.2,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  toastRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
})

/**
 * Toast Stories
 *
 * Toast/Snackbar notification component for displaying temporary messages.
 * Features auto-dismiss, action buttons, and queue management.
 *
 * Design principles:
 * - Smooth slide in/out animations using Reanimated
 * - Clear status communication through seaside colors
 * - Support for top and bottom positioning
 * - Optional action buttons and dismiss controls
 * - Queue management for multiple toasts
 */
const meta = {
  title: "Core/Toast",
  component: Toast,
  argTypes: {
    type: {
      control: "select",
      options: ["success", "error", "warning", "info"],
      description: "Type of toast affecting icon and color scheme",
    },
    position: {
      control: "select",
      options: ["top", "bottom"],
      description: "Position of the toast",
    },
    duration: {
      control: "number",
      description: "Duration in milliseconds before auto-dismiss (0 to disable)",
    },
    text: {
      control: "text",
      description: "Toast message text",
    },
    actionText: {
      control: "text",
      description: "Optional action button text",
    },
    dismissible: {
      control: "boolean",
      description: "Whether to show the dismiss button",
    },
  },
  args: {
    text: "This is a toast message",
    type: "info",
    position: "bottom",
    duration: 3000,
    dismissible: true,
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// INTERACTIVE DEMOS (using ToastProvider)
// =============================================================================

/**
 * Demo component to show toast types
 */
function ToastTypesDemo() {
  const { success, error, warning, info } = useToast()

  return (
    <View style={styles.demoContainer}>
      <Text size="xs" weight="medium" text="TAP TO SHOW TOAST" style={styles.sectionLabel} />
      <Button text="Success Toast" preset="filled" onPress={() => success("Fresh catch added to cart!")} />
      <Button text="Error Toast" preset="filled" onPress={() => error("Failed to load auction details")} />
      <Button text="Warning Toast" preset="filled" onPress={() => warning("Auction ending in 5 minutes")} />
      <Button text="Info Toast" preset="filled" onPress={() => info("New fish available in market")} />
    </View>
  )
}

export const AllTypes: Story = {
  name: "Interactive: All Types",
  render: () => (
    <ToastProvider>
      <ToastTypesDemo />
    </ToastProvider>
  ),
}

/**
 * Demo component to show toast positions
 */
function ToastPositionsDemo() {
  const { showToast } = useToast()

  return (
    <View style={styles.demoContainer}>
      <Text size="xs" weight="medium" text="TAP TO SHOW TOAST" style={styles.sectionLabel} />
      <Button
        text="Toast at Top"
        preset="filled"
        onPress={() => showToast({ text: "Toast displayed at top", type: "success", position: "top" })}
      />
      <Button
        text="Toast at Bottom"
        preset="filled"
        onPress={() => showToast({ text: "Toast displayed at bottom", type: "info", position: "bottom" })}
      />
    </View>
  )
}

export const Positions: Story = {
  name: "Interactive: Positions",
  render: () => (
    <ToastProvider>
      <ToastPositionsDemo />
    </ToastProvider>
  ),
}

/**
 * Demo component to show toast with action button
 */
function ToastWithActionDemo() {
  const { showToast } = useToast()

  const handleShowWithAction = () => {
    showToast({
      text: "Item removed from cart",
      type: "error",
      position: "bottom",
      actionText: "UNDO",
      onAction: () => {
        showToast({
          text: "Item restored!",
          type: "success",
          duration: 2000,
        })
      },
    })
  }

  return (
    <View style={styles.demoContainer}>
      <Text size="xs" weight="medium" text="TAP TO SHOW TOAST" style={styles.sectionLabel} />
      <Button text="Toast with Action" preset="filled" onPress={handleShowWithAction} />
    </View>
  )
}

export const WithAction: Story = {
  name: "Interactive: With Action Button",
  render: () => (
    <ToastProvider>
      <ToastWithActionDemo />
    </ToastProvider>
  ),
}

/**
 * Demo component to show custom duration
 */
function ToastDurationDemo() {
  const { showToast } = useToast()

  return (
    <View style={styles.demoContainer}>
      <Text size="xs" weight="medium" text="TAP TO SHOW TOAST" style={styles.sectionLabel} />
      <Button
        text="Quick (1s)"
        preset="filled"
        onPress={() => showToast({ text: "Quick toast", type: "info", duration: 1000 })}
      />
      <Button
        text="Normal (3s)"
        preset="filled"
        onPress={() => showToast({ text: "Normal toast", type: "success", duration: 3000 })}
      />
      <Button
        text="Long (5s)"
        preset="filled"
        onPress={() => showToast({ text: "Long toast", type: "warning", duration: 5000 })}
      />
      <Button
        text="Persistent (no auto-dismiss)"
        preset="filled"
        onPress={() => showToast({ text: "Tap X to dismiss", type: "error", duration: 0 })}
      />
    </View>
  )
}

export const CustomDuration: Story = {
  name: "Interactive: Custom Duration",
  render: () => (
    <ToastProvider>
      <ToastDurationDemo />
    </ToastProvider>
  ),
}

/**
 * Demo component to show multiple toasts queued
 */
function MultipleToastsDemo() {
  const { showToast } = useToast()

  const handleShowMultiple = () => {
    showToast({ text: "First toast", type: "success", position: "top", duration: 2000 })
    setTimeout(() => {
      showToast({ text: "Second toast", type: "info", position: "top", duration: 2000 })
    }, 500)
    setTimeout(() => {
      showToast({ text: "Third toast", type: "warning", position: "top", duration: 2000 })
    }, 1000)
  }

  return (
    <View style={styles.demoContainer}>
      <Text size="xs" weight="medium" text="TAP TO SHOW TOAST" style={styles.sectionLabel} />
      <Button text="Show Multiple Toasts" preset="filled" onPress={handleShowMultiple} />
    </View>
  )
}

export const MultipleToasts: Story = {
  name: "Interactive: Multiple Toasts Queue",
  render: () => (
    <ToastProvider>
      <MultipleToastsDemo />
    </ToastProvider>
  ),
}

// =============================================================================
// STATIC EXAMPLES (direct Toast component)
// =============================================================================

/**
 * Static toast example wrapper
 */
function StaticToastWrapper({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <Button text="Show Toast Again" preset="filled" onPress={() => setVisible(true)} />
    )
  }

  return <>{children}</>
}

export const Success: Story = {
  name: "Static: Success",
  render: () => (
    <StaticToastWrapper>
      <Toast text="Fresh catch added to cart!" type="success" position="top" duration={0} />
    </StaticToastWrapper>
  ),
}

export const Error: Story = {
  name: "Static: Error",
  render: () => (
    <StaticToastWrapper>
      <Toast text="Failed to load auction details" type="error" position="top" duration={0} />
    </StaticToastWrapper>
  ),
}

export const Warning: Story = {
  name: "Static: Warning",
  render: () => (
    <StaticToastWrapper>
      <Toast text="Auction ending in 5 minutes" type="warning" position="top" duration={0} />
    </StaticToastWrapper>
  ),
}

export const Info: Story = {
  name: "Static: Info",
  render: () => (
    <StaticToastWrapper>
      <Toast text="New fish available in market" type="info" position="top" duration={0} />
    </StaticToastWrapper>
  ),
}

export const WithActionButton: Story = {
  name: "Static: With Action Button",
  render: () => (
    <StaticToastWrapper>
      <Toast
        text="Item removed from cart"
        type="error"
        position="bottom"
        duration={0}
        actionText="UNDO"
        onAction={() => console.log("Action pressed")}
      />
    </StaticToastWrapper>
  ),
}

export const LongMessage: Story = {
  name: "Static: Long Message",
  render: () => (
    <StaticToastWrapper>
      <Toast
        text="Your bid has been placed successfully! You are currently the highest bidder for Wild Salmon (3.2 kg)."
        type="success"
        position="top"
        duration={0}
      />
    </StaticToastWrapper>
  ),
}

// =============================================================================
// FISHING APP CONTEXTS
// =============================================================================

/**
 * Demo component for fishing app scenarios
 */
function FishingAppDemo() {
  const { success, error, warning, info, showToast } = useToast()

  return (
    <View style={styles.demoContainer}>
      <Text size="xs" weight="medium" text="FISHING APP SCENARIOS" style={styles.sectionLabel} />
      <Button
        text="Bid Placed"
        preset="filled"
        onPress={() => success("Bid placed successfully!")}
      />
      <Button
        text="Auction Won"
        preset="filled"
        onPress={() =>
          showToast({
            text: "Congratulations! You won the auction",
            type: "success",
            actionText: "VIEW",
            onAction: () => console.log("View auction"),
          })
        }
      />
      <Button
        text="Auction Ending Soon"
        preset="filled"
        onPress={() => warning("Auction ends in 2 minutes!")}
      />
      <Button
        text="Out of Stock"
        preset="filled"
        onPress={() => error("This item is no longer available")}
      />
      <Button
        text="New Listing"
        preset="filled"
        onPress={() =>
          showToast({
            text: "Fresh Tuna just listed nearby",
            type: "info",
            actionText: "VIEW",
            onAction: () => console.log("View listing"),
          })
        }
      />
    </View>
  )
}

export const FishingAppScenarios: Story = {
  name: "Fishing App: Common Scenarios",
  render: () => (
    <ToastProvider>
      <FishingAppDemo />
    </ToastProvider>
  ),
}

// =============================================================================
// COMPLETE SHOWCASE
// =============================================================================

/**
 * Complete showcase component
 */
function CompleteShowcaseDemo() {
  const { success, error, warning, info } = useToast()

  return (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="TOAST SHOWCASE" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />

      <View style={styles.section}>
        <Text size="xxs" text="Status Types" style={styles.sectionLabel} />
        <View style={styles.toastRow}>
          <Button text="Success" preset="filled" onPress={() => success("Success!")} />
          <Button text="Error" preset="filled" onPress={() => error("Error!")} />
          <Button text="Warning" preset="filled" onPress={() => warning("Warning!")} />
          <Button text="Info" preset="filled" onPress={() => info("Info!")} />
        </View>
      </View>

      <View style={styles.section}>
        <Text size="xxs" text="With Actions" style={styles.sectionLabel} />
        <View style={styles.toastRow}>
          <Button
            text="Success + Action"
            preset="filled"
            onPress={() =>
              success("Item added!", {
                actionText: "UNDO",
                onAction: () => console.log("Undo"),
              })
            }
          />
          <Button
            text="Error + Action"
            preset="filled"
            onPress={() =>
              error("Failed to save", {
                actionText: "RETRY",
                onAction: () => console.log("Retry"),
              })
            }
          />
        </View>
      </View>
    </View>
  )
}

export const CompleteShowcase: Story = {
  name: "Complete Toast Showcase",
  render: () => (
    <ToastProvider>
      <CompleteShowcaseDemo />
    </ToastProvider>
  ),
}
