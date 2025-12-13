# Rectangle Packing Animation System

## Vision

Create a distinctive UI pattern where cards/tiles dynamically pack themselves into optimal arrangements, animated smoothly using React Native's native capabilities. This maximizes information density while creating visually engaging, living interfaces.

## Why Native?

React Native + Reanimated gives us:
- **60fps animations** running on UI thread (not JS thread)
- **Gesture-driven interactions** with native responsiveness
- **Hardware acceleration** for complex transforms
- **Worklets** - JS functions that run on native thread
- **Layout animations** that web simply cannot match

## Core Algorithms

### 1. Bin Packing (2D)

**Shelf Algorithm (Simple)**
```
┌────────────────────────────┐
│ ████ ██ ████████ ███      │ ← Shelf 1
│ ██████████ ████ ██████    │ ← Shelf 2
│ ████ ████████████ ██      │ ← Shelf 3
└────────────────────────────┘
```

**Guillotine Algorithm (Better)**
- Split remaining space after placing each rectangle
- Creates more efficient packing
- Good for dynamic content

**MaxRects Algorithm (Best)**
- Maintains list of free rectangles
- Finds best fit for each new item
- Industry standard for texture atlases

### 2. Treemap Layouts

Perfect for hierarchical data (categories → items):
```
┌───────────────────────────────────┐
│ TUNA (40%)          │ SALMON     │
│                     │   (25%)    │
│                     ├────────────┤
│                     │ SHRIMP 15% │
├─────────────────────┼────────────┤
│ MACKEREL (12%)      │ OTHER (8%) │
└─────────────────────┴────────────┘
```

### 3. Voronoi/Organic Packing

For more natural, "beach stone" aesthetics:
```
    ╭───────╮
   ╭┤       ├───────╮
   │╰───┬───╯       │
   │    │   ╭───────┤
   ╰────┴───┤       │
            ╰───────╯
```

## Animation System

### Using Reanimated 3 Worklets

```typescript
// Runs entirely on UI thread - 60fps guaranteed
const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [
      { translateX: withSpring(position.value.x) },
      { translateY: withSpring(position.value.y) },
      { scale: withSpring(scale.value) },
    ],
    width: withSpring(size.value.width),
    height: withSpring(size.value.height),
  };
});
```

### Layout Transitions

When data changes, cards smoothly animate to new positions:

```
Frame 0:                    Frame 30:
┌───┐ ┌───┐                ┌───────┐ ┌───┐
│ A │ │ B │    ────────►   │   A   │ │ B │
└───┘ └───┘                │       │ └───┘
┌───┐                      └───────┘
│ C │                      ┌───┐
└───┘                      │ C │
                           └───┘
(A grows, others repack)
```

### Gesture-Driven Repacking

User drags a card → others flow around it in real-time:

```typescript
const gesture = Gesture.Pan()
  .onUpdate((e) => {
    // Move dragged card
    position.value = { x: e.translationX, y: e.translationY };

    // Repack other cards around it (runs on UI thread)
    runOnUI(repackLayout)(draggingId, position.value);
  });
```

## Component Architecture

### PackingContainer

The orchestrator that manages layout algorithm:

```typescript
interface PackingContainerProps {
  algorithm: 'shelf' | 'guillotine' | 'maxrects' | 'treemap';
  items: PackableItem[];
  animationConfig?: WithSpringConfig;
  onLayoutComplete?: (layout: PackedLayout) => void;
}

interface PackableItem {
  id: string;
  minWidth: number;
  minHeight: number;
  maxWidth?: number;
  maxHeight?: number;
  priority: number;      // Higher = larger allocation
  aspectRatio?: number;  // Maintain ratio during resize
  content: React.ReactNode;
}
```

### PackedCard

Individual card that knows its packed position:

```typescript
interface PackedCardProps {
  item: PackableItem;
  packedRect: Rect;
  onPress?: () => void;
  onLongPress?: () => void;  // Enter drag mode
}
```

### Example: Fish Auction Dashboard

```typescript
<PackingContainer
  algorithm="maxrects"
  items={[
    // Featured auction - gets most space
    {
      id: 'featured',
      priority: 10,
      minWidth: 200,
      aspectRatio: 16/9,
      content: <FeaturedAuctionCard auction={featured} />
    },
    // Active bids - medium priority
    ...activeBids.map(bid => ({
      id: bid.id,
      priority: 5,
      minWidth: 150,
      content: <BidCard bid={bid} compact />
    })),
    // Stats - small but important
    {
      id: 'stats',
      priority: 3,
      minWidth: 100,
      content: <QuickStats />
    },
  ]}
/>
```

## Information Maximization

### Priority-Based Sizing

Cards size based on importance/relevance:

