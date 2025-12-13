import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { CountdownTimer } from "./CountdownTimer"
import { Text } from "../Text"
import { colors } from "../../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand100,
    flex: 1,
    padding: 24,
  },
  decoratorDark: {
    backgroundColor: colors.palette.sand900,
    flex: 1,
    padding: 24,
  },
  demoCard: {
    backgroundColor: colors.palette.sand200,
    borderRadius: 20,
    gap: 16,
    padding: 24,
  },
  demoCardDark: {
    backgroundColor: colors.palette.sand800,
    borderRadius: 20,
    gap: 16,
    padding: 24,
  },
  demoDescription: {
    color: colors.palette.sand600,
    lineHeight: 20,
  },
  demoDescriptionDark: {
    color: colors.palette.sand400,
    lineHeight: 20,
  },
  demoTitle: {
    color: colors.palette.sand900,
    letterSpacing: -0.5,
  },
  demoTitleDark: {
    color: colors.palette.sand100,
    letterSpacing: -0.5,
  },
  divider: {
    backgroundColor: colors.palette.sand300,
    height: 1,
    marginVertical: 8,
  },
  dividerDark: {
    backgroundColor: colors.palette.sand700,
    height: 1,
    marginVertical: 8,
  },
  sectionLabel: {
    color: colors.palette.sand500,
    letterSpacing: 1.5,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  sectionLabelDark: {
    color: colors.palette.sand400,
    letterSpacing: 1.5,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  showcaseContainer: {
    gap: 24,
  },
  timerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
})

/**
 * CountdownTimer Stories
 *
 * Reusable countdown timer for auction and time-sensitive listings.
 *
 * Design principles:
 * - Clear, readable time display with days/hours/mins/secs
 * - Urgent state (coral) when < 1 hour remaining with pulse animation
 * - Expired state (gray) when time runs out
 * - Smooth animated transitions between numbers
 * - Ocean blue for normal state, coral for urgent, sand for expired
 */
