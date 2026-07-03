# Cocos Creator Ui

Extends `rules/common/ui.md` with Cocos Creator-specific rules.

## Purpose

Define UI development rules for Cocos Creator 3.x projects using the built-in UI system.

## Scope

Applies to all UI elements: widgets, layouts, prefabs, and UI interaction components.

## UI Structure Rules

- Organize UI prefabs under `assets/prefabs/ui/` by screen or feature.
- Use Canvas as the root for all UI; each screen gets its own Canvas or a child node.
- Use Widget component for responsive layout; avoid hardcoded pixel positions.
- Use Layout component (Grid, Horizontal, Vertical) for dynamic lists instead of manual positioning.

## UI Component Rules

- Use `cc.Button` for clickable elements; configure transition states (normal, hover, pressed, disabled).
- Use `cc.ScrollView` for scrollable content; pool scroll items for long lists.
- Use `cc.ProgressBar` for health, loading, and progress indicators.
- Use `cc.Toggle` and `cc.ToggleContainer` for radio groups and checkboxes.
- Use `cc.Slider` for volume, settings, and continuous input.

## UI Performance Rules

- Use sprite atlases for UI textures to reduce draw calls.
- Pool UI elements in scroll views; avoid creating/destroying items during scrolling.
- Set `cc.Canvas.optimization` for static UI that doesn't change per frame.
- Avoid nested canvases; each Canvas adds a draw call.

## UI Interaction Rules

- Use `cc.Event.EventTouch` for custom touch handling beyond built-in components.
- Implement input blocking layer to prevent double-tap and accidental multi-touch.
- Support keyboard navigation for desktop builds alongside touch input.

## Done Criteria

UI is correct when it renders correctly at all supported resolutions, maintains 60 FPS during scrolling, and responds to input within 100ms.
