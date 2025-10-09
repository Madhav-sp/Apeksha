"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Users, Target, Award } from "lucide-react";
import Link from "next/link";

// Mission data with detailed information
const missionData = {
  "education-programs": {
    title: "Education Programs",
    shortDescription: "Our mission is to close the gap in access to quality education, promoting a comprehensive understanding of the world and fostering tolerant, inclusive societies.",
    image: "/apeksha_herologo.png",
    detailedDescription: "At Apeksha Foundation, we believe that education is the cornerstone of social progress and individual empowerment. Our Education Programs are designed to bridge the gap between traditional learning and modern educational needs, ensuring that every student has access to quality education regardless of their background or circumstances.",
    keyFeatures: [
      "Scholarship programs for underprivileged students",
      "Digital literacy workshops and computer training",
      "Language learning programs (English, Hindi, regional languages)",
      "STEM education initiatives with hands-on learning",
      "Career counseling and guidance sessions",
      "Educational material distribution and library setup"
    ],
    impact: {
      studentsHelped: "500+",
      schoolsSupported: "25+",
      scholarshipsAwarded: "150+",
      workshopsConducted: "100+"
    },
    upcomingEvents: [
      "Digital Literacy Workshop - March 2024",
      "Scholarship Application Drive - April 2024",
      "Career Guidance Seminar - May 2024"
    ]
  },
  "talent-showcase": {
    title: "Talent Showcase",
    shortDescription: "We build platforms where students can showcase diverse talents, from arts to technology, helping them gain confidence and recognition for their unique skills.",
    image: "/talent.jpg",
    detailedDescription: "Every individual possesses unique talents and abilities that deserve recognition and nurturing. Our Talent Showcase program creates inclusive platforms where students can express their creativity, develop their skills, and gain the confidence to pursue their passions. From performing arts to technological innovation, we celebrate diversity in talent.",
    keyFeatures: [
      "Annual talent competitions and exhibitions",
      "Art and craft workshops",
      "Music and dance training programs",
      "Technology innovation challenges",
      "Public speaking and debate competitions",
      "Photography and videography contests"
    ],
    impact: {
      participants: "300+",
      competitionsHeld: "50+",
      awardsGiven: "200+",
      workshopsConducted: "75+"
    },
    upcomingEvents: [
      "Annual Talent Show - March 2024",
      "Art Exhibition - April 2024",
      "Tech Innovation Challenge - May 2024"
    ]
  },
  "social-change": {
    title: "Social Change",
    shortDescription: "To be the voice of youth, we lead community-focused projects and awareness campaigns that address local challenges and drive meaningful social change.",
    image: "/socialchange.jpeg",
    detailedDescription: "Social change begins with awareness and action. Our Social Change initiatives empower young people to become agents of positive transformation in their communities. Through targeted campaigns, community projects, and advocacy programs, we address pressing social issues and create lasting impact.",
    keyFeatures: [
      "Environmental conservation campaigns",
      "Health and hygiene awareness programs",
      "Women empowerment initiatives",
      "Community development projects",
      "Social justice advocacy",
      "Volunteer coordination and management"
    ],
    impact: {
      campaignsLaunched: "30+",
      communitiesReached: "50+",
      volunteersMobilized: "200+",
      awarenessPrograms: "100+"
    },
    upcomingEvents: [
      "Environmental Cleanup Drive - March 2024",
      "Women Empowerment Workshop - April 2024",
      "Community Health Camp - May 2024"
    ]
  },
  "leadership-building": {
    title: "Leadership Building",
    shortDescription: "Shaping the leaders of tomorrow is core to our vision. We offer workshops and real-world opportunities for students to develop crucial leadership skills.",
    image: "/leadership.jpeg",
    detailedDescription: "Leadership is not just about leading others; it's about leading oneself first. Our Leadership Building program focuses on developing essential leadership qualities, decision-making skills, and the ability to inspire and motivate others. We provide both theoretical knowledge and practical experience to mold future leaders.",
    keyFeatures: [
      "Leadership development workshops",
      "Team building and collaboration exercises",
      "Public speaking and communication training",
      "Project management skills development",
      "Mentorship programs with industry leaders",
      "Leadership retreats and conferences"
    ],
    impact: {
      leadersTrained: "150+",
      workshopsConducted: "40+",
      mentorshipPrograms: "25+",
      leadershipProjects: "60+"
    },
    upcomingEvents: [
      "Leadership Summit - March 2024",
      "Mentorship Program Launch - April 2024",
      "Youth Leadership Conference - May 2024"
    ]
  }
};

export default function MissionDetailPage({ params }) {
  const { slug } = params;
  const mission = missionData[slug];

  if (!mission) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Mission Not Found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Our Mission
            </Link>
            
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              {mission.title}
            </h1>
            
            <p className="mx-auto max-w-3xl text-lg text-gray-300 sm:text-xl">
              {mission.shortDescription}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto max-w-7xl px-6 lg:px-8 mb-16"
      >
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={mission.image}
            alt={mission.title}
            className="h-96 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-6">About This Initiative</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {mission.detailedDescription}
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mission.keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {mission.upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
                  >
                    <Calendar className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    <span className="text-gray-300">{event}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Impact Stats */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="sticky top-8"
            >
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Our Impact</h3>
                <div className="space-y-6">
                  {Object.entries(mission.impact).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-4xl font-bold text-blue-400 mb-2">{value}</div>
                      <div className="text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-8 text-center"
              >
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                >
                  Get Involved
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
