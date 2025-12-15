/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Config from "@/config"
import { useAuth } from "@/context/AuthContext"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { LoginScreen } from "@/screens/LoginScreen"
import { WelcomeScreen } from "@/screens/WelcomeScreen"
import { FishDetailScreen } from "@/screens/buyer/FishDetailScreen"
import { CheckoutScreen } from "@/screens/buyer/CheckoutScreen"
import { CreateListingScreen } from "@/screens/seller/CreateListingScreen"
import { useAppTheme } from "@/theme/context"

import { BuyerNavigator } from "./BuyerNavigator"
import { DemoNavigator } from "./DemoNavigator"
import { SellerNavigator } from "./SellerNavigator"
import type { AppStackParamList, NavigationProps } from "./navigationTypes"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  const { isAuthenticated, user } = useAuth()

  const {
    theme: { colors },
  } = useAppTheme()

  // Determine initial route based on user role
  const getInitialRoute = () => {
    if (!isAuthenticated) return "Login"
    // For now, default to Buyer experience
    // Later: check user.role to determine Seller vs Buyer
    if (user?.role === "seller") return "Seller"
    return "Buyer"
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={getInitialRoute()}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Seller" component={SellerNavigator} />
          <Stack.Screen name="Buyer" component={BuyerNavigator} />
          <Stack.Screen name="Demo" component={DemoNavigator} />
          {/* Buyer detail screens */}
          <Stack.Screen name="FishDetail" component={FishDetailScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          {/* Seller detail screens */}
          <Stack.Screen name="CreateListing" component={CreateListingScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
}

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}
