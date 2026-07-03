# Cocos Creator Version Control

Extends `rules/common/version-control.md` with Cocos Creator-specific rules.

## Purpose

Define version control rules for Cocos Creator 3.x projects using Git.

## Scope

Applies to `.gitignore`, `.meta` files, scene/prefab merging, and CI integration.

## Gitignore Rules

Always ignore:

- `library/` — imported asset cache, regenerated on open
- `temp/` — editor temporary files
- `local/` — local user preferences
- `profiles/` — per-user editor settings
- `build/` — build output
- `native/` (in most cases) — generated native project files

Always track:

- `assets/` — all game content and scripts
- `settings/` — project-wide configuration
- `project.json` — project manifest
- `tsconfig.json` — TypeScript configuration
- `package.json` (if using npm for tooling)
- `.gitignore`

## Meta File Rules

- `.meta` files are critical; they contain import settings and GUIDs for assets.
- Always commit `.meta` files alongside their source assets.
- Never manually edit `.meta` files; use the editor to modify import settings.
- Resolve `.meta` conflicts by accepting the version that matches the intended import settings.

## Scene and Prefab Merging

- Scenes (`.scene`) and prefabs (`.prefab`) are JSON; Git can merge them but conflicts are fragile.
- Use text-based diff tools to resolve scene/prefab conflicts carefully.
- Prefer small, focused scenes and prefabs to reduce merge conflict surface.
- Use Cocos Creator's built-in version control integration when available.

## Done Criteria

Version control is correct when the project can be cloned, opened without errors, and all assets resolve correctly on any team member's machine.
