import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// Aquí irá el código
const dir = process.argv[2] ?? ".";

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

for (const file of fileInfo) {
  const icon = file.isDir ? "📁" : "📄";
  const size = file.isDir ? `-` : `${file.size}`;

  console.log(`${icon.padEnd(2)} ${file.name.padEnd(15)} ${size.padStart(5)}`);
}
