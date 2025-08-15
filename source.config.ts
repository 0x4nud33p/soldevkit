import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { remarkInstall } from "fumadocs-docgen";
import { z } from "zod";
import rehypePrettyCode from "rehype-pretty-code";

export const { docs, meta } = defineDocs({
  dir: "src/content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      new: z.boolean().optional(),
      alpha: z.boolean().optional(),
      updated: z.boolean().optional(),
      deprecated: z.boolean().optional(),
      author: z
        .object({
          name: z.string(),
          url: z.string().optional(),
        })
        .optional(),
    }),
  },
});

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    remarkPlugins: [remarkInstall],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            light: "github-light",
            dark: "github-dark",
          },
          keepBackground: false,
        },
      ],
    ],
  },
});
