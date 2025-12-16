import React, { useMemo } from "react"
import { StyleProp, StyleSheet, View, ViewStyle, TextStyle } from "react-native"
import Svg, { G, Path, Circle } from "react-native-svg"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"

// =============================================================================
// SHARED TYPES
// =============================================================================

export interface ChartDataPoint {
  /**
   * Label for the data point
   */
  label: string
  /**
   * Numeric value
   */
  value: number
  /**
   * Optional custom color
   */
  color?: string
}

interface BaseChartProps {
  /**
   * Chart data points
   */
  data: ChartDataPoint[]
  /**
   * Chart height
   * @default 200
   */
  height?: number
  /**
   * Whether to show labels
   * @default true
   */
  showLabels?: boolean
  /**
   * Whether to show values
   * @default true
   */
  showValues?: boolean
  /**
   * Whether to show legend
   * @default false
   */
  showLegend?: boolean
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

// =============================================================================
// BAR CHART
// =============================================================================

export interface BarChartProps extends BaseChartProps {
  /**
   * Bar orientation
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal"
  /**
   * Bar corner radius
   * @default 4
   */
  barRadius?: number
  /**
   * Space between bars (0-1)
   * @default 0.3
   */
  barSpacing?: number
}

/**
 * BarChart component for displaying categorical data.
 * Supports vertical and horizontal orientations.
 *
 * @param {BarChartProps} props - The props for the `BarChart` component.
 * @returns {JSX.Element} The rendered `BarChart` component.
 *
 * @example
 * <BarChart
 *   data={[
 *     { label: "Tuna", value: 450 },
 *     { label: "Salmon", value: 320 },
 *     { label: "Cod", value: 280 },
 *   ]}
 *   height={200}
 *   showLegend
 * />
 */
export function BarChart(props: BarChartProps) {
  const {
    data,
    height = 200,
    showLabels = true,
    showValues = true,
    showLegend = false,
    orientation = "vertical",
    barRadius = 4,
    barSpacing = 0.3,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data])

  const defaultColors = [
    theme.colors.palette.ocean500,
    theme.colors.palette.seafoam400,
    theme.colors.palette.sunset400,
    theme.colors.palette.coral400,
    theme.colors.palette.kelp300,
    theme.colors.palette.ocean300,
  ]

  const getColor = (index: number, customColor?: string) => {
    return customColor ?? defaultColors[index % defaultColors.length]
  }

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toString()
  }

  if (orientation === "horizontal") {
    return (
      <View style={$styleOverride}>
        <View style={themed($horizontalBarsContainer)}>
          {data.map((item, index) => {
            const barWidth = maxValue > 0 ? (item.value / maxValue) * 100 : 0
            const color = getColor(index, item.color)

            return (
              <View key={index} style={themed($horizontalBarRow)}>
                {showLabels && (
                  <Text text={item.label} size="xs" style={themed($horizontalLabel)} numberOfLines={1} />
                )}
                <View style={themed($horizontalBarTrack)}>
                  <View
                    style={[
                      themed($horizontalBar),
                      {
                        width: `${barWidth}%`,
                        backgroundColor: color,
                        borderRadius: barRadius,
                      },
                    ]}
                  />
                </View>
                {showValues && (
                  <Text text={formatValue(item.value)} size="xs" style={themed($horizontalValue)} />
                )}
              </View>
            )
          })}
        </View>
        {showLegend && renderLegend(data, getColor, themed)}
      </View>
    )
  }

  // Vertical bars
  return (
    <View style={$styleOverride}>
      <View style={[themed($verticalChartContainer), { height }]}>
        {/* Y-axis labels */}
        <View style={themed($yAxisLabels)}>
          <Text text={formatValue(maxValue)} size="xxs" style={themed($axisLabel)} />
          <Text text={formatValue(maxValue / 2)} size="xxs" style={themed($axisLabel)} />
          <Text text="0" size="xxs" style={themed($axisLabel)} />
        </View>

        {/* Bars */}
        <View style={themed($verticalBarsContainer)}>
          {data.map((item, index) => {
            const barHeight = maxValue > 0 ? (item.value / maxValue) * 100 : 0
            const color = getColor(index, item.color)

            return (
              <View key={index} style={[themed($verticalBarColumn), { flex: 1 - barSpacing }]}>
                <View style={themed($verticalBarWrapper)}>
                  <View
                    style={[
                      themed($verticalBar),
                      {
                        height: `${barHeight}%`,
                        backgroundColor: color,
                        borderTopLeftRadius: barRadius,
                        borderTopRightRadius: barRadius,
                      },
                    ]}
                  >
                    {showValues && barHeight > 15 && (
                      <Text text={formatValue(item.value)} size="xxs" style={themed($barValueInside)} />
                    )}
                  </View>
                </View>
                {showLabels && (
                  <Text text={item.label} size="xxs" style={themed($verticalLabel)} numberOfLines={1} />
                )}
              </View>
            )
          })}
        </View>
      </View>
      {showLegend && renderLegend(data, getColor, themed)}
    </View>
  )
}

