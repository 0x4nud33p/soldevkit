"use client";

import TextShimmer from "@/components/magicui/text-shimmer";
import { GlowCard } from "@/components/ui/spotlight-card";

import { HiArrowRight } from "react-icons/hi";
import { useInView } from "motion/react";
import { useRef } from "react";
import { AnimatedButton } from "../ui/animated-button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export function HeroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 mb-16 max-w-[80rem] px-6 text-center md:px-8"
    >
      <div className=" backdrop-filter-[12px] inline-flex h-7 items-center justify-between rounded-full border border-white/5 bg-white/10 px-3 text-xs  dark:text-black transition-all ease-in hover:cursor-pointer hover:bg-white/20 group gap-1 translate-y-[-1rem] animate-fade-in opacity-0">
        <TextShimmer className="inline-flex items-center justify-center">
          <span>✨ Introducing Solana Components</span>{" "}
          <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </div>
      <h1 className="bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        Soldevkit UI
        <br className="hidden md:block" /> the new way to build
        <br className="hidden md:block" />
        Solana dapps
      </h1>
      <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        Beautifully designed, animated components built with
        <br className="hidden md:block" /> Tailwind CSS, React, and Framer
        Motion.
      </p>
      <Link href="/docs/introduction" target="_blank">
        <AnimatedButton
          label="Get Started"
          iconRight={<HiArrowRight />}
          size="lg"
        />
      </Link>
      <div
        ref={ref}
        className="hero-image-container relative mx-auto mt-16 max-w-7xl"
        data-hero-image
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(50px)",
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <GlowCard
          customSize={true}
          glowColor="blue"
          className="w-full max-w-7xl mx-auto p-2"
        >
          <Image
            src="/hero-img.png"
            alt="Hero Image"
            width={1200}
            height={800}
            className="w-full rounded-lg shadow-2xl"
            priority
            style={{
              display: "block",
              opacity: 1,
              visibility: "visible",
            }}
          />
        </GlowCard>
      </div>
    </section>
  );
}
