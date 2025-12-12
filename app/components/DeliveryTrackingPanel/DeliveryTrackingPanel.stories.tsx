import { ScrollView, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { DeliveryTrackingPanel } from "./DeliveryTrackingPanel"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand200,
    flex: 1,
    padding: 16,
  },
})

const meta = {
  title: "Domain/DeliveryTrackingPanel",
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

export const InTransit: Story = {
  args: {
    orderId: "ORD-12345",
    status: "in_transit",
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

export const OutForDelivery: Story = {
  name: "Out for Delivery",
  args: {
    orderId: "ORD-12346",
    status: "out_for_delivery",
    estimatedDelivery: new Date(Date.now() + 3600000),
    carrier: "FishExpress Logistics",
    trackingNumber: "FE123456790JP",
    origin: "Tsukiji Fish Market, Tokyo",
    destination: "789 Sushi Lane, Kyoto",
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
    carrier: "FishExpress Logistics",
    trackingNumber: "FE123456785JP",
    origin: "Tsukiji Fish Market, Tokyo",
    destination: "123 Restaurant Ave, Tokyo",
  },
}

export const Pending: Story = {
  args: {
    orderId: "ORD-12350",
    status: "pending",
    estimatedDelivery: new Date(Date.now() + 172800000),
    carrier: "FishExpress Logistics",
    trackingNumber: "FE123456800JP",
    origin: "Hokkaido Fishing Port",
    destination: "Tokyo Central Market",
  },
}

export const Failed: Story = {
  args: {
    orderId: "ORD-12360",
    status: "failed",
    carrier: "FishExpress Logistics",
    trackingNumber: "FE123456810JP",
    origin: "Osaka Port",
    destination: "Kobe Restaurant District",
    onReportIssue: () => console.log("Report issue"),
  },
}
