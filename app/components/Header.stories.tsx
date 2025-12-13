import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Header } from "./Header"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { colors } from "../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    backgroundColor: colors.palette.primary400,
    borderRadius: 16,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  avatarText: {
    color: colors.palette.neutral100,
    fontSize: 14,
    fontWeight: "600",
  },
  balanceChange: {
    color: colors.palette.badgeMint,
    marginTop: 2,
  },
  balanceContainer: {
    alignItems: "center",
  },
  balanceLabel: {
    color: colors.palette.neutral600,
  },
  balanceValue: {
    color: colors.palette.neutral900,
    marginTop: 4,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
  },
  headerContainer: {
    marginBottom: 24,
  },
  logoContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  logoIcon: {
    alignItems: "center",
    backgroundColor: colors.palette.primary400,
    borderRadius: 8,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  logoText: {
    color: colors.palette.neutral900,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  notificationBadge: {
    backgroundColor: colors.palette.angry500,
    borderRadius: 8,
    height: 16,
    minWidth: 16,
    position: "absolute",
    right: -4,
    top: -4,
  },
  notificationContainer: {
    position: "relative",
  },
  priceChange: {
    color: colors.palette.badgeMint,
    marginTop: 2,
  },
  searchBadge: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 20,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchText: {
    color: colors.palette.neutral500,
  },
  sectionTitle: {
    color: colors.palette.neutral900,
    marginBottom: 12,
  },
  showcaseContainer: {
    gap: 32,
    padding: 20,
  },
  stockHeaderContainer: {
    alignItems: "center",
  },
  stockName: {
    color: colors.palette.neutral600,
    marginTop: 2,
  },
  stockPrice: {
    color: colors.palette.neutral900,
    marginTop: 8,
  },
  stockSymbol: {
    color: colors.palette.neutral900,
  },
  subtitleRow: {
    flexDirection: "row",
    gap: 4,
  },
  tabActive: {
    borderBottomColor: colors.palette.primary400,
    borderBottomWidth: 2,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  tabContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 8,
  },
  tabInactive: {
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  tabTextActive: {
    color: colors.palette.primary400,
  },
  tabTextInactive: {
    color: colors.palette.neutral500,
  },
})

// =============================================================================
// CUSTOM HEADER COMPONENTS
// =============================================================================

const BrandLogo = () => (
  <View style={styles.logoContainer}>
    <View style={styles.logoIcon}>
      <Text style={styles.avatarText}>B</Text>
    </View>
    <Text style={styles.logoText}>Beyond</Text>
  </View>
)

const UserAvatar = () => (
  <View style={styles.avatarContainer}>
    <Text style={styles.avatarText}>JS</Text>
  </View>
)

const NotificationBell = () => (
  <View style={styles.notificationContainer}>
    <Icon icon="bell" size={24} color={colors.palette.neutral700} />
    <View style={styles.notificationBadge} />
  </View>
)

const SearchBar = () => (
  <View style={styles.searchBadge}>
    <Icon icon="view" size={18} color={colors.palette.neutral500} />
    <Text size="sm" text="Search" style={styles.searchText} />
  </View>
)

const PortfolioBalance = () => (
  <View style={styles.balanceContainer}>
    <Text size="xs" text="Total Balance" style={styles.balanceLabel} />
    <Text preset="heading" text="$24,892.45" style={styles.balanceValue} />
    <Text size="xs" text="+$1,234.56 (+5.21%) today" style={styles.balanceChange} />
  </View>
)

const StockHeader = ({ symbol, name }: { symbol: string; name: string }) => (
  <View style={styles.stockHeaderContainer}>
    <Text weight="bold" size="lg" text={symbol} style={styles.stockSymbol} />
    <Text size="xs" text={name} style={styles.stockName} />
    <Text preset="heading" text="$278.73" style={styles.stockPrice} />
    <Text size="sm" text="+$1.49 (+0.54%)" style={styles.priceChange} />
  </View>
)

/**
 * Header Stories
 *
 * Navigation headers for the Beyond Equity investment platform.
 * Includes various configurations for different app screens.
 */
const meta = {
  title: "Layout/Header",
  component: Header,
  argTypes: {
    title: {
      control: "text",
      description: "Header title",
    },
    titleMode: {
      control: "select",
      options: ["center", "flex"],
      description: "Title alignment mode",
    },
    leftIcon: {
      control: "select",
      options: [undefined, "back", "menu", "x"],
      description: "Left icon",
    },
    rightIcon: {
      control: "select",
      options: [undefined, "settings", "bell", "more"],
      description: "Right icon",
    },
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// BASIC VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    title: "Portfolio",
  },
}

export const WithBackButton: Story = {
  args: {
    title: "Account Settings",
    leftIcon: "back",
    onLeftPress: () => console.log("Back pressed"),
  },
}

export const WithCloseButton: Story = {
  args: {
    title: "Add Funds",
    leftIcon: "x",
    onLeftPress: () => console.log("Close pressed"),
  },
}

export const WithActions: Story = {
  args: {
    title: "Watchlist",
    leftIcon: "back",
    rightIcon: "more",
    onLeftPress: () => console.log("Back"),
    onRightPress: () => console.log("More"),
  },
}

export const TitleModes: Story = {
  name: "Title Modes",
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.headerContainer}>
        <Text preset="subheading" text="Center Mode" style={styles.sectionTitle} />
        <Header title="Centered Title" titleMode="center" leftIcon="back" rightIcon="more" />
      </View>
      <View style={styles.headerContainer}>
        <Text preset="subheading" text="Flex Mode" style={styles.sectionTitle} />
        <Header title="Flex Title" titleMode="flex" leftIcon="back" rightIcon="more" />
      </View>
    </View>
  ),
}

