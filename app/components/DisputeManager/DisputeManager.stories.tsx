import { StyleSheet, View, Alert } from "react-native"
import type { Meta, StoryObj } from "@storybook/react"

import { DisputeManager, Dispute } from "./DisputeManager"
import { colors } from "../../theme/colors"
import { Text } from "../Text"

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
})

// =============================================================================
// SAMPLE DATA - ORDER DETAILS
// =============================================================================

const ORDER_BLUEFIN_TUNA = {
  productName: "Premium Bluefin Tuna",
  quantity: 50,
  amount: 4250,
  orderDate: new Date("2024-12-10"),
}

const ORDER_LIVE_LOBSTER = {
  productName: "Live Lobster (24 pcs)",
  quantity: 24,
  amount: 720,
  orderDate: new Date("2024-12-14"),
}

const ORDER_KING_SALMON = {
  productName: "King Salmon (Wild)",
  quantity: 45,
  amount: 1575,
  orderDate: new Date("2024-12-12"),
}

// =============================================================================
// SAMPLE DATA - EVIDENCE
// =============================================================================

const EVIDENCE_QUALITY_PHOTOS = [
  {
    id: "ev1",
    type: "image" as const,
    uri: "https://picsum.photos/200",
    filename: "tuna_photo_1.jpg",
    uploadedAt: new Date("2024-12-11T10:30:00"),
    description: "Shows color inconsistency",
  },
  {
    id: "ev2",
    type: "image" as const,
    uri: "https://picsum.photos/201",
    filename: "tuna_photo_2.jpg",
    uploadedAt: new Date("2024-12-11T10:31:00"),
    description: "Fat marbling comparison",
  },
]

const EVIDENCE_TEMP_LOG = [
  {
    id: "ev3",
    type: "document" as const,
    uri: "temp_log.pdf",
    filename: "temperature_log.pdf",
    uploadedAt: new Date("2024-12-14T08:00:00"),
    description: "Cold chain temperature readings",
  },
]

// =============================================================================
// SAMPLE DATA - MESSAGES
// =============================================================================

const MESSAGES_QUALITY_DISPUTE = [
  {
    id: "msg1",
    sender: "buyer" as const,
    content:
      "Please review the attached photos showing the quality difference from what was advertised.",
    timestamp: new Date("2024-12-11T10:35:00"),
    attachments: ["ev1", "ev2"],
  },
  {
    id: "msg2",
    sender: "support" as const,
    content:
      "Thank you for your report. We have received your evidence and are reviewing with the seller. We will update you within 24 hours.",
    timestamp: new Date("2024-12-11T14:20:00"),
  },
]

const MESSAGES_WITH_SELLER_RESPONSE = [
  ...MESSAGES_QUALITY_DISPUTE,
  {
    id: "msg3",
    sender: "seller" as const,
    content:
      "We believe the product met the advertised grade. Can you provide more specific measurements of the fat content?",
    timestamp: new Date("2024-12-12T09:00:00"),
  },
]

const MESSAGES_RESOLVED = [
  ...MESSAGES_QUALITY_DISPUTE,
  {
    id: "msg3",
    sender: "support" as const,
    content:
      "We have completed our review. The seller has agreed to a partial refund. Please see the resolution details below.",
    timestamp: new Date("2024-12-12T16:00:00"),
  },
]

// =============================================================================
// SAMPLE DATA - DISPUTES
// =============================================================================

const DISPUTE_BASE: Dispute = {
  id: "DSP-2024-001",
  orderId: "ORD-12345",
  type: "quality",
  status: "under_review",
  subject: "Fish quality below advertised grade",
  description:
    "The bluefin tuna received was labeled as Grade A but appears to be Grade B based on color and fat content. The marbling is inconsistent and the color is not the deep red expected of premium grade.",
  evidence: EVIDENCE_QUALITY_PHOTOS,
  messages: MESSAGES_QUALITY_DISPUTE,
  createdAt: new Date("2024-12-11T10:30:00"),
  updatedAt: new Date("2024-12-11T14:20:00"),
  responseDeadline: new Date("2024-12-13T10:30:00"),
}

const DISPUTE_SUBMITTED: Dispute = {
  ...DISPUTE_BASE,
  id: "DSP-2024-010",
  status: "submitted",
  messages: [MESSAGES_QUALITY_DISPUTE[0]],
}

