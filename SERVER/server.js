const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const personalInfo = {
  details: `
    First Name: Saunak
    Middle Name: Nimleshbhai
    Last Name: Chaudhary
    Location: Anand, Gujarat, India
    Phone: +91 7984297663
    Email: saunakchaudhary0404@gmail.com
    LinkedIn: linkedin.com/in/saunak-chaudhary-27830336a
    GitHub: github.com/saunakchaudhary

    EDUCATION:
    - MSc Information Technology (2024-2026) - Sardar Patel University, Anand - 8.24 CGPA
    - BSc Computer Application & IT (2021-2024) - NV Patel College, Anand - 9.66 CGPA
    - HSC Science (2021) - Ved International School, Gandhinagar - 81.33%

    TECHNICAL SKILLS:
      FRONTEND DEVELOPMENT:
        - JavaScript (ES6+), React.js, HTML5, CSS3, Tailwind CSS

      BACKEND DEVELOPMENT:
        - Node.js, Express.js, Python, Django

      DATABASE:
        - MongoDB

      TOOLS & TECHNOLOGIES:
        - Git, GitHub, Socket.io, Cloudinary, REST APIs

      LANGUAGES:
        - Gujarati (Fluent), Hindi (Fluent), English (Basic Speaking, Good Understanding)

      SOFT SKILLS:
      - Problem Solving, Collaboration, Adaptability, Project Management

  EXPERIENCE:
    MERN Stack Developer Intern - TechnoGuide Infosoft Pvt. Ltd (May 2025 - July 2025)
    - Developed responsive website for Vaishnav Vanik Samaj using MERN stack
    - Implemented user authentication, event management, and dynamic content
    - Deployed to cloud platform and optimized performance

  PROJECTS:
    1. DevSphere - Developer Social Media (2024)
       - Features: Profiles, posts, messaging, coding challenges
       - Technologies: MERN Stack, Socket.io, Cloudinary

    2. Vaishnav Vanik Samaj Website (2025)
       - Features: Event management, donations, member profiles
       - Technologies: MERN Stack, Excel integration

    3. Krisha Fire & Security CRM (2025)
       - Features: User management, quotations, inventory, mobile app
       - Technologies: MERN Stack, Tailwind CSS, REST APIs, JWT Auth, Socket.io

  ACHIEVEMENTS:
       - 1st Place: Web Page Designing, TechnoAstrum 2024
    - 1st Place: Bug Spot, Technokhoj 2024
    - 2nd Place: Quiz Bowl, Techarena 2024
    - 1st Place: Code Master, Brain Tech 2023
    - Multiple inter-class coding competition wins
  
  CAREER GOALS:
    SHORT-TERM (0-2 years):
    - Complete MSc IT with excellent academic record
    - Secure full-time MERN Stack Developer role
    - Work on meaningful projects and advanced technologies

    LONG-TERM (3-5 years):
    - Become Senior Full-Stack Developer
    - Specialize in AI/ML integration
    - Mentor junior developers and contribute to open-source
    - Technical leadership opportunities

    TECHNICAL INTERESTS:
    - AI/ML integration, Real-time apps, Cloud computing, Mobile development, Cybersecurity
  
    CONTACT ME:
    Availability:
    - Freelance projects and collaborations
    - Full-time opportunities starting 2026

    Preferred Communication:
    - Email: saunakchaudhary0404@gmail.com
    - Phone/WhatsApp: +91 7984297663
    - LinkedIn & GitHub for professional/technical collaboration

    Collaboration Interests:
    - Open-source contributions, hackathons, tech events, mentorship
    - Preferred Projects: Full-stack apps, real-time platforms, educational tech, AI solutions
    `,
};
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) return res.status(400).json({ error: "Question is required" });

  try {
    const promptText = `Answer the following question using ONLY this information:\n${personalInfo.details}\nQuestion: ${question}\nAnswer:`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      }
    );

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts[0]?.text || "No answer found";
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to the PORT ${process.env.PORT}`);
});
