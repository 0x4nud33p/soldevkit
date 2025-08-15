"use client";

import WebGLBackground from "@/components/ui/webgl-background";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowRight, Star } from "lucide-react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useEmailSubscription } from "@/components/hooks/use-email-subscription";
import Manifesto from "@/components/manifest/manifest";
import { GlowCard } from "@/components/ui/spotlight-card";
import { CTASection } from "@/components/cta/cta-rectangle";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading, error, success } = useEmailSubscription();

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 0);

    return () => clearTimeout(scrollTimeout);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await subscribe(email.trim());
      setEmail("");
    } catch (err) {
      // Error is handled by the hook
      console.error("Subscription failed:", err);
    }
  };

  // Reset success/error state after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        // Reset states by reloading component or manually clearing
        setEmail("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const staggerItem = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div>
      <div className="relative w-full min-h-screen selection:bg-white/20 selection:text-white">
        {/* WebGL Background */}
        <WebGLBackground />
        {/* Content on top */}
        <div className="relative z-10 pointer-events-none">
          {/* Header/Banner */}
          <motion.header
            className="flex items-center justify-between p-6 w-full pointer-events-auto"
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
                className="text-3xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent leading-none tracking-wide"
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
              <Link href="https://github.com/satyawaniaman/soldevkit-UI">
                <AnimatedButton
                  size="lg"
                  label="GitHub"
                  variant="gradient"
                  iconLeft={<Star />}
                />
              </Link>
            </motion.nav>
          </motion.header>

          {/* Main Content */}
          <main className="px-6 md:px-12 lg:px-16 max-w-8xl mx-auto w-full pointer-events-auto">
            {/* Hero Section */}
            <motion.section
              className="text-center py-20 md:py-32 min-h-screen flex flex-col justify-center"
              {...staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div className="mb-8 -mt-40" variants={staggerItem}>
                <motion.h1
                  className="bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent leading-none tracking-wide text-6xl md:text-8xl lg:text-7xl xl:text-9xl font-serif italic max-w-7xl mx-auto mb-8"
                  variants={staggerItem}
                  transition={{ duration: 1 }}
                >
                  Crafted To Perform <br />
                  Not To Shout
                </motion.h1>
              </motion.div>

              <motion.div
                className="max-w-4xl mx-auto space-y-8"
                variants={staggerItem}
              >
                <div className="sm:flex-row flex flex-cols justify-center items-center gap-12">
                  <Link href="/docs/introduction">
                    <AnimatedButton
                      size="lg"
                      label="Read the docs"
                      variant="outline"
                      iconRight={<ArrowRight />}
                    />
                  </Link>
                  <Link href="/docs/button">
                    <AnimatedButton
                      size="lg"
                      label="Browse Components"
                      variant="outline"
                      iconRight={<ArrowRight />}
                    />
                  </Link>
                </div>
              </motion.div>
            </motion.section>

            {/* Content sections continue in same background */}
            {/* Manifesto Section */}
            <Manifesto
              title="Our Vision"
              content="Soldevkit isn't just a UI library it's a complete design system. With a single CLI command, you get a powerful set of components to build stunning Solana dApps effortlessly."
            />
            {/* Features Section */}
            <motion.section
              className="relative py-16 md:py-24"
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
                      <p className="font-serif italic text-sm uppercase tracking-wider text-white/90">
                        Features
                      </p>
                    </motion.div>
                    <motion.h2
                      className="text-3xl md:text-4xl lg:text-5xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent leading-tight"
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
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: 40 },
                      animate: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6 },
                      },
                    }}
                  >
                    <GlowCard glowColor="blue" size="md" className="h-full p-6">
                      <div className="space-y-4 flex flex-col justify-center h-full">
                        <h5 className="text-xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent font-semibold">
                          React & TypeScript
                        </h5>
                        <p className="text-base bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/80 via-40% via-white/80 to-white/40 text-transparent font-serif leading-relaxed">
                          Modern React patterns with full TypeScript support for
                          type-safe development.
                        </p>
                      </div>
                    </GlowCard>
                  </motion.div>

                  <motion.div
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
                      glowColor="purple"
                      size="md"
                      className="h-full p-6"
                    >
                      <div className="space-y-4 flex flex-col justify-center h-full">
                        <h5 className="text-xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent font-semibold">
                          Tailwind Integration
                        </h5>
                        <p className="text-base bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/80 via-40% via-white/80 to-white/40 text-transparent font-serif leading-relaxed">
                          Seamless Tailwind CSS integration for rapid styling
                          and design consistency.
                        </p>
                      </div>
                    </GlowCard>
                  </motion.div>

                  <motion.div
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
                      glowColor="green"
                      size="md"
                      className="h-full p-6"
                    >
                      <div className="space-y-4 flex flex-col justify-center h-full">
                        <h5 className="text-xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent font-semibold">
                          Motion & Animations
                        </h5>
                        <p className="text-base bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/80 via-40% via-white/80 to-white/40 text-transparent font-serif leading-relaxed">
                          Smooth Framer Motion animations for engaging user
                          experiences.
                        </p>
                      </div>
                    </GlowCard>
                  </motion.div>

                  <motion.div
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
                      glowColor="orange"
                      size="md"
                      className="h-full p-6"
                    >
                      <div className="space-y-4 flex flex-col justify-center h-full">
                        <h5 className="text-xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent font-semibold">
                          Shadcn Compatible
                        </h5>
                        <p className="text-base bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/80 via-40% via-white/80 to-white/40 text-transparent font-serif leading-relaxed">
                          Copy-paste components that integrate with Shadcn CLI
                          workflow.
                        </p>
                      </div>
                    </GlowCard>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* Call to Action Section */}
            <motion.section
              className="py-16 md:py-24 content-center items-center flex flex-col -mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <CTASection
                badge={{
                  text: "Get started",
                }}
                title="Start building with Launch UI"
                description="Build modern React applications with ease using Launch UI, a collection of components and utilities."
                action={{
                  text: "Get Started",
                  href: "/docs/introduction",
                  variant: "glow",
                }}
                className="max-w-4xl"
              />
            </motion.section>
          </main>

          {/* Footer */}
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
                    <h2 className="text-2xl md:text-3xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent mb-6">
                      Subscribe for updates
                    </h2>
                    <form
                      onSubmit={handleSubscribe}
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
                        <p className="text-sm text-red-400 font-serif italic">
                          {error}
                        </p>
                      )}
                      {success && (
                        <p className="text-sm text-green-400 font-serif italic">
                          Successfully subscribed! Thank you for joining us.
                        </p>
                      )}
                      <p className="text-sm bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/70 via-40% via-white/70 to-white/30 text-transparent font-serif italic">
                        By submitting this form, you agree to receive updates
                        about Soldevkit UI. You can unsubscribe at any time.
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

                  {/* Connect Section */}
                  <motion.div
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h2 className="text-xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent mb-6">
                      CONNECT WITH US
                    </h2>
                    <motion.div
                      className="flex justify-center lg:justify-start gap-6"
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      variants={{
                        initial: {},
                        animate: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                    >
                      <motion.div
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.4 },
                          },
                        }}
                      >
                        <Link
                          href="https://github.com/satyawaniaman/soldevkit-UI"
                          target="_blank"
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          GitHub
                        </Link>
                      </motion.div>
                      <motion.div
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.4 },
                          },
                        }}
                      >
                        <Link
                          href="https://twitter.com/satyawani_aman"
                          target="_blank"
                          className="text-white/70 hover:text-white transition-colors"
                        >
                          Twitter
                        </Link>
                      </motion.div>
                    </motion.div>
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
                    <p className="text-sm uppercase tracking-wider text-white/70 font-serif italic">
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
                              '<div class="w-full h-full flex items-center justify-center text-white/50 font-serif italic">Team Photo</div>';
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
                        <p className=" text-5xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30 text-transparent leading-tight">
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
                        <Link
                          href="https://x.com/satyawani_aman"
                          target="_blank"
                        >
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
                          <p className="text-white/60 leading-relaxed font-serif italic">
                            Aman is a skilled developer with expertise in modern
                            web technologies and a passion for creating seamless
                            user experiences.
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
                  Soldevkit UI is an open-source project. The components and
                  design system are provided as-is for educational and
                  development purposes. Users are responsible for ensuring
                  compliance with applicable laws and regulations when building
                  applications.
                </p>
                <p>
                  The features described in these materials are for
                  informational purposes only. All features may be modified,
                  updated, or changed without prior notice.
                </p>
              </motion.div>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
