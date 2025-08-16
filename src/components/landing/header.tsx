"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SearchDialog } from "./search-dialog";
import GitHubIcon from "@/components/icons/github-icon";
import XIcon from "@/components/icons/x-icon";
import { ThemeSwitcher } from "@/components/docs/theme-switcher";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
  };

  return (
    <motion.header
      className={`max-w-7xl mx-auto flex items-center justify-between p-6 w-full pointer-events-auto ${className || ""}`}
      {...fadeIn}
      transition={{ ...fadeIn.transition, delay: 0.2 }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link
          href="/"
          className="text-2xl font-serif  bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent leading-none tracking-wide"
        >
          Soldevkit UI
        </Link>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <SearchDialog />
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/satyawaniaman/soldevkit-UI"
            className="text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="w-5 h-5" />
          </Link>
          <Link
            href="https://x.com/satyawani_aman"
            className="text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon className="w-5 h-5" />
          </Link>
          <ThemeSwitcher className="w-10 h-5" />
        </div>
      </motion.nav>
    </motion.header>
  );
};
