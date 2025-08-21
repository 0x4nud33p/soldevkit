"use client";

import { SendTokenForm } from "../ui/token/send-token";

export default function SendTokenDemo() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Transfer Solana Tokens</h1>
      <SendTokenForm className="max-w-md" />
    </div>
  );
}
