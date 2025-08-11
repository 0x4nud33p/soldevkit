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
];
