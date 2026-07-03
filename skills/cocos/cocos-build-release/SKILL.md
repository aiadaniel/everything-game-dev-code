---
name: cocos-build-release
description: Define build, packaging, and release workflows for Cocos Creator projects.
origin: everything-game-dev-code
category: cocos
---
# Cocos Build Release

## Purpose

Define build, packaging, and release workflows for Cocos Creator projects.

## Use When

* Preparing a Cocos Creator project for production build
* Diagnosing build failures on any target platform
* Setting up CI/CD pipeline for Cocos Creator builds
* Configuring platform-specific build settings (iOS, Android, Web, Desktop)

## Inputs

* Cocos Creator project root
* Target platform list
* Build configuration (from `settings/v2/packages/builder.json`)
* Platform SDK paths (NDK, Xcode, etc.)

## Process

1. Verify `settings/v2/packages/builder.json` contains correct platform configurations
2. Check that all required engine modules are enabled for the target platform
3. Run TypeScript compilation check (`tsc --noEmit`)
4. Verify asset integrity: no missing references, correct import settings
5. Execute the build via Cocos Creator CLI or editor build panel
6. Validate build output: check file sizes, verify `index.html` (web) or project files (native)
7. Run smoke tests on the build output
8. For native builds: verify signing configuration and generate signed package

## Outputs

* Build success/failure report with error diagnostics
* Platform-specific build artifacts
* Smoke test results
* Release notes template with version and build number

## Quality Bar

* is usable by contributors without tribal knowledge
* respects quality bars and runtime constraints together
* defines validation and ownership for the work it produces

## Common Failure Modes

* Missing engine modules for the target platform (e.g., physics not enabled for mobile)
* Incorrect SDK paths causing native build failures (NDK, Xcode, Android SDK)
* Asset import settings incompatible with the target platform (wrong texture compression)
* TypeScript compilation errors that only appear during build (strict mode violations)
* Missing platform permissions (camera, microphone, storage) in native manifest files
* Web build serving with incorrect MIME types or missing CORS headers

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
