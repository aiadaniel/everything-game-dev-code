# Generated MCP configs

<!-- Generated from ../mcp-servers.json by scripts/generate-mcp-configs.js. Do not edit by hand; run `npm run sync:mcp`. -->

These files let **any MCP-capable harness** use the scaffold's MCP servers. They are
generated from the single source of truth ([../mcp-servers.json](../mcp-servers.json)) —
edit that catalog and run `npm run sync:mcp`, never edit these files directly.

MCP is an open, vendor-neutral protocol, so every server here works with any model
behind a compatible client. Pick the file for your harness:

| Harness | File | Where it goes |
|---|---|---|
| Claude Code | [mcp.json](./mcp.json) | copy to `.mcp.json` at your project root (or merge with `claude mcp add`) |
| Cursor | [mcp.json](./mcp.json) | copy to `.cursor/mcp.json` |
| Kiro | [mcp.json](./mcp.json) | copy to `.kiro/settings/mcp.json` |
| Windsurf / Cline / VS Code / others | [mcp.json](./mcp.json) | the `mcpServers` shape is the de-facto standard — paste into the client's MCP config |
| Codex | [codex.toml](./codex.toml) | merge the `[mcp_servers.*]` blocks into `.codex/config.toml`, or run `codex mcp add` (below) |
| OpenCode | [opencode.mcp.json](./opencode.mcp.json) | merge the `mcp` block into `.opencode/opencode.json` |

## Runnable servers included

- `blender` — Drive a running Blender instance to inspect scenes and run bpy Python for 3D asset work: build/normalize geometry, set scale/axis/pivot, assign materials, pull PolyHaven/Sketchfab assets, validate against import rules, and export GLB/FBX.
- `fal-media` — Interactive AI asset generation via the fal.ai model catalog: images, skyboxes, 3D models, sound effects, music, speech, and video.
- `playwright` — Drive a real browser to playtest and QA web (HTML5) builds: navigate, click/drag/type, capture screenshots, and read console + page errors.

Env values are emitted as `${VAR}` so secrets are read from your environment at
launch and never written to disk. Set the variable (e.g. `FAL_KEY`) before use.

### Codex one-liners

```bash
codex mcp add blender -- uvx blender-mcp
codex mcp add fal-media -- npx -y fal-ai-mcp-server
codex mcp add playwright -- npx -y @playwright/mcp@latest
```

## Configure per team (not generated)

These catalog entries still use a `<your-...-command>` placeholder, so they are
intentionally **not** emitted here — give them a real command in
[../mcp-servers.json](../mcp-servers.json) and re-run `npm run sync:mcp`:

`ci-builds`, `fetch-docs`, `filesystem`, `git`, `github`, `godot-docs`, `issue-tracker`, `ripgrep`, `storefront-docs`, `telemetry`, `unity-docs`, `unity-package-registry`, `unreal-docs`
