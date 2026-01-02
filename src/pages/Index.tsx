import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import MusicSection from "@/components/MusicSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <MusicSection />

      {/* Footer */}
      <footer className="py-8 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © Robert Tylman 2026. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Index;
