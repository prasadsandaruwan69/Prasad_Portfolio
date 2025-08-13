import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`${
      isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } border-t py-12`}>
      <div className="container mx-auto px-6">
        <div className="text-center">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            Prasad Sandaruwan
          </button>

          {/* Quote */}
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } mb-6 max-w-2xl mx-auto`}>
            "Building the future with code, one project at a time."
          </p>

          {/* Made with love */}
          <div className={`flex items-center justify-center gap-2 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          } mb-6`}>
            <span>Made with</span>
            <Heart className="text-red-500 animate-pulse" size={16} />
            <span>and lots of</span>
            <Coffee className="text-yellow-600" size={16} />
            <span>using</span>
            <Code className={`${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} size={16} />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const element = document.querySelector(`#${item.toLowerCase()}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-600'
                } transition-colors duration-300`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className={`border-t ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          } pt-6`}>
            <p className={`${
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            } text-sm`}>
              © {new Date().getFullYear()} Prasad Sandaruwan. All rights reserved.
            </p>
            <p className={`${
              isDarkMode ? 'text-gray-600' : 'text-gray-500'
            } text-xs mt-2`}>
              Software Engineer | Full-Stack Developer | AI Enthusiast
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;