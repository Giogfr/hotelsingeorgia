"use client";
import { motion } from "framer-motion";

export default function RestaurantsLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <motion.div
        className="flex gap-2 mb-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
          }
        }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-6 h-6 rounded-lg bg-primary"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: { scale: 1, opacity: 1 }
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        ))}
      </motion.div>
      <motion.div
        className="text-xl font-bold text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Loading Restaurants...
      </motion.div>
    </div>
  );
} 