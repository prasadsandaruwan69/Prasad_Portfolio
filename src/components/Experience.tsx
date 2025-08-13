import React, { useEffect, useRef, useState } from 'react';
import { Building, Calendar, MapPin } from 'lucide-react';

interface ExperienceProps {
  isDarkMode: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      company: 'Onimta Information Technology',
      role: 'Software Developer',
      period: 'Currently Working',
      location: 'Maharagama',
      description: 'Currently developing sophisticated ERP systems and AI-powered applications.',
      technologies: ['Laravel', 'Vue.js', 'Tailwind CSS', 'React', 'AI Integration'],
      projects: [
        'ERP System - Comprehensive business management solution',
        'AI Face Recognition System - Real-time face detection with PASat API integration'
      ],
      current: true
    },
    {
      company: 'Serverclub (Pvt) Ltd',
      role: 'Full-Stack Developer',
      period: '2024/07 - 2025/02',
      location: 'Badulla',
      description: 'Specialized in hosting solutions and web application development.',
      technologies: ['Web Development', 'Hosting Management', 'cPanel'],
      projects: [
        'Cloudcom.lk - Cloud hosting platform',
        'Job Portal Application - Comprehensive recruitment solution'
      ],
      current: false
    },
    {
      company: 'Nula Tours',
      role: 'Web Developer',
      period: 'Project-based',
      location: 'Remote',
      description: 'Developed comprehensive tourism website with modern design and functionality.',
      technologies: ['React', 'Node.js', 'Tourism Industry Solutions'],
      projects: [
        'NulaTours.lk - Complete tourism booking platform'
      ],
      current: false
    },
    {
      company: 'PA Technology',
      role: 'Frontend Developer',
      period: 'Project-based',
      location: 'Remote',
      description: 'Focused on website design and development for tourism industry clients.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      projects: [
        'Tourism industry websites - Multiple client projects'
      ],
      current: false
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500"></div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative mb-12 ${
                  index % 2 === 0 ? 'md:ml-0' : 'md:ml-auto md:text-right'
                } md:w-5/12`}
              >
                {/* Timeline dot */}
                <div className={`absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full ${
                  index % 2 === 0 ? 'left-6 md:left-auto md:-right-2' : 'left-6 md:left-auto md:-left-2'
                } top-6 z-10 ring-4 ${
                  isDarkMode ? 'ring-gray-900' : 'ring-white'
                }`}></div>

                <div className={`ml-16 md:ml-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
                } rounded-xl p-6 border hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`} style={{ animationDelay: `${index * 200}ms` }}>
                  
                  {exp.current && (
                    <div className="inline-block bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      Currently Working
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <Building className={`${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} size={24} />
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{exp.company}</h3>
                  </div>

                  <h4 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  } mb-3`}>{exp.role}</h4>

                  <div className={`flex flex-wrap gap-4 mb-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-4 leading-relaxed`}>{exp.description}</p>

                  <div className="mb-4">
                    <h5 className={`text-sm font-semibold ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } mb-2`}>KEY PROJECTS:</h5>
                    <ul className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } space-y-1`}>
                      {exp.projects.map((project, projIndex) => (
                        <li key={projIndex} className="flex items-start gap-2">
                          <span className={`${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          } mt-1`}>•</span>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 bg-gradient-to-r ${
                          isDarkMode 
                            ? 'from-blue-500/20 to-purple-600/20 text-blue-400 border-blue-500/30' 
                            : 'from-blue-500/30 to-purple-600/30 text-blue-600 border-blue-500/50'
                        } rounded-full text-sm border`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;