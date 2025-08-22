"use client";

import React, { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { fetchNFTMetadata, type NFTMetadata, cn } from "@/lib/utils";
import { APIErrorBoundary } from "@/components/error-boundary";
import { OptimizedImage } from "../optimized-image/optimized-image";

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

const NFTImageContent: React.FC<NFTImageProps> = ({
  mintAddress,
  className,
  alt,
  isLoading: externalLoading = false,
}) => {
  const mintStr =
    typeof mintAddress === "string" ? mintAddress : mintAddress.toBase58();

  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mintStr) {
      setLoading(true);
      setError(null);
      fetchNFTMetadata(mintStr)
        .then((data) => setMetadata(data))
        .catch((error) => {
          console.error("Error fetching NFT metadata:", error);
          setError(
            error instanceof Error ? error.message : "Failed to load NFT",
          );
        })
        .finally(() => setLoading(false));
    }
  }, [mintStr]);

  const isLoading = externalLoading || loading;

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded-md",
          className,
        )}
      >
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    throw new Error(error);
  }

  if (!metadata?.image) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded-md",
          className,
        )}
      >
        <ImageIcon className="h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <OptimizedImage
      src={metadata.image}
      alt={alt || metadata.name || "NFT"}
      className={cn("object-cover rounded-md", className)}
      lazy={true}
      fallbackSrc="/placeholder-nft.png"
    />
  );
};

export const NFTImage: React.FC<NFTImageProps> = (props) => {
  return (
    <APIErrorBoundary
      onRetry={() => window.location.reload()}
      className="inline-block"
    >
      <NFTImageContent {...props} />
    </APIErrorBoundary>
  );
};
