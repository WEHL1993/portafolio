import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const projects = t('projects.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    technologies: string[];
  }>;

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'HTML5': 'bg-orange-500 text-white',
      'CSS3': 'bg-blue-500 text-white',
      'JavaScript': 'bg-yellow-500 text-black',
      'Bootstrap': 'bg-purple-600 text-white',
      'Sass': 'bg-pink-500 text-white',
      'React': 'bg-cyan-500 text-white',
      'TypeScript': 'bg-blue-600 text-white'
    };
    return colors[tech] || 'bg-gray-500 text-white';
  };

  return (
    <section id="projects" className="w-full py-20 bg-gradient-to-br from-black to-red-950 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            {t('projects.title')}
          </motion.h2>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                className="group"
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-red-700/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-red-900 to-red-700 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-20">
                      {project.title.charAt(0)}
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
                        >
                          <Github size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.5 + techIndex * 0.1 }}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getTechColor(tech)}`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 border border-red-500/50"
            >
              Ver más proyectos
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
