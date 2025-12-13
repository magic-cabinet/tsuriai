import { ScrollView, View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { DeliveryTrackingPanel } from "./DeliveryTrackingPanel"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand200,
    flex: 1,
    padding: 16,
  },
  grid: {
    gap: 16,
  },
})

const meta = {
  title: "Operations/DeliveryTrackingPanel",
  component: DeliveryTrackingPanel,
  decorators: [
    (Story) => (
      <ScrollView style={styles.decorator}>
        <Story />
      </ScrollView>
    ),
  ],
  args: {
    orderId: "ORD-12345",
    status: "in_transit",
  },
} satisfies Meta<typeof DeliveryTrackingPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    orderId: "ORD-12345",
    status: "in_transit",
    estimatedDelivery: new Date(Date.now() + 86400000),
    currentLocation: "Nagoya Distribution Center",
    driverName: "Takeshi Yamada",
    driverPhone: "+81 90-1234-5678",
    onContactDriver: () => console.log("Contact driver"),
    onTrackOnMap: () => console.log("Track on map"),
    onReportIssue: () => console.log("Report issue"),
  },
}

export const Compact: Story = {
  name: "Compact Variant",
  args: {
    orderId: "ORD-12345",
    status: "in_transit",
    variant: "compact",
    estimatedDelivery: new Date(Date.now() + 86400000),
  },
}

export const Detailed: Story = {
  name: "Detailed Variant",
  args: {
    orderId: "ORD-12345",
    status: "in_transit",
    variant: "detailed",
    estimatedDelivery: new Date(Date.now() + 86400000),
    carrier: "FishExpress Logistics",
    trackingNumber: "FE123456789JP",
    origin: "Tsukiji Fish Market, Tokyo",
    destination: "456 Restaurant Row, Osaka",
    currentLocation: "Nagoya Distribution Center",
    driverName: "Takeshi Yamada",
    driverPhone: "+81 90-1234-5678",
    onContactDriver: () => console.log("Contact driver"),
    onTrackOnMap: () => console.log("Track on map"),
    onReportIssue: () => console.log("Report issue"),
  },
}

export const Pending: Story = {
  args: {
    orderId: "ORD-12350",
    status: "pending",
    estimatedDelivery: new Date(Date.now() + 172800000),
  },
}

export const PickedUp: Story = {
  name: "Picked Up",
  args: {
    orderId: "ORD-12351",
    status: "picked_up",
    estimatedDelivery: new Date(Date.now() + 86400000),
  },
}

export const OutForDelivery: Story = {
  name: "Out for Delivery",
  args: {
    orderId: "ORD-12346",
    status: "out_for_delivery",
    estimatedDelivery: new Date(Date.now() + 3600000),
    currentLocation: "5 km away from destination",
    driverName: "Kenji Sato",
    driverPhone: "+81 90-9876-5432",
    onContactDriver: () => console.log("Contact driver"),
    onTrackOnMap: () => console.log("Track on map"),
  },
}

export const Delivered: Story = {
  args: {
    orderId: "ORD-12340",
    status: "delivered",
    actualDelivery: new Date(Date.now() - 3600000),
  },
}

export const Failed: Story = {
  args: {
    orderId: "ORD-12360",
    status: "failed",
    onReportIssue: () => console.log("Report issue"),
  },
}

export const AllStatuses: Story = {
  name: "All Statuses (Compact)",
  render: () => (
    <View style={styles.grid}>
      <DeliveryTrackingPanel
        orderId="ORD-001"
        status="pending"
        variant="compact"
        estimatedDelivery={new Date(Date.now() + 172800000)}
      />
      <DeliveryTrackingPanel
        orderId="ORD-002"
        status="picked_up"
        variant="compact"
        estimatedDelivery={new Date(Date.now() + 86400000)}
      />
      <DeliveryTrackingPanel
        orderId="ORD-003"
        status="in_transit"
        variant="compact"
        estimatedDelivery={new Date(Date.now() + 43200000)}
      />
      <DeliveryTrackingPanel
        orderId="ORD-004"
        status="out_for_delivery"
        variant="compact"
        estimatedDelivery={new Date(Date.now() + 3600000)}
      />
      <DeliveryTrackingPanel
        orderId="ORD-005"
        status="delivered"
        variant="compact"
      />
      <DeliveryTrackingPanel
        orderId="ORD-006"
        status="failed"
        variant="compact"
      />
    </View>
  ),
}
