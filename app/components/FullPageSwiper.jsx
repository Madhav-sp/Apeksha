// src/components/FullPageSwiper.js
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import your page content components
import HeroSection from "./HeroSection"; // Assuming your Hero is in a component
import AboutSection from "./AboutSection"; // We'll create this next

const pages = [<HeroSection key="hero" />, <AboutSection key="about" />];

// Animation variants for the slide transition
const variants = {
  enter: (direction) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    y: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function FullPageSwiper() {
  const [[page, direction], setPage] = useState([0, 0]);

  // Swipe gesture confidence threshold
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const paginate = (newDirection) => {
    // Ensure we don't go out of bounds
    const newPageIndex = page + newDirection;
    if (newPageIndex >= 0 && newPageIndex < pages.length) {
      setPage([newPageIndex, newDirection]);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          // This key is crucial for AnimatePresence to work
          key={page}
          className="absolute w-full h-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          // Drag gesture detection
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.y, velocity.y);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1); // Swipe Up (Next Page)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1); // Swipe Down (Previous Page)
            }
          }}
        >
          {pages[page]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {pages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === page ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
