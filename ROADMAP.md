# tsuriai Design System Roadmap

## Component Inventory Analysis

### Current State (tsuriai)
```
ATOMS (Primitives):
✅ Text
✅ Button
✅ Icon
✅ TextField
✅ Toggle (Checkbox, Radio, Switch)
❌ Badge
❌ Spinner
❌ Avatar
❌ Divider

MOLECULES (Combinations):
✅ Card
✅ Header
✅ ListItem
✅ EmptyState
✅ Screen
❌ Modal
❌ Toast
❌ Tabs
❌ FilterBar
❌ ConfirmationDialog
❌ SearchBar
❌ Pagination

ORGANISMS (Complex/Domain):
❌ Everything from kessenuma
```

### Target State (from kessenuma)
```
DOMAIN - Fish:
- FishCard
- FisheryCard
- FishDetailsForm
- FishInventoryList
- FisheryDetailPanel

DOMAIN - Auction:
- AuctionTimer / CountdownTimer
- AuctionCard
- AuctionList
- AuctionBoard
- BidStatusBadge
- BidCard
- BidList
- BidListItem
- BidSubmissionForm

DOMAIN - User:
- UserProfileCard
- ReputationScoreDisplay
- NotificationPanel

DOMAIN - Operations:
- DeliveryTrackingPanel
- PhotoUploader
- FeasibilityCalculator
- DisputeManager
- PriceBreakdown
- StatCard
- Charts
```

---

## Dependency Graph

```
PHASE 0 (Foundation) ─────────────────────────────────────────┐
│                                                              │
├── [P0-1] Seaside Color Palette                              │ PARALLEL
├── [P0-2] Component Folder Restructure                       │
├── [P0-3] Typography Refinements                             │
├── [P0-4] Packing Algorithm Core                             │
├── [P0-5] Animation Presets & Variants System                │
└── [P0-6] PackingContainer Base Component                    │
                                                               │
                              ▼                                │
PHASE 1 (Core Atoms) ─────────────────────────────────────────┤
│ BLOCKED BY: P0-1 (colors)                                   │
│                                                              │
├── [P1-1] Badge                                              │ PARALLEL
├── [P1-2] Spinner                                            │
├── [P1-3] Avatar                                             │
└── [P1-4] Divider                                            │
                                                               │
                              ▼                                │
PHASE 2 (Core Molecules) ─────────────────────────────────────┤
│ BLOCKED BY: P1-* (atoms)                                    │
│                                                              │
├── [P2-1] Modal ──────────────────┐                          │
├── [P2-2] Toast                   │ PARALLEL                 │
├── [P2-3] Tabs                    │                          │
├── [P2-4] FilterBar               │                          │
├── [P2-5] ConfirmationDialog ─────┘                          │
├── [P2-6] SearchBar                                          │
└── [P2-7] BottomSheet                                        │
                                                               │
                              ▼                                │
PHASE 3 (Data Molecules) ─────────────────────────────────────┤
│ BLOCKED BY: P1-* (atoms)                                    │
│ CAN RUN PARALLEL TO: P2-*                                   │
│                                                              │
├── [P3-1] StatCard                                           │
├── [P3-2] PriceBreakdown                                     │ PARALLEL
├── [P3-3] Pagination                                         │
├── [P3-4] DateRangePicker                                    │
└── [P3-5] Charts (basic)                                     │
                                                               │
                              ▼                                │
PHASE 4 (Fish Domain) ────────────────────────────────────────┤
│ BLOCKED BY: P2-1 (Modal), P3-1 (StatCard)                   │
│                                                              │
├── [P4-1] FishCard ───────────────┐                          │
├── [P4-2] FisheryCard             │ PARALLEL                 │
├── [P4-3] FishDetailsForm ────────┘                          │
│          BLOCKED BY: P4-1                                   │
├── [P4-4] FishInventoryList                                  │
│          BLOCKED BY: P4-1                                   │
└── [P4-5] FisheryDetailPanel                                 │
           BLOCKED BY: P4-2, P4-4                             │
                                                               │
                              ▼                                │
PHASE 5 (Auction Domain) ─────────────────────────────────────┤
│ BLOCKED BY: P1-1 (Badge), P2-1 (Modal)                      │
│ CAN RUN PARALLEL TO: P4-*                                   │
│                                                              │
├── [P5-1] CountdownTimer ─────────┐                          │
├── [P5-2] BidStatusBadge          │ PARALLEL                 │
├── [P5-3] AuctionTimer            │                          │
│          BLOCKED BY: P5-1        │                          │
├── [P5-4] BidCard ────────────────┘                          │
│          BLOCKED BY: P5-2                                   │
├── [P5-5] AuctionCard                                        │
│          BLOCKED BY: P5-3                                   │
├── [P5-6] BidListItem                                        │
│          BLOCKED BY: P5-4                                   │
├── [P5-7] BidList                                            │
│          BLOCKED BY: P5-6                                   │
├── [P5-8] AuctionList                                        │
│          BLOCKED BY: P5-5                                   │
├── [P5-9] BidSubmissionForm                                  │
│          BLOCKED BY: P5-4, P2-1                             │
└── [P5-10] AuctionBoard                                      │
            BLOCKED BY: P5-8, P5-7                            │
                                                               │
                              ▼                                │
PHASE 6 (User Domain) ────────────────────────────────────────┤
│ BLOCKED BY: P1-3 (Avatar), P1-1 (Badge)                     │
│ CAN RUN PARALLEL TO: P4-*, P5-*                             │
│                                                              │
├── [P6-1] UserProfileCard                                    │ PARALLEL
├── [P6-2] ReputationScoreDisplay                             │
└── [P6-3] NotificationPanel                                  │
                                                               │
                              ▼                                │
PHASE 7 (Operations Domain) ──────────────────────────────────┤
│ BLOCKED BY: P4-1 (FishCard), P5-4 (BidCard)                 │
│                                                              │
├── [P7-1] DeliveryTrackingPanel                              │
├── [P7-2] PhotoUploader                                      │ PARALLEL
├── [P7-3] FeasibilityCalculator                              │
├── [P7-4] DisputeManager                                     │
│          BLOCKED BY: P7-1                                   │
└── [P7-5] PartnerCard                                        │
```

