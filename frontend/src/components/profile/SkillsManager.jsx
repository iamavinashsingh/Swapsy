import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SkillsManager = ({ label = "Skills", skills = [], onChange }) => {
  const [input, setInput] = useState('');

  const addSkill = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setInput('');
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="mb-6">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
        {label} 🛠️
      </label>

      <div className="flex flex-wrap gap-2 mb-2">
        <AnimatePresence>
          {skills.map((skill) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="flex items-center bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-white px-3 py-1 rounded-full"
            >
              <span className="text-sm">{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 focus:outline-none"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={addSkill} className="flex">
        <input
          type="text"
          placeholder="Add a skill and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
      </form>
    </div>
  );
};

export default SkillsManager;
