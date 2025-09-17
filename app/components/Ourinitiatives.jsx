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

  const cardSizeClass = {
    large: "md:col-span-2 h-96",
    medium: "md:col-span-2 h-80",
    small: "md:col-span-1 h-80",
  };

  const { title, description, venue, date, price, image } = initiative;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
      }}
      className={`relative rounded-3xl bg-gray-900/50 ${cardSizeClass[size]}`}
    >
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 grid place-content-center rounded-2xl bg-black shadow-2xl"
      >
        <motion.img
          src={image}
          alt={title}
          style={{
            transform: "translateZ(25px)",
            translateX: useTransform(mouseXSpring, [-0.5, 0.5], ["-5%", "5%"]),
            translateY: useTransform(mouseYSpring, [-0.5, 0.5], ["-5%", "5%"]),
          }}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity duration-300"
        />
        <div
          style={{ transform: "translateZ(50px)" }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
        />
        <div
          style={{ transform: "translateZ(75px)" }}
          className="relative z-10 flex h-full flex-col justify-between p-6 text-white"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-blue-300">
              {venue}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold leading-tight md:text-2xl">
              {title}
            </h3>
            <p className="text-sm font-medium text-gray-400">{description}</p>
            <p className="mt-2 font-medium">
              Date: {new Date(date).toDateString()}
            </p>
            <p className="mt-1 font-semibold">Price: ₹{price}</p>
          </div>
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

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading events...</p>
            </div>
          </div>
        ) : initiatives.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-12 border border-gray-700/50 max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No Events Available</h3>
              <p className="text-gray-400 mb-6">
                We're currently working on organizing new initiatives. Check back soon for exciting events and programs!
              </p>
              <div className="text-sm text-gray-500">
                Want to stay updated? Contact us to be notified about upcoming events.
              </div>
            </div>
          </motion.div>
        ) : (
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

        {/* <motion.div
          className="mt-24 rounded-3xl bg-gray-900/50 p-12 text-center ring-1 ring-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        > */}
          {/* <h2 className="text-4xl font-bold text-white">Join Our Movement</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            Be part of a growing family of changemakers. Your support can help
            us turn our vision into reality.
          </p>
          <div className="my-8 text-6xl font-bold text-blue-400 sm:text-7xl">
            2,500+ Strong
          </div> */}
          {/* <motion.button
            className="group inline-flex items-center gap-x-2 rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Make a Difference
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.button> */}
        {/* </motion.div> */}
      </div>
    </div>
  );
}
