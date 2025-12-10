import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { EmptyState } from "./EmptyState"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { colors } from "../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  customIcon: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    marginBottom: 16,
    width: 80,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    padding: 20,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 16,
    padding: 40,
  },
  emptyContent: {
    color: colors.palette.neutral600,
    marginTop: 8,
    textAlign: "center",
  },
  emptyHeading: {
    color: colors.palette.neutral900,
    marginTop: 16,
    textAlign: "center",
  },
  errorIcon: {
    backgroundColor: colors.palette.angry100,
  },
  sectionTitle: {
    color: colors.palette.neutral900,
    marginBottom: 16,
  },
  showcaseContainer: {
    gap: 32,
  },
  successIcon: {
    backgroundColor: colors.palette.badgeMint + "20",
  },
})

// =============================================================================
// CUSTOM EMPTY STATE ILLUSTRATIONS
// =============================================================================

const EmptyPortfolioIcon = () => (
  <View style={styles.customIcon}>
    <Icon icon="components" size={40} color={colors.palette.neutral500} />
  </View>
)

const EmptyWatchlistIcon = () => (
  <View style={styles.customIcon}>
    <Icon icon="heart" size={40} color={colors.palette.neutral500} />
  </View>
)

const NoSearchResultsIcon = () => (
  <View style={styles.customIcon}>
    <Icon icon="view" size={40} color={colors.palette.neutral500} />
  </View>
)

const ErrorIcon = () => (
  <View style={[styles.customIcon, styles.errorIcon]}>
    <Icon icon="x" size={40} color={colors.palette.angry500} />
  </View>
)

const SuccessIcon = () => (
  <View style={[styles.customIcon, styles.successIcon]}>
    <Icon icon="check" size={40} color={colors.palette.badgeMint} />
  </View>
)

const NoNotificationsIcon = () => (
  <View style={styles.customIcon}>
    <Icon icon="bell" size={40} color={colors.palette.neutral500} />
  </View>
)

/**
 * EmptyState Stories
 *
 * Empty states for the Beyond Equity investment platform.
 * Used when there's no data to display - portfolios, watchlists,
 * search results, transactions, and error states.
 */
const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  argTypes: {
    heading: {
      control: "text",
      description: "Heading text",
    },
    content: {
      control: "text",
      description: "Content/description text",
    },
    button: {
      control: "text",
      description: "Button text",
    },
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof EmptyState>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// BASIC VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    preset: "generic",
  },
}

export const CustomContent: Story = {
  args: {
    heading: "Nothing here yet",
    content: "When you have data, it will appear here.",
    button: "Get Started",
    buttonOnPress: () => console.log("Get started"),
  },
}

export const WithoutButton: Story = {
  args: {
    heading: "No results found",
    content: "Try adjusting your search or filters.",
  },
}

// =============================================================================
// INVESTMENT SCENARIOS
// =============================================================================

export const EmptyPortfolio: Story = {
  name: "Portfolio: Empty",
  render: () => (
    <View style={styles.emptyCard}>
      <EmptyPortfolioIcon />
      <Text preset="subheading" text="Start Your Investment Journey" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="You don't own any stocks yet. Browse opportunities and make your first investment."
        style={styles.emptyContent}
      />
    </View>
  ),
}

export const EmptyPortfolioWithAction: Story = {
  name: "Portfolio: Empty with CTA",
  render: () => (
    <EmptyState
      heading="Start Your Investment Journey"
      content="You don't own any stocks yet. Browse opportunities and make your first investment."
      button="Explore Stocks"
      buttonOnPress={() => console.log("Explore")}
      ImageProps={{ style: { display: "none" } }}
    />
  ),
}

export const EmptyWatchlist: Story = {
  name: "Watchlist: Empty",
  render: () => (
    <View style={styles.emptyCard}>
      <EmptyWatchlistIcon />
      <Text preset="subheading" text="Your Watchlist is Empty" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="Save stocks you're interested in by tapping the heart icon. Track prices and get alerts."
        style={styles.emptyContent}
      />
    </View>
  ),
}

export const NoSearchResults: Story = {
  name: "Search: No Results",
  render: () => (
    <View style={styles.emptyCard}>
      <NoSearchResultsIcon />
      <Text preset="subheading" text='No Results for "XYZZ"' style={styles.emptyHeading} />
      <Text
        size="sm"
        text="We couldn't find any stocks, ETFs, or crypto matching your search. Check the spelling or try a different term."
        style={styles.emptyContent}
      />
    </View>
  ),
}

export const NoTransactions: Story = {
  name: "Transactions: Empty",
  render: () => (
    <View style={styles.emptyCard}>
      <EmptyPortfolioIcon />
      <Text preset="subheading" text="No Recent Activity" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="Your transactions will appear here once you start trading or transfer funds."
        style={styles.emptyContent}
      />
    </View>
  ),
}