```
User Context: "Looking at tuna auctions"

┌─────────────────────────────┐
│      BLUEFIN TUNA          │  ← Expanded (relevant)
│      Current: $45/lb       │
│      ████████░░ 80% sold   │
├──────────┬──────────┬──────┤
│ Yellowfin│ Skipjack │ Stats│  ← Compressed (less relevant)
│  $32/lb  │  $18/lb  │ 📊   │
└──────────┴──────────┴──────┘
```

### Temporal Importance

Cards that need attention grow/pulse:

```typescript
// Auction ending soon - grows to grab attention
const urgencyScale = useDerivedValue(() => {
  const timeLeft = auctionEnd - Date.now();
  if (timeLeft < 60000) {  // Last minute
    return interpolate(timeLeft, [0, 60000], [1.2, 1]);
  }
  return 1;
});
```

### Information Density Metrics

Calculate and optimize for bits-per-pixel:

```typescript
interface InfoDensityMetrics {
  // How much meaningful info in this space?
  contentRatio: number;      // text + images vs whitespace
  readabilityScore: number;  // font size, contrast
  actionDensity: number;     // interactive elements
  cognitiveLoad: number;     // estimated processing effort
}
```

## Animation Patterns

### 1. Initial Load - Cascade Pack

Cards drop in one by one, finding their spots:

```
t=0    t=100   t=200   t=300
                        ┌───┐
        ┌───┐   ┌───┐   │ A │
┌───┐   │ A │   │ A │   ├───┤
│ A │   └───┘   ├───┤   │ B │
└───┘           │ B │   ├───┤
                └───┘   │ C │
                        └───┘
```

### 2. Repack on Change

Smooth transitions when data updates:

```typescript
// When items change, animate to new layout
useEffect(() => {
  const newLayout = computePackedLayout(items, containerSize);

  items.forEach(item => {
    const newRect = newLayout.get(item.id);
    // Animate each card to new position
    animatedPositions[item.id].value = withSpring(newRect);
  });
}, [items]);
```

### 3. Focus Expansion

Tap a card to expand, others compress:

```
Before tap:              After tap on B:
┌───┐ ┌───┐ ┌───┐       ┌─┐ ┌───────────┐ ┌─┐
│ A │ │ B │ │ C │   ►   │A│ │     B     │ │C│
└───┘ └───┘ └───┘       └─┘ │  expanded │ └─┘
                            └───────────┘
```

### 4. Gesture Reorder

Long-press to pick up, drag to reorder:

```typescript
const dragGesture = Gesture.Pan()
  .onStart(() => {
    // Lift card
    scale.value = withSpring(1.1);
    zIndex.value = 1000;
  })
  .onUpdate((e) => {
    // Move with finger
    translateX.value = e.translationX;
    translateY.value = e.translationY;

    // Repack others in real-time
    runOnUI(liveRepack)(draggedId, currentPosition);
  })
  .onEnd(() => {
    // Drop into new position
    const targetSlot = findNearestSlot(currentPosition);
    translateX.value = withSpring(targetSlot.x);
    translateY.value = withSpring(targetSlot.y);
  });
```

## Seaside Aesthetic Integration

### Wave Motion

Subtle wave animation in background of packed layout:

```typescript
const waveOffset = useDerivedValue(() => {
  return withRepeat(
    withTiming(Math.PI * 2, { duration: 3000 }),
    -1,  // infinite
    false
  );
});

// Cards gently bob like boats in harbor
const bobTranslateY = useDerivedValue(() => {
  return Math.sin(waveOffset.value + cardIndex * 0.5) * 2;
});
```

### Tidal Transitions

Cards flow in/out like tide:

```typescript
// Enter animation - wave from left
const enterDelay = index * 50;  // Stagger
const enterTranslateX = withDelay(
  enterDelay,
  withSpring(-containerWidth, { damping: 15 })
);
```

### Color Temperature by Value

Good deals = warm coral, standard = cool ocean:

```typescript
const cardBackground = useDerivedValue(() => {
  const dealScore = item.discount / item.maxDiscount;
  return interpolateColor(
    dealScore,
    [0, 0.5, 1],
    [colors.ocean500, colors.seafoam, colors.coral]
  );
});
```

## Implementation Phases

### Phase P0.5: Packing Foundation
- [ ] Implement MaxRects algorithm in TypeScript
- [ ] Create PackingContainer component
- [ ] Basic Reanimated integration
- [ ] Unit tests for packing logic

### Phase P0.6: Animation Layer
- [ ] Spring-based position animations
- [ ] Size transition animations
- [ ] Enter/exit animations
- [ ] Gesture handlers

