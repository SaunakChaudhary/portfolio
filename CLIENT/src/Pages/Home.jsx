import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setStatus("⚠️ All fields are required.");
      return false;
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("⚠️ Please enter a valid email address.");
      return false;
    }
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("https://portfolio-pvps.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // reset form
      } else {
        setStatus(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message. Try again later.");
    }

    setLoading(false);
  };

  // Download Resume Function
  const downloadResume = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Saunak_Chaudhary_Resume.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show a success message
    toast.success('Resume downloaded successfully!');
  };

  // Sample initial bot message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm Saunak's AI assistant. You can ask me about his skills, projects, experience, or how to contact him!",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(), // Better to use timestamp for unique IDs
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch("https://portfolio-pvps.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: inputMessage,
          // You might want to include conversation history for context
          conversation_history: messages.slice(-5) // Last 5 messages for context
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.answer || data.response || "I'm not sure how to answer that. Please try asking something else.",
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error fetching bot response:", error);

      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    // Auto-send after a brief delay
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => { } };
      handleSendMessage(fakeEvent);
    }, 100);
  };

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
      {/* Chatbot Floating Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg z-50 flex items-center justify-center hover:scale-110 transition-transform duration-300 border-2 border-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end justify-end p-4 md:items-center md:justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-96 md:h-[500px] flex flex-col border-2 border-black">
            {/* Chat Header */}
            <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">SC</span>
                </div>
                <div>
                  <h3 className="font-bold">Saunak's Assistant</h3>
                  <p className="text-xs text-gray-300">Online • Ask me anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.isBot
                      ? 'bg-white border-2 border-gray-200 text-gray-800'
                      : 'bg-black text-white'
                      }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-70 block mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {[
                  "What are your skills?",
                  "Tell me about your projects",
                  "How can I contact you?",
                  "What's your experience?"
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="flex-shrink-0 bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me about Saunak..."
                  className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white z-40 border-b-2 border-black transition-all duration-300">
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

          {/* Desktop Resume Download Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={downloadResume}
              className="bg-white text-black px-6 py-2 rounded-none border-2 border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Resume</span>
            </button>
            <button
              className="bg-black text-white px-6 py-2 rounded-none border-2 border-black hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => scrollToSection('contact')}
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              className="bg-black text-white p-2 rounded-none border-2 border-black"
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
              {['home', 'skills', 'projects', 'experience', 'contact'].map((item) => (
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
                className="bg-black text-white px-3 py-2 text-left flex items-center space-x-2"
                onClick={downloadResume}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume</span>
              </button>
              <button
                className="bg-white text-black px-3 py-2 text-left border-2 border-black mt-2"
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
                    onClick={downloadResume}
                    className="bg-white text-black px-8 py-3 rounded-none border-2 border-black hover:bg-black hover:text-white transition-all duration-300 font-medium transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Resume</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2 2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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

          {/* Resume Download CTA */}
          <div className="text-center mt-16">
            <div className="bg-white border-2 border-black p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-black text-black mb-4">Want to see more?</h3>
              <p className="text-gray-700 mb-6">Download my complete resume to see my full experience, education, and skills in detail.</p>
              <button
                onClick={downloadResume}
                className="bg-black text-white px-8 py-3 rounded-none border-2 border-black hover:bg-white hover:text-black transition-all duration-300 font-medium transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] flex items-center space-x-2 mx-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Full Resume (PDF)</span>
              </button>
            </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project 1 */}
            <div className="border-2 border-black bg-white hover:shadow-[6px_6px_0_0_#000] transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
              <div className="h-36 border-b-2 border-black relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 text-xs font-medium">2024</div>
                <img src="./prj2.png" alt="DevSphere Project" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-black mb-2">DevSphere - Developer Social Media</h3>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                  Built a social media platform tailored for developers to share projects, connect, and collaborate.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['MERN Stack', 'Socket.io', 'Cloudinary'].map((tech, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-0.5 text-xs border border-gray-300 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <NavLink to="https://devsphere-97jl.onrender.com/" target='_blank' className="text-center flex-1 bg-black text-white px-3 py-1.5 text-sm font-medium hover:bg-gray-800 transition-colors border border-black">
                    Live Demo
                  </NavLink>
                  <NavLink to="https://github.com/SaunakChaudhary/devSphere" target='_blank' className=" text-center flex-1 bg-white text-black px-3 py-1.5 text-sm font-medium border border-black hover:bg-gray-100 transition-colors">
                    Source Code
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Download Section */}
          <div className="text-center mt-16">
            <div className="bg-black text-white p-8 max-w-2xl mx-auto border-2 border-white">
              <h3 className="text-2xl font-black mb-4">Ready to work together?</h3>
              <p className="text-gray-300 mb-6">Download my resume to learn more about my qualifications and experience.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={downloadResume}
                  className="bg-white text-black px-6 py-3 rounded-none border-2 border-white hover:bg-black hover:text-white transition-all duration-300 font-medium flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Resume</span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-transparent text-white px-6 py-3 rounded-none border-2 border-white hover:bg-white hover:text-black transition-all duration-300 font-medium"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block border-2 border-black px-6 py-2 mb-4">
              <span className="text-sm font-black uppercase tracking-widest">Career Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-3">EXPERIENCE & EDUCATION</h2>
            <div className="w-20 h-0.5 bg-black mx-auto"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Left Column - Experience */}
            <div className="space-y-8">
              {/* Experience Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-black bg-black text-white mb-3">
                  <span className="text-2xl font-black">💼</span>
                </div>
                <h3 className="text-2xl font-black text-black uppercase">Work Experience</h3>
              </div>

              {/* Experience Card */}
              <div className="border-2 border-black bg-white p-6 relative group hover:-translate-y-1 transition-transform duration-300">
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-black"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-black"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black"></div>

                <div className="flex justify-between items-start mb-4">
                  <span className="bg-black text-white px-3 py-1 text-xs font-bold">INTERNSHIP</span>
                  <span className="text-sm font-semibold text-gray-600">May 2025 - July 2025</span>
                </div>

                <h3 className="text-xl font-black text-black mb-2">MERN Stack Developer</h3>
                <p className="text-gray-700 font-medium mb-4">TechnoGuide Infosoft Pvt. Ltd, Anand</p>

                <ul className="space-y-3">
                  {[
                    "Designed and developed responsive website for Vaishnav Vanik Samaj using MERN stack",
                    "Deployed website to cloud platform ensuring high availability",
                    "Implemented user authentication, event management, and dynamic content features",
                    "Collaborated with stakeholders and delivered project milestones on schedule",
                    "Optimized website performance and ensured mobile responsiveness"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-black mr-3 mt-1 font-bold">⟡</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <span className="text-xs font-bold text-gray-600 uppercase">Tech Stack:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["React", "Node.js", "MongoDB", "Express", "JavaScript", "Tailwind CSS"].map((tech, index) => (
                      <span key={index} className="bg-gray-100 border border-black px-2 py-1 text-xs font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Experience Placeholder */}
              <div className="border-2 border-dashed border-gray-400 bg-gray-50 p-6 text-center">
                <div className="text-3xl mb-2">🚀</div>
                <p className="text-gray-600 font-medium">More experiences coming soon!</p>
              </div>
            </div>

            {/* Right Column - Education */}
            <div className="space-y-8">
              {/* Education Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-black bg-black text-white mb-3">
                  <span className="text-2xl font-black">🎓</span>
                </div>
                <h3 className="text-2xl font-black text-black uppercase">Education</h3>
              </div>

              {/* Education Cards */}
              <div className="space-y-6">
                {/* MSc Card */}
                <div className="border-2 border-black bg-white p-6 relative group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-black"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-black"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black"></div>

                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-gray-100 border border-black text-black px-3 py-1 text-xs font-bold">POSTGRADUATE</span>
                    <span className="text-sm font-semibold text-gray-600">2024 - 2026</span>
                  </div>

                  <h3 className="text-xl font-black text-black mb-1">MSc. Information Technology</h3>
                  <p className="text-gray-700 font-medium mb-3">Sardar Patel University, Anand</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-black text-2xl text-black">8.24</span>
                      <span className="text-gray-600 ml-1">CGPA</span>
                    </div>
                    <span className="bg-yellow-500 text-black px-2 py-1 text-xs font-bold">In Progress</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 border border-black">
                    <div className="bg-black h-2" style={{ width: '50%' }}></div>
                  </div>
                </div>

                {/* BSc Card */}
                <div className="border-2 border-black bg-white p-6 relative group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-black"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-black"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black"></div>

                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-gray-100 border border-black text-black px-3 py-1 text-xs font-bold">UNDERGRADUATE</span>
                    <span className="text-sm font-semibold text-gray-600">2021 - 2024</span>
                  </div>

                  <h3 className="text-xl font-black text-black mb-1">BSc. Computer Application & IT</h3>
                  <p className="text-gray-700 font-medium mb-3">NV Patel College, Anand</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-black text-2xl text-black">9.66</span>
                      <span className="text-gray-600 ml-1">CGPA</span>
                    </div>
                    <span className="bg-green-500 text-white px-2 py-1 text-xs font-bold">Completed</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 border border-black">
                    <div className="bg-green-500 h-2" style={{ width: '100%' }}></div>
                  </div>
                </div>

                {/* Resume Download Card */}
                <div className="border-2 border-black bg-white p-6 text-center hover:shadow-[4px_4px_0_0_#000] transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-4xl mb-3">📄</div>
                  <h4 className="text-lg font-black text-black mb-2">Download Full Resume</h4>
                  <p className="text-gray-700 text-sm mb-4">Get the complete details of my experience, education, and skills in PDF format.</p>
                  <button
                    onClick={downloadResume}
                    className="bg-black text-white px-6 py-2 rounded-none border-2 border-black hover:bg-white hover:text-black transition-all duration-300 font-medium w-full flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Resume PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="text-center mt-16">
            <div className="inline-flex space-x-2">
              <div className="w-1 h-1 bg-black"></div>
              <div className="w-1 h-1 bg-black"></div>
              <div className="w-1 h-1 bg-black"></div>
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

              {/* Resume Download in Contact Section */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <button
                  onClick={downloadResume}
                  className="bg-white text-black px-6 py-3 rounded-none border-2 border-white hover:bg-black hover:text-white transition-all duration-300 font-medium w-full flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Resume</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-900 text-white border-2 border-gray-700 rounded-none focus:outline-none focus:border-white transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-900 text-white border-2 border-gray-700 rounded-none focus:outline-none focus:border-white transition-all duration-300"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-900 text-white border-2 border-gray-700 rounded-none focus:outline-none focus:border-white transition-all duration-300"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-black px-8 py-3 rounded-none border-2 border-white hover:bg-black hover:text-white transition-all duration-300 font-medium transform hover:-translate-y-1 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status && <p className="mt-2 text-sm">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;