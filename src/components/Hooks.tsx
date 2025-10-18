import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hooks: React.FC = () => {
  const navigate = useNavigate();
  const [isExiting] = useState(false);

  // Forzar scroll al encabezado Hooks al montar
  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById('hooks');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);

    // Intercept popstate (botón atrás) para dirigir siempre a /#projects
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
  }, [navigate]);

  return (
    <motion.section
      id="hooks"
      className="w-full py-20 bg-gradient-to-br from-black to-red-950 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
  {/* Botón X eliminado - cierre manejado por botón atrás */}
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">Hooks</h1>

        <div className="space-y-6">
          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">¿Qué son los Hooks en React?</h2>
            <p className="text-gray-300 leading-relaxed">
              Los Hooks son una característica introducida en React 16.8 que permite a los desarrolladores usar estado y otras funcionalidades de React sin escribir clases.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Antes de los Hooks, si querías manejar estado o el ciclo de vida (componentDidMount, etc.), debías usar componentes de clase, lo que hacía el código más extenso y menos reutilizable.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Los Hooks solucionan eso permitiendo que los componentes funcionales sean más potentes y expresivos.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Además, hacen que el código sea más legible, modular y fácil de probar.
            </p>
            <p className="text-gray-300 leading-relaxed">
              En otras palabras, los Hooks son funciones especiales que te dejan "engancharte" (de ahí el nombre "hooks") a las características internas de React.
            </p>
          </div>

          
          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">1. useState</h2>

            <h3 className="text-white font-medium mt-2">Firma:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-green-300 overflow-auto">{`const [state, setState] = useState(valorInicial);`}</pre>

            <h3 className="text-white font-medium mt-4">Definición:</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">useState</strong> permite agregar una variable de estado local a un componente funcional.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Cada vez que se actualiza el valor mediante <code className="bg-gray-800 px-1 rounded">setState</code>, React vuelve a renderizar el componente con el nuevo estado.
            </p>
            <p className="text-gray-300 leading-relaxed">
              El valor inicial solo se usa la primera vez que se renderiza el componente.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Internamente, React asocia cada estado con un índice del orden en que se llama <code className="bg-gray-800 px-1 rounded">useState</code>, por eso es importante no llamarlo dentro de condiciones o bucles (mantener el orden de los Hooks).
            </p>

            <h3 className="text-white font-medium mt-4">Cuándo usar:</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>Cuando necesites almacenar información que cambie durante la vida del componente.</li>
              <li>Ejemplos típicos: contadores, valores de formularios, mostrar/ocultar secciones, control de pestañas, etc.</li>
            </ul>

            <h3 className="text-white font-medium mt-4">Ejemplo:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-gray-100 overflow-auto">{`import React, { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>Sumar</button>
    </div>
  );
}`}</pre>
          </div>

          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">2. useEffect</h2>

            <h3 className="text-white font-medium mt-2">Firma:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-green-300 overflow-auto">{`useEffect(() => {
  // código
  return () => { /* limpieza opcional */ };
}, [dependencias]);`}</pre>

            <h3 className="text-white font-medium mt-4">Definición:</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">useEffect</strong> sirve para manejar efectos secundarios dentro de los componentes funcionales.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Un efecto secundario (side effect) es cualquier acción que ocurre fuera del flujo normal del renderizado, como:
            </p>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>Llamadas a APIs (fetch, axios).</li>
              <li>Manipulación directa del DOM.</li>
              <li>Suscribirse a eventos o temporizadores.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              El segundo parámetro (<code className="bg-gray-800 px-1 rounded">[dependencias]</code>) controla cuándo se ejecuta:
            </p>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>Si está vacío (<code className="bg-gray-800 px-1 rounded">[]</code>), se ejecuta solo una vez (al montar el componente).</li>
              <li>Si no se pasa, se ejecuta en cada render.</li>
              <li>Si contiene variables, se ejecuta cuando cambian esas dependencias.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              El retorno opcional (<code className="bg-gray-800 px-1 rounded">() =&gt; { /* ... */ }</code>) se usa para limpiar el efecto (por ejemplo, eliminar un evento o detener un temporizador).
            </p>

            <h3 className="text-white font-medium mt-4">Cuándo usar:</h3>
            <p className="text-gray-300 leading-relaxed">Cuando necesites sincronizar el componente con algo externo al renderizado (API, localStorage, suscripción, etc.).</p>

            <h3 className="text-white font-medium mt-4">Ejemplo:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-gray-100 overflow-auto">{`import React, { useEffect, useState } from 'react';

