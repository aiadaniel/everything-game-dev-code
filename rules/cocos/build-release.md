# Cocos Creator Build Release

Extends `rules/common/build-release.md` with Cocos Creator-specific rules.

## Purpose

Define build, packaging, and release workflows for Cocos Creator 3.x projects.

## Scope

Applies to all platform builds (web-mobile, web-desktop, iOS, Android, Windows, Mac, HarmonyOS).

## Build Rules

- Set build target and platform-specific settings in `settings/v2/packages/builder.json`.
- Web builds should use web-mobile template; verify on real devices not just desktop browsers.
- Native builds require NDK/SDK versions documented in the project README.
- Bundle name and version must be set in the build panel and match the release tag.
- Enable MD5 cache for web builds; serve with proper cache headers.

## Build Pipeline

- Pre-build: run tests, lint TypeScript, verify asset integrity.
- Build: configure platform, compression, and module settings; execute build.
- Post-build: verify the build output loads correctly; run smoke tests on target platform.
- Native builds: generate signed APK/IPA; test on a physical device.

## Platform-Specific Notes

- **Web**: Ensure `index.html` loads correctly; test WebGL context loss recovery.
- **iOS**: Xcode project generated under `build/ios/`; use proper provisioning profiles.
- **Android**: Android Studio project under `build/android/`; set `minSdkVersion` and `targetSdkVersion`.
- **Desktop**: Verify window resolution, fullscreen toggle, and input handling.

## Release Checklist

- Version bumped in `project.json` and visible in the build.
- All tests pass on target platform.
- Assets compressed appropriately for the platform.
- No debug UI or development-only features visible.
- Crash reporting and analytics initialized (if applicable).

## Done Criteria

Build is ready when the release artifact passes smoke tests on every target platform.
