"use client";

import { OpenInV0Button } from "@/components/ui/v0-button";
import { Button } from "@/components/ui/view-button";
import { cn } from "@/lib/utils";
import { Fullscreen, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import Iframe from "@/lib/iframe";
import { useIsMobile } from "@/components/hooks/use-mobile";

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  iframe?: boolean;
  bigScreen?: boolean;
  tweakpane?: React.ReactNode;
}

export const ComponentWrapper = ({
  className,
  children,
  name,
  iframe = false,
  bigScreen = false,
  tweakpane,
}: ComponentWrapperProps) => {
  const [tweakMode, setTweakMode] = useState(false);
  const [key, setKey] = useState(0);

  const isMobile = useIsMobile();

  return (
    <motion.div
      className={cn(
        "max-w-screen relative rounded-xl border bg-background flex flex-col md:flex-row",
        bigScreen && "overflow-hidden",
        className,
      )}
    >
      <motion.div className="relative size-full flex-1">
        {!iframe && (
          <div className="absolute top-3 right-3 z-[9] bg-background flex items-center justify-end gap-2 p-1 rounded-[11px]">
            <OpenInV0Button url={`https://soldevkit.com/r/${name}.json`} />

            <Button
              onClick={() => setKey((prev) => prev + 1)}
              className="flex items-center rounded-lg"
              variant="neutral"
              size="icon-sm"
              asChild
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw aria-label="restart-btn" size={14} />
              </motion.button>
            </Button>

            {iframe && (
              <Button
                onClick={() => window.open(`/examples/${name}`, "_blank")}
                className="flex items-center rounded-lg"
                variant="neutral"
                size="icon-sm"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Fullscreen aria-label="fullscreen-btn" size={14} />
                </motion.button>
              </Button>
            )}

            {tweakpane && (
              <Button
                onClick={() => setTweakMode((prev) => !prev)}
                className="flex items-center rounded-lg"
                variant="neutral"
                size="icon-sm"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SlidersHorizontal aria-label="tweak-btn" size={14} />
                </motion.button>
              </Button>
            )}
          </div>
        )}

        {iframe ? (
          <Iframe key={key} name={name} bigScreen={bigScreen} />
        ) : (
          <div
            key={key}
            className="flex min-h-[400px] w-full items-center justify-center px-10 py-16 relative overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(156, 163, 175, 0.15) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          >
            {/* Gradient overlay for better visual effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
                `,
              }}
            />
            {/* Dark mode overlay */}
            <div
              className="absolute inset-0 pointer-events-none dark:opacity-100 opacity-0 transition-opacity"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10">{children}</div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          width: isMobile ? "100%" : tweakMode ? "250px" : "0px",
          height: isMobile ? (tweakMode ? "250px" : "0px") : "auto",
          opacity: tweakMode ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          restDelta: 0.01,
        }}
        className="relative"
      >
        <div className="absolute inset-0 overflow-y-auto">{tweakpane}</div>
      </motion.div>
    </motion.div>
  );
};
