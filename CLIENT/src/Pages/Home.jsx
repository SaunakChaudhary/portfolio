import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white z-50 border-b-2 border-black transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-black tracking-tight">SAUNAK CHAUDHARY</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['home', 'skills', 'projects', 'experience', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-lg font-medium transition-all uppercase duration-300 relative ${activeSection === item
                  ? 'text-black'
                  : 'text-gray-600 hover:text-black'
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {activeSection === item && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              className="bg-black text-white px-6 py-2 rounded-none border-2 border-black hover:bg-white hover:text-black transition-all duration-300 hidden md:block"
              onClick={() => scrollToSection('contact')}
            >
              Let's Talk
            </button>

            <button
              className="md:hidden bg-black text-white p-2 rounded-none border-2 border-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white p-4 border-t-2 border-black">
            <div className="flex flex-col space-y-3">
              {['home', 'skills', 'projects', 'achievements', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-3 py-2 text-left transition-all duration-300 ${activeSection === item
                    ? 'bg-black text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              <button
                className="bg-black text-white px-3 py-2 text-left mt-2"
                onClick={() => scrollToSection('contact')}
              >
                Let's Talk
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Animated background elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply opacity-70 animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

              <div className="relative z-10">
                <div className="mb-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-400 mb-2 tracking-tight">CODING WITH</h2>
                  <h1 className="text-5xl md:text-7xl font-black text-black mb-2 leading-tight tracking-tighter">PASSION,</h1>
                  <h1 className="text-5xl md:text-7xl font-black text-black leading-tight tracking-tighter">CREATING WITH PURPOSE</h1>
                </div>

                <div className="border-l-4 border-black pl-4 my-8 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-black rounded-full"></div>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    # Hello I'm Saunak — a creative and driven web developer with experience in the field.
                    I thrive on turning imaginative ideas into digital realities, constantly seeking innovative ways to
                    blend design and technology.
                  </p>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="bg-black text-white px-8 py-3 rounded-none border-2 border-black hover:bg-white hover:text-black transition-all duration-300 font-medium transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000]"
                  >
                    View My Work
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="bg-white text-black px-8 py-3 rounded-none border-2 border-black hover:bg-black hover:text-white transition-all duration-300 font-medium transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000]"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>
            </div>

            <div className="relative -mt-10">
              <img
                src="./CUTOUT.png"
                alt="Saunak Chaudhary"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Better Icons */}
      <section id="skills" className="py-20 px-4 bg-gray-50 relative">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-gray-50"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">I SPECIALIZE IN A RANGE OF SKILLS</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: 'JavaScript (ES6+)',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                color: "text-yellow-500",
                bgColor: "bg-yellow-50"
              },
              {
                name: 'React.js',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                color: "text-blue-500",
                bgColor: "bg-blue-50"
              },
              {
                name: 'Node.js',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                ),
                color: "text-green-600",
                bgColor: "bg-green-50"
              },
              {
                name: 'HTML5 & CSS3',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                ),
                color: "text-orange-500",
                bgColor: "bg-orange-50"
              },
              {
                name: 'Tailwind CSS',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
                color: "text-cyan-500",
                bgColor: "bg-cyan-50"
              },
              {
                name: 'Express.js',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                  </svg>
                ),
                color: "text-gray-700",
                bgColor: "bg-gray-50"
              },
              {
                name: 'MongoDB',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                ),
                color: "text-green-500",
                bgColor: "bg-green-50"
              },
              {
                name: 'PostgreSQL',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 0V7" />
                  </svg>
                ),
                color: "text-blue-700",
                bgColor: "bg-blue-50"
              },
              {
                name: 'Python & Django',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                color: "text-blue-600",
                bgColor: "bg-blue-50"
              },
              {
                name: 'Git & GitHub',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                ),
                color: "text-gray-800",
                bgColor: "bg-gray-50"
              },
              {
                name: 'Socket.io',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                color: "text-black",
                bgColor: "bg-gray-100"
              },
              {
                name: 'PHP',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
                color: "text-purple-500",
                bgColor: "bg-purple-50"
              },
              {
                name: 'Asp.Net',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                ),
                color: "text-purple-600",
                bgColor: "bg-purple-50"
              }
            ].map((skill, index) => (
              <div
                key={index}
                className="bg-white p-6 border-2 border-black text-center hover:shadow-[6px_6px_0_0_#000] transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className={`absolute inset-0 ${skill.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`mb-3 flex justify-center ${skill.color}`}>
                    {skill.icon}
                  </div>
                  <p className="font-medium text-gray-800">{skill.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">HERE'S A GLIMPSE OF SOME EXCITING PROJECTS I'VE DONE</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Project 1 */}
            <div className="border-2 border-black bg-white hover:shadow-[10px_10px_0_0_#000] transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden">
              <div className="h-48 border-b-2 border-black relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-sm font-medium">2024</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">DevSphere - Developer Social Media</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Built a social media platform tailored for developers to share projects, connect, and collaborate.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['MERN Stack', 'Socket.io', 'Cloudinary'].map((tech, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 text-sm border border-gray-300 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="text-black font-medium underline decoration-2 underline-offset-4 hover:no-underline group-hover:translate-x-2 transition-transform duration-300">
                  View Project →
                </button>
              </div>
            </div>

            {/* Project 2 */}
            <div className="border-2 border-black bg-white hover:shadow-[10px_10px_0_0_#000] transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden">
              <div className="h-48  border-b-2 border-black relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-sm font-medium">2025</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">Vaishnav Vanik Samaj Website</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Developed a complete website for a community organization managing 4000+ members.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['MERN Stack', 'Responsive Design', 'Excel Integration'].map((tech, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 text-sm border border-gray-300 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="text-black font-medium underline decoration-2 underline-offset-4 hover:no-underline group-hover:translate-x-2 transition-transform duration-300">
                  View Project →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="border-2 border-black bg-white p-8 md:p-12 hover:shadow-[8px_8px_0_0_#000] transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-6 tracking-tight">Work Experience</h2>

            <div className="mb-8 pb-8 border-b-2 border-gray-300">
              <h3 className="text-2xl font-bold text-black">MERN Stack Developer (Intern)</h3>
              <p className="text-lg text-gray-600 mb-4">TechnoGuide Infosoft Pvt. Ltd, Anand | May 2025 - July 2025</p>
              <ul className="space-y-2">
                {[
                  "Designed and developed a responsive website for Vaishnav Vanik Samaj using the MERN stack",
                  "Deployed the website to a cloud platform, ensuring high availability",
                  "Implemented user authentication, event management, and dynamic content features",
                  "Collaborated with stakeholders and delivered project milestones on schedule",
                  "Optimized website performance and ensured mobile responsiveness"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-black mr-2 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-4">Education</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-black mt-1 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-black">MSc. Information Technology</h4>
                    <p className="text-gray-600">Sardar Patel University, Anand</p>
                    <p className="text-gray-500">2024 - 2026 | 8.24 CGPA</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-black mt-1 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-black">BSc. Computer Application & IT</h4>
                    <p className="text-gray-600">NV Patel College, Anand</p>
                    <p className="text-gray-500">2021 - 2024 | 9.66 CGPA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black text-white relative">
        <div className="absolute top-0 left-0 w-full h-16"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">LET'S WORK TOGETHER</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="bg-white text-black p-2 rounded mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>+91 7984297663</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-white text-black p-2 rounded mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>saunakchaudhary0404@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-white text-black p-2 rounded mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p>Anand, Gujarat, India</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <a target="_blank" href="https://linkedin.com/in/saunak-chaudhary-27830336a" className="bg-white text-black p-3 rounded border-2 border-white hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a target="_blank" href="https://github.com/saunakchaudhary" className="bg-white text-black p-3 rounded border-2 border-white hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 bg-gray-900 text-white border-2 border-gray-700 rounded-none focus:outline-none focus:border-white transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 bg-gray-900 text-white border-2 border-gray-700 rounded-none focus:outline-none focus:border-white transition-all duration-300"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full p-3 bg-gray-900 text-white border-2 border-gray-700 rounded-none focus:outline-none focus:border-white transition-all duration-300"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-white text-black px-8 py-3 rounded-none border-2 border-white hover:bg-black hover:text-white transition-all duration-300 font-medium transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;