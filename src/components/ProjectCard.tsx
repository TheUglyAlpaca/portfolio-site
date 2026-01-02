import { useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  link?: string;
  github?: string;
}

const ProjectCard = ({ title, description, tags, images, link, github }: ProjectCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <article className="group bg-card border-2 border-border hover:border-primary transition-all duration-300">
      {/* Image Carousel */}
      {images.length > 0 && (
        <div className="relative aspect-video bg-background overflow-hidden">
          <img 
            src={images[currentImage]} 
            alt={`${title} screenshot ${currentImage + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 border-2 border-border hover:border-primary flex items-center justify-center text-foreground hover:text-primary transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 border-2 border-border hover:border-primary flex items-center justify-center text-foreground hover:text-primary transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              {/* Dots indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 transition-colors ${
                      index === currentImage ? "bg-primary" : "bg-foreground/30"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-pixel text-sm group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex gap-3">
            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
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
        
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-mono">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
