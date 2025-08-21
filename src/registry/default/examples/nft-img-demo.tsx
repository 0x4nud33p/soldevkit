"use client";

import React from "react";
import { NFTImage } from "@/registry/default/ui/nft/nft-img";

export default function NFTImageDemo() {
  const mintAddress = "97jqKJUM87qKmSu5qgengChf2yMSjbDSh8ykyju2W6zh";

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold">NFT Image Demo</h2>

      <div className="w-64 h-64">
        <NFTImage mintAddress={mintAddress} className="w-full h-full" />
      </div>
      <div className="w-48 h-48">
        <NFTImage mintAddress={mintAddress} className="w-full h-full" />
      </div>
    </div>
  );
}
