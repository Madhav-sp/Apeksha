"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

// --- Card Component ---
function InitiativeCard({ initiative, size }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const { title, description, venue, date, price, image, formLink } =
    initiative;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  const handleCardClick = () => {
    if (formLink) {
      window.open(formLink, "_blank");
    }
  };

  const cardSizeClass = {
    large: "md:col-span-2 h-96",
    medium: "md:col-span-2 h-80",
    small: "md:col-span-1 h-80",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
      }}
      className={`relative overflow-hidden rounded-3xl ${cardSizeClass[size]} ${
        formLink ? "cursor-pointer" : ""
      } shadow-lg hover:shadow-2xl transition-shadow`}
    >
      {/* Background Image */}
      <motion.img
        src={image}
        alt={title}
        style={{
          transform: "translateZ(25px)",
          translateX: useTransform(mouseXSpring, [-0.5, 0.5], ["-3%", "3%"]),
          translateY: useTransform(mouseYSpring, [-0.5, 0.5], ["-3%", "3%"]),
        }}
        className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-105 transition-all duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Card Content */}
      <div
        style={{ transform: "translateZ(60px)" }}
        className="relative z-10 flex h-full flex-col justify-between p-6 text-white"
      >
        {/* Venue */}
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-300">
          {venue}
        </span>

        {/* Content */}
        <div>
          <h3 className="text-2xl font-bold leading-tight drop-shadow-sm">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-200 line-clamp-2">
            {description}
          </p>

          <div className="mt-3 space-y-1 text-gray-300 text-sm">
            <p>
              Date:{" "}
              <span className="font-medium text-white">
                {new Date(date).toDateString()}
              </span>
            </p>
            <p>
              Price:{" "}
              <span className="font-semibold text-blue-300">₹{price}</span>
            </p>
          </div>

          {formLink && (
            <div className="mt-4 inline-flex items-center text-blue-400 font-medium group">
              <span>Click to register</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Section ---
export default function InitiativesSection() {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setInitiatives(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitiatives();
  }, []);

  const getCardSize = (index) => {
    if (index % 5 === 0) return "large";
    if (index % 3 === 0) return "medium";
    return "small";
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-black py-24 text-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Our Initiatives
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            From vibrant cultural events to vital social work, discover how
            we're making a tangible difference in communities, one step at a
            time.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-3xl bg-gray-800/50 animate-pulse"
              />
            ))}
          </div>
        ) : initiatives.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-12 border border-gray-700/50 max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Calendar size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                No Events Available
              </h3>
              <p className="text-gray-400 mb-6">
                We're currently working on organizing new initiatives. Check
                back soon for exciting events and programs!
              </p>
              <div className="text-sm text-gray-500">
                Want to stay updated? Contact us to be notified about upcoming
                events.
              </div>
            </div>
          </motion.div>
        ) : (
          // Events Grid
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {initiatives.map((initiative, idx) => (
              <InitiativeCard
                key={initiative._id}
                initiative={initiative}
                size={getCardSize(idx)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