### Phase P0.7: Showcase Components
- [ ] PackedFishGrid - Fish cards in packed layout
- [ ] AuctionBoard - Real-time packing auction display
- [ ] StatsDashboard - Treemap of portfolio stats

## Experimental Variation System

### Meta-Prop Architecture

A single `variant` prop (0-23) that derives all other configuration:

```typescript
// 24 experimental variations to test
type PackingVariant = 0 | 1 | 2 | ... | 23;

interface PackingExperiment {
  variant: PackingVariant;

  // Derived from variant:
  algorithm: PackingAlgorithm;
  animationConfig: AnimationConfig;
  densityMode: DensityMode;
  colorScheme: ColorScheme;
  gestureMode: GestureMode;
  priorityStrategy: PriorityStrategy;
}

// Variant → Config mapping
const VARIANTS: Record<PackingVariant, PackingExperiment> = {
  0:  { algorithm: 'shelf',      animation: 'snappy',   density: 'loose',  ... },
  1:  { algorithm: 'shelf',      animation: 'bouncy',   density: 'loose',  ... },
  2:  { algorithm: 'shelf',      animation: 'snappy',   density: 'tight',  ... },
  3:  { algorithm: 'shelf',      animation: 'bouncy',   density: 'tight',  ... },
  4:  { algorithm: 'guillotine', animation: 'snappy',   density: 'loose',  ... },
  5:  { algorithm: 'guillotine', animation: 'bouncy',   density: 'loose',  ... },
  6:  { algorithm: 'guillotine', animation: 'snappy',   density: 'tight',  ... },
  7:  { algorithm: 'guillotine', animation: 'bouncy',   density: 'tight',  ... },
  8:  { algorithm: 'maxrects',   animation: 'snappy',   density: 'loose',  ... },
  9:  { algorithm: 'maxrects',   animation: 'bouncy',   density: 'loose',  ... },
  10: { algorithm: 'maxrects',   animation: 'snappy',   density: 'tight',  ... },
  11: { algorithm: 'maxrects',   animation: 'bouncy',   density: 'tight',  ... },
  12: { algorithm: 'treemap',    animation: 'snappy',   density: 'loose',  ... },
  13: { algorithm: 'treemap',    animation: 'bouncy',   density: 'loose',  ... },
  14: { algorithm: 'treemap',    animation: 'snappy',   density: 'tight',  ... },
  15: { algorithm: 'treemap',    animation: 'bouncy',   density: 'tight',  ... },
  16: { algorithm: 'masonry',    animation: 'wave',     density: 'adaptive', ... },
  17: { algorithm: 'masonry',    animation: 'cascade',  density: 'adaptive', ... },
  18: { algorithm: 'voronoi',    animation: 'organic',  density: 'natural',  ... },
  19: { algorithm: 'voronoi',    animation: 'flow',     density: 'natural',  ... },
  20: { algorithm: 'spiral',     animation: 'spin',     density: 'golden',   ... },
  21: { algorithm: 'fibonacci',  animation: 'grow',     density: 'golden',   ... },
  22: { algorithm: 'random',     animation: 'chaos',    density: 'random',   ... },
  23: { algorithm: 'neural',     animation: 'learned',  density: 'optimal',  ... },
};
```

### Storybook Integration

```typescript
// PackingContainer.stories.tsx

const meta = {
  title: "Layout/PackingContainer",
  component: PackingContainer,
  argTypes: {
    variant: {
      control: { type: "range", min: 0, max: 23, step: 1 },
      description: "Scroll through 24 experimental variations",
    },
    itemCount: {
      control: { type: "range", min: 3, max: 50, step: 1 },
    },
    showDebug: {
      control: "boolean",
      description: "Show packing rectangles and metrics",
    },
  },
} satisfies Meta<typeof PackingContainer>;

// Single story that morphs based on variant
export const Experimental: Story = {
  args: {
    variant: 0,
    itemCount: 12,
    showDebug: false,
  },
  render: ({ variant, itemCount, showDebug }) => {
    const config = VARIANTS[variant];
    const items = generateTestItems(itemCount);

    return (
      <View style={styles.container}>
        {/* Variant info header */}
        <View style={styles.header}>
          <Text style={styles.variantLabel}>
            Variant {variant}: {config.algorithm} + {config.animation}
          </Text>
          <Text style={styles.variantDesc}>
            Density: {config.density} | Priority: {config.priorityStrategy}
          </Text>
        </View>

        {/* The actual packing container */}
        <PackingContainer
          algorithm={config.algorithm}
          animationConfig={ANIMATION_PRESETS[config.animation]}
          densityMode={config.density}
          items={items}
          showDebugOverlay={showDebug}
        />

        {/* Metrics panel */}
        {showDebug && (
          <MetricsPanel
            packingEfficiency={calculateEfficiency()}
            animationFPS={measureFPS()}
            cognitiveLoad={estimateCognitiveLoad()}
          />
        )}
      </View>
    );
  },
};
```

