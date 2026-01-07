import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import twistIcon from "@/assets/twist-icon.png";
import twistImg1 from "@/assets/Twist-Game-Flow-1.png";
import twistImg2 from "@/assets/Twist-Game-Flow-2.png";
import twistImg3 from "@/assets/Twist-Game-Flow-3.png";
import twistImg4 from "@/assets/Twist-Game-Flow-4.png";
import twistImg5 from "@/assets/Twist-Game-Flow-5.png";
import twistImg6 from "@/assets/Twist-Game-Flow-6.png";
import twistImg7 from "@/assets/Twist-Game-Flow-7.png";
import twistImg8 from "@/assets/Twist-Game-Flow-8.png";
import twistImg9 from "@/assets/Twist-Game-Flow-9.png";
import tuneboyScreenshot from "@/assets/tuneboy-screenshot.png";
import tuneboyLogo from "@/assets/tuneboy_logo.png";
import tuneboyAvif from "@/assets/tuneboy.avif";
import crImg1 from "@/assets/chrome-recorder-1.jpg";
import crImg2 from "@/assets/chrome-recorder-2.jpg";
import crImg3 from "@/assets/chrome-recorder-3.jpg";
import crImg4 from "@/assets/chrome-recorder-4.jpg";
import crImg5 from "@/assets/chrome-recorder-5.jpg";
import synthDemo from "@/assets/synth-demo.png";
import campSorterDemo from "@/assets/campsorter-demo.png";
import campSorterDemo2 from "@/assets/campsorter-demo-2.png";
import campSorterDemo3 from "@/assets/campsorter-demo-3.png";
import uniDash1 from "@/assets/uni-dashboard-1.png";
import uniDash2 from "@/assets/uni-dashboard-2.png";
import uniDash3 from "@/assets/uni-dashboard-3.png";

const projects = [
  {
    title: "Twist!",
    description: "Built a production-ready multiplayer party game that transforms players’ camera rolls into AI-generated challenges, featuring real-time image uploads, transformation pipelines, voting, and a responsive UI.",
    tags: ["Expo", "Express", "Gemini 3.0 API", "Node.js", "React.js", "Redis", "Socket.io"],
    images: [twistImg1, twistImg2, twistImg3, twistImg4, twistImg5, twistImg6, twistImg7, twistImg8, twistImg9],
    link: "https://twistpartygame.com/",
  },
  {
    title: "TuneBoy",
    description: "A generative music sequencer and synthesizer designed for the MEAP board (ESP32). It combines procedural melody generation, smart chord progressions, and a rhythmic drum sequencer to create evolving 4-voice polyphonic music in real-time.",
    tags: ["Arduino", "C++", "ESP32", "Digital Signal Processing", "Embedded Systems"],
    images: [tuneboyAvif],
    imageFit: "cover" as const,
    link: "https://github.com/TheUglyAlpaca/TuneBoy",
  },
  {
    title: "Chrome Recorder",
    description: "A clean, lightweight Chrome extension that records and saves your browser's audio in real time. It lets users capture any sound from the browser for quick sampling, with an intuitive UI and multiple export options for seamless integration into creative or production workflows.",
    tags: ["Chrome Extensions Architecture", "lame.js", "React", "TypeScript", "Web Audio API"],
    images: [crImg5, crImg4, crImg2, crImg1, crImg3],
    link: "https://github.com/TheUglyAlpaca/Chrome-Record",
    imageFit: "cover" as const,
    webstoreLink: "https://chromewebstore.google.com/detail/chrome-recorder/bfmjmjjaiefmjalpplfjeiiicddojdpf",
  },
  {
    title: "Audio Plugin Suite",
    description: "Developed a suite of DAW plugins (Synths, EQs, Filters) for professional audio production, implementing signal processing algorithms and intuitive user interfaces.",
    tags: ["C++", "JUCE"],
    images: [synthDemo],

  },
  {
    title: "CampSorter",
    description: "Developed a full-stack logistical optimization tool to automate scheduling, assignments, and operations for large-scale summer programming. Improved administrative efficiency and reduced manual processing.",
    tags: ["HTML5 & CSS3", "JavaScript", "SQL"],
    images: [campSorterDemo2, campSorterDemo, campSorterDemo3],
    link: "https://github.com/TheUglyAlpaca/CamperSort",
  },
  {
    title: "University Dashboards",
    description: "Created multiple Chrome Extensions using HTML, CSS, and JavaScript to streamline access to different university links and resources. With over 100 active users, it significantly enhances productivity for students.",
    tags: ["Chrome Extensions Architecture", "HTML5 & CSS3", "JavaScript"],
    images: [uniDash1, uniDash2, uniDash3],
    link: "https://github.com/TheUglyAlpaca/NYUDashboard",
    webstoreLink: "https://chromewebstore.google.com/detail/vanderbilt-dashboard/bbbjeogjpjcflkbnjkpfjgcibcccjjpd",
  },
];

const CARD_WIDTH = 384; // w-96
const GAP = 24;

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextProject();
    else if (distance < -50) prevProject();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Calculate translateX to center current card
  const getTranslateX = () => {
    return -(currentIndex * (CARD_WIDTH + GAP));
  };

  return (
    <section
      id="projects"
      className="py-12 px-6 bg-secondary/30 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-3xl leading-relaxed font-bold">
            Projects
          </h2>
        </div>
      </div>

      <style>{`
        @keyframes scalePulse {
          0%, 100% { transform: translateY(-50%) scale(1); }
          50% { transform: translateY(-50%) scale(1.15); }
        }
        @keyframes scalePulseInline {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .animate-scale-pulse {
          animation: scalePulse 2s ease-in-out infinite;
        }
        .animate-scale-pulse-inline {
          animation: scalePulseInline 2s ease-in-out infinite;
        }
      `}</style>

      {/* Carousel Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Navigation Arrows - Hidden on mobile, visible on md+ */}
        <button
          onClick={prevProject}
          className="hidden md:flex absolute left-0 md:-left-12 top-1/2 z-20 w-12 h-12 items-center justify-center bg-background/80 rounded-full text-muted-foreground hover:text-foreground transition-all border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-scale-pulse"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <button
          onClick={nextProject}
          className="hidden md:flex absolute right-0 md:-right-12 top-1/2 z-20 w-12 h-12 items-center justify-center bg-background/80 rounded-full text-muted-foreground hover:text-foreground transition-all border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-scale-pulse"
          aria-label="Next project"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Carousel Track */}
        <div
          className="overflow-hidden px-4"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(50% - ${CARD_WIDTH / 2}px + ${getTranslateX()}px))`,
            }}
          >
            {projects.map((project, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={project.title}
                  className={`flex-shrink-0 w-96 transition-all duration-500 cursor-pointer ${isActive
                    ? "opacity-100 scale-100"
                    : "opacity-50 scale-95"
                    }`}
                  onClick={() => goToProject(index)}
                >
                  <ProjectCard {...project} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation with Dots - Arrows inline on mobile */}
        <div className="flex justify-center items-center gap-4 mt-8">
          {/* Left Arrow - Only on mobile */}
          <button
            onClick={prevProject}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-background/80 rounded-full text-muted-foreground hover:text-foreground transition-colors animate-scale-pulse-inline"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 border ${index === currentIndex
                  ? "bg-white border-white scale-110"
                  : "bg-transparent border-white/50 hover:border-white hover:bg-white/20"
                  }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow - Only on mobile */}
          <button
            onClick={nextProject}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-background/80 rounded-full text-muted-foreground hover:text-foreground transition-colors animate-scale-pulse-inline"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section >
  );
};

export default ProjectsSection;
