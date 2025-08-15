"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";

interface FooterProps {
  email: string;
  setEmail: (email: string) => void;
  handleSubscribe: (e?: React.FormEvent) => void;
  error: string | null;
  success: boolean;
  isLoading: boolean;
}

export const Footer = ({
  email,
  setEmail,
  handleSubscribe,
  error,
  success,
  isLoading,
}: FooterProps) => {
  return (
    <motion.footer
      className="px-6 md:px-12 lg:px-16 py-16 border-t border-white/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-8xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-12">
          {/* Left Side - Existing Content */}
          <div className="space-y-12 content-center items-center ml-12">
            {/* Subscribe Section */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif  bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent mb-6">
                Subscribe for updates
              </h2>
              <form
                onSubmit={(e) => handleSubscribe(e)}
                className="max-w-md mx-auto lg:mx-0 space-y-4"
              >
                <input
                  type="email"
                  placeholder="Email Address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                />
                {error && (
                  <p className="text-sm text-red-400 font-serif ">{error}</p>
                )}
                {success && (
                  <p className="text-sm text-green-400 font-serif ">
                    Successfully subscribed! Thank you for joining us.
                  </p>
                )}
                <p className="text-sm bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/70 via-40% via-white/70 to-white/30 text-transparent font-serif ">
                  By submitting this form, you agree to receive updates about
                  Soldevkit UI. You can unsubscribe at any time.
                </p>
                <motion.button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Right Side - Team Member Card */}
          <motion.div
            className="flex flex-col my-16"
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
                  <p className=" text-5xl font-serif  bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent leading-tight">
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

            {/* Team Member Index */}
          </motion.div>
        </div>
        <div className="absolute left-0 bottom-52 w-screen border-t border-white/10"></div>

        {/* Footer Links */}
        <motion.div
          className="text-center space-y-4 "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/70 via-40% via-white/70 to-white/30 text-transparent">
            © 2025 Soldevkit UI. All rights reserved
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="text-center mt-4 space-y-4 text-xs bg-clip-text bg-gradient-stop bg-white/50 text-transparent max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>
            Soldevkit UI is an open-source project. The components and design
            system are provided as-is for educational and development purposes.
            Users are responsible for ensuring compliance with applicable laws
            and regulations when building applications.
          </p>
          <p>
            The features described in these materials are for informational
            purposes only. All features may be modified, updated, or changed
            without prior notice.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};