---

## GitHub Issues

### PHASE 0: Foundation

#### [P0-1] Implement Seaside Color Palette
**Labels:** `foundation`, `theme`, `priority:critical`
**Blocked by:** Nothing
**Blocks:** All Phase 1 issues

**Description:**
Update `app/theme/colors.ts` with seaside-inspired palette:
- Ocean blues for primary (trust, depth)
- Sandy neutrals for backgrounds
- Seafoam for success/good deals
- Coral for alerts/hot items
- Sunset orange for warmth

**Acceptance Criteria:**
- [ ] Update palette in colors.ts
- [ ] Update semantic color mappings
- [ ] Create Storybook color showcase story
- [ ] Verify all existing components render correctly

---

#### [P0-2] Restructure Components to Folder Pattern
**Labels:** `foundation`, `architecture`, `priority:high`
**Blocked by:** Nothing
**Blocks:** Nothing (can merge anytime)

**Description:**
Reorganize from flat files to folder structure:
```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   └── index.ts
├── Text/
│   ├── Text.tsx
│   ├── Text.stories.tsx
│   └── index.ts
```

**Acceptance Criteria:**
- [ ] Move each component to its own folder
- [ ] Create barrel exports (index.ts)
- [ ] Update main components/index.ts
- [ ] Update all imports across codebase
- [ ] Verify Storybook still works

---

#### [P0-3] Typography Refinements
**Labels:** `foundation`, `theme`, `priority:medium`
**Blocked by:** Nothing
**Blocks:** Nothing

**Description:**
Review and refine typography for seaside aesthetic:
- Consider rounder, friendlier fonts
- Adjust letter-spacing for "breezy" feel
- Review font weights

---

### PHASE 1: Core Atoms

#### [P1-1] Badge Component
**Labels:** `atom`, `component`, `priority:high`
**Blocked by:** P0-1
**Blocks:** P5-2, P6-1, P6-2

**Description:**
Create Badge component for status indicators, counts, labels.

**Variants:**
- Status: success, warning, error, info, neutral
- Size: sm, md, lg
- Style: solid, outline, subtle

**Files to create:**
- `app/components/Badge/Badge.tsx`
- `app/components/Badge/Badge.stories.tsx`
- `app/components/Badge/index.ts`

---

#### [P1-2] Spinner Component
**Labels:** `atom`, `component`, `priority:high`
**Blocked by:** P0-1
**Blocks:** P2-1

**Description:**
Create loading spinner/indicator component.

**Variants:**
- Size: sm, md, lg
- Color: primary, white, inherit

---

#### [P1-3] Avatar Component
**Labels:** `atom`, `component`, `priority:medium`
**Blocked by:** P0-1
**Blocks:** P6-1

**Description:**
Create Avatar component for user images/initials.

**Variants:**
- Size: xs, sm, md, lg, xl
- Shape: circle, rounded
- Fallback: initials, icon

---

#### [P1-4] Divider Component
**Labels:** `atom`, `component`, `priority:low`
**Blocked by:** P0-1
**Blocks:** Nothing

**Description:**
Create simple divider/separator component.

---

### PHASE 2: Core Molecules

#### [P2-1] Modal Component
**Labels:** `molecule`, `component`, `priority:critical`
**Blocked by:** P1-2
**Blocks:** P4-3, P5-9, P7-4

**Description:**
Create Modal/Dialog component for overlays.

**Features:**
- Animated entry/exit
- Backdrop dismiss option
- Header, body, footer slots
- Size variants

---

#### [P2-2] Toast Component
**Labels:** `molecule`, `component`, `priority:high`
**Blocked by:** P1-1
**Blocks:** Nothing

**Description:**
Create Toast/Snackbar for notifications.

**Features:**
- Auto-dismiss with duration
- Action button option
- Queue management
- Position options

---

#### [P2-3] Tabs Component
**Labels:** `molecule`, `component`, `priority:medium`
**Blocked by:** P1-1
**Blocks:** P4-5, P5-10

