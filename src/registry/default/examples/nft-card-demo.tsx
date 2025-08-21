"use client";

import React from "react";
import { NFTCard } from "@/registry/default/ui/nft/nft-card";

export default function NFTCardDemo() {
  const mintAddress = "97jqKJUM87qKmSu5qgengChf2yMSjbDSh8ykyju2W6zh";

  return (
    <div className="flex flex-col gap-8">
      {/* Default Variant */}
      <div>
        <div className="w-64">
          <NFTCard
            mintAddress={mintAddress}
            variant="default"
            showCollection
            showAttributes
          />
        </div>
      </div>

      {/* Compact Variant */}
      <div>
        <div className="w-48">
          <NFTCard mintAddress={mintAddress} variant="compact" showCollection />
        </div>
      </div>
    </div>
  );
}
