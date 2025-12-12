import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Card } from "../Card"
import { Badge } from "../Badge"
import { Icon, IconTypes } from "../Icon"
import { Button } from "../Button"
import { Divider } from "../Divider"

type DeliveryStatus = "pending" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "failed"

interface DeliveryStep {
  status: DeliveryStatus
  label: string
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
   * Delivery steps/history
   */
  steps?: DeliveryStep[]
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

const STATUS_CONFIG: Record<DeliveryStatus, { label: string; status: "success" | "warning" | "error" | "info" | "neutral"; icon: IconTypes }> = {
  pending: { label: "Pending Pickup", status: "neutral", icon: "components" },
  picked_up: { label: "Picked Up", status: "info", icon: "check" },
  in_transit: { label: "In Transit", status: "info", icon: "components" },
  out_for_delivery: { label: "Out for Delivery", status: "warning", icon: "components" },
  delivered: { label: "Delivered", status: "success", icon: "check" },
  failed: { label: "Delivery Failed", status: "error", icon: "x" },
}

const DEFAULT_STEPS: DeliveryStep[] = [
  { status: "pending", label: "Order Confirmed", completed: false, current: false },
  { status: "picked_up", label: "Picked Up", completed: false, current: false },
  { status: "in_transit", label: "In Transit", completed: false, current: false },
  { status: "out_for_delivery", label: "Out for Delivery", completed: false, current: false },
  { status: "delivered", label: "Delivered", completed: false, current: false },
]

/**
 * DeliveryTrackingPanel component for tracking order deliveries.
 *
 * @param {DeliveryTrackingPanelProps} props - The props for the `DeliveryTrackingPanel` component.
 * @returns {JSX.Element} The rendered `DeliveryTrackingPanel` component.
 */
export function DeliveryTrackingPanel(props: DeliveryTrackingPanelProps) {
  const {
    orderId,
    status,
    estimatedDelivery,
    actualDelivery,
    carrier,
    trackingNumber,
    origin,
    destination,
    currentLocation,
    steps = DEFAULT_STEPS,
    driverName,
    driverPhone,
    onContactDriver,
    onTrackOnMap,
    onReportIssue,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const statusConfig = STATUS_CONFIG[status]

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  // Calculate step states based on current status
  const statusOrder: DeliveryStatus[] = ["pending", "picked_up", "in_transit", "out_for_delivery", "delivered"]
  const currentIndex = statusOrder.indexOf(status)

  const processedSteps = steps.map((step, index) => {
    const stepIndex = statusOrder.indexOf(step.status)
    return {
      ...step,
      completed: stepIndex < currentIndex || status === "delivered",
      current: stepIndex === currentIndex,
    }
  })

  return (
    <View style={$styleOverride}>
      {/* Status Header */}
      <Card style={themed($statusCard)}>
        <View style={themed($statusHeader)}>
          <View style={[themed($statusIconContainer), { backgroundColor: theme.colors.palette[statusConfig.status === "success" ? "seafoam300" : statusConfig.status === "error" ? "coral300" : "ocean300"] }]}>
            <Icon icon={statusConfig.icon} size={24} color={theme.colors.palette.sand100} />
          </View>
          <View style={themed($statusInfo)}>
            <Badge
              text={statusConfig.label}
              status={statusConfig.status}
              size="md"
              badgeStyle="solid"
            />
            {estimatedDelivery && status !== "delivered" && (
              <Text
                text={`Est. delivery: ${formatDate(estimatedDelivery)}`}
                size="sm"
                style={themed($estimatedText)}
              />
            )}
            {actualDelivery && status === "delivered" && (
              <Text
                text={`Delivered: ${formatDate(actualDelivery)}`}
                size="sm"
                style={themed($deliveredText)}
              />
            )}
          </View>
        </View>

        {currentLocation && status === "in_transit" && (
          <View style={themed($currentLocationBox)}>
            <Icon icon="pin" size={16} color={theme.colors.palette.ocean500} />
            <Text text={currentLocation} size="sm" style={themed($currentLocationText)} />
          </View>
        )}
      </Card>

      {/* Tracking Steps */}
      <Card style={themed($stepsCard)}>
        <Text text="Tracking Progress" preset="subheading" style={themed($sectionTitle)} />
        <View style={themed($stepsContainer)}>
          {processedSteps.map((step, index) => (
            <View key={step.status} style={themed($stepRow)}>
              <View style={themed($stepIndicator)}>
                <View
                  style={[
                    themed($stepDot),
                    step.completed && themed($stepDotCompleted),
                    step.current && themed($stepDotCurrent),
                  ]}
                >
                  {step.completed && (
                    <Icon icon="check" size={12} color={theme.colors.palette.sand100} />
                  )}
                </View>
                {index < processedSteps.length - 1 && (
                  <View
                    style={[
                      themed($stepLine),
                      step.completed && themed($stepLineCompleted),
                    ]}
                  />
                )}
              </View>
              <View style={themed($stepContent)}>
                <Text
                  text={step.label}
                  size="sm"
                  weight={step.current ? "bold" : "normal"}
                  style={[themed($stepLabel), step.completed && themed($stepLabelCompleted)]}
                />
                {step.timestamp && (
                  <Text text={formatDate(step.timestamp)} size="xs" style={themed($stepTime)} />
                )}
                {step.location && (
                  <Text text={step.location} size="xs" style={themed($stepLocation)} />
                )}
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Shipment Details */}
      <Card style={themed($detailsCard)}>
        <Text text="Shipment Details" preset="subheading" style={themed($sectionTitle)} />

        <View style={themed($detailRow)}>
          <Text text="Order ID" size="sm" style={themed($detailLabel)} />
          <Text text={orderId} size="sm" weight="medium" style={themed($detailValue)} />
        </View>

        {trackingNumber && (
          <View style={themed($detailRow)}>
            <Text text="Tracking #" size="sm" style={themed($detailLabel)} />
            <Text text={trackingNumber} size="sm" weight="medium" style={themed($detailValue)} />
          </View>
        )}

        {carrier && (
          <View style={themed($detailRow)}>
            <Text text="Carrier" size="sm" style={themed($detailLabel)} />
            <Text text={carrier} size="sm" weight="medium" style={themed($detailValue)} />
          </View>
        )}

        <Divider style={themed($divider)} />

        {origin && (
          <View style={themed($addressRow)}>
            <Icon icon="pin" size={14} color={theme.colors.palette.sand500} />
            <View style={themed($addressInfo)}>
              <Text text="From" size="xs" style={themed($addressLabel)} />
              <Text text={origin} size="sm" style={themed($addressText)} />
            </View>
          </View>
        )}

        {destination && (
          <View style={themed($addressRow)}>
            <Icon icon="pin" size={14} color={theme.colors.palette.ocean500} />
            <View style={themed($addressInfo)}>
              <Text text="To" size="xs" style={themed($addressLabel)} />
              <Text text={destination} size="sm" style={themed($addressText)} />
            </View>
          </View>
        )}
      </Card>

      {/* Driver Info & Actions */}
      {(driverName || onTrackOnMap || onReportIssue) && (
        <Card style={themed($actionsCard)}>
          {driverName && (
            <View style={themed($driverInfo)}>
              <View style={themed($driverAvatar)}>
                <Icon icon="community" size={20} color={theme.colors.palette.sand600} />
              </View>
              <View style={themed($driverDetails)}>
                <Text text={driverName} size="sm" weight="medium" />
                {driverPhone && <Text text={driverPhone} size="xs" style={themed($driverPhone)} />}
              </View>
              {onContactDriver && (
                <Button
                  text="Call"
                  preset="default"
                  onPress={onContactDriver}
                  style={themed($callButton)}
                />
              )}
            </View>
          )}

          <View style={themed($actionButtons)}>
            {onTrackOnMap && (
              <Button
                text="Track on Map"
                preset="reversed"
                onPress={onTrackOnMap}
                style={themed($actionButton)}
              />
            )}
            {onReportIssue && (
              <Button
                text="Report Issue"
                preset="default"
                onPress={onReportIssue}
                style={themed($actionButton)}
              />
            )}
          </View>
        </Card>
      )}
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $statusCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $statusHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.md,
})

const $statusIconContainer: ThemedStyle<ViewStyle> = () => ({
  width: 48,
  height: 48,
  borderRadius: 24,
  alignItems: "center",
  justifyContent: "center",
})

const $statusInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxs,
})

const $estimatedText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $deliveredText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.seafoam500,
})

