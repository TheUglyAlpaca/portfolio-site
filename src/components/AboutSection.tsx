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
              With a background in Computer Science and music, I balance structure and creativity to deliver unique solutions. I explore the intersection of technology and art, building tools that empower creators and crafting sounds that tell stories.
            </p>


          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
