import { View, ViewStyle, ScrollView, TextStyle, Pressable } from "react-native"
import { Screen, Text, Header, Button, TextField, Icon } from "@/components"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

interface CartItem {
  id: string
  nameJa: string
  nameEn: string
  price: number
  quantity: number
  unit: string
  seller: string
  grade: string
}

interface ShippingAddress {
  name: string
  phone: string
  postalCode: string
  prefecture: string
  city: string
  address: string
  building?: string
}

// Mock cart data
const mockCartItems: CartItem[] = [
  { id: "1", nameJa: "本マグロ", nameEn: "Bluefin Tuna", price: 45000, quantity: 1, unit: "kg", seller: "大間漁港", grade: "特選" },
  { id: "2", nameJa: "真鯛", nameEn: "Sea Bream", price: 3200, quantity: 2, unit: "kg", seller: "焼津港", grade: "上" },
]

// Mock shipping address
const mockAddress: ShippingAddress = {
  name: "田中 太郎",
  phone: "090-1234-5678",
  postalCode: "100-0001",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内1-1-1",
  building: "丸の内ビル 10F",
}

export function CheckoutScreen({ navigation }: AppStackScreenProps<"Checkout">) {
  const { themed, theme } = useAppTheme()
  const { colors } = theme

  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 1500
  const serviceFee = Math.round(subtotal * 0.05)
  const total = subtotal + shippingFee + serviceFee

  const handlePlaceOrder = () => {
    // TODO: Process order
    // navigation.navigate("OrderConfirmation")
  }

  const handleEditAddress = () => {
    // TODO: Navigate to address edit
  }

  const handleEditPayment = () => {
    // TODO: Navigate to payment edit
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header
        title="注文確認"
        titleMode="center"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView style={themed($scrollView)} contentContainerStyle={themed($container)}>
        {/* Shipping Address */}
        <View style={themed($section)}>
          <View style={themed($sectionHeader)}>
            <Text preset="subheading" text="配送先" />
            <Pressable onPress={handleEditAddress}>
              <Text size="sm" text="変更" style={{ color: colors.tint }} />
            </Pressable>
          </View>
          <View style={themed($addressCard)}>
            <View style={themed($addressRow)}>
              <Icon icon="pin" size={18} color={colors.textDim} />
              <View style={themed($addressContent)}>
                <Text weight="semiBold" text={mockAddress.name} />
                <Text size="sm" text={mockAddress.phone} style={themed($dimText)} />
                <Text size="sm" text={`〒${mockAddress.postalCode}`} style={themed($dimText)} />
                <Text size="sm" text={`${mockAddress.prefecture}${mockAddress.city}${mockAddress.address}`} />
                {mockAddress.building && (
                  <Text size="sm" text={mockAddress.building} />
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Schedule */}
        <View style={themed($section)}>
          <Text preset="subheading" text="配送日時" />
          <View style={themed($deliveryOptions)}>
            <Pressable>
              <View style={[themed($deliveryOption), themed($selectedOption)]}>
                <Text weight="semiBold" text="最短" />
                <Text size="sm" text="12月14日(土) 午前中" />
              </View>
            </Pressable>
            <Pressable>
              <View style={themed($deliveryOption)}>
                <Text weight="semiBold" text="指定" />
                <Text size="sm" text="日時を選択" style={themed($dimText)} />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Order Items */}
        <View style={themed($section)}>
          <Text preset="subheading" text="注文商品" />
          {mockCartItems.map((item) => (
            <View key={item.id} style={themed($orderItem)}>
              <View style={themed($itemImage)} />
              <View style={themed($itemInfo)}>
                <View style={themed($itemHeader)}>
                  <Text weight="semiBold" text={item.nameJa} />
                  <View style={[themed($gradeBadge), { backgroundColor: colors.tint }]}>
                    <Text size="xxs" text={item.grade} style={{ color: colors.palette.neutral100 }} />
                  </View>
                </View>
                <Text size="sm" text={item.seller} style={themed($dimText)} />
                <View style={themed($itemFooter)}>
                  <Text size="sm" text={`${item.quantity} ${item.unit}`} style={themed($dimText)} />
                  <Text weight="bold" text={`¥${(item.price * item.quantity).toLocaleString()}`} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Method */}
        <View style={themed($section)}>
          <View style={themed($sectionHeader)}>
            <Text preset="subheading" text="お支払い方法" />
            <Pressable onPress={handleEditPayment}>
              <Text size="sm" text="変更" style={{ color: colors.tint }} />
            </Pressable>
          </View>
          <View style={themed($paymentCard)}>
            <View style={themed($paymentRow)}>
              <View style={themed($cardIcon)}>
                <Text size="xs" text="VISA" style={{ color: colors.palette.neutral100 }} />
              </View>
              <View style={themed($paymentInfo)}>
                <Text weight="semiBold" text="•••• •••• •••• 4242" />
                <Text size="sm" text="有効期限: 12/26" style={themed($dimText)} />
              </View>
              <Icon icon="caretRight" size={18} color={colors.textDim} />
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={themed($section)}>
          <Text preset="subheading" text="お支払い金額" />
          <View style={themed($summaryCard)}>
            <View style={themed($summaryRow)}>
              <Text text="商品小計" />
              <Text text={`¥${subtotal.toLocaleString()}`} />
            </View>
            <View style={themed($summaryRow)}>
              <Text text="送料" />
              <Text text={`¥${shippingFee.toLocaleString()}`} />
            </View>
            <View style={themed($summaryRow)}>
              <Text text="サービス手数料" />
              <Text text={`¥${serviceFee.toLocaleString()}`} />
            </View>
            <View style={themed($summaryDivider)} />
            <View style={themed($summaryRow)}>
              <Text weight="bold" size="lg" text="合計" />
              <Text weight="bold" size="lg" text={`¥${total.toLocaleString()}`} style={themed($totalText)} />
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={themed($section)}>
          <Text preset="subheading" text="備考・要望" />
          <TextField
            placeholder="配送時の注意事項など..."
            multiline
            inputWrapperStyle={themed($notesField)}
          />
        </View>

        {/* Spacer for bottom button */}
        <View style={themed($bottomSpacer)} />
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View style={themed($actionBar)}>
        <View style={themed($totalDisplay)}>
          <Text size="sm" text="合計" style={themed($dimText)} />
          <Text weight="bold" size="xl" text={`¥${total.toLocaleString()}`} style={themed($japanesePrice)} />
        </View>
        <Button
          text="注文を確定する"
          preset="filled"
          onPress={handlePlaceOrder}
          style={themed($orderButton)}
        />
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
  paddingBottom: spacing.xxxl,
})

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $sectionHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $addressCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
})

