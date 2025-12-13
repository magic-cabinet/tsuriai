/**
 * Squarified Treemap algorithm
 * Great for hierarchical data and priority-based sizing
 */

import type { PackableItem, PackedRect, PackingResult, PackingOptions } from "./types"

export function packTreemap(
  items: PackableItem[],
  options: PackingOptions
): PackingResult {
  const { containerWidth, containerHeight, padding = 0 } = options

  const availWidth = containerWidth - padding * 2
  const availHeight = containerHeight - padding * 2

  // Calculate total priority for proportional sizing
  const totalPriority = items.reduce((sum, item) => sum + item.priority, 0)
  const totalArea = availWidth * availHeight

  // Convert priorities to target areas
  const itemsWithArea = items.map((item) => ({
    ...item,
    targetArea: (item.priority / totalPriority) * totalArea,
  }))

  // Sort by target area (largest first)
  itemsWithArea.sort((a, b) => b.targetArea - a.targetArea)

  // Squarify algorithm
  const packed = squarify(
    itemsWithArea,
    { x: padding, y: padding, width: availWidth, height: availHeight },
    []
  )

  const totalPackedArea = packed.reduce((sum, r) => sum + r.width * r.height, 0)

  return {
    packed,
    unpacked: [],
    efficiency: totalPackedArea / totalArea,
    containerSize: { width: containerWidth, height: containerHeight },
  }
}

interface ItemWithArea extends PackableItem {
  targetArea: number
}

interface Container {
  x: number
  y: number
  width: number
  height: number
}

function squarify(
  items: ItemWithArea[],
  container: Container,
  result: PackedRect[]
): PackedRect[] {
  if (items.length === 0) return result

  const isWide = container.width >= container.height

  // Find the row that gives best aspect ratios
  let row: ItemWithArea[] = []
  let remaining = [...items]

  while (remaining.length > 0) {
    const item = remaining[0]
    const testRow = [...row, item]

    if (row.length === 0 || worstAspectRatio(testRow, container) <= worstAspectRatio(row, container)) {
      row = testRow
      remaining = remaining.slice(1)
    } else {
      break
    }
  }

  // Layout the row
  const rowArea = row.reduce((sum, item) => sum + item.targetArea, 0)
  const rowSize = isWide
    ? rowArea / container.height
    : rowArea / container.width

  let offset = 0
  for (const item of row) {
    const itemSize = item.targetArea / rowSize

    const rect: PackedRect = isWide
      ? {
          id: item.id,
          x: container.x,
          y: container.y + offset,
          width: rowSize,
          height: itemSize,
        }
      : {
          id: item.id,
          x: container.x + offset,
          y: container.y,
          width: itemSize,
          height: rowSize,
        }

    // Enforce minimum sizes
    rect.width = Math.max(rect.width, item.minWidth)
    rect.height = Math.max(rect.height, item.minHeight)

    result.push(rect)
    offset += itemSize
  }

  // Recurse with remaining items in remaining space
  if (remaining.length > 0) {
    const newContainer: Container = isWide
      ? {
          x: container.x + rowSize,
          y: container.y,
          width: container.width - rowSize,
          height: container.height,
        }
      : {
          x: container.x,
          y: container.y + rowSize,
          width: container.width,
          height: container.height - rowSize,
        }

    squarify(remaining, newContainer, result)
  }

  return result
}

function worstAspectRatio(row: ItemWithArea[], container: Container): number {
  if (row.length === 0) return Infinity

  const rowArea = row.reduce((sum, item) => sum + item.targetArea, 0)
  const isWide = container.width >= container.height
  const side = isWide ? container.height : container.width
  const rowSize = rowArea / side

  let worst = 0
  for (const item of row) {
    const itemSize = item.targetArea / rowSize
    const aspect = Math.max(rowSize / itemSize, itemSize / rowSize)
    worst = Math.max(worst, aspect)
  }

  return worst
}
