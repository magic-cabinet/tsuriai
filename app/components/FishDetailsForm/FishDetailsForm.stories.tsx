import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { FishDetailsForm } from "./FishDetailsForm"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand200,
    flex: 1,
  },
})

const meta = {
  title: "Fish/FishDetailsForm",
  component: FishDetailsForm,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    onSubmit: (data) => console.log("Form submitted:", data),
  },
} satisfies Meta<typeof FishDetailsForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log("Form submitted:", data),
    onCancel: () => console.log("Cancelled"),
  },
}

export const Editing: Story = {
  name: "Edit Mode",
  args: {
    isEditing: true,
    initialData: {
      species: "Bluefin Tuna",
      japaneseName: "クロマグロ",
      weight: 45.5,
      grade: "A",
      freshness: "fresh",
      pricePerKg: 150,
      origin: "Tsukiji, Tokyo",
      sustainabilityCertified: true,
      notes: "Premium quality, caught this morning",
    },
    onSubmit: (data) => console.log("Form submitted:", data),
    onCancel: () => console.log("Cancelled"),
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    initialData: {
      species: "Salmon",
      weight: 12,
      grade: "premium",
      freshness: "fresh",
    },
    onSubmit: (data) => console.log("Form submitted:", data),
  },
}

export const WithPrefill: Story = {
  name: "With Prefilled Data",
  args: {
    initialData: {
      species: "Yellowtail",
      grade: "B",
      freshness: "frozen",
    },
    onSubmit: (data) => console.log("Form submitted:", data),
    onCancel: () => console.log("Cancelled"),
  },
}

export const JapaneseYen: Story = {
  name: "Japanese Yen Currency",
  args: {
    currency: "JPY",
    initialData: {
      species: "Swordfish",
      weight: 8.2,
      grade: "A",
      freshness: "fresh",
      pricePerKg: 15000,
    },
    onSubmit: (data) => console.log("Form submitted:", data),
    onCancel: () => console.log("Cancelled"),
  },
}
