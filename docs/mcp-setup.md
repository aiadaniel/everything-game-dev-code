# MCP Servers — Setup Guide

This scaffold ships a curated set of MCP (Model Context Protocol) servers so any
MCP-capable harness can extend the workflow with tools — browser playtesting,
AI asset generation, 3D DCC control, and more.

MCP is an open, vendor-neutral protocol, so every server here works with **any
model behind a compatible client** (Claude Code, Codex, Cursor, OpenCode, Kiro,
Windsurf, Cline, VS Code, …).

## How MCP is wired in this repo

There is one source of truth and a set of generated, ready-to-use configs:

- **Catalog (source of truth):** [../mcp-configs/mcp-servers.json](../mcp-configs/mcp-servers.json)
  — every recommended server, its purpose, when to use it, and install metadata.
  Edit this file, never the generated ones.
- **Generated configs:** [../mcp-configs/generated/](../mcp-configs/generated/)
  — harness-native files produced from the catalog by
  `node scripts/generate-mcp-configs.js` (`npm run sync:mcp`, drift-checked by
  `npm run validate:mcp`). See its
  [README](../mcp-configs/generated/README.md) for which file each harness uses.

Only servers with a real launch command are emitted as runnable. Catalog entries
that still carry a `<your-...-command>` placeholder are intentionally left for
each team to fill in.

## Adding the scaffold's servers to your harness

Most harnesses are **pre-wired**: the scaffold commits project-scoped MCP configs
in the locations these clients read, so opening the repo is enough — no copy step.

| Harness | Pre-wired? | Config (committed) |
|---|---|---|
| Claude Code | yes | `.mcp.json` (repo root) |
| Cursor | yes | `.cursor/mcp.json` |
| Kiro | yes | `.kiro/settings/mcp.json` |
| OpenCode | yes | `mcp` block in `.opencode/opencode.json` |
| Codex | one step | reads only global `~/.codex/config.toml`; run `codex mcp add` (below) or merge `generated/codex.toml` |
| Windsurf / Cline / VS Code / others | manual | paste `generated/mcp.json` (`mcpServers` is the de-facto standard) into the client's MCP config |

These live configs are generated from the catalog by `npm run sync:mcp` (Claude /
Cursor / Kiro) and `npm run sync:wrappers` (OpenCode), and drift-checked by
`npm run validate`. The files under `generated/` are per-format reference copies.

Configs are **portable** — they use bare `uvx` / `npx`, no machine paths — so the
launcher must be able to resolve those commands (see the Windows gotcha below).
Secrets are never written: env values are emitted as `${VAR}` and read from your
environment at launch. Set the variable (e.g. `FAL_KEY`) first.

> **Two kinds of servers.** Some servers are pure tools the harness launches
> (e.g. `playwright`, `fal-media`). Others — like `blender` — also need a
> companion application running with a listening add-on. "Connected" in your MCP
> list only means the MCP process started; the tool calls only succeed when the
> companion app is up. The Blender walkthrough below shows both halves.

## Worked example — Blender MCP (3D / DCC)

The `blender` server lets the assistant inspect a Blender scene and run `bpy`
Python: build/normalize geometry, set scale/axis/pivot, assign materials, pull
PolyHaven/Sketchfab assets, validate against import rules, and export GLB/FBX.
See its scope and limits in the catalog notes (geometry/export are solid;
rigging and animation are only assisted).

It has two halves that must talk to each other: **Blender + add-on** (the
server side) and the **MCP client** (your harness).

### 1. Blender side — install and start the add-on

1. Have **Blender 3.0+** installed.
2. Get the BlenderMCP add-on — a single file, `addon.py`, from the
   [blender-mcp project](https://github.com/ahujasid/blender-mcp).
3. In Blender: **Edit → Preferences → Add-ons**, then install the file:
   - Blender 4.2+: the **▼** dropdown (top-right) → **Install from Disk…**
   - Blender 4.1 or older: the **Install…** button → select `addon.py`
4. Enable it: search `MCP` and **tick the checkbox** for *Interface: Blender MCP*.
5. In the 3D viewport press **`N`** to open the sidebar → **BlenderMCP** tab →
   **Connect to Claude** / **Start MCP Server** (it listens on port 9876).

Keep Blender open with the server running while you use the tools.

### 2. Client side — launch tooling (`uv`) and register the server

The generated config launches the server with `uvx blender-mcp`, so you need
[`uv`](https://docs.astral.sh/uv/) (it ships `uvx`):

```bash
python -m pip install uv
# or: winget install astral-sh.uv
```

Register the server with your harness. For Claude Code:

```bash
claude mcp add blender -s user -- uvx blender-mcp
```

`-s user` registers it globally (available in every project); drop it to scope
the server to the current project only.

> **Windows + Microsoft Store Python gotcha.** Store-installed Python puts
> console scripts in a per-user folder that may not be on the harness
> launcher's PATH, so a bare `uvx` can fail to resolve. If so, register the
> absolute path to `uvx.exe` instead. Find it with `where uvx` (cmd) or
> `(Get-Command uvx).Source` (PowerShell). Alternatively install uv via its
> standalone installer or `winget install astral-sh.uv` so `uvx` lands on PATH
> and a bare `uvx` works everywhere.

### 3. Reload and verify

1. Reload / restart your harness so it picks up the new server (MCP tools load at
   session start).
2. Confirm it is healthy:

   ```bash
   claude mcp list
   ```

   You should see `blender: … - ✓ Connected`. That means the MCP process starts —
   the live link to Blender happens on the first tool call.
3. With Blender open and its server running, try a prompt like *"list the objects
   in the Blender scene"* or *"create a 2 m cube at the origin"*.

### Troubleshooting

- **`✓ Connected` but tool calls fail** — Blender isn't open, or the BlenderMCP
  add-on server isn't started (sidebar `N` → BlenderMCP → Start).
- **`uvx` not found when the harness launches it** — use the full path to
  `uvx.exe` (see the Windows gotcha above).
- **Tools don't appear after registering** — reload/restart the harness; MCP
  tools are loaded at session start.
- **Port conflict** — the add-on listens on 9876; close any stale Blender
  instance still holding it.

## Adding or changing servers

Edit the catalog [../mcp-configs/mcp-servers.json](../mcp-configs/mcp-servers.json),
then run `npm run sync:mcp` to regenerate the configs. `npm run validate` (via
`validate:mcp`) fails if the generated files drift from the catalog, so the two
can never disagree.
