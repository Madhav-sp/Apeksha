// src/components/ProjectsSection.js
"use client";

import React from "react";
import { motion } from "framer-motion";

const projects = ["Solar solutions", "Enlightenment", "Education"];

export default function ProjectsSection({ opacity, y }) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-20 h-full w-full flex flex-col items-center justify-center bg-white"
    >
      {/* We need a container to push the circles down to match the video */}
      <div className="w-full flex-grow flex items-center justify-center gap-12 -mt-20">
        {projects.map((project) => (
          <div key={project} className="flex flex-col items-center gap-4">
            <div className="w-48 h-48 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-lg">{project}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
