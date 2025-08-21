import type { Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "wallet-connect-button-demo",
    type: "registry:example",
    title: "Wallet Connect Button Demo",
    description:
      "Demo showcasing Solana wallet connection with different variants.",
    registryDependencies: ["https://soldevkit.com/r/wallet-connect-button"],
    files: [
      {
        path: "default/examples/wallet-connect-button-demo.tsx",
        type: "registry:example",
        target:
          "components/soldevkit-ui/demo/wallet/wallet-connect-button-demo.tsx",
      },
    ],
  },
  {
    name: "pk-input-demo",
    type: "registry:example",
    title: "Public Key Input Demo",
    description: "Demo showcasing Solana public key input with validation.",
    registryDependencies: ["https://soldevkit.com/r/pk-input"],
    files: [
      {
        path: "default/examples/pk-input-demo.tsx",
        type: "registry:example",
        target: "components/soldevkit-ui/demo/pk-input-demo.tsx",
      },
    ],
  },
  {
    name: "txn-settings-demo",
    type: "registry:example",
    title: "Transaction Settings Demo",
    description:
      "Demo showcasing transaction settings with priority fees, slippage, and configuration options.",
    registryDependencies: ["https://soldevkit.com/r/txn-settings"],
    files: [
      {
        path: "default/examples/txn-settings-demo.tsx",
        type: "registry:example",
        target: "components/soldevkit-ui/demo/txn-settings-demo.tsx",
      },
    ],
  },
  {
    name: "txn-list-demo",
    type: "registry:example",
    title: "Transaction List Demo",
    description:
      "Demo showcasing transaction list with loading states, empty states, and Solscan integration.",
    registryDependencies: ["https://soldevkit.com/r/txn-list"],
    files: [
      {
        path: "default/examples/txn-list-demo.tsx",
        type: "registry:example",
        target: "components/soldevkit-ui/demo/txn-list-demo.tsx",
      },
    ],
  },
  {
    name: "avatar-demo",
    type: "registry:example",
    title: "Avatar Demo",
    description:
      "Demo showcasing Solana address avatars with different sizes, styles, and interactive examples.",
    registryDependencies: ["https://soldevkit.com/r/avatar"],
    files: [
      {
        path: "default/examples/avatar-demo.tsx",
        type: "registry:example",
        target: "components/soldevkit-ui/demo/avatar-demo.tsx",
      },
    ],
  },
  {
    name: "send-token-demo",
    type: "registry:example",
    title: "Send Token Demo",
    description:
      "Demo showcasing token sending functionality with form validation, token selection, and transaction handling.",
    registryDependencies: ["https://soldevkit.com/r/send-token"],
    files: [
      {
        path: "default/examples/send-token-demo.tsx",
        type: "registry:example",
        target: "components/soldevkit-ui/demo/send-token-demo.tsx",
      },
    ],
  },
  {
    name: "swap-demo",
    type: "registry:example",
    title: "Token Swap Demo",
    description:
      "Demo showcasing token swap interface with wallet integration, dark theme support, and real-time token data.",
    registryDependencies: ["https://soldevkit.com/r/swap"],
    files: [
      {
        path: "default/examples/swap-demo.tsx",
        type: "registry:example",
        target: "components/soldevkit-ui/demo/swap-demo.tsx",
      },
    ],
  },
  {
    name: "nft-card-demo",
    type: "registry:example",
    title: "NFT Card Demo",
    description:
      "Demo showcasing NFT card component with different variants and configurations.",
    registryDependencies: ["https://soldevkit.com/r/nft-card"],
    files: [
      {
        path: "default/examples/nft-card-demo.tsx",
        type: "registry:example",
        target: "components/soldevkit-ui/demo/nft/nft-card-demo.tsx",
      },
    ],
  },
  {
    name: "nft-img-demo",
    type: "registry:example",
    title: "NFT Image Demo",
    description:
      "Demo showcasing NFT image component with different sizes and loading states.",
    registryDependencies: ["https://soldevkit.com/r/nft-img"],
    files: [
      {
        path: "default/examples/nft-img-demo.tsx",
        type: "registry:example",
        target: "components/soldevkit-ui/demo/nft-img-demo.tsx",
      },
    ],
  },
  {
    name: "token-img-demo",
    type: "registry:example",
    title: "Token Image Demo",
    description:
      "Demo showcasing token image component with different tokens and sizes.",
    registryDependencies: ["https://soldevkit.com/r/token-img"],
    files: [
      {
        path: "default/examples/token-img-demo.tsx",
        type: "registry:example",
        target: "components/soldevkit-ui/demo/token-img-demo.tsx",
      },
    ],
  },
];
