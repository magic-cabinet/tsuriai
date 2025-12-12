/**
 * Rectangle Packing Utilities
 *
 * Multiple algorithms for packing rectangles efficiently:
 * - maxrects: Best for mixed sizes, industry standard
 * - treemap: Best for priority-based sizing
 * - shelf: Simplest, good for similar heights
 * - guillotine: Good balance of speed and efficiency
 * - masonry: Pinterest-style columns
 */

export * from "./types"
export { packMaxRects } from "./maxrects"
export { packTreemap } from "./treemap"

import type { PackableItem, PackingResult, PackingOptions, PackingAlgorithm } from "./types"
import { packMaxRects } from "./maxrects"
import { packTreemap } from "./treemap"

/**
 * Pack items using the specified algorithm
 */
export function pack(
  algorithm: PackingAlgorithm,
  items: PackableItem[],
  options: PackingOptions
): PackingResult {
  switch (algorithm) {
    case "maxrects":
      return packMaxRects(items, options)
    case "treemap":
      return packTreemap(items, options)
    case "shelf":
    case "guillotine":
    case "masonry":
      // TODO: Implement these
      return packMaxRects(items, options) // Fallback to maxrects
    default:
      return packMaxRects(items, options)
  }
}

/**
 * Calculate packing efficiency metrics
 */
export function calculateMetrics(result: PackingResult) {
  const { packed, containerSize } = result
  const totalArea = containerSize.width * containerSize.height
  const packedArea = packed.reduce((sum, r) => sum + r.width * r.height, 0)

  return {
    efficiency: packedArea / totalArea,
    wastedSpace: totalArea - packedArea,
    itemCount: packed.length,
    averageItemArea: packed.length > 0 ? packedArea / packed.length : 0,
  }
}
