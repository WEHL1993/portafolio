import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import i18n from './i18n';
import Layout from './layout/layout';
import GlossaryPage from './pages/GlossaryPage';
import HooksPage from './pages/HooksPage';
import './App.css';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/glosario" element={<GlossaryPage />} />
            <Route path="/hooks" element={<HooksPage />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
};

export default App;
