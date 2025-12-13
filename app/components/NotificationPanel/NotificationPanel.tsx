import { FlatList, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { Icon, IconTypes } from "../Icon"
import { Badge } from "../Badge"
import { Avatar } from "../Avatar"
import { Spinner } from "../Spinner"
import { EmptyState } from "../EmptyState"

type NotificationType = "bid" | "auction" | "message" | "system" | "alert"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  avatar?: string
  avatarName?: string
}

export interface NotificationPanelProps {
  /**
   * Array of notifications to display
   */
  notifications: Notification[]
  /**
   * Callback when a notification is pressed
   */
  onNotificationPress?: (notification: Notification) => void
  /**
   * Callback when mark all as read is pressed
   */
  onMarkAllRead?: () => void
  /**
   * Callback when clear all is pressed
   */
  onClearAll?: () => void
  /**
   * Whether the panel is loading
   */
  loading?: boolean
  /**
   * Number of unread notifications
   */
  unreadCount?: number
  /**
   * Header title
   * @default "Notifications"
   */
  title?: string
  /**
   * Empty state title
   */
  emptyTitle?: string
  /**
   * Empty state description
   */
  emptyDescription?: string
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const NOTIFICATION_ICONS: Record<NotificationType, IconTypes> = {
  bid: "components",
  auction: "bell",
  message: "community",
  system: "settings",
  alert: "bell",
}

/**
 * NotificationPanel component for displaying user notifications.
 * Shows a list of notifications with actions to mark as read or clear.
 *
 * @param {NotificationPanelProps} props - The props for the `NotificationPanel` component.
 * @returns {JSX.Element} The rendered `NotificationPanel` component.
 *
 * @example
 * <NotificationPanel
 *   notifications={notifications}
 *   onNotificationPress={(notif) => handleNotification(notif)}
 *   onMarkAllRead={() => markAllAsRead()}
 *   unreadCount={5}
 * />
 */
export function NotificationPanel(props: NotificationPanelProps) {
  const {
    notifications,
    onNotificationPress,
    onMarkAllRead,
    onClearAll,
    loading = false,
    unreadCount,
    title = "Notifications",
    emptyTitle = "No notifications",
    emptyDescription = "You're all caught up!",
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const formatTimestamp = (date: Date): string => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const renderNotification = ({ item }: { item: Notification }) => {
    const iconName = NOTIFICATION_ICONS[item.type]

    return (
      <Pressable
        style={[themed($notificationItem), !item.read && themed($unreadItem)]}
        onPress={() => onNotificationPress?.(item)}
      >
        <View style={themed($iconContainer)}>
          {item.avatar || item.avatarName ? (
            <Avatar
              name={item.avatarName || ""}
              source={item.avatar ? { uri: item.avatar } : undefined}
              size="sm"
            />
          ) : (
            <View style={themed($iconCircle)}>
              <Icon
                icon={iconName}
                size={18}
                color={theme.colors.palette.ocean500}
              />
            </View>
          )}
          {!item.read && <View style={themed($unreadDot)} />}
        </View>

        <View style={themed($contentContainer)}>
          <View style={themed($titleRow)}>
            <Text
              text={item.title}
              size="sm"
              weight={item.read ? "normal" : "medium"}
              style={themed($titleText)}
              numberOfLines={1}
            />
            <Text text={formatTimestamp(item.timestamp)} size="xxs" style={themed($timestamp)} />
          </View>
          <Text
            text={item.message}
            size="xs"
            style={themed($messageText)}
            numberOfLines={2}
          />
        </View>
      </Pressable>
    )
  }

  const renderHeader = () => (
    <View style={themed($header)}>
      <View style={themed($headerTitle)}>
        <Text text={title} preset="subheading" />
        {unreadCount !== undefined && unreadCount > 0 && (
          <Badge text={unreadCount.toString()} status="error" size="sm" badgeStyle="solid" />
        )}
      </View>
      <View style={themed($headerActions)}>
        {onMarkAllRead && notifications.some((n) => !n.read) && (
          <Pressable onPress={onMarkAllRead} style={themed($headerButton)}>
            <Text text="Mark all read" size="xs" style={themed($headerButtonText)} />
          </Pressable>
        )}
        {onClearAll && notifications.length > 0 && (
          <Pressable onPress={onClearAll} style={themed($headerButton)}>
            <Text text="Clear all" size="xs" style={themed($headerButtonText)} />
          </Pressable>
        )}
      </View>
    </View>
  )

  const renderEmpty = () => {
    if (loading) return null
    return (
      <EmptyState
        heading={emptyTitle}
        content={emptyDescription}
        imageSource={require("@assets/images/logo.png")}
        style={themed($emptyState)}
      />
    )
  }

  if (loading) {
    return (
      <View style={[themed($loadingContainer), $styleOverride]}>
        {renderHeader()}
        <View style={themed($loadingContent)}>
          <Spinner size="lg" />
          <Text text="Loading notifications..." size="sm" style={themed($loadingText)} />
        </View>
      </View>
    )
  }

  return (
    <View style={[themed($container), $styleOverride]}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <View style={themed($separator)} />}
        contentContainerStyle={notifications.length === 0 ? themed($emptyContainer) : undefined}
      />
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.sand300,
})

const $headerTitle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $headerActions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.md,
})

const $headerButton: ThemedStyle<ViewStyle> = () => ({})

const $headerButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ocean500,
})

const $notificationItem: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  backgroundColor: colors.background,
})

const $unreadItem: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.ocean100,
})

const $iconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.sm,
  position: "relative",
})

const $iconCircle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: colors.palette.sand200,
  alignItems: "center",
  justifyContent: "center",
})

const $unreadDot: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: colors.palette.coral500,
  borderWidth: 2,
  borderColor: colors.background,
})

const $contentContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $titleRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $titleText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
  flex: 1,
})

const $timestamp: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand500,
  marginLeft: spacing.sm,
})

const $messageText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand600,
  marginTop: spacing.xxxs,
})

const $separator: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 1,
  backgroundColor: colors.palette.sand200,
})

const $loadingContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $loadingContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: spacing.md,
})

const $loadingText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $emptyState: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
})

const $emptyContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
