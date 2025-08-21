"use client";

import { PublicKey } from "@solana/web3.js";

import { Avatar } from "@/registry/default/ui/avatar/avatar";

export default function AvatarDemo() {
  // Sample public keys for demonstration
  const sampleAddresses = [
    new PublicKey("9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"),
    new PublicKey("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"),
    new PublicKey("4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi"),
  ];

  return (
    <div className="space-y-8">
      {/* Default Size */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default Size (48px)</h3>
        <div className="flex items-center space-x-4">
          {sampleAddresses.slice(0, 3).map((address, index) => (
            <Avatar key={index} address={address} />
          ))}
        </div>
      </div>

      {/* Different Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="flex items-center space-x-4">
          <div className="text-center space-y-2">
            <Avatar address={sampleAddresses[0]} size={24} />
            <p className="text-xs text-muted-foreground">24px</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar address={sampleAddresses[0]} size={32} />
            <p className="text-xs text-muted-foreground">32px</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar address={sampleAddresses[0]} size={48} />
            <p className="text-xs text-muted-foreground">48px</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar address={sampleAddresses[0]} size={64} />
            <p className="text-xs text-muted-foreground">64px</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar address={sampleAddresses[0]} size={96} />
            <p className="text-xs text-muted-foreground">96px</p>
          </div>
        </div>
      </div>

      {/* Custom Styling */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Styling</h3>
        <div className="flex items-center space-x-4">
          <Avatar
            address={sampleAddresses[1]}
            size={64}
            className="border-2 border-primary"
          />
          <Avatar
            address={sampleAddresses[2]}
            size={64}
            className="border-2 border-destructive shadow-lg"
          />
          <Avatar
            address={sampleAddresses[3]}
            size={64}
            className="border-2 border-green-500 ring-2 ring-green-200"
          />
        </div>
      </div>

      {/* Avatar Group */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Avatar Group</h3>
        <div className="flex -space-x-2">
          {sampleAddresses.map((address, index) => (
            <Avatar
              key={index}
              address={address}
              size={40}
              className="border-2 border-background ring-2 ring-background"
            />
          ))}
        </div>
      </div>

      {/* With Labels */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Labels</h3>
        <div className="space-y-3">
          {sampleAddresses.slice(0, 2).map((address, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Avatar address={address} size={40} />
              <div>
                <p className="text-sm font-medium">
                  {address.toBase58().slice(0, 8)}...
                  {address.toBase58().slice(-8)}
                </p>
                <p className="text-xs text-muted-foreground">Wallet Address</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Example</h3>
        <div className="flex items-center space-x-4">
          <Avatar
            address={sampleAddresses[0]}
            size={56}
            className="cursor-pointer transition-transform hover:scale-110 border-2 border-muted hover:border-primary"
          />
          <div>
            <p className="text-sm font-medium">Hover to scale</p>
            <p className="text-xs text-muted-foreground">
              Interactive avatar with hover effects
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
