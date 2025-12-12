import type { Meta, StoryObj } from "@storybook/react"
import { View } from "react-native"
import { ReputationScoreDisplay } from "./ReputationScoreDisplay"
import { Text } from "../Text"

const meta: Meta<typeof ReputationScoreDisplay> = {
  title: "Domain/User/ReputationScoreDisplay",
  component: ReputationScoreDisplay,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["minimal", "compact", "detailed"],
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

type Story = StoryObj<typeof ReputationScoreDisplay>

export const Compact: Story = {
  args: {
    score: 4.8,
    reviewCount: 156,
    variant: "compact",
  },
}

export const Minimal: Story = {
  args: {
    score: 4.5,
    variant: "minimal",
  },
}

export const Detailed: Story = {
  args: {
    score: 4.6,
    reviewCount: 234,
    variant: "detailed",
    showBreakdown: true,
    breakdown: {
      5: 156,
      4: 52,
      3: 18,
      2: 5,
      1: 3,
    },
  },
}

export const PerfectScore: Story = {
  args: {
    score: 5.0,
    reviewCount: 42,
    variant: "compact",
  },
}

export const LowScore: Story = {
  args: {
    score: 2.3,
    reviewCount: 8,
    variant: "compact",
  },
}

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text text="Small" size="xs" style={{ marginBottom: 8 }} />
        <ReputationScoreDisplay score={4.5} reviewCount={100} size="sm" />
      </View>
      <View>
        <Text text="Medium" size="xs" style={{ marginBottom: 8 }} />
        <ReputationScoreDisplay score={4.5} reviewCount={100} size="md" />
      </View>
      <View>
        <Text text="Large" size="xs" style={{ marginBottom: 8 }} />
        <ReputationScoreDisplay score={4.5} reviewCount={100} size="lg" />
      </View>
    </View>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text text="Minimal" size="xs" style={{ marginBottom: 8 }} />
        <ReputationScoreDisplay score={4.7} variant="minimal" />
      </View>
      <View>
        <Text text="Compact" size="xs" style={{ marginBottom: 8 }} />
        <ReputationScoreDisplay score={4.7} reviewCount={89} variant="compact" />
      </View>
      <View>
        <Text text="Detailed" size="xs" style={{ marginBottom: 8 }} />
        <ReputationScoreDisplay
          score={4.7}
          reviewCount={89}
          variant="detailed"
          showBreakdown
          breakdown={{
            5: 60,
            4: 20,
            3: 6,
            2: 2,
            1: 1,
          }}
        />
      </View>
    </View>
  ),
}

export const NoStars: Story = {
  args: {
    score: 4.2,
    reviewCount: 45,
    variant: "compact",
    showStars: false,
  },
}

export const NewSeller: Story = {
  args: {
    score: 5.0,
    reviewCount: 2,
    variant: "detailed",
    showBreakdown: true,
    breakdown: {
      5: 2,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  },
}
