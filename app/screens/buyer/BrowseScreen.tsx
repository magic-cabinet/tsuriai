import { View, ViewStyle, ScrollView, Pressable, TextStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Screen, Text, Header, TextField, Button } from "@/components"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import type { AppStackParamList } from "@/navigators/navigationTypes"

interface FishListing {
  id: string
  nameJa: string
  nameEn: string
  price: number
  unit: string
  grade: string
  seller: string
  location: string
  freshness: string
  isAuction: boolean
}

const mockListings: FishListing[] = [
  { id: "1", nameJa: "本マグロ", nameEn: "Bluefin Tuna", price: 45000, unit: "kg", grade: "特選", seller: "大間漁港", location: "青森", freshness: "朝獲れ", isAuction: true },
  { id: "2", nameJa: "真鯛", nameEn: "Sea Bream", price: 3200, unit: "kg", grade: "上", seller: "焼津港", location: "静岡", freshness: "朝獲れ", isAuction: false },
  { id: "3", nameJa: "ブリ", nameEn: "Yellowtail", price: 8500, unit: "本", grade: "特選", seller: "氷見漁港", location: "富山", freshness: "活〆", isAuction: false },
  { id: "4", nameJa: "ヒラメ", nameEn: "Flounder", price: 6800, unit: "kg", grade: "上", seller: "境港", location: "鳥取", freshness: "活〆", isAuction: true },
  { id: "5", nameJa: "スルメイカ", nameEn: "Squid", price: 800, unit: "杯", grade: "並", seller: "函館港", location: "北海道", freshness: "朝獲れ", isAuction: false },
  { id: "6", nameJa: "ウニ", nameEn: "Sea Urchin", price: 12000, unit: "箱", grade: "特選", seller: "利尻島", location: "北海道", freshness: "当日", isAuction: false },
]

const categories = ["すべて", "マグロ類", "白身魚", "青魚", "甲殻類", "貝類", "その他"]

export function BrowseScreen() {
  const { themed, theme } = useAppTheme()
  const { colors } = theme
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header title="さがす" titleMode="center" />
      <ScrollView style={themed($scrollView)} contentContainerStyle={themed($container)}>
        {/* Search Bar */}
        <TextField
          placeholder="魚種、産地、漁港で検索..."
          LeftAccessory={() => <Text text="🔍" style={themed($searchIcon)} />}
          style={themed($searchField)}
        />

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={themed($categoriesScroll)}>
          {categories.map((category, index) => (
            <Pressable key={category}>
              <View style={[themed($categoryChip), index === 0 && themed($categoryChipActive)]}>
                <Text
                  size="sm"
                  text={category}
                  style={index === 0 ? { color: colors.palette.neutral100 } : { color: colors.text }}
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Filters */}
        <View style={themed($filterRow)}>
          <Button text="産地" preset="default" style={themed($filterButton)} />
          <Button text="価格" preset="default" style={themed($filterButton)} />
          <Button text="鮮度" preset="default" style={themed($filterButton)} />
          <Button text="セリのみ" preset="default" style={themed($filterButton)} />
        </View>

        {/* Results Header */}
        <View style={themed($resultsHeader)}>
          <Text size="sm" text={`${mockListings.length}件の結果`} style={themed($resultsCount)} />
          <Text size="sm" text="並び替え: 新着順 ▼" style={{ color: colors.tint }} />
        </View>

        {/* Listings Grid */}
        <View style={themed($listingsGrid)}>
          {mockListings.map((listing) => (
            <Pressable key={listing.id} style={themed($listingCard)} onPress={() => navigation.navigate("FishDetail", { fishId: listing.id })}>
              {/* Image placeholder */}
              <View style={themed($listingImage)}>
                {listing.isAuction && (
                  <View style={themed($auctionBadge)}>
                    <Text size="xxs" text="🔴 セリ" style={{ color: colors.palette.neutral100 }} />
                  </View>
                )}
              </View>

              {/* Content */}
              <View style={themed($listingContent)}>
                <View style={themed($listingHeader)}>
                  <Text weight="bold" text={listing.nameJa} />
                  <View style={[themed($gradeBadge), { backgroundColor: colors.tint }]}>
                    <Text size="xxs" text={listing.grade} style={{ color: colors.palette.neutral100 }} />
                  </View>
                </View>

                <View style={themed($badgeRow)}>
                  <View style={themed($freshnessTag)}>
                    <Text size="xxs" text={listing.freshness} style={{ color: colors.success }} />
                  </View>
                  <Text size="xs" text={listing.location} style={themed($locationText)} />
                </View>

                <View style={themed($listingFooter)}>
                  <Text weight="bold" size="lg" text={`¥${listing.price.toLocaleString()}`} />
                  <Text size="xs" text={`/${listing.unit}`} style={themed($unitText)} />
                </View>

                <Text size="xs" text={listing.seller} style={themed($sellerText)} />
              </View>
            </Pressable>
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
  gap: spacing.md,
  paddingBottom: spacing.xxxl,
})

const $searchField: ThemedStyle<ViewStyle> = () => ({})

const $searchIcon: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginLeft: spacing.sm,
})

const $categoriesScroll: ThemedStyle<ViewStyle> = () => ({
  marginHorizontal: -16,
  paddingHorizontal: 16,
})

const $categoryChip: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderRadius: 20,
  backgroundColor: colors.palette.neutral200,
  marginRight: spacing.sm,
})

const $categoryChipActive: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
})

const $filterRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.xs,
})

const $filterButton: ThemedStyle<ViewStyle> = () => ({
  minHeight: 32,
  paddingHorizontal: 12,
})

const $resultsHeader: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $resultsCount: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $listingsGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.sm,
})

const $listingCard: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: "48%",
  backgroundColor: colors.palette.neutral200,
  borderRadius: 12,
  overflow: "hidden",
})

const $listingImage: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 100,
  backgroundColor: colors.palette.neutral300,
  position: "relative",
})

const $auctionBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  top: spacing.xs,
  left: spacing.xs,
  backgroundColor: colors.palette.coral400,
  paddingHorizontal: spacing.xs,
  paddingVertical: 2,
  borderRadius: 4,
})

const $listingContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.sm,
  gap: spacing.xxs,
})

const $listingHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $gradeBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xs,
  paddingVertical: 2,
  borderRadius: 4,
})

const $badgeRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $freshnessTag: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.seafoam100,
  paddingHorizontal: spacing.xs,
  paddingVertical: 2,
  borderRadius: 4,
})

const $locationText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $listingFooter: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "baseline",
})

const $unitText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $sellerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