### Animation Presets

```typescript
const ANIMATION_PRESETS = {
  snappy: {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  },
  bouncy: {
    damping: 8,
    stiffness: 150,
    mass: 1,
  },
  wave: {
    damping: 15,
    stiffness: 100,
    mass: 0.8,
    // Stagger delay based on position
    staggerFn: (index: number, position: Point) =>
      position.x * 0.5 + position.y * 0.3,
  },
  cascade: {
    damping: 12,
    stiffness: 200,
    // Sequential reveal
    staggerFn: (index: number) => index * 80,
  },
  organic: {
    damping: 10,
    stiffness: 80,
    mass: 1.5,
    // Slight randomness
    jitter: 0.1,
  },
  flow: {
    // Fluid-like motion
    type: 'timing',
    duration: 600,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
  chaos: {
    damping: 5,
    stiffness: 300,
    mass: 0.3,
    // Random delays
    staggerFn: () => Math.random() * 200,
  },
};
```

### Density Modes

```typescript
const DENSITY_MODES = {
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
    // Adjusts based on item count
    paddingFn: (count: number) => Math.max(4, 16 - count * 0.5),
    gapFn: (count: number) => Math.max(2, 12 - count * 0.3),
  },
  natural: {
    // Organic spacing
    padding: 12,
    gap: 8,
    jitter: 4,  // Random offset ±4px
  },
  golden: {
    // Golden ratio spacing
    padding: 16,
    gapFn: (index: number) => 8 * Math.pow(0.618, index % 3),
  },
};
```

### Quick Scroll Testing

```typescript
// Rapid variant testing with swipe
export const VariantScroller: Story = {
  render: () => {
    const [variant, setVariant] = useState(0);

    const swipeGesture = Gesture.Pan()
      .onEnd((e) => {
        if (e.velocityX < -500) {
          // Swipe left → next variant
          setVariant(v => Math.min(23, v + 1));
        } else if (e.velocityX > 500) {
          // Swipe right → previous variant
          setVariant(v => Math.max(0, v - 1));
        }
      });

    return (
      <GestureDetector gesture={swipeGesture}>
        <View style={styles.fullScreen}>
          <PackingContainer variant={variant} items={testItems} />

          {/* Variant indicator dots */}
          <View style={styles.dots}>
            {Array.from({ length: 24 }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === variant && styles.dotActive,
                ]}
              />
            ))}
          </View>

          <Text style={styles.hint}>
            ← Swipe to change variants →
          </Text>
        </View>
      </GestureDetector>
    );
  },
};
```

### A/B Comparison View

```typescript
// Side-by-side variant comparison
export const CompareVariants: Story = {
  args: {
    variantA: 0,
    variantB: 8,
  },
  render: ({ variantA, variantB }) => (
    <View style={styles.splitView}>
      <View style={styles.half}>
        <Text style={styles.label}>Variant {variantA}</Text>
        <PackingContainer variant={variantA} items={testItems} />
      </View>
      <View style={styles.divider} />
      <View style={styles.half}>
        <Text style={styles.label}>Variant {variantB}</Text>
        <PackingContainer variant={variantB} items={testItems} />
      </View>
    </View>
  ),
};
```

### Metrics & Analysis

```typescript
interface PackingMetrics {
  // Efficiency
  spaceUtilization: number;    // 0-1, packed area / total area
  wastedSpace: number;         // pixels of empty space

  // Performance
  computeTimeMs: number;       // Time to calculate layout
  animationFps: number;        // Measured frame rate
  memoryUsage: number;         // Approximate bytes

  // UX Quality
  readabilityScore: number;    // Based on text sizes
  touchTargetScore: number;    // Min tap target compliance
  visualBalance: number;       // Distribution evenness
  cognitiveLoad: number;       // Estimated mental effort

  // Information
  infoDensity: number;         // Content bits per pixel
  priorityAccuracy: number;    // High-priority items larger?
}

// Log metrics for each variant test
const logExperiment = (variant: number, metrics: PackingMetrics) => {
  console.log(`[Variant ${variant}]`, {
    efficiency: `${(metrics.spaceUtilization * 100).toFixed(1)}%`,
    fps: metrics.animationFps,
    cognitive: metrics.cognitiveLoad.toFixed(2),
  });
};
```

## References

- [Bin Packing Algorithms](https://codeincomplete.com/articles/bin-packing/)
- [Reanimated 3 Docs](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [Treemap Algorithms](https://www.cs.umd.edu/hcil/treemap-history/)
