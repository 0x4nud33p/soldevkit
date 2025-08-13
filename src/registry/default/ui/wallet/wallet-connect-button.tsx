"use client";

import * as React from "react";
import { Button } from "@once-ui-system/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Extend Once UI Button variants for Solana-specific styling
const walletButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600",
        outline:
          "border-2 border-purple-500 text-purple-500 hover:bg-purple-50",
        ghost: "text-purple-600 hover:bg-purple-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface WalletConnectButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof walletButtonVariants> {
  onConnect?: () => void;
  onDisconnect?: () => void;
  showBalance?: boolean;
}

export const WalletConnectButton = React.forwardRef<
  HTMLButtonElement,
  WalletConnectButtonProps
>(
  (
    {
      className,
      variant,
      size,
      onConnect,
      onDisconnect,
      showBalance,
      ...props
    },
    ref,
  ) => {
    const { connected, connecting, publicKey, disconnect } = useWallet();

    const handleClick = async () => {
      if (connected) {
        await disconnect();
        onDisconnect?.();
      } else {
        // Trigger wallet selection modal
        onConnect?.();
      }
    };

    return (
      <Button
        ref={ref}
        className={cn(walletButtonVariants({ variant, size }), className)}
        onClick={handleClick}
        disabled={connecting}
        {...props}
      >
        {connecting ? (
          "Connecting..."
        ) : connected ? (
          <>
            {showBalance && publicKey && (
              <span className="mr-2">
                {publicKey.toString().slice(0, 4)}...
                {publicKey.toString().slice(-4)}
              </span>
            )}
            Disconnect
          </>
        ) : (
          "Connect Wallet"
        )}
      </Button>
    );
  },
);

WalletConnectButton.displayName = "WalletConnectButton";
