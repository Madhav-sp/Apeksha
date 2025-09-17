"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-black py-24 px-6 "
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-2xl text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Reach Out to Us
        </h2>

        <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed">
          We are at St. Martin’s Engineering College. Forms for application are{" "}
          <span className="text-red-500 font-semibold">closed</span>. For
          collaborations, inquiries, or support, you can contact us below.
        </p>

        <div className="space-y-6 text-left">
          {/* Email */}
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-red-500" />
            <div>
              <h4 className="text-white font-medium">Email</h4>
              <p className="text-gray-300">stmartinscollege@gmail.com</p>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-red-500" />
            <div>
              <h4 className="text-white font-medium">Phone</h4>
              <p className="text-gray-300">+91 98765 43210</p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-red-500" />
            <div>
              <h4 className="text-white font-medium">Location</h4>
              <p className="text-gray-300">Hyderabad, Telangana, India</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
