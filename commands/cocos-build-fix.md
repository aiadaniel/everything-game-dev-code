---
description: Diagnose and resolve Cocos Creator build, packaging, or configuration issues.
---
# /cocos-build-fix

## Purpose

Diagnose and resolve Cocos Creator 3.x build, packaging, or configuration issues across all target platforms (web, iOS, Android, desktop).

## Use When

* A build fails with unclear error messages
* Platform-specific build issues (iOS signing, Android SDK, WebGL context)
* Asset import errors during build that don't appear in the editor
* TypeScript compilation errors that only manifest during the build step

## Invokes Agents

* cocos-reviewer
* build-engineer

## Required Skills

* cocos-build-release
* cocos-testing

## Expected Output

* A structured result that can be reviewed, acted on, or handed off.
* Clear assumptions, risks, and open questions where relevant.
* Updated documentation or follow-up tasks when the command changes project understanding.

## Cocos Creator-Specific Guidance

* Check `settings/v2/packages/builder.json` for correct platform configuration.
* Verify engine modules in `settings/v2/packages/engine.json` include all modules needed for the target platform.
* For native builds: verify NDK version (Android), Xcode version (iOS), and that SDK paths are valid.
* For web builds: check that `index.html` template is correct and all scripts are included.
* Check for asset import errors: some assets may import fine in the editor but fail during build due to platform-specific compression.
* Verify TypeScript compilation: run `tsc --noEmit` to catch errors before the build step.
* Check for missing platform permissions in native manifest files.

## Notes

* Keep engine-neutral commands free of engine-specific implementation detail unless an engine-specific command is being called.
* Escalate to the relevant reviewer or specialist when risks exceed the command's normal scope.
