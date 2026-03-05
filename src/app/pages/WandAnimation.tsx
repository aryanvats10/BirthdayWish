import { motion } from "motion/react";
import React, { useEffect } from "react";

export default function WandAnimation({ candlesCount = 3, onComplete } : { candlesCount?: number; onComplete?: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1200 + candlesCount * 120);
    return () => clearTimeout(t);
  }, [candlesCount, onComplete]);

  // simple wand that sweeps across
  return (
    <div className="pointer-events-none fixed left-1/2 top-32 z-50 -translate-x-1/2">
      <motion.div
        initial={{ x: -200, rotate: -20, opacity: 0 }}
        animate={{ x: 200, rotate: 20, opacity: [1, 1, 0] }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className="flex items-center gap-2"
      >
        <div className="w-48 h-6 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full shadow-xl" />
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-yellow-300">
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M2 12h4M18 12h4M4.2 19.8l2.8-2.8M17 7l2.8-2.8" />
        </svg>
      </motion.div>
    </div>
  );
}
