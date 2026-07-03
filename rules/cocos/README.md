# Cocos Creator

Extends `rules/common/` with Cocos Creator-specific conventions.

## Layering
- `rules/common/` defines engine-neutral policy.
- `rules/cocos/` adds Cocos Creator-only implementation rules.
- Cocos Creator rules must never prescribe patterns from the other engine layers.

## Coverage
- asset pipeline
- build release
- coding style
- documentation
- memory
- networking
- patterns
- performance
- project structure
- qa
- telemetry
- testing
- ui
- version control
