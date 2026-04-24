# Architecture

This MVP now follows a simple layered frontend architecture so later iterations can add new dating-app inputs, backend sync, and collaboration features without reopening one giant component.

## Directory layout

```text
src/
  components/   # Small reusable UI pieces with no product logic
  domain/       # Static config and pure business rules
  features/     # Screen-level sections and panels
  state/        # Reducer, persistence, and action wrappers
```

## Rules

1. `domain/` never imports React.
2. `state/` owns persistence and mutations.
3. `features/` render sections and receive data through props.
4. `components/` stay leaf-level and reusable.
5. `App.jsx` only composes sections and wires derived data to the UI.

## State model

- `profile`: user goals, budget preference, and profile constraints
- `tasks`: weekly operating checklist
- `pipeline`: current match/opportunity list across apps
- `reviews`: post-date review history
- `filters`: current map filter state
- `selectedVenueId`: current venue focus
- `reviewDraft`: in-progress review form state

## Extension strategy

When new work arrives, extend the architecture in these places:

- New connector or import flow:
  add adapter logic beside `state/` later, not inside feature panels.
- New product rule:
  add pure functions under `domain/logic.js`.
- New screen section:
  create a new panel in `features/`.
- Shared small control:
  add to `components/`.

## Why this shape

The product is moving toward a cross-app dating copilot. That means input sources will grow over time: screenshot OCR, pasted chat, share sheet imports, backend sync, and maybe human coaching. Keeping domain rules separate from UI is the main maintenance win.
