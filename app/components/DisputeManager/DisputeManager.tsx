import { useCallback, useState } from "react"
import {
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
  TextStyle,
  ScrollView,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Badge } from "../Badge"
import { Button } from "../Button"
import { Card } from "../Card"
import { ConfirmationDialog } from "../ConfirmationDialog"
import { Divider } from "../Divider"
import { Icon, IconTypes } from "../Icon"
import { Modal } from "../Modal"
import { Text } from "../Text"
import { TextField } from "../TextField"

type DisputeStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "awaiting_response"
  | "resolved"
  | "rejected"
  | "escalated"
type DisputeType = "quality" | "quantity" | "delivery" | "damage" | "payment" | "other"
type ResolutionType = "refund" | "partial_refund" | "replacement" | "credit" | "rejected" | "other"
type ManagerVariant = "form" | "status" | "detailed"

export interface DisputeEvidence {
  /**
   * Evidence ID
   */
  id: string
  /**
   * Evidence type
   */
  type: "image" | "document" | "video"
  /**
   * File URI or URL
   */
  uri: string
  /**
   * File name
   */
  filename: string
  /**
   * Upload timestamp
   */
  uploadedAt: Date
  /**
   * Optional description
   */
  description?: string
}

export interface DisputeMessage {
  /**
   * Message ID
   */
  id: string
  /**
   * Sender (buyer, seller, support)
   */
  sender: "buyer" | "seller" | "support"
  /**
   * Message content
   */
  content: string
  /**
   * Timestamp
   */
  timestamp: Date
  /**
   * Attached evidence IDs
   */
  attachments?: string[]
}

export interface DisputeResolution {
  /**
   * Resolution type
   */
  type: ResolutionType
  /**
   * Resolution description
   */
  description: string
  /**
   * Refund/credit amount if applicable
   */
  amount?: number
  /**
   * Resolution date
   */
  resolvedAt: Date
  /**
   * Who made the resolution decision
   */
  resolvedBy: string
}

export interface Dispute {
  /**
   * Dispute ID
   */
  id: string
  /**
   * Order ID this dispute is for
   */
  orderId: string
  /**
   * Dispute type
   */
  type: DisputeType
  /**
   * Current status
   */
  status: DisputeStatus
  /**
   * Subject/title
   */
  subject: string
  /**
   * Detailed description
   */
  description: string
  /**
   * Evidence items
   */
  evidence: DisputeEvidence[]
  /**
   * Message thread
   */
  messages: DisputeMessage[]
  /**
   * Resolution details (if resolved)
   */
  resolution?: DisputeResolution
  /**
   * Creation timestamp
   */
  createdAt: Date
  /**
   * Last update timestamp
   */
  updatedAt: Date
  /**
   * Expected response deadline
   */
  responseDeadline?: Date
}

