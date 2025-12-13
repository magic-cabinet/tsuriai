import { useState } from "react"
import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Modal } from "./Modal"
import { Button } from "../Button"
import { Text } from "../Text"
import { TextField } from "../TextField"
import { Spinner } from "../Spinner"
import { colors } from "@/theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  buttonColumn: {
    gap: 12,
  },
  buttonPair: {
    flexDirection: "row",
    gap: 12,
  },
  buttonPairItem: {
    flex: 1,
  },
  decorator: {
    alignItems: "center",
    backgroundColor: colors.palette.sand200,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  formContent: {
    gap: 16,
  },
  listItem: {
    borderBottomColor: colors.palette.sand300,
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  modalContent: {
    gap: 16,
  },
  triggerButton: {
    backgroundColor: colors.palette.ocean500,
    borderRadius: 14,
  },
})

/**
 * Modal Stories
 *
 * Overlay modal/dialog component for the Beyond Equity investment platform.
 * Smooth animations and flexible content areas.
 *
 * Design principles:
 * - Animated entry/exit (fade + slide up)
 * - Backdrop dismiss configurable
 * - Header, body, footer slots
 * - Size variants for different use cases
 * - Loading state support
 */
const meta = {
  title: "Overlay/Modal",
  component: Modal,
  argTypes: {
    visible: {
      control: "boolean",
      description: "Whether modal is visible",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "Modal size variant",
    },
    backdropDismiss: {
      control: "boolean",
      description: "Whether tapping backdrop dismisses modal",
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show close button in header",
    },
    loading: {
      control: "boolean",
      description: "Whether modal is in loading state",
    },
  },
  args: {
    // Default args for stories using ModalWrapper (which manages state internally)
    visible: false,
    onClose: () => {},
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// INTERACTIVE WRAPPER
// =============================================================================

const ModalWrapper = ({ children, ...props }: any) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        text="Open Modal"
        preset="reversed"
        style={styles.triggerButton}
        onPress={() => setVisible(true)}
      />
      <Modal {...props} visible={visible} onClose={() => setVisible(false)}>
        {children}
      </Modal>
    </>
  )
}

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  render: () => (
    <ModalWrapper heading="Default Modal" size="md">
      <Text text="This is a default modal with standard content." />
    </ModalWrapper>
  ),
}

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const Small: Story = {
  render: () => (
    <ModalWrapper heading="Small Modal" size="sm">
      <Text text="A compact modal for quick confirmations or simple messages." />
    </ModalWrapper>
  ),
}

export const Medium: Story = {
  render: () => (
    <ModalWrapper heading="Medium Modal" size="md">
      <View style={styles.modalContent}>
        <Text text="A medium-sized modal suitable for most use cases." />
        <Text text="It provides a good balance between content space and screen coverage." />
      </View>
    </ModalWrapper>
  ),
}

export const Large: Story = {
  render: () => (
    <ModalWrapper heading="Large Modal" size="lg">
      <View style={styles.modalContent}>
        <Text preset="subheading" text="More Space" />
        <Text text="A large modal for content-rich dialogs like forms, lists, or detailed information." />
        <Text text="This size is great when you need to display multiple sections or a longer form." />
        <View style={styles.listItem}>
          <Text weight="bold" text="Feature 1" />
          <Text size="sm" text="Description of the first feature" />
        </View>
        <View style={styles.listItem}>
          <Text weight="bold" text="Feature 2" />
          <Text size="sm" text="Description of the second feature" />
        </View>
        <View style={[styles.listItem, styles.listItemLast]}>
          <Text weight="bold" text="Feature 3" />
          <Text size="sm" text="Description of the third feature" />
        </View>
      </View>
    </ModalWrapper>
  ),
}

export const FullScreen: Story = {
  name: "Full Screen",
  render: () => (
    <ModalWrapper heading="Full Screen Modal" size="full">
      <View style={styles.modalContent}>
        <Text preset="subheading" text="Maximum Space" />
        <Text text="A full-screen modal that takes up most of the viewport." />
        <Text text="Perfect for complex forms, multi-step flows, or detailed content." />
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <View key={i} style={i === 8 ? [styles.listItem, styles.listItemLast] : styles.listItem}>
            <Text weight="bold" text={`Section ${i}`} />
            <Text size="sm" text={`Content for section ${i} with enough text to demonstrate scrolling.`} />
          </View>
        ))}
      </View>
    </ModalWrapper>
  ),
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
    <View style={styles.buttonColumn}>
      <ModalWrapper heading="Small Modal" size="sm">
        <Text text="Small modal content" />
      </ModalWrapper>
      <ModalWrapper heading="Medium Modal" size="md">
        <Text text="Medium modal content" />
      </ModalWrapper>
      <ModalWrapper heading="Large Modal" size="lg">
        <Text text="Large modal content" />
      </ModalWrapper>
      <ModalWrapper heading="Full Screen Modal" size="full">
        <Text text="Full screen modal content" />
      </ModalWrapper>
    </View>
  ),
}

