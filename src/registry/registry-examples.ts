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
        path: "default/examples/wallet/wallet-connect-button-demo.tsx",
        type: "registry:example",
        target:
          "components/soldevkit-ui/demo/wallet/wallet-connect-button-demo.tsx",
      },
    ],
  },
];
