// cli/add.ts
import fs from "fs";
import path from "path";
import { registry } from "@/registry";
import type { Registry } from "shadcn/registry";

// Extend the registry item type to include providers
type ExtendedRegistryItem = Registry["items"][0] & {
  providers?: string[];
};

type Config = {
  providers: string[];
  components: string[];
};
function loadConfig() {
  const configPath = path.resolve(".soldevkitrc.json");
  if (!fs.existsSync(configPath)) return { providers: [], components: [] };
  return JSON.parse(fs.readFileSync(configPath, "utf-8")) as Config;
}

function saveConfig(config: Config) {
  const configPath = path.resolve(".soldevkitrc.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export async function addComponent(name: string) {
  const config = loadConfig();

  const component = registry.items.find((i) => i.name === name) as
    | ExtendedRegistryItem
    | undefined;
  if (!component) throw new Error(`Component ${name} not found`);

  // Example: find required providers for this component
  const requiredProviders = component.providers ?? ["solana-wallet"];

  requiredProviders.forEach((provName: string) => {
    if (!config.providers.includes(provName)) {
      console.log(`Injecting provider: ${provName}`);
      config.providers.push(provName);
    }
  });

  if (!config.components.includes(name)) {
    config.components.push(name);
  }

  saveConfig(config);
}
