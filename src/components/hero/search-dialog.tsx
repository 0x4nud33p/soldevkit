"use client";

import { Search } from "lucide-react";

export function SearchDialog() {
  const handleSearchClick = () => {
    // Trigger the Fumadocs search by dispatching the keyboard event
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      ctrlKey: true,
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleSearchClick}
      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search documentation...</span>
      <span className="sm:hidden">Search...</span>
      <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}