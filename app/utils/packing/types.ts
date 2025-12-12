/**
 * Core types for rectangle packing system
 */

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface PackableItem {
  id: string
  minWidth: number
  minHeight: number
  maxWidth?: number
  maxHeight?: number
  priority: number // Higher = larger allocation
  aspectRatio?: number // Maintain ratio during resize
}

export interface PackedRect extends Rect {
  id: string
}

export interface PackingResult {
  packed: PackedRect[]
  unpacked: string[] // IDs that didn't fit
  efficiency: number // 0-1, packed area / total area
  containerSize: { width: number; height: number }
}

export type PackingAlgorithm =
  | "shelf"
  | "guillotine"
  | "maxrects"
  | "treemap"
  | "masonry"

export interface PackingOptions {
  containerWidth: number
  containerHeight: number
  padding?: number
  gap?: number
  sortBy?: "priority" | "area" | "width" | "height"
}
