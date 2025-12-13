import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Card } from "../Card"
import { Badge } from "../Badge"
import { Icon } from "../Icon"
import { Button } from "../Button"

type DeliveryStatus = "pending" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "failed"
type PanelVariant = "default" | "compact" | "detailed"

interface TrackingStep {
  id: string
  label: string
  sublabel?: string
  timestamp?: Date
  location?: string
  completed: boolean
  current: boolean
}

export interface DeliveryTrackingPanelProps {
  /**
   * Order/shipment ID
   */
  orderId: string
  /**
   * Current delivery status
   */
  status: DeliveryStatus
  /**
   * Panel display variant
   * @default "default"
   */
  variant?: PanelVariant
  /**
   * Estimated delivery date
   */
  estimatedDelivery?: Date
  /**
   * Actual delivery date (if delivered)
   */
  actualDelivery?: Date
  /**
   * Carrier name
   */
  carrier?: string
  /**
   * Tracking number
   */
  trackingNumber?: string
  /**
   * Origin location
   */
  origin?: string
  /**
   * Destination location
   */
  destination?: string
  /**
   * Current location (for in_transit)
   */
  currentLocation?: string
  /**
   * Custom tracking steps (overrides default)
   */
  steps?: TrackingStep[]
  /**
   * Driver/courier name
   */
  driverName?: string
  /**
   * Driver phone
   */
  driverPhone?: string
  /**
   * Callback when contact driver is pressed
   */
  onContactDriver?: () => void
  /**
   * Callback when track on map is pressed
   */
  onTrackOnMap?: () => void
  /**
   * Callback when report issue is pressed
   */
  onReportIssue?: () => void
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const STATUS_CONFIG: Record<DeliveryStatus, {
  label: string
  badgeStatus: "success" | "warning" | "error" | "info" | "neutral"
  color: "seafoam" | "sunset" | "coral" | "ocean" | "sand"
}> = {
  pending: { label: "Pending Pickup", badgeStatus: "neutral", color: "sand" },
  picked_up: { label: "Picked Up", badgeStatus: "info", color: "ocean" },
  in_transit: { label: "In Transit", badgeStatus: "info", color: "ocean" },
  out_for_delivery: { label: "Out for Delivery", badgeStatus: "warning", color: "sunset" },
  delivered: { label: "Delivered", badgeStatus: "success", color: "seafoam" },
  failed: { label: "Delivery Failed", badgeStatus: "error", color: "coral" },
}

const STATUS_ORDER: DeliveryStatus[] = ["pending", "picked_up", "in_transit", "out_for_delivery", "delivered"]

function getDefaultSteps(currentStatus: DeliveryStatus): TrackingStep[] {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus)
  const isFailed = currentStatus === "failed"

  return [
    { id: "1", label: "Order Confirmed", sublabel: "Awaiting pickup", completed: !isFailed && currentIndex >= 0, current: currentIndex === 0 },
    { id: "2", label: "Picked Up", sublabel: "Package collected", completed: !isFailed && currentIndex >= 1, current: currentIndex === 1 },
    { id: "3", label: "In Transit", sublabel: "On the way", completed: !isFailed && currentIndex >= 2, current: currentIndex === 2 },
    { id: "4", label: "Out for Delivery", sublabel: "Arriving today", completed: !isFailed && currentIndex >= 3, current: currentIndex === 3 },
    { id: "5", label: "Delivered", sublabel: "Package received", completed: !isFailed && currentIndex >= 4, current: currentIndex === 4 },
  ]
}

/**
 * DeliveryTrackingPanel - Track order delivery progress
 *
 * Variants:
 * - default: Full tracking with steps and details
 * - compact: Minimal status display
 * - detailed: Extended information with all details
 */
