import { useState, useEffect } from "react";
import { Linkedin, Github, Instagram } from "lucide-react";

// Custom Spotify Icon since Lucide doesn't have it
// Custom Spotify Icon - Inverted (Outline with filled waves)
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outline Circle */}
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />

    {/* Filled Waves */}
    <path
      d="M17.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
      fill="currentColor"
    />
  </svg>
);

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/robert-tylman-8a0410223/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/RobertTylman", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/tilly_plays_keys/", label: "Instagram" },
    { icon: SpotifyIcon, href: "https://open.spotify.com/artist/7ogGgg364w3zuu04ZAB7xt?si=ixQWATC2T-eBay-5ZvJ15w", label: "Spotify" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between relative">
        {/* Left - Name */}
        <a
          href="#"
          className="font-standard text-sm text-foreground hover:text-primary transition-colors whitespace-nowrap"
        >
          Robert Tylman
        </a>

        {/* Center - Social Icons (desktop only, absolutely centered) */}
        <div className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Right - Social Icons (mobile) and Email (desktop) */}
        <div className="flex items-center gap-4">
          {/* Mobile only - social icons */}
          <div className="flex md:hidden items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Email - Desktop only */}
          <a
            href="mailto:tylman.robbie@gmail.com"
            className="hidden md:block font-standard text-sm text-foreground hover:text-primary transition-colors"
          >
            tylman.robbie@gmail.com
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
