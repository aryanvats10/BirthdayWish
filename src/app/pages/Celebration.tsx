import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Gallery } from "../components/Gallery";
import { Wishes } from "../components/Wishes";
import { InteractiveCard } from "../components/InteractiveCard";
import Confetti from "react-confetti";

export function Celebration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLImageElement | null>(null);

  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayTarget, setOverlayTarget] = useState<null | { left: number; top: number; width: number; height: number }>(null);
  const [showFireworks, setShowFireworks] = useState(true);
  const [igniteTrigger, setIgniteTrigger] = useState(0);
  const [showWand, setShowWand] = useState(false);
  const [showMicButton, setShowMicButton] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 450;

    // Draw canvas holder/frame
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, 0, 300, 450);
    
    ctx.fillStyle = "#D2691E";
    ctx.fillRect(10, 10, 280, 430);

    // Draw hanging ribbon at top
    ctx.fillStyle = "#DC143C";
    ctx.fillRect(20, 20, 260, 60);
    
    // Add ribbon shine effect
    const gradient = ctx.createLinearGradient(20, 20, 280, 80);
    gradient.addColorStop(0, "#FF6B9D");
    gradient.addColorStop(0.5, "#DC143C");
    gradient.addColorStop(1, "#8B0000");
    ctx.fillStyle = gradient;
    ctx.fillRect(20, 20, 260, 60);

    // Draw ribbon edges (wavy)
    ctx.fillStyle = "#DC143C";
    ctx.beginPath();
    ctx.moveTo(20, 80);
    for (let i = 0; i < 260; i += 20) {
      ctx.lineTo(20 + i, 80 + (i % 40 === 0 ? 10 : 0));
    }
    ctx.lineTo(280, 80);
    ctx.lineTo(280, 75);
    ctx.lineTo(20, 75);
    ctx.fill();

    // Draw text on ribbon
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#8B0000";
    ctx.lineWidth = 3;
    ctx.strokeText("THE BIRTHDAY GIRL", 150, 55);
    ctx.fillText("THE BIRTHDAY GIRL", 150, 55);

    // The white image area will be drawn when the image loads so its
    // aspect ratio can be preserved — do not draw a fixed box here.

    // Load and draw birthday girl image
    const img = new Image();
    img.crossOrigin = "anonymous";
    // CHANGE THIS to your local image path (place file in `public/images`)
    img.src = `${import.meta.env.BASE_URL}images/birthday.jpeg`;
    
    img.onload = () => {
      // Fit the image into the 260x260 maximum inner box while preserving aspect ratio
      const boxW = 260;
      const boxH = 260;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const scale = Math.min(boxW / iw, boxH / ih, 1);
      const drawW = Math.round(iw * scale);
      const drawH = Math.round(ih * scale);
      const dx = 20 + Math.round((boxW - drawW) / 2);
      const dy = 100 + Math.round((boxH - drawH) / 2);

      // Draw a white background sized to the image's displayed dimensions
      ctx.fillStyle = "#FFF";
      ctx.fillRect(dx, dy, drawW, drawH);

      // Draw the image centered inside that white area
      ctx.drawImage(img, dx, dy, drawW, drawH);

      // Draw bottom label
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(20, 370, 260, 60);

      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 24px cursive";
      ctx.textAlign = "center";
      ctx.fillText("Tanya", 150, 410);
    };
  }, []);

  // Lock page scrolling until user has blown out the candles
  useEffect(() => {
    // when canScroll is false, prevent page scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = canScroll ? prev : "hidden";
    return () => {
      // restore when component unmounts
      document.body.style.overflow = prev;
    };
  }, [canScroll]);

  // Start the intro sequence: show large image + fireworks, then move image to canvas
  useEffect(() => {
    // Give the overlay a moment to show, then compute target and animate
    const t = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      setOverlayTarget({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });

      // After animation finishes, hide overlay and show canvas + cake
      setTimeout(() => {
        setShowOverlay(false);
        // keep fireworks briefly while cake appears
        setTimeout(() => setShowFireworks(false), 1200);

        // show wand shortly after cake appears; wand will call back to ignite
        setTimeout(() => setShowWand(true), 350);
      }, 1000);
    }, 700);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-black selection:bg-pink-200 dark:selection:bg-pink-900">
      {/* Cake Animation Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-purple-950 dark:via-pink-950 dark:to-yellow-950 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            Make a Wish! 🎂
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            💨 Blow into your microphone to blow out the candles!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl">
          {/* Canvas Holder with Birthday Girl */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showOverlay ? 0 : 1, x: showOverlay ? -50 : 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
            style={{ minWidth: 300 }}
          >
            <canvas
              ref={canvasRef}
              className={`shadow-2xl rounded-lg ${showOverlay ? 'opacity-0' : 'opacity-100'}`}
            />
          </motion.div>

          {/* Animated Cake */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: showOverlay ? 0 : 1, x: showOverlay ? 50 : 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative"
          >
            {/* Cake will start with candles unlit; parent can trigger ignition by bumping `igniteTrigger` */}
            <Cake
              initialLit={false}
              igniteTrigger={igniteTrigger}
              showMic={showMicButton}
              onIgnited={() => setShowMicButton(true)}
              onWishGranted={() => setCanScroll(true)}
            />

            {/* Wand animation overlays the cake and triggers ignition when done */}
            {showWand && (
              <motion.div
                initial={{ x: -120, y: -80, rotate: -30, opacity: 0 }}
                animate={{ x: 120, y: -40, rotate: 10, opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="absolute left-1/2 top-1/2 z-20 pointer-events-none"
                onAnimationComplete={() => {
                  // wand finished - ignite candles via parent trigger and hide wand
                  setIgniteTrigger((v) => v + 1);
                  setShowWand(false);
                  // show mic after a short pause
                  setTimeout(() => setShowMicButton(true), 300);
                }}
              >
                <div className="w-40 h-6 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 rounded-full shadow-lg" style={{ transform: 'rotate(-20deg)' }} />
                <div className="w-3 h-3 bg-white rounded-full absolute right-0 top-1 shadow-sm" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Overlay large image + fireworks intro */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
          >
            {/* simple fireworks behind the image */}
            {showFireworks && (
              <div className="pointer-events-none fixed inset-0 -z-10">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [1, 0], scale: [0, 1.6, 2.2] }}
                    transition={{ delay: i * 0.12, duration: 0.9 }}
                    style={{
                      position: 'absolute',
                      left: `${10 + (i * 11) % 80}%`,
                      top: `${10 + (i * 7) % 70}%`,
                      width: 160,
                      height: 160,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 30%, rgba(255,230,128,0.95), rgba(255,64,129,0.6)), radial-gradient(circle at 70% 70%, rgba(128,216,255,0.85), rgba(128,255,181,0.3))'
                    }}
                  />
                ))}
              </div>
            )}

            <motion.img
              ref={overlayRef}
              src={`${import.meta.env.BASE_URL}images/birthday.jpeg`}
              alt="Birthday"
              className="rounded-lg shadow-2xl"
              style={{
                width: 600,
                height: 600,
                objectFit: 'cover',
                position: 'absolute'
              }}
              animate={overlayTarget ? {
                left: overlayTarget.left,
                top: overlayTarget.top,
                width: overlayTarget.width,
                height: overlayTarget.height,
                transform: 'none'
              } : undefined}
              transition={{ duration: 1 }}
              onAnimationComplete={() => {
                // when image moves, allow cake to appear and later show wand
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of the content */}
      <Gallery />
      <Wishes />
      <InteractiveCard />
      
      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>Made with ❤️ just for you.</p>
      </footer>
    </div>
  );
}

