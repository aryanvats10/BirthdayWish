import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Star, Smile, Sun, Music } from "lucide-react";

const wishes = [
  {
    icon: <Smile className="text-yellow-500" />,
    title: "Your Smile",
    description: "It lights up every room and makes my day instantly better.",
  },
  {
    icon: <Sun className="text-orange-500" />,
    title: "Your Energy",
    description: "You have this amazing way of making everything feel exciting.",
  },
  {
    icon: <Star className="text-purple-500" />,
    title: "Your Kindness",
    description: "The way you care about others is truly inspiring.",
  },
  {
    icon: <Music className="text-pink-500" />,
    title: "Your Vibe",
    description: "Just being around you feels like my favorite song on repeat.",
  },
];

export function Wishes() {
  // activeIndex tracks which card is currently hovered (or interacted)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showSunOverlay, setShowSunOverlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // create audio element for the "vibe" card; file should be placed at /audio/vibe.mp3
    audioRef.current = new Audio('/audio/vibe.mp3');
    audioRef.current.loop = false;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);

    // energy (sun) special: show full-screen bloom
    if (index === 1) {
      setShowSunOverlay(true);
      // hide overlay after animation finishes
      setTimeout(() => setShowSunOverlay(false), 1400);
    }
  };

  const handleMouseLeave = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : prev));
    if (index === 3 && audioRef.current) {
      // do not auto-stop on leave for click-to-play; keep user control
    }
  };

  const toggleAudioPlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <section className="py-20 bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-gray-800 dark:text-gray-100">
            Why You're Special
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishes.map((wish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                onClick={() => {
                  // click-to-play for the Vibe card (index 3)
                  if (i === 3) toggleAudioPlay();
                }}
                className="relative group overflow-hidden rounded-3xl p-6 shadow-lg border border-transparent transition-transform"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-30 blur-3xl pointer-events-none" />

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md ring-1 ring-white/60">
                      <div className="text-3xl text-pink-500">
                        {/* Smile: show emoji pop when active, otherwise show original icon */}
                        {i === 0 && activeIndex === 0 ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.8 }}
                            className="text-3xl"
                          >
                            😊
                          </motion.span>
                        ) : (
                          // For other cards and default smile state
                          <motion.div
                            animate={i === 2 && activeIndex === 2 ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.9 }}
                          >
                            {wish.icon}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {wish.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {wish.description}
                    </p>

                    {/* Subtle click-to-play hint for the Vibe card */}
                    {i === 3 && (
                      <div className="mt-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400 italic opacity-80">
                          Click to play — your song will start here 🎵
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen sun overlay for "Your Energy" (index 1) */}
      <AnimatePresence>
        {showSunOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            {/* Bright radial backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at center, rgba(255,250,230,0.98), rgba(255,230,150,0.9))' }}
            />

            {/* Big rotating sun that scales to fill the screen then returns */}
            <motion.div
              initial={{ scale: 0.3, rotate: 0, opacity: 0 }}
              animate={{ scale: 12, rotate: 720, opacity: 1 }}
              exit={{ scale: 0.3, rotate: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="rounded-full flex items-center justify-center bg-yellow-300 shadow-2xl"
              style={{ width: 120, height: 120 }}
            >
              <Sun size={120} className="text-yellow-600" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guidance: place your audio file at public/audio/vibe.mp3. To change the file name/path, update the path in this component (Audio created in useEffect). */}
    </>
  );
}
