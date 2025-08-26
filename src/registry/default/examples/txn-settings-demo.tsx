"use client";

import {
  TxnSettings,
  TxnSettingsProvider,
} from "@/registry/default/ui/transaction/txn-settings";

export default function TxnSettingsDemo() {
  return (
  
        <div className="flex flex-col items-center space-y-2">
          <TxnSettingsProvider>
            <TxnSettings />
          </TxnSettingsProvider>
        </div>
  );
}
