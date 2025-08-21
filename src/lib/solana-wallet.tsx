import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ReactNode } from "react";

interface SolanaWalletProviderProps {
  children: ReactNode;
  endpoint?: string;
}

export function SolanaWalletProvider({
  children,
  endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC ||
    "https://api.mainnet-beta.solana.com",
}: SolanaWalletProviderProps) {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
