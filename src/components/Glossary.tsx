import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// X button removed: no longer used
import useSmoothScroll from '../hooks/useSmoothScroll';

interface GlossaryItem {
  term: string;
  definition: string;
  letter: string;
}

interface GlossaryByLetter {
  [key: string]: GlossaryItem[];
}

const Glossary: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [glossaryData, setGlossaryData] = useState<GlossaryByLetter>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [letters, setLetters] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<GlossaryItem[]>([]);
  
  // Inicializar scroll suave
  useSmoothScroll();
  
  // No X button anymore: always navigate to projects on back
  const [isExiting] = useState(false);

  // Función para filtrar los elementos según la letra seleccionada
  const updateFilteredItems = (data: GlossaryByLetter, letter: string) => {
    if (letter === 'all') {
      // Si es 'all', mostrar todos los términos
      const allItems: GlossaryItem[] = [];
      Object.values(data).forEach(items => {
        allItems.push(...items);
      });
      setFilteredItems(allItems.sort((a, b) => a.term.localeCompare(b.term)));
    } else {
      // Si es una letra específica, mostrar solo esos términos
      setFilteredItems(data[letter] || []);
    }
  };

  // Efecto para cargar los datos del glosario
  useEffect(() => {
    // Interceptar popstate (botón atrás) y redirigir siempre a /#projects
    const onPopState = () => {
      try {
        window.history.replaceState(null, '', '/#projects');
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } catch {
        navigate('/#projects', { replace: true });
      }
    };

    window.addEventListener('popstate', onPopState);
    const fetchGlossary = async () => {
      try {
        const response = await fetch('/glosario.txt');
        const text = await response.text();
        
        // Procesar el texto del glosario
        const lines = text.split('\n');
        const glossaryByLetter: GlossaryByLetter = {};
        // Añadir sección para caracteres especiales
        glossaryByLetter['#'] = [];
        
        let currentLetter = '';
        let currentTerm = '';
        let currentDefinition = '';
        
        for (let i = 0; i < lines.length; i++) {
          // No usar solo trim() porque queremos detectar líneas vacías para preservar párrafos
          const rawLine = lines[i].replace(/\r?$/, '');
          const line = rawLine.trim();

          // Detectar secciones de letras (## A, ## B, etc.)
          if (line.startsWith('## ')) {
            // Antes de cambiar de sección, guardar el término pendiente (si existe)
            if (currentTerm && currentDefinition && currentLetter) {
              glossaryByLetter[currentLetter] = glossaryByLetter[currentLetter] || [];
              glossaryByLetter[currentLetter].push({
                term: currentTerm,
                definition: currentDefinition.trim(),
                letter: currentLetter
              });
              currentTerm = '';
              currentDefinition = '';
            }

            currentLetter = line.substring(3).trim();
            glossaryByLetter[currentLetter] = glossaryByLetter[currentLetter] || [];
          } 
          // Detectar términos (empiezan con **)
          else if (line.startsWith('**')) {
            // Si ya había un término anterior, guardarlo
            if (currentTerm && currentDefinition) {
              glossaryByLetter[currentLetter].push({
                term: currentTerm,
                definition: currentDefinition.trim(),
                letter: currentLetter
              });
            }
            
            // Extraer el nuevo término
            currentTerm = line.replace(/^\*\*|\*\*$/g, '');
            currentDefinition = '';
          } 
          // Agregar líneas a la definición actual
          else if (currentTerm) {
            if (line === '') {
              // línea vacía: mantener separación de párrafos
              currentDefinition += currentDefinition ? '\n\n' : '\n\n';
            } else {
              // línea con texto: concatenar, respetando espacios
              currentDefinition += currentDefinition ? ' ' + line : line;
            }
          }
        }
        
        // No olvidar guardar el último término
        if (currentTerm && currentDefinition && currentLetter) {
          glossaryByLetter[currentLetter].push({
            term: currentTerm,
            definition: currentDefinition.trim(),
            letter: currentLetter
          });
        }
        
        setGlossaryData(glossaryByLetter);
        
        // Preparar las letras para el filtro, con '#' al principio y 'all' que no es parte del glossary
        const sortedLetters = Object.keys(glossaryByLetter).filter(letter => letter !== '#').sort();
        setLetters(['#', ...sortedLetters]);
        
        // Actualizar el filtro
        updateFilteredItems(glossaryByLetter, selectedLetter);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching glossary data:', error);
        setIsLoading(false);
      }
    };
    
    fetchGlossary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  
  // Efecto para actualizar los elementos filtrados cuando cambia la letra seleccionada
  useEffect(() => {
    if (!isLoading) {
      updateFilteredItems(glossaryData, selectedLetter);
    }
  }, [selectedLetter, glossaryData, isLoading]);

  // Forzar al cargar la página que se muestre el encabezado del glosario
  // (evita que en despliegues como Netlify la vista quede posicionada en una letra)
  useEffect(() => {
    // Ejecutar después de un pequeño retardo para asegurar que el DOM esté listo
    const t = setTimeout(() => {
      setSelectedLetter('all');
      const el = document.getElementById('glossary');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);

    const onPopState = () => {
      try {
        window.history.replaceState(null, '', '/#projects');
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } catch {
        navigate('/#projects', { replace: true });
      }
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      clearTimeout(t);
      window.removeEventListener('popstate', onPopState);
    };
    // Queremos que esto sólo corra al montar
  }, [navigate]);
  
  // Manejar clic en una letra
  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    
    // Si no es "all", hacer scroll suave al ancla de la letra
    if (letter !== 'all') {
      const element = document.getElementById(`letter-${letter}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si es "all", scroll al inicio del glosario
      const glossaryElement = document.getElementById('glossary');
      if (glossaryElement) {
        glossaryElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <motion.section 
      id="glossary" 
      className="w-full py-20 bg-gradient-to-br from-black to-red-950 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 max-w-5xl relative">
        {/* Botón X eliminado - cierre ahora se gestiona con popstate/back button */}
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 text-white"
        >
          {t('glossary.title')}
        </motion.h1>
        
        {/* Filtro alfabético */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 sticky top-20 z-10 bg-black/80 backdrop-blur-md p-4 rounded-lg"
        >
          {/* Botón para mostrar todos */}
          <button
            onClick={() => handleLetterClick('all')}
            className={`px-4 h-8 md:h-10 flex items-center justify-center rounded-md ${
              selectedLetter === 'all'
                ? 'bg-red-600 text-white font-bold'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            } transition-colors`}
          >
            {t('glossary.all')}
          </button>
          
          {/* Botones para cada letra */}
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full ${
                selectedLetter === letter
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              } transition-colors`}
            >
              {letter}
            </button>
          ))}
        </motion.div>
        
        {/* Contenido del glosario */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {selectedLetter === 'all' ? (
              // Mostrar todas las letras cuando se selecciona "all"
              letters.map((letter) => (
                <motion.div
                  key={letter}
                  id={`letter-${letter}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-red-500 mb-4 border-b border-red-500/30 pb-2">
                    {letter}
                  </h2>
                  <div className="grid gap-6">
                    {glossaryData[letter]?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * (index % 5) }} // Limitar el delay para no esperar demasiado
                        className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20 hover:border-red-500/40 transition-all duration-300"
                      >
                        <h3 className="text-xl text-white font-semibold mb-2">{item.term}</h3>
                        {/* Dividir la definición en párrafos por separadores '\n\n' y renderizar cada párrafo por separado */}
                        {item.definition.split(/\n{2,}/).map((para, pidx) => (
                          <p key={pidx} className="text-gray-300 leading-relaxed">{para.trim()}</p>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              // Mostrar solo la letra seleccionada
              <motion.div
                key={selectedLetter}
                id={`letter-${selectedLetter}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-red-500 mb-4 border-b border-red-500/30 pb-2">
                  {selectedLetter}
                </h2>
                
                {filteredItems.length === 0 ? (
                  <div className="text-center p-8 text-gray-400">
                    {t('glossary.noResults')}
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20 hover:border-red-500/40 transition-all duration-300"
                      >
                        <h3 className="text-xl text-white font-semibold mb-2">{item.term}</h3>
                        {/* Dividir la definición en párrafos por separadores '\n\n' y renderizar cada párrafo por separado */}
                        {item.definition.split(/\n{2,}/).map((para, pidx) => (
                          <p key={pidx} className="text-gray-300 leading-relaxed">{para.trim()}</p>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Glossary;
