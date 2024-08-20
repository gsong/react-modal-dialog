#!/usr/bin/env node

import { execSync } from "node:child_process";
import { chdir } from "node:process";

function main() {
  const [directory, filename] = parseArguments();
  changeDirectory(directory);
  runEslint(filename);
}

function parseArguments() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error("Usage: script <directory> <filename>");
    process.exit(1);
  }
  return args;
}

function changeDirectory(directory) {
  try {
    chdir(directory);
    console.log(`Changed directory to ${directory}`);
  } catch (error) {
    console.error(`Failed to change directory: ${error.message}`);
    process.exit(1);
  }
}

function runEslint(filename) {
  try {
    execSync(`eslint --no-ignore --fix "${filename}"`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing ESLint: ${error.message}`);
    process.exit(1);
  }
}

main();
