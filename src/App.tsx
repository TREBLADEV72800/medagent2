import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EvaluationPage from './pages/EvaluationPage';
import ChatPage from './pages/ChatPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import DocsPage from './pages/DocsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/valutazione" element={<EvaluationPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/risultato" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/docs" element={<DocsPage />} />
          
          {/* Legal Pages - Placeholder routes */}
          <Route path="/privacy" element={<div className="min-h-screen flex items-center justify-center"><h1>Privacy Policy - Coming Soon</h1></div>} />
          <Route path="/disclaimer" element={<div className="min-h-screen flex items-center justify-center"><h1>Disclaimer Medico - Coming Soon</h1></div>} />
          <Route path="/consenso" element={<div className="min-h-screen flex items-center justify-center"><h1>Consenso Informato - Coming Soon</h1></div>} />
          <Route path="/termini" element={<div className="min-h-screen flex items-center justify-center"><h1>Termini di Servizio - Coming Soon</h1></div>} />
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Pagina non trovata</p>
                <a href="/" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300">
                  Torna alla Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;