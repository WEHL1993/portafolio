import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Layout from './layout/layout';
import './App.css';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Layout />
    </I18nextProvider>
  );
};

export default App;
