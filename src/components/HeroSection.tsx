import { useState } from "react";
import { ArrowDown, FileText } from "lucide-react";
import heroPhoto from "@/assets/hero-profile-front.jpg";
import backPhoto from "@/assets/hero-profile-back.jpg";
import GameOfLife from "./GameOfLife";

const HeroSection = () => {
  const [rotation, setRotation] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on mount
  useState(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  });

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setRotation(prev => prev + 180);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setRotation(prev => prev + 180);
    }
  };

  const handleClick = () => {
    // Always works on mobile, also works on desktop as a fallback
    setRotation(prev => prev + 180);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
      <GameOfLife cellSize={20} updateInterval={150} opacity={0.08} />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
        .flip-card {
          perspective: 1000px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 1rem;
          overflow: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="text-center max-w-3xl mx-auto relative z-10">
        {/* Profile Photo - With floating animation and flip on hover/tap */}
        <div className="mb-8 animate-fade-up">
          <div
            className="w-40 h-40 md:w-48 md:h-48 mx-auto animate-float flip-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <div
              className="flip-card-inner border border-border/50 rounded-2xl"
              style={{ transform: `rotateY(${rotation}deg)` }}
            >
              <div className="flip-card-front">
                <img
                  src={heroPhoto}
                  alt="Robert Tylman"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flip-card-back">
                <img
                  src={backPhoto}
                  alt="Robert Tylman"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Greeting */}
        <p className="text-foreground text-base mb-3 animate-fade-up delay-100 font-standard">
          Hi, I'm Robert!
        </p>

        {/* Title - Cleaner, More Professional */}
        <h1 className="text-lg md:text-2xl lg:text-3xl mb-8 animate-fade-up delay-200 leading-tight font-semibold text-foreground whitespace-nowrap">
          Computer Engineer & Musician
        </h1>

        {/* Resume Button - Clean & Professional */}
        <div className="animate-fade-up delay-400">
          <a
            href={`${import.meta.env.BASE_URL}RobertTylmanResume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-foreground/30 hover:border-foreground text-foreground/80 hover:text-foreground transition-all duration-200 font-standard text-sm animate-pulse-scale backdrop-blur-md bg-white/5"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-12 animate-fade-in delay-500 text-muted-foreground hover:text-foreground transition-colors z-10"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section >
  );
};

export default HeroSection;
