"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch gallery data from backend
  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = await res.json();
        setGalleryImages(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchGallery();
  }, []);

  if (galleryImages.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        Loading gallery...
      </div>
    );
  }

  const selectedImage = galleryImages[activeIndex];

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-black">
      {/* Section Header */}
      <motion.div
        className="absolute top-8 left-0 right-0 z-20 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Gallery
        </h1>
        <p className="mt-2 text-gray-300">
          Explore our journey through images
        </p>
      </motion.div>
      {/* --- Main Image Display --- */}
      <div
        className="relative flex flex-1 cursor-pointer items-center justify-center"
        onClick={() => window.open(selectedImage.driveLink, "_blank")} // 🔗 redirect to drive
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="h-full w-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Image Title */}
        <motion.div
          className="relative z-10 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold drop-shadow-md sm:text-5xl">
            {selectedImage.title}
          </h1>
          <p className="mt-2 text-lg text-gray-300">{selectedImage.category}</p>
          <p className="mt-1 text-sm text-blue-400">
            👉 Click cover to view all pics
          </p>
        </motion.div>
      </div>

      {/* --- Thumbnail Film Strip --- */}
      <div className="relative z-20 w-full bg-black/50 py-4 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl gap-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image._id}
              onClick={() => setActiveIndex(index)}
              className="relative aspect-video w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg sm:w-48"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={image.src}
                alt={image.title}
                className="h-full w-full object-cover"
              />
              {/* Active indicator */}
              {activeIndex === index && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute inset-0 rounded-lg border-2 border-blue-500"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
