import { StyleSheet, View } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { Icon, iconRegistry, IconTypes, PressableIcon } from "./Icon"
import { Text } from "./Text"
import { colors } from "../theme/colors"

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  colorRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
  decorator: {
    backgroundColor: colors.palette.neutral100,
    padding: 20,
  },
  galleryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  galleryItem: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 12,
    gap: 8,
    minWidth: 80,
    padding: 16,
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: colors.palette.neutral200,
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  iconButtonFilled: {
    backgroundColor: colors.palette.primary400,
  },
  iconLabel: {
    color: colors.palette.neutral600,
  },
  pressableRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  sectionTitle: {
    color: colors.palette.neutral900,
    marginBottom: 16,
  },
  showcaseContainer: {
    gap: 32,
  },
  sizeRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 24,
  },
  usageCard: {
    backgroundColor: colors.palette.neutral200,
    borderRadius: 16,
    gap: 16,
    padding: 20,
  },
  usageExample: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  usageLabel: {
    color: colors.palette.neutral600,
  },
})

// Get all icon names from the registry
const iconNames = Object.keys(iconRegistry) as IconTypes[]

/**
 * Icon Stories
 *
 * Icon system for the Beyond Equity investment platform.
 * Includes all available icons, sizes, colors, and usage examples.
 */