export interface DisputeManagerProps {
  /**
   * Existing dispute data (for viewing/editing)
   */
  dispute?: Dispute
  /**
   * Order ID for new dispute
   */
  orderId?: string
  /**
   * Order details for context
   */
  orderDetails?: {
    productName: string
    quantity: number
    amount: number
    orderDate: Date
  }
  /**
   * Display variant
   * @default "detailed"
   */
  variant?: ManagerVariant
  /**
   * Whether user is buyer or seller
   * @default "buyer"
   */
  userRole?: "buyer" | "seller"
  /**
   * Callback when dispute is submitted
   */
  onSubmit?: (
    dispute: Omit<Dispute, "id" | "createdAt" | "updatedAt" | "messages" | "resolution">,
  ) => void
  /**
   * Callback when message is sent
   */
  onSendMessage?: (message: string, attachments?: string[]) => void
  /**
   * Callback when evidence is uploaded
   */
  onUploadEvidence?: () => void
  /**
   * Callback when dispute is cancelled
   */
  onCancel?: () => void
  /**
   * Callback when dispute is escalated
   */
  onEscalate?: () => void
  /**
   * Callback when resolution is accepted
   */
  onAcceptResolution?: () => void
  /**
   * Callback when resolution is rejected
   */
  onRejectResolution?: () => void
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

const STATUS_CONFIG: Record<
  DisputeStatus,
  {
    label: string
    badgeStatus: "success" | "warning" | "error" | "info" | "neutral"
    icon: IconTypes
    description: string
  }
> = {
  draft: {
    label: "Draft",
    badgeStatus: "neutral",
    icon: "menu",
    description: "Dispute not yet submitted",
  },
  submitted: {
    label: "Submitted",
    badgeStatus: "info",
    icon: "check",
    description: "Waiting for review",
  },
  under_review: {
    label: "Under Review",
    badgeStatus: "info",
    icon: "view",
    description: "Being reviewed by support",
  },
  awaiting_response: {
    label: "Awaiting Response",
    badgeStatus: "warning",
    icon: "bell",
    description: "Response needed",
  },
  resolved: {
    label: "Resolved",
    badgeStatus: "success",
    icon: "check",
    description: "Dispute has been resolved",
  },
  rejected: {
    label: "Rejected",
    badgeStatus: "error",
    icon: "x",
    description: "Dispute was rejected",
  },
  escalated: {
    label: "Escalated",
    badgeStatus: "error",
    icon: "caretRight",
    description: "Escalated to management",
  },
}

const DISPUTE_TYPES: { key: DisputeType; label: string; description: string }[] = [
  { key: "quality", label: "Quality Issue", description: "Product quality below expectations" },
  {
    key: "quantity",
    label: "Quantity Discrepancy",
    description: "Received different quantity than ordered",
  },
  { key: "delivery", label: "Delivery Problem", description: "Late, missing, or wrong delivery" },
  { key: "damage", label: "Product Damaged", description: "Product arrived damaged" },
  { key: "payment", label: "Payment Issue", description: "Billing or payment problems" },
  { key: "other", label: "Other", description: "Other issues not listed" },
]

const RESOLUTION_LABELS: Record<ResolutionType, string> = {
  refund: "Full Refund",
  partial_refund: "Partial Refund",
  replacement: "Replacement",
  credit: "Store Credit",
  rejected: "Claim Rejected",
  other: "Other Resolution",
}

/**
 * DisputeManager component for handling order disputes.
 * Supports dispute creation, status tracking, and resolution management.
 *
 * @param {DisputeManagerProps} props - The props for the `DisputeManager` component.
 * @returns {JSX.Element} The rendered `DisputeManager` component.
 *
 * @example
 * <DisputeManager
 *   orderId="ORD-12345"
 *   orderDetails={{ productName: "Bluefin Tuna", quantity: 50, amount: 2500, orderDate: new Date() }}
 *   onSubmit={(dispute) => handleSubmit(dispute)}
 * />
 */
export function DisputeManager(props: DisputeManagerProps) {
  const {
    dispute,
    orderId,
    orderDetails,
    variant = "detailed",
    userRole = "buyer",
    onSubmit,
    onSendMessage,
    onUploadEvidence,
    onCancel,
    onEscalate,
    onAcceptResolution,
    onRejectResolution,
    currency = "USD",
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  // Form state for new disputes
  const [disputeType, setDisputeType] = useState<DisputeType | null>(dispute?.type ?? null)
  const [subject, setSubject] = useState(dispute?.subject ?? "")
  const [description, setDescription] = useState(dispute?.description ?? "")
  const [evidence, setEvidence] = useState<DisputeEvidence[]>(dispute?.evidence ?? [])

  // Message state
  const [newMessage, setNewMessage] = useState("")
  const [showTypeSelector, setShowTypeSelector] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [showEscalateConfirm, setShowEscalateConfirm] = useState(false)

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)
  }

