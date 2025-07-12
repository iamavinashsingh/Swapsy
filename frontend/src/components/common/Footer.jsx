import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Side */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-indigo-600 dark:text-indigo-400">Swapsy</span>. Made with <Heart size={14} className="inline text-red-500 animate-pulse mx-1" /> for skill sharing.
        </p>

        {/* Right Side */}
        <div className="flex gap-5 text-sm items-center">
          <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            Terms
          </Link>
          <a href="mailto:contact@swapsy.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            <Mail size={16} className="inline mr-1" /> Contact
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            <Github size={16} className="inline" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

