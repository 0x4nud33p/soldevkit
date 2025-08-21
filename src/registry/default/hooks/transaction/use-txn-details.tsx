import { useState, useEffect, useCallback } from "react";
import {
  TransactionSignature,
  ParsedTransactionWithMeta,
  Connection,
} from "@solana/web3.js";

export type ErrorState = string | null;
export type StatusState = "idle" | "loading" | "error" | "success";
type DetailsResultState = {
  transactionDetails: ParsedTransactionWithMeta;
} | null;

/**
 * Fetch Solana transaction details
 */
export function useTransactionDetails(
  connection: Connection,
  transactionSignature: TransactionSignature,
  autoTrigger: boolean = true,
) {
  const [error, setError] = useState<ErrorState>(null);
  const [status, setStatus] = useState<StatusState>("idle");
  const [result, setResult] = useState<DetailsResultState>(null);

  const fetchTransactionDetails = useCallback(async () => {
    try {
      setStatus("loading");

      const tx = await connection.getParsedTransaction(transactionSignature, {
        commitment: "confirmed",
      });

      if (!tx) throw new Error("Transaction not found");

      setResult({ transactionDetails: tx });
      setStatus("success");
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }, [connection, transactionSignature]);

  useEffect(() => {
    if (autoTrigger) {
      fetchTransactionDetails();
    }
  }, [fetchTransactionDetails, autoTrigger]);

  return { result, status, error, fetchTransactionDetails };
}
