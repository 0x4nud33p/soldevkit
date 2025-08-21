import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { HiArrowRight } from "react-icons/hi";

interface ManifestoProps {
  title?: string;
  content?: string;
}

const Manifesto: React.FC<ManifestoProps> = ({
  title = "Manifesto",
  content = "We challenge norms, embrace change, pioneer progress. We are innovators merging art and technology to craft experiences that surprise, delight, and evolve.",
}) => {
  const manifestoRef = useRef<HTMLElement>(null);
  const [chars, setChars] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use Framer Motion's useScroll hook
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ["start 70%", "end 30%"], // Match GSAP trigger points
  });

  // Track scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Split text into characters on mount
  useEffect(() => {
    const characters = content.split("");
    setChars(characters);
  }, [content]);

  // Calculate opacity for each character based on scroll progress
  const getCharOpacity = (index: number) => {
    const totalChars = chars.length;
    const startProgress = (index / totalChars) * 0.8; // 80% of scroll range
    const endProgress = startProgress + 1 / totalChars;

    if (scrollProgress <= startProgress) return 0.25;
    if (scrollProgress >= endProgress) return 1;

    // Linear interpolation between start and end
    const progress =
      (scrollProgress - startProgress) / (endProgress - startProgress);
    return 0.25 + 0.75 * progress;
  };

  return (
    <section
      className="manifesto"
      id="manifesto"
      ref={manifestoRef}
      style={{
        position: "relative",
        height: "max-content",
        padding: "2rem 0 4rem 0",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1em 1em 1em 1em",
        }}
      >
        <div className="manifesto-header flex items-center gap-4 mb-8 opacity-80">
          <HiArrowRight size={13} className="text-black dark:text-white" />
          <p className="font-semibold text-xs leading-none uppercase tracking-wider m-0 font-serif text-black dark:text-white">
            {title}
          </p>
        </div>

        <div className="manifesto-title relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-light m-0 font-serif text-black dark:text-white transform-gpu">
            {chars.map((char, index) => (
              <motion.span
                key={index}
                animate={{
                  opacity: getCharOpacity(index),
                }}
                transition={{
                  duration: 0,
                  ease: "linear",
                }}
                style={{
                  display: "inline-block",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .manifesto {
            padding: 2rem 0 !important;
          }
          .container {
            padding: 1em !important;
          }
          .manifesto-header {
            margin-bottom: 2em !important;
          }
        }

        @media (max-width: 600px) {
          h1 {
            line-height: 1.2 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Manifesto;
