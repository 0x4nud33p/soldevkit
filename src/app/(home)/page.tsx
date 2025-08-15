"use client";

import { useState, useEffect } from "react";
import { CTASection } from "@/components/cta/cta-rectangle";
import { Header } from "@/components/hero/header";
import { HeroSection } from "@/components/hero/hero-section";
import { FeaturesSection } from "@/components/hero/features-section";
import { Footer } from "@/components/hero/footer";
import { Hero } from "@/components/ui/hero2";
import { useEmailSubscription } from "@/components/hooks/use-email-subscription";
import Manifesto from "@/components/manifest/manifest";
import { motion } from "motion/react";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const { subscribe, error, success, isLoading } = useEmailSubscription();

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);

    return () => clearTimeout(scrollTimeout);
  }, []);

  const handleSubscribe = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!email.trim()) return;

    try {
      await subscribe(email.trim());
      setEmail("");
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };

  // Reset success/error state after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setEmail("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div>
      <div className="relative w-full min-h-screen selection:bg-white/20 selection:text-white">
        <Hero className="absolute z-10 h-full w-full" />
        <div className="relative z-10">
          <Header className="pointer-events-auto" />
          <main className="px-6 md:px-12 lg:px-16 max-w-8xl mx-auto w-full pointer-events-none">
            <div className="pointer-events-auto">
            <HeroSection />
            <Manifesto
              title="Our Vision"
              content="Soldevkit isn't just a UI library it's a complete design system. With a single CLI command, you get a powerful set of components to build stunning Solana dApps effortlessly."
            />
            <FeaturesSection />
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
                title="Start building with Soldevkit UI"
                description="Build modern React applications with ease using Soldevkit UI, a collection of components and utilities."
                action={{
                  text: "Get Started",
                  href: "/docs/introduction",
                  variant: "glow",
                  target: "_blank",
                }}
                className="max-w-4xl"
              />
            </motion.section>
            </div>
          </main>
        </div>
        <div className="relative z-20">
          <Footer
            email={email}
            setEmail={setEmail}
            handleSubscribe={handleSubscribe}
            error={error}
            success={success}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
