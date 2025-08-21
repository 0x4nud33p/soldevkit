import React from "react";
import { WalletConnectButton } from "../../ui/wallet/wallet-connect-button";
import { Wallet, Shield, Zap, Lock, Globe } from "lucide-react";

function walletConnectButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">
          Wallet Connect Button Variants
        </h2>
      </div>

      {/* Default variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {/* Basic default */}
        <div className="flex flex-col items-center gap-2">
          <WalletConnectButton
            variant="default"
            size="default"
            className="w-full"
          />
        </div>

        {/* Default with icon */}
        <div className="flex flex-col items-center gap-2">
          <WalletConnectButton
            variant="default"
            size="default"
            className="w-full"
            icon={<Wallet className="h-4 w-4" />}
          />
        </div>

        {/* Outline */}
        <div className="flex flex-col items-center gap-2">
          <WalletConnectButton
            variant="outline"
            size="default"
            className="w-full"
          />
        </div>

        {/* Outline with icon */}
        <div className="flex flex-col items-center gap-2">
          <WalletConnectButton
            variant="outline"
            size="default"
            className="w-full"
            icon={<Shield className="h-4 w-4" />}
          />
        </div>

        {/* Secondary */}
        <div className="flex flex-col items-center gap-2">
          <WalletConnectButton
            variant="secondary"
            size="default"
            className="w-full"
          />
        </div>

        {/* Secondary with icon */}
        <div className="flex flex-col items-center gap-2">
          <WalletConnectButton
            variant="secondary"
            size="default"
            className="w-full"
            icon={<Zap className="h-4 w-4" />}
          />
        </div>

        {/* Ghost */}
        <div className="flex flex-col items-center gap-2">
          <WalletConnectButton
            variant="ghost"
            size="default"
            className="w-full"
          />
        </div>

        {/* Ghost with icon */}
        <div className="flex flex-col items-center gap-2">
          <WalletConnectButton
            variant="ghost"
            size="default"
            className="w-full"
            icon={<Lock className="h-4 w-4" />}
          />
        </div>

        {/* Link */}
        <div className="flex flex-col items-center gap-2">
          <WalletConnectButton
            variant="link"
            size="default"
            className="w-full"
          />
        </div>
      </div>

      {/* Size variants */}
      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Size Variants
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <WalletConnectButton
              variant="outline"
              size="sm"
              icon={<Globe className="h-3 w-3" />}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <WalletConnectButton
              variant="outline"
              size="default"
              icon={<Globe className="h-4 w-4" />}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <WalletConnectButton
              variant="outline"
              size="lg"
              icon={<Globe className="h-5 w-5" />}
            />
          </div>
        </div>
      </div>

      {/* Custom labels example */}
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Custom Labels
        </h3>
        <WalletConnectButton
          variant="default"
          size="lg"
          className="w-full"
          icon={<Wallet className="h-4 w-4" />}
          labels={{
            "has-wallet": "🚀 Launch Wallet",
            connecting: "🔄 Launching...",
            disconnect: "👋 Goodbye",
            "change-wallet": "🔄 Switch Wallet",
            "copy-address": "📋 Copy Address",
            copied: "✅ Copied!",
          }}
        />
      </div>
    </div>
  );
}

export default walletConnectButtonDemo;
