import { View, ViewStyle, ScrollView, TextStyle, Image, Pressable } from "react-native"
import { Screen, Text, Header, Button, Icon } from "@/components"
import { Badge } from "@/components/Badge"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

interface FishDetail {
  id: string
  nameJa: string
  nameEn: string
  price: number
  pricePerKg: number
  weight: number
  unit: string
  grade: string
  gradeLabel: string
  freshness: string
  freshnessLabel: string
  seller: {
    name: string
    location: string
    rating: number
    totalSales: number
  }
  origin: string
  catchDate: string
  description: string
  isAuction: boolean
  currentBid?: number
  bidCount?: number
  timeLeft?: string
  specs: {
    length?: string
    method?: string
    handling?: string
  }
}

// Mock data - will be replaced with API call
const mockFishDetails: Record<string, FishDetail> = {
  "1": {
    id: "1",
    nameJa: "本マグロ",
    nameEn: "Bluefin Tuna",
    price: 45000,
    pricePerKg: 4500,
    weight: 10,
    unit: "kg",
    grade: "特選",
    gradeLabel: "Premium",
    freshness: "朝獲れ",
    freshnessLabel: "Fresh Morning Catch",
    seller: {
      name: "大間漁港",
      location: "青森県大間町",
      rating: 4.9,
      totalSales: 1234,
    },
    origin: "津軽海峡",
    catchDate: "2024-12-13",
    description: "大間の一本釣り本マグロ。脂のりが抜群で、大トロから赤身まで楽しめる最高級品です。",
    isAuction: true,
    currentBid: 48000,
    bidCount: 12,
    timeLeft: "2:34:15",
    specs: {
      length: "180cm",
      method: "一本釣り",
      handling: "活〆・神経締め",
    },
  },
  "2": {
    id: "2",
    nameJa: "真鯛",
    nameEn: "Sea Bream",
    price: 3200,
    pricePerKg: 3200,
    weight: 1,
    unit: "kg",
    grade: "上",
    gradeLabel: "Choice",
    freshness: "朝獲れ",
    freshnessLabel: "Fresh Morning Catch",
    seller: {
      name: "焼津港",
      location: "静岡県焼津市",
      rating: 4.7,
      totalSales: 892,
    },
    origin: "駿河湾",
    catchDate: "2024-12-13",
    description: "駿河湾産の天然真鯛。身が締まって刺身に最適です。",
    isAuction: false,
    specs: {
      length: "45cm",
      method: "延縄",
      handling: "氷〆",
    },
  },
}

