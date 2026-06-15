# MCP Servers — Setup Guide

This scaffold ships a curated set of MCP (Model Context Protocol) servers so any
MCP-capable harness can extend the workflow with tools — browser playtesting, AI
asset generation, and 3D control in Blender. MCP is open and vendor-neutral, so
they work with any model behind a compatible client (Claude Code, Codex, Cursor,
OpenCode, Kiro, Windsurf, Cline, VS Code, …).

## Quick start

1. **Install the launcher tooling** the servers need (one-time): see
   [Prerequisites](#prerequisites). Short version: have **Node.js** (you almost
   certainly do) and, for Blender, install **uv**.
2. **Open the scaffold in your harness.** The servers are already wired up for
   you — nothing to copy. (Only **Codex** needs one command; see
   [Is my harness already wired?](#is-my-harness-already-wired).)
3. **Give each server what it needs** to actually do its job (a key, an app, a
   browser) — see [What each server needs](#what-each-server-needs) — then reload
   your harness. Done.

That's it for everyday use. The rest of this page is detail for when something
doesn't connect, or you want to add your own servers.

## Prerequisites

The configs are **portable**: they launch servers with bare `uvx` and `npx` (no
machine-specific paths), so your harness's launcher just needs to be able to run
those two commands.

| Tool | Gives you | Needed by | Install |
|---|---|---|---|
| Node.js 18+ | `npx` | `fal-media`, `playwright` | Likely already installed (`node -v`); else [nodejs.org](https://nodejs.org) |
| uv | `uvx` | `blender`, `unity-editor` | `winget install astral-sh.uv` (Windows) · `curl -LsSf https://astral.sh/uv/install.sh \| sh` (macOS/Linux) · or `pip install uv` |

> **If a server won't start, it's almost always PATH.** The harness launches
> `uvx`/`npx` itself, so they must be resolvable in its environment. Check with
> `npx -v` and `uvx --version`. On **Windows with Microsoft Store Python**, `uvx`
> lands in a per-user folder that may not be on PATH — install uv with `winget`
> (above) so it resolves everywhere, or register the absolute path to `uvx.exe`
> (find it with `where uvx` / `(Get-Command uvx).Source`).

## Is my harness already wired?

Most harnesses are **pre-wired**: the scaffold commits the MCP config into the
location each client reads, so opening the repo is enough.

| Harness | Status | Config (already in the repo) |
|---|---|---|
| Claude Code | ✅ ready | `.mcp.json` (repo root) |
| Cursor | ✅ ready | `.cursor/mcp.json` |
| Kiro | ✅ ready | `.kiro/settings/mcp.json` |
| OpenCode | ✅ ready | `mcp` block in `.opencode/opencode.json` |
| Codex | ⚙️ one command | reads only global `~/.codex/config.toml` — run the line below |
| Windsurf / Cline / VS Code / others | 📋 paste once | copy `mcp-configs/generated/mcp.json` into the client's MCP config |

When you open the repo, the harness will ask you to **approve** the servers the
first time — that is expected. Reload/restart the harness after approving so the
tools load.

**Codex (one-time):**

```bash
codex mcp add blender -- uvx blender-mcp
codex mcp add playwright -- npx -y @playwright/mcp@latest
codex mcp add fal-media -- npx -y fal-ai-mcp-server
```

(Or merge `mcp-configs/generated/codex.toml` into `~/.codex/config.toml`.)

## What each server needs

"Connected" in your harness only means the server process started. To make the
tools actually *work*, each server needs one more thing:

| Server | What it does | What it needs to work | Secret |
|---|---|---|---|
| `playwright` | Drives a real browser to playtest/QA web (HTML5) builds | First run only: `npx playwright install chromium`. Point it at a running dev/preview server, not a `file://` path | — |
| `fal-media` | Generates images, 3D, audio, video via fal.ai | A fal.ai key in the `FAL_KEY` environment variable | `FAL_KEY` |
| `blender` | Inspects a Blender scene and runs `bpy` Python (geometry, export, validation) | **Blender open** with the BlenderMCP add-on **server started** — see the walkthrough below | — |
| `unity-editor` | Drives the Unity Editor (scenes, GameObjects, assets, console, C#) | **Unity Editor open** with the MCP for Unity bridge package installed — see the Unity note below | — |

Secrets are never written into the configs — env values are emitted as `${VAR}`
and read from your environment at launch. Set `FAL_KEY` in your shell/harness
before using `fal-media`.

## Worked example — Blender MCP (3D)

`blender` is the only server with a "two halves" setup: the harness side is
**already wired** (above), but it also needs **Blender running with an add-on**
so the harness has something to connect to. Its scope: geometry, export, and
import validation are solid; rigging and animation are only assisted.

### 1. Start the Blender side (one-time install, then start each session)

1. Have **Blender 3.0+** installed.
2. Get the BlenderMCP add-on — a single file, `addon.py`, from the
   [blender-mcp project](https://github.com/ahujasid/blender-mcp).
3. In Blender: **Edit → Preferences → Add-ons**, then install the file:
   - Blender 4.2+: the **▼** dropdown (top-right) → **Install from Disk…**
   - Blender 4.1 or older: the **Install…** button → select `addon.py`
4. Enable it: search `MCP` and **tick the checkbox** for *Interface: Blender MCP*.
5. In the 3D viewport press **`N`** to open the sidebar → **BlenderMCP** tab →
   **Connect to Claude** / **Start MCP Server** (it listens on port 9876).

Keep Blender open with that server running while you use the tools.

### 2. Make sure `uv` is installed

The `blender` server launches via `uvx`, so install uv if you haven't
(see [Prerequisites](#prerequisites)):

```bash
winget install astral-sh.uv   # Windows
# or: pip install uv
```

The harness config is already in place, so there is usually nothing else to
register. (To use Blender outside this repo too, register it globally once:
`claude mcp add blender -s user -- uvx blender-mcp`.)

### 3. Reload and verify

1. Reload / restart your harness so it picks up the server (MCP tools load at
   session start).
2. Confirm it is healthy — for Claude Code:

   ```bash
   claude mcp list
   ```

   You should see `blender: … - ✓ Connected`. That means the server process
   starts; the live link to Blender happens on the first tool call.
3. With Blender open and its add-on server running, try a prompt like *"list the
   objects in the Blender scene"* or *"create a 2 m cube at the origin"*.

## Unity MCP (engine control)

`unity-editor` follows the same two-halves pattern as Blender: the harness side
is **already wired**, but it needs the **Unity Editor open with the MCP for Unity
bridge installed** so the server has something to drive. It lets the assistant
build/rewire scenes, manage assets, run menu items, read the console, and
edit/run C# directly in the Editor.

1. **Install the bridge in your Unity project** (one-time): Unity → **Window →
   Package Manager → + → Add package from git URL**, paste
   `https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#main`. The
   in-Editor wizard checks Python + uv and can configure detected MCP clients.
2. **Install `uv`** if you haven't (see [Prerequisites](#prerequisites)); the
   server launches via `uvx --from mcpforunityserver mcp-for-unity`.
3. **Keep the Editor open**, reload your harness, and try *"list the GameObjects
   in the open Unity scene"*.

Prereqs: Unity 2021.3 LTS+ and Python 3.10+ with uv. This server is
Unity-specific — it does nothing for Unreal/Godot/web projects.

## Troubleshooting

- **Server shows nothing / won't start** — PATH. The harness can't resolve
  `uvx`/`npx`; check `uvx --version` and `npx -v`, and see
  [Prerequisites](#prerequisites) (Windows Store Python note).
- **`✓ Connected` but Blender tool calls fail** — Blender isn't open, or the
  BlenderMCP add-on server isn't started (sidebar `N` → BlenderMCP → Start).
- **Tools don't appear after approving** — reload/restart the harness; MCP tools
  load at session start.
- **`fal-media` errors about auth** — `FAL_KEY` isn't set in the environment the
  harness launched from.
- **Blender port conflict** — the add-on listens on 9876; close any stale Blender
  instance still holding it.

## How it's wired (and adding your own servers)

One catalog is the source of truth; every config is generated from it and
drift-checked, so they can never disagree.

- **Catalog (edit this):**
  [../mcp-configs/mcp-servers.json](../mcp-configs/mcp-servers.json) — every
  server, its purpose, when to use it, and launch metadata.
- **Generated configs:** the live per-harness files (`.mcp.json`,
  `.cursor/mcp.json`, `.kiro/settings/mcp.json`, the `mcp` block in
  `.opencode/opencode.json`) plus per-format reference copies under
  [../mcp-configs/generated/](../mcp-configs/generated/).

To add or change a server: edit the catalog, then run `npm run sync:mcp` (and
`npm run sync:wrappers` for the OpenCode block). `npm run validate` fails if any
generated config drifts from the catalog. Only servers with a real command are
emitted; catalog entries with a `<your-...-command>` placeholder are left for
each team to fill in.
