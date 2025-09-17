// src/components/HeroSection.js
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
// import AboutSection from "../about/page";

export default function HeroSection({
  textOpacity,
  textY,
  imageScale,
  imageY,
}) {
  // Animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  // Animation variants for individual text/button elements
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, y: imageY }}
        >
          <img
            src="/apeksha_herologo.png"
            alt="Apeksha Foundation initiative"
            className="h-full w-full object-cover"
          />
          {/* Enhanced Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </motion.div>

        {/* Centered Content Container */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          {/* Animated Text & Button Wrapper */}
          <motion.div
            className="flex max-w-5xl flex-col items-center gap-y-8 px-6 text-center text-white md:gap-y-12"
            style={{ opacity: textOpacity, y: textY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Heading & Sub-heading */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-y-2"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
                Apeksha Foundation
              </h1>
              <p className="text-md font-light text-indigo-100/90 sm:text-lg md:text-xl">
                Empowering youth, fostering creativity, and driving social
                impact across India.
              </p>
            </motion.div>

            {/* Handwritten Style Tagline with SVG Underline */}
            <motion.div className="relative" variants={itemVariants}>
              <p className="font-handwriting text-3xl text-blue-300 md:text-4xl lg:text-5xl">
                Dream. Dare. Do.
              </p>
              <svg
                className="absolute -bottom-4 left-1/2 w-64 -translate-x-1/2 md:-bottom-6 md:w-80 lg:w-96"
                viewBox="0 0 400 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M10 15 Q100 5, 200 12 T390 18"
                  stroke="#60A5FA" // Brighter blue for better visibility
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "circOut" }}
                />
              </svg>
            </motion.div>

            {/* Call-to-Action Button */}
            <motion.div variants={itemVariants}>
              <button className="group flex items-center gap-x-2 rounded-full border-2 border-white bg-white/10 px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 active:scale-95 md:px-8 md:py-4 md:text-lg">
                Get Involved
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* Animated "Scroll Down" Indicator */}
          <motion.div
            className="absolute bottom-10"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 2.5,
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={32} className="text-white/80" />
          </motion.div>
        </div>
      </div>
      {/* About Section Below Hero */}
      {/* <AboutSection /> */}
    </>
  );
}
