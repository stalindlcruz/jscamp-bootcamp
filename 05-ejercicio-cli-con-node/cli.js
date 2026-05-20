import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// Aquí irá el código
const args = process.argv.slice(2);
const asc = args.includes("--asc");
const desc = args.includes("--desc");
const dir = args.find((arg) => !arg.startsWith("--")) ?? ".";

const formatBytes = (size) => {
  if (size < 1024) return `${size} Bytes`;
  return `${(size / 1024).toFixed(2)} KB`;
};

const files = await readdir(dir);

const fileInfo = await Promise.all(
  files.map(async (name) => {
    const fullPath = join(dir, name);
    const info = await stat(fullPath);

    return {
      name,
      isDir: info.isDirectory(),
      size: formatBytes(info.size),
    };
  }),
);

fileInfo.sort((a, b) => {
  if (asc) return a.name.localeCompare(b.name);
  if (desc) return b.name.localeCompare(a.name);
  return 0;
});

for (const file of fileInfo) {
  const icon = file.isDir ? "📁" : "📄";
  const size = file.isDir ? `-` : `${file.size}`;

  console.log(`${icon.padEnd(2)} ${file.name.padEnd(15)} ${size.padStart(5)}`);
}
