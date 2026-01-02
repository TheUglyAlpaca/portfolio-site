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
              I’m a Computer Engineer focused on software engineering and applied AI.
              I build scalable, high-performance systems that solve complex problems and
              improve real-world workflows, with an emphasis on clean architecture and
              efficient algorithms.
            </p>
            <p className="text-muted-foreground text-lg">
              With a strong foundation in computer science and experience in music technology,
              I bring a structured, analytical approach while maintaining a creative perspective
              in building impactful tools.
            </p>


          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
