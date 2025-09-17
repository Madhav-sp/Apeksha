"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", path: "/", sectionId: "home" },
    { name: "About", path: "/about", sectionId: "about" },
    { name: "Our Initiatives", path: "/our-initiatives", sectionId: "initiatives" },
    { name: "Gallery", path: "/gallery", sectionId: "gallery" },
    { name: "Contact", path: "/contact", sectionId: "contact" },
  ];

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.sectionId);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Only run scroll spy on home page
    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Call once to set initial state
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, navItems]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileMenuOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 mx-auto w-[90%] max-w-5xl"
      >
        <nav
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20
                     px-6 py-3 shadow-lg shadow-white/5 backdrop-blur-xl"
        >
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white">
            APEKSHA
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === "/" 
                ? activeSection === item.sectionId 
                : pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => pathname === "/" ? scrollToSection(item.sectionId) : null}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium
                             transition-colors ${
                               isActive
                                 ? "text-black"
                                 : "text-neutral-300 hover:text-white"
                             }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 z-10 bg-white"
                      style={{ borderRadius: 9999 }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-20">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full p-2 text-neutral-300 transition-colors hover:bg-white/10"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-0 top-0 z-40 mt-20 p-4 md:hidden"
          >
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6 shadow-2xl shadow-white/10 backdrop-blur-2xl">
              <div className="flex flex-col gap-y-4">
                {navItems.map((item) => {
                  const isActive = pathname === "/" 
                    ? activeSection === item.sectionId 
                    : pathname === item.path;
                  
                  return (
                    <motion.div key={item.path} variants={menuItemVariants}>
                      <button
                        onClick={() => {
                          if (pathname === "/") {
                            scrollToSection(item.sectionId);
                          } else {
                            setMobileMenuOpen(false);
                          }
                        }}
                        className={`block w-full text-left rounded-lg px-4 py-3 text-lg font-semibold ${
                          isActive
                            ? "bg-white text-black"
                            : "text-neutral-200 hover:bg-white/10"
                        }`}
                      >
                        {item.name}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
