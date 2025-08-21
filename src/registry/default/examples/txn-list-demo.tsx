"use client";

import React from "react";
import { VersionedTransactionResponse } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

// ✅ Use React.lazy with default export from txn-list.tsx
const TxnList = React.lazy(
  () => import("@/registry/default/ui/transaction/txn-list"),
);

export default function TxnListDemo() {
  const { connection } = useConnection();
  const [transactions, setTransactions] = React.useState<
    VersionedTransactionResponse[]
  >([]);
  const [isFetching, setIsFetching] = React.useState(false);

  const fetchTransactions = React.useCallback(async () => {
    if (isFetching) return;

    try {
      setIsFetching(true);
      const signatures = [
        "3EgXo2ExYe76GqkjbCbwPMW7reoptpGjnvCUwsKsAPHtKdH3jj9y9ivKaeZyh4bz1tAvZrq6Q6spG6cm6q6MwYwa",
        "kiJMZhehtKezX6Hg5kenUQSbLaTpe9dbqZyvqW4FNXaD6UVuLiGW1yPLENdSjyXWR1MSh8jSWDovZw5RW3bkFSE",
      ];

      const fetchedTxns = await connection.getTransactions(signatures, {
        maxSupportedTransactionVersion: 0,
      });

      // filter out nulls
      setTransactions(
        fetchedTxns.filter(
          (txn): txn is VersionedTransactionResponse => txn !== null,
        ),
      );
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, connection]);

  React.useEffect(() => {
    if (transactions.length === 0 && !isFetching) {
      fetchTransactions();
    }
  }, [fetchTransactions, transactions.length, isFetching]);

  return (
    // ✅ Wrap lazy-loaded component in Suspense
    <React.Suspense fallback={<div>Loading transactions...</div>}>
      <TxnList
        transactions={transactions}
        onClick={(txn) => {
          console.log("Clicked:", txn.transaction.signatures[0]);
        }}
      />
    </React.Suspense>
  );
}
