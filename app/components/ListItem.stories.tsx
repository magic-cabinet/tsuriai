import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Icon } from "./Icon"
import { ListItem } from "./ListItem"
import { Text } from "./Text"
import { colors } from "../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  changeNegative: {
    color: colors.palette.badgeCoral,
  },
  changePositive: {
    color: colors.palette.badgeMint,
  },
  cryptoBadge: {
    alignItems: "center",
    borderRadius: 20,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  cryptoBadgeBitcoin: {
    backgroundColor: colors.palette.cryptoBitcoin,
  },
  cryptoBadgeEthereum: {
    backgroundColor: colors.palette.cryptoEthereum,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
    flex: 1,
    padding: 24,
  },
  investmentBadge: {
    alignItems: "center",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  investmentMetrics: {
    alignItems: "flex-end",
    gap: 2,
  },
  investmentReturn: {
    color: colors.palette.badgeMint,
  },
  investmentReturnNegative: {
    color: colors.palette.badgeCoral,
  },
  listContainer: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 20,
    overflow: "hidden",
  },
  listContainerBordered: {
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral300,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  positionDetails: {
    alignItems: "flex-end",
  },
  positionQty: {
    color: colors.palette.neutral600,
  },
  positionValue: {
    color: colors.palette.neutral900,
  },
  priceChange: {
    marginTop: 2,
  },
  sectionHeader: {
    backgroundColor: colors.palette.neutral200,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionLabel: {
    color: colors.palette.neutral500,
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.palette.neutral500,
    letterSpacing: 1,
  },
  showcaseCard: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 20,
    gap: 20,
    padding: 24,
  },
  showcaseContainer: {
    gap: 32,
  },
  showcaseDivider: {
    backgroundColor: colors.palette.neutral300,
    height: 1,
    marginVertical: 4,
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    color: colors.palette.neutral600,
    marginTop: 2,
  },
  stockPrice: {
    alignItems: "flex-end",
  },
  stockSymbol: {
    color: colors.palette.neutral900,
  },
  symbolBadge: {
    alignItems: "center",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  symbolText: {
    color: colors.palette.neutral100,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  transactionAmount: {
    color: colors.palette.neutral900,
  },
  transactionAmountNegative: {
    color: colors.palette.badgeCoral,
  },
  transactionAmountPositive: {
    color: colors.palette.badgeMint,
  },
  transactionDate: {
    color: colors.palette.neutral500,
    marginTop: 2,
  },
  transactionDetails: {
    alignItems: "flex-end",
  },
  transactionIcon: {
    alignItems: "center",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionStatus: {
    marginTop: 2,
  },
  transactionTitle: {
    color: colors.palette.neutral900,
  },
})

/**
 * ListItem Stories
 *
 * Premium list rows for the Tsuriai fish marketplace.
 * Inspired by Japanese fish market displays and auction listings.
 *
 * Design principles:
 * - Consistent 72px height for financial data rows
 * - Clear price/change typography hierarchy
 * - Color-coded badges for quick identification
 * - Smooth visual rhythm with separators
 */
const meta = {
  title: "Layout/ListItem",
  component: ListItem,
  argTypes: {
    text: {
      control: "text",
      description: "Item text",
    },
    height: {
      control: "number",
      description: "Row height",
    },
    topSeparator: {
      control: "boolean",
      description: "Show top separator",
    },
    bottomSeparator: {
      control: "boolean",
      description: "Show bottom separator",
    },
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ListItem>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

const StockSymbolBadge = ({ symbol, color }: { symbol: string; color: string }) => (
  <View style={[styles.symbolBadge, { backgroundColor: color }]}>
    <Text style={styles.symbolText}>{symbol.slice(0, 2).toUpperCase()}</Text>
  </View>
)

const StockPriceDisplay = ({
  price,
  change,
  changePercent,
}: {
  price: string
  change: string
  changePercent: string
}) => {
  const isPositive = !change.startsWith("-")
  return (
    <View style={styles.stockPrice}>
      <Text weight="semiBold" text={price} />
      <Text
        size="xs"
        text={`${isPositive ? "+" : ""}${change} (${changePercent})`}
        style={[styles.priceChange, isPositive ? styles.changePositive : styles.changeNegative]}
      />
    </View>
  )
}

const PositionDisplay = ({
  value,
  shares,
  change,
}: {
  value: string
  shares: string
  change: string
}) => {
  const isPositive = !change.startsWith("-")
  return (
    <View style={styles.positionDetails}>
      <Text weight="semiBold" text={value} style={styles.positionValue} />
      <Text
        size="xs"
        text={`${shares} · ${isPositive ? "+" : ""}${change}`}
        style={[styles.positionQty, isPositive ? styles.changePositive : styles.changeNegative]}
      />
    </View>
  )
}

const TransactionIcon = ({ type }: { type: "buy" | "sell" | "deposit" | "withdrawal" }) => {
  const iconColors: Record<string, string> = {
    buy: colors.palette.badgeMint,
    sell: colors.palette.badgeCoral,
    deposit: colors.palette.primary400,
    withdrawal: colors.palette.neutral500,
  }
  return (
    <View style={[styles.transactionIcon, { backgroundColor: iconColors[type] + "20" }]}>
      <Icon
        icon={type === "buy" || type === "deposit" ? "caretRight" : "caretLeft"}
        size={18}
        color={iconColors[type]}
      />
    </View>
  )
}

// =============================================================================
// CORE VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    text: "Account Settings",
  },
}

export const WithIcons: Story = {
  name: "With Icons",
  args: {
    text: "Security Settings",
    leftIcon: "lock",
    rightIcon: "caretRight",
  },
}

export const Pressable: Story = {
  args: {
    text: "Tap to navigate",
    rightIcon: "caretRight",
    onPress: () => console.log("Pressed"),
  },
}

// =============================================================================
// WATCHLIST (Robinhood inspired)
// =============================================================================

export const WatchlistItem: Story = {
  name: "Watchlist: Single Stock",
  render: () => (
    <View style={styles.listContainerBordered}>
      <ListItem
        height={72}
        onPress={() => console.log("View AAPL")}
        LeftComponent={<StockSymbolBadge symbol="AAPL" color={colors.palette.neutral800} />}
        RightComponent={<StockPriceDisplay price="$178.72" change="+2.43" changePercent="+1.38%" />}
      >
        <View style={styles.stockInfo}>
          <Text weight="semiBold" text="AAPL" style={styles.stockSymbol} />
          <Text size="xs" text="Apple Inc." style={styles.stockName} />
        </View>
      </ListItem>
    </View>
  ),
}

export const WatchlistMultiple: Story = {
  name: "Watchlist: Stock List",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text size="xs" weight="medium" text="WATCHLIST" style={styles.sectionLabel} />
      <View style={styles.listContainer}>
        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={<StockSymbolBadge symbol="AAPL" color={colors.palette.neutral800} />}
          RightComponent={
            <StockPriceDisplay price="$178.72" change="+2.43" changePercent="+1.38%" />
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="AAPL" style={styles.stockSymbol} />
            <Text size="xs" text="Apple Inc." style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={<StockSymbolBadge symbol="NVDA" color="#76B900" />}
          RightComponent={
            <StockPriceDisplay price="$138.25" change="+4.32" changePercent="+3.23%" />
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="NVDA" style={styles.stockSymbol} />
            <Text size="xs" text="NVIDIA Corporation" style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={<StockSymbolBadge symbol="TSLA" color="#CC0000" />}
          RightComponent={
            <StockPriceDisplay price="$352.80" change="-8.45" changePercent="-2.34%" />
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="TSLA" style={styles.stockSymbol} />
            <Text size="xs" text="Tesla, Inc." style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={72}
          onPress={() => {}}
          LeftComponent={<StockSymbolBadge symbol="MSFT" color="#00A4EF" />}
          RightComponent={
            <StockPriceDisplay price="$477.28" change="+2.15" changePercent="+0.45%" />
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="MSFT" style={styles.stockSymbol} />
            <Text size="xs" text="Microsoft Corporation" style={styles.stockName} />
          </View>
        </ListItem>
      </View>
    </View>
  ),
}

// =============================================================================
// CRYPTO (Public inspired)
// =============================================================================

export const CryptoList: Story = {
  name: "Crypto: Holdings",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text size="xs" weight="medium" text="CRYPTO" style={styles.sectionLabel} />
      <View style={styles.listContainer}>
        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={
            <View style={[styles.cryptoBadge, styles.cryptoBadgeBitcoin]}>
              <Text weight="bold" size="xs" text="BTC" style={styles.symbolText} />
            </View>
          }
          RightComponent={
            <PositionDisplay value="$9,314.00" shares="0.1 BTC" change="+$1,286.00" />
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="Bitcoin" style={styles.stockSymbol} />
            <Text size="xs" text="$93,140.00" style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={72}
          onPress={() => {}}
          LeftComponent={
            <View style={[styles.cryptoBadge, styles.cryptoBadgeEthereum]}>
              <Text weight="bold" size="xs" text="ETH" style={styles.symbolText} />
            </View>
          }
          RightComponent={<PositionDisplay value="$3,892.50" shares="1.5 ETH" change="+$412.50" />}
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="Ethereum" style={styles.stockSymbol} />
            <Text size="xs" text="$2,595.00" style={styles.stockName} />
          </View>
        </ListItem>
      </View>
    </View>
  ),
}

// =============================================================================
// PORTFOLIO POSITIONS
// =============================================================================

export const PortfolioPosition: Story = {
  name: "Portfolio: Single Position",
  render: () => (
    <View style={styles.listContainerBordered}>
      <ListItem
        height={72}
        onPress={() => {}}
        LeftComponent={<StockSymbolBadge symbol="AAPL" color={colors.palette.neutral800} />}
        RightComponent={<PositionDisplay value="$1,787.20" shares="10 shares" change="+$243.20" />}
      >
        <View style={styles.stockInfo}>
          <Text weight="semiBold" text="AAPL" style={styles.stockSymbol} />
          <Text size="xs" text="$178.72 per share" style={styles.stockName} />
        </View>
      </ListItem>
    </View>
  ),
}

export const PortfolioHoldings: Story = {
  name: "Portfolio: All Holdings",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text size="xs" weight="medium" text="YOUR HOLDINGS" style={styles.sectionLabel} />
      <View style={styles.listContainer}>
        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={<StockSymbolBadge symbol="AAPL" color={colors.palette.neutral800} />}
          RightComponent={
            <PositionDisplay value="$1,787.20" shares="10 shares" change="+$243.20" />
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="AAPL" style={styles.stockSymbol} />
            <Text size="xs" text="$178.72 per share" style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={<StockSymbolBadge symbol="NVDA" color="#76B900" />}
          RightComponent={
            <PositionDisplay value="$6,912.50" shares="50 shares" change="+$2,160.00" />
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="NVDA" style={styles.stockSymbol} />
            <Text size="xs" text="$138.25 per share" style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={72}
          onPress={() => {}}
          LeftComponent={
            <View style={[styles.cryptoBadge, styles.cryptoBadgeBitcoin]}>
              <Text weight="bold" size="xs" text="BTC" style={styles.symbolText} />
            </View>
          }
          RightComponent={<PositionDisplay value="$9,314.00" shares="0.1 BTC" change="-$286.00" />}
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="Bitcoin" style={styles.stockSymbol} />
            <Text size="xs" text="$93,140.00 per coin" style={styles.stockName} />
          </View>
        </ListItem>
      </View>
    </View>
  ),
}

// =============================================================================
// PREMIUM CATCH (Tsuriai specific)
// =============================================================================

export const PrivateInvestments: Story = {
  name: "Portfolio: Private Investments",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text size="xs" weight="medium" text="PRIVATE INVESTMENTS" style={styles.sectionLabel} />
      <View style={styles.listContainer}>
        <ListItem
          height={80}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={
            <View style={[styles.investmentBadge, { backgroundColor: colors.palette.badgeTeal }]}>
              <Text weight="bold" size="xxs" text="AVX" style={styles.symbolText} />
            </View>
          }
          RightComponent={
            <View style={styles.investmentMetrics}>
              <Text weight="semiBold" text="$75,000" />
              <Text size="xs" text="+18.5% IRR" style={styles.investmentReturn} />
            </View>
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="Sunset Tower" style={styles.stockSymbol} />
            <Text size="xs" text="Class A Multifamily · Austin" style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={80}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={
            <View style={[styles.investmentBadge, { backgroundColor: colors.palette.badgeMint }]}>
              <Text weight="bold" size="xxs" text="JV1" style={styles.symbolText} />
            </View>
          }
          RightComponent={
            <View style={styles.investmentMetrics}>
              <Text weight="semiBold" text="$100,000" />
              <Text size="xs" text="+22.0% IRR" style={styles.investmentReturn} />
            </View>
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="Marina Bay" style={styles.stockSymbol} />
            <Text size="xs" text="Mixed-Use · San Diego" style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={80}
          onPress={() => {}}
          LeftComponent={
            <View style={[styles.investmentBadge, { backgroundColor: colors.palette.badgeCoral }]}>
              <Text weight="bold" size="xxs" text="IPR" style={styles.symbolText} />
            </View>
          }
          RightComponent={
            <View style={styles.investmentMetrics}>
              <Text weight="semiBold" text="$50,000" />
              <Text size="xs" text="-2.3% IRR" style={styles.investmentReturnNegative} />
            </View>
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="Riverside Commons" style={styles.stockSymbol} />
            <Text size="xs" text="Rehab · Denver" style={styles.stockName} />
          </View>
        </ListItem>
      </View>
    </View>
  ),
}

// =============================================================================
// TRANSACTIONS
// =============================================================================

export const TransactionItem: Story = {
  name: "Transaction: Single",
  render: () => (
    <View style={styles.listContainerBordered}>
      <ListItem height={72} onPress={() => {}} LeftComponent={<TransactionIcon type="buy" />}>
        <View style={styles.transactionInfo}>
          <Text weight="semiBold" text="Bought AAPL" style={styles.transactionTitle} />
          <Text size="xs" text="Dec 10, 2025 · 2:34 PM" style={styles.transactionDate} />
        </View>
        <View style={styles.transactionDetails}>
          <Text weight="semiBold" text="-$1,787.20" style={styles.transactionAmount} />
          <Text size="xs" text="10 shares" style={styles.transactionStatus} />
        </View>
      </ListItem>
    </View>
  ),
}

export const TransactionHistory: Story = {
  name: "Transaction: History",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text size="xs" weight="medium" text="RECENT ACTIVITY" style={styles.sectionLabel} />
      <View style={styles.listContainer}>
        <View style={styles.sectionHeader}>
          <Text size="xxs" weight="semiBold" text="TODAY" style={styles.sectionTitle} />
        </View>

        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={<TransactionIcon type="buy" />}
        >
          <View style={styles.transactionInfo}>
            <Text weight="semiBold" text="Bought NVDA" style={styles.transactionTitle} />
            <Text size="xs" text="2:34 PM · Filled" style={styles.transactionDate} />
          </View>
          <View style={styles.transactionDetails}>
            <Text weight="semiBold" text="-$691.25" style={styles.transactionAmount} />
            <Text size="xs" text="5 shares" style={styles.transactionStatus} />
          </View>
        </ListItem>

        <ListItem height={72} onPress={() => {}} LeftComponent={<TransactionIcon type="deposit" />}>
          <View style={styles.transactionInfo}>
            <Text weight="semiBold" text="Deposit" style={styles.transactionTitle} />
            <Text size="xs" text="9:15 AM · Completed" style={styles.transactionDate} />
          </View>
          <View style={styles.transactionDetails}>
            <Text weight="semiBold" text="+$5,000.00" style={styles.transactionAmountPositive} />
            <Text size="xs" text="Bank of America" style={styles.transactionStatus} />
          </View>
        </ListItem>

        <View style={styles.sectionHeader}>
          <Text size="xxs" weight="semiBold" text="YESTERDAY" style={styles.sectionTitle} />
        </View>

        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={<TransactionIcon type="sell" />}
        >
          <View style={styles.transactionInfo}>
            <Text weight="semiBold" text="Sold TSLA" style={styles.transactionTitle} />
            <Text size="xs" text="3:45 PM · Filled" style={styles.transactionDate} />
          </View>
          <View style={styles.transactionDetails}>
            <Text weight="semiBold" text="+$1,764.00" style={styles.transactionAmountPositive} />
            <Text size="xs" text="5 shares" style={styles.transactionStatus} />
          </View>
        </ListItem>

        <ListItem
          height={72}
          onPress={() => {}}
          LeftComponent={<TransactionIcon type="withdrawal" />}
        >
          <View style={styles.transactionInfo}>
            <Text weight="semiBold" text="Withdrawal" style={styles.transactionTitle} />
            <Text size="xs" text="11:20 AM · Completed" style={styles.transactionDate} />
          </View>
          <View style={styles.transactionDetails}>
            <Text weight="semiBold" text="-$2,000.00" style={styles.transactionAmountNegative} />
            <Text size="xs" text="Chase Bank" style={styles.transactionStatus} />
          </View>
        </ListItem>
      </View>
    </View>
  ),
}

// =============================================================================
// SETTINGS MENU
// =============================================================================

export const SettingsMenu: Story = {
  name: "Settings: Menu",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text size="xs" weight="medium" text="SETTINGS" style={styles.sectionLabel} />
      <View style={styles.listContainer}>
        <ListItem
          text="Account Information"
          leftIcon="community"
          rightIcon="caretRight"
          bottomSeparator
          onPress={() => {}}
        />
        <ListItem
          text="Linked Accounts"
          leftIcon="components"
          rightIcon="caretRight"
          bottomSeparator
          onPress={() => {}}
        />
        <ListItem
          text="Security"
          leftIcon="lock"
          rightIcon="caretRight"
          bottomSeparator
          onPress={() => {}}
        />
        <ListItem
          text="Notifications"
          leftIcon="bell"
          rightIcon="caretRight"
          bottomSeparator
          onPress={() => {}}
        />
        <ListItem text="Documents" leftIcon="view" rightIcon="caretRight" onPress={() => {}} />
      </View>
    </View>
  ),
}

// =============================================================================
// MARKET MOVERS
// =============================================================================

export const MarketMovers: Story = {
  name: "Market: Top Gainers",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text size="xs" weight="medium" text="TOP GAINERS" style={styles.sectionLabel} />
      <View style={styles.listContainer}>
        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={<StockSymbolBadge symbol="MSTR" color={colors.palette.badgeMint} />}
          RightComponent={
            <StockPriceDisplay price="$408.67" change="+45.23" changePercent="+12.4%" />
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="MSTR" style={styles.stockSymbol} />
            <Text size="xs" text="MicroStrategy Inc." style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={72}
          bottomSeparator
          onPress={() => {}}
          LeftComponent={<StockSymbolBadge symbol="COIN" color={colors.palette.badgeMint} />}
          RightComponent={
            <StockPriceDisplay price="$312.45" change="+28.90" changePercent="+10.2%" />
          }
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="COIN" style={styles.stockSymbol} />
            <Text size="xs" text="Coinbase Global" style={styles.stockName} />
          </View>
        </ListItem>

        <ListItem
          height={72}
          onPress={() => {}}
          LeftComponent={<StockSymbolBadge symbol="PLTR" color={colors.palette.badgeMint} />}
          RightComponent={<StockPriceDisplay price="$78.34" change="+5.67" changePercent="+7.8%" />}
        >
          <View style={styles.stockInfo}>
            <Text weight="semiBold" text="PLTR" style={styles.stockSymbol} />
            <Text size="xs" text="Palantir Technologies" style={styles.stockName} />
          </View>
        </ListItem>
      </View>
    </View>
  ),
}

// =============================================================================
// ALL STATES SHOWCASE
// =============================================================================

export const AllStates: Story = {
  name: "All List States",
  render: () => (
    <View style={styles.showcaseContainer}>
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="LIST ITEM VARIANTS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <View style={styles.listContainer}>
          <ListItem text="Basic Text" bottomSeparator />
          <ListItem text="With Left Icon" leftIcon="bell" bottomSeparator />
          <ListItem text="With Right Icon" rightIcon="caretRight" bottomSeparator />
          <ListItem text="With Both Icons" leftIcon="lock" rightIcon="caretRight" />
        </View>
      </View>
    </View>
  ),
}
