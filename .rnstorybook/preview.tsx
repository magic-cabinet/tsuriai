import type { Preview } from "@storybook/react-native"
import { createContext, useCallback, useMemo } from "react"
import { StyleProp, View } from "react-native"
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
} from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { initI18n } from "../app/i18n"
import { ThemeContext, ThemeContextType } from "../app/theme/context"
import { lightTheme } from "../app/theme/theme"
import type { AllowedStylesT, Theme, ThemedStyle } from "../app/theme/types"

// Initialize i18n for stories
initI18n()

/**
 * Storybook-specific ThemeProvider that doesn't require MMKV storage
 */
function StorybookThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = lightTheme
  const themeContext = "light" as const

  const themed = useCallback(
    <T,>(styleOrStyleFn: AllowedStylesT<T>) => {
      const flatStyles = [styleOrStyleFn].flat(3) as (ThemedStyle<T> | StyleProp<T>)[]
      const stylesArray = flatStyles.map((f) => {
        if (typeof f === "function") {
          return (f as ThemedStyle<T>)(theme)
        } else {
          return f
        }
      })
      return Object.assign({}, ...stylesArray) as T
    },
    [theme],
  )

  const value: ThemeContextType = useMemo(
    () => ({
      navigationTheme: NavDefaultTheme,
      theme,
      themeContext,
      setThemeContextOverride: () => {}, // No-op for Storybook
      themed,
    }),
    [theme, themed],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <StorybookThemeProvider>
          <View style={{ flex: 1, padding: 16, backgroundColor: "#f8fafc" }}>
            <Story />
          </View>
        </StorybookThemeProvider>
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
