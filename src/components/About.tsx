import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Code, Coffee } from 'lucide-react';

interface AboutProps {
  isDarkMode: boolean;
}

const About: React.FC<AboutProps> = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Code, label: 'Projects Completed', value: '50+' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
    { icon: GraduationCap, label: 'Technologies', value: '15+' },
  ];

  return (
    <section id="about" ref={sectionRef} className={`py-20 ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'
    }`}>
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className={`text-2xl font-semibold ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>My Journey</h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'opacity-90' : 'opacity-80'
              }`}>
                I'm a passionate software engineer currently pursuing Software Engineering at 
                Sri Lanka Institute of Advanced Technological Education (SLIATE). My journey 
                in technology has been driven by curiosity and a desire to create meaningful 
                solutions that make a difference.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'opacity-90' : 'opacity-80'
              }`}>
                With expertise spanning from modern web development to AI integration, 
                I specialize in building scalable applications using cutting-edge technologies. 
                My experience includes working with tourism industry projects, ERP systems, 
                and innovative AI-powered applications.
              </p>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'opacity-90' : 'opacity-80'
              }`}>
                Currently working at Onimta Information Technology, I'm involved in developing 
                sophisticated ERP systems and real-time AI face recognition solutions, 
                constantly pushing the boundaries of what's possible with technology.
              </p>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg"
                alt="Developer workspace"
                className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>

          {/* Education Section */}
          <div className={`${
            isDarkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'
          } rounded-2xl p-8 mb-16 border`}>
            <div className="flex items-center gap-4 mb-6">
              <GraduationCap className={`${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} size={32} />
              <h3 className="text-2xl font-semibold">Education</h3>
            </div>
            <div className={`bg-gradient-to-r ${
              isDarkMode ? 'from-blue-500/10 to-purple-600/10' : 'from-blue-500/20 to-purple-600/20'
            } rounded-lg p-6 border-l-4 ${
              isDarkMode ? 'border-blue-500' : 'border-blue-600'
            }`}>
              <h4 className={`text-xl font-semibold ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              } mb-2`}>
                Software Engineering
              </h4>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } mb-2`}>
                Sri Lanka Institute of Advanced Technological Education (SLIATE)
              </p>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Comprehensive program covering modern software development practices, 
                algorithms, system design, and emerging technologies.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-xl ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50 hover:border-blue-500/50'
                } border transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <stat.icon className={`mx-auto mb-4 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} size={48} />
                <div className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } mb-2`}>{stat.value}</div>
                <div className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;