"use client";

import { useState, useEffect } from "react";
import { Search, FileText, Hash } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  url: string;
  content?: string;
}

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Open search dialog with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-background border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search documentation...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Dialog Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                    autoFocus
                  />
                  {isLoading && (
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  )}
                </div>

                {/* Search Results */}
                <div className="max-h-96 overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result) => (
                        <Link
                          key={result.id}
                          href={result.url}
                          onClick={handleResultClick}
                          className="flex items-start gap-3 p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group"
                        >
                          <div className="mt-0.5">
                            {result.url.includes("#") ? (
                              <Hash className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                            ) : (
                              <FileText className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground group-hover:text-accent-foreground truncate">
                              {result.title}
                            </div>
                            {result.content && (
                              <div className="text-sm text-muted-foreground group-hover:text-accent-foreground/80 mt-1 line-clamp-2">
                                {result.content}
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground group-hover:text-accent-foreground/60 mt-1">
                              {result.url}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : query && !isLoading ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No results found for &ldquo;{query}&rdquo;</p>
                      <p className="text-sm mt-1">Try searching with different keywords</p>
                    </div>
                  ) : !query ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Start typing to search documentation</p>
                      <div className="flex items-center justify-center gap-2 mt-3 text-xs">
                        <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">↑</kbd>
                        <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">↓</kbd>
                        <span>to navigate</span>
                        <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">↵</kbd>
                        <span>to select</span>
                        <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground">esc</kbd>
                        <span>to close</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}