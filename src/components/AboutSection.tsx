const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl leading-relaxed font-bold">
              About
            </h2>
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed font-standard">
            <p className="text-foreground text-lg">
              I'm a Computer Engineer focused on software engineering and applied AI.
              I build scalable, intelligent systems that solve complex problems and improve workflows,
              including tools for music and audio technology. My work emphasizes clean design,
              strong algorithms, and practical impact.
            </p>
            <p className="text-base">
              With a background in Computer Science and formal training in music, I bring a unique
              perspective to everything I create. I believe the best solutions—whether in code or
              composition—emerge from the careful balance of structure and creativity.
            </p>
            <p className="text-base">
              Currently exploring the spaces where technology and art intersect, building tools
              that empower creators and crafting sounds that tell stories.
            </p>

            <div className="pt-8 flex flex-wrap gap-4">
              {["TypeScript", "React", "Python", "Piano", "Production", "Sound Design"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-mono pixel-border text-muted-foreground hover:text-primary transition-colors bg-secondary/30"
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