const DISPUTE_AWAITING_RESPONSE: Dispute = {
  ...DISPUTE_BASE,
  id: "DSP-2024-011",
  status: "awaiting_response",
  messages: MESSAGES_WITH_SELLER_RESPONSE,
}

const DISPUTE_RESOLVED: Dispute = {
  ...DISPUTE_BASE,
  id: "DSP-2024-012",
  status: "resolved",
  messages: MESSAGES_RESOLVED,
  resolution: {
    type: "partial_refund",
    description:
      "After reviewing the evidence, we agree the product was mislabeled. A partial refund has been issued to account for the grade difference.",
    amount: 850,
    resolvedAt: new Date("2024-12-12T16:00:00"),
    resolvedBy: "Support Team",
  },
}

const DISPUTE_REJECTED: Dispute = {
  ...DISPUTE_BASE,
  id: "DSP-2024-013",
  status: "rejected",
  resolution: {
    type: "rejected",
    description:
      "After thorough review, we could not verify the quality claims. The product appears to meet Grade A standards based on industry guidelines.",
    resolvedAt: new Date("2024-12-12T16:00:00"),
    resolvedBy: "Quality Assessment Team",
  },
}

const DISPUTE_ESCALATED: Dispute = {
  ...DISPUTE_BASE,
  id: "DSP-2024-014",
  status: "escalated",
}

const DISPUTE_QUANTITY: Dispute = {
  ...DISPUTE_BASE,
  id: "DSP-2024-020",
  type: "quantity",
  subject: "Received 45 lbs instead of 50 lbs",
  description:
    "Order was for 50 lbs of salmon but only received 45 lbs. Weight verified on calibrated scale at receiving dock.",
}

const DISPUTE_DELIVERY: Dispute = {
  ...DISPUTE_BASE,
  id: "DSP-2024-021",
  type: "delivery",
  status: "awaiting_response",
  subject: "Shipment arrived 6 hours late, cold chain compromised",
  description:
    "Expected delivery at 6 AM for restaurant prep. Arrived at noon. Temperature logs show product reached 45°F during delay. Cannot use for sashimi service.",
  evidence: EVIDENCE_TEMP_LOG,
}

const _DISPUTE_DAMAGE: Dispute = {
  ...DISPUTE_BASE,
  id: "DSP-2024-022",
  type: "damage",
  subject: "5 lobsters arrived dead on arrival",
  description:
    "Of the 24 live lobsters ordered, 5 were DOA. The packaging showed signs of rough handling and one corner was crushed.",
}

/**
 * DisputeManager Stories
 *
 * Order dispute management for the tsuriai fishing marketplace.
 * Handles dispute creation, tracking, and resolution.
 *
 * Design principles:
 * - Clear status progression
 * - Evidence-based claims
 * - Transparent communication
 * - Fair resolution process
 * - Seaside color palette for status indicators
 */