// =============================================================================
// LINE CHART
// =============================================================================

export interface LineChartProps extends BaseChartProps {
  /**
   * Whether to show dots at data points
   * @default true
   */
  showDots?: boolean
  /**
   * Whether to fill area under line
   * @default false
   */
  fillArea?: boolean
  /**
   * Line color
   */
  lineColor?: string
}

/**
 * LineChart component for displaying trends over time.
 * Uses connected bar segments to simulate a line chart.
 *
 * @param {LineChartProps} props - The props for the `LineChart` component.
 * @returns {JSX.Element} The rendered `LineChart` component.
 *
 * @example
 * <LineChart
 *   data={[
 *     { label: "Mon", value: 120 },
 *     { label: "Tue", value: 180 },
 *     { label: "Wed", value: 150 },
 *   ]}
 *   height={200}
 *   showDots
 * />
 */
export function LineChart(props: LineChartProps) {
  const {
    data,
    height = 200,
    showLabels = true,
    showValues = true,
    showLegend = false,
    showDots = true,
    fillArea = false,
    lineColor,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data])
  const minValue = useMemo(() => Math.min(...data.map((d) => d.value)), [data])
  const range = maxValue - minValue || 1

  const color = lineColor ?? theme.colors.palette.ocean500

  const formatValue = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toString()
  }

  const getYPosition = (value: number): number => {
    return ((value - minValue) / range) * 100
  }

  return (
    <View style={$styleOverride}>
      <View style={[themed($lineChartContainer), { height }]}>
        {/* Y-axis labels */}
        <View style={themed($yAxisLabels)}>
          <Text text={formatValue(maxValue)} size="xxs" style={themed($axisLabel)} />
          <Text text={formatValue((maxValue + minValue) / 2)} size="xxs" style={themed($axisLabel)} />
          <Text text={formatValue(minValue)} size="xxs" style={themed($axisLabel)} />
        </View>

        {/* Chart area */}
        <View style={themed($lineChartArea)}>
          {/* Grid lines */}
          <View style={themed($gridLines)}>
            <View style={themed($gridLine)} />
            <View style={themed($gridLine)} />
            <View style={themed($gridLine)} />
          </View>

          {/* Data points and connections */}
          <View style={themed($dataPointsContainer)}>
            {data.map((item, index) => {
              const yPos = getYPosition(item.value)

              return (
                <View key={index} style={themed($dataPointColumn)}>
                  {/* Fill area (simplified as bars from bottom) */}
                  {fillArea && (
                    <View
                      style={[
                        themed($fillBar),
                        {
                          height: `${yPos}%`,
                          backgroundColor: color,
                          opacity: 0.2,
                        },
                      ]}
                    />
                  )}

                  {/* Dot */}
                  {showDots && (
                    <View
                      style={[
                        themed($dot),
                        {
                          bottom: `${yPos}%`,
                          backgroundColor: color,
                          borderColor: theme.colors.palette.sand100,
                        },
                      ]}
                    />
                  )}

                  {/* Value label */}
                  {showValues && (
                    <View style={[themed($valueLabel), { bottom: `${yPos + 5}%` }]}>
                      <Text text={formatValue(item.value)} size="xxs" style={{ color }} />
                    </View>
                  )}
                </View>
              )
            })}
          </View>

          {/* X-axis labels */}
          {showLabels && (
            <View style={themed($xAxisLabels)}>
              {data.map((item, index) => (
                <View key={index} style={themed($xLabelColumn)}>
                  <Text text={item.label} size="xxs" style={themed($xLabel)} numberOfLines={1} />
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
      {showLegend && (
        <View style={themed($legendContainer)}>
          <View style={themed($legendItem)}>
            <View style={[themed($legendDot), { backgroundColor: color }]} />
            <Text text="Value" size="xs" style={themed($legendText)} />
          </View>
        </View>
      )}
    </View>
  )
}

// =============================================================================
// PIE/DONUT CHART
// =============================================================================

export interface PieChartProps extends BaseChartProps {
  /**
   * Whether to render as donut (with hole in center)
   * @default false
   */
  donut?: boolean
  /**
   * Donut hole size (0-1)
   * @default 0.5
   */
  donutHoleSize?: number
  /**
   * Text to show in donut center
   */
  centerLabel?: string
  /**
   * Value to show in donut center
   */
  centerValue?: string
}

/**
 * PieChart component for displaying proportional data.
 * Uses react-native-svg for proper pie/donut chart rendering.
 *
 * @param {PieChartProps} props - The props for the `PieChart` component.
 * @returns {JSX.Element} The rendered `PieChart` component.
 *
 * @example
 * <PieChart
 *   data={[
 *     { label: "Tuna", value: 45 },
 *     { label: "Salmon", value: 30 },
 *     { label: "Other", value: 25 },
 *   ]}
 *   donut
 *   centerLabel="Total"
 *   centerValue="100%"
 * />
 */
export function PieChart(props: PieChartProps) {
  const {
    data,
    height = 200,
    showLabels: _showLabels = true,
    showValues = true,
    showLegend = true,
    donut = false,
    donutHoleSize = 0.5,
    centerLabel,
    centerValue,
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data])

  const defaultColors = [
    theme.colors.palette.ocean500,
    theme.colors.palette.seafoam400,
    theme.colors.palette.sunset400,
    theme.colors.palette.coral400,
    theme.colors.palette.kelp300,
    theme.colors.palette.ocean300,
    theme.colors.palette.seafoam200,
    theme.colors.palette.sunset200,
  ]

  const getColor = (index: number, customColor?: string) => {
    return customColor ?? defaultColors[index % defaultColors.length]
  }

  const size = height
  const center = size / 2
  const outerRadius = size / 2
  const innerRadius = donut ? outerRadius * donutHoleSize : 0

  // Calculate segments with angles
  const segments = useMemo(() => {
    let cumulativeAngle = -90 // Start from top (12 o'clock)
    return data.map((item, index) => {
      const percentage = total > 0 ? (item.value / total) * 100 : 0
      const angle = (percentage / 100) * 360
      const startAngle = cumulativeAngle
      cumulativeAngle += angle
      const endAngle = cumulativeAngle
      return {
        ...item,
        percentage,
        startAngle,
        endAngle,
        color: getColor(index, item.color),
      }
    })
  }, [data, total])

  // Convert polar to cartesian coordinates
  const polarToCartesian = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    }
  }

  // Create SVG arc path for a pie segment
  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(startAngle, outerRadius)
    const end = polarToCartesian(endAngle, outerRadius)
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

    if (donut) {
      const innerStart = polarToCartesian(startAngle, innerRadius)
      const innerEnd = polarToCartesian(endAngle, innerRadius)

      return [
        `M ${start.x} ${start.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
        "Z",
      ].join(" ")
    } else {
      return [
        `M ${center} ${center}`,
        `L ${start.x} ${start.y}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
        "Z",
      ].join(" ")
    }
  }

  return (
    <View style={[$styleOverride, themed($pieChartWrapper)]}>
      <View style={[themed($pieChartContainer), { width: size, height: size }]}>
        <Svg width={size} height={size}>
          <G>
            {segments.map((segment, index) => {
              // Handle edge case where segment is 100%
              if (segment.percentage >= 99.99) {
                return donut ? (
                  <G key={index}>
                    <Circle cx={center} cy={center} r={outerRadius} fill={segment.color} />
                    <Circle cx={center} cy={center} r={innerRadius} fill={theme.colors.palette.sand100} />
                  </G>
                ) : (
                  <Circle key={index} cx={center} cy={center} r={outerRadius} fill={segment.color} />
                )
              }

              // Skip segments with 0 value
              if (segment.percentage <= 0) return null

              return (
                <Path
                  key={index}
                  d={createArcPath(segment.startAngle, segment.endAngle)}
                  fill={segment.color}
                />
              )
            })}
          </G>
        </Svg>

        {/* Donut center content */}
        {donut && (centerLabel || centerValue) && (
          <View style={themed($donutCenterContent)}>
            {centerLabel && (
              <Text text={centerLabel} size="xs" style={themed($centerLabel)} />
            )}
            {centerValue && (
              <Text text={centerValue} size="lg" weight="bold" style={themed($centerValue)} />
            )}
          </View>
        )}
      </View>

      {/* Legend */}
      {showLegend && (
        <View style={themed($pieLegendContainer)}>
          {segments.map((segment, index) => (
            <View key={index} style={themed($pieLegendItem)}>
              <View style={[themed($legendDot), { backgroundColor: segment.color }]} />
              <View style={themed($pieLegendText)}>
                <Text text={segment.label} size="xs" numberOfLines={1} />
                {showValues && (
                  <Text
                    text={`${segment.percentage.toFixed(1)}%`}
                    size="xs"
                    style={themed($legendPercentage)}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

// =============================================================================
// SHARED HELPERS
// =============================================================================

function renderLegend(
  data: ChartDataPoint[],
  getColor: (index: number, color?: string) => string,
  themed: <T>(style: ThemedStyle<T>) => T
) {
  return (
    <View style={themed($legendContainer)}>
      {data.map((item, index) => (
        <View key={index} style={themed($legendItem)}>
          <View style={[themed($legendDot), { backgroundColor: getColor(index, item.color) }]} />
          <Text text={item.label} size="xs" style={themed($legendText)} numberOfLines={1} />
        </View>
      ))}
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

// Shared
const $legendContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: spacing.sm,
  marginTop: spacing.md,
})

const $legendItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $legendDot: ThemedStyle<ViewStyle> = () => ({
  width: 8,
  height: 8,
  borderRadius: 4,
})

const $legendText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
})

// Bar Chart - Vertical
const $verticalChartContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
})

const $yAxisLabels: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingRight: spacing.xs,
  paddingVertical: spacing.xxs,
})

const $axisLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $verticalBarsContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-end",
  borderLeftWidth: 1,
  borderBottomWidth: 1,
  borderColor: colors.palette.sand300,
  paddingTop: spacing.sm,
})

const $verticalBarColumn: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginHorizontal: spacing.xxs,
})

