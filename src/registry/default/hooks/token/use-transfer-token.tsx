import { useState } from "react";
import {
  PublicKey,
  Connection,
  Transaction,
  SystemProgram,
  TransactionSignature,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";

export type ErrorState = string | null;
export type StatusState = "idle" | "loading" | "error" | "success";

type TransferResultState = {
  transactionSignature?: TransactionSignature;
} | null;

/**
 * Hook to transfer SOL or SPL tokens using a wallet adapter
 */
export function useTransferTokens(
  publicKey: PublicKey | null,
  connection: Connection,
  sendTransaction: WalletAdapterProps["sendTransaction"],
) {
  const [error, setError] = useState<ErrorState>(null);
  const [status, setStatus] = useState<StatusState>("idle");
  const [result, setResult] = useState<TransferResultState>(null);

  /**
   * Transfer SOL or SPL tokens
   * @param recipientAddress - recipient wallet address
   * @param token - "SOL" or { mint: PublicKey } for SPL token
   * @param amount - amount in SOL or token units
   */
  async function transferTokens(
    recipientAddress: string,
    token: "SOL" | { mint: PublicKey },
    amount: number,
  ): Promise<TransferResultState> {
    try {
      if (!publicKey) throw new Error("Wallet not connected");
      setStatus("loading");

      const recipientPubkey = new PublicKey(recipientAddress);
      const transaction = new Transaction();

      if (token === "SOL") {
        // SOL transfer
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPubkey,
            lamports: Math.round(amount * 1_000_000_000), // convert SOL to lamports
          }),
        );
      } else {
        // SPL token transfer
        const senderATA = await getAssociatedTokenAddress(
          token.mint,
          publicKey,
        );
        const recipientATA = await getAssociatedTokenAddress(
          token.mint,
          recipientPubkey,
        );

        transaction.add(
          createTransferInstruction(
            senderATA,
            recipientATA,
            publicKey,
            amount, // amount in smallest token units
            [],
            TOKEN_PROGRAM_ID,
          ),
        );
      }

      // Send transaction via wallet adapter
      const txSig: TransactionSignature = await sendTransaction(
        transaction,
        connection,
      );
      await connection.confirmTransaction(txSig, "confirmed");

      const res = { transactionSignature: txSig };
      setResult(res);
      setStatus("success");

      return res;
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
      return null;
    }
  }

  return { result, status, error, transferTokens };
}
