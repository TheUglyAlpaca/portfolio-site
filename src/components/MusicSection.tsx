import { Play, ExternalLink } from "lucide-react";

const tracks = [
  {
    title: "Digital Horizons",
    type: "Ambient Electronic",
    year: "2024",
  },
  {
    title: "Recursive Dreams",
    type: "Instrumental Piano",
    year: "2024",
  },
  {
    title: "Binary Sunset",
    type: "Synthwave",
    year: "2023",
  },
];

const MusicSection = () => {
  return (
    <section id="music" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-2 text-glow-blue">
              // Sound
            </p>
            <h2 className="font-pixel text-lg md:text-xl leading-relaxed mb-4">
              Music{" "}
              <span className="text-accent text-glow-green">& Audio</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm font-mono">
              Beyond code, I compose and produce music—blending classical training 
              with electronic experimentation.
            </p>
          </div>
          
          <div className="space-y-4">
            {tracks.map((track) => (
              <div 
                key={track.title}
                className="group flex items-center justify-between p-4 border-2 border-border hover:border-accent transition-all cursor-pointer bg-card"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-accent flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <Play className="w-4 h-4 text-accent ml-0.5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm group-hover:text-accent transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      {track.type}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {track.year}
                </span>
              </div>
            ))}
            
            <a 
              href="#"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mt-4 font-mono"
            >
              Listen on Spotify
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
