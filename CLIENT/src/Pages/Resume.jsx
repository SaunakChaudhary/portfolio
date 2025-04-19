import React from "react";
import resume from "../assets/saunak_resume.pdf";
import Navbar from "../Components/Navbar";

export default function Resume() {
  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 md:px-20 py-20">
      <Navbar />
      <h2 className="text-4xl font-bold text-center text-indigo-400 mb-10">
        My Resume
      </h2>

      <div className="flex flex-col items-center">
        {/* Resume PDF Viewer */}
        <iframe
          src={resume}
          title="Resume"
          className="w-full h-[400px] md:w-2/3 mb-8"
        ></iframe>

        {/* Download Button */}
        <a
          href={resume}
          download
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}
