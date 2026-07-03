# Cocos Creator Coding Style

Extends `rules/common/coding-style.md` with Cocos Creator-specific rules.

## Purpose

Define TypeScript coding standards and component idioms for Cocos Creator 3.x projects.

## Scope

Applies to all TypeScript source files under `assets/scripts/`.

## Language Rules

- Use TypeScript strictly; avoid plain JavaScript.
- Enable strict mode in `tsconfig.json` (`strict: true`).
- Prefer `import`/`export` ES modules over `require()`.
- Use `const` and `let`; never `var`.

## Component Rules

- Every component class should extend `Component` and be decorated with `@ccclass`.
- Use `@property` decorator for all serialized fields; provide explicit defaults and tooltips.
- Keep components small and single-responsibility. A component with more than 5-6 `@property` fields should be split or refactored.
- `onLoad()` for initialization that depends on serialized data; `start()` for logic that depends on other components being initialized.
- `update(dt)` must be lightweight; avoid allocations and heavy computation in per-frame updates.
- Use `onDestroy()` to clean up event listeners, timers, and external references.

## Naming Conventions

- Component class names: PascalCase, suffixed with their role (e.g., `PlayerController`, `HealthComponent`, `EnemySpawner`).
- Node names in scene: camelCase describing purpose (e.g., `playerSpawn`, `healthBar`, `mainCamera`).
- File names: match the primary component class name (e.g., `PlayerController.ts`).
- Prefab names: PascalCase describing the entity (e.g., `EnemyGrunt.prefab`, `PowerUpStar.prefab`).

## Code Organization

- Avoid `find()` and `getComponent()` in `update()`; cache references in `onLoad()` or `start()`.
- Use `director.getScene()` sparingly; prefer dependency injection or component references.
- Prefer `EventTarget` / custom events over tight coupling between components.
- Separate data (plain objects/interfaces) from behavior (components).

## Done Criteria

Code is correct when it builds without errors, components are independently testable, and naming makes the scene graph self-documenting.
