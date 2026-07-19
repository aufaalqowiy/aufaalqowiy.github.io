// Simple include-processor: reads templates under src/*.html and src/projects/*.html,
// replaces markers like:  <!-- @include: partials/footer.html -->
// with the content of that partial file, then writes the compiled result to the
// matching output path at the project root (e.g. src/index.html -> index.html).
//
// Usage: node scripts/build-html.js

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INCLUDE_RE = /<!--\s*@include:\s*([^\s]+?)\s*-->/g;

function resolvePartial(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Partial not found: ${relPath} (looked in ${fullPath})`);
  }
  return fs.readFileSync(fullPath, "utf8").replace(/\n$/, "");
}

function processFile(srcPath, outPath) {
  const raw = fs.readFileSync(srcPath, "utf8");
  const compiled = raw.replace(INCLUDE_RE, (_, relPath) => resolvePartial(relPath));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, compiled);
  console.log(`  built ${path.relative(ROOT, outPath)}`);
}

function main() {
  const srcDir = path.join(ROOT, "src");
  const templates = [];

  // src/index.html -> index.html
  if (fs.existsSync(path.join(srcDir, "index.html"))) {
    templates.push([path.join(srcDir, "index.html"), path.join(ROOT, "index.html")]);
  }

  // src/projects/*.html -> projects/*.html
  const projectsDir = path.join(srcDir, "projects");
  if (fs.existsSync(projectsDir)) {
    for (const file of fs.readdirSync(projectsDir)) {
      if (file.endsWith(".html")) {
        templates.push([
          path.join(projectsDir, file),
          path.join(ROOT, "projects", file),
        ]);
      }
    }
  }

  console.log(`Building ${templates.length} HTML file(s)...`);
  for (const [srcPath, outPath] of templates) {
    processFile(srcPath, outPath);
  }
  console.log("Done.");
}

main();
