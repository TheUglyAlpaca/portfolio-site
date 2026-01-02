import { useState, useEffect } from "react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Music", href: "#music" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b-2 border-border" : ""
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#" 
          className="font-pixel text-xs text-primary hover:text-accent transition-colors text-glow-blue"
        >
          {"<YN/>"}
        </a>
        
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
