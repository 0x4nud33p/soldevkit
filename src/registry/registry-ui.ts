import type { Registry } from "shadcn/registry";

// Extend the registry item type to include providers
type ExtendedRegistryItem = Registry["items"][0] & {
  providers?: string[];
};

export const ui: ExtendedRegistryItem[] = [
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "utils",
    type: "registry:lib",
    title: "Utils",
    description:
      "Utility functions for class name merging with clsx and tailwind-merge.",
    dependencies: ["clsx", "tailwind-merge", "@solana/web3.js"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        target: "lib/utils.ts",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "provider",
    type: "registry:ui",
    title: "Wallet Provider",
    description:
      "A provider for Solana wallet connection with modal dialog, dropdown menu, and wallet management features.",
    dependencies: [
      "@solana/wallet-adapter-react",
      "@solana/wallet-adapter-react-ui",
      "@solana/wallet-adapter-wallets",
      "@solana/web3.js",
    ],
    files: [
      {
        path: "default/ui/provider/wallet-provider.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/provider/wallet-provider.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    files: [
      {
        path: "soldevkit-ui/button.tsx",
        type: "registry:ui",
        target: "components/ui/button.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "dialog",
    type: "registry:ui",
    title: "Dialog",
    description:
      "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.",
    dependencies: ["@radix-ui/react-dialog"],
    files: [
      {
        path: "soldevkit-ui/dialog.tsx",
        type: "registry:ui",
        target: "components/ui/dialog.tsx",
      },
    ],
  },

  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "collapsible",
    type: "registry:ui",
    title: "Collapsible",
    description: "An interactive component which expands/collapses a panel.",
    dependencies: ["@radix-ui/react-collapsible"],
    files: [
      {
        path: "soldevkit-ui/collapsible.tsx",
        type: "registry:ui",
        target: "components/ui/collapsible.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "dropdown-menu",
    type: "registry:ui",
    title: "Dropdown Menu",
    description:
      "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
    dependencies: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    files: [
      {
        path: "soldevkit-ui/dropdown-menu.tsx",
        type: "registry:ui",
        target: "components/ui/dropdown-menu.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    files: [
      {
        path: "soldevkit-ui/badge.tsx",
        type: "registry:ui",
        target: "components/ui/badge.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "error-boundary",
    type: "registry:ui",
    title: "Error Boundary",
    description:
      "Error boundary components for handling UI errors and API failures with retry functionality.",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "default/ui/error-boundary/error-boundary.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/error-boundary/error-boundary.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "wallet-connect-button",
    type: "registry:ui",
    title: "Wallet Connect Button",
    description:
      "A comprehensive Solana wallet connection button with modal dialog, dropdown menu, and wallet management features.",
    dependencies: [
      "@solana/wallet-adapter-react",
      "@solana/wallet-adapter-base",
      "@solana/wallet-adapter-react-ui",
      "@solana/wallet-adapter-wallets",
      "@solana/web3.js",
      "@radix-ui/react-dialog",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-slot",
      "class-variance-authority",
      "lucide-react",
    ],
    registryDependencies: [
      "button",
      "dialog",
      "collapsible",
      "dropdown-menu",
      "badge",
      "provider",
      "utils",
      "optimized-image",
    ],
    providers: ["solana-wallet"],
    files: [
      {
        path: "default/ui/wallet/wallet-connect-button.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/wallet/wallet-connect-button.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "input",
    type: "registry:ui",
    title: "Input",
    description:
      "Displays a form input field or a component that looks like an input field.",
    dependencies: [],
    files: [
      {
        path: "soldevkit-ui/input.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/input.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "form",
    type: "registry:ui",
    title: "Form",
    description:
      "Form components (Form, FormField, FormItem, FormLabel, FormMessage) built on react-hook-form.",
    dependencies: [
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
      "react-hook-form",
    ],
    files: [
      {
        path: "soldevkit-ui/form.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/form.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "select",
    type: "registry:ui",
    title: "Select",
    description: "A set of components for building accessible select menus.",
    dependencies: ["@radix-ui/react-select"],
    files: [
      {
        path: "soldevkit-ui/select.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/select.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "card",
    type: "registry:ui",
    title: "Card",
    description: "A card component with header and content elements.",
    dependencies: [],
    files: [
      {
        path: "soldevkit-ui/card.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/card.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "pk-input",
    type: "registry:ui",
    title: "Public Key Input",
    description:
      "A specialized input component for Solana public key validation with real-time validation feedback.",
    dependencies: ["@solana/web3.js"],
    registryDependencies: ["input", "utils"],
    files: [
      {
        path: "default/ui/pk/pk-input.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/pk/pk-input.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "toggle",
    type: "registry:ui",
    title: "Toggle",
    description: "A two-state button that can be either on or off.",
    dependencies: ["@radix-ui/react-toggle", "class-variance-authority"],
    files: [
      {
        path: "soldevkit-ui/toggle.tsx",
        type: "registry:ui",
        target: "components/ui/toggle.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "toggle-group",
    type: "registry:ui",
    title: "Toggle Group",
    description: "A set of two-state buttons that can be toggled on or off.",
    dependencies: ["@radix-ui/react-toggle-group"],
    registryDependencies: ["toggle"],
    files: [
      {
        path: "soldevkit-ui/toggle-group.tsx",
        type: "registry:ui",
        target: "components/ui/toggle-group.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "txn-settings",
    type: "registry:ui",
    title: "Transaction Settings",
    description:
      "A comprehensive transaction settings dialog with priority fee, slippage, and other configuration options.",
    dependencies: ["@radix-ui/react-dialog", "lucide-react"],
    registryDependencies: [
      "button",
      "dialog",
      "input",
      "toggle-group",
      "utils",
    ],
    files: [
      {
        path: "default/ui/transaction/txn-settings.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/transaction/txn-settings.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "table",
    type: "registry:ui",
    title: "Table",
    description:
      "A responsive table component with header, body, footer, and cell components.",
    dependencies: [],
    files: [
      {
        path: "soldevkit-ui/table.tsx",
        type: "registry:ui",
        target: "components/ui/table.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "skeleton",
    type: "registry:ui",
    title: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    dependencies: [],
    files: [
      {
        path: "soldevkit-ui/skeleton.tsx",
        type: "registry:ui",
        target: "components/ui/skeleton.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "txn-list",
    type: "registry:ui",
    title: "Transaction List",
    description:
      "A component for displaying a list of Solana transactions with details like signature, block, time, sender, and fee.",
    dependencies: [
      "@solana/web3.js",
      "@solana/wallet-adapter-react",
      "date-fns",
      "lucide-react",
    ],
    registryDependencies: ["table", "skeleton", "utils"],
    files: [
      {
        path: "default/ui/transaction/txn-list.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/transaction/txn-list.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "avatar",
    type: "registry:ui",
    title: "Avatar",
    description:
      "A component for displaying Solana address avatars using Minidenticons with customizable sizes and styling.",
    dependencies: ["@solana/web3.js", "minidenticons"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "default/ui/avatar/avatar.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/avatar/avatar.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "send-token",
    type: "registry:ui",
    title: "Send Token",
    description:
      "A form component for sending SPL tokens on Solana with validation and transaction handling.",
    dependencies: [
      "@solana/web3.js",
      "@solana/wallet-adapter-react",
      "@solana/spl-token",
      "@solana/spl-token-registry",
      "react-hook-form",
      "sonner",
      "lucide-react",
    ],
    registryDependencies: [
      "button",
      "input",
      "wallet-connect-button",
      "select",
      "form",
      "card",
      "utils",
    ],
    files: [
      {
        path: "default/ui/token/send-token.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/token/send-token.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "swap",
    type: "registry:ui",
    title: "Token Swap",
    description:
      "A modern token swap interface with wallet integration, dark theme support, and real-time token data from Jupiter's verified token list.",
    dependencies: [
      "@solana/web3.js",
      "@solana/wallet-adapter-react",
      "motion",
      "lucide-react",
    ],
    registryDependencies: ["wallet-connect-button", "utils", "error-boundary"],
    providers: ["solana-wallet"],
    files: [
      {
        path: "default/ui/swap/swap.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/swap/swap.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "nft-card",
    type: "registry:ui",
    title: "NFT Card",
    description:
      "A component for displaying NFT metadata with image, attributes, and collection information using Alchemy API.",
    dependencies: ["@solana/web3.js", "lucide-react", "motion"],
    registryDependencies: [
      "card",
      "skeleton",
      "badge",
      "utils",
      "error-boundary",
      "optimized-image",
    ],
    files: [
      {
        path: "default/ui/nft/nft-card.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/nft/nft-card.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "optimized-image",
    type: "registry:ui",
    title: "Optimized Image",
    description:
      "A framework-agnostic image component with Next.js optimization detection, lazy loading, error handling, and accessibility features.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "default/ui/optimized-image/optimized-image.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/optimized-image/optimized-image.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "nft-img",
    type: "registry:ui",
    title: "NFT Image",
    description:
      "A component for displaying NFT images with loading states and fallback handling.",
    dependencies: ["@solana/web3.js", "lucide-react"],
    registryDependencies: ["utils", "error-boundary", "optimized-image"],
    files: [
      {
        path: "default/ui/nft/nft-img.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/nft/nft-img.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "token-img",
    type: "registry:ui",
    title: "Token Image",
    description:
      "A component for displaying token images with loading states and fallback handling using Jupiter's token list.",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "error-boundary", "optimized-image"],
    files: [
      {
        path: "default/ui/token/token-img.tsx",
        type: "registry:ui",
        target: "components/soldevkit-ui/token/token-img.tsx",
      },
    ],
  },
];
