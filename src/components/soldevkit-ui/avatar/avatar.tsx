import React from "react";
import { PublicKey } from "@solana/web3.js";
import { minidenticon } from "minidenticons";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/registry/default/ui/optimized-image/optimized-image";

type AvatarProps = {
  address?: PublicKey | string; // allow optional
  size?: number;
  className?: string;
  alt?: string;
};

const Avatar = ({ address, size = 48, className, alt }: AvatarProps) => {
  const pubkeyStr = React.useMemo(() => {
    if (!address) return "";
    return typeof address === "string" ? address : address.toBase58();
  }, [address]);

  const identicon = React.useMemo(() => {
    if (!pubkeyStr) return "";
    return (
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(pubkeyStr, 90, 50))
    );
  }, [pubkeyStr]);

  if (!pubkeyStr) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full bg-muted p-1 text-muted-foreground",
          className,
        )}
        style={{ width: size, height: size }}
      >
        <span className="text-xs">?</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full bg-muted p-1 text-muted-foreground",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <OptimizedImage
        src={identicon}
        alt={alt || pubkeyStr}
        width={size}
        height={size}
        fallbackSrc="/placeholder-avatar.png"
        lazy={false}
      />
    </div>
  );
};

export { Avatar };