export function FishDetailScreen({ route, navigation }: AppStackScreenProps<"FishDetail">) {
  const { fishId } = route.params
  const { themed, theme } = useAppTheme()
  const { colors } = theme

  // Get fish details (mock data for now)
  const fish = mockFishDetails[fishId] || mockFishDetails["1"]

  const handleBid = () => {
    // TODO: Open bid modal
  }

  const handleBuyNow = () => {
    navigation.navigate("Checkout")
  }

  const handleAddToCart = () => {
    // TODO: Add to cart
  }

  const handleContactSeller = () => {
    // TODO: Open chat
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header
        title={fish.nameJa}
        titleMode="center"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        rightIcon="heart"
        onRightPress={() => {}}
      />
      <ScrollView style={themed($scrollView)} contentContainerStyle={themed($container)}>
        {/* Hero Image */}
        <View style={themed($heroImage)}>
          {fish.isAuction && (
            <View style={themed($liveBadge)}>
              <Text size="sm" weight="bold" text="🔴 ライブセリ" style={{ color: colors.palette.neutral100 }} />
            </View>
          )}
        </View>

        {/* Main Info Card */}
        <View style={themed($mainInfoCard)}>
          {/* Species Header */}
          <View style={themed($speciesHeader)}>
            <View>
              <Text preset="heading" text={fish.nameJa} style={themed($japaneseTitle)} />
              <Text size="md" text={fish.nameEn} style={themed($englishTitle)} />
            </View>
            <View style={themed($badgeGroup)}>
              <View style={[themed($gradeBadge), { backgroundColor: colors.tint }]}>
                <Text size="xs" weight="bold" text={fish.grade} style={{ color: colors.palette.neutral100 }} />
              </View>
              <View style={themed($freshnessBadge)}>
                <Text size="xs" weight="semiBold" text={fish.freshness} style={{ color: colors.success }} />
              </View>
            </View>
          </View>

          {/* Price Section */}
          <View style={themed($priceSection)}>
            {fish.isAuction ? (
              <View style={themed($auctionPricing)}>
                <View style={themed($currentBidContainer)}>
                  <Text size="xs" text="現在価格" style={themed($priceLabel)} />
                  <Text weight="bold" text={`¥${fish.currentBid?.toLocaleString()}`} style={themed($bigPrice)} />
                </View>
                <View style={themed($bidInfo)}>
                  <Text size="sm" text={`${fish.bidCount}件の入札`} style={themed($bidCount)} />
                  <View style={themed($timerBadge)}>
                    <Text size="sm" weight="bold" text={`残り ${fish.timeLeft}`} style={{ color: colors.palette.coral400 }} />
                  </View>
                </View>
              </View>
            ) : (
              <View style={themed($fixedPricing)}>
                <Text size="xs" text="販売価格" style={themed($priceLabel)} />
                <View style={themed($priceRow)}>
                  <Text weight="bold" text={`¥${fish.price.toLocaleString()}`} style={themed($bigPrice)} />
                  <Text size="sm" text={`(¥${fish.pricePerKg.toLocaleString()}/${fish.unit})`} style={themed($unitPrice)} />
                </View>
              </View>
            )}
          </View>

          {/* Quick Stats */}
          <View style={themed($statsRow)}>
            <View style={themed($statItem)}>
              <Text size="xxs" text="重量" style={themed($statLabel)} />
              <Text weight="bold" text={`${fish.weight}${fish.unit}`} />
            </View>
            <View style={themed($statDivider)} />
            <View style={themed($statItem)}>
              <Text size="xxs" text="産地" style={themed($statLabel)} />
              <Text weight="bold" text={fish.origin} />
            </View>
            <View style={themed($statDivider)} />
            <View style={themed($statItem)}>
              <Text size="xxs" text="水揚げ" style={themed($statLabel)} />
              <Text weight="bold" text={fish.catchDate} />
            </View>
          </View>
        </View>

        {/* Specs Section */}
        <View style={themed($section)}>
          <Text preset="subheading" text="詳細情報" />
          <View style={themed($specsGrid)}>
            {fish.specs.length && (
              <View style={themed($specItem)}>
                <Text size="xs" text="サイズ" style={themed($specLabel)} />
                <Text weight="semiBold" text={fish.specs.length} />
              </View>
            )}
            {fish.specs.method && (
              <View style={themed($specItem)}>
                <Text size="xs" text="漁法" style={themed($specLabel)} />
                <Text weight="semiBold" text={fish.specs.method} />
              </View>
            )}
            {fish.specs.handling && (
              <View style={themed($specItem)}>
                <Text size="xs" text="処理" style={themed($specLabel)} />
                <Text weight="semiBold" text={fish.specs.handling} />
              </View>
            )}
          </View>
        </View>

        {/* Description */}
        <View style={themed($section)}>
          <Text preset="subheading" text="商品説明" />
          <Text text={fish.description} style={themed($descriptionText)} />
        </View>

        {/* Seller Card */}
        <View style={themed($section)}>
          <Text preset="subheading" text="出品者" />
          <Pressable onPress={handleContactSeller}>
            <View style={themed($sellerCard)}>
              <View style={themed($sellerAvatar)}>
                <Text size="lg" weight="bold" text={fish.seller.name.charAt(0)} style={{ color: colors.palette.neutral100 }} />
              </View>
              <View style={themed($sellerInfo)}>
                <Text weight="bold" text={fish.seller.name} />
                <Text size="sm" text={fish.seller.location} style={themed($sellerLocation)} />
                <View style={themed($sellerStats)}>
                  <Text size="xs" text={`⭐ ${fish.seller.rating}`} />
                  <Text size="xs" text={`・${fish.seller.totalSales}件の取引`} style={themed($sellerLocation)} />
                </View>
              </View>
              <Icon icon="caretRight" size={20} color={colors.textDim} />
            </View>
          </Pressable>
        </View>

        {/* Spacer for bottom buttons */}
        <View style={themed($bottomSpacer)} />
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View style={themed($actionBar)}>
        {fish.isAuction ? (
          <>
            <Button
              text="入札する"
              preset="filled"
              onPress={handleBid}
              style={themed($primaryButton)}
            />
            <Button
              text="ウォッチ"
              preset="default"
              onPress={() => {}}
              style={themed($secondaryButton)}
            />
          </>
        ) : (
          <>
            <Button
              text="今すぐ購入"
              preset="filled"
              onPress={handleBuyNow}
              style={themed($primaryButton)}
            />
            <Button
              text="カートに追加"
              preset="default"
              onPress={handleAddToCart}
              style={themed($secondaryButton)}
            />
          </>
        )}
      </View>
    </Screen>
  )
}

const $scrollView: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxxl,
})

const $heroImage: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 250,
  backgroundColor: colors.palette.neutral300,
  position: "relative",
})

const $liveBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  top: spacing.md,
  left: spacing.md,
  backgroundColor: colors.palette.coral500,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  borderRadius: 8,
})

const $mainInfoCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  marginTop: -24,
  padding: spacing.lg,
  gap: spacing.md,
})

const $speciesHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
})

const $japaneseTitle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.japanese.bold,
})

const $englishTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $badgeGroup: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xs,
})

const $gradeBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  borderRadius: 4,
})

const $freshnessBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.seafoam100,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  borderRadius: 4,
})

const $priceSection: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
})

const $auctionPricing: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $currentBidContainer: ThemedStyle<ViewStyle> = () => ({})

const $priceLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $bigPrice: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 32,
  color: colors.text,
  fontFamily: typography.japanese.bold,
})

const $bidInfo: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $bidCount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $timerBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.coral100,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  borderRadius: 4,
})

const $fixedPricing: ThemedStyle<ViewStyle> = () => ({})

const $priceRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "baseline",
})

const $unitPrice: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  marginLeft: 8,
})

const $statsRow: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
})

const $statItem: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignItems: "center",
})

const $statLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  marginBottom: 4,
})

const $statDivider: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 1,
  backgroundColor: colors.border,
})

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
  gap: spacing.sm,
})

const $specsGrid: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.sm,
})

const $specItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 8,
  padding: spacing.sm,
  minWidth: "30%",
  flex: 1,
})

const $specLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  marginBottom: 2,
})

const $descriptionText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  lineHeight: 24,
})

const $sellerCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
  gap: spacing.md,
})

const $sellerAvatar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: colors.tint,
  alignItems: "center",
  justifyContent: "center",
})

const $sellerInfo: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $sellerLocation: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $sellerStats: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
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
  backgroundColor: colors.background,
  borderTopWidth: 1,
  borderTopColor: colors.border,
  padding: spacing.md,
  paddingBottom: spacing.lg,
  gap: spacing.sm,
})

const $primaryButton: ThemedStyle<ViewStyle> = () => ({
  flex: 2,
})

const $secondaryButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
