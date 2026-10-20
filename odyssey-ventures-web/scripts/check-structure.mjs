// Verifies the project layout and that every import resolves (case-sensitive,
// like Vercel's Linux build). Runs automatically before `npm run build`.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname, resolve, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

/** Case-sensitive existence check (works even on case-insensitive file systems). */
function existsExact(absPath) {
  const rel = relative(root, absPath).split(sep);
  let current = root;
  for (const part of rel) {
    if (!existsSync(current) || !statSync(current).isDirectory()) return false;
    if (!readdirSync(current).includes(part)) return false;
    current = join(current, part);
  }
  return true;
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(full);
  }
  return out;
}

// 1. Required files
const required = ["package.json", "tsconfig.json", "next.config.mjs", "tailwind.config.ts", "postcss.config.mjs"];
for (const file of required) {
  if (!existsExact(join(root, file))) errors.push(`Missing project file: ${file}`);
}

// 2. App directory: must be src/app (a root-level app/ would shadow it)
if (existsSync(join(root, "app")) && existsSync(join(root, "src", "app"))) {
  errors.push("Both app/ and src/app/ exist. Next.js would use app/ and ignore src/app/. Keep only src/app/.");
}
if (!existsSync(join(root, "src", "app")) && !existsSync(join(root, "app"))) {
  errors.push("No app directory found. Expected src/app/ with layout.tsx and page.tsx.");
}
const appDir = existsSync(join(root, "src", "app")) ? join(root, "src", "app") : join(root, "app");
for (const file of ["layout.tsx", "page.tsx"]) {
  if (!existsExact(join(appDir, file))) errors.push(`Missing ${relative(root, join(appDir, file))}`);
}

// 3. Import resolution
const bases = [join(root, "src"), root]; // matches tsconfig "@/*" fallbacks
const exts = ["", ".ts", ".tsx", ".js", ".mjs", ".css", ".svg", "/index.ts", "/index.tsx"];

function resolves(basePath) {
  return exts.some((ext) => {
    const candidate = basePath + ext;
    return existsExact(candidate) && statSync(candidate).isFile();
  });
}

const importRe = /(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g;
const sources = [...walk(join(root, "src")), ...walk(join(root, "app")), ...walk(join(root, "components"))];

for (const file of sources) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(importRe)) {
    const spec = match[1];
    let ok = true;
    if (spec.startsWith("@/")) {
      ok = bases.some((base) => resolves(join(base, spec.slice(2))));
    } else if (spec.startsWith(".")) {
      ok = resolves(resolve(dirname(file), spec));
    }
    if (!ok) errors.push(`${relative(root, file)}: cannot resolve "${spec}" (check the file exists and the letter case matches)`);
  }
}

if (errors.length > 0) {
  console.error("\nProject structure check FAILED:\n");
  for (const error of errors) console.error(`  - ${error}`);
  console.error("\nCompare your repository with the project ZIP: package.json and src/ must be at the repository root.\n");
  process.exit(1);
}
console.log(`Project structure check passed (${sources.length} source files, all imports resolve).`);
