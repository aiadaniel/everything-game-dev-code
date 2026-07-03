# Cocos Creator Telemetry

Extends `rules/common/telemetry.md` with Cocos Creator-specific rules.

## Purpose

Define telemetry and analytics rules for Cocos Creator 3.x projects.

## Scope

Applies to gameplay analytics, performance telemetry, error reporting, and player behavior tracking.

## Telemetry Rules

- Use a typed event schema for all telemetry events; validate before sending.
- Batch events and send periodically (every 30s or on scene transition), not on every action.
- Queue events when offline; flush on reconnection.
- Include session ID, build version, platform, and device info in every event payload.

## Performance Telemetry

- Track FPS, frame time spikes, memory usage, and draw calls on a per-scene basis.
- Report GC pauses > 10ms and asset load times > 1s.
- Monitor WebSocket/HTTP error rates and latency percentiles.

## Privacy Rules

- Comply with GDPR/CCPA: provide opt-out mechanism, data deletion API, and privacy policy.
- Do not collect PII (personally identifiable information) without explicit consent.
- Anonymize device IDs and user IDs before sending to analytics services.

## Done Criteria

Telemetry is correct when the production build reliably reports key metrics without impacting frame rate, and all privacy regulations are satisfied.
