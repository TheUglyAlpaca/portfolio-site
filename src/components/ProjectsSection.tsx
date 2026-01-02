import ProjectCard from "./ProjectCard";
import projectCode from "@/assets/project-code.png";
import projectAudio from "@/assets/project-audio.png";
import projectAi from "@/assets/project-ai.png";

const projects = [
  {
    title: "Harmonic Engine",
    description: "A real-time audio synthesis library built with Web Audio API, enabling musicians to create complex soundscapes in the browser.",
    tags: ["TypeScript", "Web Audio", "DSP"],
    images: [projectAudio, projectCode],
    github: "#",
    link: "#",
  },
  {
    title: "Neural Beats",
    description: "Machine learning model that generates drum patterns based on user input and musical context. Trained on thousands of rhythmic patterns.",
    tags: ["Python", "TensorFlow", "Music AI"],
    images: [projectAi, projectAudio],
    github: "#",
  },
  {
    title: "Code Cadence",
    description: "VS Code extension that provides ambient soundscapes while coding, dynamically adapting to your typing rhythm and time of day.",
    tags: ["JavaScript", "VS Code API", "Audio"],
    images: [projectCode, projectAi],
    link: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-2 text-glow-blue">
            // Projects
          </p>
          <h2 className="font-pixel text-lg md:text-xl leading-relaxed">
            Selected{" "}
            <span className="text-accent text-glow-green">Works</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
