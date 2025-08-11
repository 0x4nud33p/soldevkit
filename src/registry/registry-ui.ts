import type { Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "copy-button",
    type: "registry:component",
    title: "Copy Button",
    description: "A button with a copy to clipboard animation.",
    dependencies: ["motion", "lucide-react", "class-variance-authority"],
    files: [
      {
        path: "default/ui/button.tsx",
        type: "registry:component",
      },
    ],
  },
];
