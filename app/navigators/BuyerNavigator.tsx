import { TextStyle, ViewStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/Icon"
import { BuyerDashboardScreen, BrowseScreen, CartScreen } from "@/screens/buyer"
import { ProfileScreen } from "@/screens/shared"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { BuyerTabParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<BuyerTabParamList>()

/**
 * Buyer tab navigator - for restaurants, wholesalers, and consumers
 * Tabs: Home, Browse, Cart, Profile
 */
export function BuyerNavigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: themed($tabBarLabel),
        tabBarItemStyle: themed($tabBarItem),
      }}
    >
      <Tab.Screen
        name="BuyerDashboard"
        component={BuyerDashboardScreen}
        options={{
          tabBarLabel: "ホーム",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="components"
              color={focused ? colors.tint : colors.tintInactive}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          tabBarLabel: "さがす",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="view"
              color={focused ? colors.tint : colors.tintInactive}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "カート",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="ladybug"
              color={focused ? colors.tint : colors.tintInactive}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="BuyerProfile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "マイページ",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="settings"
              color={focused ? colors.tint : colors.tintInactive}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  borderTopColor: colors.border,
  borderTopWidth: 1,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.sm,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 11,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
})
