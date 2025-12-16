import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react"

import { BarChart, LineChart, PieChart } from "./Charts"
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
  grid: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    color: colors.palette.sand600,
    letterSpacing: 1.2,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  showcaseCard: {
    backgroundColor: colors.palette.sand200,
    borderRadius: 16,
    gap: 20,
    padding: 24,
  },
  showcaseDivider: {
    backgroundColor: colors.palette.sand300,
    height: 1,
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
})

// =============================================================================
// SAMPLE DATA
// =============================================================================

const fishSalesData = [
  { label: "Tuna", value: 450 },
  { label: "Salmon", value: 320 },
  { label: "Cod", value: 280 },
  { label: "Halibut", value: 190 },
  { label: "Sea Bass", value: 150 },
]

const weeklyRevenueData = [
  { label: "Mon", value: 12500 },
  { label: "Tue", value: 18200 },
  { label: "Wed", value: 15800 },
  { label: "Thu", value: 22400 },
  { label: "Fri", value: 28900 },
  { label: "Sat", value: 35200 },
  { label: "Sun", value: 19800 },
]

const catchDistributionData = [
  { label: "Tuna", value: 35 },
  { label: "Salmon", value: 25 },
  { label: "Shellfish", value: 20 },
  { label: "Whitefish", value: 12 },
  { label: "Other", value: 8 },
]

// =============================================================================
// BAR CHART META
// =============================================================================

const barChartMeta: Meta<typeof BarChart> = {
  title: "Charts/BarChart",
  component: BarChart,
  argTypes: {
    height: {
      control: { type: "number", min: 100, max: 400 },
      description: "Chart height",
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Bar orientation",
    },
    showLabels: {
      control: "boolean",
      description: "Show axis labels",
    },
    showValues: {
      control: "boolean",
      description: "Show values on bars",
    },
    showLegend: {
      control: "boolean",
      description: "Show legend",
    },
    barSpacing: {
      control: { type: "number", min: 0, max: 0.8, step: 0.1 },
      description: "Space between bars",
    },
  },
  args: {
    data: fishSalesData,
    height: 200,
    orientation: "vertical",
    showLabels: true,
    showValues: true,
    showLegend: false,
    barSpacing: 0.3,
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
}

export default barChartMeta

type BarChartStory = StoryObj<typeof BarChart>

// =============================================================================
// BAR CHART STORIES
// =============================================================================

export const VerticalBarChart: BarChartStory = {
  name: "Vertical Bar Chart",
}

export const HorizontalBarChart: BarChartStory = {
  name: "Horizontal Bar Chart",
  args: {
    orientation: "horizontal",
    height: 250,
  },
}

export const BarChartWithLegend: BarChartStory = {
  name: "Bar Chart with Legend",
  args: {
    showLegend: true,
  },
}

export const BarChartCustomColors: BarChartStory = {
  name: "Bar Chart with Custom Colors",
  args: {
    data: [
      { label: "Fresh", value: 450, color: colors.palette.seafoam400 },
      { label: "Frozen", value: 280, color: colors.palette.ocean400 },
      { label: "Processed", value: 150, color: colors.palette.sunset400 },
    ],
    showLegend: true,
  },
}

// =============================================================================
// FISH MARKET BAR CHART STORIES
// =============================================================================

export const FishMarketSales: BarChartStory = {
  name: "Fish Market: Daily Sales by Species",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="DAILY SALES BY SPECIES (lbs)" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <BarChart
        data={fishSalesData}
        height={220}
        showLegend
        showValues
      />
    </View>
  ),
}

export const FishMarketPricing: BarChartStory = {
  name: "Fish Market: Price Comparison",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="PRICE PER POUND ($)" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <BarChart
        data={[
          { label: "Bluefin", value: 85 },
          { label: "Yellowfin", value: 45 },
          { label: "King Salmon", value: 38 },
          { label: "Halibut", value: 32 },
          { label: "Cod", value: 18 },
        ]}
        height={200}
        orientation="horizontal"
        showValues
      />
    </View>
  ),
}

export const AuctionBidVolume: BarChartStory = {
  name: "Fish Market: Auction Bid Volume",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="BIDS PER HOUR" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <BarChart
        data={[
          { label: "5AM", value: 45 },
          { label: "6AM", value: 128 },
          { label: "7AM", value: 256 },
          { label: "8AM", value: 189 },
          { label: "9AM", value: 92 },
          { label: "10AM", value: 34 },
        ]}
        height={180}
        barSpacing={0.2}
      />
    </View>
  ),
}

// =============================================================================
// LINE CHART STORIES (using same file for all chart types)
// =============================================================================

export const BasicLineChart: BarChartStory = {
  name: "Line Chart: Basic",
  render: () => (
    <View style={styles.decorator}>
      <LineChart
        data={weeklyRevenueData}
        height={200}
        showDots
        showValues
      />
    </View>
  ),
}

export const LineChartWithArea: BarChartStory = {
  name: "Line Chart: With Fill",
  render: () => (
    <View style={styles.decorator}>
      <LineChart
        data={weeklyRevenueData}
        height={200}
        showDots
        fillArea
        lineColor={colors.palette.seafoam400}
      />
    </View>
  ),
}

