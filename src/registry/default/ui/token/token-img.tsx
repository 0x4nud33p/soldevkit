"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Image as ImageIcon } from "lucide-react";

export interface TokenImageProps {
  /** The token mint address or symbol */
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

type TokenInfo = {
  address: string;
  name: string;
  symbol: string;
  logoURI?: string;
  decimals: number;
};

export const TokenImage: React.FC<TokenImageProps> = ({
  tokenAddressOrSymbol,
  className,
  alt,
  isLoading: externalLoading = false,
  size = 32,
}) => {
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://tokens.jup.ag/tokens?tags=verified",
        );
        const data: TokenInfo[] = await response.json();

        // Try to find by address or symbol
        const found = data.find(
          (t) =>
            t.address.toLowerCase() === tokenAddressOrSymbol.toLowerCase() ||
            t.symbol.toLowerCase() === tokenAddressOrSymbol.toLowerCase(),
        );

        setToken(found || null);
      } catch (error) {
        console.error("Error fetching token metadata:", error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    if (tokenAddressOrSymbol) {
      fetchToken();
    }
  }, [tokenAddressOrSymbol]);

  const isLoading = externalLoading || loading;

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center bg-muted rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!token?.logoURI) {
    return (
      <div
        className={`flex items-center justify-center bg-muted rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        <ImageIcon className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <img
      src={token.logoURI}
      alt={alt || token.symbol}
      className={`rounded-full object-contain ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
    />
  );
};
