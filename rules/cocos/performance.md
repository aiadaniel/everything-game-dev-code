# Cocos Creator Performance

Extends `rules/common/performance.md` with Cocos Creator-specific rules.

## Purpose

Define performance targets, profiling discipline, and optimization rules for Cocos Creator 3.x projects.

## Scope

Applies to runtime performance on all target platforms (web, mobile, desktop).

## Frame Budget

- Target 60 FPS on desktop; 30 FPS minimum on low-end mobile.
- 16ms budget per frame on desktop; main thread budget of 10ms for game logic.
- Draw calls: target < 100 on mobile, < 300 on desktop.

## Rendering Rules

- Use static batching for non-moving geometry; dynamic batching for small moving objects.
- Atlas textures aggressively; avoid single-texture draw calls.
- Limit particle system max particles; pool particle nodes.
- Use LOD groups for complex 3D models when targeting mobile.

## Memory Rules

- Release unused textures, audio clips, and prefabs when scenes unload.
- Use `assetManager.releaseAsset()` for dynamically loaded assets.
- Monitor `cc.sys.garbageCollect()` frequency; avoid allocation spikes in hot paths.
- Pool frequently created nodes (bullets, enemies, UI elements).

## Scripting Rules

- Avoid `update()` on components that don't need per-frame logic.
- Use `scheduleOnce()` or timers instead of polling in `update()`.
- Cache `getComponent()` results; avoid calling it every frame.
- Use `NodePool` for temporary objects; avoid `instantiate`/`destroy` in gameplay loops.

## Profiling

- Use Cocos Creator's built-in profiler (FPS, draw calls, memory) during development.
- Profile on the lowest target device, not just in the editor.
- Set incremental performance budgets per milestone; don't optimize prematurely.

## Done Criteria

Performance is acceptable when the game maintains target frame rate on the lowest-spec target device under normal gameplay load.
