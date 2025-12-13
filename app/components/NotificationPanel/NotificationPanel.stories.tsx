import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { NotificationPanel, Notification } from "./NotificationPanel"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand100,
    flex: 1,
  },
})

const meta = {
  title: "Operations/NotificationPanel",
  component: NotificationPanel,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    notifications: [],
  },
} satisfies Meta<typeof NotificationPanel>

export default meta

type Story = StoryObj<typeof meta>

// Sample notifications
const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "bid",
    title: "You've been outbid!",
    message: "Someone placed a higher bid on Bluefin Tuna. Current bid: $2,500",
    timestamp: new Date(Date.now() - 300000), // 5 min ago
    read: false,
  },
  {
    id: "2",
    type: "auction",
    title: "Auction ending soon",
    message: "Premium Salmon auction ends in 30 minutes. Don't miss out!",
    timestamp: new Date(Date.now() - 1800000), // 30 min ago
    read: false,
  },
  {
    id: "3",
    type: "bid",
    title: "Bid placed successfully",
    message: "Your bid of $1,800 on Yellowtail has been placed.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: true,
    avatarName: "Kenji Yamamoto",
  },
  {
    id: "4",
    type: "message",
    title: "New message from Tanaka Fishery",
    message: "Thank you for your interest in our premium catch. Let me know if you have questions.",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    read: true,
    avatarName: "Tanaka Fishery",
  },
  {
    id: "5",
    type: "system",
    title: "Account verified",
    message: "Your seller account has been verified. You can now list items for auction.",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
  },
  {
    id: "6",
    type: "alert",
    title: "Payment reminder",
    message: "Please complete payment for your won auction within 24 hours.",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    read: true,
  },
]

export const Default: Story = {
  args: {
    notifications: sampleNotifications,
    unreadCount: 2,
    onNotificationPress: (notif) => console.log("Notification pressed:", notif.id),
    onMarkAllRead: () => console.log("Mark all read"),
    onClearAll: () => console.log("Clear all"),
  },
}

export const AllUnread: Story = {
  name: "All Unread",
  args: {
    notifications: sampleNotifications.map((n) => ({ ...n, read: false })),
    unreadCount: sampleNotifications.length,
    onNotificationPress: (notif) => console.log("Notification pressed:", notif.id),
    onMarkAllRead: () => console.log("Mark all read"),
  },
}

export const AllRead: Story = {
  name: "All Read",
  args: {
    notifications: sampleNotifications.map((n) => ({ ...n, read: true })),
    unreadCount: 0,
    onNotificationPress: (notif) => console.log("Notification pressed:", notif.id),
    onClearAll: () => console.log("Clear all"),
  },
}

export const Loading: Story = {
  args: {
    notifications: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    notifications: [],
    emptyTitle: "No notifications",
    emptyDescription: "You're all caught up! Check back later for updates.",
  },
}

export const ManyNotifications: Story = {
  name: "Many Notifications",
  args: {
    notifications: Array.from({ length: 20 }, (_, i) => ({
      id: `notif-${i}`,
      type: (["bid", "auction", "message", "system", "alert"] as const)[i % 5],
      title: `Notification ${i + 1}`,
      message: `This is the message content for notification number ${i + 1}.`,
      timestamp: new Date(Date.now() - i * 3600000),
      read: i > 3,
    })),
    unreadCount: 4,
    onNotificationPress: (notif) => console.log("Notification pressed:", notif.id),
    onMarkAllRead: () => console.log("Mark all read"),
  },
}
