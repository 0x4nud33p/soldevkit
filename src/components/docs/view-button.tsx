"use client";
import React, { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLinkIcon,
  MessageCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { buttonVariants as fumadocsButtonVariants } from "fumadocs-ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";

const cache = new Map<string, string>();

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        neutral:
          "bg-neutral-100 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-11 rounded-md px-6 has-[>svg]:px-4",
        lg: "h-12 rounded-lg text-base px-8 has-[>svg]:px-6",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-xs": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export function LLMCopyButton({ markdownUrl }: { markdownUrl: string }) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl);
    if (cached) return navigator.clipboard.writeText(cached);

    setLoading(true);

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": fetch(markdownUrl).then(async (res) => {
            const content = await res.text();
            cache.set(markdownUrl, content);

            return content;
          }),
        }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={cn(
        fumadocsButtonVariants({
          color: "secondary",
          size: "sm",
          className: "[&_svg]:text-fd-muted-foreground gap-2 [&_svg]:size-3.5",
        }),
      )}
      onClick={onClick}
    >
      {checked ? <Check /> : <Copy />}
      Copy Markdown
    </button>
  );
}

export function ViewOptions({
  markdownUrl,
  githubUrl,
}: {
  markdownUrl: string;
  githubUrl: string;
}) {
  const reviewText = `Please review this documentation: ${typeof window !== "undefined" ? window.location.origin : ""}/api/mdx${markdownUrl} I want to ask questions about it.`;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          fumadocsButtonVariants({
            color: "secondary",
            size: "sm",
            className: "gap-2",
          }),
        )}
      >
        Open
        <ChevronDown className="text-fd-muted-foreground size-3.5" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border border-neutral-200 dark:border-neutral-800 shadow-lg relative z-50">
        <div
          className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-900"
          style={{
            opacity: "1",
          }}
        >
          <div className="flex flex-col gap-2">
            {/* GitHub */}
            <Button
              variant="neutral"
              size="sm"
              className="justify-start"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Edit on GitHub
              </a>
            </Button>

            {/* ChatGPT (supports ?q=) */}
            <Button
              variant="neutral"
              size="sm"
              className="justify-start"
              asChild
            >
              <a
                href={`https://chatgpt.com/?q=${encodeURIComponent(reviewText)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleIcon className="mr-2 h-4 w-4" />
                Open in ChatGPT
              </a>
            </Button>
            {/* Claude */}
            <Button
              variant="neutral"
              size="sm"
              className="justify-start"
              asChild
            >
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(reviewText)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleIcon className="mr-2 h-4 w-4" />
                Open in Claude
              </a>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { Button, buttonVariants };