export const FishMarketRevenueTrend: BarChartStory = {
  name: "Fish Market: Weekly Revenue Trend",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="WEEKLY REVENUE ($)" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <LineChart
        data={weeklyRevenueData}
        height={200}
        showDots
        showValues
        fillArea
        lineColor={colors.palette.ocean500}
      />
    </View>
  ),
}

export const CatchTrend: BarChartStory = {
  name: "Fish Market: Monthly Catch Trend",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="MONTHLY CATCH (lbs)" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <LineChart
        data={[
          { label: "Jan", value: 8500 },
          { label: "Feb", value: 9200 },
          { label: "Mar", value: 12800 },
          { label: "Apr", value: 15400 },
          { label: "May", value: 18900 },
          { label: "Jun", value: 22100 },
        ]}
        height={180}
        showDots
        showLegend
      />
    </View>
  ),
}

// =============================================================================
// PIE CHART STORIES
// =============================================================================

export const BasicPieChart: BarChartStory = {
  name: "Pie Chart: Basic",
  render: () => (
    <View style={styles.decorator}>
      <PieChart
        data={catchDistributionData}
        height={200}
        showLegend
        showValues
      />
    </View>
  ),
}

export const DonutChart: BarChartStory = {
  name: "Pie Chart: Donut",
  render: () => (
    <View style={styles.decorator}>
      <PieChart
        data={catchDistributionData}
        height={200}
        donut
        centerLabel="Total"
        centerValue="100%"
        showLegend
      />
    </View>
  ),
}

export const FishMarketCatchDistribution: BarChartStory = {
  name: "Fish Market: Catch Distribution",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="TODAY'S CATCH DISTRIBUTION" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <PieChart
        data={catchDistributionData}
        height={180}
        donut
        centerLabel="Total"
        centerValue="1,247 lbs"
        showLegend
        showValues
      />
    </View>
  ),
}

export const RevenueByChannel: BarChartStory = {
  name: "Fish Market: Revenue by Channel",
  render: () => (
    <View style={styles.showcaseCard}>
      <Text size="xs" weight="medium" text="REVENUE BY SALES CHANNEL" style={styles.sectionLabel} />
      <View style={styles.showcaseDivider} />
      <PieChart
        data={[
          { label: "Auctions", value: 45, color: colors.palette.ocean500 },
          { label: "Direct Sales", value: 30, color: colors.palette.seafoam400 },
          { label: "Contracts", value: 18, color: colors.palette.sunset400 },
          { label: "Retail", value: 7, color: colors.palette.coral400 },
        ]}
        height={180}
        donut
        donutHoleSize={0.6}
        centerLabel="Revenue"
        centerValue="$48.2K"
        showLegend
      />
    </View>
  ),
}

// =============================================================================
// COMPLETE SHOWCASE
// =============================================================================

export const CompleteChartsShowcase: BarChartStory = {
  name: "Complete Charts Showcase",
  render: () => (
    <View style={styles.grid}>
      {/* Bar Charts */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="BAR CHARTS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />

        <View style={styles.section}>
          <Text size="xxs" text="Vertical" style={styles.sectionLabel} />
          <BarChart
            data={fishSalesData.slice(0, 4)}
            height={150}
            showValues
          />
        </View>

        <View style={styles.section}>
          <Text size="xxs" text="Horizontal" style={styles.sectionLabel} />
          <BarChart
            data={fishSalesData.slice(0, 4)}
            height={150}
            orientation="horizontal"
            showValues
          />
        </View>
      </View>

      {/* Line Chart */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="LINE CHART" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />
        <LineChart
          data={weeklyRevenueData}
          height={180}
          showDots
          showValues
          fillArea
        />
      </View>

      {/* Pie Charts */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="PIE / DONUT CHARTS" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />

        <View style={styles.row}>
          <View style={styles.flex1}>
            <Text size="xxs" text="Pie" style={styles.sectionLabel} />
            <PieChart
              data={catchDistributionData.slice(0, 3)}
              height={120}
              showLegend={false}
            />
          </View>
          <View style={styles.flex1}>
            <Text size="xxs" text="Donut" style={styles.sectionLabel} />
            <PieChart
              data={catchDistributionData.slice(0, 3)}
              height={120}
              donut
              donutHoleSize={0.5}
              showLegend={false}
            />
          </View>
        </View>
      </View>

      {/* Dashboard Example */}
      <View style={styles.showcaseCard}>
        <Text size="xs" weight="medium" text="DASHBOARD EXAMPLE" style={styles.sectionLabel} />
        <View style={styles.showcaseDivider} />

        <View style={styles.row}>
          <View style={styles.flex1}>
            <BarChart
              data={fishSalesData.slice(0, 3)}
              height={120}
              showLabels
              showValues={false}
            />
          </View>
          <View style={styles.flex1}>
            <PieChart
              data={catchDistributionData.slice(0, 3)}
              height={120}
              donut
              donutHoleSize={0.6}
              showLegend={false}
            />
          </View>
        </View>
      </View>
    </View>
  ),
}
