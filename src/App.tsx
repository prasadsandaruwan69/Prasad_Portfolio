import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ChatBot from "./components/Chatbot";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.classList.toggle("light", !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        } flex items-center  justify-center transition-colors duration-500`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/20"></div>
          </div>
          <h2
            className={`${
              isDarkMode ? "text-white" : "text-gray-900"
            } text-xl font-semibold transition-colors duration-500`}
          >
            Loading Portfolio...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`theme-transition ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } overflow-x-hidden transition-colors duration-500 relative`}
    >
      <AnimatedBackground isDarkMode={isDarkMode} />

      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <Hero isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Experience isDarkMode={isDarkMode} />
      <Projects isDarkMode={isDarkMode} />
      <Skills isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
       <div className="fixed bottom-4 right-4 z-50">
      <ChatBot isDarkMode={isDarkMode} />
    </div>
    </div>
  );
}

export default App;
