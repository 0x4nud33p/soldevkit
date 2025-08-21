"use client";

import { PKInput } from "@/registry/default/ui/pk/pk-input";

export default function PKInputDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <PKInput placeholder="Enter your public key" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Different Sizes</h3>
        <div className="space-y-3">
          <PKInput
            placeholder="Small public key input"
            className="h-8 text-sm"
          />
          <PKInput placeholder="Default public key input" />
          <PKInput
            placeholder="Large public key input"
            className="h-12 text-lg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">With Label</h3>
        <div className="space-y-2">
          <label htmlFor="wallet-pk" className="text-sm font-medium">
            Wallet Public Key
          </label>
          <PKInput
            id="wallet-pk"
            placeholder="Enter your wallet's public key"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Disabled State</h3>
        <PKInput
          placeholder="Disabled input"
          disabled
          value="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
        />
      </div>
    </div>
  );
}
