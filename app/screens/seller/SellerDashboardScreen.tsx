import { View, ViewStyle, ScrollView, TextStyle } from "react-native"
import { Screen, Text, Header, Card } from "@/components"
import { StatCard } from "@/components/StatCard"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export function SellerDashboardScreen() {
  const { themed, theme } = useAppTheme()
  const { colors } = theme

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header
        title="ダッシュボード"
        titleMode="center"
        rightIcon="bell"
        onRightPress={() => {}}
      />
      <ScrollView style={themed($scrollView)} contentContainerStyle={themed($container)}>
        {/* Today's Stats */}
        <View style={themed($section)}>
          <Text preset="subheading" text="本日の実績" style={themed($sectionTitle)} />
          <View style={themed($statsGrid)}>
            <StatCard
              label="売上"
              value="¥248,500"
              trend="up"
              trendValue="+12.5%"
              style={themed($statCard)}
            />
            <StatCard
              label="取引数"
              value="18"
              trend="up"
              trendValue="+3"
              style={themed($statCard)}
            />
            <StatCard
              label="平均単価"
              value="¥13,806"
              trend="down"
              trendValue="-2.1%"
              style={themed($statCard)}
            />
            <StatCard
              label="出品中"
              value="24"
              style={themed($statCard)}
            />
          </View>
        </View>

        {/* Active Auctions */}
        <View style={themed($section)}>
          <View style={themed($sectionHeader)}>
            <Text preset="subheading" text="進行中のセリ" />
            <Text size="sm" text="すべて見る →" style={{ color: colors.tint }} />
          </View>
          <Card
            preset="default"
            heading="本マグロ 特選"
            content="現在価格: ¥45,000 | 入札数: 12"
            footer="残り 2:34"
            style={themed($auctionCard)}
          />
          <Card
            preset="default"
            heading="ヒラメ 活〆"
            content="現在価格: ¥8,500 | 入札数: 5"
            footer="残り 5:12"
            style={themed($auctionCard)}
          />
        </View>

        {/* Recent Orders */}
        <View style={themed($section)}>
          <View style={themed($sectionHeader)}>
            <Text preset="subheading" text="最近の注文" />
            <Text size="sm" text="すべて見る →" style={{ color: colors.tint }} />
          </View>
          <View style={themed($orderItem)}>
            <View>
              <Text weight="semiBold" text="注文 #2024-1234" />
              <Text size="sm" text="寿司店 すし匠" style={themed($orderSubtext)} />
            </View>
            <View style={themed($orderRight)}>
              <Text weight="semiBold" text="¥32,400" />
              <View style={themed($statusBadge)}>
                <Text size="xs" text="発送準備中" style={{ color: colors.palette.neutral100 }} />
              </View>
            </View>
          </View>
          <View style={themed($orderItem)}>
            <View>
              <Text weight="semiBold" text="注文 #2024-1233" />
              <Text size="sm" text="割烹 魚心" style={themed($orderSubtext)} />
            </View>
            <View style={themed($orderRight)}>
              <Text weight="semiBold" text="¥18,900" />
              <View style={[themed($statusBadge), { backgroundColor: colors.success }]}>
                <Text size="xs" text="配送中" style={{ color: colors.palette.neutral100 }} />
              </View>
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

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $sectionTitle: ThemedStyle<ViewStyle> = () => ({})

const $sectionHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $statsGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.sm,
})

const $statCard: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  minWidth: "45%",
})

const $auctionCard: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 8,
})

const $orderItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: spacing.md,
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
})

const $orderSubtext: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $orderRight: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "flex-end",
  gap: spacing.xs,
})

const $statusBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.warning,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  borderRadius: 4,
})
