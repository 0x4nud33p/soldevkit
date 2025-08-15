"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface HeroProps extends React.ComponentProps<"section"> {
  gradient?: boolean;
  blur?: boolean;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode[];
  titleClassName?: string;
  subtitleClassName?: string;
  actionsClassName?: string;
  backgroundTitle?: string;
  asBackground?: boolean; // New prop for background mode
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      gradient = true,
      blur = true,
      title,
      subtitle,
      actions,
      titleClassName,
      subtitleClassName,
      actionsClassName,
      backgroundTitle,
      asBackground = false, // Default to false for backward compatibility
      ...props
    },
    ref,
  ) => {
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering motion components after mount
    useEffect(() => {
      setMounted(true);
    }, []);

    // Different base classes for background mode vs normal mode
    const baseClasses = asBackground
      ? "fixed inset-0 z-0 pointer-events-none" // Fixed positioning for background
      : "relative z-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background";

    return (
      <section ref={ref} className={cn(baseClasses, className)} {...props}>
        {/* Background Title - only show in normal mode */}
        {backgroundTitle && !asBackground && (
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            {mounted ? (
              <motion.h1
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-bold text-foreground/5 select-none whitespace-nowrap leading-none tracking-tighter"
              >
                {backgroundTitle}
              </motion.h1>
            ) : (
              <h1 className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-bold text-foreground/5 select-none whitespace-nowrap leading-none tracking-tighter opacity-5">
                {backgroundTitle}
              </h1>
            )}
          </div>
        )}

        {gradient && (
          <div
            className={cn(
              "absolute isolate flex w-screen items-start justify-center",
              asBackground ? "top-0 h-full" : "top-0 flex-1",
            )}
          >
            {blur && (
              <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />
            )}

            {/* Main glow - extended height for background mode */}
            <div
              className={cn(
                "absolute inset-auto z-50 w-[28rem] -translate-y-[-30%] rounded-full bg-primary/60 opacity-80 blur-3xl",
                asBackground ? "h-96" : "h-36",
              )}
            />

            {/* Lamp effect */}
            {mounted ? (
              <motion.div
                initial={{ width: "8rem" }}
                viewport={{ once: true }}
                transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
                whileInView={{ width: "16rem" }}
                className={cn(
                  "absolute top-0 z-30 -translate-y-[20%] rounded-full bg-primary/60 blur-2xl",
                  asBackground ? "h-96" : "h-36",
                )}
              />
            ) : (
              <div
                className={cn(
                  "absolute top-0 z-30 -translate-y-[20%] rounded-full bg-primary/60 blur-2xl w-32",
                  asBackground ? "h-96" : "h-36",
                )}
              />
            )}

            {/* Left gradient cone - extended for background */}
            {mounted ? (
              <motion.div
                initial={{ opacity: 0.5, width: "15rem" }}
                whileInView={{ opacity: 1, width: "30rem" }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                }}
                className={cn(
                  "absolute inset-auto right-1/2 overflow-visible w-[30rem] bg-gradient-conic from-primary/60 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]",
                  asBackground ? "h-screen" : "h-56",
                )}
              >
                <div className="absolute w-[100%] left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                <div className="absolute w-40 h-[100%] left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
              </motion.div>
            ) : (
              <div
                style={{
                  backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                }}
                className={cn(
                  "absolute inset-auto right-1/2 overflow-visible w-60 bg-gradient-conic from-primary/60 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]",
                  asBackground ? "h-screen" : "h-56",
                )}
              >
                <div className="absolute w-[100%] left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                <div className="absolute w-40 h-[100%] left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
              </div>
            )}

            {/* Right gradient cone - extended for background */}
            {mounted ? (
              <motion.div
                initial={{ opacity: 0.5, width: "15rem" }}
                whileInView={{ opacity: 1, width: "30rem" }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                }}
                className={cn(
                  "absolute inset-auto left-1/2 w-[30rem] bg-gradient-conic from-transparent via-transparent to-primary/60 [--conic-position:from_290deg_at_center_top]",
                  asBackground ? "h-screen" : "h-56",
                )}
              >
                <div className="absolute w-40 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                <div className="absolute w-[100%] right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
              </motion.div>
            ) : (
              <div
                style={{
                  backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                }}
                className={cn(
                  "absolute inset-auto left-1/2 w-60 bg-gradient-conic from-transparent via-transparent to-primary/60 [--conic-position:from_290deg_at_center_top]",
                  asBackground ? "h-screen" : "h-56",
                )}
              >
                <div className="absolute w-40 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                <div className="absolute w-[100%] right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
              </div>
            )}
          </div>
        )}

        {/* Content - only render in normal mode */}
        {!asBackground &&
          (mounted ? (
            <motion.div
              initial={{ y: 100, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="relative z-50 container flex justify-center flex-1 flex-col px-5 md:px-10 gap-4 -translate-y-20"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <h1
                  className={cn(
                    "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
                    titleClassName,
                  )}
                >
                  {title}
                </h1>
                {subtitle && (
                  <p
                    className={cn(
                      "text-xl text-muted-foreground",
                      subtitleClassName,
                    )}
                  >
                    {subtitle}
                  </p>
                )}
                {actions && actions.length > 0 && (
                  <div className={cn("flex gap-4", actionsClassName)}>
                    {actions}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="relative z-50 container flex justify-center flex-1 flex-col px-5 md:px-10 gap-4 -translate-y-20 opacity-50">
              <div className="flex flex-col items-center text-center space-y-4">
                <h1
                  className={cn(
                    "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
                    titleClassName,
                  )}
                >
                  {title}
                </h1>
                {subtitle && (
                  <p
                    className={cn(
                      "text-xl text-muted-foreground",
                      subtitleClassName,
                    )}
                  >
                    {subtitle}
                  </p>
                )}
                {actions && actions.length > 0 && (
                  <div className={cn("flex gap-4", actionsClassName)}>
                    {actions}
                  </div>
                )}
              </div>
            </div>
          ))}
      </section>
    );
  },
);
Hero.displayName = "Hero";

export { Hero };
