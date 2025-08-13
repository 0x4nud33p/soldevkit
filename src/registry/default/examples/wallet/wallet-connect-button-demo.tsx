import { WalletConnectButton } from "@/registry/default/ui/wallet/wallet-connect-button";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

export default function WalletConnectButtonDemo() {
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <WalletConnectButton variant="default" size="lg" showBalance />
          <WalletConnectButton variant="outline" size="default" />
          <WalletConnectButton variant="ghost" size="sm" />
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
}
