// src/components/solana/SolanaUIProvider.tsx
import {
  ThemeProvider,
  DataThemeProvider,
  ToastProvider,
  IconProvider,
  LayoutProvider,
} from "@once-ui-system/core";
import { fonts } from "./once-ui.config";

interface OnceUIProviderProps {
  children: React.ReactNode;
}

export function OnceUIProvider({ children }: OnceUIProviderProps) {
  return (
    <div
      className={`solana-ui-scope ${fonts.heading.variable} ${fonts.body.variable} ${fonts.label.variable} ${fonts.code.variable}`}
      data-solana-ui
    >
      <LayoutProvider>
        <ThemeProvider>
          <DataThemeProvider>
            <ToastProvider>
              <IconProvider>{children}</IconProvider>
            </ToastProvider>
          </DataThemeProvider>
        </ThemeProvider>
      </LayoutProvider>
    </div>
  );
}