function Usuario() {
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    fetch('https://api.example.com/user')
      .then(res => res.json())
      .then(data => setUsuario(data.nombre));
  }, []);

  return <p>Bienvenido, {usuario}</p>;
}`}</pre>
          </div>

          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">3. useMemo</h2>

            <h3 className="text-white font-medium mt-2">Firma:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-green-300 overflow-auto">{`const valorMemoizado = useMemo(() => funcionCostosa(), [dependencias]);`}</pre>

            <h3 className="text-white font-medium mt-4">Definición:</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">useMemo</strong> sirve para optimizar el rendimiento evitando cálculos innecesarios.
            </p>
            <p className="text-gray-300 leading-relaxed">
              React recalcula funciones costosas en cada render, incluso si las dependencias no han cambiado.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Con <code className="bg-gray-800 px-1 rounded">useMemo</code>, el resultado de la función se almacena en caché (memoizado) y solo se recalcula cuando cambian las dependencias.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Esto es muy útil cuando un cálculo es pesado o cuando se pasa como prop a componentes hijos que podrían renderizarse sin necesidad.
            </p>

            <h3 className="text-white font-medium mt-4">Cuándo usar:</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>Cuando hay operaciones matemáticas o filtrados complejos.</li>
              <li>Cuando los resultados no deben recalcularse en cada render.</li>
              <li>Evita uso innecesario del CPU.</li>
            </ul>

            <h3 className="text-white font-medium mt-4">Ejemplo:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-gray-100 overflow-auto">{`import React, { useMemo, useState } from 'react';

function CalculoPesado({ numero }) {
  const resultado = useMemo(() => {
    console.log('Ejecutando cálculo pesado...');
    return numero * 1000;
  }, [numero]);

  return <p>Resultado: {resultado}</p>;
}`}</pre>
          </div>

          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">4. useRef</h2>

            <h3 className="text-white font-medium mt-2">Firma:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-green-300 overflow-auto">{`const ref = useRef(valorInicial);`}</pre>

            <h3 className="text-white font-medium mt-4">Definición:</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">useRef</strong> devuelve un objeto con una propiedad <code className="bg-gray-800 px-1 rounded">.current</code> que no cambia entre renderizados.
            </p>
            <p className="text-gray-300 leading-relaxed">
              A diferencia de <code className="bg-gray-800 px-1 rounded">useState</code>, modificar <code className="bg-gray-800 px-1 rounded">ref.current</code> no provoca un re-renderizado.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Se utiliza para referenciar elementos del DOM directamente o guardar valores persistentes (como un contador interno, temporizador, etc.).
            </p>

            <h3 className="text-white font-medium mt-4">Cuándo usar:</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>Para acceder o manipular elementos del DOM.</li>
              <li>Para guardar valores entre renders sin causar re-render.</li>
              <li>Para almacenar estados temporales como tiempo transcurrido, posición del scroll, etc.</li>
            </ul>

            <h3 className="text-white font-medium mt-4">Ejemplo:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-gray-100 overflow-auto">{`import React, { useRef } from 'react';

function InputEnfocado() {
  const inputRef = useRef(null);

  const enfocar = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Escribe algo..." />
      <button onClick={enfocar}>Enfocar</button>
    </div>
  );
}`}</pre>
          </div>

          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">5. useContext</h2>

            <h3 className="text-white font-medium mt-2">Firma:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-green-300 overflow-auto">{`const valor = useContext(Contexto);`}</pre>

            <h3 className="text-white font-medium mt-4">Definición:</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">useContext</strong> permite acceder al valor de un contexto creado con <code className="bg-gray-800 px-1 rounded">React.createContext()</code> sin tener que pasar props manualmente por cada nivel del árbol de componentes.
            </p>
            <p className="text-gray-300 leading-relaxed">
              En esencia, conecta directamente el componente a una fuente de datos global.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Esto elimina el problema del <em>prop drilling</em>, donde tenías que pasar datos manualmente por múltiples componentes intermedios.
            </p>

            <h3 className="text-white font-medium mt-4">Cuándo usar:</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>Cuando tienes datos globales: tema (dark/light), idioma, usuario logueado, configuración global, etc.</li>
              <li>Cuando quieres que varios componentes accedan al mismo valor sin duplicar lógica.</li>
            </ul>

            <h3 className="text-white font-medium mt-4">Ejemplo:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-gray-100 overflow-auto">{`import React, { createContext, useContext } from 'react';

