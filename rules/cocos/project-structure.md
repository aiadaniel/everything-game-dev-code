
# Cocos Creator Project Structure

Extends `rules/common/project-structure.md` with Cocos Creator-specific rules.

## Purpose

Define how Cocos Creator 3.x projects are organized to keep source, assets, configuration, and tests predictable and maintainable.

## Scope

Applies to Cocos Creator 3.x projects using TypeScript as the primary scripting language.

## Directory Layout

- `assets/` — all game content: scenes, prefabs, scripts, textures, audio, animations, materials
- `assets/scripts/` — TypeScript source files, organized by feature or system domain
- `assets/scenes/` — `.scene` files, one per logical game screen or level
- `assets/prefabs/` — reusable `.prefab` templates organized by type (ui/, entities/, fx/)
- `assets/textures/` — image assets with appropriate import settings per platform
- `assets/audio/` — sound effects and music with correct AudioClip settings
- `assets/anims/` — animation clips, animator controllers, and timeline assets
- `assets/materials/` — material assets and effect files
- `settings/` — project-wide settings (engine modules, physics, rendering, build config)
- `extensions/` — custom editor extensions
- `build/` — build output (gitignored)
- `library/` — imported asset cache (gitignored)
- `temp/` — editor temporary files (gitignored)

## Rules

- Feature folders under `assets/scripts/` should contain all scripts, prefabs, and sub-assets for a single game feature.
- Shared utility scripts go in `assets/scripts/common/` or `assets/scripts/utils/`.
- Scene files should be self-contained: a scene should load without depending on editor state or global singletons.
- `resources/` folder (if used) should be reserved for dynamically loaded assets only; avoid dumping everything into it.
- Keep `settings/` under version control; never version `library/`, `temp/`, or `build/`.

## Done Criteria

Project structure is correct when a new team member can clone, open the project in Cocos Creator, and locate scripts, scenes, and assets by feature without searching.
