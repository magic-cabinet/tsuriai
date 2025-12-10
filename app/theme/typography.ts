/**
 * Typography configuration using Inter font family.
 * Based on the BeyondAlpha design system from Figma.
 */

import { Platform } from "react-native"
import {
  Inter_300Light as interLight,
  Inter_400Regular as interRegular,
  Inter_500Medium as interMedium,
  Inter_600SemiBold as interSemiBold,
  Inter_700Bold as interBold,
  Inter_800ExtraBold as interExtraBold,
} from "@expo-google-fonts/inter"
import {
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
  SpaceGrotesk_700Bold as spaceGroteskBold,
} from "@expo-google-fonts/space-grotesk"

export const customFontsToLoad = {
  // Inter fonts (primary)
  interLight,
  interRegular,
  interMedium,
  interSemiBold,
  interBold,
  interExtraBold,
  // Space Grotesk fonts (secondary/display)
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
}

const fonts = {
  inter: {
    // Cross-platform Google font - Primary font from Figma design system.
    light: "interLight",
    normal: "interRegular",
    medium: "interMedium",
    semiBold: "interSemiBold",
    bold: "interBold",
    extraBold: "interExtraBold",
  },
  spaceGrotesk: {
    // Cross-platform Google font - Secondary/display font.
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  menlo: {
    // iOS only font - For inline code.
    normal: "Menlo",
    bold: "Menlo-Bold",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   * Inter - Clean, modern sans-serif from the BeyondAlpha design system.
   */
  primary: fonts.inter,
  /**
   * An alternate font used for perhaps titles and stuff.
   * Space Grotesk - Geometric display font for headings.
   */
  secondary: fonts.spaceGrotesk,
  /**
   * Lets get fancy with a monospace font!
   * Menlo on iOS, monospace on Android.
   */
  code: Platform.select({ ios: fonts.menlo, android: fonts.monospace }),
}
