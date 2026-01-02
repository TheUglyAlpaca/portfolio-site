import { useState, useEffect } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const WebsiteIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
  >
    <g id="roll_brush" data-name="roll brush">
      <rect x="1.46" y="1.5" width="21.1" height="21.1" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.92px" />
      <polygon points="22.56 7.25 16.28 7.25 14.37 7.25 1.46 7.25 1.46 1.5 22.56 1.5 22.56 7.25" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.92px" />
      <line x1="4.34" y1="4.38" x2="6.25" y2="4.38" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.92px" />
      <line x1="8.17" y1="4.38" x2="10.09" y2="4.38" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.92px" />
      <line x1="12.01" y1="4.38" x2="13.93" y2="4.38" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.92px" />
    </g>
  </svg>
);

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  link?: string;
  github?: string;
  imageFit?: "cover" | "contain";
  logo?: string;
  webstoreLink?: string;
}

const ProjectCard = ({ title, description, tags, images, link, github, imageFit = "contain", logo, webstoreLink }: ProjectCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-play the carousel if there are multiple images
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent card click
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent card click
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <article className="group pixel-border text-border hover:text-primary transition-all duration-300 h-full flex flex-col">
      {/* Image Carousel */}
      {images.length > 0 && (
        <div className="relative aspect-video bg-black/5 overflow-hidden border-b-2 border-border group-hover:border-primary/50 transition-colors">
          <div className="w-full h-full relative">
            {images.map((img, index) => (
              <img
                key={img}
                src={img}
                alt={`${title} screenshot ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full ${imageFit === "cover" ? "object-cover" : "object-contain"} transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full text-foreground/70 hover:text-primary flex items-center justify-center transition-colors z-10 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full text-foreground/70 hover:text-primary flex items-center justify-center transition-colors z-10 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>


              {/* Lines indicator */}
              <div className="absolute bottom-0 left-0 w-full flex gap-1 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(index);
                    }}
                    className={`h-1 rounded-full transition-all duration-300 flex-1 ${index === currentImage
                      ? "bg-primary"
                      : "bg-white/40 hover:bg-white/60"
                      }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="p-6 bg-card flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {logo && <img src={logo} alt={`${title} logo`} className="w-10 h-10 object-contain" />}
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          <div className="flex gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="View project"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            {webstoreLink && (
              <a
                href={webstoreLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                aria-label="View on Chrome Web Store"
              >
                <WebsiteIcon className="w-5 h-5 p-[1px]" />
              </a>
            )}
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed font-standard flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-xs border border-border/50 rounded-full px-3 py-1 text-muted-foreground bg-secondary/30"
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
