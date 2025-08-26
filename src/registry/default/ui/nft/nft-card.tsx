"use client";

import React, { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import {
  cn,
  shortAddress,
  fetchNFTMetadata,
  fetchNFTPrice,
  type NFTMetadata,
  type NFTPrice,
} from "@/lib/utils";
import { motion } from "motion/react";
import { ExternalLink, Image as ImageIcon, Loader2, Copy, Check } from "lucide-react";
import { APIErrorBoundary } from "@/components/soldevkit-ui/error-boundary/error-boundary";
import { OptimizedImage } from "@/components/soldevkit-ui/optimized-image/optimized-image";

export interface NFTCardProps {
  /** The mint address of the NFT */
  mintAddress: string | PublicKey;
  /** Custom CSS classes */
  className?: string;
  /** Show NFT attributes */
  showAttributes?: boolean;
  /** Show collection info */
  showCollection?: boolean;
  /** Show price information */
  showPrice?: boolean;
  /** Card variant */
  variant?: "default" | "compact" | "detailed";
  /** Loading state */
  isLoading?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom metadata (bypasses fetching) */
  metadata?: NFTMetadata;
}

const NFTCardContent = React.forwardRef<HTMLDivElement, NFTCardProps>(
  (
    {
      mintAddress,
      className,
      showAttributes = false,
      showCollection = true,
      showPrice = false,
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
    const [price, setPrice] = useState<NFTPrice | null>(null);
    const [queryLoading, setQueryLoading] = useState(false);
    const [priceLoading, setPriceLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [copied, setCopied] = useState(false);

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
            throw err;
          });
      }
    }, [mintStr, customMetadata]);

    useEffect(() => {
      if (showPrice && mintStr) {
        setPriceLoading(true);
        setError(null);

        fetchNFTPrice(mintStr)
          .then((data) => {
            setPrice(data);
            setPriceLoading(false);
          })
          .catch((err) => {
            setError(err);
            setPriceLoading(false);
            throw err;
          });
      }
    }, [mintStr, showPrice]);

    const finalMetadata = customMetadata || metadata;
    const isLoading = externalLoading || queryLoading || priceLoading;

    const handleCopyAddress = async () => {
      try {
        await navigator.clipboard.writeText(mintStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    };

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
            "relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm text-card-foreground shadow-lg",
            cardVariants[variant],
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted rounded-lg shadow-inner",
              imageVariants[variant],
            )}
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-muted to-muted/50 rounded-lg animate-pulse" />
            <div className="h-3 bg-gradient-to-r from-muted/80 to-muted/30 rounded-lg w-2/3 animate-pulse" />
          </div>
        </div>
      );
    }

    if (error) {
      throw error;
    }

    if (!finalMetadata) {
      return (
        <div
          ref={ref}
          className={cn(
            "relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm text-card-foreground shadow-lg",
            cardVariants[variant],
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted rounded-lg shadow-inner",
              imageVariants[variant],
            )}
          >
            <ImageIcon className="h-8 w-8 text-muted-foreground/60" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">No NFT data</h3>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground/80 font-mono">
                {shortAddress(mintStr)}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyAddress();
                }}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-muted/50 hover:bg-muted transition-colors duration-200"
                title={copied ? "Copied!" : "Copy NFT Address"}
              >
                {copied ? (
                  <Check className="h-3 w-3 text-green-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm text-card-foreground shadow-lg transition-all duration-300",
          onClick && "cursor-pointer hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.03] hover:border-primary/30",
          cardVariants[variant],
          className,
        )}
        onClick={onClick}
        whileHover={onClick ? { y: -4, rotateY: 2 } : undefined}
        whileTap={onClick ? { scale: 0.97 } : undefined}
        {...props}
      >
        {/* NFT Image */}
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-gradient-to-br from-muted/50 to-muted shadow-inner",
            imageVariants[variant],
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          {finalMetadata.image ? (
            <OptimizedImage
              src={finalMetadata.image}
              alt={finalMetadata.name || shortAddress(mintStr)} // ✅ fallback to short address
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              fallbackSrc="/placeholder-nft.png"
              lazy={true}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/80">
              <ImageIcon className="h-8 w-8 text-muted-foreground/60" />
            </div>
          )}

          <div className="absolute top-3 right-3 z-20 flex gap-2">
            {/* Copy Address Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyAddress();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 hover:scale-110 transition-all duration-200 shadow-lg border border-white/20"
              title={copied ? "Copied!" : "Copy NFT Address"}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
            
            {/* External Link Button */}
            {finalMetadata.external_url && (
              <a
                href={finalMetadata.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 hover:scale-110 transition-all duration-200 shadow-lg border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* NFT Info */}
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between">
              <h3
                className={cn(
                  "font-semibold leading-tight",
                  variant === "compact" ? "text-sm" : "text-base",
                )}
              >
                {finalMetadata.name || shortAddress(mintStr)} {/* ✅ fallback */}
              </h3>

              {showPrice && price && (
                <div className="px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
                  <p className="text-sm font-bold text-primary">
                    {Number(price.price).toFixed(2)} {price.currency || "SOL"}
                  </p>
                </div>
               )}
            </div>

            {showCollection && finalMetadata.collection?.name && (
              <p className="text-xs text-muted-foreground">
                {shortAddress(finalMetadata.collection.name)}
              </p>
            )}
          </div>



          {showAttributes &&
            finalMetadata.attributes &&
            finalMetadata.attributes.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Attributes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {finalMetadata.attributes
                    .slice(0, variant === "detailed" ? 6 : 3)
                    .map((attr, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-secondary to-secondary/80 px-2.5 py-1.5 text-xs font-semibold shadow-sm border border-secondary/50 hover:shadow-md transition-shadow duration-200"
                      >
                        {attr.trait_type}: {attr.value}
                      </span>
                    ))}
                  {finalMetadata.attributes.length >
                    (variant === "detailed" ? 6 : 3) && (
                    <span className="inline-flex items-center rounded-lg bg-gradient-to-r from-muted to-muted/80 px-2.5 py-1.5 text-xs font-medium text-muted-foreground border border-muted/50">
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

NFTCardContent.displayName = "NFTCardContent";

const NFTCard = React.forwardRef<HTMLDivElement, NFTCardProps>((props, ref) => {
  return (
    <APIErrorBoundary onRetry={() => window.location.reload()}>
      <NFTCardContent {...props} ref={ref} />
    </APIErrorBoundary>
  );
});

NFTCard.displayName = "NFTCard";

export { NFTCard };