const TemaContext = createContext('claro');

function Hijo() {
  const tema = useContext(TemaContext);
  return <p>El tema actual es: {tema}</p>;
}

function App() {
  return (
    <TemaContext.Provider value="oscuro">
      <Hijo />
    </TemaContext.Provider>
  );
}`}</pre>
          </div>

          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">6. useReducer</h2>

            <h3 className="text-white font-medium mt-2">Firma:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-green-300 overflow-auto">{`const [state, dispatch] = useReducer(reducer, estadoInicial);`}</pre>

            <h3 className="text-white font-medium mt-4">Definición:</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">useReducer</strong> es una alternativa avanzada a <code className="bg-gray-800 px-1 rounded">useState</code>, especialmente útil cuando el estado depende de múltiples acciones o tiene una estructura compleja.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Recibe una función reductora (<code className="bg-gray-800 px-1 rounded">reducer</code>) que decide cómo cambiar el estado según una acción ({`{ type, payload }`}), similar a Redux.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Esto permite separar la lógica del estado del componente, haciendo el código más organizado y escalable.
            </p>

            <h3 className="text-white font-medium mt-4">Cuándo usar:</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>Cuando tienes múltiples variables de estado relacionadas entre sí.</li>
              <li>Cuando necesitas una lógica clara para manejar distintos eventos.</li>
              <li>Ideal para formularios grandes, carritos de compra o sistemas complejos.</li>
            </ul>

            <h3 className="text-white font-medium mt-4">Ejemplo:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-gray-100 overflow-auto">{`import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'sumar':
      return { contador: state.contador + 1 };
    case 'restar':
      return { contador: state.contador - 1 };
    case 'reset':
      return { contador: 0 };
    default:
      return state;
  }
}

function Contador() {
  const [state, dispatch] = useReducer(reducer, { contador: 0 });

  return (
    <div>
      <p>{state.contador}</p>
      <button onClick={() => dispatch({ type: 'sumar' })}>+</button>
      <button onClick={() => dispatch({ type: 'restar' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reiniciar</button>
    </div>
  );
}`}</pre>
          </div>

          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">7. useCallback</h2>

            <h3 className="text-white font-medium mt-2">Firma:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-green-300 overflow-auto">{`const funcionMemoizada = useCallback(() => { /* función */ }, [dependencias]);`}</pre>

            <h3 className="text-white font-medium mt-4">Definición:</h3>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">useCallback</strong> memoriza una función para que su referencia no cambie en cada render.
              En React, las funciones se crean de nuevo cada vez que el componente se renderiza, lo que puede causar renders innecesarios en los componentes hijos que reciben esas funciones como props.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">useCallback</strong> evita esto guardando la función en memoria y reutilizándola mientras las dependencias no cambien.
            </p>

            <h3 className="text-white font-medium mt-4">Cuándo usar:</h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>Cuando pases funciones como props a componentes hijos.</li>
              <li>Cuando uses <code className="bg-gray-800 px-1 rounded">React.memo</code> o comparaciones por referencia.</li>
              <li>Cuando necesites evitar recrear funciones en cada render.</li>
            </ul>

            <h3 className="text-white font-medium mt-4">Ejemplo:</h3>
            <pre className="bg-gray-800 text-sm p-3 rounded text-gray-100 overflow-auto">{`import React, { useState, useCallback } from 'react';

function Boton({ onClick }) {
  console.log('Render del botón');
  return <button onClick={onClick}>Clic</button>;
}

const MemoBoton = React.memo(Boton);

function App() {
  const [contador, setContador] = useState(0);

  const incrementar = useCallback(() => {
    setContador(c => c + 1);
  }, []);

  return (
    <div>
      <p>Contador: {contador}</p>
      <MemoBoton onClick={incrementar} />
    </div>
  );
}`}</pre>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hooks;
