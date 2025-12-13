/**
 * Seaside Color Palette for tsuriai fishing app.
 * Evokes the feeling of being at the beach, getting a good deal on fresh catch.
 * Ocean blues for trust, sandy neutrals for warmth, seafoam for success.
 */
const palette = {
  // Ocean Blues - Primary brand colors (trust, depth, the sea)
  ocean100: "#E0F2FE", // morning sky
  ocean200: "#BAE6FD", // shallow water
  ocean300: "#7DD3FC", // bright sea
  ocean400: "#38BDF8", // clear water
  ocean500: "#0EA5E9", // deep ocean - main brand
  ocean600: "#0284C7", // deep sea

  // Sandy Neutrals - Backgrounds and text (beach warmth)
  sand100: "#FEFDFB", // white sand
  sand200: "#FAF8F5", // beach
  sand300: "#F5F0E8", // dry sand
  sand400: "#E8DFD0", // wet sand
  sand500: "#A89F91", // driftwood
  sand600: "#78716C", // rocks
  sand700: "#57534E", // dark rock
  sand800: "#292524", // night shore
  sand900: "#1C1917", // deep night

  // Seafoam - Success, good deals, fresh catch
  seafoam100: "#CCFBF1",
  seafoam200: "#99F6E4",
  seafoam300: "#5EEAD4", // main success
  seafoam400: "#2DD4BF",
  seafoam500: "#14B8A6",

  // Coral - Alerts, hot deals, urgency
  coral100: "#FFE4E6",
  coral200: "#FECDD3",
  coral300: "#FDA4AF",
  coral400: "#FB7185", // main alert
  coral500: "#F43F5E",

  // Sunset - Warm accents, golden hour
  sunset100: "#FFEDD5",
  sunset200: "#FED7AA",
  sunset300: "#FDBA74",
  sunset400: "#FB923C", // main accent
  sunset500: "#F97316",

  // Kelp - Fresh, organic, premium catch
  kelp100: "#ECFCCB",
  kelp200: "#D9F99D",
  kelp300: "#BEF264",
  kelp400: "#A3E635",
  kelp500: "#84CC16", // fresh catch

  // Legacy mappings for compatibility
  neutral100: "#FEFDFB", // sand100
  neutral200: "#FAF8F5", // sand200
  neutral300: "#F5F0E8", // sand300
  neutral400: "#E8DFD0", // sand400
  neutral500: "#A89F91", // sand500
  neutral600: "#78716C", // sand600
  neutral700: "#57534E", // sand700
  neutral800: "#292524", // sand800
  neutral900: "#1C1917", // sand900

  primary100: "#E0F2FE", // ocean100
  primary200: "#BAE6FD", // ocean200
  primary300: "#7DD3FC", // ocean300
  primary400: "#0EA5E9", // ocean500
  primary500: "#0284C7", // ocean600
  primary600: "#0369A1", // darker ocean

  // Badge colors - fish/auction status
  badgeFresh: "#5EEAD4",   // seafoam - fresh catch
  badgeHot: "#FB7185",     // coral - hot deal
  badgePremium: "#84CC16", // kelp - premium
  badgeStandard: "#38BDF8", // ocean - standard
  badgeExpiring: "#FB923C", // sunset - expiring soon

  // Legacy badge mappings
  badgeTeal: "#0EA5E9",
  badgeGray: "#78716C",
  badgeSage: "#84CC16",
  badgeCoral: "#FB7185",
  badgeMint: "#5EEAD4",

  // Status colors
  angry100: "#FFE4E6",
  angry500: "#F43F5E",

  // Accent (sunset for highlights)
  accent100: "#FFEDD5",
  accent200: "#FED7AA",
  accent300: "#FDBA74",
  accent400: "#FB923C",
  accent500: "#F97316",

  // Secondary (ocean variants)
  secondary100: "#E0F2FE",
  secondary200: "#BAE6FD",
  secondary300: "#7DD3FC",
  secondary400: "#38BDF8",
  secondary500: "#0EA5E9",

  // Crypto brand colors (keeping for compatibility)
  cryptoBitcoin: "#F7931A",
  cryptoEthereum: "#627EEA",

  // Overlays (darker sand tones)
  overlay20: "rgba(28, 25, 23, 0.2)",
  overlay50: "rgba(28, 25, 23, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color - deep night shore.
   */
  text: palette.sand900,
  /**
   * Secondary text - dark rock.
   */
  textDim: palette.sand700,
  /**
   * Subtle text - driftwood.
   */
  textSubtle: palette.sand600,
  /**
   * Screen background - white sand.
   */
  background: palette.sand100,
  /**
   * Border color - dry sand.
   */
  border: palette.sand300,
  /**
   * Main tint - deep ocean blue.
   */
  tint: palette.ocean500,
  /**
   * Inactive tint - wet sand.
   */
  tintInactive: palette.sand400,
  /**
   * Separators - dry sand.
   */
  separator: palette.sand300,
  /**
   * Success - seafoam green (good deal!).
   */
  success: palette.seafoam300,
  /**
   * Warning - sunset orange (expiring).
   */
  warning: palette.sunset400,
  /**
   * Error - coral red.
   */
  error: palette.coral500,
  /**
   * Error background.
   */
  errorBackground: palette.coral100,
  /**
   * Fresh/premium - kelp green.
   */
  fresh: palette.kelp500,
  /**
   * Hot deal - coral.
   */
  hot: palette.coral400,
} as const
