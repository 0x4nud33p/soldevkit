"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { HiArrowRight } from "react-icons/hi";

interface TeamMemberProps {
  className?: string;
}

export const TeamMember = ({ className }: TeamMemberProps) => {
  return (
    <motion.div
      className={`flex flex-col my-16 ${className || ""}`}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Team Member Position */}
      <motion.div
        className="mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-sm uppercase tracking-wider text-white/70 font-serif ">
          Lead Developer
        </p>
      </motion.div>

      {/* Team Member Profile */}
      <motion.div
        className="flex items-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Team Member Image */}
        <div className="w-80 h-96 overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="Aman Satyawani"
            className="w-full h-full object-cover"
            width={400}
            height={400}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.innerHTML =
                  '<div class="w-full h-full flex items-center justify-center text-white/50 font-serif ">Team Photo</div>';
              }
            }}
          />
        </div>

        {/* Team Member Info */}
        <div className="relative flex flex-col gap-16 ml-8 w-full">
          {/* Team Member Name */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-5xl font-serif  bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent leading-tight">
              Aman <br />
              Satyawani
            </p>
          </motion.div>

          {/* Team Member Details */}
          <motion.div
            className="flex gap-8 items-start"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Toggle Button */}
            <Link href="https://x.com/satyawani_aman" target="_blank">
              <motion.div
                className="w-20 h-20 flex justify-center items-center border border-white/35 rounded-full cursor-pointer hover:border-white/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiArrowRight size={24} className="text-white/70" />
              </motion.div>
            </Link>

            {/* Team Member Copy */}
            <div className="flex-1 max-w-xs">
              <p className="text-white/60 leading-relaxed font-serif ">
                Aman is a skilled developer with expertise in modern web
                technologies and a passion for creating seamless user
                experiences.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
