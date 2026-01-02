const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-2">
              About
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium">
              A Brief <span className="text-primary italic">Introduction</span>
            </h2>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg text-foreground">
              I'm an engineer with a passion for building thoughtful software and creating music 
              that moves people.
            </p>
            <p>
              With a background in Computer Science and formal training in music, I bring a unique 
              perspective to everything I create. I believe the best solutions—whether in code or 
              composition—emerge from the careful balance of structure and creativity.
            </p>
            <p>
              Currently exploring the spaces where technology and art intersect, building tools 
              that empower creators and crafting sounds that tell stories.
            </p>
            
            <div className="pt-6 flex flex-wrap gap-3">
              {["TypeScript", "React", "Python", "Piano", "Production", "Sound Design"].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 text-sm border border-border rounded-full text-muted-foreground hover:border-primary hover:text-primary transition-colors"
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
