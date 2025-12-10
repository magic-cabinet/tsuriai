/**
 * Dark theme color palette based on the BeyondAlpha design system.
 * Inverted Slate scale for dark mode with brand teal (#7EA1C4) as primary accent.
 */
const palette = {
  // Inverted Slate scale for dark mode
  neutral900: "#FFFFFF",
  neutral800: "#F1F5F9", // slate/100
  neutral700: "#E2E8F0", // slate/200
  neutral600: "#CBD5E1", // slate/300
  neutral500: "#94A3B8", // slate/400
  neutral400: "#64748B", // slate/500
  neutral300: "#475569", // slate/600
  neutral200: "#334155", // slate/700
  neutral100: "#0F172A", // slate/900 - background color

  // Brand teal - primary accent (lighter for dark mode)
  primary100: "#4A7A9E",
  primary200: "#5B8AB5",
  primary300: "#7EA1C4", // Brand color
  primary400: "#A2C3D8",
  primary500: "#C1D7E5",
  primary600: "#E0EBF2",

  // Secondary - slate tones for dark mode
  secondary100: "#1E293B", // slate/800
  secondary200: "#334155", // slate/700
  secondary300: "#475569", // slate/600
  secondary400: "#64748B", // slate/500
  secondary500: "#94A3B8", // slate/400

  // Accent - warm gold/amber (adjusted for dark mode visibility)
  accent100: "#78350F",
  accent200: "#92400E",
  accent300: "#B45309",
  accent400: "#D97706",
  accent500: "#F59E0B",

  // Asset type badge colors (same as light mode for consistency)
  badgeTeal: "#7EA1C4", // AVX - Concept
  badgeGray: "#9CA3AF", // IPX - Internal (lighter for dark mode)
  badgeSage: "#A3B18A", // IPL - Legacy
  badgeCoral: "#E07A5F", // IPR - Rehab
  badgeMint: "#81B29A", // JV1 - Joint Venture

  // Status colors (adjusted for dark mode)
  angry100: "#450A0A",
  angry500: "#F87171",

  // Overlays
  overlay20: "rgba(255, 255, 255, 0.2)",
  overlay50: "rgba(255, 255, 255, 0.5)",
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
   * Using white for dark mode.
   */
  text: palette.neutral900,
  /**
   * Secondary text information.
   * Lighter slate for dark mode.
   */
  textDim: palette.neutral700,
  /**
   * Subtle text for helper text and captions.
   */
  textSubtle: palette.neutral600,
  /**
   * The default color of the screen background.
   * Dark slate for dark mode.
   */
  background: palette.neutral100,
  /**
   * The default border color.
   * Darker slate for dark mode visibility.
   */
  border: palette.neutral300,
  /**
   * The main tinting color - brand teal (lighter variant for dark mode).
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
