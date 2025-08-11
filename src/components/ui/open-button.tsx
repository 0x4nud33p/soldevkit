import { Button } from "@/components/ui/view-button";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

export function OpenButton({ url }: { url: string }) {
  return (
    <Button
      aria-label="Open"
      className="h-9 md:w-auto w-9 gap-1 rounded-md md:px-3 text-xs bg-neutral-950 text-white dark:bg-white dark:text-black hover:opacity-80 transition-opacity"
      asChild
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="no-underline"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="hidden md:block">Open</span>
        <ExternalLink className="size-4" />
      </motion.a>
    </Button>
  );
}