const meta = {
  title: "Core/Icon",
  component: Icon,
  argTypes: {
    icon: {
      control: "select",
      options: iconNames,
      description: "Icon name from registry",
    },
    size: {
      control: "number",
      description: "Icon size in pixels",
    },
    color: {
      control: "color",
      description: "Icon tint color",
    },
  },
  args: {
    icon: "check",
    size: 24,
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

// =============================================================================
// BASIC VARIANTS
// =============================================================================

export const Default: Story = {
  args: {
    icon: "check",
    size: 24,
  },
}

export const CustomSize: Story = {
  args: {
    icon: "heart",
    size: 48,
  },
}

export const CustomColor: Story = {
  args: {
    icon: "heart",
    size: 32,
    color: colors.palette.badgeCoral,
  },
}

// =============================================================================
// SIZE VARIATIONS
// =============================================================================

export const Sizes: Story = {
  name: "Size Variations",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text preset="subheading" text="Icon Sizes" style={styles.sectionTitle} />
      <View style={styles.sizeRow}>
        <View style={styles.galleryItem}>
          <Icon icon="check" size={16} />
          <Text size="xxs" text="16px" style={styles.iconLabel} />
        </View>
        <View style={styles.galleryItem}>
          <Icon icon="check" size={20} />
          <Text size="xxs" text="20px" style={styles.iconLabel} />
        </View>
        <View style={styles.galleryItem}>
          <Icon icon="check" size={24} />
          <Text size="xxs" text="24px" style={styles.iconLabel} />
        </View>
        <View style={styles.galleryItem}>
          <Icon icon="check" size={32} />
          <Text size="xxs" text="32px" style={styles.iconLabel} />
        </View>
        <View style={styles.galleryItem}>
          <Icon icon="check" size={48} />
          <Text size="xxs" text="48px" style={styles.iconLabel} />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// COLOR VARIATIONS
// =============================================================================

export const Colors: Story = {
  name: "Color Variations",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text preset="subheading" text="Icon Colors" style={styles.sectionTitle} />
      <View style={styles.colorRow}>
        <View style={styles.galleryItem}>
          <Icon icon="heart" size={28} color={colors.palette.neutral900} />
          <Text size="xxs" text="Default" style={styles.iconLabel} />
        </View>
        <View style={styles.galleryItem}>
          <Icon icon="heart" size={28} color={colors.palette.primary400} />
          <Text size="xxs" text="Primary" style={styles.iconLabel} />
        </View>
        <View style={styles.galleryItem}>
          <Icon icon="heart" size={28} color={colors.palette.badgeMint} />
          <Text size="xxs" text="Success" style={styles.iconLabel} />
        </View>
        <View style={styles.galleryItem}>
          <Icon icon="heart" size={28} color={colors.palette.badgeCoral} />
          <Text size="xxs" text="Error" style={styles.iconLabel} />
        </View>
        <View style={styles.galleryItem}>
          <Icon icon="heart" size={28} color={colors.palette.neutral500} />
          <Text size="xxs" text="Muted" style={styles.iconLabel} />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// PRESSABLE ICONS
// =============================================================================

export const PressableDefault: Story = {
  name: "Pressable: Default",
  render: () => (
    <PressableIcon icon="heart" size={24} onPress={() => console.log("Heart pressed")} />
  ),
}

export const PressableButtons: Story = {
  name: "Pressable: Button Styles",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text preset="subheading" text="Icon Buttons" style={styles.sectionTitle} />
      <View style={styles.pressableRow}>
        <PressableIcon
          icon="heart"
          size={24}
          containerStyle={styles.iconButton}
          onPress={() => console.log("Heart")}
        />
        <PressableIcon
          icon="bell"
          size={24}
          containerStyle={styles.iconButton}
          onPress={() => console.log("Bell")}
        />
        <PressableIcon
          icon="settings"
          size={24}
          containerStyle={styles.iconButton}
          onPress={() => console.log("Settings")}
        />
        <PressableIcon
          icon="more"
          size={24}
          containerStyle={styles.iconButton}
          onPress={() => console.log("More")}
        />
        <PressableIcon
          icon="check"
          size={24}
          color={colors.palette.neutral100}
          containerStyle={[styles.iconButton, styles.iconButtonFilled]}
          onPress={() => console.log("Check")}
        />
      </View>
    </View>
  ),
}

// =============================================================================
// ICON GALLERY
// =============================================================================

export const Gallery: Story = {
  name: "All Icons",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text preset="subheading" text="Icon Gallery" style={styles.sectionTitle} />
      <View style={styles.galleryGrid}>
        {iconNames.map((iconName) => (
          <View key={iconName} style={styles.galleryItem}>
            <Icon icon={iconName} size={24} />
            <Text size="xxs" text={iconName} style={styles.iconLabel} />
          </View>
        ))}
      </View>
    </View>
  ),
}

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

export const UsageExamples: Story = {
  name: "Usage in Context",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text preset="subheading" text="Common Usage Patterns" style={styles.sectionTitle} />

      <View style={styles.usageCard}>
        <Text weight="semiBold" text="Navigation" />
        <View style={styles.usageExample}>
          <Icon icon="back" size={24} />
          <Text size="sm" text="back - Go back" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="menu" size={24} />
          <Text size="sm" text="menu - Open drawer" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="x" size={24} />
          <Text size="sm" text="x - Close/dismiss" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="caretRight" size={24} />
          <Text size="sm" text="caretRight - Navigate forward" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="caretLeft" size={24} />
          <Text size="sm" text="caretLeft - Navigate back" style={styles.usageLabel} />
        </View>
      </View>

      <View style={styles.usageCard}>
        <Text weight="semiBold" text="Actions" />
        <View style={styles.usageExample}>
          <Icon icon="heart" size={24} />
          <Text size="sm" text="heart - Add to watchlist" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="check" size={24} />
          <Text size="sm" text="check - Confirm/success" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="more" size={24} />
          <Text size="sm" text="more - More options" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="view" size={24} />
          <Text size="sm" text="view - Search/view" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="hidden" size={24} />
          <Text size="sm" text="hidden - Hide content" style={styles.usageLabel} />
        </View>
      </View>

      <View style={styles.usageCard}>
        <Text weight="semiBold" text="System" />
        <View style={styles.usageExample}>
          <Icon icon="bell" size={24} />
          <Text size="sm" text="bell - Notifications" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="settings" size={24} />
          <Text size="sm" text="settings - Settings" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="lock" size={24} />
          <Text size="sm" text="lock - Security/locked" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="ladybug" size={24} />
          <Text size="sm" text="ladybug - Debug" style={styles.usageLabel} />
        </View>
      </View>

      <View style={styles.usageCard}>
        <Text weight="semiBold" text="Content" />
        <View style={styles.usageExample}>
          <Icon icon="community" size={24} />
          <Text size="sm" text="community - Users/community" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="components" size={24} />
          <Text size="sm" text="components - Assets/items" style={styles.usageLabel} />
        </View>
        <View style={styles.usageExample}>
          <Icon icon="pin" size={24} />
          <Text size="sm" text="pin - Location/pinned" style={styles.usageLabel} />
        </View>
      </View>
    </View>
  ),
}

// =============================================================================
// TRADING-SPECIFIC ICONS
// =============================================================================

export const TradingIcons: Story = {
  name: "Trading Context",
  render: () => (
    <View style={styles.showcaseContainer}>
      <Text preset="subheading" text="Icons in Trading Context" style={styles.sectionTitle} />

      <View style={styles.usageCard}>
        <Text weight="semiBold" text="Buy/Sell Actions" />
        <View style={styles.pressableRow}>
          <View style={styles.galleryItem}>
            <Icon icon="caretRight" size={24} color={colors.palette.badgeMint} />
            <Text size="xxs" text="Buy" style={styles.iconLabel} />
          </View>
          <View style={styles.galleryItem}>
            <Icon icon="caretLeft" size={24} color={colors.palette.badgeCoral} />
            <Text size="xxs" text="Sell" style={styles.iconLabel} />
          </View>
          <View style={styles.galleryItem}>
            <Icon icon="heart" size={24} color={colors.palette.primary400} />
            <Text size="xxs" text="Watch" style={styles.iconLabel} />
          </View>
          <View style={styles.galleryItem}>
            <Icon icon="bell" size={24} color={colors.palette.neutral700} />
            <Text size="xxs" text="Alert" style={styles.iconLabel} />
          </View>
        </View>
      </View>

      <View style={styles.usageCard}>
        <Text weight="semiBold" text="Account Actions" />
        <View style={styles.pressableRow}>
          <View style={styles.galleryItem}>
            <Icon icon="components" size={24} />
            <Text size="xxs" text="Portfolio" style={styles.iconLabel} />
          </View>
          <View style={styles.galleryItem}>
            <Icon icon="community" size={24} />
            <Text size="xxs" text="Profile" style={styles.iconLabel} />
          </View>
          <View style={styles.galleryItem}>
            <Icon icon="lock" size={24} />
            <Text size="xxs" text="Security" style={styles.iconLabel} />
          </View>
          <View style={styles.galleryItem}>
            <Icon icon="settings" size={24} />
            <Text size="xxs" text="Settings" style={styles.iconLabel} />
          </View>
        </View>
      </View>

      <View style={styles.usageCard}>
        <Text weight="semiBold" text="Status Indicators" />
        <View style={styles.pressableRow}>
          <View style={styles.galleryItem}>
            <Icon icon="check" size={24} color={colors.palette.badgeMint} />
            <Text size="xxs" text="Filled" style={styles.iconLabel} />
          </View>
          <View style={styles.galleryItem}>
            <Icon icon="x" size={24} color={colors.palette.badgeCoral} />
            <Text size="xxs" text="Cancelled" style={styles.iconLabel} />
          </View>
          <View style={styles.galleryItem}>
            <Icon icon="more" size={24} color={colors.palette.accent500} />
            <Text size="xxs" text="Pending" style={styles.iconLabel} />
          </View>
        </View>
      </View>
    </View>
  ),
}
