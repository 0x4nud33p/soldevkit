"use client";

import { PublicKey } from "@solana/web3.js";

import { Avatar } from "@/registry/default/ui/avatar/avatar";

export default function AvatarDemo() {
  // Sample public keys for demonstration
  const sampleAddress = new PublicKey("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM");

  return (
    <div className="space-y-8">
      {/* Default Size */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar address={sampleAddress} />
        </div>
      </div>


    </div>
  );
}
