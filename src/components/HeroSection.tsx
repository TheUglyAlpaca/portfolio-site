import { ArrowDown, FileText } from "lucide-react";
import heroPhoto from "@/assets/headshot.jpeg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative pixel-grid">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="text-center max-w-3xl mx-auto relative z-10">
        {/* Profile Photo - With floating animation */}
        <div className="mb-8 animate-fade-up">
          <div className="w-40 h-40 md:w-48 md:h-48 mx-auto overflow-hidden rounded-2xl border border-border/50 animate-float">
            <img
              src={heroPhoto}
              alt="Robert Tylman"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Greeting */}
        <p className="text-muted-foreground text-sm mb-3 animate-fade-up delay-100 font-standard">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-foreground/30 hover:border-foreground text-foreground/80 hover:text-foreground transition-all duration-200 font-standard text-sm"
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
