/**
 * Seaside Color Palette - Dark Mode for tsuriai fishing app.
 * Same palette structure as light mode but adjusted for dark backgrounds.
 */
const palette = {
  // Ocean Blues - Primary brand colors (adjusted for dark mode)
  ocean100: "#0C4A6E", // deep ocean (inverted)
  ocean200: "#075985", // deep sea
  ocean300: "#0369A1", // medium ocean
  ocean400: "#0284C7", // bright ocean
  ocean500: "#0EA5E9", // clear water - main brand
  ocean600: "#38BDF8", // shallow water (bright for dark mode)

  // Sandy Neutrals - Backgrounds and text (inverted for dark mode)
  sand100: "#1C1917", // dark background
  sand200: "#292524", // slightly lighter dark
  sand300: "#44403C", // dark gray
  sand400: "#57534E", // medium gray
  sand500: "#78716C", // light gray text
  sand600: "#A8A29E", // lighter gray
  sand700: "#D6D3D1", // very light gray
  sand800: "#F5F5F4", // near white
  sand900: "#FAFAF9", // white text

  // Seafoam - Success, good deals (adjusted for dark mode visibility)
  seafoam100: "#042F2E", // dark seafoam
  seafoam200: "#134E4A", // deep seafoam
  seafoam300: "#2DD4BF", // bright seafoam
  seafoam400: "#5EEAD4", // light seafoam
  seafoam500: "#99F6E4", // very light seafoam

  // Coral - Alerts, hot deals (adjusted for dark mode)
  coral100: "#4C0519", // dark coral
  coral200: "#881337", // deep coral
  coral300: "#E11D48", // bright coral
  coral400: "#FB7185", // light coral
  coral500: "#FDA4AF", // very light coral

  // Sunset - Warm accents (adjusted for dark mode)
  sunset100: "#431407", // dark sunset
  sunset200: "#7C2D12", // deep sunset
  sunset300: "#EA580C", // bright sunset
  sunset400: "#FB923C", // light sunset
  sunset500: "#FDBA74", // very light sunset

  // Kelp - Fresh, organic (adjusted for dark mode)
  kelp100: "#1A2E05", // dark kelp
  kelp200: "#365314", // deep kelp
  kelp300: "#65A30D", // bright kelp
  kelp400: "#84CC16", // light kelp
  kelp500: "#A3E635", // very light kelp

  // Legacy mappings for compatibility
  neutral100: "#1C1917", // sand100
  neutral200: "#292524", // sand200
  neutral300: "#44403C", // sand300
  neutral400: "#57534E", // sand400
  neutral500: "#78716C", // sand500
  neutral600: "#A8A29E", // sand600
  neutral700: "#D6D3D1", // sand700
  neutral800: "#F5F5F4", // sand800
  neutral900: "#FAFAF9", // sand900

  primary100: "#0C4A6E", // ocean100
  primary200: "#075985", // ocean200
  primary300: "#0369A1", // ocean300
  primary400: "#0EA5E9", // ocean500
  primary500: "#38BDF8", // ocean600
  primary600: "#7DD3FC", // brighter ocean

  // Badge colors - fish/auction status (bright for dark mode)
  badgeFresh: "#2DD4BF",   // seafoam - fresh catch
  badgeHot: "#FB7185",     // coral - hot deal
  badgePremium: "#84CC16", // kelp - premium
  badgeStandard: "#38BDF8", // ocean - standard
  badgeExpiring: "#FB923C", // sunset - expiring soon

  // Legacy badge mappings
  badgeTeal: "#0EA5E9",
  badgeGray: "#78716C",
  badgeSage: "#84CC16",
  badgeCoral: "#FB7185",
  badgeMint: "#2DD4BF",

  // Status colors
  angry100: "#4C0519",
  angry500: "#FDA4AF",

  // Accent (sunset for highlights)
  accent100: "#431407",
  accent200: "#7C2D12",
  accent300: "#EA580C",
  accent400: "#FB923C",
  accent500: "#FDBA74",

  // Secondary (ocean variants)
  secondary100: "#0C4A6E",
  secondary200: "#075985",
  secondary300: "#0369A1",
  secondary400: "#0284C7",
  secondary500: "#0EA5E9",

  // Crypto brand colors (keeping for compatibility)
  cryptoBitcoin: "#F7931A",
  cryptoEthereum: "#627EEA",

  // Overlays (lighter for dark mode)
  overlay20: "rgba(255, 255, 255, 0.2)",
  overlay50: "rgba(255, 255, 255, 0.5)",
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
   * The default text color - near white for dark mode.
   */
  text: palette.sand900,
  /**
   * Secondary text - light gray.
   */
  textDim: palette.sand700,
  /**
   * Subtle text - medium gray.
   */
  textSubtle: palette.sand600,
  /**
   * Screen background - dark.
   */
  background: palette.sand100,
  /**
   * Border color - dark gray.
   */
  border: palette.sand300,
  /**
   * Main tint - ocean blue.
   */
  tint: palette.ocean500,
  /**
   * Inactive tint - medium gray.
   */
  tintInactive: palette.sand400,
  /**
   * Separators - dark gray.
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
  fresh: palette.kelp400,
  /**
   * Hot deal - coral.
   */
  hot: palette.coral400,
} as const
