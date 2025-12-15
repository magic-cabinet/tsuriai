import { View, ViewStyle, TextStyle } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface PriceDriver {
  name: string
  nameJapanese?: string
  category: "fuel" | "feed" | "shipping" | "weather" | "supply" | "demand" | "currency" | "other"
  currentValue: number
  unit: string
  change: number // percentage change
  impact: "high" | "medium" | "low"
  affectedSpecies?: string[] // which fish are affected
  source?: string // data source
  lastUpdated?: Date
}

export interface PriceDriversPanelProps {
  /**
   * List of price drivers
   */
  drivers: PriceDriver[]
  /**
   * Whether to show in compact mode
   */
  compact?: boolean
  /**
   * Filter to specific species
   */
  filterSpecies?: string
}

const CATEGORY_CONFIG: Record<PriceDriver["category"], { icon: string; color: string; label: string }> = {
  fuel: { icon: "components", color: "sunset", label: "FUEL" },
  feed: { icon: "components", color: "kelp", label: "FEED" },
  shipping: { icon: "components", color: "ocean", label: "SHIP" },
  weather: { icon: "components", color: "seafoam", label: "WX" },
  supply: { icon: "components", color: "seafoam", label: "SUP" },
  demand: { icon: "components", color: "coral", label: "DEM" },
  currency: { icon: "components", color: "sunset", label: "FX" },
  other: { icon: "components", color: "sand", label: "OTH" },
}

/**
 * PriceDriversPanel - Shows linked commodities affecting fish prices
 *
 * Scraped data from external sources showing why prices move:
 * - Fuel costs
 * - Feed prices
 * - Shipping rates
 * - Weather conditions
 * - Currency fluctuations
 */
export function PriceDriversPanel(props: PriceDriversPanelProps) {
  const { drivers, compact = false, filterSpecies } = props
  const { themed, theme } = useAppTheme()

  const filteredDrivers = filterSpecies
    ? drivers.filter(d => !d.affectedSpecies || d.affectedSpecies.includes(filterSpecies))
    : drivers

  if (compact) {
    return (
      <View style={themed($compactContainer)}>
        <Text text="DRIVERS" size="xxs" weight="bold" style={themed($compactLabel)} />
        {filteredDrivers.slice(0, 5).map((driver, i) => (
          <CompactDriver key={i} driver={driver} />
        ))}
      </View>
    )
  }

  return (
    <View style={themed($container)}>
      <View style={themed($header)}>
        <Text text="価格要因 PRICE DRIVERS" weight="bold" style={themed($headerText)} />
        <Text text="Scraped live" size="xxs" style={themed($liveText)} />
      </View>
      <View style={themed($driversList)}>
        {filteredDrivers.map((driver, i) => (
          <DriverRow key={i} driver={driver} />
        ))}
      </View>
    </View>
  )
}

function CompactDriver({ driver }: { driver: PriceDriver }) {
  const { themed, theme } = useAppTheme()
  const config = CATEGORY_CONFIG[driver.category]
  const isUp = driver.change > 0
  const isDown = driver.change < 0

  return (
    <View style={themed($compactDriver)}>
      <Text text={config.label} size="xxs" weight="bold" style={themed($compactCat)} />
      <Text
        text={isUp ? "▲" : isDown ? "▼" : "–"}
        size="xxs"
        style={{
          color: isUp
            ? theme.colors.palette.coral500
            : isDown
            ? theme.colors.palette.seafoam500
            : theme.colors.palette.sand500,
        }}
      />
    </View>
  )
}

function DriverRow({ driver }: { driver: PriceDriver }) {
  const { themed, theme } = useAppTheme()
  const config = CATEGORY_CONFIG[driver.category]
  const isUp = driver.change > 0
  const isDown = driver.change < 0
  const impactColor = driver.impact === "high" ? "coral" : driver.impact === "medium" ? "sunset" : "sand"

  return (
    <View style={themed($driverRow)}>
      {/* Category Badge */}
      <View style={[themed($categoryBadge), { backgroundColor: theme.colors.palette[`${config.color}100` as keyof typeof theme.colors.palette] }]}>
        <Text
          text={config.label}
          size="xxs"
          weight="bold"
          style={{ color: theme.colors.palette[`${config.color}500` as keyof typeof theme.colors.palette] }}
        />
      </View>

      {/* Name & Value */}
      <View style={themed($driverInfo)}>
        <View style={themed($driverNameRow)}>
          {driver.nameJapanese ? (
            <Text text={driver.nameJapanese} size="xs" weight="medium" style={themed($driverName)} numberOfLines={1} />
          ) : (
            <Text text={driver.name} size="xs" weight="medium" style={themed($driverName)} numberOfLines={1} />
          )}
          <Text text={driver.name} size="xxs" style={themed($driverNameEn)} numberOfLines={1} />
        </View>
        <Text
          text={`${driver.currentValue.toLocaleString()} ${driver.unit}`}
          size="xs"
          style={themed($driverValue)}
        />
      </View>

      {/* Change */}
      <View
        style={[
          themed($changeBadge),
          isUp && themed($changeBadgeUp),
          isDown && themed($changeBadgeDown),
        ]}
      >
        <Text
          text={isUp ? "▲" : isDown ? "▼" : "–"}
          size="xxs"
          style={{
            color: isUp
              ? theme.colors.palette.coral500
              : isDown
              ? theme.colors.palette.seafoam500
              : theme.colors.palette.sand500,
          }}
        />
        <Text
          text={`${driver.change > 0 ? "+" : ""}${driver.change.toFixed(1)}%`}
          size="xxs"
          weight="bold"
          style={[
            themed($changeText),
            isUp && { color: theme.colors.palette.coral500 },
            isDown && { color: theme.colors.palette.seafoam500 },
          ]}
        />
      </View>

      {/* Impact */}
      <View style={[themed($impactDot), { backgroundColor: theme.colors.palette[`${impactColor}400` as keyof typeof theme.colors.palette] }]} />
    </View>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.sand100,
  borderRadius: spacing.sm,
  borderWidth: 2,
  borderColor: colors.palette.sunset500,
  overflow: "hidden",
})

const $compactContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.sand800,
  paddingVertical: spacing.xxxs,
  paddingHorizontal: spacing.xs,
  gap: spacing.xs,
})

const $compactLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sunset400,
  letterSpacing: 1,
})

const $compactDriver: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxxs,
})

const $compactCat: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand400,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.palette.sunset500,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.sm,
})

const $headerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand100,
  fontSize: 12,
  letterSpacing: 1,
})

const $liveText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand200,
})

const $driversList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
  gap: spacing.xxs,
})

const $driverRow: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  paddingVertical: spacing.xxs,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.sand200,
})

const $categoryBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 32,
  paddingVertical: spacing.xxxs,
  alignItems: "center",
  borderRadius: 3,
})

const $driverInfo: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $driverNameRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "baseline",
  gap: spacing.xxs,
})

const $driverName: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $driverNameEn: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $driverValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $changeBadge: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxxs,
  paddingHorizontal: spacing.xxs,
  paddingVertical: spacing.xxxs,
  borderRadius: 4,
  backgroundColor: colors.palette.sand200,
})

const $changeBadgeUp: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.coral100,
})

const $changeBadgeDown: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.seafoam100,
})

const $changeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand600,
})

const $impactDot: ThemedStyle<ViewStyle> = () => ({
  width: 8,
  height: 8,
  borderRadius: 4,
})