  const handleSubmitDispute = useCallback(() => {
    if (!disputeType || !subject || !description) return
    onSubmit?.({
      orderId: orderId ?? dispute?.orderId ?? "",
      type: disputeType,
      status: "submitted",
      subject,
      description,
      evidence,
    })
  }, [disputeType, subject, description, evidence, orderId, dispute?.orderId, onSubmit])

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim()) return
    onSendMessage?.(newMessage.trim())
    setNewMessage("")
  }, [newMessage, onSendMessage])

  const handleRemoveEvidence = useCallback((id: string) => {
    setEvidence((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const statusConfig = dispute ? STATUS_CONFIG[dispute.status] : null
  const isEditable = !dispute || dispute.status === "draft"
  const canRespond = dispute?.status === "awaiting_response"
  const canEscalate =
    dispute && ["submitted", "under_review", "awaiting_response"].includes(dispute.status)
  const hasResolution = dispute?.resolution

  // Status variant - compact display
  if (variant === "status" && dispute) {
    return (
      <Card variant="outlined" style={$styleOverride}>
        <View style={themed($statusHeader)}>
          <View
            style={[
              themed($statusIcon),
              { backgroundColor: theme.colors.palette[`${getStatusColor(dispute.status)}100`] },
            ]}
          >
            <Icon
              icon={statusConfig?.icon ?? "menu"}
              size={16}
              color={theme.colors.palette[`${getStatusColor(dispute.status)}500`]}
            />
          </View>
          <Text text={`#${dispute.id}`} weight="bold" size="sm" style={themed($statusId)} />
        </View>
        <View style={themed($statusFooter)}>
          <Text text={dispute.subject} size="xs" style={themed($statusSubject)} numberOfLines={1} />
          <Badge
            text={statusConfig?.label ?? ""}
            status={statusConfig?.badgeStatus ?? "neutral"}
            size="sm"
          />
        </View>
      </Card>
    )
  }

  // Form variant - create new dispute
  if (variant === "form" || isEditable) {
    return (
      <View style={$styleOverride}>
        {/* Order Context */}
        {orderDetails && (
          <Card variant="outlined" style={themed($contextCard)}>
            <View style={themed($contextHeader)}>
              <Text text={orderId ?? ""} size="sm" weight="bold" />
              <Text
                text={formatCurrency(orderDetails.amount)}
                size="sm"
                weight="bold"
                style={{ color: theme.colors.palette.ocean500 }}
              />
            </View>
            <Text
              text={orderDetails.productName}
              size="md"
              weight="medium"
              style={themed($contextProductName)}
            />
          </Card>
        )}

        {/* Dispute Type */}
        <Card variant="elevated" style={themed($formCard)}>
          <Text text="Dispute Type" weight="bold" style={themed($sectionTitle)} />
          <Pressable style={themed($typeSelector)} onPress={() => setShowTypeSelector(true)}>
            {disputeType ? (
              <View style={themed($selectedType)}>
                <Text
                  text={DISPUTE_TYPES.find((t) => t.key === disputeType)?.label ?? ""}
                  weight="medium"
                />
                <Text
                  text={DISPUTE_TYPES.find((t) => t.key === disputeType)?.description ?? ""}
                  size="xs"
                  style={themed($subtleText)}
                />
              </View>
            ) : (
              <Text text="Select dispute type..." style={themed($placeholderText)} />
            )}
            <Icon
              icon="caretRight"
              size={16}
              color={theme.colors.palette.sand400}
              style={{ transform: [{ rotate: "90deg" }] }}
            />
          </Pressable>
        </Card>

        {/* Subject & Description */}
        <Card variant="outlined" style={themed($formCard)}>
          <Text text="Dispute Details" weight="bold" style={themed($sectionTitle)} />
          <TextField
            label="Subject"
            value={subject}
            onChangeText={setSubject}
            placeholder="Brief summary of the issue"
            style={themed($formField)}
          />
          <TextField
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Provide detailed information about the issue..."
            multiline
            numberOfLines={4}
            style={themed($formField)}
          />
        </Card>

        {/* Evidence Upload */}
        <Card variant="outlined" style={themed($formCard)}>
          <View style={themed($evidenceHeader)}>
            <Text text="Evidence" weight="bold" />
            <Button
              text="Add Photos"
              preset="default"
              onPress={onUploadEvidence}
              LeftAccessory={() => (
                <Icon icon="components" size={16} color={theme.colors.palette.ocean500} />
              )}
            />
          </View>

          {evidence.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={themed($evidenceList)}>
                {evidence.map((item) => (
                  <View key={item.id} style={themed($evidenceItem)}>
                    {item.type === "image" ? (
                      <Image source={{ uri: item.uri }} style={themed($evidenceImage)} />
                    ) : (
                      <View style={themed($evidenceDoc)}>
                        <Icon icon="menu" size={24} color={theme.colors.palette.sand500} />
                      </View>
                    )}
                    <Pressable
                      style={themed($removeEvidence)}
                      onPress={() => handleRemoveEvidence(item.id)}
                    >
                      <Icon icon="x" size={12} color={theme.colors.palette.sand100} />
                    </Pressable>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={themed($evidenceEmpty)}>
              <Icon icon="components" size={32} color={theme.colors.palette.sand400} />
              <Text text="No evidence added yet" size="sm" style={themed($subtleText)} />
              <Text
                text="Add photos or documents to support your claim"
                size="xs"
                style={themed($subtleText)}
              />
            </View>
          )}
        </Card>

        {/* Actions */}
        <View style={themed($actions)}>
          {onCancel && (
            <Button
              text="Cancel"
              preset="default"
              onPress={() => setShowCancelConfirm(true)}
              style={themed($actionButton)}
            />
          )}
          <Button
            text="Submit Dispute"
            preset="reversed"
            onPress={handleSubmitDispute}
            disabled={!disputeType || !subject || !description}
            style={themed($actionButton)}
          />
        </View>

        {/* Type Selector Modal */}
        <Modal
          visible={showTypeSelector}
          onClose={() => setShowTypeSelector(false)}
          heading="Select Dispute Type"
        >
          {DISPUTE_TYPES.map((type) => (
            <Pressable
              key={type.key}
              style={[themed($typeOption), disputeType === type.key && themed($typeOptionSelected)]}
              onPress={() => {
                setDisputeType(type.key)
                setShowTypeSelector(false)
              }}
            >
              <Text text={type.label} weight={disputeType === type.key ? "bold" : "normal"} />
              <Text text={type.description} size="xs" style={themed($subtleText)} />
            </Pressable>
          ))}
        </Modal>

        {/* Cancel Confirmation */}
        <ConfirmationDialog
          visible={showCancelConfirm}
          title="Cancel Dispute?"
          message="Are you sure you want to cancel? Your progress will be lost."
          confirmText="Yes, Cancel"
          cancelText="Keep Editing"
          variant="danger"
          onConfirm={() => {
            setShowCancelConfirm(false)
            onCancel?.()
          }}
          onCancel={() => setShowCancelConfirm(false)}
          onClose={() => setShowCancelConfirm(false)}
        />
      </View>
    )
  }

  // Detailed variant - view existing dispute
  return (
    <View style={$styleOverride}>
      {/* Status Strip */}
      <View
        style={[
          themed($statusStrip),
          { backgroundColor: theme.colors.palette[`${getStatusColor(dispute!.status)}500`] },
        ]}
      >
        <Text
          text={statusConfig?.label?.toUpperCase() ?? ""}
          size="xs"
          weight="bold"
          style={themed($statusStripText)}
        />
        {dispute?.responseDeadline &&
          dispute.status !== "resolved" &&
          dispute.status !== "rejected" && (
            <Text
              text={`Due ${formatDate(dispute.responseDeadline)}`}
              size="xxs"
              style={themed($statusStripDue)}
            />
          )}
      </View>

      {/* Main Info Card */}
      <Card variant="elevated" style={themed($mainCard)}>
        {/* Header with ID and Type */}
        <View style={themed($disputeHeader)}>
          <Text
            text={`#${dispute!.id}`}
            size="lg"
            weight="bold"
            style={themed($disputeId)}
          />
          <View style={themed($typeTag)}>
            <Text
              text={DISPUTE_TYPES.find((t) => t.key === dispute!.type)?.label ?? ""}
              size="xs"
              weight="medium"
              style={themed($typeTagText)}
            />
          </View>
        </View>
        <Text text={dispute!.orderId} size="xs" style={themed($orderIdText)} />

        {/* Subject - the main focus */}
        <Text text={dispute!.subject} size="md" weight="bold" style={themed($subjectText)} />

        {/* Description */}
        <Text text={dispute!.description} size="sm" style={themed($descriptionText)} />

        {/* Meta row */}
        <View style={themed($metaRow)}>
          <Text
            text={`Filed ${formatDate(dispute!.createdAt)}`}
            size="xs"
            style={themed($metaText)}
          />
        </View>
      </Card>

      {/* Evidence */}
      {dispute!.evidence.length > 0 && (
        <Card variant="outlined" style={themed($evidenceCard)}>
          <Text text="Evidence" weight="bold" style={themed($sectionTitle)} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={themed($evidenceList)}>
              {dispute!.evidence.map((item) => (
                <Pressable key={item.id} style={themed($evidenceItem)}>
                  {item.type === "image" ? (
                    <Image source={{ uri: item.uri }} style={themed($evidenceImage)} />
                  ) : (
                    <View style={themed($evidenceDoc)}>
                      <View style={themed($evidenceDocIcon)}>
                        <Text text="PDF" size="xxs" weight="bold" style={themed($evidenceDocLabel)} />
                      </View>
                      <Text
                        text={item.filename}
                        size="xxs"
                        numberOfLines={2}
                        style={themed($evidenceDocName)}
                      />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </Card>
      )}

      {/* Resolution */}
      {hasResolution && (
        <Card variant="elevated" style={themed($resolutionCard)}>
          <View style={themed($resolutionHeaderRow)}>
            <Text text="RESOLUTION" size="xs" weight="bold" style={themed($resolutionLabel)} />
            <View
              style={[
                themed($resolutionTypeTag),
                {
                  backgroundColor:
                    dispute!.resolution!.type === "rejected"
                      ? theme.colors.palette.coral100
                      : theme.colors.palette.seafoam100,
                },
              ]}
            >
              <Text
                text={RESOLUTION_LABELS[dispute!.resolution!.type]}
                size="xs"
                weight="medium"
                numberOfLines={1}
                style={{
                  color:
                    dispute!.resolution!.type === "rejected"
                      ? theme.colors.palette.coral500
                      : theme.colors.palette.seafoam500,
                }}
              />
            </View>
          </View>

          <Text
            text={dispute!.resolution!.description}
            size="sm"
            style={themed($resolutionDescription)}
          />

          {dispute!.resolution!.amount !== undefined && (
            <View style={themed($resolutionAmount)}>
              <Text
                text={formatCurrency(dispute!.resolution!.amount)}
                size="xl"
                weight="bold"
                style={{ color: theme.colors.palette.seafoam500 }}
              />
            </View>
          )}

          <Text
            text={`${dispute!.resolution!.resolvedBy} · ${formatDate(dispute!.resolution!.resolvedAt)}`}
            size="xs"
            style={themed($metaText)}
          />

          {onAcceptResolution && onRejectResolution && dispute!.status !== "resolved" && (
            <View style={themed($resolutionActions)}>
              <Button
                text="Decline"
                preset="default"
                onPress={onRejectResolution}
                style={themed($actionButton)}
              />
              <Button
                text="Accept"
                preset="reversed"
                onPress={onAcceptResolution}
                style={themed($actionButton)}
              />
            </View>
          )}
        </Card>
      )}

      {/* Messages */}
      {dispute!.messages.length > 0 && (
        <Card variant="outlined" style={themed($messagesCard)}>
          <Text text="Messages" weight="bold" style={themed($sectionTitle)} />
          {dispute!.messages.map((msg, index) => (
            <View key={msg.id} style={themed($messageItem)}>
              <View style={themed($messageSender)}>
                <Badge
                  text={msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}
                  status={
                    msg.sender === "support"
                      ? "info"
                      : msg.sender === userRole
                        ? "neutral"
                        : "warning"
                  }
                  size="sm"
                  badgeStyle="subtle"
                />
                <Text
                  text={formatDate(msg.timestamp)}
                  size="xxs"
                  style={themed($subtleText)}
                  numberOfLines={1}
                />
              </View>
              <Text text={msg.content} size="sm" style={themed($messageContent)} />
              {index < dispute!.messages.length - 1 && <Divider spacing="sm" />}
            </View>
          ))}
        </Card>
      )}

      {/* Reply Box */}
      {(canRespond || dispute!.status === "under_review") && onSendMessage && (
        <Card variant="filled" style={themed($replyCard)}>
          <TextField
            placeholder="Type your response..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            numberOfLines={3}
          />
          <View style={themed($replyActions)}>
            {onUploadEvidence && (
              <Button
                text="Attach"
                preset="default"
                onPress={onUploadEvidence}
                LeftAccessory={() => (
                  <Icon icon="components" size={16} color={theme.colors.palette.ocean500} />
                )}
              />
            )}
            <Button
              text="Send"
              preset="reversed"
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
            />
          </View>
        </Card>
      )}

      {/* Additional Actions */}
      {(canEscalate || onCancel) && (
        <View style={themed($actions)}>
          {onCancel && dispute!.status !== "resolved" && dispute!.status !== "rejected" && (
            <Button
              text="Withdraw"
              preset="default"
              onPress={() => setShowCancelConfirm(true)}
              style={themed($actionButton)}
            />
          )}
          {canEscalate && onEscalate && (
            <Button
              text="Escalate"
              preset="default"
              onPress={() => setShowEscalateConfirm(true)}
              style={themed($actionButton)}
            />
          )}
        </View>
      )}

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        visible={showCancelConfirm}
        title="Withdraw Dispute?"
        message="Are you sure you want to withdraw this dispute? This action cannot be undone."
        confirmText="Yes, Withdraw"
        cancelText="Keep Open"
        variant="danger"
        onConfirm={() => {
          setShowCancelConfirm(false)
          onCancel?.()
        }}
        onCancel={() => setShowCancelConfirm(false)}
        onClose={() => setShowCancelConfirm(false)}
      />

      <ConfirmationDialog
        visible={showEscalateConfirm}
        title="Escalate Dispute?"
        message="This will escalate your dispute to management for priority review. Continue?"
        confirmText="Yes, Escalate"
        cancelText="Cancel"
        variant="warning"
        onConfirm={() => {
          setShowEscalateConfirm(false)
          onEscalate?.()
        }}
        onCancel={() => setShowEscalateConfirm(false)}
        onClose={() => setShowEscalateConfirm(false)}
      />
    </View>
  )
}

// Helper function
function getStatusColor(status: DisputeStatus): "ocean" | "seafoam" | "sunset" | "coral" | "sand" {
  switch (status) {
    case "resolved":
      return "seafoam"
    case "rejected":
    case "escalated":
      return "coral"
    case "awaiting_response":
      return "sunset"
    case "submitted":
    case "under_review":
      return "ocean"
    default:
      return "sand"
  }
}

// =============================================================================
// STYLES
// =============================================================================

const $statusHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  marginBottom: spacing.xs,
})

const $statusIcon: ThemedStyle<ViewStyle> = () => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
})

const $statusId: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
  flexShrink: 0,
})

const $statusFooter: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.sm,
})

const $statusSubject: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
  flex: 1,
})

