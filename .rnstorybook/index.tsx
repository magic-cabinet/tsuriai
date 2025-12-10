import { view } from "./storybook.requires"

// Simple in-memory storage for Storybook state persistence
const storybookStorage: Record<string, string> = {}

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: (key: string) => Promise.resolve(storybookStorage[key] ?? null),
    setItem: (key: string, value: string) => {
      storybookStorage[key] = value
      return Promise.resolve()
    },
  },
})

export default StorybookUIRoot
