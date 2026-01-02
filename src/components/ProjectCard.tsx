import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

const ProjectCard = ({ title, description, tags, link, github }: ProjectCardProps) => {
  return (
    <article className="group p-6 md:p-8 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-heading text-xl md:text-2xl font-medium group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex gap-3">
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="View project"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span 
            key={tag}
            className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