// =============================================================================
// WITH HEADER AND FOOTER
// =============================================================================

export const WithFooter: Story = {
  name: "With Header and Footer",
  render: () => (
    <ModalWrapper
      heading="Confirm Investment"
      size="md"
      FooterComponent={
        <View style={styles.buttonColumn}>
          <Button
            text="Confirm"
            preset="reversed"
            style={{ backgroundColor: colors.palette.ocean500, borderRadius: 14 }}
            onPress={() => console.log("Confirmed")}
          />
          <Button
            text="Cancel"
            preset="default"
            style={{ borderRadius: 14 }}
            onPress={() => console.log("Cancelled")}
          />
        </View>
      }
    >
      <View style={styles.modalContent}>
        <Text text="You are about to invest $5,000 in Sunset Tower Apartments." />
        <Text size="sm" text="This action cannot be undone." style={{ color: colors.palette.sand600 }} />
      </View>
    </ModalWrapper>
  ),
}

export const WithActionButtons: Story = {
  name: "With Action Buttons",
  render: () => (
    <ModalWrapper
      heading="Delete Account"
      size="md"
      FooterComponent={
        <View style={styles.buttonPair}>
          <View style={styles.buttonPairItem}>
            <Button
              text="Cancel"
              preset="default"
              style={{ borderRadius: 14 }}
              onPress={() => console.log("Cancelled")}
            />
          </View>
          <View style={styles.buttonPairItem}>
            <Button
              text="Delete"
              preset="reversed"
              style={{ backgroundColor: colors.palette.coral500, borderRadius: 14 }}
              onPress={() => console.log("Deleted")}
            />
          </View>
        </View>
      }
    >
      <View style={styles.modalContent}>
        <Text text="Are you sure you want to delete your account?" />
        <Text size="sm" text="This will permanently delete all your data and cannot be undone." style={{ color: colors.palette.coral500 }} />
      </View>
    </ModalWrapper>
  ),
}

// =============================================================================
// WITHOUT BACKDROP DISMISS
// =============================================================================

export const NoBackdropDismiss: Story = {
  name: "No Backdrop Dismiss",
  render: () => (
    <ModalWrapper
      heading="Important Notice"
      size="md"
      backdropDismiss={false}
      FooterComponent={
        <Button
          text="I Understand"
          preset="reversed"
          style={{ backgroundColor: colors.palette.ocean500, borderRadius: 14 }}
          onPress={() => console.log("Acknowledged")}
        />
      }
    >
      <View style={styles.modalContent}>
        <Text text="Please read this important information carefully." />
        <Text text="You must acknowledge this message by clicking the button below." />
        <Text size="sm" text="Tapping outside the modal will not close it." style={{ color: colors.palette.sand600 }} />
      </View>
    </ModalWrapper>
  ),
}

// =============================================================================
// WITH FORM CONTENT
// =============================================================================

export const WithForm: Story = {
  name: "With Form Content",
  render: () => (
    <ModalWrapper
      heading="Add Investment"
      size="lg"
      FooterComponent={
        <View style={styles.buttonPair}>
          <View style={styles.buttonPairItem}>
            <Button
              text="Cancel"
              preset="default"
              style={{ borderRadius: 14 }}
              onPress={() => console.log("Cancelled")}
            />
          </View>
          <View style={styles.buttonPairItem}>
            <Button
              text="Submit"
              preset="reversed"
              style={{ backgroundColor: colors.palette.ocean500, borderRadius: 14 }}
              onPress={() => console.log("Submitted")}
            />
          </View>
        </View>
      }
    >
      <View style={styles.formContent}>
        <TextField
          label="Property Name"
          placeholder="Enter property name"
          helper="The name of the property you're investing in"
        />
        <TextField
          label="Investment Amount"
          placeholder="$0.00"
          keyboardType="numeric"
          helper="Minimum investment: $1,000"
        />
        <TextField
          label="Notes"
          placeholder="Optional notes about this investment"
          multiline
          numberOfLines={3}
        />
      </View>
    </ModalWrapper>
  ),
}

// =============================================================================
// LOADING STATE
// =============================================================================

