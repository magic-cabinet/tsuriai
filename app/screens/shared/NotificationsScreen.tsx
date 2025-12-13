import { View, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { Screen, Text, Header, EmptyState } from "@/components"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export function NotificationsScreen() {
  const { themed } = useAppTheme()

  // Mock notifications - will be replaced with real data
  const notifications: Array<{
    id: string
    title: string
    message: string
    time: string
    type: "bid" | "order" | "system"
  }> = []

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]}>
      <Header title="通知" titleMode="center" />
      <View style={themed($container)}>
        {notifications.length === 0 ? (
          <EmptyState
            preset="generic"
            heading="通知はありません"
            content="新しい入札やご注文の更新があるとここに表示されます"
            imageStyle={$emptyImage}
          />
        ) : (
          notifications.map((notification) => (
            <View key={notification.id} style={themed($notificationItem)}>
              <View style={themed($notificationHeader)}>
                <Text weight="semiBold" text={notification.title} />
                <Text size="xs" text={notification.time} style={themed($time)} />
              </View>
              <Text size="sm" text={notification.message} style={themed($message)} />
            </View>
          ))
        )}
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
  gap: spacing.md,
})

const $notificationItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  gap: spacing.xs,
})

const $notificationHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $time: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $message: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $emptyImage: ImageStyle = {
  height: 200,
}
