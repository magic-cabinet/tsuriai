import { View, StyleSheet } from "react-native"
import type { Meta, StoryObj } from "@storybook/react-native"

import { PhotoUploader } from "./PhotoUploader"
import { colors } from "@/theme/colors"

const styles = StyleSheet.create({
  decorator: {
    backgroundColor: colors.palette.sand100,
    flex: 1,
    padding: 16,
  },
})

const meta = {
  title: "Domain/PhotoUploader",
  component: PhotoUploader,
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  args: {
    photos: [],
  },
} satisfies Meta<typeof PhotoUploader>

export default meta

type Story = StoryObj<typeof meta>

const samplePhotos = [
  { id: "1", uri: "https://picsum.photos/200/200?random=1" },
  { id: "2", uri: "https://picsum.photos/200/200?random=2" },
  { id: "3", uri: "https://picsum.photos/200/200?random=3" },
]

export const Default: Story = {
  args: {
    photos: [],
    label: "Fish Photos",
    helperText: "Add photos of the fish for quality verification",
    onAddPhoto: () => console.log("Add photo"),
    onRemovePhoto: (id) => console.log("Remove photo:", id),
  },
}

export const WithPhotos: Story = {
  name: "With Photos",
  args: {
    photos: samplePhotos,
    label: "Fish Photos",
    onAddPhoto: () => console.log("Add photo"),
    onRemovePhoto: (id) => console.log("Remove photo:", id),
    onPhotoPress: (photo) => console.log("Photo pressed:", photo.id),
  },
}

export const MaxPhotosReached: Story = {
  name: "Max Photos Reached",
  args: {
    photos: [
      ...samplePhotos,
      { id: "4", uri: "https://picsum.photos/200/200?random=4" },
      { id: "5", uri: "https://picsum.photos/200/200?random=5" },
    ],
    maxPhotos: 5,
    label: "Fish Photos",
    onRemovePhoto: (id) => console.log("Remove photo:", id),
  },
}

export const Uploading: Story = {
  args: {
    photos: [
      { id: "1", uri: "https://picsum.photos/200/200?random=1" },
      { id: "2", uri: "https://picsum.photos/200/200?random=2", uploadProgress: 65 },
    ],
    uploading: true,
    label: "Fish Photos",
  },
}

export const WithError: Story = {
  name: "With Error",
  args: {
    photos: [
      { id: "1", uri: "https://picsum.photos/200/200?random=1" },
      { id: "2", uri: "https://picsum.photos/200/200?random=2", error: "Upload failed" },
    ],
    label: "Fish Photos",
    error: "One or more photos failed to upload",
    onAddPhoto: () => console.log("Add photo"),
    onRemovePhoto: (id) => console.log("Remove photo:", id),
  },
}

export const Disabled: Story = {
  args: {
    photos: samplePhotos.slice(0, 2),
    label: "Fish Photos",
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    photos: [],
    label: "Fish Photos",
    required: true,
    helperText: "At least one photo is required",
    onAddPhoto: () => console.log("Add photo"),
  },
}