export const LoadingState: Story = {
  name: "Loading State",
  render: () => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        setVisible(false)
      }, 3000)
    }

    return (
      <>
        <Button
          text="Open Loading Modal"
          preset="reversed"
          style={styles.triggerButton}
          onPress={() => setVisible(true)}
        />
        <Modal
          visible={visible}
          onClose={() => setVisible(false)}
          heading="Processing Investment"
          size="md"
          loading={loading}
          loadingText="Processing your investment..."
          FooterComponent={
            <Button
              text="Submit"
              preset="reversed"
              style={{ backgroundColor: colors.palette.ocean500, borderRadius: 14 }}
              onPress={handleSubmit}
              disabled={loading}
            />
          }
        >
          <View style={styles.modalContent}>
            <Text text="Investment Amount: $5,000" />
            <Text text="Property: Sunset Tower Apartments" />
            <Text size="sm" text="Click Submit to process your investment." style={{ color: colors.palette.sand600 }} />
          </View>
        </Modal>
      </>
    )
  },
}

export const LoadingWithSpinner: Story = {
  name: "Loading with Spinner",
  render: () => (
    <ModalWrapper heading="Loading Data" size="md" loading={true} loadingText="Fetching your portfolio data...">
      <View style={styles.modalContent}>
        <Text text="This content is hidden while loading" />
      </View>
    </ModalWrapper>
  ),
}

// =============================================================================
// CUSTOM HEADER
// =============================================================================

export const CustomHeader: Story = {
  name: "Custom Header",
  render: () => (
    <ModalWrapper
      size="md"
      HeadingComponent={
        <View>
          <Text preset="heading" text="Welcome!" style={{ color: colors.palette.ocean500 }} />
          <Text size="sm" text="Get started with your investment journey" style={{ color: colors.palette.sand600 }} />
        </View>
      }
      FooterComponent={
        <Button
          text="Get Started"
          preset="reversed"
          style={{ backgroundColor: colors.palette.ocean500, borderRadius: 14 }}
          onPress={() => console.log("Get Started")}
        />
      }
    >
      <View style={styles.modalContent}>
        <Text text="Start investing in real estate with as little as $1,000." />
        <View style={styles.listItem}>
          <Text weight="bold" text="Diversify Your Portfolio" />
          <Text size="sm" text="Spread your investments across multiple properties" />
        </View>
        <View style={styles.listItem}>
          <Text weight="bold" text="Earn Passive Income" />
          <Text size="sm" text="Receive regular dividend payments" />
        </View>
        <View style={[styles.listItem, styles.listItemLast]}>
          <Text weight="bold" text="Build Wealth" />
          <Text size="sm" text="Benefit from property appreciation over time" />
        </View>
      </View>
    </ModalWrapper>
  ),
}

// =============================================================================
// NO CLOSE BUTTON
// =============================================================================

export const NoCloseButton: Story = {
  name: "No Close Button",
  render: () => (
    <ModalWrapper
      heading="Mandatory Update"
      size="md"
      showCloseButton={false}
      backdropDismiss={false}
      FooterComponent={
        <Button
          text="Update Now"
          preset="reversed"
          style={{ backgroundColor: colors.palette.ocean500, borderRadius: 14 }}
          onPress={() => console.log("Update")}
        />
      }
    >
      <View style={styles.modalContent}>
        <Text text="A critical update is available for the app." />
        <Text text="You must update to continue using Beyond Equity." />
        <Text size="sm" text="This modal cannot be dismissed." style={{ color: colors.palette.coral500 }} />
      </View>
    </ModalWrapper>
  ),
}

// =============================================================================
// USAGE SHOWCASE
// =============================================================================

export const UsageShowcase: Story = {
  name: "Usage Showcase",
  render: () => (
    <View style={styles.buttonColumn}>
      <ModalWrapper heading="Confirmation" size="sm">
        <Text text="Quick confirmation dialog" />
      </ModalWrapper>

      <ModalWrapper
        heading="Investment Details"
        size="md"
        FooterComponent={
          <Button
            text="Invest Now"
            preset="reversed"
            style={{ backgroundColor: colors.palette.ocean500, borderRadius: 14 }}
            onPress={() => console.log("Invest")}
          />
        }
      >
        <View style={styles.modalContent}>
          <Text text="Property: Sunset Tower Apartments" />
          <Text text="Amount: $5,000" />
          <Text text="Expected Return: 8.5% annually" />
        </View>
      </ModalWrapper>

      <ModalWrapper
        heading="Edit Profile"
        size="lg"
        FooterComponent={
          <Button
            text="Save Changes"
            preset="reversed"
            style={{ backgroundColor: colors.palette.ocean500, borderRadius: 14 }}
            onPress={() => console.log("Save")}
          />
        }
      >
        <View style={styles.formContent}>
          <TextField label="Full Name" placeholder="John Doe" />
          <TextField label="Email" placeholder="john@example.com" keyboardType="email-address" />
          <TextField label="Phone" placeholder="+1 (555) 123-4567" keyboardType="phone-pad" />
        </View>
      </ModalWrapper>
    </View>
  ),
}
