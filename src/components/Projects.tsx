import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Zap, Globe, Bot, Users, Eye, Server } from 'lucide-react';
import Cloudcom from '../assets/image/cloudcom.png';
import Crm from '../assets/image/crm.png';
import JobFortal from '../assets/image/jobit.png';

interface ProjectsProps {
  isDarkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isDarkMode }) => {
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

  const projects = [
    {
      title: 'AI Face Recognition System',
      description: 'Real-time face detection and recognition system integrated with PASat API for advanced facial analysis and identification.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      technologies: ['React', 'AI Integration', 'Real-time Processing', 'PASat API'],
      features: ['Real-time face detection', 'Advanced recognition algorithms', 'API integration', 'Live video processing'],
      icon: Eye,
      category: 'AI & Machine Learning'
    },
    {
      title: 'ERP System',
      description: 'Comprehensive Enterprise Resource Planning system built with modern technologies for efficient business management.',
      image: Crm,
      technologies: ['Laravel', 'Vue.js', 'Tailwind CSS', 'MySQL'],
      features: ['Business process management', 'Real-time analytics', 'Multi-user support', 'Responsive design'],
      icon: Server,
      category: 'Web Application'
    },
    {
      title: 'Cloudcom.lk',
      description: 'Cloud hosting platform providing scalable hosting solutions with advanced management features and user-friendly interface.',
      image: Cloudcom,
      technologies: ['Web Development', 'Cloud Technologies', 'cPanel Integration'],
      features: ['Cloud hosting management', 'Scalable infrastructure', 'User dashboard', 'Automated deployments'],
      icon: Globe,
      category: 'Cloud Platform'
    },
    {
      title: 'Job Portal Application',
      description: 'Comprehensive recruitment platform connecting employers with job seekers through advanced matching algorithms.',
      image: JobFortal,
      technologies: ['React', 'Node.js', 'Database Management', 'REST APIs'],
      features: ['Job matching system', 'Resume builder', 'Application tracking', 'Employer dashboard'],
      icon: Users,
      category: 'Web Application'
    },
    {
      title: 'NulaTours.lk',
      description: 'Tourism booking platform featuring tour packages, hotel reservations, and travel planning tools for Sri Lankan tourism.',
      image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg',
      technologies: ['React', 'Tourism APIs', 'Payment Integration', 'Responsive Design'],
      features: ['Tour booking system', 'Hotel reservations', 'Travel planning', 'Payment processing'],
      icon: Globe,
      category: 'Tourism & Travel'
    },
    {
      title: 'AI Chat Bot',
      description: 'Intelligent chatbot system with natural language processing capabilities for automated customer service and support.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
      technologies: ['AI/ML', 'Natural Language Processing', 'React', 'API Integration'],
      features: ['Natural language understanding', 'Context awareness', 'Multi-language support', 'Learning capabilities'],
      icon: Bot,
      category: 'AI & Machine Learning'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className={`py-20 ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'
    }`}>
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
                } rounded-2xl overflow-hidden border hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDarkMode ? 'from-gray-900/80' : 'from-white/80'
                  } via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                      <project.icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`${
                      isDarkMode ? 'bg-gray-900/80 text-blue-400' : 'bg-white/80 text-blue-600'
                    } px-3 py-1 rounded-full text-xs font-semibold`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
                  } mb-3 transition-colors duration-300`}>
                    {project.title}
                  </h3>
                  
                  <p className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  } mb-4 leading-relaxed`}>
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className={`text-sm font-semibold ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } mb-2`}>KEY FEATURES:</h4>
                    <ul className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } space-y-1`}>
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Zap className={`${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`} size={12} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-3 py-1 bg-gradient-to-r ${
                            isDarkMode 
                              ? 'from-blue-500/20 to-purple-600/20 text-blue-400 border-blue-500/30' 
                              : 'from-blue-500/30 to-purple-600/30 text-blue-600 border-blue-500/50'
                          } rounded-full text-xs border`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
                      <ExternalLink size={16} />
                      <span className="text-sm">View Live</span>
                    </button>
                    <button className={`flex items-center gap-2 ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    } px-4 py-2 rounded-lg transition-all duration-300`}>
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/prasadsandaruwan69"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white' 
                  : 'from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-900'
              } px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105`}
            >
              <Github size={24} />
              <span>View More Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;