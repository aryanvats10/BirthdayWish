import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const name = "Tanya(My Potato)"; // Change this to their name!

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-950 dark:via-purple-950 dark:to-indigo-950 px-4">
      {/* Left / Right full-height cutout image panels. Place your cutout PNGs in `public/images/left-cutout.png` and `public/images/right-cutout.png` */}
      <div className="absolute inset-y-0 left-0 w-1/3 hidden md:block z-0 overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}images/left-cutout.png`}
          alt="left cutout"
          className="h-full w-full object-cover pointer-events-none select-none"
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-y-0 right-0 w-1/3 hidden md:block z-0 overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}images/right-cutout.png`}
          alt="right cutout"
          className="h-full w-full object-cover pointer-events-none select-none"
          aria-hidden="true"
        />
      </div>
      {/* Floating Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-30 text-pink-400"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            <Heart
              size={Math.random() * 40 + 20}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <div className="mb-4 flex justify-center">
          <span className="bg-white/50 dark:bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-pink-600 dark:text-pink-300 flex items-center gap-2 border border-pink-200 dark:border-pink-800">
            <Sparkles size={14} /> Today is all about you
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-sm mb-6 relative" style={{ zIndex: 20 }}>
          Happy Birthday {name}
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          To the person who makes the world a little brighter just by being in it .❤️
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          try {
            sessionStorage.setItem('startSurprise', '1');
          } catch (e) {
            // ignore
          }
          navigate("/celebration");
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all z-10"
      >
        🎉 Click for Surprise! 🎉
      </motion.button>
    </section>
  );
}
