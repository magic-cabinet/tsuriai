import { View, ViewStyle, ScrollView, TextStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Screen, Text, Header, Button, EmptyState } from "@/components"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import type { AppStackParamList } from "@/navigators/navigationTypes"

interface CartItem {
  id: string
  nameJa: string
  seller: string
  quantity: number
  unit: string
  price: number
  grade: string
}

const mockCartItems: CartItem[] = [
  { id: "1", nameJa: "本マグロ", seller: "大間漁港", quantity: 1, unit: "本", price: 45000, grade: "特選" },
  { id: "2", nameJa: "真鯛", seller: "焼津港", quantity: 3, unit: "kg", price: 3200, grade: "上" },
  { id: "3", nameJa: "ウニ", seller: "利尻島", quantity: 2, unit: "箱", price: 12000, grade: "特選" },
]

export function CartScreen() {
  const { themed, theme } = useAppTheme()
  const { colors } = theme
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 2500
  const total = subtotal + shipping

  if (mockCartItems.length === 0) {
    return (
      <Screen preset="fixed" safeAreaEdges={["top"]}>
        <Header title="カート" titleMode="center" />
        <View style={themed($emptyContainer)}>
          <EmptyState
            preset="generic"
            heading="カートは空です"
            content="商品を追加してください"
            button="商品を探す"
            buttonOnPress={() => {}}
          />
        </View>
      </Screen>
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header title="カート" titleMode="center" rightText="編集" />
      <ScrollView style={themed($scrollView)} contentContainerStyle={themed($container)}>
        {/* Cart Items */}
        <View style={themed($section)}>
          <Text preset="subheading" text={`${mockCartItems.length}点の商品`} />
          {mockCartItems.map((item) => (
            <View key={item.id} style={themed($cartItem)}>
              <View style={themed($itemImage)} />
              <View style={themed($itemDetails)}>
                <View style={themed($itemHeader)}>
                  <Text weight="bold" text={item.nameJa} />
                  <View style={[themed($gradeBadge), { backgroundColor: colors.tint }]}>
                    <Text size="xxs" text={item.grade} style={{ color: colors.palette.neutral100 }} />
                  </View>
                </View>
                <Text size="sm" text={item.seller} style={themed($sellerText)} />
                <View style={themed($itemFooter)}>
                  <View style={themed($quantityControl)}>
                    <Button text="-" preset="default" style={themed($quantityButton)} />
                    <Text weight="semiBold" text={String(item.quantity)} />
                    <Button text="+" preset="default" style={themed($quantityButton)} />
                  </View>
                  <Text weight="bold" text={`¥${(item.price * item.quantity).toLocaleString()}`} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={themed($summarySection)}>
          <Text preset="subheading" text="注文内容" />
          <View style={themed($summaryCard)}>
            <View style={themed($summaryRow)}>
              <Text text="小計" />
              <Text text={`¥${subtotal.toLocaleString()}`} />
            </View>
            <View style={themed($summaryRow)}>
              <Text text="配送料" />
              <Text text={`¥${shipping.toLocaleString()}`} />
            </View>
            <View style={themed($divider)} />
            <View style={themed($summaryRow)}>
              <Text weight="bold" text="合計" />
              <Text weight="bold" size="xl" text={`¥${total.toLocaleString()}`} />
            </View>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={themed($section)}>
          <Text preset="subheading" text="配送先" />
          <View style={themed($addressCard)}>
            <Text weight="semiBold" text="東京都中央区築地 5-2-1" />
            <Text size="sm" text="すし匠 田中太郎様" style={themed($addressSubtext)} />
            <Text size="sm" text="03-1234-5678" style={themed($addressSubtext)} />
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={themed($checkoutBar)}>
        <View>
          <Text size="xs" text="合計" style={themed($checkoutLabel)} />
          <Text weight="bold" size="xl" text={`¥${total.toLocaleString()}`} />
        </View>
        <Button text="注文を確定する" preset="filled" style={themed($checkoutButton)} onPress={() => navigation.navigate("Checkout")} />
      </View>
    </Screen>
  )
}

const $scrollView: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
  gap: spacing.lg,
  paddingBottom: 120,
})

const $emptyContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
})

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $cartItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  overflow: "hidden",
})

const $itemImage: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 100,
  backgroundColor: colors.palette.neutral300,
})

const $itemDetails: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.md,
  gap: spacing.xs,
})

const $itemHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $gradeBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xs,
  paddingVertical: 2,
  borderRadius: 4,
})

const $sellerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $itemFooter: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 8,
})

const $quantityControl: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
})

const $quantityButton: ThemedStyle<ViewStyle> = () => ({
  minHeight: 28,
  minWidth: 28,
  paddingHorizontal: 0,
})

const $summarySection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $summaryCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
  gap: spacing.sm,
})

const $summaryRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $divider: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 1,
  backgroundColor: colors.border,
})

const $addressCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
  gap: spacing.xxs,
})

const $addressSubtext: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $checkoutBar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: colors.background,
  borderTopWidth: 1,
  borderTopColor: colors.border,
  padding: spacing.lg,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $checkoutLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $checkoutButton: ThemedStyle<ViewStyle> = () => ({
  minWidth: 180,
})
