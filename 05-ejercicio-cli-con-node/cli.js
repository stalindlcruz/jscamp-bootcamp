import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// Aquí irá el código
const args = process.argv.slice(2);
const asc = args.includes("--asc");
const desc = args.includes("--desc");
const onlyFiles = args.includes("--files");
const onlyFolders = args.includes("--folders");
const dir = args.find((arg) => !arg.startsWith("--")) ?? "./";

const formatBytes = (size) => {
  if (size < 1024) return `${size} Bytes`;
  return `${(size / 1024).toFixed(2)} KB`;
};

// Si el usuario no pone `--permission` en la ejecución, saltará un error distinto, porque querrá acceder a `process.permission` y no existirá. Así que usaremos un operador de nulish coalescing para evitar el error.
if (!process.permission?.has("fs.read", `${dir}`)) {
  console.error(`
    Error: No tienes permiso para leer el directorio "${dir}"

    Para habilitar los permisos, ejecuta:
    node --permission --allow-fs-read=${dir} cli.js
    `);
  process.exit(1);
}

// Si queremos acceder a un directorio que no existe, podemos capturar el error y avisarle al usuario
let files;
try {
  files = await readdir(dir);
} catch (err) {
  console.error(`Error: No se pudo leer el directorio "${dir}"`);
  process.exit(1);
}

const filesInfo = await Promise.all(
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

// Aqui tengo las carpetas ordenada de primero intencional
filesInfo.sort((a, b) => {
  if (a.isDir && !b.isDir) return -1;
  if (!a.isDir && b.isDir) return 1;
  if (asc) return a.name.localeCompare(b.name);
  if (desc) return b.name.localeCompare(a.name);
  return 0;
});

const filteredInfo = filesInfo.filter((info) => {
  if (onlyFiles) return !info.isDir;
  if (onlyFolders) return info.isDir;
  return true;
});

for (const file of filteredInfo) {
  const icon = file.isDir ? "📁" : "📄";
  const size = file.isDir ? `-` : `${file.size}`;

  const nameColor = file.isDir ? "\x1b[34m" : "\x1b[32m";
  const sizeColor = "\x1b[33m";
  const resetColor = "\x1b[0m";

  console.log(
    `${icon.padEnd(2)} ${nameColor}${file.name.padEnd(15)}${resetColor} ${sizeColor}${size.padStart(5)}${resetColor}`,
  );
}
