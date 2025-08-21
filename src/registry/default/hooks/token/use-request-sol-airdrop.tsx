import { useState } from "react";
import { PublicKey, Connection, TransactionSignature } from "@solana/web3.js";

export type ErrorState = string | null;
export type StatusState = "idle" | "loading" | "error" | "success";

type AirdropResultState = {
  transactionSignature: TransactionSignature;
} | null;

/**
 * Hook to request SOL airdrop for a given public key
 */
export function useRequestSolAirdrop(
  publicKey: PublicKey | null,
  connection: Connection,
) {
  const [error, setError] = useState<ErrorState>(null);
  const [status, setStatus] = useState<StatusState>("idle");
  const [result, setResult] = useState<AirdropResultState>(null);

  async function getSolAirdrop(
    solana: number = 1,
  ): Promise<AirdropResultState> {
    try {
      if (!publicKey) throw new Error("Wallet not connected");

      setStatus("loading");
      const lamports = solana * 1_000_000_000; // 1 SOL = 1_000_000_000 lamports

      const transactionSignature = await connection.requestAirdrop(
        publicKey,
        lamports,
      );

      // Wait for confirmation
      await connection.confirmTransaction(transactionSignature, "confirmed");

      setResult({ transactionSignature });
      setStatus("success");

      return { transactionSignature };
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
      return null;
    }
  }

  return { result, status, error, getSolAirdrop };
}
