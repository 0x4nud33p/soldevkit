"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn, findToken, type TokenInfo } from "@/lib/utils";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { APIErrorBoundary } from "@/components/error-boundary";
import { OptimizedImage } from "../optimized-image/optimized-image";

interface TokenImageProps {
  /** Token address or symbol */
  tokenAddressOrSymbol: string;
  /** Custom CSS classes */
  className?: string;
  /** Alt text for the image */
  alt?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Size of the image (default: 32px) */
  size?: number;
}

const TokenImageContent: React.FC<TokenImageProps> = ({
  tokenAddressOrSymbol,
  className,
  alt,
  isLoading: externalLoading = false,
  size = 32,
}) => {
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokenData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const found = await findToken(tokenAddressOrSymbol);
      setToken(found);
    } catch (error) {
      console.error("Error fetching token metadata:", error);
      setError(error instanceof Error ? error.message : "Failed to load token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, [tokenAddressOrSymbol]);

  useEffect(() => {
    if (tokenAddressOrSymbol) {
      fetchTokenData();
    }
  }, [tokenAddressOrSymbol, fetchTokenData]);

  const isLoading = externalLoading || loading;

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded-full",
          className,
        )}
        style={{ width: size, height: size }}
      >
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    throw new Error(error);
  }

  if (!token?.logoURI) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded-full",
          className,
        )}
        style={{ width: size, height: size }}
      >
        <ImageIcon className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <OptimizedImage
      src={token.logoURI}
      alt={alt || token.symbol}
      className={cn("rounded-full object-contain", className)}
      width={size}
      height={size}
      lazy={true}
      fallbackSrc="/placeholder-token.png"
    />
  );
};

export const TokenImage: React.FC<TokenImageProps> = (props) => {
  return (
    <APIErrorBoundary
      onRetry={() => window.location.reload()}
      className="inline-block"
    >
      <TokenImageContent {...props} />
    </APIErrorBoundary>
  );
};
