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
  { title: "Gypsy Woman", url: "https://vimeo.com/1038732482" },
  { title: "Just The Two Of Us", url: "https://vimeo.com/1038733696" },
  { title: "Great Pumpkin Waltz", url: "https://vimeo.com/1038733606" },
  { title: "Fireflies", url: "https://vimeo.com/1038733505" },
];

const getEmbedUrl = (url: string) => {
  if (url.includes('vimeo.com')) {
    const videoId = url.split('/').pop()?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}?api=1`;
  }
  if (url.includes('instagram.com')) {
    return `${url.split('?')[0].replace(/\/$/, '')}/embed/`;
  }
  return url;
};



interface MusicSectionProps {
  onPlayStateChange?: (playing: boolean) => void;
}

const MusicSection = ({ onPlayStateChange }: MusicSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(new Audio(tracks[0].audio));

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paletteRef = useRef<{ primary: string; secondary: string }>({ primary: "#9b87f5", secondary: "#3b82f6" });

  // Sync effect with parent based on music OR video
  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPlaying || isVideoPlaying);
    }
  }, [isPlaying, isVideoPlaying, onPlayStateChange]);

  // Handle Vimeo messages
  useEffect(() => {
    const handleVimeoMessage = (event: MessageEvent) => {
      // Basic security check - in production you'd want to be more specific
      if (!event.origin.includes('vimeo.com')) return;

      try {
        const data = JSON.parse(event.data);

        // Vimeo ready event
        if (data.event === 'ready') {
          // Subscribe to play/pause events
          const iframes = document.querySelectorAll('iframe');
          iframes.forEach(iframe => {
            if (iframe.contentWindow) {
              iframe.contentWindow.postMessage(JSON.stringify({ method: 'addEventListener', value: 'play' }), '*');
              iframe.contentWindow.postMessage(JSON.stringify({ method: 'addEventListener', value: 'pause' }), '*');
              iframe.contentWindow.postMessage(JSON.stringify({ method: 'addEventListener', value: 'finish' }), '*');
            }
          });
        }

        // Playback events
        if (data.event === 'play') {
          setIsVideoPlaying(true);
          // Pause portfolio music if playing
          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            if (canvasRef.current) {
              const ctx = canvasRef.current.getContext("2d");
              if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
          }
        } else if (data.event === 'pause' || data.event === 'finish') {
          setIsVideoPlaying(false);
        }
      } catch (err) {
        // Not a JSON message or not from Vimeo
      }
    };

    window.addEventListener('message', handleVimeoMessage);
    return () => window.removeEventListener('message', handleVimeoMessage);
  }, [isPlaying]);

  const pauseAllVideos = () => {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
      }
    });
    setIsVideoPlaying(false);
  };

  const generateRandomPalette = () => {
    const hue1 = Math.floor(Math.random() * 360);
    // Dramatic shift: Complementary or near-complementary colors (150-210 degree shift)
    const hue2 = (hue1 + 180 + Math.floor(Math.random() * 60 - 30)) % 360;
    return {
      primary: `hsla(${hue1}, 100%, 65%, 0.9)`, // Higher saturation & opacity
      secondary: `hsla(${hue2}, 90%, 45%, 0.7)`  // Higher saturation & opacity
    };
  };

  useEffect(() => {
    // Initialize audio object
    audioRef.current = new Audio();

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
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

  const animate = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    // Use dynamic palette for gradient
    const { primary, secondary } = paletteRef.current;

    for (let i = 0; i < bufferLength; i++) {
      // Scale bar height to fit canvas height better (up to ~60% of container)
      barHeight = (dataArray[i] / 255) * canvas.height * 0.6;

      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
      gradient.addColorStop(0, primary); // High energy color
      gradient.addColorStop(1, secondary); // Low energy color

      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }

    rafRef.current = requestAnimationFrame(animate);
  };

  const setupAudioContext = () => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const src = ctx.createMediaElementSource(audioRef.current);
      sourceRef.current = src;

      src.connect(analyser);
      analyser.connect(ctx.destination);
    }
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

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
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      } else {
        pauseAllVideos();
        setupAudioContext();
        paletteRef.current = generateRandomPalette();
        audioRef.current.play();
        setIsPlaying(true);
        animate();
      }
    } else {
      // Play new track
      if (isPlaying) {
        audioRef.current.pause();
      }
      pauseAllVideos();

      setCurrentTrackIndex(index);
      setProgress(0);
      audioRef.current.src = tracks[index].audio;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setupAudioContext();
          paletteRef.current = generateRandomPalette();
          animate();
        })
        .catch(err => console.error("Error playing audio:", err));
    }
  };

  return (
    <section id="music" className="pt-10 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl p-8 -mx-8 mb-8">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-screen"
          />

          <div className="relative z-10">
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
            <div className="space-y-4">
              <p className="text-sm text-white uppercase tracking-widest font-bold ml-1">
                Other Music
              </p>
              {tracks.map((track, index) => {
                const isCurrentTrack = currentTrackIndex === index;
                const isTrackPlaying = isCurrentTrack && isPlaying;

                return (
                  <div
                    key={track.title}
                    onClick={() => handleTrackClick(index)}
                    className={`group flex items-center gap-4 p-4 rounded transition-colors cursor-pointer ${isCurrentTrack
                      ? "bg-secondary/50 border border-primary/20 backdrop-blur-md"
                      : "hover:bg-secondary/30 border border-transparent"
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
          </div>
        </div>

        {/* Piano Showcase */}
        <div>

          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Piano Showcase
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pianoVideos.map((video, index) => (
              <div key={index} className="space-y-2">
                <div
                  className="relative aspect-[9/16] bg-secondary rounded-lg overflow-hidden group"
                >
                  {video.url ? (
                    <iframe
                      src={getEmbedUrl(video.url)}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      allowTransparency
                      scrolling="no"
                    />
                  ) : (
                    <div className="cursor-pointer h-full">
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
                  )}
                </div>
                <p className="text-sm font-medium text-center text-muted-foreground uppercase tracking-wider">
                  {video.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