const meta = {
  title: "Core/CountdownTimer",
  component: CountdownTimer,
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "small", "medium", "large"],
      description: "Size variant",
    },
  },
  args: {
    onExpire: () => console.log("Timer expired!"),
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CountdownTimer>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Create a date in the future
function addTime(
  days: number = 0,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(date.getHours() + hours)
  date.setMinutes(date.getMinutes() + minutes)
  date.setSeconds(date.getSeconds() + seconds)
  return date
}

// =============================================================================
// CORE VARIANTS - TIME RANGES
// =============================================================================

export const Default: Story = {
  args: {
    targetDate: addTime(0, 5, 30, 45),
    size: "medium",
  },
}

export const DaysRemaining: Story = {
  name: "Days Remaining",
  args: {
    targetDate: addTime(3, 12, 45, 30),
    size: "medium",
  },
}

export const HoursRemaining: Story = {
  name: "Hours Remaining",
  args: {
    targetDate: addTime(0, 8, 30, 15),
    size: "medium",
  },
}

export const MinutesRemaining: Story = {
  name: "Minutes Remaining (Urgent)",
  args: {
    targetDate: addTime(0, 0, 45, 30),
    size: "medium",
  },
}

export const SecondsRemaining: Story = {
  name: "Seconds Remaining (Very Urgent)",
  args: {
    targetDate: addTime(0, 0, 0, 45),
    size: "medium",
  },
}

export const Expired: Story = {
  args: {
    targetDate: new Date(Date.now() - 1000), // 1 second ago
    size: "medium",
  },
}

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const SizeXs: Story = {
  name: "Size: XS (Compact)",
  args: {
    targetDate: addTime(0, 2, 30, 45),
    size: "xs",
  },
}

export const SizeSmall: Story = {
  name: "Size: Small",
  args: {
    targetDate: addTime(0, 2, 30, 45),
    size: "small",
  },
}

export const SizeMedium: Story = {
  name: "Size: Medium",
  args: {
    targetDate: addTime(0, 2, 30, 45),
    size: "medium",
  },
}

export const SizeLarge: Story = {
  name: "Size: Large",
  args: {
    targetDate: addTime(0, 2, 30, 45),
    size: "large",
  },
}

// =============================================================================
// AUCTION CONTEXT EXAMPLES
// =============================================================================

export const AuctionListingCard: Story = {
  name: "Auction: Listing Card",
  args: { targetDate: addTime(0, 3, 15, 30) },
  render: () => (
    <View style={styles.demoCard}>
      <View>
        <Text weight="bold" size="lg" text="Premium Tuna Auction" style={styles.demoTitle} />
        <Text
          size="sm"
          text="Fresh catch from the morning haul. Bidding ends soon!"
          style={styles.demoDescription}
        />
      </View>
      <View style={styles.divider} />
      <View style={{ gap: 8 }}>
        <Text size="xs" weight="medium" text="TIME REMAINING" style={styles.sectionLabel} />
        <CountdownTimer targetDate={addTime(0, 3, 15, 30)} size="medium" />
      </View>
    </View>
  ),
}

export const AuctionEndingSoon: Story = {
  name: "Auction: Ending Soon",
  args: { targetDate: addTime(0, 0, 15, 45) },
  render: () => (
    <View style={styles.demoCard}>
      <View>
        <Text weight="bold" size="lg" text="Swordfish Filet" style={styles.demoTitle} />
        <Text
          size="sm"
          text="Last chance to bid on this premium catch!"
          style={styles.demoDescription}
        />
      </View>
      <View style={styles.divider} />
      <View style={{ gap: 8 }}>
        <Text size="xs" weight="medium" text="ENDING SOON!" style={styles.sectionLabel} />
        <CountdownTimer targetDate={addTime(0, 0, 15, 45)} size="medium" />
      </View>
    </View>
  ),
}

export const AuctionExpired: Story = {
  name: "Auction: Expired",
  args: { targetDate: new Date(Date.now() - 1000) },
  render: () => (
    <View style={styles.demoCard}>
      <View>
        <Text weight="bold" size="lg" text="Salmon Fillet" style={styles.demoTitle} />
        <Text
          size="sm"
          text="This auction has ended. Check out our other listings!"
          style={styles.demoDescription}
        />
      </View>
      <View style={styles.divider} />
      <View style={{ gap: 8 }}>
        <Text size="xs" weight="medium" text="AUCTION STATUS" style={styles.sectionLabel} />
        <CountdownTimer targetDate={new Date(Date.now() - 1000)} size="medium" />
      </View>
    </View>
  ),
}

// =============================================================================
// SIZE COMPARISON
// =============================================================================

export const AllSizes: Story = {
  name: "All Sizes Comparison",
  args: { targetDate: addTime(0, 5, 30, 15) },
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.demoCard}>
        <Text size="xs" weight="medium" text="SIZE VARIANTS" style={styles.sectionLabel} />
        <View style={styles.divider} />
        <View style={{ gap: 20 }}>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="XS (COMPACT - NO LABELS)" style={styles.sectionLabel} />
            <CountdownTimer targetDate={addTime(0, 5, 30, 15)} size="xs" />
          </View>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="SMALL" style={styles.sectionLabel} />
            <CountdownTimer targetDate={addTime(0, 5, 30, 15)} size="small" />
          </View>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="MEDIUM (DEFAULT)" style={styles.sectionLabel} />
            <CountdownTimer targetDate={addTime(0, 5, 30, 15)} size="medium" />
          </View>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="LARGE" style={styles.sectionLabel} />
            <CountdownTimer targetDate={addTime(0, 5, 30, 15)} size="large" />
          </View>
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// STATE COMPARISON
// =============================================================================

export const AllStates: Story = {
  name: "All States",
  args: { targetDate: addTime(1, 5, 30, 15) },
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.demoCard}>
        <Text size="xs" weight="medium" text="TIMER STATES" style={styles.sectionLabel} />
        <View style={styles.divider} />
        <View style={{ gap: 20 }}>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="NORMAL (OCEAN BLUE)" style={styles.sectionLabel} />
            <CountdownTimer targetDate={addTime(1, 5, 30, 15)} size="medium" />
          </View>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="URGENT (CORAL, < 1 HOUR)" style={styles.sectionLabel} />
            <CountdownTimer targetDate={addTime(0, 0, 45, 30)} size="medium" />
          </View>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="EXPIRED (SAND/GRAY)" style={styles.sectionLabel} />
            <CountdownTimer targetDate={new Date(Date.now() - 1000)} size="medium" />
          </View>
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// DARK MODE
// =============================================================================

export const DarkMode: Story = {
  name: "Dark Mode",
  args: { targetDate: addTime(1, 5, 30, 15) },
  decorators: [
    (Story) => (
      <View style={styles.decoratorDark}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.demoCardDark}>
        <Text
          size="xs"
          weight="medium"
          text="DARK CONTEXT"
          style={styles.sectionLabelDark}
        />
        <View style={styles.dividerDark} />
        <View style={{ gap: 20 }}>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="NORMAL STATE" style={styles.sectionLabelDark} />
            <CountdownTimer targetDate={addTime(1, 5, 30, 15)} size="medium" />
          </View>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="URGENT STATE" style={styles.sectionLabelDark} />
            <CountdownTimer targetDate={addTime(0, 0, 30, 45)} size="medium" />
          </View>
          <View style={{ gap: 8 }}>
            <Text size="xxs" text="EXPIRED STATE" style={styles.sectionLabelDark} />
            <CountdownTimer targetDate={new Date(Date.now() - 1000)} size="medium" />
          </View>
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// MULTIPLE TIMERS
// =============================================================================

export const MultipleTimers: Story = {
  name: "Multiple Timers",
  args: { targetDate: addTime(2, 3, 15, 30) },
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.demoCard}>
        <Text
          weight="bold"
          size="lg"
          text="Active Auctions"
          style={styles.demoTitle}
        />
        <View style={styles.divider} />
        <View style={{ gap: 16 }}>
          <View style={{ gap: 4 }}>
            <Text size="sm" weight="medium" text="Premium Tuna" style={styles.demoTitle} />
            <CountdownTimer targetDate={addTime(2, 3, 15, 30)} size="small" />
          </View>
          <View style={{ gap: 4 }}>
            <Text size="sm" weight="medium" text="Fresh Salmon" style={styles.demoTitle} />
            <CountdownTimer targetDate={addTime(0, 8, 45, 20)} size="small" />
          </View>
          <View style={{ gap: 4 }}>
            <Text size="sm" weight="medium" text="Swordfish Steak" style={styles.demoTitle} />
            <CountdownTimer targetDate={addTime(0, 0, 45, 10)} size="small" />
          </View>
        </View>
      </View>
    </View>
  ),
}