const $subtleText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $contextCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $contextHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $contextProductName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $formCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand800,
  marginBottom: spacing.md,
})

const $typeSelector: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: spacing.md,
  backgroundColor: colors.palette.sand100,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.sand300,
})

const $selectedType: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxs,
})

const $placeholderText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $formField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $evidenceHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.md,
})

const $evidenceList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $evidenceItem: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
})

const $evidenceImage: ThemedStyle<ImageStyle> = () => ({
  width: 80,
  height: 80,
  borderRadius: 8,
})

const $evidenceDoc: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 100,
  height: 80,
  borderRadius: 8,
  backgroundColor: colors.palette.sand100,
  borderWidth: 1,
  borderColor: colors.palette.sand300,
  padding: spacing.xs,
  justifyContent: "space-between",
})

const $evidenceDocIcon: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.coral400,
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 4,
  alignSelf: "flex-start",
})

const $evidenceDocLabel: ThemedStyle<TextStyle> = () => ({
  color: "white",
})

const $evidenceDocName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
})

const $removeEvidence: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: -6,
  right: -6,
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: colors.palette.coral500,
  alignItems: "center",
  justifyContent: "center",
})

const $evidenceEmpty: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  padding: spacing.lg,
  backgroundColor: colors.palette.sand100,
  borderRadius: 8,
  gap: spacing.xs,
})

