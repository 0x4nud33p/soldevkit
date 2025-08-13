import type { Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "copy-button",
    type: "registry:ui",
    title: "Copy Button",
    description: "A button with a copy to clipboard animation.",
    dependencies: ["motion", "lucide-react", "class-variance-authority"],
    files: [
      {
        path: "default/ui/button.tsx",
        type: "registry:ui",
        target: "components/solanadevkit-ui/button/copy-button.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "wallet-connect-button",
    type: "registry:ui",
    title: "Wallet Connect Button",
    description: "A Solana wallet connection button built on Once UI Button.",
    dependencies: [
      "@solana/wallet-adapter-react",
      "@solana/wallet-adapter-react-ui",
      "@solana/wallet-adapter-wallets",
      "@solana/web3.js",
      "class-variance-authority",
    ],
    files: [
      {
        path: "default/ui/wallet/wallet-connect-button.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/wallet/wallet-connect-button.tsx",
      },
    ],
  },
];
