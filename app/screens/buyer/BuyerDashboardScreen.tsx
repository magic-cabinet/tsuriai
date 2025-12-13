import { View, ViewStyle, ScrollView, Pressable, TextStyle } from "react-native"
import { Screen, Text, Header } from "@/components"
import { StatCard } from "@/components/StatCard"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface FeaturedFish {
  id: string
  name: string
  nameJa: string
  price: number
  grade: string
  seller: string
  isAuction: boolean
  timeLeft?: string
}

const featuredFish: FeaturedFish[] = [
  { id: "1", name: "Bluefin Tuna", nameJa: "本マグロ", price: 45000, grade: "特選", seller: "大間漁港", isAuction: true, timeLeft: "2:34" },
  { id: "2", name: "Sea Bream", nameJa: "真鯛", price: 3200, grade: "朝獲れ", seller: "焼津港", isAuction: false },
  { id: "3", name: "Yellowtail", nameJa: "ブリ", price: 8500, grade: "上", seller: "氷見漁港", isAuction: true, timeLeft: "15:22" },
]

export function BuyerDashboardScreen() {
  const { themed, theme } = useAppTheme()
  const { colors } = theme

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header
        title="Tsuriai"
        titleMode="flex"
        rightIcon="bell"
        onRightPress={() => {}}
      />
      <ScrollView style={themed($scrollView)} contentContainerStyle={themed($container)}>
        {/* Welcome Section */}
        <View style={themed($welcomeSection)}>
          <Text size="lg" text="おはようございます" />
          <Text preset="heading" text="田中さん" />
        </View>

        {/* Quick Stats */}
        <View style={themed($statsRow)}>
          <StatCard
            label="進行中の入札"
            value="3"
            style={themed($statCard)}
          />
          <StatCard
            label="ウォッチリスト"
            value="12"
            style={themed($statCard)}
          />
        </View>

        {/* Live Auctions */}
        <View style={themed($section)}>
          <View style={themed($sectionHeader)}>
            <Text preset="subheading" text="🔴 ライブセリ" />
            <Text size="sm" text="すべて見る →" style={{ color: colors.tint }} />
          </View>
          {featuredFish.filter(f => f.isAuction).map((fish) => (
            <Pressable key={fish.id}>
              <View style={themed($auctionCard)}>
                <View style={themed($auctionHeader)}>
                  <View>
                    <View style={themed($fishNameRow)}>
                      <Text weight="bold" size="lg" text={fish.nameJa} style={themed($japaneseText)} />
                      <View style={[themed($gradeBadge), { backgroundColor: colors.tint }]}>
                        <Text size="xxs" text={fish.grade} style={themed($gradeText)} />
                      </View>
                    </View>
                    <Text size="sm" text={fish.seller} style={themed($sellerText)} />
                  </View>
                  <View style={themed($priceContainer)}>
                    <Text size="xxs" text="現在価格" style={themed($priceLabel)} />
                    <Text weight="bold" size="xl" text={`¥${fish.price.toLocaleString()}`} style={themed($priceText)} />
                  </View>
                </View>
                <View style={themed($auctionFooter)}>
                  <View style={themed($timerBadge)}>
                    <Text size="sm" weight="semiBold" text={`残り ${fish.timeLeft}`} style={{ color: colors.palette.coral400 }} />
                  </View>
                  <Text size="sm" text="入札する →" style={{ color: colors.tint }} />
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Fresh Today */}
        <View style={themed($section)}>
          <View style={themed($sectionHeader)}>
            <Text preset="subheading" text="🐟 本日の入荷" />
            <Text size="sm" text="すべて見る →" style={{ color: colors.tint }} />
          </View>
          <View style={themed($fishGrid)}>
            {featuredFish.filter(f => !f.isAuction).map((fish) => (
              <View key={fish.id} style={themed($fishCard)}>
                <View style={themed($fishCardImage)} />
                <View style={themed($fishCardContent)}>
                  <Text weight="semiBold" text={fish.nameJa} />
                  <Text size="xs" text={fish.seller} style={themed($sellerText)} />
                  <Text weight="bold" text={`¥${fish.price.toLocaleString()}`} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={themed($section)}>
          <View style={themed($sectionHeader)}>
            <Text preset="subheading" text="📦 最近の注文" />
            <Text size="sm" text="すべて見る →" style={{ color: colors.tint }} />
          </View>
          <View style={themed($orderCard)}>
            <View style={themed($orderInfo)}>
              <Text weight="semiBold" text="注文 #2024-5678" />
              <Text size="sm" text="本マグロ x1, 真鯛 x3" style={themed($sellerText)} />
            </View>
            <View style={[themed($statusBadge), { backgroundColor: colors.tint }]}>
              <Text size="xs" text="配送中" style={{ color: colors.palette.neutral100 }} />
            </View>
          </View>
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

const $welcomeSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxs,
})

const $statsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $statCard: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $sectionHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $auctionCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral200,
  borderRadius: 16,
  padding: spacing.md,
  gap: spacing.sm,
})

const $auctionHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
})

const $fishNameRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
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

const $priceContainer: ThemedStyle<ViewStyle> = () => ({
  alignItems: "flex-end",
})

const $priceLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $auctionFooter: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderTopWidth: 1,
  borderTopColor: colors.border,
  paddingTop: 8,
})

const $timerBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.coral100,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  borderRadius: 4,
})

const $fishGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.sm,
})

const $fishCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  minWidth: "45%",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  overflow: "hidden",
})

const $fishCardImage: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 100,
  backgroundColor: colors.palette.neutral300,
})

const $fishCardContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.sm,
  gap: spacing.xxs,
})

const $orderCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  padding: spacing.md,
})

const $orderInfo: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxs,
})

const $statusBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  borderRadius: 4,
})

// Japanese typography styles - Noto Sans JP for traditional market feel
const $japaneseText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.japanese.bold,
})

const $gradeText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontFamily: typography.japanese.medium,
  color: colors.palette.neutral100,
})

const $priceText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.japanese.bold,
})
