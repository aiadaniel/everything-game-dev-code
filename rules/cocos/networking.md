# Cocos Creator Networking

Extends `rules/common/networking.md` with Cocos Creator-specific rules.

## Purpose

Define networking rules for Cocos Creator 3.x projects, including HTTP, WebSocket, and native socket communication.

## Scope

Applies to client-server communication, multiplayer, and asset downloading.

## Transport Rules

- Use `XMLHttpRequest` or `fetch` for REST API calls; prefer async/await patterns.
- Use `WebSocket` (built-in `cc.WebSocket`) for real-time communication.
- For native platforms, Cocos Creator's JSB provides native socket when WebSocket is insufficient.

## Protocol Rules

- All network calls must have timeout handling; default timeout of 10s for HTTP, 30s for asset downloads.
- Implement automatic retry with exponential backoff for transient failures.
- Serialize/deserialize messages through a typed protocol layer; avoid raw JSON in gameplay code.

## Security Rules

- Use HTTPS/WSS exclusively in production builds.
- Validate server certificates on native platforms.
- Never hardcode API keys or secrets in client-side TypeScript; use a config file that can be injected at build time.
- Sanitize all server-received data before using it in game logic.

## Offline Handling

- Detect network state changes and queue outgoing messages when offline.
- Display appropriate UI feedback for connection loss and reconnection attempts.
- Implement a reconnection state machine: disconnected → reconnecting → connected → (timeout → offline).

## Done Criteria

Networking is correct when the game gracefully handles connection loss, timeout, and malformed data on all target platforms.
