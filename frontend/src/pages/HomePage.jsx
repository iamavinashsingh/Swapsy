import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Users, Repeat, Star } from 'lucide-react';

const HomePage = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-24 px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="mb-6"
      >
        <Sparkles size={56} className="text-indigo-500 drop-shadow-md" />
      </motion.div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        Swap Skills, <span className="text-indigo-600 dark:text-indigo-400">Grow Together</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl max-w-2xl text-gray-600 dark:text-gray-300 mb-8">
        Swapsy helps you connect, learn, and teach by exchanging your skills with like-minded learners — no money involved ✨
      </p>

      {/* CTA */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/signup"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition"
        >
          Get Started
        </Link>
        <Link
          to="/browse"
          className="border border-indigo-600 hover:bg-indigo-600 hover:text-white text-indigo-600 px-6 py-2 rounded-lg shadow transition"
        >
          Explore Skills
        </Link>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
        <FeatureCard icon={<Users />} title="Community" text="Find people with matching learning goals" />
        <FeatureCard icon={<Repeat />} title="Skill Swap" text="Exchange skills like design, coding, music, and more" />
        <FeatureCard icon={<Star />} title="Feedback" text="Rate each other after completing a swap" />
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all"
    whileHover={{ scale: 1.03 }}
  >
    <div className="text-indigo-500 mb-3">{icon}</div>
    <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
  </motion.div>
);

export default HomePage;
