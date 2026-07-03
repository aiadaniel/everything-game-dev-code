---
description: Review a Cocos Creator project for structure, architecture, maintainability, and risk.
---
# /cocos-review

## Purpose

Review a Cocos Creator 3.x project for structure, architecture, maintainability, and risk. Produces a comprehensive review report covering project layout, component design, performance, asset pipeline, and build health.

## Use When

* Pre-production code review before a major milestone
* Post-feature review to ensure quality before merging
* Periodic health check of an ongoing project
* Before handing off a project to a new team or external partner

## Invokes Agents

* cocos-reviewer
* code-reviewer

## Required Skills

* cocos-project-structure
* cocos-coding-standards

## Expected Output

* A structured result that can be reviewed, acted on, or handed off.
* Clear assumptions, risks, and open questions where relevant.
* Updated documentation or follow-up tasks when the command changes project understanding.

## Cocos Creator-Specific Guidance

* Review `assets/` directory structure: are scripts organized by feature, not by type?
* Check component design: are `@ccclass` and `@property` used correctly? Are components single-responsibility?
* Audit `update()` usage: are there components with unnecessary per-frame logic?
* Verify node pooling is used for frequently created/destroyed objects.
* Check asset import settings: are textures compressed correctly per platform? Are audio formats appropriate?
* Review scene files: are they self-contained? Is the node hierarchy too deep?
* Validate build configuration: are the right engine modules enabled? Are platform SDK paths correct?

## Notes

* Keep engine-neutral commands free of engine-specific implementation detail unless an engine-specific command is being called.
* Escalate to the relevant reviewer or specialist when risks exceed the command's normal scope.
