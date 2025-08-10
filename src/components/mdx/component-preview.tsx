"use client";

import * as React from "react";

import { Index } from "@/__registry__";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  name: string;
  align?: "center" | "start" | "end";
  className?: string;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  name,
  align = "center",
  className,
}) => {
  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;

    if (!Component) {
      console.error(`Component with name "${name}" not found in registry.`);
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border p-8",
        "bg-gradient-to-br from-background via-muted/20 to-background",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_0)] before:bg-[length:20px_20px] before:opacity-90",
        "dark:before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] dark:before:opacity-50",
        className,
      )}
    >
      <div
        className={cn("relative z-10 flex h-[350px] w-full items-center p-10", {
          "justify-center": align === "center",
          "justify-start": align === "start",
          "justify-end": align === "end",
        })}
      >
        <React.Suspense
          fallback={
            <div className="flex items-center text-sm text-muted-foreground">
              Loading...
            </div>
          }
        >
          {Preview}
        </React.Suspense>
      </div>
    </div>
  );
};
