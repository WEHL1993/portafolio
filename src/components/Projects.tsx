import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiTypescript, 
  SiNodedotjs, 
  SiReact, 
  SiExpress, 
  SiBootstrap, 
  SiTailwindcss, 
  SiSass 
} from 'react-icons/si';
import HojaDeVida from '../assets/proyectos/Hoja-de-Vida.png';
import Formulario from '../assets/proyectos/Formulario.png';
import DisenoResponsivo from '../assets/proyectos/Diseño-Responsivo.png';

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
    repoUrl: string;
    demoUrl: string;
  }>;

  const getIconColor = (skillName: string): string => {
    const colors: { [key: string]: string } = {
      'HTML5': '#E34F26',
      'CSS3': '#1572B6',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'NodeJS': '#339933',
      'React': '#61DAFB',
      'Express.js': '#000000',
      'Bootstrap': '#7952B3',
      'Tailwind CSS': '#06B6D4',
      'Sass': '#CC6699'
    };
    return colors[skillName] || '#FF6B6B';
  };

  const renderSkillIcon = (skillName: string) => {
    const iconColor = getIconColor(skillName);
    
    switch(skillName) {
      case 'HTML5':
        return <SiHtml5 className="w-8 h-8" style={{ color: iconColor }} />;
      case 'CSS3':
        return <SiCss3 className="w-8 h-8" style={{ color: iconColor }} />;
      case 'JavaScript':
        return <SiJavascript className="w-8 h-8" style={{ color: iconColor }} />;
      case 'TypeScript':
        return <SiTypescript className="w-8 h-8" style={{ color: iconColor }} />;
      case 'NodeJS':
        return <SiNodedotjs className="w-8 h-8" style={{ color: iconColor }} />;
      case 'React':
        return <SiReact className="w-8 h-8" style={{ color: iconColor }} />;
      case 'Express.js':
        return <SiExpress className="w-8 h-8" style={{ color: iconColor }} />;
      case 'Bootstrap':
        return <SiBootstrap className="w-8 h-8" style={{ color: iconColor }} />;
      case 'Tailwind CSS':
        return <SiTailwindcss className="w-8 h-8" style={{ color: iconColor }} />;
      case 'Sass':
        return <SiSass className="w-8 h-8" style={{ color: iconColor }} />;
      default:
        return <SiJavascript className="w-8 h-8 text-gray-400" />;
    }
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
                    {project.title === "Hoja de vida" ? (
                      <img 
                        src={HojaDeVida} 
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    ) : project.title === "Formulario" ? (
                      <img 
                        src={Formulario} 
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    ) : project.title === "Diseño Responsivo" ? (
                      <img 
                        src={DisenoResponsivo} 
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-20">
                        {project.title.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
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
                    <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.5 + techIndex * 0.1 }}
                          className="flex flex-col items-center"
                          title={tech}
                        >
                          {renderSkillIcon(tech)}
                          <span className="text-xs text-gray-400 mt-1">{tech}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Project Links */}
                    <div className="flex justify-center gap-3 pt-3 border-t border-gray-800">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                      >
                        <Github size={16} className="inline-block" />
                        <span>{t('projects.viewRepository')}</span>
                      </a>
                      
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-4 py-2 bg-red-700 text-white text-sm rounded hover:bg-red-600 transition-colors"
                      >
                        <ExternalLink size={16} className="inline-block" />
                        <span>{t('projects.viewDemo')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
