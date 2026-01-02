import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const ContactSection = () => {
  return (
    <footer id="contact" className="py-32 px-6 border-t-2 border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 text-glow-blue">
          // Contact
        </p>
        <h2 className="font-pixel text-lg md:text-2xl leading-relaxed mb-6">
          Let's{" "}
          <span className="text-accent text-glow-green">collaborate</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 font-mono text-sm">
          Always open to discussing new projects, creative ideas, or opportunities 
          to be part of something meaningful.
        </p>
        
        <a 
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm hover:bg-accent transition-colors glow-blue hover:glow-green"
        >
          <Mail className="w-4 h-4" />
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
              className="w-10 h-10 border-2 border-border hover:border-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground mt-16 font-mono">
          © {new Date().getFullYear()} — Built with pixels & passion
        </p>
      </div>
    </footer>
  );
};

export default ContactSection;
