import React from 'react';
import { ToggleLeft, ToggleRight, Lock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyToggle = ({ value = false, onChange }) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Profile Visibility 🔐
      </label>

      <motion.div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => onChange(!value)}
        whileTap={{ scale: 0.95 }}
      >
        {value ? (
          <>
            <ToggleRight size={28} className="text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-200">Public (visible to others)</span>
            <Eye size={20} className="text-indigo-500" />
          </>
        ) : (
          <>
            <ToggleLeft size={28} className="text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Private (only you can see)</span>
            <Lock size={20} className="text-red-400" />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PrivacyToggle;
