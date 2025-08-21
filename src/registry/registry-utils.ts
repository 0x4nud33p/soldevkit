import type { Registry } from "shadcn/registry";

export const utils: Registry["items"] = [
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "solana",
    type: "registry:lib",
    title: "Solana Utilities",
    description:
      "Utility functions for Solana development including lamports/SOL conversion and number formatting.",
    dependencies: ["@solana/web3.js"],
    files: [
      {
        path: "default/utils/solana.ts",
        type: "registry:lib",
        target: "lib/solana.ts",
      },
    ],
  },
];