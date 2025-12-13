import { ImageSourcePropType } from "react-native"

export type FishStatus = "available" | "sold" | "reserved" | "bidding"
export type FishGrade = "A" | "B" | "C" | "Premium" | "Standard"
export type FishFreshness = "live" | "fresh" | "frozen" | "processed"
export type GroupBy = "species" | "weight" | "grade"

export interface FishItem {
  id: string
  species: string
  speciesJapanese?: string
  weight: number
  grade: FishGrade
  freshness: FishFreshness
  status: FishStatus
  pricePerKg: number
  currentBid?: number
  startingPrice?: number
  origin?: string
  catchDate?: Date
  image?: ImageSourcePropType
  auctionEndDate?: Date
  bidCount?: number
}

export interface FishGroup {
  key: string
  label: string
  labelJapanese?: string
  fish: FishItem[]
  totalCount: number
  availableCount: number
  weightRange: { min: number; max: number }
}
