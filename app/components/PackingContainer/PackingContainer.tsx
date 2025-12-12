/**
 * PackingContainer - Animated rectangle packing layout
 */

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from "react-native"
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
} from "react-native-reanimated"

import {
  pack,
  PackableItem,
  PackedRect,
  PackingAlgorithm,
} from "@/utils/packing"
import {
  ANIMATION_PRESETS,
  DENSITY_MODES,
  getVariant,
  AnimationPreset,
  DensityMode,
} from "@/utils/packing/animations"

export interface PackingContainerProps {
  items: PackableItem[]
  algorithm?: PackingAlgorithm
  animation?: keyof typeof ANIMATION_PRESETS | AnimationPreset
  density?: keyof typeof DENSITY_MODES | DensityMode
  variant?: number
  renderItem: (item: PackableItem, rect: PackedRect, index: number) => React.ReactNode
  style?: ViewStyle
  showDebug?: boolean
  onLayoutComplete?: (packed: PackedRect[]) => void
}

export function PackingContainer({
  items,
  algorithm: algorithmProp,
  animation: animationProp,
  density: densityProp,
  variant,
  renderItem,
  style,
  showDebug = false,
  onLayoutComplete,
}: PackingContainerProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  // Resolve config from variant or individual props
  const { algorithm, animation, density } = useMemo(() => {
    if (variant !== undefined) {
      const v = getVariant(variant)
      return {
        algorithm: v.algorithm as PackingAlgorithm,
        animation: ANIMATION_PRESETS[v.animation],
        density: DENSITY_MODES[v.density],
      }
    }
    return {
      algorithm: (algorithmProp || "maxrects") as PackingAlgorithm,
      animation:
        typeof animationProp === "string"
          ? ANIMATION_PRESETS[animationProp] || ANIMATION_PRESETS.snappy
          : animationProp || ANIMATION_PRESETS.snappy,
      density:
        typeof densityProp === "string"
          ? DENSITY_MODES[densityProp] || DENSITY_MODES.loose
          : densityProp || DENSITY_MODES.loose,
    }
  }, [variant, algorithmProp, animationProp, densityProp])

  // Compute packed layout
  const packedLayout = useMemo(() => {
    if (containerSize.width === 0 || containerSize.height === 0) {
      return null
    }
    return pack(algorithm, items, {
      containerWidth: containerSize.width,
      containerHeight: containerSize.height,
      padding: density.padding,
      gap: density.gap,
    })
  }, [items, algorithm, density, containerSize])

  useEffect(() => {
    if (packedLayout && onLayoutComplete) {
      onLayoutComplete(packedLayout.packed)
    }
  }, [packedLayout, onLayoutComplete])

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setContainerSize({ width, height })
  }, [])

  return (
    <View style={[styles.container, style]} onLayout={handleLayout}>
      {packedLayout?.packed.map((rect, index) => {
        const item = items.find((i) => i.id === rect.id)
        if (!item) return null

        return (
          <PackedItem
            key={rect.id}
            rect={rect}
            index={index}
            animation={animation}
            showDebug={showDebug}
          >
            {renderItem(item, rect, index)}
          </PackedItem>
        )
      })}
    </View>
  )
}

interface PackedItemProps {
  rect: PackedRect
  index: number
  animation: AnimationPreset
  showDebug: boolean
  children: React.ReactNode
}

function PackedItem({ rect, index, animation, showDebug, children }: PackedItemProps) {
  const x = useSharedValue(rect.x)
  const y = useSharedValue(rect.y)
  const width = useSharedValue(rect.width)
  const height = useSharedValue(rect.height)

  useEffect(() => {
    const delay = animation.staggerFn
      ? animation.staggerFn(index, { x: rect.x, y: rect.y })
      : 0

    const animate = (sv: SharedValue<number>, target: number) => {
      if (animation.type === "timing") {
        sv.value = withDelay(
          delay,
          withTiming(target, { duration: animation.duration || 300 })
        )
      } else {
        sv.value = withDelay(
          delay,
          withSpring(target, {
            damping: animation.damping || 15,
            stiffness: animation.stiffness || 150,
            mass: animation.mass || 1,
          })
        )
      }
    }

    animate(x, rect.x)
    animate(y, rect.y)
    animate(width, rect.width)
    animate(height, rect.height)
  }, [rect, animation, index])

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: x.value,
    top: y.value,
    width: width.value,
    height: height.value,
  }))

  return (
    <Animated.View style={animatedStyle}>
      {children}
      {showDebug && <View style={styles.debugBorder} />}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  debugBorder: {
    ...StyleSheet.absoluteFillObject,
    borderColor: "red",
    borderWidth: 1,
  },
})
