import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
      <div className="text-center max-w-4xl mx-auto">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6 animate-fade-up">
          Engineer • Musician • Creator
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 animate-fade-up delay-100">
          Hello, I'm{" "}
          <span className="text-primary italic">Your Name</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
          Crafting elegant solutions at the intersection of code and composition.
        </p>
      </div>
      
      <a 
        href="#about"
        className="absolute bottom-12 animate-fade-in delay-500 hover:text-primary transition-colors"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;
