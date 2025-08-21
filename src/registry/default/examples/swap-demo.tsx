"use client";

import React from "react";
import SwapUI from "@/registry/default/ui/swap/swap";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

export default function SwapDemo() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network],
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] w-full space-y-8 p-4">
      <div className="space-y-4 text-center">
        <h3 className="text-2xl font-bold">Token Swap Interface</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          A modern token swap interface with wallet integration and dark theme
          support. Connect your wallet to start swapping tokens on Solana.
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <div className="space-y-6">
                {/* Main Swap Component */}
                <div className="flex justify-center">
                  <SwapUI />
                </div>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </div>
  );
}
