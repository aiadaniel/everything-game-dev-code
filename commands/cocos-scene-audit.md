---
description: Audit Cocos Creator scenes, content structure, and composition patterns.
---
# /cocos-scene-audit

## Purpose

Audit Cocos Creator 3.x scenes for content structure, composition patterns, node hierarchy, and performance. Produces a scene-by-scene report with improvement recommendations.

## Use When

* Before a major release to ensure all scenes are optimized
* After a level design pass to verify scene composition standards
* When onboarding new level designers to review their work
* Performance profiling shows scene-specific frame drops

## Invokes Agents

* cocos-reviewer
* qa-lead

## Required Skills

* cocos-project-structure
* cocos-testing

## Expected Output

* A structured result that can be reviewed, acted on, or handed off.
* Clear assumptions, risks, and open questions where relevant.
* Updated documentation or follow-up tasks when the command changes project understanding.

## Cocos Creator-Specific Guidance

* Check node hierarchy depth: scenes with > 10 levels of nesting may indicate poor organization.
* Verify prefab usage: are repeated elements (enemies, UI items, collectibles) using prefabs or duplicated manually?
* Audit component count per node: nodes with > 5 components may be doing too much.
* Check for editor-only references: scenes should not depend on editor state or global singletons.
* Verify `resources.load()` calls in scene scripts: are they loading assets that should be in the scene by default?
* Check for orphaned nodes: nodes that are never referenced by any script.
* Validate cross-scene dependencies: does this scene assume another scene already loaded certain managers?

## Notes

* Keep engine-neutral commands free of engine-specific implementation detail unless an engine-specific command is being called.
* Escalate to the relevant reviewer or specialist when risks exceed the command's normal scope.
