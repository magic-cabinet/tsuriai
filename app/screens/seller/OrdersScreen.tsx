import { View, ViewStyle, ScrollView, TextStyle } from "react-native"
import { Screen, Text, Header, Button } from "@/components"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface Order {
  id: string
  orderNumber: string
  buyerName: string
  items: string
  total: number
  status: "pending" | "preparing" | "shipping" | "delivered"
  date: string
}

const mockOrders: Order[] = [
  { id: "1", orderNumber: "2024-1234", buyerName: "寿司店 すし匠", items: "本マグロ x1, ヒラメ x2", total: 58400, status: "preparing", date: "12/13" },
  { id: "2", orderNumber: "2024-1233", buyerName: "割烹 魚心", items: "真鯛 x3, ブリ x1", total: 18100, status: "shipping", date: "12/13" },
  { id: "3", orderNumber: "2024-1232", buyerName: "イタリアン ペスカトーレ", items: "スルメイカ x10", total: 8000, status: "delivered", date: "12/12" },
  { id: "4", orderNumber: "2024-1231", buyerName: "居酒屋 魚河岸", items: "ブリ x2, 真鯛 x5", total: 33000, status: "pending", date: "12/13" },
]

export function OrdersScreen() {
  const { themed, theme } = useAppTheme()
  const { colors } = theme

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending": return colors.palette.coral400
      case "preparing": return colors.warning
      case "shipping": return colors.tint
      case "delivered": return colors.success
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "未処理"
      case "preparing": return "準備中"
      case "shipping": return "配送中"
      case "delivered": return "完了"
    }
  }

  const pendingCount = mockOrders.filter(o => o.status === "pending").length
  const preparingCount = mockOrders.filter(o => o.status === "preparing").length

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header title="注文管理" titleMode="center" />
      <ScrollView style={themed($scrollView)} contentContainerStyle={themed($container)}>
        {/* Summary Cards */}
        <View style={themed($summaryRow)}>
          <View style={[themed($summaryCard), { backgroundColor: colors.palette.coral100 }]}>
            <Text size="xxl" weight="bold" text={String(pendingCount)} style={{ color: colors.palette.coral400 }} />
            <Text size="xs" text="未処理" style={{ color: colors.palette.coral400 }} />
          </View>
          <View style={[themed($summaryCard), { backgroundColor: colors.palette.sunset100 }]}>
            <Text size="xxl" weight="bold" text={String(preparingCount)} style={{ color: colors.warning }} />
            <Text size="xs" text="準備中" style={{ color: colors.warning }} />
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={themed($filterTabs)}>
          <Button text="すべて" preset="filled" style={themed($filterTab)} />
          <Button text="未処理" preset="default" style={themed($filterTab)} />
          <Button text="準備中" preset="default" style={themed($filterTab)} />
          <Button text="配送中" preset="default" style={themed($filterTab)} />
        </View>

        {/* Orders List */}
        <View style={themed($section)}>
          {mockOrders.map((order) => (
            <View key={order.id} style={themed($orderCard)}>
              <View style={themed($orderHeader)}>
                <View>
                  <Text weight="bold" text={`注文 #${order.orderNumber}`} />
                  <Text size="sm" text={order.buyerName} style={themed($buyerName)} />
                </View>
                <View style={[themed($statusBadge), { backgroundColor: getStatusColor(order.status) }]}>
                  <Text size="xs" text={getStatusText(order.status)} style={{ color: colors.palette.neutral100 }} />
                </View>
              </View>

              <View style={themed($orderDetails)}>
                <Text size="sm" text={order.items} numberOfLines={1} style={themed($itemsText)} />
              </View>

              <View style={themed($orderFooter)}>
                <Text size="sm" text={order.date} style={themed($dateText)} />
                <Text weight="bold" text={`¥${order.total.toLocaleString()}`} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  )
}

const $scrollView: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
  gap: spacing.lg,
  paddingBottom: spacing.xxxl,
})

const $summaryRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $summaryCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.md,
  borderRadius: 12,
  alignItems: "center",
})

const $filterTabs: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xs,
})

const $filterTab: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  minHeight: 36,
})

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $orderCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
  gap: spacing.sm,
})

const $orderHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
})

const $buyerName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $statusBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  borderRadius: 4,
})

const $orderDetails: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderTopWidth: 1,
  borderTopColor: colors.border,
  paddingTop: 8,
})

const $itemsText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $orderFooter: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $dateText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
