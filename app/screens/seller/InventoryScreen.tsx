import { View, ViewStyle, ScrollView, TextStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Screen, Text, Header, Button } from "@/components"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import type { AppStackParamList } from "@/navigators/navigationTypes"

interface InventoryItem {
  id: string
  name: string
  nameJa: string
  quantity: number
  unit: string
  grade: string
  price: number
  status: "available" | "reserved" | "sold"
}

const mockInventory: InventoryItem[] = [
  { id: "1", name: "Bluefin Tuna", nameJa: "本マグロ", quantity: 3, unit: "本", grade: "特選", price: 45000, status: "available" },
  { id: "2", name: "Yellowtail", nameJa: "ブリ", quantity: 8, unit: "本", grade: "上", price: 8500, status: "available" },
  { id: "3", name: "Sea Bream", nameJa: "真鯛", quantity: 12, unit: "匹", grade: "並", price: 3200, status: "available" },
  { id: "4", name: "Flounder", nameJa: "ヒラメ", quantity: 5, unit: "匹", grade: "活〆", price: 6800, status: "reserved" },
  { id: "5", name: "Squid", nameJa: "スルメイカ", quantity: 20, unit: "杯", grade: "朝獲れ", price: 800, status: "available" },
]

export function InventoryScreen() {
  const { themed, theme } = useAppTheme()
  const { colors } = theme
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "available": return colors.success
      case "reserved": return colors.warning
      case "sold": return colors.textDim
    }
  }

  const getStatusText = (status: InventoryItem["status"]) => {
    switch (status) {
      case "available": return "販売中"
      case "reserved": return "予約済"
      case "sold": return "売却済"
    }
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header
        title="在庫管理"
        titleMode="center"
        rightIcon="more"
        onRightPress={() => {}}
      />
      <ScrollView style={themed($scrollView)} contentContainerStyle={themed($container)}>
        {/* Summary */}
        <View style={themed($summary)}>
          <View style={themed($summaryItem)}>
            <Text size="xxl" weight="bold" text={String(mockInventory.length)} />
            <Text size="xs" text="品目" style={themed($summaryLabel)} />
          </View>
          <View style={themed($summaryDivider)} />
          <View style={themed($summaryItem)}>
            <Text size="xxl" weight="bold" text={String(mockInventory.filter(i => i.status === "available").length)} />
            <Text size="xs" text="販売可能" style={themed($summaryLabel)} />
          </View>
          <View style={themed($summaryDivider)} />
          <View style={themed($summaryItem)}>
            <Text size="xxl" weight="bold" text="¥1.2M" />
            <Text size="xs" text="在庫価値" style={themed($summaryLabel)} />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={themed($quickActions)}>
          <Button text="＋ 新規登録" preset="filled" style={themed($actionButton)} onPress={() => navigation.navigate("CreateListing")} />
          <Button text="一括編集" preset="default" style={themed($actionButton)} />
        </View>

        {/* Inventory List */}
        <View style={themed($section)}>
          <Text preset="subheading" text="在庫一覧" style={themed($sectionTitle)} />
          {mockInventory.map((item) => (
            <View key={item.id} style={themed($inventoryItem)}>
              <View style={themed($itemLeft)}>
                <View style={themed($itemHeader)}>
                  <Text weight="bold" text={item.nameJa} />
                  <View style={[themed($gradeBadge), { backgroundColor: colors.tint }]}>
                    <Text size="xxs" text={item.grade} style={{ color: colors.palette.neutral100 }} />
                  </View>
                </View>
                <Text size="sm" text={`${item.quantity} ${item.unit}`} style={themed($itemSubtext)} />
              </View>
              <View style={themed($itemRight)}>
                <Text weight="semiBold" text={`¥${item.price.toLocaleString()}`} />
                <View style={[themed($statusBadge), { backgroundColor: getStatusColor(item.status) }]}>
                  <Text size="xxs" text={getStatusText(item.status)} style={{ color: colors.palette.neutral100 }} />
                </View>
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

const $summary: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 16,
  padding: spacing.lg,
  justifyContent: "space-around",
})

const $summaryItem: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

const $summaryLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  marginTop: 4,
})

const $summaryDivider: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 1,
  backgroundColor: colors.border,
})

const $quickActions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $actionButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $sectionTitle: ThemedStyle<ViewStyle> = () => ({})

const $inventoryItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: spacing.md,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
})

const $itemLeft: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxs,
})

const $itemHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $itemSubtext: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $itemRight: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "flex-end",
  gap: spacing.xs,
})

const $gradeBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xs,
  paddingVertical: 2,
  borderRadius: 4,
})

const $statusBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  borderRadius: 4,
})