function Cake({ initialLit = true, igniteTrigger = 0, showMic = false, onIgnited, onWishGranted }: { initialLit?: boolean; igniteTrigger?: number; showMic?: boolean; onIgnited?: () => void; onWishGranted?: () => void }) {
  const candlesCount = 3;
  const [candlesLit, setCandlesLit] = useState(Array(candlesCount).fill(initialLit));
  const [isListening, setIsListening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wishGranted, setWishGranted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [weakBlowMessage, setWeakBlowMessage] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      microphoneRef.current = microphone;
      
      setIsListening(true);
      detectBlow();
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Please allow microphone access to blow out the candles! 🎤");
    }
  };

  const detectBlow = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let weakBlowCount = 0;
    const weakBlowMessages = [
      "That's just a whisper! 😄 Blow harder!",
      "Softer than a feather! 🪶 Give it more power!",
      "Your grandma blows harder than that! 👵",
      "That's not a blow, that's a sigh! 😅",
      "Come on, you got this! Blow like you mean it! 💨",
      "That tickles! Need more force! 😆"
    ];

    const checkAudio = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      
      // Increased threshold: need stronger blow to trigger (was 40, now 70)
      if (average > 70) {
        blowOutCandles();
      } else if (average > 40 && average <= 70) {
        // Weak blow detected - show funny message occasionally
        if (Math.random() > 0.7) {
          setWeakBlowMessage(weakBlowMessages[Math.floor(Math.random() * weakBlowMessages.length)]);
          setTimeout(() => setWeakBlowMessage(""), 2000);
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(checkAudio);
    };

    checkAudio();
  };

  const blowOutCandles = () => {
    // Blow out candles one by one
    setCandlesLit(prev => {
      const litIndex = prev.findIndex(lit => lit);
      if (litIndex !== -1) {
        const newState = [...prev];
        newState[litIndex] = false;
        
        // Check if all candles are blown out
        if (newState.every(lit => !lit)) {
          setShowConfetti(true);
          setWishGranted(true);
          setShowButtons(false);
          setIsAudioPlaying(true);
          
          // Play audio file and wait for it to finish
          playAudio();
          
          setTimeout(() => setShowConfetti(false), 5000);
          stopListening();
        }
        
        return newState;
      }
      return prev;
    });
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
  };

  const playAudio = () => {
    // Create audio element if it doesn't exist
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Audio();
      audioPlayerRef.current.src = `${import.meta.env.BASE_URL}audio/celebration.mp3`; // Default filename - user can replace with their file
    }

    const audio = audioPlayerRef.current;

    // Handle when audio can be played (to get duration)
    const handleCanPlay = () => {
      // Audio is loaded and ready to play
      audio.play().catch(err => console.error("Audio autoplay failed:", err));
    };

    // Handle when audio finishes
    const handleEnded = () => {
      setIsAudioPlaying(false);
      setShowButtons(true);
      // notify parent so page can unlock scrolling and show parent UI
      onWishGranted && onWishGranted();
      
      // Clean up event listeners
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };

    // Handle audio loading error
    const handleError = () => {
      console.warn("Audio file not found or cannot be played. Make sure /public/audio/celebration.mp3 exists.");
      // If audio fails to load, show buttons anyway
      setIsAudioPlaying(false);
      setShowButtons(true);
      onWishGranted && onWishGranted();
      
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };

    // Add event listeners
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Load the audio
    audio.load();
  };

  const resetCandles = () => {
    setCandlesLit(Array(candlesCount).fill(true));
    setShowConfetti(false);
    setWishGranted(false);
    setIsAudioPlaying(false);
    setShowButtons(false);
    setWeakBlowMessage("");
    if (isListening) {
      stopListening();
    }
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  // If parent triggers `igniteTrigger`, simulate a wand lighting animation
  useEffect(() => {
    if (!igniteTrigger) return;

    // Light candles after a short delay. Do not briefly set them to all-unlit
    // (that would trigger the "all candles out" logic). Only set them lit
    // once the wand animation completes.
    const id = setTimeout(() => {
      setCandlesLit(Array(candlesCount).fill(true));
      // entering a new lighting sequence should clear previous wish state
      setWishGranted(false);
      onIgnited && onIgnited();
    }, 800);

    return () => clearTimeout(id);
  }, [igniteTrigger]);

  const allCandlesOut = candlesLit.every(lit => !lit);

  return (
    <div className="relative">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      
      <svg
        width="300"
        height="350"
        viewBox="0 0 300 350"
        className="drop-shadow-2xl"
      >
        {/* Cake Layers */}
        <motion.ellipse
          cx="150"
          cy="280"
          rx="120"
          ry="20"
          fill="#FFB6C1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.rect
          x="30"
          y="200"
          width="240"
          height="80"
          fill="#FF69B4"
          rx="10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.ellipse
          cx="150"
          cy="200"
          rx="120"
          ry="20"
          fill="#FF1493"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        <motion.rect
          x="50"
          y="140"
          width="200"
          height="60"
          fill="#FF69B4"
          rx="10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.ellipse
          cx="150"
          cy="140"
          rx="100"
          ry="18"
          fill="#FF1493"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
        <motion.rect
          x="70"
          y="90"
          width="160"
          height="50"
          fill="#FF69B4"
          rx="10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />
        <motion.ellipse
          cx="150"
          cy="90"
          rx="80"
          ry="15"
          fill="#FF1493"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />

        {/* Decorative Frosting */}
        {[80, 120, 160, 200, 220].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy="90"
            r="8"
            fill="#FFF"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
          />
        ))}

        {/* Candles */}
        {[100, 150, 200].map((x, i) => (
          <g key={i}>
            <motion.rect
              x={x - 5}
              y="50"
              width="10"
              height="40"
              fill="#FFE4B5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
            />
            {/* Flame - only show if candle is lit */}
            <AnimatePresence>
              {candlesLit[i] && (
                <>
                  <motion.ellipse
                    cx={x}
                    cy="45"
                    rx="8"
                    ry="12"
                    fill="#FFA500"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      y: [0, -3, 0]
                    }}
                    exit={{ 
                      scale: 0,
                      opacity: 0,
                      y: -20
                    }}
                    transition={{ 
                      scale: {
                        duration: 0.5,
                        repeat: Infinity,
                      },
                      y: {
                        duration: 0.5,
                        repeat: Infinity,
                      },
                      exit: {
                        duration: 0.3
                      }
                    }}
                  />
                  <motion.ellipse
                    cx={x}
                    cy="43"
                    rx="5"
                    ry="8"
                    fill="#FFFF00"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      y: [0, -2, 0]
                    }}
                    exit={{ 
                      scale: 0,
                      opacity: 0,
                      y: -20
                    }}
                    transition={{ 
                      scale: {
                        duration: 0.5,
                        repeat: Infinity,
                      },
                      y: {
                        duration: 0.5,
                        repeat: Infinity,
                      },
                      exit: {
                        duration: 0.3
                      }
                    }}
                  />
                </>
              )}
            </AnimatePresence>
            
            {/* Smoke effect when candle is blown out */}
            {!candlesLit[i] && (
              <motion.circle
                cx={x}
                cy="45"
                r="4"
                fill="#666"
                opacity="0.5"
                initial={{ scale: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  y: [0, -30, -50],
                  opacity: [0.5, 0.3, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              />
            )}
          </g>
        ))}

        {/* Cherry on top */}
        {/* cherry removed per request */}
      </svg>

      {/* Control Buttons */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {!isListening && !allCandlesOut && showMic && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startListening}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            Enable Microphone to Blow 🌬️
          </motion.button>
        )}
        
        {isListening && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            Listening... Blow now!🥰
          </motion.div>
        )}

        {weakBlowMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mt-4"
          >
            <p className="text-lg font-semibold text-orange-600">
              {weakBlowMessage}
            </p>
          </motion.div>
        )}

        {isAudioPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4"
          >
            <motion.p
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-lg font-semibold text-pink-600"
            >
              🎵 Celebrating... 🎵
            </motion.p>
          </motion.div>
        )}

        {wishGranted && showButtons && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-pink-600 mb-3">
              🎉 Wish granted! 🎉
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetCandles}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
            >
              🥰Light Candles Again🥰
            </motion.button>

            {/* Scroll down prompt after wish is granted */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 flex flex-col items-center"
            >
              <button
                onClick={() => window.scrollBy({ top: window.innerHeight, left: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium"
                aria-label="Scroll down"
              >
                Scroll down to see more
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