export const NoNotifications: Story = {
  name: "Notifications: Empty",
  render: () => (
    <View style={styles.emptyCard}>
      <NoNotificationsIcon />
      <Text preset="subheading" text="All Caught Up" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="You have no new notifications. We'll let you know when something important happens."
        style={styles.emptyContent}
      />
    </View>
  ),
}

// =============================================================================
// ERROR STATES
// =============================================================================

export const NetworkError: Story = {
  name: "Error: Network",
  render: () => (
    <View style={styles.emptyCard}>
      <ErrorIcon />
      <Text preset="subheading" text="Connection Error" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="We couldn't connect to the server. Please check your internet connection and try again."
        style={styles.emptyContent}
      />
    </View>
  ),
}

export const NetworkErrorWithRetry: Story = {
  name: "Error: Network with Retry",
  render: () => (
    <EmptyState
      heading="Connection Error"
      content="We couldn't connect to the server. Please check your internet connection and try again."
      button="Retry"
      buttonOnPress={() => console.log("Retry")}
      ImageProps={{ style: { display: "none" } }}
    />
  ),
}

export const MarketClosed: Story = {
  name: "Market: Closed",
  render: () => (
    <View style={styles.emptyCard}>
      <EmptyPortfolioIcon />
      <Text preset="subheading" text="Markets Are Closed" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="The stock market is currently closed. Trading resumes Monday at 9:30 AM ET."
        style={styles.emptyContent}
      />
    </View>
  ),
}

export const MaintenanceMode: Story = {
  name: "Error: Maintenance",
  render: () => (
    <View style={styles.emptyCard}>
      <ErrorIcon />
      <Text preset="subheading" text="Scheduled Maintenance" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="We're performing scheduled maintenance. Trading will resume shortly. Your investments are safe."
        style={styles.emptyContent}
      />
    </View>
  ),
}

// =============================================================================
// SUCCESS STATES
// =============================================================================

export const OrderSuccess: Story = {
  name: "Success: Order Placed",
  render: () => (
    <View style={styles.emptyCard}>
      <SuccessIcon />
      <Text preset="subheading" text="Order Submitted" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="Your order to buy 10 shares of AAPL has been submitted. You'll receive a notification when it fills."
        style={styles.emptyContent}
      />
    </View>
  ),
}

export const TransferSuccess: Story = {
  name: "Success: Transfer",
  render: () => (
    <View style={styles.emptyCard}>
      <SuccessIcon />
      <Text preset="subheading" text="Transfer Initiated" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="Your $5,000 deposit is on its way. Instant funds are available now. Full amount in 1-3 business days."
        style={styles.emptyContent}
      />
    </View>
  ),
}

export const AccountVerified: Story = {
  name: "Success: Account Verified",
  render: () => (
    <View style={styles.emptyCard}>
      <SuccessIcon />
      <Text preset="subheading" text="Account Verified" style={styles.emptyHeading} />
      <Text
        size="sm"
        text="Your identity has been verified. You can now start trading stocks, ETFs, and crypto."
        style={styles.emptyContent}
      />
    </View>
  ),
}

// =============================================================================
// SHOWCASE
// =============================================================================

export const AllEmptyStates: Story = {
  name: "All Empty States",
  render: () => (
    <View style={styles.showcaseContainer}>
      <View>
        <Text preset="subheading" text="Empty Portfolio" style={styles.sectionTitle} />
        <View style={styles.emptyCard}>
          <EmptyPortfolioIcon />
          <Text
            preset="subheading"
            text="Start Your Investment Journey"
            style={styles.emptyHeading}
          />
          <Text size="sm" text="You don't own any stocks yet." style={styles.emptyContent} />
        </View>
      </View>

      <View>
        <Text preset="subheading" text="Empty Watchlist" style={styles.sectionTitle} />
        <View style={styles.emptyCard}>
          <EmptyWatchlistIcon />
          <Text preset="subheading" text="Your Watchlist is Empty" style={styles.emptyHeading} />
          <Text size="sm" text="Save stocks you're interested in." style={styles.emptyContent} />
        </View>
      </View>

      <View>
        <Text preset="subheading" text="Error State" style={styles.sectionTitle} />
        <View style={styles.emptyCard}>
          <ErrorIcon />
          <Text preset="subheading" text="Something Went Wrong" style={styles.emptyHeading} />
          <Text size="sm" text="Please try again later." style={styles.emptyContent} />
        </View>
      </View>

      <View>
        <Text preset="subheading" text="Success State" style={styles.sectionTitle} />
        <View style={styles.emptyCard}>
          <SuccessIcon />
          <Text preset="subheading" text="Order Complete" style={styles.emptyHeading} />
          <Text size="sm" text="Your transaction was successful." style={styles.emptyContent} />
        </View>
      </View>
    </View>
  ),
}
