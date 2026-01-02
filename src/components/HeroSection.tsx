import { ArrowDown } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
      <div className="text-center max-w-4xl mx-auto">
        {/* Profile Photo */}
        <div className="mb-8 animate-fade-up">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto border-4 border-primary glow-blue overflow-hidden">
            <img 
              src={profileAvatar} 
              alt="Profile photo"
              className="w-full h-full object-cover pixel-render"
            />
          </div>
        </div>

        <p className="text-primary text-xs tracking-[0.4em] uppercase mb-6 animate-fade-up delay-100 text-glow-blue">
          {"<"} Engineer / Musician / Creator {"/>"}
        </p>
        <h1 className="font-pixel text-2xl md:text-3xl lg:text-4xl tracking-tight mb-8 animate-fade-up delay-200 leading-relaxed">
          Hello, I'm{" "}
          <span className="text-accent text-glow-green">Your Name</span>
        </h1>
        <p className="font-mono text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up delay-300">
          Crafting elegant solutions at the intersection of{" "}
          <span className="text-primary">code</span> and{" "}
          <span className="text-accent">composition</span>.
        </p>
      </div>
      
      <a 
        href="#about"
        className="absolute bottom-12 animate-fade-in delay-500 text-primary hover:text-accent transition-colors"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </a>

      {/* Decorative pixel grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>
    </section>
  );
};

export default HeroSection;
