#!/usr/bin/env node
// Mechanical guardrails for FOUNDATION.md, run by CI and `npm run check:foundation`.
// Each check enforces a boundary rule that grep can verify; the judgment
// calls stay in code review. Dependency-free on purpose.
//
// Checks:
//   1. §3.3 — the design-system layer (client/src/components/ui/) references
//      semantic tokens only. Known, documented holdouts are allowlisted;
//      any NEW raw color value fails the build.
//   2. Performance infra — no full `motion` import from framer-motion
//      (LazyMotion `strict` would only catch it at render time; this catches
//      it before merge).
//   3. §3.4 — one source of truth: the contact email and phone from
//      site.config.ts must not be hardcoded anywhere else in TS/TSX.

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname) + "/..";
const failures = [];

function* walk(dir, exts) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (name === "node_modules" || name.startsWith(".")) continue;
    if (statSync(p).isDirectory()) yield* walk(p, exts);
    else if (exts.some((e) => name.endsWith(e))) yield p;
  }
}

const rel = (p) => path.relative(ROOT, p);

// ---------------------------------------------------------------- check 1
// Documented hex holdouts (see the M7 changelog entry and ARCHITECTURE.md's
// reconciliation-debt section). Keys are "<basename>:<lowercase hex>".
// Shrink this list as tokens get reconciled; never grow it without a
// documented reason.
const HEX_ALLOWLIST = new Set([
  "toast.tsx:#dcefe3", // values text — pending --foreground reconciliation
  "toast.tsx:#9ca3af", // toast description gray — same reconciliation
  "project-card.tsx:#dcefe3", // REF label — same reconciliation
  "project-card.tsx:#60a5fa", // "ongoing" status blue — no info token yet
  "terminal-window.tsx:#20402e", // title-bar dots — single-use decorative tint
  "terminal-window.tsx:#74a68a", // title-bar text — single-use dim tint
]);

const uiDir = path.join(ROOT, "client/src/components/ui");
for (const file of walk(uiDir, [".ts", ".tsx"])) {
  const src = readFileSync(file, "utf8");
  for (const match of src.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) {
    const key = `${path.basename(file)}:${match[0].toLowerCase()}`;
    if (!HEX_ALLOWLIST.has(key)) {
      failures.push(
        `${rel(file)}: raw color ${match[0]} in the design-system layer — ` +
          `use a semantic token (FOUNDATION.md §3.3), or document + allowlist it here`,
      );
    }
  }
}

// ---------------------------------------------------------------- check 2
const clientSrc = path.join(ROOT, "client/src");
for (const file of walk(clientSrc, [".ts", ".tsx"])) {
  const src = readFileSync(file, "utf8");
  if (/import\s*{[^}]*\bmotion\b[^}]*}\s*from\s*["']framer-motion["']/.test(src)) {
    failures.push(
      `${rel(file)}: full \`motion\` import from framer-motion — use \`m\` under ` +
        `LazyMotion (App wraps everything in <LazyMotion strict>)`,
    );
  }
}

// ---------------------------------------------------------------- check 3
const configSrc = readFileSync(
  path.join(ROOT, "client/src/lib/site.config.ts"),
  "utf8",
);
const email = configSrc.match(/email:\s*"([^"]+)"/)?.[1];
const phoneHref = configSrc.match(/phoneHref:\s*"([^"]+)"/)?.[1];
const facts = [email, phoneHref].filter(Boolean);

for (const dir of ["client/src", "api"]) {
  for (const file of walk(path.join(ROOT, dir), [".ts", ".tsx"])) {
    if (file.endsWith("site.config.ts")) continue;
    const src = readFileSync(file, "utf8");
    for (const fact of facts) {
      if (src.includes(fact)) {
        failures.push(
          `${rel(file)}: hardcodes "${fact}" — import it from lib/site.config.ts ` +
            `instead (FOUNDATION.md §3.4)`,
        );
      }
    }
  }
}

// ----------------------------------------------------------------- report
if (failures.length > 0) {
  console.error("Foundation check FAILED:\n");
  for (const f of failures) console.error("  ✗ " + f);
  console.error(`\n${failures.length} violation(s). See FOUNDATION.md.`);
  process.exit(1);
}
console.log("Foundation check passed.");
