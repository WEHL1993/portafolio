import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, FileText, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
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
import GlosaryImg from '../assets/Glosary.png';
import HooksImg from '../assets/proyectos/Hooks.png';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const projects = t('projects.items', { returnObjects: true }) as Array<{
    id?: string;
    title: string;
    description: string;
    technologies: string[];
    repoUrl: string;
    demoUrl: string;
    hasGlossary?: boolean;
    glossaryUrl?: string;
    hasHooks?: boolean;
    hooksUrl?: string;
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

  React.useEffect(() => {
    try {
      const last = sessionStorage.getItem('lastProject');
      if (last) {
        const el = document.getElementById(`project-${last}`);
        if (el) {
          // small timeout to allow layout/animations
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
        }
        sessionStorage.removeItem('lastProject');
      }
    } catch {
      // ignore
    }
  }, []);

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
                id={`project-${project.id ?? index}`}
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                className="group"
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-red-700/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-red-900 to-red-700 overflow-hidden">
                    {project.id === 'hoja-de-vida' || project.title === "Hoja de vida" ? (
                      <img 
                        src={HojaDeVida} 
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    ) : project.id === 'formulario' || project.title === "Formulario" ? (
                      <img 
                        src={Formulario} 
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    ) : project.id === 'diseno-responsivo' || project.title === "Diseño Responsivo" || project.title === "Responsive Design" ? (
                      <img 
                        src={DisenoResponsivo} 
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    ) : project.hasHooks || project.id === 'hooks' ? (
                      <img 
                        src={HooksImg}
                        alt={project.title}
                        className="w-full h-full object-contain"
                      />
                    ) : project.id === 'glosario' || project.title === "Glosario de Programación" || project.title === "Programming Glossary" ? (
                      <img 
                        src={GlosaryImg} 
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
                    {project.title !== "Glosario de Programación" && project.title !== "Programming Glossary" && !project.hasHooks ? (
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
                    ) : (
                      <div className="flex items-center justify-center mb-4">
                        <div className="flex flex-col items-center text-gray-200">
                          {project.hasHooks ? (
                            <Search className="w-10 h-10 text-gray-200" />
                          ) : (
                            <BookOpen className="w-10 h-10 text-gray-200" />
                          )}
                          <span className="text-xs text-gray-400 mt-1">{project.hasHooks ? 'Hooks' : 'Glosario'}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Project Links */}
                    <div className="flex justify-center gap-3 pt-3 border-t border-gray-800">
                      {project.title !== "Glosario de Programación" && project.title !== "Programming Glossary" && !project.hasHooks && project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            try { sessionStorage.setItem('lastProject', project.id ?? String(index)); } catch { /* ignore */ }
                          }}
                          className="flex items-center gap-1 px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                        >
                          <Github size={16} className="inline-block" />
                          <span>{t('projects.viewRepository')}</span>
                        </a>
                      )}

                      {project.title !== "Glosario de Programación" && project.title !== "Programming Glossary" && !project.hasHooks && project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            try { sessionStorage.setItem('lastProject', project.id ?? String(index)); } catch { /* ignore */ }
                          }}
                          className="flex items-center gap-1 px-4 py-2 bg-red-700 text-white text-sm rounded hover:bg-red-600 transition-colors"
                        >
                          <ExternalLink size={16} className="inline-block" />
                          <span>{t('projects.viewDemo')}</span>
                        </a>
                      )}


                      {project.hasGlossary && (
                        <Link
                          to="/glosario"
                          onClick={() => { try { sessionStorage.setItem('lastProject', project.id ?? String(index)); } catch { /* ignore */ } }}
                          className="flex items-center gap-1 px-4 py-2 bg-green-700 text-white text-sm rounded hover:bg-green-600 transition-colors"
                        >
                          <FileText size={16} className="inline-block" />
                          <span>{t('projects.viewGlossary')}</span>
                        </Link>
                      )}

                      {project.hasHooks && (
                        <Link
                          to={project.hooksUrl || '/hooks'}
                          onClick={() => { try { sessionStorage.setItem('lastProject', project.id ?? String(index)); } catch { /* ignore */ } }}
                          className="flex items-center gap-1 px-4 py-2 bg-indigo-700 text-white text-sm rounded hover:bg-indigo-600 transition-colors"
                        >
                          <Search size={16} className="inline-block" />
                          <span>{t('projects.viewHooks')}</span>
                        </Link>
                      )}
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
