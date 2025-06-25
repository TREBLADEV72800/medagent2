import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MedAgent</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Un assistente sanitario AI che ti guida attraverso valutazioni sintomatiche intelligenti, 
              fornendo supporto empatico e orientamento medico responsabile.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Realizzato con passione per la salute digitale</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigazione</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Valutazione', href: '/valutazione' },
                { name: 'Chi Siamo', href: '/about' },
                { name: 'Documentazione', href: '/docs' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legale</h3>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Disclaimer Medico', href: '/disclaimer' },
                { name: 'Consenso Informato', href: '/consenso' },
                { name: 'Termini di Servizio', href: '/termini' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">support@medagent.ai</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-400" />
              <span className="text-gray-300">+39 02 1234 5678</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-red-400" />
              <span className="text-gray-300">Milano, Italia</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} MedAgent. Tutti i diritti riservati.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              <strong className="text-yellow-400">⚠️ IMPORTANTE:</strong> 
              MedAgent non sostituisce il parere medico professionale.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;