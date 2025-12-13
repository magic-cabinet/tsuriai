import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { AuctionTimer } from "./AuctionTimer"
import { Text } from "../Text"

const meta: Meta<typeof AuctionTimer> = {
  title: "Auction/AuctionTimer",
  component: AuctionTimer,
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
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

type Story = StoryObj<typeof AuctionTimer>

export const Active: Story = {
  args: {
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
  },
}

export const EndingSoon: Story = {
  args: {
    endDate: new Date(Date.now() + 3 * 60 * 1000), // 3 minutes
    endingSoonThreshold: 5,
  },
}

export const Upcoming: Story = {
  args: {
    startDate: new Date(Date.now() + 30 * 60 * 1000), // starts in 30 min
    endDate: new Date(Date.now() + 90 * 60 * 1000), // ends in 90 min
  },
}

export const Ended: Story = {
  args: {
    endDate: new Date(Date.now() - 60 * 1000), // ended 1 minute ago
  },
}

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text text="Small" size="xs" style={{ marginBottom: 8 }} />
        <AuctionTimer
          endDate={new Date(Date.now() + 60 * 60 * 1000)}
          size="small"
        />
      </View>
      <View>
        <Text text="Medium" size="xs" style={{ marginBottom: 8 }} />
        <AuctionTimer
          endDate={new Date(Date.now() + 60 * 60 * 1000)}
          size="medium"
        />
      </View>
      <View>
        <Text text="Large" size="xs" style={{ marginBottom: 8 }} />
        <AuctionTimer
          endDate={new Date(Date.now() + 60 * 60 * 1000)}
          size="large"
        />
      </View>
    </View>
  ),
}

export const NoBadge: Story = {
  args: {
    endDate: new Date(Date.now() + 60 * 60 * 1000),
    showPhaseBadge: false,
  },
}

export const NoIcon: Story = {
  args: {
    endDate: new Date(Date.now() + 60 * 60 * 1000),
    showIcon: false,
  },
}

export const AllPhases: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text text="Upcoming" size="xs" style={{ marginBottom: 8 }} />
        <AuctionTimer
          startDate={new Date(Date.now() + 30 * 60 * 1000)}
          endDate={new Date(Date.now() + 90 * 60 * 1000)}
        />
      </View>
      <View>
        <Text text="Active" size="xs" style={{ marginBottom: 8 }} />
        <AuctionTimer
          endDate={new Date(Date.now() + 2 * 60 * 60 * 1000)}
        />
      </View>
      <View>
        <Text text="Ending Soon" size="xs" style={{ marginBottom: 8 }} />
        <AuctionTimer
          endDate={new Date(Date.now() + 2 * 60 * 1000)}
          endingSoonThreshold={5}
        />
      </View>
      <View>
        <Text text="Ended" size="xs" style={{ marginBottom: 8 }} />
        <AuctionTimer
          endDate={new Date(Date.now() - 60 * 1000)}
        />
      </View>
    </View>
  ),
}
