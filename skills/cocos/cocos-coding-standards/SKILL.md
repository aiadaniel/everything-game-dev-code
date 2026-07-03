---
name: cocos-coding-standards
description: Define coding standards and idioms for Cocos Creator game code.
origin: everything-game-dev-code
category: cocos
---
# Cocos Coding Standards

## Purpose

Define coding standards and idioms for Cocos Creator game code.

## Use When

* Writing new TypeScript components for Cocos Creator
* Reviewing existing code for style compliance
* Setting up a new Cocos Creator project with coding standards
* Refactoring legacy code to meet modern patterns

## Inputs

* TypeScript source files under `assets/scripts/`
* `tsconfig.json` configuration
* Project coding style guide (if exists)

## Process

1. Verify `tsconfig.json` enables strict mode and targets ES2020+
2. Check that all component classes use `@ccclass` decorator and extend `Component`
3. Verify `@property` decorators include explicit defaults and tooltips
4. Ensure `onLoad()` is used for initialization, `start()` for cross-component setup
5. Check that `update()` is only used when per-frame logic is necessary
6. Verify `onDestroy()` cleans up event listeners, timers, and references
7. Confirm naming conventions: PascalCase for classes, camelCase for nodes
8. Check for cached `getComponent()` references instead of per-frame calls

## Outputs

* Coding standards compliance report
* List of violations with file paths, line numbers, and suggested fixes
* Refactoring recommendations for components that violate single-responsibility

## Quality Bar

* is usable by contributors without tribal knowledge
* respects quality bars and runtime constraints together
* defines validation and ownership for the work it produces

## Common Failure Modes

* Using `var` or `require()` instead of `const`/`let` and `import`/`export`
* Forgetting `@ccclass` decorator, causing the component to not appear in the editor
* Placing heavy logic in `update()` instead of using events or timers
* Calling `getComponent()` or `find()` every frame instead of caching
* Not cleaning up event listeners in `onDestroy()`, causing memory leaks
* Giant components handling multiple unrelated concerns (God component anti-pattern)

## Related Agents

* cocos-reviewer
* architect

## Related Commands

* cocos-setup
* cocos-review
* cocos-build-fix

## Notes

* Keep this skill aligned with the relevant rules layer and current project documentation.
* If engine-specific constraints materially change the workflow, hand off to the matching engine skill or engine-specific reviewer.
