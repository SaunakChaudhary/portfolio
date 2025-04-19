/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import devIllustration from "../assets/undraw_developer-activity_dn7p.svg";
import Navbar from "../Components/Navbar";

export default function Home() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage(""); // Clear previous message

        try {
            const response = await fetch("http://localhost:5000/contactme", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage("Thank you for your message! I will get back to you soon.");
                setFormData({ name: "", email: "", message: "" }); // Clear the form
            } else {
                setResponseMessage(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setResponseMessage("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
            {/* Navbar */}
            <Navbar home={true} />

            {/* Hero Section */}
            <section className="pt-24 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex-1"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Hi, I'm <span className="text-indigo-500">Saunak Chaudhary</span>
                    </h1>
                    <p className="text-md sm:text-md mb-6 text-slate-400">
                        MERN Developer | MSc IT Student
                    </p>
                    <p className="text-gray-300 mb-8">
                        Focused on crafting performant full-stack apps using modern web technologies.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <NavLink to="/projects" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl transition">View Projects</NavLink>
                        <NavLink to="/resume" className="px-6 py-3 border border-indigo-500 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-2xl transition">Download Resume</NavLink>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex-1 mt-10 md:mt-0"
                >
                    <img src={devIllustration} alt="Developer" className="w-full max-w-sm mx-auto" />
                </motion.div>
            </section>

            {/* Skills Section */}
            <section className="py-16 px-6 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-indigo-400 mb-8">Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg text-gray-200">
                    <div>React</div>
                    <div>Node.js</div>
                    <div>MongoDB</div>
                    <div>Express</div>
                    <div>HTML5</div>
                    <div>CSS3 / Tailwind</div>
                    <div>JavaScript (ES6+)</div>
                    <div>Git & GitHub</div>
                    <div>Asp.net</div>
                    <div>PHP</div>
                    <div>Java</div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-16 px-6 md:px-20 text-center">
                <h2 className="text-3xl font-bold text-indigo-400 mb-8">Projects</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">DevSphere</h3>
                        <p className="text-gray-300 mb-2">Social platform for developers to connect and collaborate.</p>
                        <p className="text-sm text-indigo-300">MERN Stack</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 px-6 md:px-20 bg-gray-900 text-center">
                <h2 className="text-3xl font-bold text-indigo-400 mb-8">Contact Me</h2>
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message"
                        rows="5"
                        className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-700"
                    ></textarea>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
                {responseMessage && (
                    <p className="mt-4 text-gray-300">{responseMessage}</p>
                )}
            </section>

            {/* Footer */}
            <footer className="text-center py-6 text-gray-500">
                © {new Date().getFullYear()} Saunak Chaudhary. All rights reserved.
            </footer>
        </div>
    );
}
