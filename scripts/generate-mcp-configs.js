#!/usr/bin/env node
// Generates ready-to-use, harness-native MCP configs from the single source of
// truth (mcp-configs/mcp-servers.json) so any MCP-capable harness can adopt the
// scaffold's MCP servers without hand-copying. Same source -> generated, drift
// checked pattern as generate-wrappers.js.
//
//   node scripts/generate-mcp-configs.js          rewrite generated configs
//   node scripts/generate-mcp-configs.js --check  exit 1 if anything would change
//
// Outputs under mcp-configs/generated/:
//   mcp.json            universal `mcpServers` object (Claude Code .mcp.json,
//                       Cursor .cursor/mcp.json, Kiro .kiro/settings/mcp.json,
//                       Windsurf, Cline, VS Code, ... — the de-facto standard)
//   codex.toml          [mcp_servers.*] fragments for Codex (config.toml)
//   opencode.mcp.json   `mcp` block to merge into .opencode/opencode.json
//   README.md           per-harness install steps + servers left to configure
//
// Only servers with a real command are emitted as runnable. Catalog entries that
// still carry a `<your-...>` placeholder command are listed in the README as
// "configure per team", never written into a config that would fail to launch.

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join("mcp-configs", "generated");
const checkOnly = process.argv.includes("--check");

const registry = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "mcp-configs", "mcp-servers.json"), "utf8")
);

function isPlaceholder(value) {
  return typeof value === "string" && value.includes("<") && value.includes(">");
}

// A server is runnable when its launch command is a real executable, not a
// `<your-...-command>` placeholder waiting on team-local setup.
const allServers = Object.entries(registry.servers).sort(([a], [b]) =>
  a < b ? -1 : a > b ? 1 : 0
);
const runnable = allServers.filter(([, def]) => !isPlaceholder(def.command));
const placeholders = allServers.filter(([, def]) => isPlaceholder(def.command));

// Env values are emitted as ${VAR} so harnesses that expand environment
// variables read real values at launch and no secret is ever written to disk.
function envExpansion(env) {
  const out = {};
  for (const key of Object.keys(env || {})) {
    out[key] = `\${${key}}`;
  }
  return out;
}

function buildUniversal() {
  const mcpServers = {};
  for (const [id, def] of runnable) {
    const entry = { command: def.command };
    if (Array.isArray(def.args) && def.args.length > 0) {
      entry.args = def.args;
    }
    if (def.env && Object.keys(def.env).length > 0) {
      entry.env = envExpansion(def.env);
    }
    mcpServers[id] = entry;
  }
  return `${JSON.stringify({ mcpServers }, null, 2)}\n`;
}

function buildOpencode() {
  const mcp = {};
  for (const [id, def] of runnable) {
    const command = [def.command, ...(Array.isArray(def.args) ? def.args : [])];
    const entry = { type: "local", command, enabled: true };
    if (def.env && Object.keys(def.env).length > 0) {
      entry.environment = envExpansion(def.env);
    }
    mcp[id] = entry;
  }
  return `${JSON.stringify({ $schema: "https://opencode.ai/config.json", mcp }, null, 2)}\n`;
}

function tomlString(value) {
  return JSON.stringify(String(value));
}

function buildCodex() {
  const lines = [
    "# Generated from mcp-configs/mcp-servers.json by scripts/generate-mcp-configs.js.",
    "# Do not edit by hand. Merge these blocks into .codex/config.toml (or your",
    "# Codex config) — or run the `codex mcp add` commands in generated/README.md.",
    "",
  ];
  for (const [id, def] of runnable) {
    lines.push(`[mcp_servers.${id}]`);
    lines.push(`command = ${tomlString(def.command)}`);
    const args = Array.isArray(def.args) ? def.args : [];
    lines.push(`args = [${args.map(tomlString).join(", ")}]`);
    if (def.env && Object.keys(def.env).length > 0) {
      lines.push(`[mcp_servers.${id}.env]`);
      for (const key of Object.keys(def.env)) {
        lines.push(`${key} = ${tomlString(`\${${key}}`)}`);
      }
    }
    lines.push("");
  }
  return `${lines.join("\n").replace(/\n+$/, "\n")}`;
}

