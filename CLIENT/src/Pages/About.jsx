/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";

export default function About() {
    return (
        <div className="bg-gray-900 text-white min-h-screen px-6 md:px-20 py-20">
            <Navbar/>

            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-center text-indigo-400 mb-10"
            >
                About Me
            </motion.h2>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-300"
            >
                <p className="mb-6">
                    Hello! I'm <span className="text-indigo-400 font-semibold">Saunak Chaudhary</span>, a passionate MERN Stack Developer and MSc IT student based in Anand. I love building full-stack web applications that solve real-world problems, and I'm always seeking new challenges to grow as a developer.
                </p>

                <p className="mb-6">
                    My journey started with a Bachelor's in CA & IT, where I not only excelled academically with a 9.66 CGPA but also actively participated in hackathons, winning multiple tech competitions. Whether it's front-end design or back-end logic, I enjoy crafting seamless and efficient user experiences.
                    I thrive in collaborative environments and love connecting with like-minded tech enthusiasts.
                </p>

                <p className="mb-6">
                    In my free time, you'll find me solving DSA problems, playing chess, or diving into the latest JavaScript frameworks. I'm always up for learning something new and pushing boundaries!
                </p>

                <p className="mb-6">
                    I'm skilled in technologies like <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express</strong>, <strong>MongoDB</strong>, and more. I'm also proficient in HTML, CSS, Tailwind CSS, and Git. I'm constantly improving my understanding of data structures and algorithms to write better code every day.
                </p>

                <p className="mb-6">
                    Apart from academics and projects, I&apos;ve taken part in numerous coding competitions and group projects, where I&apos;ve honed both my technical and soft skills. I believe communication, creativity, and consistency are just as important as coding skills.
                </p>

                <p>
                    Let&apos;s connect and create something amazing together 🚀
                </p>
            </motion.div>
        </div>
    );
}