const $actions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
  marginTop: spacing.md,
})

const $actionButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $typeOption: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  borderRadius: 8,
  marginBottom: spacing.xs,
  backgroundColor: colors.palette.sand100,
})

const $typeOptionSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean100,
  borderWidth: 1,
  borderColor: colors.palette.ocean500,
})

// Detailed view - Status strip
const $statusStrip: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  borderRadius: 8,
  marginBottom: spacing.sm,
})

const $statusStripText: ThemedStyle<TextStyle> = () => ({
  color: "white",
  letterSpacing: 1,
})

const $statusStripDue: ThemedStyle<TextStyle> = ({ spacing }) => ({
  color: "rgba(255,255,255,0.85)",
  marginTop: spacing.xxs,
})

// Detailed view - Main card
const $mainCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $disputeHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  gap: spacing.xxs,
  marginBottom: spacing.xxs,
})

const $disputeId: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $orderIdText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand500,
  marginBottom: spacing.sm,
})

const $typeTag: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.sand200,
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.sm,
  borderRadius: 4,
})

const $typeTagText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
})

const $subjectText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand900,
  marginBottom: spacing.xs,
})

const $descriptionText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand600,
  lineHeight: 20,
  marginBottom: spacing.md,
})

const $metaRow: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderTopWidth: 1,
  borderTopColor: colors.palette.sand200,
  paddingTop: spacing.sm,
})

const $metaText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $evidenceCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $resolutionCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginBottom: spacing.md,
  borderLeftWidth: 3,
  borderLeftColor: colors.palette.seafoam500,
})

const $resolutionHeaderRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.sm,
})

const $resolutionLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
  letterSpacing: 1,
})

const $resolutionTypeTag: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxs,
  paddingHorizontal: spacing.sm,
  borderRadius: 4,
})

const $resolutionDescription: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand700,
  marginBottom: spacing.sm,
})

const $resolutionAmount: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $resolutionActions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
  marginTop: spacing.md,
})

const $messagesCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $messageItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $messageSender: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.xs,
})

const $messageContent: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $replyCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $replyActions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: spacing.sm,
  marginTop: spacing.sm,
})
