"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Repeat, ChevronDown } from "lucide-react";
import { WalletConnectButton } from "@/registry/default/ui/wallet/wallet-connect-button";
import { cn, fetchJupiterTokens, type TokenInfo } from "@/lib/utils";
import { APIErrorBoundary } from "@/components/error-boundary";
import { OptimizedImage } from "@/registry/default/ui/optimized-image";

const TokenDropdown: React.FC<{
  selectedToken: TokenInfo | null;
  onSelect: (token: TokenInfo) => void;
  tokens: TokenInfo[];
}> = ({ selectedToken, onSelect, tokens }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (token: TokenInfo) => {
    onSelect(token);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 bg-muted border border-border rounded-md shadow-sm flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200"
      >
        {selectedToken ? (
          <div className="flex items-center w-28">
            <OptimizedImage
              src={selectedToken.logoURI || "/placeholder-token.png"}
              alt={`${selectedToken.name} logo`}
              className="w-6 h-6 mr-2 rounded-full"
              fallbackSrc="/placeholder-token.png"
              lazy={false}
            />
            <span className="font-medium text-foreground">
              {selectedToken.symbol}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground w-28">Select a token</span>
        )}
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isOpen && "transform rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-[300px] overflow-y-auto"
        >
          <ul className="max-h-60 overflow-y-auto">
            {tokens.map((token) => (
              <li key={token.address}>
                <button
                  type="button"
                  onClick={() => handleSelect(token)}
                  className="w-full p-2 text-left hover:bg-muted flex items-center transition-colors duration-200"
                >
                  <OptimizedImage
                    src={token.logoURI || "/placeholder-token.png"}
                    alt={`${token.name} logo`}
                    className="w-6 h-6 mr-2 rounded-full"
                    fallbackSrc="/placeholder-token.png"
                    lazy={false}
                  />
                  <span className="font-medium text-foreground">
                    {token.symbol}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

const SwapUIContent: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [fromToken, setFromToken] = useState<TokenInfo | null>(null);
  const [toToken, setToToken] = useState<TokenInfo | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [solBalance, setSolBalance] = useState<number>(0);
  const [conversionRate, setConversionRate] = useState<number>(2);
  const [tokenError, setTokenError] = useState<string | null>(null);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        setTokenError(null);
        const data = await fetchJupiterTokens();
        setTokens(data);
      } catch (error) {
        console.error("Failed to fetch tokens", error);
        setTokenError(
          error instanceof Error ? error.message : "Failed to load tokens",
        );
      }
    };
    loadTokens();
  }, []);

  useEffect(() => {
    const fetchSolBalance = async () => {
      if (!publicKey || !connected) {
        setSolBalance(0);
        return;
      }
      try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const balance = await connection.getBalance(publicKey);
        setSolBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Failed to fetch SOL balance", error);
        setSolBalance(0);
      }
    };
    fetchSolBalance();
  }, [publicKey, connected]);

  // Throw error if token loading fails
  if (tokenError) {
    throw new Error(tokenError);
  }

  const handleMaxClick = () => {
    setFromAmount(solBalance.toString());
    const toValue = (solBalance * conversionRate).toFixed(6);
    setToAmount(toValue);
  };

  const handleHalfClick = () => {
    const halfBalance = solBalance / 2;
    setFromAmount(halfBalance.toString());
    const toValue = (halfBalance * conversionRate).toFixed(6);
    setToAmount(toValue);
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    const newFromAmount = toAmount;
    const newToAmount =
      newFromAmount && !isNaN(parseFloat(newFromAmount))
        ? (parseFloat(newFromAmount) * conversionRate).toString()
        : "";

    setFromAmount(newFromAmount);
    setToAmount(newToAmount);

    setConversionRate((prevRate) => (prevRate !== 0 ? 1 / prevRate : prevRate));
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const toValue = (parseFloat(value) * conversionRate).toFixed(6);
      setToAmount(toValue);
    } else {
      setToAmount("");
    }
  };

  return (
    <motion.div
      className="p-4 rounded-lg max-w-[600px] mx-auto bg-card shadow-md border border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Wallet Connection Section */}
      {!connected && (
        <div className="mb-4 p-4 bg-muted/50 border border-border rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            Connect your wallet to start swapping tokens
          </p>
          <div className="flex justify-center">
            <WalletConnectButton variant="default" size="sm" />
          </div>
        </div>
      )}

      <div className="-space-y-3">
        {/* From Section */}
        <motion.div
          className="p-4 rounded-lg bg-muted border border-border"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">
              You&apos;re selling
            </span>
            <div className="flex space-x-2">
              <div className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                {parseFloat(fromAmount || "0").toFixed(2)}
              </div>
              <button
                onClick={handleHalfClick}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md hover:bg-accent transition-colors"
              >
                HALF
              </button>
              <button
                onClick={handleMaxClick}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md hover:bg-accent transition-colors"
              >
                MAX
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <TokenDropdown
              selectedToken={fromToken}
              onSelect={setFromToken}
              tokens={tokens}
            />
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="bg-transparent text-right outline-none text-foreground w-1/2"
              placeholder="0.00"
              min="0"
            />
          </div>
        </motion.div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleSwapTokens}
            className="bg-background cursor-pointer p-2 rounded-md transition-colors border border-border"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!fromToken || !toToken}
            title="Swap Tokens"
          >
            <Repeat className="rotate-90 text-muted-foreground" />
          </motion.button>
        </div>

        {/* To Section */}
        <motion.div
          className="p-4 rounded-lg bg-muted border border-border"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">
              You&apos;re buying
            </span>
          </div>
          <div className="flex items-center justify-between">
            <TokenDropdown
              selectedToken={toToken}
              onSelect={setToToken}
              tokens={tokens}
            />
            <div className="flex flex-col justify-end items-end">
              <div className="pr-3">
                <div className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                  {parseFloat(fromAmount || "0").toFixed(2)}
                </div>
              </div>
              <input
                type="number"
                value={toAmount}
                readOnly
                className="bg-transparent outline-none text-right text-foreground w-full mt-1"
                placeholder="0.00"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.div
        className={`mt-4 ${
          fromAmount && fromToken && toToken
            ? "cursor-pointer"
            : "cursor-not-allowed"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: fromAmount && fromToken && toToken ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className={cn(
            "w-full py-3 rounded-lg transition-all",
            fromAmount && fromToken && toToken
              ? "bg-primary text-primary-foreground hover:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed",
          )}
          disabled={!fromAmount || !fromToken || !toToken}
        >
          {fromAmount ? "Swap" : "Enter an amount"}
        </button>
      </motion.div>
    </motion.div>
  );
};

const SwapUI: React.FC = () => {
  return (
    <APIErrorBoundary onRetry={() => window.location.reload()}>
      <SwapUIContent />
    </APIErrorBoundary>
  );
};

export default SwapUI;
