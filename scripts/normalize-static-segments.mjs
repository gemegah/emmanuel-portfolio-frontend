import { copyFile, readdir } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const outputDirectory = fileURLToPath(new URL("../out/", import.meta.url));

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : entry.isFile() ? [path] : [];
  }));
  return paths.flat();
}

// Next 16.3.1's Windows exporter passes backslashes to a slash-only filename
// encoder. Restore the flat __next.*.txt paths requested by its client router.
async function normalizeSegments(directory) {
  let count = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const path = join(directory, entry.name);
    if (!entry.name.startsWith("__next.")) {
      count += await normalizeSegments(path);
      continue;
    }
    for (const source of await listFiles(path)) {
      if (!source.endsWith(".txt")) continue;
      const filename = relative(dirname(path), source).split(sep).join(".");
      await copyFile(source, join(directory, filename));
      count += 1;
    }
  }
  return count;
}

console.info({ event: "static_segment_paths_normalized", files: await normalizeSegments(outputDirectory) });
