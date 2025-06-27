import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('it');
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Valutazione', href: '/valutazione', current: location.pathname === '/valutazione' },
    { name: 'Chi Siamo', href: '/about', current: location.pathname === '/about' },
    { name: 'Docs', href: '/docs', current: location.pathname === '/docs' },
  ];

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'it' ? 'en' : 'it');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                MEDAGENTbyTREBLA
              </span>
              <span className="text-xs text-gray-500">
                Powered by bolt.new
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.current
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switch & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{currentLanguage}</span>
            </button>

            <Link
              to="/valutazione"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Inizia Valutazione
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    item.current
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Language Switch */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
              >
                <Globe className="h-4 w-4" />
                <span>Language: {currentLanguage.toUpperCase()}</span>
              </button>

              <Link
                to="/valutazione"
                className="mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-xl text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Inizia Valutazione
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;