const meta: Meta<typeof DisputeManager> = {
  title: "Operations/DisputeManager",
  component: DisputeManager,
  argTypes: {
    variant: {
      control: "select",
      options: ["form", "status", "detailed"],
      description: "Display variant",
    },
    userRole: {
      control: "select",
      options: ["buyer", "seller"],
      description: "Current user role",
    },
  },
  args: {
    variant: "detailed",
    userRole: "buyer",
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

type Story = StoryObj<typeof DisputeManager>

// =============================================================================
// INTERACTIVE WRAPPER
// =============================================================================

function DisputeFormWrapper(props: React.ComponentProps<typeof DisputeManager>) {
  const handleSubmit = (dispute: Partial<Dispute>) => {
    Alert.alert("Dispute Submitted", `Type: ${dispute.type}\nSubject: ${dispute.subject}`)
  }

  return (
    <DisputeManager
      {...props}
      variant="form"
      onSubmit={handleSubmit}
      onCancel={() => Alert.alert("Cancelled")}
      onUploadEvidence={() => Alert.alert("Upload", "Photo picker would open")}
    />
  )
}

function DisputeDetailWrapper(props: React.ComponentProps<typeof DisputeManager>) {
  return (
    <DisputeManager
      {...props}
      variant="detailed"
      onSendMessage={(msg) => Alert.alert("Message Sent", msg)}
      onUploadEvidence={() => Alert.alert("Upload", "Photo picker would open")}
      onEscalate={() => Alert.alert("Escalated", "This dispute has been escalated to management.")}
      onCancel={() => Alert.alert("Withdrawn", "Dispute has been withdrawn.")}
    />
  )
}

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  render: () => <DisputeDetailWrapper dispute={DISPUTE_BASE} />,
}

export const FormVariant: Story = {
  name: "Form Variant",
  render: () => <DisputeFormWrapper orderId="ORD-12345" orderDetails={ORDER_BLUEFIN_TUNA} />,
}

export const StatusVariant: Story = {
  name: "Status Variant (Compact)",
  args: {
    variant: "status",
    dispute: DISPUTE_BASE,
  },
}

export const DetailedVariant: Story = {
  name: "Detailed Variant",
  render: () => <DisputeDetailWrapper dispute={DISPUTE_BASE} />,
}

// =============================================================================
// DISPUTE STATUSES
// =============================================================================

export const StatusSubmitted: Story = {
  name: "Status: Submitted",
  render: () => <DisputeDetailWrapper dispute={DISPUTE_SUBMITTED} />,
}

export const StatusUnderReview: Story = {
  name: "Status: Under Review",
  render: () => <DisputeDetailWrapper dispute={DISPUTE_BASE} />,
}

export const StatusAwaitingResponse: Story = {
  name: "Status: Awaiting Response",
  render: () => <DisputeDetailWrapper dispute={DISPUTE_AWAITING_RESPONSE} />,
}

export const StatusResolved: Story = {
  name: "Status: Resolved",
  render: () => <DisputeDetailWrapper dispute={DISPUTE_RESOLVED} />,
}

export const StatusRejected: Story = {
  name: "Status: Rejected",
  render: () => <DisputeDetailWrapper dispute={DISPUTE_REJECTED} />,
}

export const StatusEscalated: Story = {
  name: "Status: Escalated",
  render: () => <DisputeDetailWrapper dispute={DISPUTE_ESCALATED} />,
}

// =============================================================================
// FISH MARKET SCENARIOS
// =============================================================================

export const QualityDispute: Story = {
  name: "Fish Market: Quality Claim",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="QUALITY GRADE DISPUTE" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <DisputeManager
        dispute={DISPUTE_BASE}
        variant="detailed"
        onSendMessage={(msg) => console.log(msg)}
        onEscalate={() => console.log("Escalate")}
      />
    </View>
  ),
}

export const QuantityDispute: Story = {
  name: "Fish Market: Quantity Discrepancy",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="WEIGHT DISCREPANCY" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <DisputeManager
        dispute={DISPUTE_QUANTITY}
        variant="detailed"
        onSendMessage={(msg) => console.log(msg)}
      />
    </View>
  ),
}

export const DeliveryDispute: Story = {
  name: "Fish Market: Delivery Issue",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="COLD CHAIN FAILURE" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <DisputeManager
        dispute={DISPUTE_DELIVERY}
        variant="detailed"
        onSendMessage={(msg) => console.log(msg)}
      />
    </View>
  ),
}

export const DamageClaim: Story = {
  name: "Fish Market: Damage Claim",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="LIVE PRODUCT DOA" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <DisputeFormWrapper orderId="ORD-67890" orderDetails={ORDER_LIVE_LOBSTER} />
    </View>
  ),
}

// =============================================================================
// RESOLUTION TYPES
// =============================================================================

export const FullRefundResolution: Story = {
  name: "Resolution: Full Refund",
  args: {
    variant: "detailed",
    dispute: {
      ...DISPUTE_RESOLVED,
      resolution: {
        type: "refund",
        description:
          "Full refund approved due to significant quality issues. The entire order value will be returned to your account within 3-5 business days.",
        amount: 4250,
        resolvedAt: new Date(),
        resolvedBy: "Support Manager",
      },
    },
  },
}

export const PartialRefundResolution: Story = {
  name: "Resolution: Partial Refund",
  args: {
    variant: "detailed",
    dispute: DISPUTE_RESOLVED,
  },
}

export const ReplacementResolution: Story = {
  name: "Resolution: Replacement",
  args: {
    variant: "detailed",
    dispute: {
      ...DISPUTE_RESOLVED,
      resolution: {
        type: "replacement",
        description:
          "Seller has agreed to ship a replacement order at no additional cost. Expected delivery within 2 days.",
        resolvedAt: new Date(),
        resolvedBy: "Seller",
      },
    },
  },
}