**Description:**
Create Tabs component for content switching.

---

#### [P2-4] FilterBar Component
**Labels:** `molecule`, `component`, `priority:medium`
**Blocked by:** P1-1
**Blocks:** P4-4, P5-8

**Description:**
Create FilterBar with chips/toggles for list filtering.

---

#### [P2-5] ConfirmationDialog Component
**Labels:** `molecule`, `component`, `priority:medium`
**Blocked by:** P2-1
**Blocks:** P5-9, P7-4

---

### PHASE 3: Data Molecules

#### [P3-1] StatCard Component
**Labels:** `molecule`, `data`, `priority:high`
**Blocked by:** P1-1
**Blocks:** P4-5, P5-5

**Description:**
Display key metrics (price, quantity, percentage).

---

#### [P3-2] PriceBreakdown Component
**Labels:** `molecule`, `data`, `priority:high`
**Blocked by:** Nothing
**Blocks:** P5-9, P7-3

**Description:**
Show itemized price breakdown with totals.

---

### PHASE 4: Fish Domain

#### [P4-1] FishCard Component
**Labels:** `organism`, `domain:fish`, `priority:high`
**Blocked by:** P1-1, P3-1
**Blocks:** P4-3, P4-4

**Description:**
Card displaying fish information (species, weight, grade, price).

---

#### [P4-2] FisheryCard Component
**Labels:** `organism`, `domain:fish`, `priority:high`
**Blocked by:** P1-1
**Blocks:** P4-5

**Description:**
Card displaying fishery/boat information.

---

### PHASE 5: Auction Domain

#### [P5-1] CountdownTimer Component
**Labels:** `organism`, `domain:auction`, `priority:critical`
**Blocked by:** Nothing
**Blocks:** P5-3

**Description:**
Reusable countdown timer with days/hours/mins/secs.

---

#### [P5-2] BidStatusBadge Component
**Labels:** `organism`, `domain:auction`, `priority:high`
**Blocked by:** P1-1
**Blocks:** P5-4

**Description:**
Badge showing bid status (pending, won, outbid, expired).

---

#### [P5-4] BidCard Component
**Labels:** `organism`, `domain:auction`, `priority:critical`
**Blocked by:** P5-2, P3-2
**Blocks:** P5-6, P5-9

**Description:**
Card showing bid details with status, amount, fish info.

---

### PHASE 6: User Domain

#### [P6-1] UserProfileCard Component
**Labels:** `organism`, `domain:user`, `priority:medium`
**Blocked by:** P1-3, P1-1
**Blocks:** Nothing

---

### PHASE 7: Operations Domain

#### [P7-1] DeliveryTrackingPanel Component
**Labels:** `organism`, `domain:operations`, `priority:medium`
**Blocked by:** P4-1, P5-4
**Blocks:** P7-4

---

## Parallel Work Streams

### Stream A: Foundation (1 agent)
```
P0-1 → P0-3
```

### Stream B: Core Components (2 agents)
```
Agent B1: P1-1 → P1-2 → P2-1 → P2-5
Agent B2: P1-3 → P1-4 → P2-2 → P2-3
```

### Stream C: Data Components (1 agent)
```
P3-1 → P3-2 → P3-3 → P3-4 → P3-5
```

### Stream D: Fish Domain (1 agent)
```
P4-1 → P4-3 → P4-4
P4-2 → P4-5 (after P4-4)
```

### Stream E: Auction Domain (2 agents)
```
Agent E1: P5-1 → P5-3 → P5-5 → P5-8 → P5-10
Agent E2: P5-2 → P5-4 → P5-6 → P5-7 → P5-9
```

### Stream F: User Domain (1 agent)
```
P6-1 → P6-2 → P6-3
```

### Stream G: Operations Domain (1 agent)
```
P7-1 → P7-2 → P7-3 → P7-4 → P7-5
```

---

## Recommended Execution Order

### Week 1: Foundation + Core Atoms
- **All agents:** P0-1, P0-2, P0-3 in parallel
- **Then:** P1-1, P1-2, P1-3, P1-4 in parallel

### Week 2: Molecules + Start Domains
- **Stream B:** P2-1, P2-2, P2-3
- **Stream C:** P3-1, P3-2, P3-3
- **Stream D:** P4-1, P4-2 (can start once P1-1 done)
- **Stream E:** P5-1, P5-2 (can start once P1-1 done)

### Week 3: Domain Organisms
- **Stream D:** P4-3, P4-4, P4-5
- **Stream E:** P5-3, P5-4, P5-5, P5-6
- **Stream F:** P6-1, P6-2, P6-3

### Week 4: Complex Organisms + Integration
- **Stream E:** P5-7, P5-8, P5-9, P5-10
- **Stream G:** P7-1, P7-2, P7-3, P7-4, P7-5

---

## Success Metrics

- [ ] All components have Storybook stories
- [ ] All components follow folder structure pattern
- [ ] All components use seaside color palette
- [ ] All domain components match kessenuma functionality
- [ ] Design system is coherent and cohesive
