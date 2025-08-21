"use client";

import {
  TxnSettings,
  TxnSettingsProvider,
} from "@/registry/default/ui/transaction/txn-settings";
import { Button } from "@/components/soldevkit-ui/button";
import { Settings, Zap, DollarSign } from "lucide-react";

export default function TxnSettingsDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full space-y-8">
      <div className="space-y-4 text-center">
        <h3 className="text-lg font-semibold">Transaction Settings</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Configure transaction priority fees, slippage tolerance, and other
          settings for optimal trading experience.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {/* Default Settings Button */}
        <div className="flex flex-col items-center space-y-2">
          <TxnSettingsProvider>
            <TxnSettings />
          </TxnSettingsProvider>
          <span className="text-xs text-muted-foreground">Default</span>
        </div>

        {/* Custom Trigger with Zap Icon */}
        <div className="flex flex-col items-center space-y-2">
          <TxnSettingsProvider>
            <TxnSettings
              trigger={
                <Button variant="outline" size="icon">
                  <Zap size={16} />
                </Button>
              }
            />
          </TxnSettingsProvider>
          <span className="text-xs text-muted-foreground">Custom Icon</span>
        </div>

        {/* Custom Trigger with Text */}
        <div className="flex flex-col items-center space-y-2">
          <TxnSettingsProvider>
            <TxnSettings
              trigger={
                <Button variant="secondary">
                  <DollarSign size={16} className="mr-2" />
                  Settings
                </Button>
              }
            />
          </TxnSettingsProvider>
          <span className="text-xs text-muted-foreground">With Text</span>
        </div>

        {/* Ghost Variant */}
        <div className="flex flex-col items-center space-y-2">
          <TxnSettingsProvider>
            <TxnSettings
              trigger={
                <Button variant="ghost" size="icon">
                  <Settings size={16} />
                </Button>
              }
            />
          </TxnSettingsProvider>
          <span className="text-xs text-muted-foreground">Ghost</span>
        </div>
      </div>
    </div>
  );
}
