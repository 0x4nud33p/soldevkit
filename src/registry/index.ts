// registry/index.ts
import { type Registry } from "shadcn/registry";
import { ui } from "./registry-ui";
import { examples } from "./registry-examples";
import { providers, type Provider } from "./registry-providers";

// Extend the registry item type to include providers
type ExtendedRegistryItem = Registry["items"][0] & {
  providers?: string[];
};

type ExtendedRegistry = Registry & {
  providers: Provider[];
  items: ExtendedRegistryItem[];
};

export const registry: ExtendedRegistry = {
  name: "soldevkit-ui",
  homepage: "https://soldevkit.com",
  items: [...ui, ...examples] as ExtendedRegistryItem[],
  providers,
};
