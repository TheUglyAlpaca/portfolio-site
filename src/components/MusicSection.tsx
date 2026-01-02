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
            <p className="text-muted-foreground text-sm tracking-[0.2em] uppercase mb-2">
              Sound
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium mb-4">
              Music <span className="text-primary italic">& Audio</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Beyond code, I compose and produce music—blending classical training 
              with electronic experimentation.
            </p>
          </div>
          
          <div className="space-y-4">
            {tracks.map((track, index) => (
              <div 
                key={track.title}
                className="group flex items-center justify-between p-5 border border-border rounded-lg hover:border-primary/50 hover:bg-card transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Play className="w-4 h-4 text-primary ml-0.5" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {track.type}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {track.year}
                </span>
              </div>
            ))}
            
            <a 
              href="#"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-4"
            >
              Listen on Spotify
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
