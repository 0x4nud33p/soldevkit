"use client";

import React, { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { cn, shortAddress } from "@/lib/utils"; // ✅ import shortAddress
import { motion } from "motion/react";
import { ExternalLink, Image as ImageIcon, Loader2 } from "lucide-react";

export interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  external_url?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  collection?: {
    name?: string;
    family?: string;
  };
}

export interface NFTCardProps {
  /** The mint address of the NFT */
  mintAddress: string | PublicKey;
  /** Custom CSS classes */
  className?: string;
  /** Show NFT attributes */
  showAttributes?: boolean;
  /** Show collection info */
  showCollection?: boolean;
  /** Card variant */
  variant?: "default" | "compact" | "detailed";
  /** Loading state */
  isLoading?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom metadata (bypasses fetching) */
  metadata?: NFTMetadata;
}

const fetchNFTMetadata = async (
  mintAddress: string,
): Promise<NFTMetadata | null> => {
  try {
    const rpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;
    if (!rpcUrl) {
      throw new Error("Alchemy RPC URL not configured");
    }

    // Fetch NFT metadata using Alchemy's enhanced API
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getAsset",
        params: {
          id: mintAddress,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const asset = data.result;
    if (!asset) {
      return null;
    }

    // Transform Alchemy response to our metadata format
    return {
      name: asset.content?.metadata?.name || "Unknown NFT",
      description: asset.content?.metadata?.description,
      image: asset.content?.files?.[0]?.uri || asset.content?.links?.image,
      external_url: asset.content?.links?.external_url,
      attributes: asset.content?.metadata?.attributes?.map(
        (attr: { trait_type: string; value: string | number }) => ({
          trait_type: attr.trait_type,
          value: attr.value,
        }),
      ),
      collection: {
        name: asset.grouping?.find(
          (g: { group_key: string; group_value: string }) =>
            g.group_key === "collection",
        )?.group_value,
        family: asset.content?.metadata?.symbol,
      },
    };
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    return null;
  }
};

const NFTCard = React.forwardRef<HTMLDivElement, NFTCardProps>(
  (
    {
      mintAddress,
      className,
      showAttributes = false,
      showCollection = true,
      variant = "default",
      isLoading: externalLoading = false,
      onClick,
      metadata: customMetadata,
      ...props
    },
    ref,
  ) => {
    const mintStr = React.useMemo(() => {
      return typeof mintAddress === "string"
        ? mintAddress
        : mintAddress.toBase58();
    }, [mintAddress]);

    const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
    const [queryLoading, setQueryLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      if (!customMetadata && mintStr) {
        setQueryLoading(true);
        setError(null);

        fetchNFTMetadata(mintStr)
          .then((data) => {
            setMetadata(data);
            setQueryLoading(false);
          })
          .catch((err) => {
            setError(err);
            setQueryLoading(false);
          });
      }
    }, [mintStr, customMetadata]);

    const finalMetadata = customMetadata || metadata;
    const isLoading = externalLoading || queryLoading;

    const cardVariants = {
      default: "p-4 space-y-3",
      compact: "p-3 space-y-2",
      detailed: "p-6 space-y-4",
    };

    const imageVariants = {
      default: "h-48",
      compact: "h-32",
      detailed: "h-64",
    };

    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm",
            cardVariants[variant],
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "flex items-center justify-center bg-muted rounded-md",
              imageVariants[variant],
            )}
          >
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
          </div>
        </div>
      );
    }

    if (error || !finalMetadata) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm",
            cardVariants[variant],
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "flex items-center justify-center bg-muted rounded-md",
              imageVariants[variant],
            )}
          >
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm">Failed to load NFT</h3>
            <p className="text-xs text-muted-foreground">
              {shortAddress(mintStr)}
            </p>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
          onClick && "cursor-pointer hover:shadow-md hover:scale-[1.02]",
          cardVariants[variant],
          className,
        )}
        onClick={onClick}
        whileHover={onClick ? { y: -2 } : undefined}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        {...props}
      >
        {/* NFT Image */}
        <div
          className={cn(
            "relative overflow-hidden rounded-md bg-muted",
            imageVariants[variant],
          )}
        >
          {finalMetadata.image ? (
            <img
              src={finalMetadata.image}
              alt={finalMetadata.name || shortAddress(mintStr)} // ✅ fallback to short address
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          )}

          {finalMetadata.external_url && (
            <div className="absolute top-2 right-2">
              <a
                href={finalMetadata.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>

        {/* NFT Info */}
        <div className="space-y-2">
          <div>
            <h3
              className={cn(
                "font-semibold leading-tight",
                variant === "compact" ? "text-sm" : "text-base",
              )}
            >
              {finalMetadata.name || shortAddress(mintStr)} {/* ✅ fallback */}
            </h3>

            {showCollection && finalMetadata.collection?.name && (
              <p className="text-xs text-muted-foreground">
                {shortAddress(finalMetadata.collection.name)}
              </p>
            )}
          </div>

          {finalMetadata.description && variant !== "compact" && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {finalMetadata.description}
            </p>
          )}

          {showAttributes &&
            finalMetadata.attributes &&
            finalMetadata.attributes.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Attributes
                </p>
                <div className="flex flex-wrap gap-1">
                  {finalMetadata.attributes
                    .slice(0, variant === "detailed" ? 6 : 3)
                    .map((attr, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium"
                      >
                        {attr.trait_type}: {attr.value}
                      </span>
                    ))}
                  {finalMetadata.attributes.length >
                    (variant === "detailed" ? 6 : 3) && (
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                      +
                      {finalMetadata.attributes.length -
                        (variant === "detailed" ? 6 : 3)}{" "}
                      more
                    </span>
                  )}
                </div>
              </div>
            )}
        </div>
      </motion.div>
    );
  },
);

NFTCard.displayName = "NFTCard";

export { NFTCard };
