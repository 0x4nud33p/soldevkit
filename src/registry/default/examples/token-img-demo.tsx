"use client";

import React from "react";
import { TokenImage } from "@/registry/default/ui/token/token-img";

export default function TokenImageDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        {/* By symbol */}
        <div className="flex flex-col items-center">
          <TokenImage tokenAddressOrSymbol="SOL" size={48} />
          <span className="text-sm mt-2">SOL</span>
        </div>

        {/* By address (USDC mainnet) */}
        <div className="flex flex-col items-center">
          <TokenImage
            tokenAddressOrSymbol="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            size={48}
          />
          <span className="text-sm mt-2">USDC</span>
        </div>

        {/* By address (USDT mainnet) */}
        <div className="flex flex-col items-center">
          <TokenImage
            tokenAddressOrSymbol="Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
            size={48}
          />
          <span className="text-sm mt-2">USDT</span>
        </div>
      </div>
    </div>
  );
}
