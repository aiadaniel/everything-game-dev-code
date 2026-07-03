---
name: cocos-testing
description: Define automated and manual testing expectations for Cocos Creator projects.
origin: everything-game-dev-code
category: cocos
---
# Cocos Testing

## Purpose

Define automated and manual testing expectations for Cocos Creator projects.

## Use When

* Setting up automated testing for a Cocos Creator project
* Writing unit tests for game logic
* Debugging test failures in CI
* Planning test coverage for a new feature

## Inputs

* TypeScript source files under `assets/scripts/`
* Test configuration (Jest/Vitest config, Cocos Creator test framework config)
* CI pipeline configuration

## Process

1. Separate pure game logic from Component classes for unit testability
2. Configure Jest or Vitest with TypeScript support for unit tests
3. Mock Cocos Creator engine APIs (`cc.director`, `cc.assetManager`, etc.) for unit tests
4. Write unit tests covering core game logic, state machines, and data transformation
5. Set up Cocos Creator's built-in test framework for component and scene tests
6. Create test scenes in `assets/tests/` excluded from production builds
7. Configure CI to run unit tests on every push and integration tests on PR
8. Maintain a platform-specific smoke test checklist

## Outputs

* Unit test suite with coverage report
* Integration test scenes and test runner configuration
* CI pipeline configuration
* Test coverage report with uncovered paths highlighted

## Quality Bar

* is usable by contributors without tribal knowledge
* respects quality bars and runtime constraints together
* defines validation and ownership for the work it produces

## Common Failure Modes

* Writing tests that depend on the Cocos Creator editor runtime, making them impossible to run in CI
* Tight coupling between game logic and Component classes preventing unit testing
* Not mocking engine APIs, causing tests to fail with "cc is not defined" errors
* Test scenes accidentally included in production builds, bloating the final package
* Flaky tests due to race conditions in async asset loading or scene transitions
* Tests that pass in the editor but fail on actual devices due to platform differences

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
