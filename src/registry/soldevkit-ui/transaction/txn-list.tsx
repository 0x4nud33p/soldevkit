"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/soldevkit-ui/table";
import { Skeleton } from "@/registry/soldevkit-ui/skeleton";

export interface Transaction {
  signature: string;
  block: number;
  time: string;
  sender: string;
  fee: number;
}

export interface TxnListProps {
  transactions?: Transaction[];
  loading?: boolean;
  className?: string;
}

export const TxnList: React.FC<TxnListProps> = ({
  transactions = [],
  loading = false,
  className,
}) => {
  const formatSignature = (signature: string) => {
    return `${signature.slice(0, 8)}...${signature.slice(-8)}`;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const getSolscanUrl = (signature: string) => {
    return `https://solscan.io/tx/${signature}`;
  };

  if (loading) {
    return (
      <div className={className}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Signature</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Fee (SOL)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className={className}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Signature</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Fee (SOL)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No transactions found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Signature</TableHead>
            <TableHead>Block</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Fee (SOL)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.signature}>
              <TableCell>
                <a
                  href={getSolscanUrl(transaction.signature)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {formatSignature(transaction.signature)}
                </a>
              </TableCell>
              <TableCell>{transaction.block.toLocaleString()}</TableCell>
              <TableCell>{transaction.time}</TableCell>
              <TableCell>
                <span className="font-mono text-sm">
                  {formatAddress(transaction.sender)}
                </span>
              </TableCell>
              <TableCell>{transaction.fee.toFixed(6)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
