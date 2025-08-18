// registry/index.ts
import { type Registry } from "shadcn/registry";
import { ui } from "./registry-ui";
import { examples } from "./registry-examples";

// Define provider type
export type Provider = {
  name: string;
  import: string;
  code: string;
};

// Solana Wallet provider
export const providers: Provider[] = [
  {
    name: "solana-wallet",
    import: `
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";`,

    code: `
<ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SOLANA_RPC!}>
  <WalletProvider wallets={[new PhantomWalletAdapter()]} autoConnect>
    <WalletModalProvider>
      {children}
    </WalletModalProvider>
  </WalletProvider>
</ConnectionProvider>
    `,
  },
];

// Extend shadcn registry type
export type ExtendedRegistry = Registry & {
  providers: Provider[];
};

// Final registry export
export const registry: ExtendedRegistry = {
  name: "soldevkit-ui",
  homepage: "https://soldevkit.com",
  items: [...ui, ...examples],
  providers,
};
