"use client";

import { Badge } from "@/components/cta/badge";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "../ui/animated-button";
import Link from "next/link";

interface CTAProps {
  badge?: {
    text: string;
  };
  title: string;
  description?: string;
  action: {
    text: string;
    href: string;
    variant?: "default" | "glow";
    target?: string;
  };
  withGlow?: boolean;
  className?: string;
}

export function CTASection({
  badge,
  title,
  description,
  action,
  withGlow = false,
  className,
}: CTAProps) {
  return (
    <section className={cn("overflow-hidden pt-0 md:pt-0", className)}>
      <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
        {/* Badge */}
        {badge && (
          <Badge
            variant="outline"
            className="opacity-0 animate-fade-in-up delay-100 border-black/20 bg-black/5 text-black/80 dark:border-white/20 dark:bg-white/5 dark:text-white/80 font-serif text-sm px-4 py-2"
          >
            <span className="bg-clip-text bg-gradient-stop bg-gradient-to-br from-black/90 via-30% via-black/90 to-black/50 dark:from-white/90 dark:via-white/90 dark:to-white/50 text-transparent">
              {badge.text}
            </span>
          </Badge>
        )}

        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif bg-clip-text bg-gradient-stop bg-gradient-to-br from-black via-30% via-black to-black/30 dark:from-white dark:via-white dark:to-white/30 text-transparent leading-tight opacity-0 animate-fade-in-up delay-200">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-base bg-clip-text bg-gradient-stop bg-gradient-to-br from-black/80 via-40% via-black/80 to-black/40 dark:from-white/80 dark:via-white/80 dark:to-white/40 text-transparent font-serif leading-relaxed opacity-0 animate-fade-in-up delay-300 max-w-2xl">
            {description}
          </p>
        )}

        {/* Action Button */}
        <Link href={action.href} target={action.target}>
          <AnimatedButton label={action.text}>{action.text}</AnimatedButton>
        </Link>

        {/* Glow Effect */}
        {withGlow && (
          <div className="fade-top-lg pointer-events-none absolute inset-0 rounded-2xl shadow-glow opacity-0 animate-scale-in delay-700" />
        )}
      </div>
    </section>
  );
}
