# Cocos Creator Asset Pipeline

Extends `rules/common/asset-pipeline.md` with Cocos Creator-specific rules.

## Purpose

Define how assets are imported, configured, and managed in Cocos Creator 3.x projects.

## Scope

Applies to textures, sprites, audio, 3D models, animations, fonts, and materials.

## Import Rules

- All assets must be placed inside the `assets/` directory.
- Import settings (texture format, compression, wrap mode) must be intentional and documented.
- Use `.meta` files for version control of import settings; never delete `.meta` files manually.
- Sprite frames should be extracted from texture atlases, not from individual textures, when they belong to the same UI or character set.

## Texture Rules

- 2D sprites: PNG with transparency; compressed to ASTC (iOS) or ETC2 (Android) on native platforms.
- UI textures: power-of-two dimensions; use sprite atlas for UI elements.
- 3D textures: use appropriate compression format per platform; generate mipmaps.
- Max texture size: 2048x2048 on mobile, 4096x4096 on desktop.

## Audio Rules

- Sound effects: short clips (< 5 seconds); use `.mp3` or `.ogg` format.
- Music: use `.mp3` with appropriate compression; stream long tracks.
- AudioClip load mode: `DOM Audio` for web, `Native Audio` for native platforms.

## 3D Asset Rules

- Models: use `.glb` or `.fbx` format; verify mesh, material, and animation import.
- Animations: verify animation clip names and lengths after import; use animation controller for complex state machines.
- Materials: use Cocos Creator's built-in PBR or unlit shaders; custom effects via `.effect` files.

## Done Criteria

Asset pipeline is correct when a clean build produces identical assets with the same import settings.
