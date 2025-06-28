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
              <div className="flex flex-col">
                <span className="text-xl font-bold">MEDAGENTbyTREBLA</span>
                <span className="text-sm text-gray-400">Powered by bolt.new</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              An AI health assistant that guides you through intelligent symptom assessments, 
              providing empathetic support and responsible medical guidance.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Made with passion for digital health</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Assessment', href: '/valutazione' },
                { name: 'About Us', href: '/about' },
                { name: 'Documentation', href: '/docs' },
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
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Medical Disclaimer', href: '/disclaimer' },
                { name: 'Informed Consent', href: '/consenso' },
                { name: 'Terms of Service', href: '/termini' },
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
              <span className="text-gray-300">support@medagentbytrebla.ai</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-400" />
              <span className="text-gray-300">+39 02 1234 5678</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-red-400" />
              <span className="text-gray-300">Milan, Italy</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} MEDAGENTbyTREBLA. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              <strong className="text-yellow-400">⚠️ IMPORTANT:</strong> 
              MEDAGENTbyTREBLA does not replace professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;