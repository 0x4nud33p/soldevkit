"use client";

import * as React from "react";
import { type HTMLMotionProps, motion, type Transition } from "motion/react";

import { cn } from "@/lib/utils";

type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

function StarLayer({
  count = 300,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColor = "rgba(255, 255, 255, 0.9)",
  className,
  ...props
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>("");
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const effectiveStarColor = isDark ? starColor : "rgba(0, 0, 0, 0.3)";
    setBoxShadow(generateStars(count, effectiveStarColor));
  }, [count, starColor, isDark]);

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn("absolute top-0 left-0 w-full h-[2000px]", className)}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  speed?: number;
  starColor?: string;
};

function StarsBackground({
  children,
  className,
  speed = 80,
  starColor = "rgba(0, 0, 0, 0.3)",
  ...props
}: StarsBackgroundProps) {
  return (
    <div
      data-slot="stars-background"
      className={cn(
        "relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#f3f4f6_0%,_#e5e7eb_100%)] dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]",
        className,
      )}
      {...props}
    >
      {/* Single star layer with reduced count */}
      <StarLayer
        count={300}
        size={1}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        starColor={starColor}
      />

      {children}
    </div>
  );
}

export {
  StarLayer,
  StarsBackground,
  type StarLayerProps,
  type StarsBackgroundProps,
};
