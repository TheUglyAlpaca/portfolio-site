import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Harmonic Engine",
    description: "A real-time audio synthesis library built with Web Audio API, enabling musicians to create complex soundscapes in the browser.",
    tags: ["TypeScript", "Web Audio", "DSP"],
    github: "#",
    link: "#",
  },
  {
    title: "Neural Beats",
    description: "Machine learning model that generates drum patterns based on user input and musical context. Trained on thousands of rhythmic patterns.",
    tags: ["Python", "TensorFlow", "Music AI"],
    github: "#",
  },
  {
    title: "Code Cadence",
    description: "VS Code extension that provides ambient soundscapes while coding, dynamically adapting to your typing rhythm and time of day.",
    tags: ["JavaScript", "VS Code API", "Audio"],
    link: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-2">
            Work
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium">
            Selected <span className="text-primary italic">Projects</span>
          </h2>
        </div>
        
        <div className="grid gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
