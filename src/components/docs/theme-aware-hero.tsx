"use client";

import { useTheme } from "next-themes";
import { Hero } from "@/components/ui/hero2";
import { useEffect, useState } from "react";

export function ThemeAwareHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // Only show hero in dark mode
  if (theme !== "dark") {
    return null;
  }

  return <Hero className="absolute top-0 left-0 right-0 min-h-full z-0" />;
}
