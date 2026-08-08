"use client";

import { useEffect } from "react";
import { useLoadingStore } from "@/store/loading-store";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingBar() {
  const {
    loading,
    progress,
    setProgress,
  } = useLoadingStore();

  useEffect(() => {
    if (!loading) return;

    const firstFrame = requestAnimationFrame(() => {
      setProgress(8);
    });

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;

        let increment = 0;

        if (prev < 20) {
          increment = 10 + Math.random() * 5;
        } else if (prev < 40) {
          increment = 7 + Math.random() * 4;
        } else if (prev < 80) {
          increment = 3 + Math.random() * 2;
        } else {
          increment = 1 + Math.random() * 0.5;
        }

        return Math.min(prev + increment, 95);
      });
    }, 120);

    return () => {
      cancelAnimationFrame(firstFrame);
      clearInterval(timer);
    };
  }, [loading, setProgress]);

  useEffect(() => {
    if (!loading && progress === 100) {
      const timer = setTimeout(() => {
        setProgress(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [loading, progress, setProgress]);

  if (!loading && progress === 0) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-0 z-[9999] h-[3px] w-full"
        >
          <motion.div
            className="relative h-full rounded-r-full"
            style={{
              width: `${progress}%`,
              background: `
                linear-gradient(
                  90deg,
                  #10b981,
                  #34d399,
                  #22d3ee,
                  #67e8f9,
                  #a78bfa,
                  #8b5cf6,
                  #a78bfa,
                  #67e8f9,
                  #22d3ee,
                  #34d399,
                  #10b981
                )
              `,
              backgroundSize: "200% 100%",
              boxShadow: `
                0 0 30px rgba(16, 185, 129, 0.3),
                0 0 60px rgba(34, 211, 238, 0.15)
              `,
            }}
            initial={{ width: 0, backgroundPosition: "0% 50%" }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              width: { duration: 0.3, ease: "easeOut" },
              backgroundPosition: { 
                duration: 3, 
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {/* Shimmer effect
            <div className="absolute inset-0 overflow-hidden rounded-r-full">
              <div className="h-full w-24 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg]" />
            </div>

            <div className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-purple-400 blur-xl opacity-60" /> */}
          </motion.div>

          {/* Progress indicator */}
      
        </motion.div>
      )}
    </AnimatePresence>
  );
}