import { TextStyle, ViewStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/Icon"
import { SellerDashboardScreen, InventoryScreen, OrdersScreen } from "@/screens/seller"
import { ProfileScreen } from "@/screens/shared"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import type { SellerTabParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<SellerTabParamList>()

/**
 * Seller tab navigator - for fishermen and auction houses
 * Tabs: Dashboard, Inventory, Orders, Profile
 */
export function SellerNavigator() {
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
        name="SellerDashboard"
        component={SellerDashboardScreen}
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
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarLabel: "在庫",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="more"
              color={focused ? colors.tint : colors.tintInactive}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="SellerOrders"
        component={OrdersScreen}
        options={{
          tabBarLabel: "注文",
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
        name="SellerProfile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "設定",
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