// =============================================================================
// APP-SPECIFIC HEADERS
// =============================================================================

export const HomeHeader: Story = {
  name: "Home Screen",
  render: () => (
    <Header
      LeftActionComponent={<BrandLogo />}
      RightActionComponent={<NotificationBell />}
      safeAreaEdges={[]}
    />
  ),
}

export const DashboardHeader: Story = {
  name: "Dashboard",
  render: () => (
    <View>
      <Header
        LeftActionComponent={<BrandLogo />}
        RightActionComponent={<UserAvatar />}
        safeAreaEdges={[]}
      />
      <View style={styles.balanceContainer}>
        <PortfolioBalance />
      </View>
    </View>
  ),
}

export const SearchHeader: Story = {
  name: "Search Screen",
  render: () => (
    <Header
      leftIcon="back"
      onLeftPress={() => {}}
      RightActionComponent={<SearchBar />}
      safeAreaEdges={[]}
    />
  ),
}

export const StockDetailHeader: Story = {
  name: "Stock Detail",
  render: () => (
    <View>
      <Header
        leftIcon="back"
        rightIcon="heart"
        onLeftPress={() => {}}
        onRightPress={() => {}}
        safeAreaEdges={[]}
      />
      <StockHeader symbol="AAPL" name="Apple Inc." />
      <View style={styles.tabContainer}>
        <View style={styles.tabActive}>
          <Text weight="semiBold" text="Overview" style={styles.tabTextActive} />
        </View>
        <View style={styles.tabInactive}>
          <Text weight="medium" text="News" style={styles.tabTextInactive} />
        </View>
        <View style={styles.tabInactive}>
          <Text weight="medium" text="Financials" style={styles.tabTextInactive} />
        </View>
      </View>
    </View>
  ),
}

export const SettingsHeader: Story = {
  name: "Settings Screen",
  render: () => (
    <Header title="Settings" leftIcon="back" onLeftPress={() => {}} safeAreaEdges={[]} />
  ),
}

export const ModalHeader: Story = {
  name: "Modal/Sheet",
  render: () => (
    <Header
      title="Place Order"
      leftIcon="x"
      rightText="Reset"
      onLeftPress={() => {}}
      onRightPress={() => {}}
      safeAreaEdges={[]}
    />
  ),
}

export const OnboardingHeader: Story = {
  name: "Onboarding",
  render: () => (
    <Header
      LeftActionComponent={<BrandLogo />}
      rightText="Skip"
      onRightPress={() => {}}
      safeAreaEdges={[]}
    />
  ),
}

export const ProfileHeader: Story = {
  name: "Profile",
  render: () => (
    <Header
      title="John Smith"
      leftIcon="back"
      rightIcon="settings"
      onLeftPress={() => {}}
      onRightPress={() => {}}
      safeAreaEdges={[]}
    />
  ),
}

// =============================================================================
// TRADING FLOWS
// =============================================================================

export const TradeHeader: Story = {
  name: "Trade: Buy/Sell",
  render: () => (
    <View>
      <Header leftIcon="x" onLeftPress={() => {}} safeAreaEdges={[]} />
      <View style={styles.stockHeaderContainer}>
        <Text weight="bold" size="lg" text="Buy AAPL" style={styles.stockSymbol} />
        <View style={styles.subtitleRow}>
          <Text size="sm" text="Apple Inc. · " style={styles.stockName} />
          <Text size="sm" weight="semiBold" text="$278.73" />
        </View>
      </View>
    </View>
  ),
}

export const OrderReviewHeader: Story = {
  name: "Trade: Review Order",
  render: () => (
    <Header title="Review Order" leftIcon="back" onLeftPress={() => {}} safeAreaEdges={[]} />
  ),
}

export const TransferHeader: Story = {
  name: "Transfer Funds",
  render: () => <Header title="Add Funds" leftIcon="x" onLeftPress={() => {}} safeAreaEdges={[]} />,
}

// =============================================================================
// SHOWCASE
// =============================================================================

export const AllHeaders: Story = {
  name: "All Header Types",
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.headerContainer}>
        <Text preset="subheading" text="Home" style={styles.sectionTitle} />
        <Header
          LeftActionComponent={<BrandLogo />}
          RightActionComponent={<NotificationBell />}
          safeAreaEdges={[]}
        />
      </View>

      <View style={styles.headerContainer}>
        <Text preset="subheading" text="Screen with Back" style={styles.sectionTitle} />
        <Header title="Account Settings" leftIcon="back" safeAreaEdges={[]} />
      </View>

      <View style={styles.headerContainer}>
        <Text preset="subheading" text="Modal" style={styles.sectionTitle} />
        <Header title="Place Order" leftIcon="x" rightText="Reset" safeAreaEdges={[]} />
      </View>

      <View style={styles.headerContainer}>
        <Text preset="subheading" text="With Actions" style={styles.sectionTitle} />
        <Header title="Watchlist" leftIcon="back" rightIcon="more" safeAreaEdges={[]} />
      </View>
    </View>
  ),
}
