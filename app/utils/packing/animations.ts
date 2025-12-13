/**
 * Animation presets for packing layouts
 * Uses Reanimated spring/timing configurations
 */

import { Easing, EasingFunction, EasingFunctionFactory } from "react-native-reanimated"

export interface AnimationPreset {
  type: "spring" | "timing"
  damping?: number
  stiffness?: number
  mass?: number
  duration?: number
  easing?: EasingFunction | EasingFunctionFactory
  staggerFn?: (index: number, position: { x: number; y: number }) => number
  jitter?: number
}

export const ANIMATION_PRESETS: Record<string, AnimationPreset> = {
  snappy: {
    type: "spring",
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  },
  bouncy: {
    type: "spring",
    damping: 8,
    stiffness: 150,
    mass: 1,
  },
  wave: {
    type: "spring",
    damping: 15,
    stiffness: 100,
    mass: 0.8,
    staggerFn: (_index, position) => position.x * 0.5 + position.y * 0.3,
  },
  cascade: {
    type: "spring",
    damping: 12,
    stiffness: 200,
    staggerFn: (index) => index * 80,
  },
  organic: {
    type: "spring",
    damping: 10,
    stiffness: 80,
    mass: 1.5,
    jitter: 0.1,
  },
  flow: {
    type: "timing",
    duration: 600,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
  chaos: {
    type: "spring",
    damping: 5,
    stiffness: 300,
    mass: 0.3,
    staggerFn: () => Math.random() * 200,
  },
  gentle: {
    type: "spring",
    damping: 25,
    stiffness: 80,
    mass: 1,
  },
}

export type AnimationPresetName = keyof typeof ANIMATION_PRESETS

/**
 * Density modes for packing
 */
export interface DensityMode {
  padding: number
  gap: number
  minItemSize: number
  jitter?: number
}

export const DENSITY_MODES: Record<string, DensityMode> = {
  loose: {
    padding: 16,
    gap: 12,
    minItemSize: 120,
  },
  tight: {
    padding: 8,
    gap: 6,
    minItemSize: 80,
  },
  adaptive: {
    padding: 12,
    gap: 8,
    minItemSize: 100,
  },
  natural: {
    padding: 12,
    gap: 8,
    minItemSize: 100,
    jitter: 4,
  },
}

/**
 * 24 experimental variants combining algorithm + animation + density
 */
export interface PackingVariant {
  algorithm: "shelf" | "guillotine" | "maxrects" | "treemap" | "masonry"
  animation: AnimationPresetName
  density: keyof typeof DENSITY_MODES
  name: string
}

export const VARIANTS: PackingVariant[] = [
  // Shelf variants (0-3)
  { algorithm: "shelf", animation: "snappy", density: "loose", name: "Shelf Snappy Loose" },
  { algorithm: "shelf", animation: "bouncy", density: "loose", name: "Shelf Bouncy Loose" },
  { algorithm: "shelf", animation: "snappy", density: "tight", name: "Shelf Snappy Tight" },
  { algorithm: "shelf", animation: "bouncy", density: "tight", name: "Shelf Bouncy Tight" },

  // Guillotine variants (4-7)
  { algorithm: "guillotine", animation: "snappy", density: "loose", name: "Guillotine Snappy Loose" },
  { algorithm: "guillotine", animation: "bouncy", density: "loose", name: "Guillotine Bouncy Loose" },
  { algorithm: "guillotine", animation: "snappy", density: "tight", name: "Guillotine Snappy Tight" },
  { algorithm: "guillotine", animation: "bouncy", density: "tight", name: "Guillotine Bouncy Tight" },

  // MaxRects variants (8-11)
  { algorithm: "maxrects", animation: "snappy", density: "loose", name: "MaxRects Snappy Loose" },
  { algorithm: "maxrects", animation: "bouncy", density: "loose", name: "MaxRects Bouncy Loose" },
  { algorithm: "maxrects", animation: "snappy", density: "tight", name: "MaxRects Snappy Tight" },
  { algorithm: "maxrects", animation: "bouncy", density: "tight", name: "MaxRects Bouncy Tight" },

  // Treemap variants (12-15)
  { algorithm: "treemap", animation: "snappy", density: "loose", name: "Treemap Snappy Loose" },
  { algorithm: "treemap", animation: "bouncy", density: "loose", name: "Treemap Bouncy Loose" },
  { algorithm: "treemap", animation: "snappy", density: "tight", name: "Treemap Snappy Tight" },
  { algorithm: "treemap", animation: "bouncy", density: "tight", name: "Treemap Bouncy Tight" },

  // Masonry variants (16-17)
  { algorithm: "masonry", animation: "wave", density: "adaptive", name: "Masonry Wave" },
  { algorithm: "masonry", animation: "cascade", density: "adaptive", name: "Masonry Cascade" },

  // Experimental variants (18-23)
  { algorithm: "maxrects", animation: "organic", density: "natural", name: "Organic Flow" },
  { algorithm: "treemap", animation: "flow", density: "natural", name: "Smooth Treemap" },
  { algorithm: "maxrects", animation: "gentle", density: "loose", name: "Gentle Pack" },
  { algorithm: "treemap", animation: "wave", density: "adaptive", name: "Treemap Wave" },
  { algorithm: "maxrects", animation: "chaos", density: "tight", name: "Chaos Pack" },
  { algorithm: "treemap", animation: "cascade", density: "loose", name: "Cascade Treemap" },
]

export function getVariant(index: number): PackingVariant {
  return VARIANTS[Math.max(0, Math.min(index, VARIANTS.length - 1))]
}

export function getAnimationPreset(name: AnimationPresetName): AnimationPreset {
  return ANIMATION_PRESETS[name] || ANIMATION_PRESETS.snappy
}

export function getDensityMode(name: keyof typeof DENSITY_MODES): DensityMode {
  return DENSITY_MODES[name] || DENSITY_MODES.loose
}
