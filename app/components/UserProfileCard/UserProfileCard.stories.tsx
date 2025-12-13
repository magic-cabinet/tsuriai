import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { UserProfileCard } from "./UserProfileCard"

const meta: Meta<typeof UserProfileCard> = {
  title: "User/UserProfileCard",
  component: UserProfileCard,
  argTypes: {
    role: {
      control: "select",
      options: ["buyer", "seller", "both", "admin"],
    },
    verificationStatus: {
      control: "select",
      options: ["unverified", "pending", "verified"],
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof UserProfileCard>

export const Seller: Story = {
  args: {
    name: "Kenji Yamamoto",
    username: "@yamamoto_fishing",
    role: "seller",
    verificationStatus: "verified",
    location: "Tokyo, Japan",
    memberSince: new Date("2020-03-15"),
    bio: "Third-generation fisherman specializing in premium bluefin tuna. Sustainable practices certified.",
    rating: 4.8,
    reviewCount: 156,
    itemsSold: 342,
    transactionCount: 420,
    onMessage: () => alert("Message"),
    onFollow: () => alert("Follow"),
  },
}

export const Buyer: Story = {
  args: {
    name: "Sarah Mitchell",
    username: "@sarah_m",
    role: "buyer",
    verificationStatus: "verified",
    location: "San Francisco, CA",
    memberSince: new Date("2022-08-01"),
    rating: 4.9,
    reviewCount: 45,
    successfulBids: 89,
    transactionCount: 95,
  },
}

export const BuyerAndSeller: Story = {
  args: {
    name: "Takeshi Mori",
    username: "@takeshi_seafood",
    role: "both",
    verificationStatus: "verified",
    location: "Osaka, Japan",
    memberSince: new Date("2019-01-10"),
    rating: 4.7,
    reviewCount: 234,
    successfulBids: 156,
    itemsSold: 89,
    transactionCount: 280,
  },
}

export const PendingVerification: Story = {
  args: {
    name: "New Seller",
    username: "@new_seller",
    role: "seller",
    verificationStatus: "pending",
    location: "Nagasaki, Japan",
    memberSince: new Date(),
    rating: 5.0,
    reviewCount: 2,
    itemsSold: 3,
  },
}

export const Unverified: Story = {
  args: {
    name: "John Smith",
    role: "buyer",
    verificationStatus: "unverified",
    memberSince: new Date(),
  },
}

export const OwnProfile: Story = {
  args: {
    name: "Your Name",
    username: "@you",
    role: "both",
    verificationStatus: "verified",
    location: "Your Location",
    memberSince: new Date("2021-05-20"),
    bio: "This is your own profile. Edit your bio in settings.",
    rating: 4.6,
    reviewCount: 78,
    successfulBids: 45,
    itemsSold: 23,
    isOwnProfile: true,
  },
}

export const Following: Story = {
  args: {
    name: "Kenji Yamamoto",
    username: "@yamamoto_fishing",
    role: "seller",
    verificationStatus: "verified",
    location: "Tokyo, Japan",
    rating: 4.8,
    reviewCount: 156,
    itemsSold: 342,
    isFollowing: true,
    onMessage: () => alert("Message"),
    onFollow: () => alert("Unfollow"),
  },
}

export const MinimalInfo: Story = {
  args: {
    name: "Anonymous User",
    role: "buyer",
  },
}
