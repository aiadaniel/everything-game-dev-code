---
name: cocos-project-structure
description: Organize a Cocos Creator project so source, assets, configuration, and tests stay predictable.
origin: everything-game-dev-code
category: cocos
---

# Cocos Project Structure

## Purpose

Organize a Cocos Creator project so source, assets, configuration, and tests stay predictable.

## Use When

* Initializing a new Cocos Creator 3.x project
* Auditing an existing project for structural compliance
* Onboarding a new team member who needs to understand the project layout
* Before a major feature branch to ensure isolation

## Inputs

* Project root directory
* Target platforms (web, iOS, Android, desktop)
* Feature list or GDD (optional but recommended)

## Process

1. Verify `project.json` exists and declares the correct Cocos Creator version
2. Check that `assets/` contains `scripts/`, `scenes/`, `prefabs/`, `textures/`, `audio/` subdirectories
3. Verify `settings/` is under version control and `library/`, `temp/`, `build/` are gitignored
4. Confirm that scripts are organized by feature domain, not by type
5. Ensure `resources/` is used sparingly (only for dynamically loaded assets)
6. Check that scene files are self-contained and don't depend on editor state
7. Validate `tsconfig.json` has `strict: true`

## Outputs

* Project structure compliance report
* List of violations with file paths and recommended fixes
* Updated `.gitignore` if missing required entries
* Directory migration plan if reorganization is needed

## Quality Bar

* is usable by contributors without tribal knowledge
* respects quality bars and runtime constraints together
* defines validation and ownership for the work it produces

## Common Failure Modes

* Placing all scripts in a flat `assets/scripts/` folder without feature organization
* Committing `library/` or `temp/` to version control, causing conflicts and bloat
* Dumping all assets into `resources/`, causing excessive memory usage on launch
* Ignoring `settings/` from version control, leading to inconsistent editor configurations
* Mixing test assets and production assets in the same directories

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
