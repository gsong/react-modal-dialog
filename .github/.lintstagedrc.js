export default {
  "*.js": ["eslint --no-ignore --fix", "prettier --write"],
  "!(*dependabot).y?(a)ml": (filenames) =>
    filenames.flatMap((filename) => [
      `action-validator ${filename}`,
      `prettier --write ${filename}`,
    ]),
};
