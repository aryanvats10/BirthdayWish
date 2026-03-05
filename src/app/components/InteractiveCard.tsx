import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, X } from "lucide-react";
import Confetti from "react-confetti";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export function InteractiveCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { width, height } = useWindowSize();

  return (
    <section className="py-20 flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-t from-pink-50 to-white dark:from-pink-950 dark:to-gray-900 overflow-hidden relative">
      
      {isOpen && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}

      <div className="text-center z-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          One More Surprise!
        </h2>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="gift"
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, -5, 5, -5, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="mb-4"
              >
                <motion.button
                  onClick={() => setIsOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-12 rounded-3xl shadow-2xl hover:shadow-pink-500/50 transition-all cursor-pointer relative"
                >
                  <Gift size={80} />
                  {/* Ribbon */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-yellow-400" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-yellow-400" />
                  {/* Bow */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full" />
                    <div className="absolute top-2 -left-8 w-10 h-8 bg-yellow-400 rounded-full" />
                    <div className="absolute top-2 -right-8 w-10 h-8 bg-yellow-400 rounded-full" />
                  </div>
                </motion.button>
              </motion.div>
              <motion.p
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xl font-semibold text-gray-700 dark:text-gray-300"
              >
                Click to Open! 🎁
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg text-gray-600 dark:text-gray-300 hover:text-pink-500 z-10"
              >
                <X size={24} />
              </button>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-2xl">
                <img
                  src="/images/gift.jpg"
                  alt="Surprise Gift"
                  className="rounded-2xl max-w-full w-full md:w-[500px] h-auto object-cover"
                />
                <p className="text-center mt-4 text-gray-700 dark:text-gray-300 text-lg font-medium">
                  For You! 💝
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
