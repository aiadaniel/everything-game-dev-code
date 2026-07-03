# Cocos Creator Documentation

Extends `rules/common/documentation.md` with Cocos Creator-specific rules.

## Purpose

Define documentation standards for Cocos Creator 3.x projects.

## Scope

Applies to code comments, README files, component documentation, and project setup guides.

## Code Documentation

- Every public component class must have a JSDoc comment describing its purpose and usage.
- Every `@property` field must have a tooltip and, for complex types, a JSDoc comment.
- Public methods on manager/service classes must document parameters, return values, and side effects.

## Project Documentation

- `README.md` at project root must include: engine version, setup instructions, build commands, and team contacts.
- Document the project's `settings/` configuration choices (engine modules enabled, physics config, etc.).
- Maintain a `CHANGELOG.md` tracking major feature additions, breaking changes, and version bumps.

## Scene Documentation

- Each scene file should have a corresponding README or comment in a `SceneInfo` component describing its purpose, entry points, and dependencies.
- Document the expected flow: which scene loads next, which data is required, and which managers must be present.

## Done Criteria

Documentation is sufficient when a new developer can set up the project, understand the scene flow, and contribute a feature within their first day.
