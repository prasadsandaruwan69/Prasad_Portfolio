import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Code, Sparkles } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "experience",
        "projects",
        "skills",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes glow-pulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.6);
          }
        }
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in-scale {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out;
        }
        .glass-navbar {
          background: ${isDarkMode
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.8)"};
          backdrop-filter: blur(20px);
          border-bottom: 1px solid
            ${isDarkMode
              ? "rgba(16, 185, 129, 0.2)"
              : "rgba(59, 130, 246, 0.2)"};
        }
        .nav-item {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-item::before {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #10b981, #3b82f6);
          transition: width 0.3s ease;
        }
        .nav-item:hover::before,
        .nav-item.active::before {
          width: 100%;
        }
      `}</style>

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "glass-navbar shadow-2xl animate-slide-down"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Code className="text-emerald-400 animate-pulse" size={28} />
                <Sparkles
                  className="absolute -top-1 -right-1 text-blue-400 animate-bounce"
                  size={12}
                />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:animate-glow-pulse">
                Prasad Sandaruwan
              </div>
            </div>

            {/* Enhanced Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`nav-item px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? isDarkMode
                        ? "text-emerald-400 bg-emerald-400/10 active"
                        : "text-blue-600 bg-blue-600/10 active"
                      : isDarkMode
                      ? "text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/5"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-600/5"
                  } transform hover:scale-105`}
                >
                  <span className="hidden lg:inline mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}

              {/* Enhanced Theme Toggle */}
              {onToggleTheme && (
                <div className="ml-4 relative">
                  <button
                    onClick={onToggleTheme}
                    className={`relative p-3 rounded-full border-2 transition-all duration-500 transform hover:scale-110 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-yellow-400 border-emerald-400/30 hover:border-emerald-400"
                        : "bg-white hover:bg-gray-50 text-orange-500 border-blue-600/30 hover:border-blue-600"
                    } shadow-lg hover:shadow-xl`}
                    aria-label="Toggle theme"
                    title={
                      isDarkMode
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                  >
                    <div className="relative w-6 h-6">
                      <Sun
                        className={`absolute inset-0 transition-all duration-300 ${
                          isDarkMode
                            ? "opacity-0 rotate-90"
                            : "opacity-100 rotate-0"
                        }`}
                        size={24}
                      />
                      <Moon
                        className={`absolute inset-0 transition-all duration-300 ${
                          isDarkMode
                            ? "opacity-100 rotate-0"
                            : "opacity-0 -rotate-90"
                        }`}
                        size={24}
                      />
                    </div>
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                        isDarkMode ? "bg-yellow-400/20" : "bg-orange-500/20"
                      } ${
                        scrolled ? "opacity-100" : "opacity-0"
                      } animate-pulse`}
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="flex items-center space-x-3 md:hidden">
              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className={`p-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-800 text-yellow-400 border border-gray-700"
                      : "bg-white text-orange-500 border border-gray-200"
                  } transition-all duration-300 shadow-lg`}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              )}

              <button
                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  isDarkMode
                    ? "text-emerald-400 bg-gray-800/50 border border-emerald-400/30"
                    : "text-blue-600 bg-white/50 border border-blue-600/30"
                } shadow-lg`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-0 rotate-45"
                        : "opacity-100 rotate-0"
                    }`}
                    size={24}
                  />
                  <X
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen
                        ? "opacity-100 rotate-0"
                        : "opacity-0 -rotate-45"
                    }`}
                    size={24}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMenuOpen && (
            <div
              className={`md:hidden mt-6 animate-fade-in-scale ${
                isDarkMode
                  ? "bg-gray-900/95 border-gray-700/50"
                  : "bg-white/95 border-gray-200/50"
              } backdrop-blur-xl rounded-2xl border p-4 shadow-2xl`}
            >
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeSection === item.href.substring(1)
                        ? isDarkMode
                          ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/30"
                          : "text-blue-600 bg-blue-600/10 border border-blue-600/30"
                        : isDarkMode
                        ? "text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/5"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-600/5"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    {activeSection === item.href.substring(1) && (
                      <div
                        className={`ml-auto w-2 h-2 rounded-full ${
                          isDarkMode ? "bg-emerald-400" : "bg-blue-600"
                        } animate-pulse`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
