# Cocos Creator Qa

Extends `rules/common/qa.md` with Cocos Creator-specific rules.

## Purpose

Define quality assurance rules for Cocos Creator 3.x projects.

## Scope

Applies to testing, bug tracking, performance validation, and release readiness.

## QA Process

- Every feature must have acceptance criteria defined before implementation begins.
- Bugs are triaged into: blocker (crashes/data loss), major (broken feature), minor (visual/cosmetic), trivial.
- Blocker bugs must be fixed before release; major bugs require sign-off from producer.

## Cocos Creator-Specific QA

- Verify that scenes load correctly on all target platforms, not just in the editor.
- Test asset bundles load successfully on first launch and after cache clear.
- Verify that `resources.load()` calls resolve correctly on all platforms.
- Test WebGL context loss recovery on web builds.
- Test Android Activity lifecycle (pause/resume/destroy) on native builds.

## Regression Testing

- Maintain a regression test checklist for core gameplay loops.
- Automate regression tests where possible; manually verify platform-specific behaviors.
- Every build must pass the regression suite before being considered release-ready.

## Done Criteria

QA is complete when all acceptance criteria are verified, no blocker bugs remain, and the regression suite passes on all target platforms.
