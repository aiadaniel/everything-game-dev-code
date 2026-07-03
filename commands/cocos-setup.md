---
description: Set up or normalize a Cocos Creator project according to the scaffold rules.
---
# /cocos-setup

## Purpose

Set up or normalize a Cocos Creator 3.x project according to the scaffold rules. Ensures project structure, coding standards, build configuration, and asset pipeline follow best practices.

## Use When

* Creating a new Cocos Creator project from scratch
* Onboarding an existing project to the scaffold conventions
* Auditing and fixing project structure after team growth or refactoring
* Verifying that a project meets the minimum quality bar before production

## Invokes Agents

* cocos-reviewer
* technical-design-lead
* build-engineer

## Required Skills

* cocos-project-structure
* cocos-coding-standards

## Expected Output

* A structured result that can be reviewed, acted on, or handed off.
* Clear assumptions, risks, and open questions where relevant.
* Updated documentation or follow-up tasks when the command changes project understanding.

## Cocos Creator-Specific Guidance

* Verify the project is Cocos Creator 3.x (not 2.x); the `project.json` format differs between major versions.
* Check `tsconfig.json` has `strict: true`; many Cocos Creator templates ship with lax settings.
* Ensure `settings/v2/packages/engine.json` enables only the engine modules the project actually uses.
* Validate that `.gitignore` excludes `library/`, `temp/`, `local/`, `profiles/`, and `build/`.
* Confirm that the project opens without errors in the target Cocos Creator editor version.

## Notes

* Keep engine-neutral commands free of engine-specific implementation detail unless an engine-specific command is being called.
* Escalate to the relevant reviewer or specialist when risks exceed the command's normal scope.
