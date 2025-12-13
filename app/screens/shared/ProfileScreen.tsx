import { View, ViewStyle, TextStyle } from "react-native"
import { Screen, Text, Header, Button } from "@/components"
import { useAuth } from "@/context/AuthContext"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export function ProfileScreen() {
  const { themed } = useAppTheme()
  const { logout } = useAuth()

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]}>
      <Header title="プロフィール" titleMode="center" />
      <View style={themed($container)}>
        <View style={themed($avatarContainer)}>
          <View style={themed($avatar)}>
            <Text size="xxl" weight="bold" text="田" />
          </View>
          <Text preset="heading" text="田中 太郎" style={themed($name)} />
          <Text size="sm" text="tanaka@tsuriai.jp" style={themed($email)} />
        </View>

        <View style={themed($section)}>
          <Text preset="subheading" text="アカウント設定" style={themed($sectionTitle)} />
          <Button text="プロフィール編集" preset="default" style={themed($button)} />
          <Button text="通知設定" preset="default" style={themed($button)} />
          <Button text="言語設定" preset="default" style={themed($button)} />
        </View>

        <View style={themed($section)}>
          <Text preset="subheading" text="サポート" style={themed($sectionTitle)} />
          <Button text="ヘルプセンター" preset="default" style={themed($button)} />
          <Button text="お問い合わせ" preset="default" style={themed($button)} />
        </View>

        <Button
          text="ログアウト"
          preset="default"
          onPress={logout}
          style={themed($logoutButton)}
        />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
  gap: spacing.lg,
})

const $avatarContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  gap: spacing.sm,
  paddingVertical: spacing.xl,
})

const $avatar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: colors.tint,
  alignItems: "center",
  justifyContent: "center",
})

const $name: ThemedStyle<ViewStyle> = () => ({
  marginTop: 8,
})

const $email: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $sectionTitle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $button: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 4,
})

const $logoutButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xl,
})