const $currentLocationBox: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  marginTop: spacing.md,
  padding: spacing.sm,
  backgroundColor: colors.palette.ocean100,
  borderRadius: 8,
})

const $currentLocationText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean600,
  flex: 1,
})

const $stepsCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand800,
  marginBottom: spacing.md,
})

const $stepsContainer: ThemedStyle<ViewStyle> = () => ({})

const $stepRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
})

const $stepIndicator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
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
})

const $stepLine: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 2,
  height: 40,
  backgroundColor: colors.palette.sand300,
})

const $stepLineCompleted: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.seafoam400,
})

const $stepContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingBottom: spacing.md,
})

const $stepLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
})

const $stepLabelCompleted: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $stepTime: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $stepLocation: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $detailsCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $detailRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.xs,
})

const $detailLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $detailValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $divider: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.md,
})

const $addressRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.sm,
  marginBottom: spacing.sm,
})

const $addressInfo: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $addressLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $addressText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $actionsCard: ThemedStyle<ViewStyle> = () => ({})

const $driverInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.md,
})

const $driverAvatar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: colors.palette.sand200,
  alignItems: "center",
  justifyContent: "center",
  marginRight: spacing.sm,
})

const $driverDetails: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $driverPhone: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $callButton: ThemedStyle<ViewStyle> = () => ({
  paddingHorizontal: 16,
})

const $actionButtons: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $actionButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
