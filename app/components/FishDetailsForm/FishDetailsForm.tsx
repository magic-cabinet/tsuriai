import { useState } from "react"
import { Pressable, ScrollView, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "../Text"
import { TextField } from "../TextField"
import { Button } from "../Button"
import { Card } from "../Card"
import { Badge } from "../Badge"
import { Switch } from "../Toggle/Switch"

type FishGrade = "A" | "B" | "C" | "premium" | "standard"
type FishFreshness = "live" | "fresh" | "frozen" | "processed"

export interface FishFormData {
  species: string
  japaneseName?: string
  weight: number
  grade: FishGrade
  freshness: FishFreshness
  pricePerKg?: number
  origin?: string
  catchDate?: Date
  notes?: string
  sustainabilityCertified?: boolean
}

export interface FishDetailsFormProps {
  /**
   * Initial form data (for editing)
   */
  initialData?: Partial<FishFormData>
  /**
   * Whether the form is in edit mode
   */
  isEditing?: boolean
  /**
   * Whether the form is submitting
   */
  loading?: boolean
  /**
   * Callback when form is submitted
   */
  onSubmit: (data: FishFormData) => void
  /**
   * Callback when form is cancelled
   */
  onCancel?: () => void
  /**
   * Currency code for price
   * @default "USD"
   */
  currency?: string
  /**
   * Style override for container
   */
  style?: StyleProp<ViewStyle>
}

const GRADE_OPTIONS: { value: FishGrade; label: string }[] = [
  { value: "premium", label: "Premium" },
  { value: "A", label: "Grade A" },
  { value: "B", label: "Grade B" },
  { value: "C", label: "Grade C" },
  { value: "standard", label: "Standard" },
]

const FRESHNESS_OPTIONS: { value: FishFreshness; label: string }[] = [
  { value: "live", label: "Live" },
  { value: "fresh", label: "Fresh" },
  { value: "frozen", label: "Frozen" },
  { value: "processed", label: "Processed" },
]

/**
 * FishDetailsForm component for entering or editing fish information.
 *
 * @param {FishDetailsFormProps} props - The props for the `FishDetailsForm` component.
 * @returns {JSX.Element} The rendered `FishDetailsForm` component.
 *
 * @example
 * <FishDetailsForm
 *   onSubmit={(data) => saveFish(data)}
 *   onCancel={() => goBack()}
 * />
 */
export function FishDetailsForm(props: FishDetailsFormProps) {
  const {
    initialData,
    isEditing = false,
    loading = false,
    onSubmit,
    onCancel,
    currency = "USD",
    style: $styleOverride,
  } = props

  const { themed, theme } = useAppTheme()

  const [formData, setFormData] = useState<Partial<FishFormData>>({
    species: "",
    weight: 0,
    grade: "A",
    freshness: "fresh",
    sustainabilityCertified: false,
    ...initialData,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FishFormData, string>>>({})

  const updateField = <K extends keyof FishFormData>(field: K, value: FishFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FishFormData, string>> = {}

    if (!formData.species?.trim()) {
      newErrors.species = "Species is required"
    }

    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = "Weight must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    onSubmit({
      species: formData.species!,
      japaneseName: formData.japaneseName,
      weight: formData.weight!,
      grade: formData.grade!,
      freshness: formData.freshness!,
      pricePerKg: formData.pricePerKg,
      origin: formData.origin,
      catchDate: formData.catchDate,
      notes: formData.notes,
      sustainabilityCertified: formData.sustainabilityCertified,
    })
  }

  return (
    <ScrollView style={$styleOverride} contentContainerStyle={themed($container)}>
      <Card>
        <View style={themed($content)}>
          {/* Section: Basic Info */}
          <View style={themed($section)}>
            <Text text="Basic Information" preset="subheading" style={themed($sectionTitle)} />

            <TextField
              label="Species *"
              placeholder="e.g., Bluefin Tuna"
              value={formData.species}
              onChangeText={(v) => updateField("species", v)}
              status={errors.species ? "error" : undefined}
              helper={errors.species}
            />

            <TextField
              label="Japanese Name"
              placeholder="e.g., クロマグロ"
              value={formData.japaneseName}
              onChangeText={(v) => updateField("japaneseName", v)}
            />

            <TextField
              label="Weight (kg) *"
              placeholder="0.0"
              keyboardType="numeric"
              value={formData.weight?.toString() || ""}
              onChangeText={(v) => updateField("weight", parseFloat(v) || 0)}
              status={errors.weight ? "error" : undefined}
              helper={errors.weight}
            />
          </View>

          {/* Section: Quality */}
          <View style={themed($section)}>
            <Text text="Quality" preset="subheading" style={themed($sectionTitle)} />

            <View style={themed($fieldGroup)}>
              <Text text="Grade" size="sm" style={themed($fieldLabel)} />
              <View style={themed($optionsRow)}>
                {GRADE_OPTIONS.map((option) => (
                  <Pressable key={option.value} onPress={() => updateField("grade", option.value)}>
                    <Badge
                      text={option.label}
                      status={formData.grade === option.value ? "success" : "neutral"}
                      badgeStyle={formData.grade === option.value ? "solid" : "outline"}
                    />
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={themed($fieldGroup)}>
              <Text text="Freshness" size="sm" style={themed($fieldLabel)} />
              <View style={themed($optionsRow)}>
                {FRESHNESS_OPTIONS.map((option) => (
                  <Pressable key={option.value} onPress={() => updateField("freshness", option.value)}>
                    <Badge
                      text={option.label}
                      status={formData.freshness === option.value ? "info" : "neutral"}
                      badgeStyle={formData.freshness === option.value ? "solid" : "outline"}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Section: Pricing & Origin */}
          <View style={themed($section)}>
            <Text text="Pricing & Origin" preset="subheading" style={themed($sectionTitle)} />

            <TextField
              label={`Price per kg (${currency})`}
              placeholder="0"
              keyboardType="numeric"
              value={formData.pricePerKg?.toString() || ""}
              onChangeText={(v) => updateField("pricePerKg", parseFloat(v) || undefined)}
            />

            <TextField
              label="Origin / Catch Location"
              placeholder="e.g., Tsukiji, Tokyo"
              value={formData.origin}
              onChangeText={(v) => updateField("origin", v)}
            />
          </View>

          {/* Section: Additional Info */}
          <View style={themed($section)}>
            <Text text="Additional Information" preset="subheading" style={themed($sectionTitle)} />

            <TextField
              label="Notes"
              placeholder="Any additional notes..."
              value={formData.notes}
              onChangeText={(v) => updateField("notes", v)}
              multiline
              numberOfLines={3}
            />

            <View style={themed($toggleRow)}>
              <View style={themed($toggleInfo)}>
                <Text text="Sustainability Certified" size="sm" weight="medium" />
                <Text text="This fish is certified sustainable" size="xs" style={themed($toggleDescription)} />
              </View>
              <Switch
                value={formData.sustainabilityCertified}
                onValueChange={(v) => updateField("sustainabilityCertified", v)}
              />
            </View>
          </View>

          {/* Actions */}
          <View style={themed($actions)}>
            {onCancel && (
              <Button
                text="Cancel"
                preset="default"
                onPress={onCancel}
                disabled={loading}
                style={themed($cancelButton)}
              />
            )}
            <Button
              text={loading ? "Saving..." : isEditing ? "Update Fish" : "Add Fish"}
              preset="reversed"
              onPress={handleSubmit}
              disabled={loading}
              style={themed($submitButton)}
            />
          </View>
        </View>
      </Card>
    </ScrollView>
  )
}

// =============================================================================
// STYLES
// =============================================================================

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
})

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.lg,
})

const $section: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  gap: spacing.md,
  paddingBottom: spacing.lg,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.sand300,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand800,
})

const $fieldGroup: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xs,
})

const $fieldLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand700,
})

const $optionsRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.xs,
})

const $toggleRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: spacing.sm,
})

const $toggleInfo: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $toggleDescription: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.sand500,
})

const $actions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
  marginTop: spacing.md,
})

const $cancelButton: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $submitButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 2,
  backgroundColor: colors.palette.ocean500,
})