export function DeliveryTrackingPanel(props: DeliveryTrackingPanelProps) {
  const {
    orderId,
    status,
    variant = "default",
    estimatedDelivery,
    actualDelivery,
    carrier,
    trackingNumber,
    origin,
    destination,
    currentLocation,
    steps,
    driverName,
    driverPhone,
    onContactDriver,
    onTrackOnMap,
    onReportIssue,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()
  const statusConfig = STATUS_CONFIG[status]
  const trackingSteps = steps ?? getDefaultSteps(status)

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  const getStatusColor = (colorName: string, shade: number) => {
    const key = `${colorName}${shade}` as keyof typeof theme.colors.palette
    return theme.colors.palette[key] || theme.colors.palette.sand500
  }

  // Compact variant - just status badge
  if (variant === "compact") {
    return (
      <Card variant="outlined" style={$styleOverride}>
        <View style={themed($compactContainer)}>
          <View style={themed($compactLeft)}>
            <View style={[themed($statusDot), { backgroundColor: getStatusColor(statusConfig.color, 400) }]} />
            <View>
              <Text text={statusConfig.label} weight="medium" size="sm" />
              {estimatedDelivery && status !== "delivered" && (
                <Text text={`Est. ${formatDate(estimatedDelivery)}`} size="xs" style={themed($subtleText)} />
              )}
            </View>
          </View>
          <Badge text={orderId} status="neutral" size="sm" badgeStyle="subtle" />
        </View>
      </Card>
    )
  }

  return (
    <View style={$styleOverride}>
      {/* Status Header Card */}
      <Card variant="elevated" style={themed($headerCard)}>
        <View style={themed($headerRow)}>
          <View style={[themed($statusIcon), { backgroundColor: getStatusColor(statusConfig.color, 100) }]}>
            <Icon
              icon={status === "delivered" ? "check" : status === "failed" ? "x" : "components"}
              size={24}
              color={getStatusColor(statusConfig.color, 500)}
            />
          </View>
          <View style={themed($headerInfo)}>
            <Badge
              text={statusConfig.label}
              status={statusConfig.badgeStatus}
              size="md"
              badgeStyle="solid"
            />
            {estimatedDelivery && status !== "delivered" && (
              <Text
                text={`Estimated: ${formatDate(estimatedDelivery)}`}
                size="sm"
                style={themed($subtleText)}
              />
            )}
            {actualDelivery && status === "delivered" && (
              <Text
                text={`Delivered: ${formatDate(actualDelivery)}`}
                size="sm"
                style={{ color: theme.colors.palette.seafoam500 }}
              />
            )}
          </View>
        </View>

        {currentLocation && (status === "in_transit" || status === "out_for_delivery") && (
          <View style={themed($locationBanner)}>
            <Icon icon="pin" size={16} color={theme.colors.palette.ocean500} />
            <Text text={currentLocation} size="sm" style={{ color: theme.colors.palette.ocean600, flex: 1 }} />
          </View>
        )}
      </Card>

      {/* Progress Steps */}
      <Card variant="filled" style={themed($stepsCard)}>
        <Text text="Tracking Progress" weight="bold" style={themed($sectionTitle)} />
        <View style={themed($stepsContainer)}>
          {trackingSteps.map((step, index) => (
            <View key={step.id} style={themed($stepRow)}>
              {/* Step Indicator */}
              <View style={themed($stepIndicatorColumn)}>
                <View
                  style={[
                    themed($stepDot),
                    step.completed && themed($stepDotCompleted),
                    step.current && themed($stepDotCurrent),
                  ]}
                >
                  {step.completed && <Icon icon="check" size={12} color={theme.colors.palette.sand100} />}
                </View>
                {index < trackingSteps.length - 1 && (
                  <View style={[themed($stepLine), step.completed && themed($stepLineCompleted)]} />
                )}
              </View>

              {/* Step Content */}
              <View style={themed($stepContent)}>
                <Text
                  text={step.label}
                  size="sm"
                  weight={step.current ? "bold" : "normal"}
                  style={step.completed ? themed($stepTextCompleted) : themed($stepText)}
                />
                {step.sublabel && (
                  <Text text={step.sublabel} size="xs" style={themed($subtleText)} />
                )}
                {step.timestamp && (
                  <Text text={formatDate(step.timestamp)} size="xs" style={themed($timestampText)} />
                )}
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Shipment Details - only in detailed variant */}
      {variant === "detailed" && (
        <Card variant="outlined" style={themed($detailsCard)}>
          <Text text="Shipment Details" weight="bold" style={themed($sectionTitle)} />

          <View style={themed($detailRow)}>
            <Text text="Order ID" size="sm" style={themed($detailLabel)} />
            <Text text={orderId} size="sm" weight="medium" />
          </View>

          {trackingNumber && (
            <View style={themed($detailRow)}>
              <Text text="Tracking #" size="sm" style={themed($detailLabel)} />
              <Text text={trackingNumber} size="sm" weight="medium" />
            </View>
          )}

          {carrier && (
            <View style={themed($detailRow)}>
              <Text text="Carrier" size="sm" style={themed($detailLabel)} />
              <Text text={carrier} size="sm" weight="medium" />
            </View>
          )}

          {(origin || destination) && (
            <View style={themed($addressSection)}>
              {origin && (
                <View style={themed($addressRow)}>
                  <View style={[themed($addressDot), { backgroundColor: theme.colors.palette.sand400 }]} />
                  <View style={themed($addressContent)}>
                    <Text text="From" size="xs" style={themed($subtleText)} />
                    <Text text={origin} size="sm" />
                  </View>
                </View>
              )}
              {origin && destination && <View style={themed($addressLine)} />}
              {destination && (
                <View style={themed($addressRow)}>
                  <View style={[themed($addressDot), { backgroundColor: theme.colors.palette.ocean500 }]} />
                  <View style={themed($addressContent)}>
                    <Text text="To" size="xs" style={themed($subtleText)} />
                    <Text text={destination} size="sm" />
                  </View>
                </View>
              )}
            </View>
          )}
        </Card>
      )}

      {/* Driver Info & Actions */}
      {(driverName || onTrackOnMap || onReportIssue) && (
        <Card variant="ghost" style={themed($actionsCard)}>
          {driverName && (
            <View style={themed($driverRow)}>
              <View style={themed($driverAvatar)}>
                <Icon icon="community" size={20} color={theme.colors.palette.sand600} />
              </View>
              <View style={themed($driverInfo)}>
                <Text text={driverName} size="sm" weight="medium" />
                {driverPhone && <Text text={driverPhone} size="xs" style={themed($subtleText)} />}
              </View>
              {onContactDriver && (
                <Button text="Call" preset="default" onPress={onContactDriver} />
              )}
            </View>
          )}

          {(onTrackOnMap || onReportIssue) && (
            <View style={themed($actionButtons)}>
              {onTrackOnMap && (
                <Button text="Track on Map" preset="reversed" onPress={onTrackOnMap} style={themed($actionButton)} />
              )}
              {onReportIssue && (
                <Button text="Report Issue" preset="default" onPress={onReportIssue} style={themed($actionButton)} />
              )}
            </View>
          )}
        </Card>
      )}
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

// Compact variant
const $compactContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

const $compactLeft: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $statusDot: ThemedStyle<ViewStyle> = () => ({
  width: 12,
  height: 12,
  borderRadius: 6,
})

// Header
const $headerCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $headerRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.md,
})

const $statusIcon: ThemedStyle<ViewStyle> = () => ({
  width: 48,
  height: 48,
  borderRadius: 24,
  alignItems: "center",
  justifyContent: "center",
})

const $headerInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxs,
})

const $locationBanner: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  marginTop: spacing.md,
  padding: spacing.sm,
  backgroundColor: colors.palette.ocean100,
  borderRadius: 8,
})

