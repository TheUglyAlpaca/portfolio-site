import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const ContactSection = () => {
  return (
    <footer id="contact" className="py-32 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-4">
          Get in Touch
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-medium mb-6">
          Let's <span className="text-primary italic">collaborate</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Always open to discussing new projects, creative ideas, or opportunities 
          to be part of something meaningful.
        </p>
        
        <a 
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          <Mail className="w-5 h-5" />
          Say Hello
        </a>
        
        <div className="flex justify-center gap-6 mt-12">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Twitter, href: "#", label: "Twitter" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground mt-16">
          © {new Date().getFullYear()} — Designed & built with care
        </p>
      </div>
    </footer>
  );
};

export default ContactSection;
