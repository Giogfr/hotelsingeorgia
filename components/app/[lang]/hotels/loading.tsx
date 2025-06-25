"use client";
import { motion } from "framer-motion";

export default function HotelsLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="flex gap-2 mb-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-6 h-6 rounded-lg bg-primary"
            animate={{
              scale: [1, 1.2, 1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
              borderRadius: ["20%", "50%", "20%", "50%", "20%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      <motion.div
        className="text-xl font-bold text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Loading available hotels...
      </motion.div>
    </motion.div>
  );
} 