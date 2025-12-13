/**
 * Typography configuration for Tsuriai fish marketplace.
 * Uses Noto Sans JP for Japanese text (traditional market feel)
 * and Inter for Latin characters.
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
import {
  NotoSansJP_100Thin as notoSansJPThin,
  NotoSansJP_300Light as notoSansJPLight,
  NotoSansJP_400Regular as notoSansJPRegular,
  NotoSansJP_500Medium as notoSansJPMedium,
  NotoSansJP_700Bold as notoSansJPBold,
  NotoSansJP_900Black as notoSansJPBlack,
} from "@expo-google-fonts/noto-sans-jp"

export const customFontsToLoad = {
  // Inter fonts (primary for Latin text)
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
  // Noto Sans JP (Japanese text - traditional market feel)
  notoSansJPThin,
  notoSansJPLight,
  notoSansJPRegular,
  notoSansJPMedium,
  notoSansJPBold,
  notoSansJPBlack,
}

const fonts = {
  inter: {
    // Cross-platform Google font - Primary font for Latin text.
    light: "interLight",
    normal: "interRegular",
    medium: "interMedium",
    semiBold: "interSemiBold",
    bold: "interBold",
    extraBold: "interExtraBold",
  },
  notoSansJP: {
    // Cross-platform Google font - Japanese text (MS Gothic alternative).
    // Traditional Japanese market aesthetic.
    thin: "notoSansJPThin",
    light: "notoSansJPLight",
    normal: "notoSansJPRegular",
    medium: "notoSansJPMedium",
    bold: "notoSansJPBold",
    black: "notoSansJPBlack",
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
   * Inter - Clean, modern sans-serif for Latin text.
   */
  primary: fonts.inter,
  /**
   * Japanese font for 日本語 text.
   * Noto Sans JP - Traditional market feel (MS Gothic alternative).
   * Use for: prices, fish names, auction labels, grades.
   */
  japanese: fonts.notoSansJP,
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
