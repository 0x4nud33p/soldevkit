"use client";

import React from "react";
import { NFTCard } from "@/registry/default/ui/nft/nft-card";

export default function NFTCardDemo() {
  const mintAddress = "97jqKJUM87qKmSu5qgengChf2yMSjbDSh8ykyju2W6zh";

  return (
    <div className="flex flex-col gap-8">
      {/* Default Variant with Price */}
      <div>
        <div className="w-64">
          <NFTCard
            mintAddress={mintAddress}
            variant="default"
            showCollection
            showPrice
            // showAttributes
          />
        </div>
      </div>
    </div>
  );
}
