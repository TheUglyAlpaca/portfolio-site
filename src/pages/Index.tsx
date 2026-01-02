import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import MusicSection from "@/components/MusicSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <MusicSection />
      <ContactSection />
    </main>
  );
};

export default Index;
