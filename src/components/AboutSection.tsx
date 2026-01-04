const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl leading-relaxed font-bold">
              Who am I?
            </h2>
          </div>

          <div className="space-y-6 text-white leading-relaxed font-standard">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-4">
                <span className="text-primary text-xl leading-none mt-1">•</span>
                <span>I'm a Computer Engineer specializing in full stack development and applied AI applications</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-xl leading-none mt-1">•</span>
                <span>I design efficient and scalable applications</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-xl leading-none mt-1">•</span>
                <span>I have a strong foundation in algorithms, systems, and optimization</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-primary text-xl leading-none mt-1">•</span>
                <span>I bring a creative perspective shaped by DSP and music technology</span>
              </li>
            </ul>


          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
