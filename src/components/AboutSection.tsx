const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-2 text-glow-blue">
              // About
            </p>
            <h2 className="font-pixel text-lg md:text-xl leading-relaxed">
              A Brief{" "}
              <span className="text-accent text-glow-green">Intro</span>
            </h2>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed font-mono">
            <p className="text-foreground">
              I'm an engineer with a passion for building thoughtful software and creating music 
              that moves people.
            </p>
            <p className="text-sm">
              With a background in Computer Science and formal training in music, I bring a unique 
              perspective to everything I create. I believe the best solutions—whether in code or 
              composition—emerge from the careful balance of structure and creativity.
            </p>
            <p className="text-sm">
              Currently exploring the spaces where technology and art intersect, building tools 
              that empower creators and crafting sounds that tell stories.
            </p>
            
            <div className="pt-6 flex flex-wrap gap-3">
              {["TypeScript", "React", "Python", "Piano", "Production", "Sound Design"].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-2 text-xs font-mono border-2 border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
