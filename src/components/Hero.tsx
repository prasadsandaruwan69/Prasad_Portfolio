import React, { useState, useEffect, useRef } from "react";
import Prasad from "../assets/image/Prasad.jpg"
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  Code,
  Terminal,
  Cpu,
  Zap,
} from "lucide-react";

const Hero = ({ isDarkMode }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  const fullText = "Full-Stack Developer & AI Enthusiast";

  // Coding snippets for animation
  const codeSnippets = [
    "const developer = { name: 'Prasad', skills: ['React', 'Node.js', 'AI'] };",
    "function createInnovation() { return passion + technology; }",
    "class WebDeveloper extends Human { constructor() { super('creative'); } }",
    "import { success } from 'hardwork'; export default achievement;",
    "const AI = await import('future'); console.log('Building tomorrow');",
    "async function buildDreams() { while(true) { code(); innovate(); } }",
  ];

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Code cycling animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Floating code elements
  const FloatingCodeElements = () => {
    const codeElements = [
      "<React />",
      "useState()",
      "async/await",
      "API",
      "JSX",
      "Node.js",
      "MongoDB",
      "Express",
      "TypeScript",
      "GraphQL",
      "AWS",
      "Docker",
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeElements.map((code, i) => (
          <div
            key={i}
            className={`absolute text-xs font-mono animate-float-code ${
              isDarkMode 
                ? 'text-emerald-400/30' 
                : 'text-emerald-600/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            {code}
          </div>
        ))}
      </div>
    );
  };

  // Animated background with coding theme
  const CodingBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}
        style={{ mixBlendMode: "screen" }}
      />

      {/* Gradient overlays */}
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black via-slate-900 to-emerald-900/20' 
          : 'bg-gradient-to-br from-slate-50 via-white to-emerald-50/30'
      }`} />
      <div
        className={`absolute inset-0 animate-gradient-shift ${
          isDarkMode
            ? 'bg-gradient-to-tr from-emerald-500/5 via-transparent to-blue-500/5'
            : 'bg-gradient-to-tr from-emerald-400/10 via-transparent to-blue-400/10'
        }`}
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${
            mousePosition.y * 30
          }px)`,
        }}
      />

      {/* Animated grid */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-10' : 'opacity-5'}`}>
        <div className={`grid-pattern ${isDarkMode ? '' : 'grid-pattern-light'}`}></div>
      </div>

      {/* Glowing orbs */}
      <div className={`absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
        isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-400/20'
      }`} />
      <div
        className={`absolute bottom-1/3 right-1/6 w-80 h-80 rounded-full blur-3xl animate-pulse-slow ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
        }`}
        style={{ animationDelay: "3s" }}
      />
      <div
        className={`absolute top-1/2 left-1/2 w-60 h-60 rounded-full blur-3xl animate-pulse-slow ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-400/20'
        }`}
        style={{ animationDelay: "6s" }}
      />
    </div>
  );

  // Holographic profile effect
  const HolographicProfile = () => (
    <div className="relative group">
      {/* Main image */}
      <img
        src={Prasad}
        alt="Prasad Sandaruwan"
        className={`profile-image mx-auto border-2 shadow-2xl relative z-10 hover-lift group-hover:border-emerald-400 transition-all duration-500 ${
          isDarkMode 
            ? 'border-emerald-400/50' 
            : 'border-emerald-500/60'
        }`}
        style={{
          transform: `perspective(1000px) rotateY(${
            mousePosition.x * 15
          }deg) rotateX(${mousePosition.y * -15}deg)`,
          filter: `drop-shadow(0 0 20px rgba(16, 185, 129, ${isDarkMode ? '0.5' : '0.3'}))`,
        }}
      />

      {/* Tech icons floating around */}
      <div className="absolute inset-0">
        {[Code, Terminal, Cpu, Zap].map((Icon, index) => (
          <Icon
            key={index}
            size={20}
            className={`absolute animate-orbit ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "120px",
              animationDelay: `${index * 2}s`,
              transform: `rotate(${index * 90}deg) translateX(120px) rotate(-${
                index * 90
              }deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style jsx>{`
        @keyframes float-code {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-60px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes gradient-shift {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
        @keyframes text-glow {
          0%,
          100% {
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(16, 185, 129, 0.8),
              0 0 60px rgba(16, 185, 129, 0.3);
          }
        }
        @keyframes typing-cursor {
          0%,
          50% {
            border-color: transparent;
          }
          51%,
          100% {
            border-color: #10b981;
          }
        }
        @keyframes hologram-glitch {
          0%,
          90%,
          100% {
            transform: translate(0);
          }
          10% {
            transform: translate(-2px, 1px);
          }
          20% {
            transform: translate(2px, -1px);
          }
          30% {
            transform: translate(-1px, 2px);
          }
        }

        .animate-float-code {
          animation: float-code 25s linear infinite;
        }
        .animate-gradient-shift {
          animation: gradient-shift 12s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        .animate-typing-cursor {
          animation: typing-cursor 1s infinite;
        }
        .animate-hologram-glitch {
          animation: hologram-glitch 3s infinite;
        }

        .profile-image {
          width: 380px;
          height: 480px;
          border-radius: 50%;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .glass-card-light {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-15px) scale(1.05);
        }

        .grid-pattern {
          background-image: linear-gradient(
              rgba(16, 185, 129, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          width: 100%;
          height: 100%;
          animation: grid-move 20s linear infinite;
        }

        .grid-pattern-light {
          background-image: linear-gradient(
              rgba(16, 185, 129, 0.2) 1px,
              transparent 1px
            ),
            linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px);
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .code-terminal {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(16, 185, 129, 0.1) 100%
          );
          border: 1px solid rgba(16, 185, 129, 0.3);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
        }

        .code-terminal-light {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(16, 185, 129, 0.05) 100%
          );
          border: 1px solid rgba(16, 185, 129, 0.4);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);
        }

        .neon-border {
          box-shadow: 0 0 5px rgba(16, 185, 129, 0.5),
            0 0 10px rgba(16, 185, 129, 0.3), 0 0 15px rgba(16, 185, 129, 0.1);
        }

        .neon-border-light {
          box-shadow: 0 0 5px rgba(16, 185, 129, 0.3),
            0 0 10px rgba(16, 185, 129, 0.2), 0 0 15px rgba(16, 185, 129, 0.1);
        }
      `}</style>

      <section
        ref={heroRef}
        id="home"
        className={`min-h-screen p-10 flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-black text-white' 
            : 'bg-gradient-to-br from-slate-50 to-white text-gray-900'
        }`}
      >
       
        <FloatingCodeElements />

        <div className="container mx-auto px-6 pt-20 relative z-10">
          {/* Side by Side Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            
            {/* Left Side - Content */}
            <div className="space-y-8 lg:pr-8">
              {/* Greeting */}
              <div className="space-y-4">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  isDarkMode ? 'glass-card' : 'glass-card-light'
                }`}>
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className={`text-sm font-mono ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    Hello, I'm
                  </span>
                </div>
                
                <h1 className={`text-5xl lg:text-5xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Prasad{' '}
                  <span className={`bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent animate-text-glow`}>
                    Sandaruwan
                  </span>
                </h1>
              </div>

              {/* Enhanced Typewriter with terminal styling */}
              <div className={`px-6 py-4 rounded-xl ${
                isDarkMode ? 'code-terminal' : 'code-terminal-light'
              }`}>
                <div className="flex items-center mb-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className={`ml-3 text-xs font-mono ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    role.js
                  </span>
                </div>
                <div className={`font-mono text-lg md:text-xl ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-700'}>$</span> {displayText}
                  <span className={`border-r-2 animate-typing-cursor ml-1 ${
                    isDarkMode ? 'border-emerald-400' : 'border-emerald-600'
                  }`}></span>
                </div>
              </div>

              {/* Description */}
              <p className={`text-lg md:text-sm leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                I craft digital experiences that blend creativity with functionality. 
                Passionate about building scalable solutions and exploring the frontiers of AI technology.
              </p>

              {/* Floating code snippet */}
              <div className={`p-4 rounded-xl ${
                isDarkMode 
                  ? 'glass-card neon-border' 
                  : 'glass-card-light neon-border-light'
              }`}>
                <div className={`font-mono text-sm animate-pulse ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                }`}>
                  <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
                    // Currently working on:
                  </span>
                  <br />
                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>const</span>{" "}
                  <span className={isDarkMode ? 'text-yellow-300' : 'text-amber-600'}>innovation</span> ={" "}
                  <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>
                    "Building the future"
                  </span>
                </div>
              </div>

              {/* Contact buttons */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    href: "tel:0701251898",
                    icon: Phone,
                    text: "Call Me",
                    gradient: isDarkMode ? "from-emerald-500 to-teal-600" : "from-emerald-400 to-teal-500",
                  },
                  {
                    href: "mailto:prasaddiv.contact@gmail.com",
                    icon: Mail,
                    text: "Email",
                    gradient: isDarkMode ? "from-blue-500 to-indigo-600" : "from-blue-400 to-indigo-500",
                  },
                  {
                    href: "https://github.com/prasadsandaruwan69",
                    icon: Github,
                    text: "GitHub",
                    gradient: isDarkMode ? "from-gray-700 to-black" : "from-gray-600 to-gray-800",
                  },
                  {
                    href: "https://linkedin.com/in/prasad-sandaruwan-69b88435b",
                    icon: Linkedin,
                    text: "LinkedIn",
                    gradient: isDarkMode ? "from-blue-600 to-blue-800" : "from-blue-500 to-blue-700",
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`group relative overflow-hidden p-6 rounded-xl bg-gradient-to-br ${item.gradient} hover-lift transition-all duration-700 transform hover:shadow-2xl ${
                      isDarkMode 
                        ? 'glass-card neon-border' 
                        : 'glass-card-light neon-border-light shadow-lg'
                    }`}
                  >
                    <div className="flex items-center space-x-3 relative z-10">
                      <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <item.icon size={20} />
                      </div>
                      <span className="font-semibold">{item.text}</span>
                    </div>

                    {/* Hover effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <HolographicProfile />
                
                {/* Status indicators */}
                <div className="flex justify-center mt-6 space-x-4">
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    isDarkMode ? 'glass-card' : 'glass-card-light'
                  }`}>
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className={`text-sm font-mono ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      Available
                    </span>
                  </div>
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                    isDarkMode ? 'glass-card' : 'glass-card-light'
                  }`}>
                    <Code size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                    <span className={`text-sm font-mono ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>Coding</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          <div className="flex justify-center mt-16">
            <button
              onClick={scrollToNext}
              className="relative group cursor-pointer transition-all duration-300 transform hover:scale-125"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow`} />
              <div className={`relative p-6 rounded-full ${
                isDarkMode 
                  ? 'glass-card neon-border' 
                  : 'glass-card-light neon-border-light'
              }`}>
                <ChevronDown
                  size={40}
                  className={`animate-bounce group-hover:text-white transition-colors duration-300 ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Particle system enhancement */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-pulse ${
                isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;