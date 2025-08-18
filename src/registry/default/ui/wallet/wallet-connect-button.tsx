"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName, WalletReadyState } from "@solana/wallet-adapter-base";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/soldevkit-ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/soldevkit-ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/soldevkit-ui/dropdown-menu";
import { Badge } from "@/components/soldevkit-ui/badge";
import { Loader2, ChevronDown } from "lucide-react";

// Constants
const LABELS = {
  "change-wallet": "Change Wallet",
  connecting: "Connecting...",
  "copy-address": "Copy Address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect Wallet",
  "no-wallet": "Select Wallet",
} as const;

// Types
type WalletButtonProps = React.ComponentProps<"button"> & {
  labels?: Partial<typeof LABELS>;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

// Enhanced Wallet Modal Component
export const WalletModal: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const { wallets, select, connecting, connected } = useWallet();
  const [expanded, setExpanded] = useState(false);

  // Memoize wallet lists
  const { listedWallets, collapsedWallets } = useMemo(() => {
    const installed = wallets.filter(
      (w) => w.readyState === WalletReadyState.Installed,
    );
    const notInstalled = wallets.filter(
      (w) => w.readyState !== WalletReadyState.Installed,
    );
    return {
      listedWallets: installed.length ? installed : notInstalled,
      collapsedWallets: installed.length ? notInstalled : [],
    };
  }, [wallets]);

  const handleWalletClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>, walletName: string) => {
      event.preventDefault();
      try {
        select(walletName as WalletName);
        // The wallet will automatically attempt to connect after selection
        // due to the autoConnect prop in WalletProvider
      } catch (error) {
        console.error("Failed to select wallet:", error);
        // You could add toast notification here
      }
    },
    [select],
  );

  // Close modal when wallet connects successfully
  useEffect(() => {
    if (connected) {
      onOpenChange(false);
    }
  }, [connected, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect wallet to continue</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect to this dApp.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Main wallet list */}
          {listedWallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={(e) => handleWalletClick(e, wallet.adapter.name)}
              disabled={connecting}
              className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-secondary disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                {wallet.adapter.icon && (
                  <img
                    src={wallet.adapter.icon}
                    alt={`${wallet.adapter.name} icon`}
                    className="h-5 w-5"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                )}
                <span className="font-medium">{wallet.adapter.name}</span>
                {connecting && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </div>
              <Badge variant="outline">
                {wallet.readyState === WalletReadyState.Installed
                  ? "Installed"
                  : "Not Installed"}
              </Badge>
            </button>
          ))}

          {/* Collapsible section for additional wallets */}
          {collapsedWallets.length > 0 && (
            <Collapsible open={expanded} onOpenChange={setExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <span>More wallet options</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                {collapsedWallets.map((wallet) => (
                  <button
                    key={wallet.adapter.name}
                    onClick={(e) => handleWalletClick(e, wallet.adapter.name)}
                    disabled={connecting}
                    className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-secondary disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      {wallet.adapter.icon && (
                        <img
                          src={wallet.adapter.icon}
                          alt={`${wallet.adapter.name} icon`}
                          className="h-5 w-5"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      )}
                      <span className="font-medium">{wallet.adapter.name}</span>
                    </div>
                    <Badge variant="outline">
                      {wallet.readyState === WalletReadyState.Installed
                        ? "Installed"
                        : "Not Installed"}
                    </Badge>
                  </button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        <DialogClose asChild>
          <Button variant="outline" className="w-full mt-4">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

// Main Wallet Button Component
export function WalletConnectButton({
  children,
  labels = LABELS,
  ...props
}: WalletButtonProps) {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { publicKey, wallet, disconnect, connecting, connected } = useWallet();

  const content = useMemo(() => {
    if (!mounted) return labels["no-wallet"];

    if (children) {
      return children;
    } else if (connecting) {
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{labels["connecting"]}</span>
        </div>
      );
    }

    // Show wallet info when connected
    if (connected && publicKey) {
      return (
        <div className="flex items-center gap-2">
          {wallet?.adapter.icon && (
            <img
              src={wallet.adapter.icon}
              alt={`${wallet.adapter.name} icon`}
              className="h-5 w-5"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          )}
          <span>
            {`${publicKey.toBase58().slice(0, 6)}...${publicKey.toBase58().slice(-4)}`}
          </span>
        </div>
      );
    }

    return labels["has-wallet"];
  }, [mounted, children, connecting, connected, publicKey, wallet, labels]);

  const handleCopyAddress = useCallback(async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  }, [publicKey]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setMenuOpen(false);
  }, [disconnect]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!connected) {
    return (
      <>
        <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
        <Button
          {...props}
          onClick={() => {
            // Try custom modal first, fallback to standard modal
            setWalletModalOpen(true);
            // Alternative: setVisible(true);
          }}
        >
          {content}
        </Button>
      </>
    );
  }

  return (
    <>
      <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button {...props}>{content}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {publicKey && (
            <DropdownMenuItem onClick={handleCopyAddress}>
              {copied ? labels["copied"] : labels["copy-address"]}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {
              setWalletModalOpen(true);
              setMenuOpen(false);
            }}
          >
            {labels["change-wallet"]}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDisconnect}>
            {labels["disconnect"]}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
