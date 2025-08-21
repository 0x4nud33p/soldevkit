"use client";

import React, { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { Loader2, Image as ImageIcon } from "lucide-react";

export interface NFTImageProps {
  /** The mint address of the NFT */
  mintAddress: string | PublicKey;
  /** Custom CSS classes */
  className?: string;
  /** Alt text for the image */
  alt?: string;
  /** Loading state */
  isLoading?: boolean;
}

export interface NFTMetadata {
  image?: string;
  name?: string;
}

const fetchNFTMetadata = async (
  mintAddress: string,
): Promise<NFTMetadata | null> => {
  try {
    const rpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;
    if (!rpcUrl) {
      throw new Error("Alchemy RPC URL not configured");
    }

    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getAsset",
        params: { id: mintAddress },
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const asset = data.result;
    if (!asset) return null;

    return {
      image: asset.content?.files?.[0]?.uri || asset.content?.links?.image,
      name: asset.content?.metadata?.name,
    };
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    return null;
  }
};

export const NFTImage: React.FC<NFTImageProps> = ({
  mintAddress,
  className,
  alt,
  isLoading: externalLoading = false,
}) => {
  const mintStr =
    typeof mintAddress === "string" ? mintAddress : mintAddress.toBase58();

  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mintStr) {
      setLoading(true);
      fetchNFTMetadata(mintStr)
        .then((data) => setMetadata(data))
        .finally(() => setLoading(false));
    }
  }, [mintStr]);

  const isLoading = externalLoading || loading;

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center bg-muted rounded-md ${className}`}
      >
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!metadata?.image) {
    return (
      <div
        className={`flex items-center justify-center bg-muted rounded-md ${className}`}
      >
        <ImageIcon className="h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      src={metadata.image}
      alt={alt || metadata.name || "NFT"}
      className={`object-cover rounded-md ${className}`}
      loading="lazy"
    />
  );
};
