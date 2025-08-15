"use client";
import React, { useEffect, useRef } from "react";
import "./cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Set initial state - cursor always visible
    gsap.set(cursor, {
      scale: 1,
    });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    // Add mousemove listener to follow cursor everywhere
    window.addEventListener("mousemove", moveCursor);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef}>
      {/* Arrow icon removed */}
    </div>
  );
};

export default Cursor;
