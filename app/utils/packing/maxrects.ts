/**
 * MaxRects bin packing algorithm
 * Industry standard for texture atlases and layout packing
 */

import type { Rect, PackableItem, PackedRect, PackingResult, PackingOptions } from "./types"

interface FreeRect extends Rect {}

export function packMaxRects(
  items: PackableItem[],
  options: PackingOptions
): PackingResult {
  const { containerWidth, containerHeight, padding = 0, gap = 0 } = options

  // Available width/height after padding
  const availWidth = containerWidth - padding * 2
  const availHeight = containerHeight - padding * 2

  // Start with one free rectangle covering the entire space
  let freeRects: FreeRect[] = [{ x: padding, y: padding, width: availWidth, height: availHeight }]

  // Sort items by priority (highest first) then by area (largest first)
  const sortedItems = [...items].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority
    return b.minWidth * b.minHeight - a.minWidth * a.minHeight
  })

  const packed: PackedRect[] = []
  const unpacked: string[] = []
  let totalPackedArea = 0

  for (const item of sortedItems) {
    const itemWidth = item.minWidth + gap
    const itemHeight = item.minHeight + gap

    // Find the best free rectangle for this item (Best Short Side Fit)
    let bestRect: FreeRect | null = null
    let bestShortSide = Infinity
    let bestLongSide = Infinity

    for (const freeRect of freeRects) {
      // Check if item fits
      if (itemWidth <= freeRect.width && itemHeight <= freeRect.height) {
        const leftoverH = freeRect.width - itemWidth
        const leftoverV = freeRect.height - itemHeight
        const shortSide = Math.min(leftoverH, leftoverV)
        const longSide = Math.max(leftoverH, leftoverV)

        if (shortSide < bestShortSide || (shortSide === bestShortSide && longSide < bestLongSide)) {
          bestRect = freeRect
          bestShortSide = shortSide
          bestLongSide = longSide
        }
      }
    }

    if (bestRect) {
      // Place the item
      const placedRect: PackedRect = {
        id: item.id,
        x: bestRect.x,
        y: bestRect.y,
        width: item.minWidth,
        height: item.minHeight,
      }
      packed.push(placedRect)
      totalPackedArea += item.minWidth * item.minHeight

      // Split the free rectangle
      const newFreeRects = splitFreeRect(bestRect, {
        x: bestRect.x,
        y: bestRect.y,
        width: itemWidth,
        height: itemHeight,
      })

      // Remove the used free rect and add new ones
      freeRects = freeRects.filter((r) => r !== bestRect)
      freeRects.push(...newFreeRects)

      // Merge overlapping free rectangles
      freeRects = pruneFreeRects(freeRects)
    } else {
      unpacked.push(item.id)
    }
  }

  const totalArea = availWidth * availHeight
  const efficiency = totalArea > 0 ? totalPackedArea / totalArea : 0

  return {
    packed,
    unpacked,
    efficiency,
    containerSize: { width: containerWidth, height: containerHeight },
  }
}

function splitFreeRect(freeRect: FreeRect, usedRect: Rect): FreeRect[] {
  const newRects: FreeRect[] = []

  // Right remainder
  if (usedRect.x + usedRect.width < freeRect.x + freeRect.width) {
    newRects.push({
      x: usedRect.x + usedRect.width,
      y: freeRect.y,
      width: freeRect.x + freeRect.width - (usedRect.x + usedRect.width),
      height: freeRect.height,
    })
  }

  // Bottom remainder
  if (usedRect.y + usedRect.height < freeRect.y + freeRect.height) {
    newRects.push({
      x: freeRect.x,
      y: usedRect.y + usedRect.height,
      width: freeRect.width,
      height: freeRect.y + freeRect.height - (usedRect.y + usedRect.height),
    })
  }

  return newRects.filter((r) => r.width > 0 && r.height > 0)
}

function pruneFreeRects(rects: FreeRect[]): FreeRect[] {
  // Remove rectangles that are fully contained within another
  return rects.filter((a, i) => {
    for (let j = 0; j < rects.length; j++) {
      if (i !== j) {
        const b = rects[j]
        if (
          a.x >= b.x &&
          a.y >= b.y &&
          a.x + a.width <= b.x + b.width &&
          a.y + a.height <= b.y + b.height
        ) {
          return false // a is contained in b
        }
      }
    }
    return true
  })
}