const $verticalBarWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  width: "100%",
  justifyContent: "flex-end",
})

const $verticalBar: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  minHeight: 4,
  alignItems: "center",
  justifyContent: "flex-end",
  paddingBottom: 2,
})

const $barValueInside: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontWeight: "600",
})

const $verticalLabel: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.sand600,
  marginTop: spacing.xxs,
  textAlign: "center",
})

// Bar Chart - Horizontal
const $horizontalBarsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $horizontalBarRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $horizontalLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  width: 60,
  color: colors.palette.sand700,
})

const $horizontalBarTrack: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  height: 24,
  backgroundColor: colors.palette.sand200,
  borderRadius: 4,
  overflow: "hidden",
})

const $horizontalBar: ThemedStyle<ViewStyle> = () => ({
  height: "100%",
  minWidth: 4,
})

const $horizontalValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  width: 40,
  color: colors.palette.sand700,
  textAlign: "right",
})

// Line Chart
const $lineChartContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
})

const $lineChartArea: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  borderLeftWidth: 1,
  borderBottomWidth: 1,
  borderColor: colors.palette.sand300,
})

const $gridLines: ThemedStyle<ViewStyle> = () => ({
  ...StyleSheet.absoluteFillObject,
  justifyContent: "space-between",
  paddingVertical: 10,
})

const $gridLine: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: 1,
  backgroundColor: colors.palette.sand200,
})

const $dataPointsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  flexDirection: "row",
  paddingHorizontal: spacing.sm,
  paddingBottom: 20,
})

const $dataPointColumn: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-end",
  position: "relative",
})

const $fillBar: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  bottom: 0,
  left: "25%",
  right: "25%",
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
})

const $dot: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  width: 10,
  height: 10,
  borderRadius: 5,
  borderWidth: 2,
  marginBottom: -5,
})

const $valueLabel: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
})

const $xAxisLabels: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
})

const $xLabelColumn: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignItems: "center",
})

const $xLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

// Pie Chart
const $pieChartWrapper: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

const $pieChartContainer: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
})

const $donutCenterContent: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
})

const $centerLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $centerValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand900,
})

const $pieLegendContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  gap: spacing.xs,
})

const $pieLegendItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $pieLegendText: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
})

const $legendPercentage: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})
