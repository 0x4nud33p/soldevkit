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
