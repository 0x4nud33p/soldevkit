import { useState, useEffect, useCallback } from "react";
import { TransactionSignature, Connection } from "@solana/web3.js";

export type ErrorState = string | null;
export type StatusState = "idle" | "loading" | "error" | "success";
type ValidResultState = { isValidTransaction: boolean } | null;

/**
 * Check if a Solana transaction is valid (confirmed)
 */
export function useIsValidTransaction(
  connection: Connection,
  transactionSignature: TransactionSignature,
  autoTrigger: boolean = true,
) {
  const [error, setError] = useState<ErrorState>(null);
  const [status, setStatus] = useState<StatusState>("idle");
  const [result, setResult] = useState<ValidResultState>(null);

  const fetchIsValidTransaction = useCallback(async () => {
    try {
      setStatus("loading");

      const tx = await connection.getParsedTransaction(transactionSignature, {
        commitment: "confirmed",
      });

      setResult({ isValidTransaction: !!tx });
      setStatus("success");
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }, [connection, transactionSignature]);

  useEffect(() => {
    if (autoTrigger) {
      fetchIsValidTransaction();
    }
  }, [fetchIsValidTransaction, autoTrigger]);

  return { result, status, error, fetchIsValidTransaction };
}
