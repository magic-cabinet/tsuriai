import { ComponentProps } from "react"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
  CompositeScreenProps,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

// Demo Tab Navigator types
export type DemoTabParamList = {
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
}

// Seller Tab Navigator types
export type SellerTabParamList = {
  SellerDashboard: undefined
  Inventory: undefined
  SellerOrders: undefined
  SellerProfile: undefined
}

// Seller Stack Screens (outside tabs)
export type SellerStackParamList = {
  CreateListing: undefined
  EditListing: { listingId: string }
  AuctionCreator: undefined
}

// Buyer Tab Navigator types
export type BuyerTabParamList = {
  BuyerDashboard: undefined
  Browse: undefined
  Cart: undefined
  BuyerProfile: undefined
}

// App Stack Navigator types
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Demo: NavigatorScreenParams<DemoTabParamList>
  Seller: NavigatorScreenParams<SellerTabParamList>
  Buyer: NavigatorScreenParams<BuyerTabParamList>
  // Buyer screens
  FishDetail: { fishId: string }
  Checkout: undefined
  // Seller screens
  CreateListing: undefined
  EditListing: { listingId: string }
  AuctionCreator: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export type SellerTabScreenProps<T extends keyof SellerTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<SellerTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export type BuyerTabScreenProps<T extends keyof BuyerTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<BuyerTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export interface NavigationProps extends Partial<
  ComponentProps<typeof NavigationContainer<AppStackParamList>>
> {}
