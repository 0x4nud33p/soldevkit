import React from "react";
import { WalletConnectButton } from "../../ui/wallet/wallet-connect-button";

function walletConnectButtonDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <WalletConnectButton
        variant="outline"
        size="lg"
        className="w-full md:w-auto"
        labels={{
          "has-wallet": "Connect Wallet",
          connecting: "Connecting...",
          disconnect: "Disconnect",
          "change-wallet": "Change Wallet",
          "copy-address": "Copy Address",
          copied: "Copied",
        }}
      />
    </div>
  );
}

export default walletConnectButtonDemo;
