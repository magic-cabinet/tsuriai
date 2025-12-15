import { useState } from "react"
import { View, ViewStyle, ScrollView, TextStyle, Pressable } from "react-native"
import { Screen, Text, Header, Button, TextField } from "@/components"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

interface ListingForm {
  species: string
  speciesJa: string
  weight: string
  unit: string
  grade: string
  freshness: string
  pricePerUnit: string
  origin: string
  catchDate: string
  description: string
  isAuction: boolean
  startingPrice?: string
  reservePrice?: string
  auctionDuration?: string
}

const gradeOptions = [
  { value: "特選", label: "特選 (Premium)" },
  { value: "上", label: "上 (Choice)" },
  { value: "並", label: "並 (Standard)" },
]

const freshnessOptions = [
  { value: "活", label: "活 (Live)" },
  { value: "活〆", label: "活〆 (Live-killed)" },
  { value: "朝獲れ", label: "朝獲れ (Morning catch)" },
  { value: "氷〆", label: "氷〆 (Ice-killed)" },
  { value: "冷凍", label: "冷凍 (Frozen)" },
]

const unitOptions = ["kg", "本", "匹", "杯", "箱"]

export function CreateListingScreen({ navigation }: AppStackScreenProps<"CreateListing">) {
  const { themed, theme } = useAppTheme()
  const { colors } = theme

  const [form, setForm] = useState<ListingForm>({
    species: "",
    speciesJa: "",
    weight: "",
    unit: "kg",
    grade: "上",
    freshness: "朝獲れ",
    pricePerUnit: "",
    origin: "",
    catchDate: new Date().toISOString().split("T")[0],
    description: "",
    isAuction: false,
    startingPrice: "",
    reservePrice: "",
    auctionDuration: "24",
  })

  const handleSubmit = () => {
    // TODO: Validate and submit listing
    navigation.goBack()
  }

  const updateForm = (key: keyof ListingForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header
        title="出品登録"
        titleMode="center"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView style={themed($scrollView)} contentContainerStyle={themed($container)}>
        {/* Photo Upload */}
        <View style={themed($section)}>
          <Text preset="subheading" text="商品写真" />
          <View style={themed($photoGrid)}>
            <Pressable style={themed($addPhotoButton)}>
              <Text text="＋" size="xxl" style={{ color: colors.textDim }} />
              <Text size="xs" text="写真を追加" style={themed($addPhotoText)} />
            </Pressable>
            <View style={themed($photoPlaceholder)} />
            <View style={themed($photoPlaceholder)} />
          </View>
          <Text size="xs" text="最大6枚まで。1枚目がメイン画像になります。" style={themed($helperText)} />
        </View>

        {/* Basic Info */}
        <View style={themed($section)}>
          <Text preset="subheading" text="基本情報" />

          <View style={themed($row)}>
            <View style={themed($fieldHalf)}>
              <Text size="sm" weight="semiBold" text="魚種（日本語）" style={themed($fieldLabel)} />
              <TextField
                placeholder="例: 本マグロ"
                value={form.speciesJa}
                onChangeText={(text) => updateForm("speciesJa", text)}
              />
            </View>
            <View style={themed($fieldHalf)}>
              <Text size="sm" weight="semiBold" text="Species (English)" style={themed($fieldLabel)} />
              <TextField
                placeholder="e.g., Bluefin Tuna"
                value={form.species}
                onChangeText={(text) => updateForm("species", text)}
              />
            </View>
          </View>

          <View style={themed($row)}>
            <View style={themed($fieldHalf)}>
              <Text size="sm" weight="semiBold" text="重量/数量" style={themed($fieldLabel)} />
              <TextField
                placeholder="例: 10"
                value={form.weight}
                onChangeText={(text) => updateForm("weight", text)}
                keyboardType="numeric"
              />
            </View>
            <View style={themed($fieldHalf)}>
              <Text size="sm" weight="semiBold" text="単位" style={themed($fieldLabel)} />
              <View style={themed($chipRow)}>
                {unitOptions.map((unit) => (
                  <Pressable
                    key={unit}
                    onPress={() => updateForm("unit", unit)}
                  >
                    <View style={[
                      themed($chip),
                      form.unit === unit && themed($chipSelected),
                    ]}>
                      <Text
                        size="sm"
                        text={unit}
                        style={form.unit === unit ? { color: colors.palette.neutral100 } : undefined}
                      />
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Quality */}
        <View style={themed($section)}>
          <Text preset="subheading" text="品質" />

          <Text size="sm" weight="semiBold" text="等級" style={themed($fieldLabel)} />
          <View style={themed($chipRow)}>
            {gradeOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => updateForm("grade", option.value)}
              >
                <View style={[
                  themed($chip),
                  form.grade === option.value && themed($chipSelected),
                ]}>
                  <Text
                    size="sm"
                    text={option.label}
                    style={form.grade === option.value ? { color: colors.palette.neutral100 } : undefined}
                  />
                </View>
              </Pressable>
            ))}
          </View>

          <Text size="sm" weight="semiBold" text="鮮度" style={themed($fieldLabel)} />
          <View style={themed($chipRow)}>
            {freshnessOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => updateForm("freshness", option.value)}
              >
                <View style={[
                  themed($chip),
                  form.freshness === option.value && themed($chipSelected),
                ]}>
                  <Text
                    size="sm"
                    text={option.value}
                    style={form.freshness === option.value ? { color: colors.palette.neutral100 } : undefined}
                  />
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Origin & Date */}
        <View style={themed($section)}>
          <Text preset="subheading" text="産地・水揚げ" />

          <View style={themed($row)}>
            <View style={themed($fieldHalf)}>
              <Text size="sm" weight="semiBold" text="産地/漁場" style={themed($fieldLabel)} />
              <TextField
                placeholder="例: 津軽海峡"
                value={form.origin}
                onChangeText={(text) => updateForm("origin", text)}
              />
            </View>
            <View style={themed($fieldHalf)}>
              <Text size="sm" weight="semiBold" text="水揚げ日" style={themed($fieldLabel)} />
              <TextField
                placeholder="YYYY-MM-DD"
                value={form.catchDate}
                onChangeText={(text) => updateForm("catchDate", text)}
              />
            </View>
          </View>
        </View>

        {/* Pricing */}
        <View style={themed($section)}>
          <Text preset="subheading" text="販売方法" />

          <View style={themed($saleTypeRow)}>
            <Pressable
              style={themed($saleTypeOption)}
              onPress={() => updateForm("isAuction", false)}
            >
              <View style={[
                themed($saleTypeCard),
                !form.isAuction && themed($saleTypeSelected),
              ]}>
                <Text weight="bold" text="即売" />
                <Text size="xs" text="固定価格で販売" style={themed($saleTypeDesc)} />
              </View>
            </Pressable>
            <Pressable
              style={themed($saleTypeOption)}
              onPress={() => updateForm("isAuction", true)}
            >
              <View style={[
                themed($saleTypeCard),
                form.isAuction && themed($saleTypeSelected),
              ]}>
                <Text weight="bold" text="セリ" />
                <Text size="xs" text="オークション形式" style={themed($saleTypeDesc)} />
              </View>
            </Pressable>
          </View>

          {!form.isAuction ? (
            <View>
              <Text size="sm" weight="semiBold" text="販売価格（税込）" style={themed($fieldLabel)} />
              <TextField
                placeholder="¥"
                value={form.pricePerUnit}
                onChangeText={(text) => updateForm("pricePerUnit", text)}
                keyboardType="numeric"
                LeftAccessory={() => <Text text="¥" style={themed($currencyPrefix)} />}
              />
              <Text size="xs" text={`/${form.unit} あたりの価格を入力してください`} style={themed($helperText)} />
            </View>
          ) : (
            <View style={themed($auctionFields)}>
              <View style={themed($row)}>
                <View style={themed($fieldHalf)}>
                  <Text size="sm" weight="semiBold" text="開始価格" style={themed($fieldLabel)} />
                  <TextField
                    placeholder="¥"
                    value={form.startingPrice}
                    onChangeText={(text) => updateForm("startingPrice", text)}
                    keyboardType="numeric"
                    LeftAccessory={() => <Text text="¥" style={themed($currencyPrefix)} />}
                  />
                </View>
                <View style={themed($fieldHalf)}>
                  <Text size="sm" weight="semiBold" text="最低落札価格" style={themed($fieldLabel)} />
                  <TextField
                    placeholder="¥（任意）"
                    value={form.reservePrice}
                    onChangeText={(text) => updateForm("reservePrice", text)}
                    keyboardType="numeric"
                    LeftAccessory={() => <Text text="¥" style={themed($currencyPrefix)} />}
                  />
                </View>
              </View>
              <Text size="sm" weight="semiBold" text="セリ時間" style={themed($fieldLabel)} />
              <View style={themed($chipRow)}>
                {["6", "12", "24", "48"].map((hours) => (
                  <Pressable
                    key={hours}
                    onPress={() => updateForm("auctionDuration", hours)}
                  >
                    <View style={[
                      themed($chip),
                      form.auctionDuration === hours && themed($chipSelected),
                    ]}>
                      <Text
                        size="sm"
                        text={`${hours}時間`}
                        style={form.auctionDuration === hours ? { color: colors.palette.neutral100 } : undefined}
                      />
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Description */}
        <View style={themed($section)}>
          <Text preset="subheading" text="商品説明" />
          <TextField
            placeholder="商品の特徴、おすすめの食べ方などを記入してください..."
            value={form.description}
            onChangeText={(text) => updateForm("description", text)}
            multiline
            inputWrapperStyle={themed($descriptionField)}
          />
        </View>

        {/* Spacer for bottom button */}
        <View style={themed($bottomSpacer)} />
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View style={themed($actionBar)}>
        <Button
          text="下書き保存"
          preset="default"
          onPress={() => navigation.goBack()}
          style={themed($draftButton)}
        />
        <Button
          text="出品する"
          preset="filled"
          onPress={handleSubmit}
          style={themed($submitButton)}
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

const $photoGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $addPhotoButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 100,
  height: 100,
  borderRadius: 12,
  borderWidth: 2,
  borderStyle: "dashed",
  borderColor: colors.border,
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.xxs,
})

const $addPhotoText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $photoPlaceholder: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 100,
  height: 100,
  borderRadius: 12,
  backgroundColor: colors.palette.neutral200,
})

const $helperText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  marginTop: 4,
})

const $row: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $fieldHalf: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $fieldLabel: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxs,
  marginTop: spacing.sm,
})

const $chipRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.xs,
})

const $chip: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  borderRadius: 20,
  backgroundColor: colors.palette.neutral200,
})

const $chipSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
})

const $saleTypeRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $saleTypeOption: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $saleTypeCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: colors.border,
  alignItems: "center",
  gap: spacing.xxs,
})

const $saleTypeSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.tint,
  backgroundColor: colors.palette.ocean100,
})

const $saleTypeDesc: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $auctionFields: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xs,
})

const $currencyPrefix: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginLeft: spacing.sm,
})

const $descriptionField: ThemedStyle<ViewStyle> = () => ({
  minHeight: 100,
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
  backgroundColor: colors.background,
  borderTopWidth: 1,
  borderTopColor: colors.border,
  padding: spacing.md,
  paddingBottom: spacing.lg,
  gap: spacing.sm,
})

const $draftButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $submitButton: ThemedStyle<ViewStyle> = () => ({
  flex: 2,
})
