import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { 
  SiDotnet, 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiTypescript, 
  SiNodedotjs, 
  SiReact, 
  SiExpress, 
  SiBootstrap, 
  SiTailwindcss, 
  SiSass,
  SiMysql,
  SiOracle,
  SiMongodb
} from 'react-icons/si';
import { Database } from 'lucide-react';

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);

  const skills = t('skills.items', { returnObjects: true }) as Array<{
    name: string;
    description: string;
  }>;



  const getIconColor = (skillName: string): string => {
    const colors: { [key: string]: string } = {
      'C#': '#512BD4',
      'HTML5': '#E34F26',
      'CSS3': '#1572B6',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'Node.js': '#339933',
      'React': '#61DAFB',
      'Express.js': '#000000',
      'Bootstrap': '#7952B3',
      'Tailwind CSS': '#06B6D4',
      'Sass': '#CC6699',
      'SQL Server': '#CC2927',
      'MySQL': '#4479A1',
      'Oracle': '#F80000',
      'MongoDB': '#47A248'
    };
    return colors[skillName] || '#FF6B6B';
  };

  const renderSkillIcon = (skillName: string) => {
    const iconColor = getIconColor(skillName);
    
    switch(skillName) {
      case 'C#':
        return <SiDotnet className="w-12 h-12" style={{ color: iconColor }} />;
      case 'HTML5':
        return <SiHtml5 className="w-12 h-12" style={{ color: iconColor }} />;
      case 'CSS3':
        return <SiCss3 className="w-12 h-12" style={{ color: iconColor }} />;
      case 'JavaScript':
        return <SiJavascript className="w-12 h-12" style={{ color: iconColor }} />;
      case 'TypeScript':
        return <SiTypescript className="w-12 h-12" style={{ color: iconColor }} />;
      case 'Node.js':
        return <SiNodedotjs className="w-12 h-12" style={{ color: iconColor }} />;
      case 'React':
        return <SiReact className="w-12 h-12" style={{ color: iconColor }} />;
      case 'Express.js':
        return <SiExpress className="w-12 h-12" style={{ color: iconColor }} />;
      case 'Bootstrap':
        return <SiBootstrap className="w-12 h-12" style={{ color: iconColor }} />;
      case 'Tailwind CSS':
        return <SiTailwindcss className="w-12 h-12" style={{ color: iconColor }} />;
      case 'Sass':
        return <SiSass className="w-12 h-12" style={{ color: iconColor }} />;
      case 'SQL Server':
        return <Database className="w-12 h-12" style={{ color: iconColor }} />;
      case 'MySQL':
        return <SiMysql className="w-12 h-12" style={{ color: iconColor }} />;
      case 'Oracle':
        return <SiOracle className="w-12 h-12" style={{ color: iconColor }} />;
      case 'MongoDB':
        return <SiMongodb className="w-12 h-12" style={{ color: iconColor }} />;
      default:
        return <span className="text-4xl">🔧</span>;
    }
  };

  const toggleSkill = (index: number) => {
    setExpandedSkill(expandedSkill === index ? null : index);
  };

  return (
    <section id="skills" className="w-full py-20 bg-gradient-to-br from-gray-900 to-black overflow-x-hidden">
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
            {t('skills.title')}
          </motion.h2>

          {/* Skills Grid */}
          <div className="w-full space-y-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="bg-gray-800 border border-red-700/30 rounded-lg overflow-hidden hover:border-red-500/50 transition-all duration-300"
              >
                {/* Skill Header */}
                <motion.div
                  className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-700/50 transition-colors"
                  onClick={() => toggleSkill(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl">
                      {renderSkillIcon(skill.name)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                      <p className="text-red-400 text-sm">Click para expandir</p>
                    </div>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: expandedSkill === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-red-400"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.div>

                {/* Skill Description */}
                <AnimatePresence>
                  {expandedSkill === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-gray-700">
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-gray-300 leading-relaxed"
                        >
                          {skill.description}
                        </motion.p>

                        {/* Skill Level Indicator */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="mt-4 flex items-center space-x-2"
                        >
                          <span className="text-sm text-red-400 font-medium">Nivel:</span>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className={`w-3 h-3 rounded-full ${
                                  i < 4 ? 'bg-red-500' : 'bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-red-900/20 to-red-700/20 border border-red-700/30 rounded-lg p-8 w-full">
              <h3 className="text-2xl font-bold text-white mb-4">Stack Tecnológico</h3>
              <p className="text-gray-300 leading-relaxed">
                Dominio de tecnologías front-end modernas con enfoque en crear experiencias 
                de usuario excepcionales y código limpio y mantenible.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
