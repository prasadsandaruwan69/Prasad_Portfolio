import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, Wrench, Brain, Globe, Server } from 'lucide-react';

interface SkillsProps {
  isDarkMode: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimatedBars(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Globe,
      color: 'from-blue-500 to-cyan-400',
      skills: [
        { name: 'React.js', level: 90, experience: '2+ years' },
        { name: 'Vue.js', level: 85, experience: '1+ year' },
        { name: 'Tailwind CSS', level: 88, experience: '2+ years' },
        { name: 'JavaScript/TypeScript', level: 92, experience: '3+ years' }
      ]
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-400',
      skills: [
        { name: 'Laravel', level: 85, experience: '1+ year' },
        { name: 'Node.js', level: 80, experience: '1+ year' },
        { name: 'REST APIs', level: 88, experience: '2+ years' },
        { name: 'MySQL', level: 82, experience: '2+ years' }
      ]
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'from-purple-500 to-pink-400',
      skills: [
        { name: 'Face Recognition', level: 45, experience: 'Current Project' },
        { name: 'AI Integration', level: 60, experience: '6+ months' },
        { name: 'PASat API', level: 75, experience: 'Current Project' },
        { name: 'Real-time Processing', level: 78, experience: '6+ months' }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: Wrench,
      color: 'from-orange-500 to-red-400',
      skills: [
        { name: 'Git/GitHub', level: 90, experience: '3+ years' },
        { name: 'cPanel Management', level: 85, experience: '1+ year' },
        { name: 'Hosting Management', level: 82, experience: '1+ year' },
        { name: 'Cloud Deployment', level: 75, experience: '6+ months' }
      ]
    }
  ];

  const technologies = [
    'React.js', 'Vue.js', 'Laravel','Next.js','Tailwind CSS', 'Node.js', 'MySQL',
    'JavaScript', 'TypeScript', 'REST APIs', 'Git', 'AI Integration',
    'Face Recognition', 'Real-time Systems', 'Cloud Computing', 'ERP Systems'
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>

          {/* Skill Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className={`${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
                } rounded-2xl p-8 border hover:border-blue-500/50 transition-all duration-500 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                    <category.icon className="text-white" size={28} />
                  </div>
                  <h3 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } font-medium`}>{skill.name}</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-600'
                          }`}>{skill.experience}</span>
                          <span className={`${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          } font-semibold`}>{skill.level}%</span>
                        </div>
                      </div>
                      <div className={`w-full ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      } rounded-full h-2 overflow-hidden`}>
                        <div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out ${
                            animatedBars ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{
                            width: animatedBars ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technology Tags */}
          <div className="text-center">
            <h3 className={`text-2xl font-bold ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-8`}>Technologies I Work With</h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-6 py-3 bg-gradient-to-r ${
                    isDarkMode 
                      ? 'from-gray-800 to-gray-700 text-gray-300 border-gray-600/50 hover:text-blue-400' 
                      : 'from-gray-100 to-gray-200 text-gray-700 border-gray-300/50 hover:text-blue-600'
                  } rounded-full border hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-default ${
                    isVisible ? 'animate-fade-in' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } mb-6 max-w-2xl mx-auto`}>
              Always learning and staying up-to-date with the latest technologies. 
              Let's build something amazing together!
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Code size={24} />
              <span>Let's Collaborate</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;