import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { HiArrowRight } from "react-icons/hi";
import "./manifest.css";

interface ManifestoProps {
  title?: string;
  content?: string;
}

const Manifesto: React.FC<ManifestoProps> = ({
  title = "Manifesto",
  content = "We challenge norms, embrace change, pioneer progress. We are innovators merging art and technology to craft experiences that surprise, delight, and evolve.",
}) => {
  const manifestoRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const splitTypeRef = useRef<SplitType | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isInitialized = useRef(false);

  const initializeAnimation = useCallback(() => {
    if (!titleRef.current || isInitialized.current) return;

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (!titleRef.current) return;

      try {
        // Create SplitType instance
        splitTypeRef.current = new SplitType(titleRef.current, {
          types: ["words", "chars"],
          tagName: "span",
          wordClass: "word",
          charClass: "char",
        });

        // Ensure we have chars to animate
        if (
          !splitTypeRef.current.chars ||
          splitTypeRef.current.chars.length === 0
        ) {
          console.warn("No characters found to animate");
          return;
        }

        // Set initial state with will-change for performance
        gsap.set(splitTypeRef.current.chars, {
          opacity: 0.25,
          willChange: "opacity",
        });

        // Create scroll-triggered timeline with optimized settings
        timelineRef.current = gsap.timeline({
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 70%", // Start earlier for smoother effect
            end: "bottom 30%", // End later for smoother effect
            scrub: 1.5, // Slightly slower scrub for smoother animation
            markers: false,
            invalidateOnRefresh: true, // Recalculate on resize
            refreshPriority: 1, // Higher priority
          },
        });

        // Animate each character with optimized timing
        splitTypeRef.current.chars.forEach((char: Element, index: number) => {
          timelineRef.current!.to(
            char,
            {
              opacity: 1,
              duration: 0.05, // Shorter duration for smoother effect
              ease: "none",
            },
            index * 0.05, // Reduced stagger for smoother flow
          );
        });

        isInitialized.current = true;
      } catch (error) {
        console.error("Error initializing manifesto animation:", error);
      }
    });
  }, []);

  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (splitTypeRef.current) {
      splitTypeRef.current.revert();
      splitTypeRef.current = null;
    }
    // Clean up will-change
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      chars.forEach((char) => {
        (char as HTMLElement).style.willChange = "auto";
      });
    }
    isInitialized.current = false;
  }, []);

  useEffect(() => {
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(initializeAnimation, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [initializeAnimation, cleanup]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (timelineRef.current) {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="manifesto" id="manifesto" ref={manifestoRef}>
      <div className="container">
        <div className="manifesto-header">
          <HiArrowRight size={13} />
          <p>{title}</p>
        </div>
        <div className="manifesto-title">
          <h1 ref={titleRef}>{content}</h1>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