function buildReadme() {
  const runnableList = runnable
    .map(([id, def]) => `- \`${id}\` — ${def.purpose}`)
    .join("\n");
  const placeholderList = placeholders.length
    ? placeholders.map(([id]) => `\`${id}\``).join(", ")
    : "_(none)_";

  return `# Generated MCP configs

<!-- Generated from ../mcp-servers.json by scripts/generate-mcp-configs.js. Do not edit by hand; run \`npm run sync:mcp\`. -->

These files let **any MCP-capable harness** use the scaffold's MCP servers. They are
generated from the single source of truth ([../mcp-servers.json](../mcp-servers.json)) —
edit that catalog and run \`npm run sync:mcp\`, never edit these files directly.

MCP is an open, vendor-neutral protocol, so every server here works with any model
behind a compatible client. Pick the file for your harness:

| Harness | File | Where it goes |
|---|---|---|
| Claude Code | [mcp.json](./mcp.json) | copy to \`.mcp.json\` at your project root (or merge with \`claude mcp add\`) |
| Cursor | [mcp.json](./mcp.json) | copy to \`.cursor/mcp.json\` |
| Kiro | [mcp.json](./mcp.json) | copy to \`.kiro/settings/mcp.json\` |
| Windsurf / Cline / VS Code / others | [mcp.json](./mcp.json) | the \`mcpServers\` shape is the de-facto standard — paste into the client's MCP config |
| Codex | [codex.toml](./codex.toml) | merge the \`[mcp_servers.*]\` blocks into \`.codex/config.toml\`, or run \`codex mcp add\` (below) |
| OpenCode | [opencode.mcp.json](./opencode.mcp.json) | merge the \`mcp\` block into \`.opencode/opencode.json\` |

## Runnable servers included

${runnableList}

Env values are emitted as \`\${VAR}\` so secrets are read from your environment at
launch and never written to disk. Set the variable (e.g. \`FAL_KEY\`) before use.

### Codex one-liners

\`\`\`bash
${runnable
  .map(([id, def]) => {
    const parts = [def.command, ...(Array.isArray(def.args) ? def.args : [])];
    return `codex mcp add ${id} -- ${parts.join(" ")}`;
  })
  .join("\n")}
\`\`\`

## Configure per team (not generated)

These catalog entries still use a \`<your-...-command>\` placeholder, so they are
intentionally **not** emitted here — give them a real command in
[../mcp-servers.json](../mcp-servers.json) and re-run \`npm run sync:mcp\`:

${placeholderList}
`;
}

const outputs = new Map([
  [path.join(outDir, "mcp.json"), buildUniversal()],
  [path.join(outDir, "opencode.mcp.json"), buildOpencode()],
  [path.join(outDir, "codex.toml"), buildCodex()],
  [path.join(outDir, "README.md"), buildReadme()],
]);

const changed = [];
for (const [relPath, content] of outputs) {
  const fullPath = path.join(repoRoot, relPath);
  const current = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : null;
  if (current !== content) {
    changed.push(relPath.split(path.sep).join("/"));
    if (!checkOnly) {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content, "utf8");
    }
  }
}

if (checkOnly && changed.length > 0) {
  for (const relPath of changed) {
    console.error(`ERROR: ${relPath} is out of sync with mcp-configs/mcp-servers.json. Run 'npm run sync:mcp'.`);
  }
  process.exit(1);
}

const verb = checkOnly ? "checked" : changed.length > 0 ? `updated ${changed.length}` : "verified";
console.log(
  `PASS ${checkOnly ? "validate" : "sync"}:mcp (${runnable.length} runnable servers, ${verb} config files)`
);
