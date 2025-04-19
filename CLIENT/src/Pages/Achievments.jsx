/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import trophy from "../assets/trophy.jpg";

const achievements = [
  {
    title: "Web Page Designing - TechnoAstrum 2024",
    description: "1st Place in Web Page Designing at the TechnoAstrum 2024 event, NVPAS, Anand.",
    image: trophy,
  },
  {
    title: "Bug Spot - Technokhoj 2024",
    description: "1st Place in Bug Spot at Technokhoj 2024 event, ISTAR, Anand.",
    image: trophy,
  },
  {
    title: "Quiz Bowl - Techarena 2024",
    description: "2nd Place in Quiz Bowl at Techarena 2024 event, Christ College, Rajkot.",
    image: trophy,
  },
  {
    title: "IT Quiz - Inter-class Competition",
    description: "2nd Place in IT Quiz in an inter-class competition.",
    image: trophy,
  },
  {
    title: "Code Master - Inter-class Competition",
    description: "1st Place in Code Master in an inter-class competition.",
    image: trophy,
  },
  {
    title: "Code Master - Brain Tech 2023",
    description: "1st Place in Code Master at the Brain Tech 2023 event, CP Patel College.",
    image: trophy,
  },
];

export default function Achievements() {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 md:px-20 py-20">
      <Navbar />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-indigo-400 mb-10"
      >
        My Achievements
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {achievements.map((achv, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 text-center">
            <img src={achv.image} alt={achv.title} className="w-full h-60 object-center rounded-lg mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{achv.title}</h3>
            <p className="text-gray-300 mb-4">{achv.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}