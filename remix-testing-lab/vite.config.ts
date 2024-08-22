import { vitePlugin as remix } from "@remix-run/dev";

import markdownItMermaid from "@markslides/markdown-it-mermaid";
import markdownit from "markdown-it";
import { defineConfig } from "vite";
import { Mode, plugin as markdown } from "vite-plugin-markdown";
import tsconfigPaths from "vite-tsconfig-paths";

const markdownIt = markdownit({ html: true }).use(markdownItMermaid);

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    markdown({ mode: [Mode.HTML], markdownIt }),
    tsconfigPaths(),
  ],
});
