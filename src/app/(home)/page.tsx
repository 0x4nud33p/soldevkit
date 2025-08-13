import WebGLBackground from "@/components/ui/webgl-background";
// import { LetterFx } from "@/components/ui/letterFx";
import { OnceUIProvider } from "@/components/once-ui/once-ui-provider";
import Link from "next/link";
import { Button } from "@once-ui-system/core";
const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden selection:bg-white/20 selection:text-white">
      {/* WebGL Background */}
      <WebGLBackground />

      {/* Content on top */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <nav className="flex items-center justify-between p-6 w-full">
          {/* Left side - Logo */}
          <div className="text-3xl font-serif italic bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30   text-transparent  leading-none tracking-wide ">
            Soldevkit UI
          </div>

          {/* Right side - GitHub stars button from animate-ui */}
          <div className="flex items-center gap-4">
            <OnceUIProvider>
              <Button
                prefixIcon="check"
                id="arrow-button-1"
                href="https://github.com/satyawaniaman/soldevkit-UI"
                target="_blank"
              >
                Github
              </Button>
            </OnceUIProvider>
          </div>
        </nav>

        {/* Main content - centered layout */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-8xl mx-auto w-full">
          {/* Eyebrow text - centered */}
          {/* <div className="flex items-center justify-center gap-4 mb-8 opacity-100">
            <div className="h-px bg-white/40 w-16"></div>
            <p className="text-xs uppercase tracking-widest text-white/70 font-medium">
              BUILD FOR SPEED 
            </p>
          </div> */}

          {/* Main heading - centered with gap between lines */}
          <div className="text-center mb-8">
            <h1 className="bg-clip-text bg-gradient-stop bg-gradient-to-br from-white via-30% via-white to-white/30   text-transparent  leading-none tracking-wide text-6xl md:text-8xl lg:text-7xl xl:text-9xl font-serif italic  max-w-7xl mx-auto">
              Crafted To Perform <br />
              Not To Shout
            </h1>
          </div>

          {/* Two column layout for description and buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left column - empty space or could be used for other content */}
            <div></div>
            {/* Right column - description and buttons */}
            <div className="space-y-8">
              {/* Description */}
              <div>
                <p className="bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/70 via-40% via-white/70 to-white/30  text-balance  text-transparent text-xl md:text-2xl font-serif italic">
                  Soldevkit is not just a UI library, it is a design system. It
                  provides a set of components that you can use to build Solana
                  dApps.built with React, TypeScript, Tailwind CSS, Motion and
                  Shadcn CLI. Browse a list of components you can install,
                  modify, and use in your projects. <br />
                  <Link
                    href="/docs"
                    className=" bg-clip-text bg-gradient-stop bg-gradient-to-br from-white/70 via-40% via-white/70 to-white/30  text-balance  text-transparent underline decoration-white/30 hover:decoration-white/60  transition-colors"
                  >
                    Read the docs.
                  </Link>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <OnceUIProvider>
                  <Button prefixIcon="check">Get Started</Button>
                </OnceUIProvider>
                <OnceUIProvider>
                  <Button prefixIcon="check">Browser Components</Button>
                </OnceUIProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
