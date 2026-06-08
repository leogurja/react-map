import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkNpmOptions: {
      persist: { id: "package-manager" },
      packageManagers: [
        { name: "npm", command: (cmd) => cmd },
        {
          name: "yarn",
          command: (cmd) =>
            cmd.replace(/^npm install /, "yarn add ").replace(/^npm i /, "yarn add "),
        },
        {
          name: "pnpm",
          command: (cmd) =>
            cmd.replace(/^npm install /, "pnpm add ").replace(/^npm i /, "pnpm add "),
        },
      ],
    },
  },
});
