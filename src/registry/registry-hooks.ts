import type { Registry } from "shadcn/registry";

// Extend the registry item type to include providers
type ExtendedRegistryItem = Registry["items"][0] & {
  providers?: string[];
};

export const hooks: ExtendedRegistryItem[] = [
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "use-request-sol-airdrop",
    type: "registry:hook",
    title: "useRequestSolAirdrop",
    description:
      "A React hook for requesting SOL airdrops on Solana devnet/testnet with status tracking and error handling.",
    dependencies: ["@solana/web3.js", "react"],
    registryDependencies: [],
    files: [
      {
        path: "default/hooks/token/use-request-sol-airdrop.tsx",
        type: "registry:hook",
        target: "hooks/use-request-sol-airdrop.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "use-transfer-token",
    type: "registry:hook",
    title: "useTransferTokens",
    description:
      "A React hook for transferring SOL or SPL tokens with wallet adapter integration and transaction confirmation.",
    dependencies: [
      "@solana/web3.js",
      "@solana/spl-token",
      "@solana/wallet-adapter-base",
      "react",
    ],
    registryDependencies: [],
    files: [
      {
        path: "default/hooks/token/use-transfer-token.tsx",
        type: "registry:hook",
        target: "hooks/use-transfer-token.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "use-is-valid-txn",
    type: "registry:hook",
    title: "useIsValidTransaction",
    description:
      "A React hook for validating Solana transaction signatures and checking confirmation status.",
    dependencies: ["@solana/web3.js", "react"],
    registryDependencies: [],
    files: [
      {
        path: "default/hooks/transaction/use-is-valid-txn.tsx",
        type: "registry:hook",
        target: "hooks/use-is-valid-txn.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "use-txn-details",
    type: "registry:hook",
    title: "useTransactionDetails",
    description:
      "A React hook for fetching detailed Solana transaction information including parsed data and metadata.",
    dependencies: ["@solana/web3.js", "react"],
    registryDependencies: [],
    files: [
      {
        path: "default/hooks/transaction/use-txn-details.tsx",
        type: "registry:hook",
        target: "hooks/use-txn-details.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "use-wallet-token-balance",
    type: "registry:hook",
    title: "useWalletTokenBalance",
    description:
      "A React hook for fetching wallet token balances (SOL) with connection status and error handling.",
    dependencies: ["@solana/web3.js", "@solana/wallet-adapter-base", "react"],
    registryDependencies: [],
    files: [
      {
        path: "default/hooks/wallet/use-wallet-token-balance.tsx",
        type: "registry:hook",
        target: "hooks/use-wallet-token-balance.tsx",
      },
    ],
  },
];
