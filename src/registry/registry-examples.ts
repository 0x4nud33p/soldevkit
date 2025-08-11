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
];
