import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, Sun, Moon, User, LogIn, LogOut, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy user auth state (replace with real auth later)
  const isLoggedIn = true;

  const handleLogout = () => {
    // TODO: Add logout logic
    navigate('/login');
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Browse', to: '/browse' },
    { label: 'Swaps', to: '/swaps' },
    { label: 'Profile', to: '/profile' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <Sparkles className="text-indigo-500" />
          <span className="text-indigo-600 dark:text-indigo-400">Swapsy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 transition"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <User size={20} className="text-gray-600 dark:text-gray-300" />
              </Link>
              <button onClick={handleLogout}>
                <LogOut size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/signup" className="text-sm">Signup</Link>
            </>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-sm"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>

              {isLoggedIn ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
