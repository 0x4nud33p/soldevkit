"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// Check if Next.js Image is available
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let NextImage: React.ComponentType<any> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  NextImage = require("next/image").default;
} catch {
  // Next.js not available
}

export interface OptimizedImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "onLoad" | "onError"
  > {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fallbackSrc?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  lazy?: boolean;
  className?: string;
}

export const OptimizedImage = React.forwardRef<
  HTMLImageElement,
  OptimizedImageProps
>(
  (
    {
      src,
      alt,
      width,
      height,
      priority = false,
      quality = 75,
      placeholder = "empty",
      blurDataURL,
      fallbackSrc,
      onLoad,
      onError,
      lazy = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(!lazy || priority);
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
      if (!lazy || priority || isInView) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "50px" },
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      observerRef.current = observer;

      return () => {
        observer.disconnect();
      };
    }, [lazy, priority, isInView]);

    const handleLoad = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setIsLoading(false);
        setHasError(false);
        onLoad?.(event);
      },
      [onLoad],
    );

    const handleError = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setIsLoading(false);
        setHasError(true);

        if (fallbackSrc && imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
          setHasError(false);
          setIsLoading(true);
        }

        onError?.(event);
      },
      [onError, fallbackSrc, imageSrc],
    );

    // Use Next.js Image if available and in Next.js environment
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (
      NextImage &&
      typeof window !== "undefined" &&
      (window as any).__NEXT_DATA__
    ) {
      return (
        <NextImage
          ref={ref}
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300",
            isLoading && "opacity-0",
            !isLoading && "opacity-100",
            hasError && "opacity-50",
            className,
          )}
          {...props}
        />
      );
    }

    // Fallback to optimized HTML img
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{ width, height }}
      >
        {/* Placeholder/Loading state */}
        {isLoading && (
          <div
            className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center"
            style={{ width, height }}
          >
            <div className="w-8 h-8 border-2 border-muted-foreground/20 border-t-muted-foreground/60 rounded-full animate-spin" />
          </div>
        )}

        {/* Blur placeholder */}
        {placeholder === "blur" && blurDataURL && isLoading && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blurDataURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
            aria-hidden="true"
          />
        )}

        {/* Main image */}
        {isInView && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={(node) => {
              imgRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            loading={lazy && !priority ? "lazy" : "eager"}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "transition-opacity duration-300 w-full h-full object-cover",
              isLoading && "opacity-0",
              !isLoading && !hasError && "opacity-100",
              hasError && "opacity-50",
            )}
            {...props}
          />
        )}

        {/* Error state */}
        {hasError && !fallbackSrc && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <div className="text-muted-foreground text-sm text-center p-4">
              <svg
                className="w-8 h-8 mx-auto mb-2 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Failed to load image
            </div>
          </div>
        )}
      </div>
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";

// Utility function to preload images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Hook for image preloading
export const useImagePreload = (sources: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadPromises = sources.map(async (src) => {
      try {
        await preloadImage(src);
        setLoadedImages((prev) => new Set([...prev, src]));
      } catch {
        setFailedImages((prev) => new Set([...prev, src]));
      }
    });

    Promise.allSettled(preloadPromises);
  }, [sources]);

  return { loadedImages, failedImages };
};
