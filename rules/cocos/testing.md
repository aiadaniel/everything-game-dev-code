# Cocos Creator Testing

Extends `rules/common/testing.md` with Cocos Creator-specific rules.

## Purpose

Define testing strategy and expectations for Cocos Creator 3.x projects.

## Scope

Applies to unit tests, integration tests, and editor-based testing.

## Testing Layers

- **Unit tests**: Pure TypeScript logic tested with Jest or Vitest outside the editor.
- **Component tests**: Test individual components in isolation using Cocos Creator's test framework.
- **Integration tests**: Verify component interactions and scene loading in the editor test runner.
- **Manual tests**: UI/UX, input handling, and platform-specific behavior verified on device.

## Unit Test Rules

- Keep game logic in plain TypeScript classes separate from `Component` so they can be tested without the engine.
- Use dependency injection to mock engine services (`cc.director`, `cc.assetManager`, etc.).
- Tests must run in CI without requiring Cocos Creator editor.

## Editor Test Rules

- Use Cocos Creator's built-in test framework for scene and component tests.
- Place test scenes in a dedicated `assets/tests/` folder, excluded from production builds.
- Test component lifecycle: `onLoad()` → `start()` → `update()` → `onDestroy()`.

## Platform Testing

- Run automated tests on all target platforms in CI where possible.
- For native platforms, maintain a smoke test checklist for manual verification.
- Test on the lowest-spec target device for each platform.

## Done Criteria

Testing is adequate when core gameplay logic has > 70% unit test coverage, critical paths have integration tests, and every build passes CI before release.
