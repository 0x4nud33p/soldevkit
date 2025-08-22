import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PublicKey } from "@solana/web3.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validatePublicKey = (address: PublicKey | string) => {
  try {
    if (typeof address == "string") {
      new PublicKey(address);
    } else {
      address.toBase58();
    }
    return true;
  } catch {
    return false;
  }
};

export const shortAddress = (address: PublicKey | string) => {
  const key = typeof address === "string" ? address : address.toBase58();
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};

// API Cache Management
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class APICache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

export const apiCache = new APICache();

// Alchemy API Response Types
interface AlchemyAssetContent {
  metadata?: {
    name?: string;
    description?: string;
    symbol?: string;
    attributes?: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
  files?: Array<{
    uri?: string;
  }>;
  links?: {
    image?: string;
    external_url?: string;
  };
}

interface AlchemyGrouping {
  group_key: string;
  group_value: string;
}

interface AlchemyAsset {
  content?: AlchemyAssetContent;
  grouping?: AlchemyGrouping[];
}

interface AlchemyResponse {
  jsonrpc: string;
  id: number;
  result?: AlchemyAsset;
  error?: {
    message: string;
  };
}

// NFT Metadata Types
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

// Jupiter API Response Types
type JupiterTokenResponse = TokenInfo[];

// Token Types
export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  logoURI?: string;
  decimals: number;
}

// Shared Alchemy API Utility
export const fetchNFTMetadata = async (
  mintAddress: string,
): Promise<NFTMetadata | null> => {
  const cacheKey = `nft-${mintAddress}`;
  const cached = apiCache.get<NFTMetadata>(cacheKey);
  if (cached) return cached;

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

    const data: AlchemyResponse = await response.json();
    if (data.error) throw new Error(data.error.message);

    const asset = data.result;
    if (!asset) return null;

    const metadata: NFTMetadata = {
      name: asset.content?.metadata?.name || "Unknown NFT",
      description: asset.content?.metadata?.description,
      image: asset.content?.files?.[0]?.uri || asset.content?.links?.image,
      external_url: asset.content?.links?.external_url,
      attributes: asset.content?.metadata?.attributes?.map((attr) => ({
        trait_type: attr.trait_type,
        value: attr.value,
      })),
      collection: {
        name: asset.grouping?.find((g) => g.group_key === "collection")
          ?.group_value,
        family: asset.content?.metadata?.symbol,
      },
    };

    // Cache for 10 minutes
    apiCache.set(cacheKey, metadata, 10 * 60 * 1000);
    return metadata;
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    return null;
  }
};

// Shared Jupiter Token API Utility
export const fetchJupiterTokens = async (): Promise<TokenInfo[]> => {
  const cacheKey = "jupiter-tokens";
  const cached = apiCache.get<TokenInfo[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch("https://tokens.jup.ag/tokens?tags=verified");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tokens: JupiterTokenResponse = await response.json();

    // Cache for 30 minutes
    apiCache.set(cacheKey, tokens, 30 * 60 * 1000);
    return tokens;
  } catch (error) {
    console.error("Error fetching Jupiter tokens:", error);
    return [];
  }
};

// Find token by address or symbol
export const findToken = async (
  addressOrSymbol: string,
): Promise<TokenInfo | null> => {
  const tokens = await fetchJupiterTokens();
  return (
    tokens.find(
      (t) =>
        t.address.toLowerCase() === addressOrSymbol.toLowerCase() ||
        t.symbol.toLowerCase() === addressOrSymbol.toLowerCase(),
    ) || null
  );
};
