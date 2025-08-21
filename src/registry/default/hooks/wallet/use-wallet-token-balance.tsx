import { useState } from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { getLamportsToSol } from "@/registry/default/utils/solana";

export type ErrorState = string | null;
export type StatusState = "idle" | "loading" | "error" | "success";
type UserBalanceResultState = number;

// safer invariant
export function invariant(
  condition: unknown,
  message?: string | (() => string),
): asserts condition {
  if (!condition) {
    const msg = typeof message === "function" ? message() : message;
    throw new Error(msg || "Invariant failed");
  }
}

export function useWalletTokenBalance(
  publicKey: PublicKey | null,
  connection: Connection,
) {
  const [error, setError] = useState<ErrorState>(null);
  const [status, setStatus] = useState<StatusState>("idle");
  const [result, setResult] = useState<UserBalanceResultState>(0);

  async function getWalletTokenBalance(
    tokenSymbol: "SOL",
    digitsToDisplay?: number,
  ): Promise<number | null> {
    try {
      // explicit error for wallet not connected
      if (!publicKey) throw new WalletNotConnectedError();

      // explicit check for token type
      invariant(tokenSymbol === "SOL", "Only SOL is supported");

      setStatus("loading");

      const lamports = await connection.getBalance(publicKey);
      const { sol } = getLamportsToSol(lamports, digitsToDisplay);

      setResult(sol);
      setStatus("success");

      return sol;
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
      return null;
    }
  }

  return { result, status, error, getWalletTokenBalance };
}