// Steps
const $stepsCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand800,
  marginBottom: spacing.md,
})

const $stepsContainer: ThemedStyle<ViewStyle> = () => ({})

const $stepRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
})

const $stepIndicatorColumn: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginRight: spacing.md,
})

const $stepDot: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: colors.palette.sand300,
  alignItems: "center",
  justifyContent: "center",
})

const $stepDotCompleted: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.seafoam400,
})

const $stepDotCurrent: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean500,
  borderWidth: 3,
  borderColor: colors.palette.ocean200,
})

const $stepLine: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 2,
  height: 32,
  backgroundColor: colors.palette.sand300,
})

const $stepLineCompleted: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.seafoam400,
})

const $stepContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingBottom: spacing.md,
})

const $stepText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $stepTextCompleted: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $subtleText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $timestampText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean500,
})

// Details
const $detailsCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $detailRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.xs,
})

const $detailLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $addressSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  paddingTop: spacing.md,
  borderTopWidth: 1,
  borderTopColor: "rgba(0,0,0,0.05)",
})

const $addressRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.sm,
})

const $addressDot: ThemedStyle<ViewStyle> = () => ({
  width: 10,
  height: 10,
  borderRadius: 5,
  marginTop: 4,
})

const $addressLine: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 2,
  height: 16,
  backgroundColor: colors.palette.sand300,
  marginLeft: 4,
  marginVertical: spacing.xxs,
})

const $addressContent: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

// Actions
const $actionsCard: ThemedStyle<ViewStyle> = () => ({})

const $driverRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
  marginBottom: spacing.md,
})

const $driverAvatar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: colors.palette.sand200,
  alignItems: "center",
  justifyContent: "center",
})

const $driverInfo: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $actionButtons: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $actionButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