export const StoreCreditResolution: Story = {
  name: "Resolution: Store Credit",
  args: {
    variant: "detailed",
    dispute: {
      ...DISPUTE_RESOLVED,
      resolution: {
        type: "credit",
        description:
          "As a goodwill gesture, we are issuing store credit that can be applied to your next order.",
        amount: 500,
        resolvedAt: new Date(),
        resolvedBy: "Customer Service",
      },
    },
  },
}

// =============================================================================
// ALL STATUSES
// =============================================================================

export const AllStatuses: Story = {
  name: "All Status States",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="DISPUTE STATUS OVERVIEW" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <View style={styles.section}>
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, id: "001", status: "draft" }}
          variant="status"
        />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, id: "002", status: "submitted" }}
          variant="status"
        />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, id: "003", status: "under_review" }}
          variant="status"
        />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, id: "004", status: "awaiting_response" }}
          variant="status"
        />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, id: "005", status: "resolved" }}
          variant="status"
        />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, id: "006", status: "rejected" }}
          variant="status"
        />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, id: "007", status: "escalated" }}
          variant="status"
        />
      </View>
    </View>
  ),
}

// =============================================================================
// ALL DISPUTE TYPES
// =============================================================================

export const AllDisputeTypes: Story = {
  name: "All Dispute Types",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="DISPUTE TYPE COMPARISON" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <View style={styles.section}>
        <DisputeManager dispute={{ ...DISPUTE_BASE, type: "quality" }} variant="status" />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, type: "quantity", id: "Q02" }}
          variant="status"
        />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, type: "delivery", id: "D03" }}
          variant="status"
        />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, type: "damage", id: "DM04" }}
          variant="status"
        />
        <DisputeManager
          dispute={{ ...DISPUTE_BASE, type: "payment", id: "P05" }}
          variant="status"
        />
        <DisputeManager dispute={{ ...DISPUTE_BASE, type: "other", id: "O06" }} variant="status" />
      </View>
    </View>
  ),
}

// =============================================================================
// VARIANT COMPARISON
// =============================================================================

export const VariantComparison: Story = {
  name: "Variant Comparison",
  render: () => (
    <View style={styles.grid}>
      {/* Status Variant */}
      <View style={styles.showcaseCard}>
        <Text
          size="xs"
          weight="medium"
          text="STATUS VARIANT (COMPACT)"
          style={styles.sectionLabel}
        />
        <View style={styles.showcaseDivider} />
        <DisputeManager dispute={DISPUTE_BASE} variant="status" />
      </View>

      {/* Detailed Variant */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="DETAILED VARIANT" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <DisputeManager dispute={DISPUTE_BASE} variant="detailed" />
      </View>

      {/* Form Variant */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="FORM VARIANT" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <DisputeManager
          variant="form"
          orderId="ORD-12345"
          orderDetails={ORDER_BLUEFIN_TUNA}
          onSubmit={() => {}}
          onUploadEvidence={() => {}}
        />
      </View>
    </View>
  ),
}

// =============================================================================
// COMPLETE SHOWCASE
// =============================================================================

export const CompleteShowcase: Story = {
  name: "Complete DisputeManager Showcase",
  render: () => (
    <View style={styles.grid}>
      {/* New Dispute Form */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="FILE NEW DISPUTE" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <DisputeManager
          variant="form"
          orderId="ORD-NEW"
          orderDetails={ORDER_KING_SALMON}
          onSubmit={() => {}}
          onUploadEvidence={() => {}}
        />
      </View>

      {/* Active Disputes */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="ACTIVE DISPUTES" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.section}>
          <DisputeManager dispute={DISPUTE_SUBMITTED} variant="status" />
          <DisputeManager dispute={DISPUTE_BASE} variant="status" />
          <DisputeManager dispute={DISPUTE_AWAITING_RESPONSE} variant="status" />
        </View>
      </View>

      {/* Resolved Disputes */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="RESOLVED DISPUTES" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.section}>
          <DisputeManager dispute={DISPUTE_RESOLVED} variant="status" />
          <DisputeManager dispute={DISPUTE_REJECTED} variant="status" />
        </View>
      </View>

      {/* Detailed View */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="DETAILED VIEW" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <DisputeManager dispute={DISPUTE_RESOLVED} variant="detailed" />
      </View>
    </View>
  ),
}
