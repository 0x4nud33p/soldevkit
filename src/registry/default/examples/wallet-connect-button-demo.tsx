import React from "react";
import { WalletConnectButton } from "@/registry/default/ui/wallet/wallet-connect-button";
import { Wallet, } from "lucide-react";

function walletConnectButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">

          <WalletConnectButton
            variant="default"
            size="default"
            className="w-full"
            icon={<Wallet className="h-4 w-4" />}
          />
        </div>
  );
}

export default walletConnectButtonDemo;
