import { execSync } from "node:child_process";
import fs from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import url from "node:url";

import { packageDirectory } from "pkg-dir";

export const JS_EXTENSIONS = "{js,jsx,mjs,cjs,ts,tsx,mts}";

const __dirname = dirname(url.fileURLToPath(import.meta.url));
const root = await packageDirectory({ cwd: resolve(__dirname) });
const script = join(root, "bin/eslint-in-dir.js");

export default {
  [`!*.${JS_EXTENSIONS}`]: processNonJsFiles,
  [`*.${JS_EXTENSIONS}`]: processJsFiles,
};

function processNonJsFiles(filenames) {
  const filteredFiles = filenames
    .filter(
      (filename) =>
        !fs.lstatSync(filename).isSymbolicLink() &&
        !basename(filename).startsWith("Dockerfile"),
    )
    .join(" ");

  return `pnpm prettier --ignore-unknown --write ${filteredFiles}`;
}

async function processJsFiles(filenames) {
  const filteredFiles = filenames.filter(
    (file) => !file.includes("/docs/templates/"),
  );

  const eslintCommands = await Promise.all(
    filteredFiles.map(async (file) => {
      const pkgDir = await packageDirectory({ cwd: dirname(file) });
      return `${script} ${pkgDir} ${file}`;
    }),
  );

  const concurrentlyCommands = breakIntoCommands(
    "concurrently",
    eslintCommands,
  );
  const prettierCommands = breakIntoCommands(
    "pnpm prettier --write",
    filteredFiles,
  );

  return [...concurrentlyCommands, ...prettierCommands];
}

function breakIntoCommands(baseCommand, args) {
  const ARG_MAX = parseInt(execSync("getconf ARG_MAX").toString().trim());
  const SAFETY_MARGIN = 2000;
  const MAX_LENGTH = ARG_MAX - SAFETY_MARGIN;

  const commands = [];
  let currentArgs = [];
  let currentLength = baseCommand.length;

  args.forEach((arg) => {
    const quotedArg = `"${arg.replace(/"/g, '\\"')}"`;
    const argLength = quotedArg.length + 1; // +1 for the space

    if (currentLength + argLength > MAX_LENGTH) {
      commands.push(`${baseCommand} ${currentArgs.join(" ")}`);
      currentArgs = [];
      currentLength = baseCommand.length;
    }

    currentArgs.push(quotedArg);
    currentLength += argLength;
  });

  if (currentArgs.length > 0) {
    commands.push(`${baseCommand} ${currentArgs.join(" ")}`);
  }

  return commands;
}
