import { useState, useRef, useEffect } from "react";
import { Play, Pause, ExternalLink } from "lucide-react";
import albumCover from "@/assets/album cover.png";
import takeALookImg from "@/assets/take-a-look.png";
import helloMissJohnsonImg from "@/assets/hello-miss-johnson.jpg";
import firefliesArt from "@/assets/fireflies-remix.jpg";
import takeALookAudio from "@/assets/take-a-look.wav";
import helloMissJohnsonAudio from "@/assets/hello-miss-johnson.wav";
import firefliesAudio from "@/assets/fireflies-remix.wav";

const tracks = [
  { title: "Take A Look! (feat. KAE)", duration: "02:56", image: takeALookImg, audio: takeALookAudio },
  { title: "Hello Miss Johnson Remix (Jack Harlow)", duration: "02:49", image: helloMissJohnsonImg, audio: helloMissJohnsonAudio },
  { title: "Fireflies Remix (Owl City)", duration: "03:36", image: firefliesArt, audio: firefliesAudio },
];

const pianoVideos = [
  { title: "Piano Performance 1" },
  { title: "Piano Performance 2" },
  { title: "Piano Performance 3" },
  { title: "Piano Performance 4" },
];

const MusicSection = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio();

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    };

    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener('ended', handleEnded);
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, x / width));

    const newTime = percentage * audioRef.current.duration;
    if (isFinite(newTime)) {
      audioRef.current.currentTime = newTime;
      setProgress(percentage * 100);
    }
  };

  const handleTrackClick = (index: number) => {
    if (!audioRef.current) return;

    if (currentTrackIndex === index) {
      // Toggle play/pause for current track
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Play new track
      if (isPlaying) {
        audioRef.current.pause();
      }

      setCurrentTrackIndex(index);
      setProgress(0);
      audioRef.current.src = tracks[index].audio;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Error playing audio:", err));
    }
  };

  return (
    <section id="music" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Production Portfolio
        </h2>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `}</style>

        {/* Album Feature */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          {/* Album Art */}
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-lg overflow-hidden animate-float">
              <img
                src={albumCover}
                alt="Portage Album Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Album Info */}
          <div className="text-center md:text-left">
            <a
              href="https://open.spotify.com/album/1xihSP0ygq645gk4zGEYES?si=fVEIKo8DTAibSZCZWf0jZQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xl font-bold underline hover:text-primary transition-colors mb-4"
            >
              Portage
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              My debut EP. Although it leans into synthesized and electronic sounds, its roots are
              deeply organic and grounded in nature. Each track includes recordings I captured on
              my iPhone while working as a canoe tripping guide in northern Canada or spending
              time with friends.
            </p>
            <p className="text-muted-foreground text-sm italic">
              Everything you hear was written, performed, mixed, and mastered by me.
            </p>
          </div>
        </div>

        {/* Track List */}
        <div className="space-y-2 mb-24">
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrackIndex === index;
            const isTrackPlaying = isCurrentTrack && isPlaying;

            return (
              <div
                key={track.title}
                onClick={() => handleTrackClick(index)}
                className={`group flex items-center gap-4 p-4 rounded transition-colors cursor-pointer ${isCurrentTrack ? "bg-secondary/50 border border-primary/20" : "hover:bg-secondary/30 border border-transparent"
                  }`}
              >
                <img
                  src={track.image}
                  alt={track.title}
                  className={`w-12 h-12 rounded object-cover shadow-sm transition-opacity ${isCurrentTrack && !isPlaying ? "opacity-80" : "opacity-100"
                    }`}
                />
                <button
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${isCurrentTrack
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-foreground/30 group-hover:border-foreground"
                    }`}
                >
                  {isTrackPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
                <div className="flex-1">
                  <span className={`text-sm font-medium block ${isCurrentTrack ? "text-primary" : ""}`}>
                    {track.title}
                  </span>
                  {isCurrentTrack && (
                    <div className="mt-2 w-full pr-4">
                      <div
                        className="h-1 bg-border/50 rounded-full overflow-hidden cursor-pointer hover:h-1.5 transition-all group/progress relative"
                        onClick={handleSeek}
                      >
                        <div
                          className="h-full bg-primary transition-all duration-100 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-primary/70 font-mono mt-1 block">
                        {isPlaying ? "Now Playing..." : "Paused"}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-sm text-muted-foreground font-mono">{track.duration}</span>
              </div>
            );
          })}
        </div>

        {/* Piano Showcase */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Piano Showcase
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pianoVideos.map((video, index) => (
              <div
                key={index}
                className="relative aspect-[9/16] bg-secondary rounded-lg overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium text-white">Robbie T</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
