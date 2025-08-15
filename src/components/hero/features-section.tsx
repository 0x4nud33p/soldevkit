"use client";

import { motion } from "motion/react";
import { HiArrowLeft } from "react-icons/hi";
import { GlowCard } from "@/components/ui/spotlight-card";

interface FeaturesSectionProps {
  className?: string;
}

const features = [
  {
    title: "React & TypeScript",
    description:
      "Modern React patterns with full TypeScript support for type-safe development.",
    glowColor: "blue" as const,
  },
  {
    title: "Tailwind Integration",
    description:
      "Seamless Tailwind CSS integration for rapid styling and design consistency.",
    glowColor: "purple" as const,
  },
  {
    title: "Motion & Animations",
    description:
      "Smooth Framer Motion animations for engaging user experiences.",
    glowColor: "green" as const,
  },
  {
    title: "Shadcn Compatible",
    description:
      "Copy-paste components that integrate with Shadcn CLI workflow.",
    glowColor: "orange" as const,
  },
];

export const FeaturesSection = ({ className }: FeaturesSectionProps) => {
  return (
    <motion.section
      className={`relative py-16 md:py-24 ${className || ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Features Header - Right Aligned */}
        <motion.div
          className="flex justify-end mb-16"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-right max-w-2xl">
            <motion.div
              className="flex items-center justify-end gap-4 mb-6 opacity-80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HiArrowLeft size={13} className="text-white/90" />
              <p className="font-serif  text-sm uppercase tracking-wider text-white/90">
                Features
              </p>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-serif  bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Built for Solana development from line one
            </motion.h2>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                initial: { opacity: 0, y: 40 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              <GlowCard
                glowColor={feature.glowColor}
                size="md"
                className="h-full p-6"
              >
                <div className="space-y-4 flex flex-col justify-center h-full">
                  <h5 className="text-xl font-serif  bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent font-semibold">
                    {feature.title}
                  </h5>
                  <p className="text-base bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/80 via-40% via-white/80 to-white/40 text-transparent font-serif leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
