/**
 * Color palette based on the BeyondAlpha design system from Figma.
 * Uses Slate color scale for neutrals and brand teal (#7EA1C4) as primary accent.
 */
const palette = {
  // Slate scale from Figma design system
  neutral100: "#FFFFFF",
  neutral200: "#F1F5F9", // slate/100
  neutral300: "#E2E8F0", // slate/200
  neutral400: "#CBD5E1", // slate/300
  neutral500: "#94A3B8", // slate/400
  neutral600: "#64748B", // slate/500
  neutral700: "#475569", // slate/600
  neutral800: "#334155", // slate/700
  neutral900: "#0F172A", // slate/900 - primary text color

  // Brand teal - primary accent from BeyondAlpha
  primary100: "#E0EBF2",
  primary200: "#C1D7E5",
  primary300: "#A2C3D8",
  primary400: "#7EA1C4", // Brand color from assets
  primary500: "#5B8AB5",
  primary600: "#4A7A9E",

  // Secondary - muted slate
  secondary100: "#F8FAFC",
  secondary200: "#F1F5F9",
  secondary300: "#E2E8F0",
  secondary400: "#CBD5E1",
  secondary500: "#94A3B8",

  // Accent - warm gold/amber for highlights
  accent100: "#FEF3C7",
  accent200: "#FDE68A",
  accent300: "#FCD34D",
  accent400: "#FBBF24",
  accent500: "#F59E0B",

  // Asset type badge colors from Figma
  badgeTeal: "#7EA1C4", // AVX - Concept
  badgeGray: "#6B7280", // IPX - Internal
  badgeSage: "#A3B18A", // IPL - Legacy
  badgeCoral: "#E07A5F", // IPR - Rehab
  badgeMint: "#81B29A", // JV1 - Joint Venture

  // Crypto brand colors
  cryptoBitcoin: "#F7931A",
  cryptoEthereum: "#627EEA",

  // Status colors
  angry100: "#FEE2E2",
  angry500: "#EF4444",

  // Overlays
  overlay20: "rgba(15, 23, 42, 0.2)",
  overlay50: "rgba(15, 23, 42, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   * Using slate/900 from Figma design system.
   */
  text: palette.neutral900,
  /**
   * Secondary text information.
   * Using slate/600 from Figma design system.
   */
  textDim: palette.neutral700,
  /**
   * Subtle text for helper text and captions.
   * Using slate/500 from Figma design system.
   */
  textSubtle: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral100,
  /**
   * The default border color.
   * Using slate/200 from Figma design system.
   */
  border: palette.neutral300,
  /**
   * The main tinting color - brand teal.
   */
  tint: palette.primary400,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral400,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
} as const
