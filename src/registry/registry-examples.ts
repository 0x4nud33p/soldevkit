import type { Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "button-demo",
    type: "registry:example",
    title: "Button Demo",
    description: "Demo showing a button with copy to clipboard effect.",
    registryDependencies: ["https://soldevkit.com/r/copy-button"],
    files: [
      {
        path: "default/examples/button-demo.tsx",
        type: "registry:example",
        target: "components/solanadevkit-ui/demo/buttons/copy-button-demo.tsx",
      },
    ],
  },
  // {
  //   name: "wallet-connect-button-demo",
  //   type: "registry:example",
  //   title: "Wallet Connect Button Demo",
  //   description:
  //     "Demo showcasing Solana wallet connection with different variants.",
  //   registryDependencies: [
  //     "https://soldevkit.com/r/wallet-connect-button.json",
  //   ],
  //   files: [
  //     {
  //       path: "default/examples/wallet/wallet-connect-button-demo.tsx",
  //       type: "registry:example",
  //       target:
  //         "components/soldevkit-ui/demo/wallet/wallet-connect-button-demo.tsx",
  //     },
  //   ],
  // },
];