const $addressRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $addressContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxs,
})

const $dimText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $deliveryOptions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $deliveryOption: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
  borderWidth: 2,
  borderColor: "transparent",
})

const $selectedOption: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.tint,
})

const $orderItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.sm,
  gap: spacing.sm,
})

const $itemImage: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 64,
  height: 64,
  borderRadius: 8,
  backgroundColor: colors.palette.neutral300,
})

const $itemInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxs,
})

const $itemHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $gradeBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xs,
  paddingVertical: 2,
  borderRadius: 4,
})

const $itemFooter: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $paymentCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
})

const $paymentRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.md,
})

const $cardIcon: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.ocean500,
  borderRadius: 4,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
})

const $paymentInfo: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
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

const $summaryDivider: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 1,
  backgroundColor: colors.border,
})

const $totalText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

const $notesField: ThemedStyle<ViewStyle> = () => ({
  minHeight: 80,
  alignItems: "flex-start",
})

const $bottomSpacer: ThemedStyle<ViewStyle> = () => ({
  height: 100,
})

const $actionBar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.background,
  borderTopWidth: 1,
  borderTopColor: colors.border,
  padding: spacing.md,
  paddingBottom: spacing.lg,
  gap: spacing.md,
})

const $totalDisplay: ThemedStyle<ViewStyle> = () => ({})

const $japanesePrice: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.japanese.bold,
})

const $orderButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
