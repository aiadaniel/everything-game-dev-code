# Cocos Creator Patterns

Extends `rules/common/patterns.md` with Cocos Creator-specific rules.

## Purpose

Define reusable architecture and gameplay patterns for Cocos Creator 3.x projects.

## Scope

Applies to component design, scene management, and system architecture.

## Component Patterns

- **Delegate pattern**: Heavy logic extracted into non-component manager classes, components act as thin adapters.
- **Service locator**: Global systems (audio, input, network) registered on a persistent node, accessed via `find()` once in `onLoad()`.
- **Event-driven**: Components communicate via `EventTarget` or custom event bus; avoid direct cross-component method calls.
- **Pooling**: Reuse frequently instantiated/destroyed nodes via `NodePool` for bullets, particles, UI items.

## Scene Management

- Use `director.loadScene()` for major transitions; use `addPersistRootNode()` for cross-scene managers.
- Scene transitions should be managed by a dedicated `SceneDirector` component.
- Prefer additive scene loading for UI overlays when supported by the engine version.

## Data Flow

- Game state stored in plain TypeScript objects/interfaces, not on components directly.
- Components read state from a shared data model; they do not own authoritative state.
- Save/load serializes the data model, not the scene graph.

## Anti-Patterns

- God components that manage too many unrelated concerns.
- Tight coupling via `getComponent()` chains across distant nodes.
- Using `schedule()` or `scheduleOnce()` for logic that should be event-driven.
- Storing game state in `@property` fields that get serialized into scenes.

## Done Criteria

Patterns are correct when a new developer can trace a feature from input to output without reading every componen
